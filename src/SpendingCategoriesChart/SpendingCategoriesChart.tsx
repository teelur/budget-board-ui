import { useElementSize } from "@mantine/hooks";
import type {
  CSSProperties,
  HTMLAttributes,
  ReactNode,
} from "react";
import { useId, useMemo } from "react";
import { BodyText } from "../BodyText/BodyText";
import { Skeleton } from "../Skeleton/Skeleton";
import { getBudgetBoardDataColor } from "../colors";
import { ensureBBUIMantineProvider, useBBUITheme } from "../shared/themeStyles";
import { Pie, PieChart, Sector, Tooltip } from "recharts";
import type { PieLabelRenderProps, PieSectorShapeProps } from "recharts";
import classes from "./SpendingCategoriesChart.module.css";

export interface SpendingSubcategoryChartData {
  name: string;
  value: number;
  color?: string;
}

export interface SpendingCategoryChartData {
  name: string;
  value: number;
  color?: string;
  subcategories?: SpendingSubcategoryChartData[];
}

export interface SpendingCategoriesChartProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  ariaLabel: string;
  data: SpendingCategoryChartData[];
  formatValue: (value: number) => string;
  emptyMessage?: ReactNode;
  isLoading?: boolean;
  showSubcategories?: boolean;
  totalLabel?: ReactNode;
}

interface ChartSegment {
  key: string;
  name: string;
  parentName?: string;
  value: number;
  color: string;
  fill: string;
  percent: number;
  startAngle: number;
  endAngle: number;
  innerRadius: number;
  outerRadius: number;
}

interface LabelPosition {
  segmentKey: string;
  startX: number;
  startY: number;
  leaderX: number;
  endX: number;
  endY: number;
  textX: number;
  isRight: boolean;
  color: string;
  text: string;
}

const compactBreakpoint = 720;
const compactViewWidth = 320;
const compactViewHeight = 280;
const compactRadius = 120;
const wideRadius = 142;
const wideViewHeight = 445;
const labelMinPercent = 0.01;
const labelSpacing = 20;
const labelSpreadPasses = 8;
const labelLeaderRadialOffset = 50;
const labelLeaderHorizontalLength = 40;
const subcategoryTonePercentages = [90, 80, 70, 60, 50] as const;

function validateData(data: SpendingCategoryChartData[]) {
  data.forEach((category, categoryIndex) => {
    if (!Number.isFinite(category.value) || category.value < 0) {
      throw new RangeError(
        `Spending category at index ${categoryIndex} must have a finite, non-negative value.`,
      );
    }

    category.subcategories?.forEach((subcategory, subcategoryIndex) => {
      if (!Number.isFinite(subcategory.value) || subcategory.value < 0) {
        throw new RangeError(
          `Spending subcategory at index ${subcategoryIndex} in category "${category.name}" must have a finite, non-negative value.`,
        );
      }
    });

    if (category.subcategories?.length) {
      const subcategoryTotal = category.subcategories.reduce(
        (sum, subcategory) => sum + subcategory.value,
        0,
      );
      const tolerance = Math.max(0.000001, Math.abs(category.value) * 1e-9);

      if (Math.abs(subcategoryTotal - category.value) > tolerance) {
        throw new RangeError(
          `Spending subcategories for "${category.name}" must sum to the category value.`,
        );
      }
    }
  });
}

function mixWithSurface(color: string, surface: string, colorPercent: number) {
  return `color-mix(in srgb, ${color} ${colorPercent}%, ${surface})`;
}

function isChartSegment(value: unknown): value is ChartSegment {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    "key" in value &&
    typeof value.key === "string" &&
    "name" in value &&
    typeof value.name === "string" &&
    "value" in value &&
    typeof value.value === "number" &&
    "color" in value &&
    typeof value.color === "string" &&
    "fill" in value &&
    typeof value.fill === "string" &&
    "percent" in value &&
    typeof value.percent === "number" &&
    "startAngle" in value &&
    typeof value.startAngle === "number" &&
    "endAngle" in value &&
    typeof value.endAngle === "number" &&
    "innerRadius" in value &&
    typeof value.innerRadius === "number" &&
    "outerRadius" in value &&
    typeof value.outerRadius === "number"
  );
}

function createSegments(
  data: SpendingCategoryChartData[],
  total: number,
  showSubcategories: boolean,
  colorScheme: "light" | "dark",
  toneTarget: string,
  outerRadius: number,
) {
  const categories: ChartSegment[] = [];
  const subcategories: ChartSegment[] = [];
  let nextAngle = -90;

  data.forEach((category, categoryIndex) => {
    if (category.value <= 0) {
      return;
    }

    const categoryColor =
      category.color ?? getBudgetBoardDataColor(categoryIndex, colorScheme);
    const categorySweep = (category.value / total) * 360;

    categories.push({
      key: `category-${categoryIndex}`,
      name: category.name,
      value: category.value,
      color: categoryColor,
      fill: categoryColor,
      percent: category.value / total,
      startAngle: nextAngle,
      endAngle: nextAngle + categorySweep,
      innerRadius: showSubcategories ? 57 : 72,
      outerRadius: showSubcategories ? 94 : outerRadius,
    });

    if (showSubcategories) {
      const categorySubcategories = category.subcategories?.length
        ? category.subcategories
        : [{ name: category.name, value: category.value }];
      let childAngle = nextAngle;

      categorySubcategories.forEach((subcategory, subcategoryIndex) => {
        if (subcategory.value <= 0) {
          return;
        }

        const childSweep = (subcategory.value / category.value) * categorySweep;
        const shadePercent =
          subcategoryTonePercentages[
            subcategoryIndex % subcategoryTonePercentages.length
          ]!;
        const color = subcategory.color ?? categoryColor;

        subcategories.push({
          key: `subcategory-${categoryIndex}-${subcategoryIndex}`,
          name: subcategory.name,
          ...(subcategory.name === category.name
            ? {}
            : { parentName: category.name }),
          value: subcategory.value,
          color,
          fill: subcategory.color
            ? subcategory.color
            : category.subcategories?.length
              ? mixWithSurface(color, toneTarget, shadePercent)
              : color,
          percent: subcategory.value / total,
          startAngle: childAngle,
          endAngle: childAngle + childSweep,
          innerRadius: 99,
          outerRadius,
        });

        childAngle += childSweep;
      });
    }

    nextAngle += categorySweep;
  });

  return { categories, subcategories };
}

function spreadLabels(labels: LabelPosition[]) {
  const left = labels.filter((label) => !label.isRight);
  const right = labels.filter((label) => label.isRight);

  const spread = (side: LabelPosition[]) => {
    side.sort((leftLabel, rightLabel) => leftLabel.endY - rightLabel.endY);

    for (let pass = 0; pass < labelSpreadPasses; pass++) {
      let changed = false;

      for (let index = 1; index < side.length; index++) {
        const previous = side[index - 1]!;
        const current = side[index]!;
        const minimumY = previous.endY + labelSpacing;

        if (current.endY < minimumY) {
          current.endY = minimumY;
          changed = true;
        }
      }

      for (let index = side.length - 2; index >= 0; index--) {
        const current = side[index]!;
        const next = side[index + 1]!;
        const maximumY = next.endY - labelSpacing;

        if (current.endY > maximumY) {
          current.endY = maximumY;
          changed = true;
        }
      }

      if (!changed) {
        break;
      }
    }
  };

  spread(left);
  spread(right);

  return [...left, ...right];
}

function getLabelPositions(
  segments: ChartSegment[],
  width: number,
  radius: number,
): { labels: LabelPosition[]; height: number } {
  const centerX = width / 2;
  const rawLabels = segments.flatMap((segment) => {
    if (segment.percent < labelMinPercent) {
      return [];
    }

    const angle =
      -((segment.startAngle + segment.endAngle) / 2) * (Math.PI / 180);
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const isRight = cos >= 0;
    const startX = centerX + radius * cos;
    const startY = radius * sin;
    const leaderRadius = radius + labelLeaderRadialOffset;
    const leaderX = centerX + leaderRadius * cos;
    const endX =
      leaderX +
      (isRight ? labelLeaderHorizontalLength : -labelLeaderHorizontalLength);
    const endY = leaderRadius * sin;

    return [
      {
        segmentKey: segment.key,
        startX,
        startY,
        leaderX,
        endX,
        endY,
        textX: endX + (isRight ? 4 : -4),
        isRight,
        color: segment.color,
        text: segment.name,
      },
    ];
  });
  const largestSide = Math.max(
    rawLabels.filter((label) => !label.isRight).length,
    rawLabels.filter((label) => label.isRight).length,
  );
  const height = Math.max(wideViewHeight, largestSide * labelSpacing + 48);
  const centerY = height / 2;
  rawLabels.forEach((label) => {
    label.startY += centerY;
    label.endY += centerY;
  });

  return { labels: spreadLabels(rawLabels), height };
}

function getTooltipText(
  segment: ChartSegment,
  formatValue: (value: number) => string,
) {
  const percent = (segment.percent * 100).toFixed(1);
  return `${segment.parentName ? `${segment.parentName}, ` : ""}${segment.name}: ${formatValue(segment.value)} (${percent}%)`;
}

export function SpendingCategoriesChart({
  ariaLabel,
  className,
  data,
  emptyMessage = "No spending data available.",
  formatValue,
  isLoading = false,
  showSubcategories = true,
  style,
  totalLabel = "Total spending",
  ...rootProps
}: SpendingCategoriesChartProps) {
  const { colorScheme, colors, hasMantineContext } = useBBUITheme();
  const { ref: sizeRef, width } = useElementSize<HTMLDivElement>();
  const tooltipId = useId();
  const isCompact = width < compactBreakpoint;
  const chartWidth = isCompact ? Math.max(width, compactViewWidth) : width;
  const outerRadius = isCompact ? compactRadius : wideRadius;
  const total = useMemo(() => {
    validateData(data);
    return data.reduce((sum, category) => sum + category.value, 0);
  }, [data]);
  const segments = useMemo(
    () =>
      createSegments(
        data,
        total,
        showSubcategories,
        colorScheme,
        colors.textHeading,
        outerRadius,
      ),
    [
      colorScheme,
      colors.textHeading,
      data,
      outerRadius,
      showSubcategories,
      total,
    ],
  );
  const legendSegments = showSubcategories
    ? segments.subcategories
    : segments.categories;
  const chartLayout = useMemo(() => {
    if (isCompact || legendSegments.length === 0) {
      return { labels: [] as LabelPosition[], height: compactViewHeight };
    }

    return getLabelPositions(legendSegments, chartWidth, outerRadius);
  }, [chartWidth, isCompact, legendSegments, outerRadius]);
  const labelsBySegmentKey = useMemo(
    () => new Map(chartLayout.labels.map((label) => [label.segmentKey, label])),
    [chartLayout.labels],
  );
  const chartHeight = chartLayout.height;
  const centerX = chartWidth / 2;
  const centerY = chartHeight / 2;

  const renderSegment = (props: PieSectorShapeProps) => {
    const sectorGeometry = {
      cornerRadius: props.cornerRadius ?? 0,
      cx: props.cx,
      cy: props.cy,
      endAngle: props.endAngle,
      innerRadius: props.innerRadius,
      outerRadius: props.outerRadius,
      startAngle: props.startAngle,
    };

    if (!isChartSegment(props.payload)) {
      return <Sector {...sectorGeometry} className={props.className ?? ""} />;
    }

    const segment = props.payload;

    return (
      <Sector
        {...sectorGeometry}
        aria-describedby={props.isActive ? tooltipId : undefined}
        aria-label={getTooltipText(segment, formatValue)}
        className={classes.segment ?? ""}
        data-budget-board-chart-ring={
          segment.key.startsWith("subcategory-") ? "subcategory" : "category"
        }
        fill={segment.fill}
        fillOpacity={props.isActive ? 0.58 : 0.4}
        role="img"
        stroke={segment.color}
        strokeOpacity={1}
        strokeWidth={props.isActive ? 2.5 : 2}
        tabIndex={0}
      />
    );
  };

  const renderLabel = (props: PieLabelRenderProps) => {
    if (!isChartSegment(props.payload)) {
      return null;
    }

    const segment = props.payload;
    const label = labelsBySegmentKey.get(segment.key);

    if (!label) {
      return null;
    }

    return (
      <g aria-hidden="true">
        <path
          d={`M ${label.startX} ${label.startY} L ${label.leaderX} ${label.endY} L ${label.endX} ${label.endY}`}
          data-budget-board-chart-leader={segment.key}
          fill="none"
          stroke={label.color}
          strokeWidth={1.5}
        />
        <text
          className={classes.chartLabel}
          dominantBaseline="central"
          textAnchor={label.isRight ? "start" : "end"}
          x={label.textX}
          y={label.endY}
        >
          {label.text}
        </text>
      </g>
    );
  };

  const content = (
    <div
      {...rootProps}
      aria-busy={isLoading}
      aria-label={ariaLabel}
      className={[classes.root, className].filter(Boolean).join(" ")}
      data-budget-board-chart-layout={isCompact ? "compact" : "wide"}
      ref={sizeRef}
      role="group"
      style={style}
    >
      {isLoading ? (
        <div aria-label={ariaLabel} role="status">
          <Skeleton
            aria-hidden="true"
            height={isCompact ? compactViewHeight : wideViewHeight}
          />
        </div>
      ) : total <= 0 ? (
        <BodyText className={classes.emptyMessage} component="p" tone="muted">
          {emptyMessage}
        </BodyText>
      ) : (
        <>
          <div
            className={classes.chartViewport}
            style={{ height: chartHeight }}
          >
            <PieChart
              accessibilityLayer
              className={classes.chart ?? ""}
              height={chartHeight}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              width={chartWidth}
            >
              <Pie
                cx="50%"
                cy="50%"
                data={segments.categories}
                dataKey="value"
                endAngle={270}
                innerRadius={showSubcategories ? 57 : 72}
                animationBegin={0}
                animationDuration={700}
                animationEasing="ease-out"
                isAnimationActive="auto"
                label={!isCompact && !showSubcategories ? renderLabel : false}
                labelLine={false}
                nameKey="name"
                outerRadius={showSubcategories ? 94 : outerRadius}
                shape={renderSegment}
                startAngle={-90}
              />
              {showSubcategories && (
                <Pie
                  cx="50%"
                  cy="50%"
                  data={segments.subcategories}
                  dataKey="value"
                  endAngle={270}
                  innerRadius={99}
                  animationBegin={0}
                  animationDuration={700}
                  animationEasing="ease-out"
                  isAnimationActive="auto"
                  label={!isCompact ? renderLabel : false}
                  labelLine={false}
                  nameKey="name"
                  outerRadius={outerRadius}
                  shape={renderSegment}
                  startAngle={-90}
                />
              )}
              <Tooltip
                content={({ active, payload }) => {
                  const segment = payload[0]?.payload;

                  if (!active || !isChartSegment(segment)) {
                    return null;
                  }

                  return (
                    <div
                      className={[
                        classes.tooltip,
                        !isCompact ? classes.tooltipTop : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      id={tooltipId}
                      role="tooltip"
                      style={
                        {
                          "--bbui-chart-tooltip-color": segment.color,
                        } as CSSProperties
                      }
                    >
                      {segment.parentName && (
                        <BodyText size="xs" tone="secondary">
                          {segment.parentName}
                        </BodyText>
                      )}
                      <BodyText size="sm" tone="primary">
                        {segment.name}
                      </BodyText>
                      <BodyText size="sm" tone="primary" fw={600}>
                        {`${formatValue(segment.value)} (${(segment.percent * 100).toFixed(1)}%)`}
                      </BodyText>
                    </div>
                  );
                }}
                cursor={false}
                isAnimationActive={false}
                {...(!isCompact ? { position: { x: centerX, y: 8 } } : {})}
                wrapperStyle={{ pointerEvents: "none", zIndex: 1 }}
              />
            </PieChart>
            <div aria-hidden="true" className={classes.centerText}>
              <span className={classes.totalLabel}>{totalLabel}</span>
              <span className={classes.totalValue}>{formatValue(total)}</span>
            </div>
          </div>
          {isCompact && (
            <ul
              aria-label={`${ariaLabel} categories`}
              className={classes.legend}
            >
              {legendSegments.map((segment) => (
                <li className={classes.legendItem} key={segment.key}>
                  <span
                    aria-hidden="true"
                    className={classes.legendSwatch}
                    style={{
                      backgroundColor: `color-mix(in srgb, ${segment.fill} 40%, transparent)`,
                      border: `1px solid ${segment.color}`,
                    }}
                  />
                  <BodyText size="xs" tone="secondary" fw={500}>
                    {segment.name}
                  </BodyText>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );

  return ensureBBUIMantineProvider(content, hasMantineContext, colorScheme);
}
