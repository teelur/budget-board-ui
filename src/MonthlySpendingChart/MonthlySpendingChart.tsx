import { useElementSize } from "@mantine/hooks";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { useCallback, useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Rectangle,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";
import type { BarShapeProps } from "recharts";
import { BodyText } from "../BodyText/BodyText";
import { DataText } from "../DataText/DataText";
import { Skeleton } from "../Skeleton/Skeleton";
import { getBudgetBoardDataColor } from "../colors";
import { budgetBoardTypography } from "../theme";
import { ensureBBUIMantineProvider, useBBUITheme } from "../shared/themeStyles";
import classes from "./MonthlySpendingChart.module.css";

export interface MonthlySpendingChartData {
  month: string;
  total: number;
}

export interface MonthlySpendingChartProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  ariaLabel: string;
  average: number;
  averageLabel: ReactNode;
  data: MonthlySpendingChartData[];
  emptyMessage?: ReactNode;
  formatValue: (value: number) => string;
  height?: number;
  includeGrid?: boolean;
  includeYAxis?: boolean;
  isLoading?: boolean;
}

function validateData(data: MonthlySpendingChartData[], average: number) {
  if (!Number.isFinite(average)) {
    throw new RangeError("Monthly spending chart average must be finite.");
  }

  data.forEach((datum, index) => {
    if (typeof datum.month !== "string" || datum.month.trim().length === 0) {
      throw new RangeError(
        `Monthly spending chart datum at index ${index} must have a month label.`,
      );
    }

    if (!Number.isFinite(datum.total)) {
      throw new RangeError(
        `Monthly spending chart datum at index ${index} must have a finite total.`,
      );
    }
  });
}

function getChartDomain(
  data: MonthlySpendingChartData[],
  average: number,
): [number, number] {
  let min = Math.min(0, average);
  let max = Math.max(0, average);

  data.forEach((datum) => {
    min = Math.min(min, datum.total);
    max = Math.max(max, datum.total);
  });

  const padding = Math.max(
    (max - min) * 0.08,
    Math.max(Math.abs(min), Math.abs(max)) * 0.02,
    1,
  );

  return [min < 0 ? min - padding : 0, max > 0 ? max + padding : padding];
}

export function MonthlySpendingChart({
  ariaLabel,
  average,
  averageLabel,
  className,
  data,
  emptyMessage = "No monthly spending data available.",
  formatValue,
  height = 400,
  includeGrid = false,
  includeYAxis = true,
  isLoading = false,
  style,
  ...rootProps
}: MonthlySpendingChartProps) {
  const { colorScheme, colors, hasMantineContext } = useBBUITheme();
  const { ref: sizeRef, width } = useElementSize<HTMLDivElement>();
  const chartData = useMemo(() => {
    validateData(data, average);
    return data;
  }, [average, data]);
  const chartDomain = useMemo(
    () => getChartDomain(chartData, average),
    [average, chartData],
  );
  // Recharts hides LabelList labels while a bar animates.
  const renderBarShape = useCallback(
    (shapeProps: BarShapeProps) => {
      const value =
        typeof shapeProps.value === "number" ? shapeProps.value : undefined;

      return (
        <g>
          <Rectangle
            className={shapeProps.className ?? "recharts-bar-rectangle"}
            fill={
              shapeProps.fill ??
              "var(--bbui-monthly-spending-chart-bar)"
            }
            fillOpacity={shapeProps.fillOpacity ?? 0.4}
            height={shapeProps.height}
            radius={shapeProps.radius ?? 0}
            stroke={
              shapeProps.stroke ??
              "var(--bbui-monthly-spending-chart-bar)"
            }
            strokeOpacity={shapeProps.strokeOpacity ?? 1}
            strokeWidth={shapeProps.strokeWidth ?? 1}
            width={shapeProps.width}
            x={shapeProps.x}
            y={shapeProps.y}
          />
          {value !== undefined && (
            <Label
              fill="var(--bbui-monthly-spending-chart-axis)"
              fontFamily="var(--bbui-monthly-spending-chart-font-body)"
              fontSize="var(--mantine-font-size-xs, 0.75rem)"
              offset={5}
              pointerEvents="none"
              position="top"
              value={formatValue(value)}
              viewBox={{
                x: shapeProps.x,
                y: shapeProps.y,
                width: shapeProps.width,
                height: shapeProps.height,
              }}
            />
          )}
        </g>
      );
    },
    [formatValue],
  );

  if (!Number.isFinite(height) || height <= 0) {
    throw new RangeError(
      "Monthly spending chart height must be a positive number.",
    );
  }

  const chartStyle = {
    ...style,
    "--bbui-monthly-spending-chart-average": `var(--bb-color-text-secondary, ${colors.textSecondary})`,
    "--bbui-monthly-spending-chart-axis": `var(--bb-color-text-secondary, ${colors.textSecondary})`,
    "--bbui-monthly-spending-chart-bar": getBudgetBoardDataColor(
      0,
      colorScheme,
    ),
    "--bbui-monthly-spending-chart-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
    "--bbui-monthly-spending-chart-focus": `var(--bb-color-focus-ring, ${colors.focusRing})`,
    "--bbui-monthly-spending-chart-font-body": `var(--bb-font-body, ${budgetBoardTypography.body})`,
  } as CSSProperties;

  const content = (
    <div
      {...rootProps}
      aria-busy={isLoading}
      aria-label={ariaLabel}
      className={[classes.root, className].filter(Boolean).join(" ")}
      ref={sizeRef}
      role="group"
      style={chartStyle}
    >
      {isLoading && chartData.length === 0 ? (
        <div aria-label={ariaLabel} role="status">
          <Skeleton aria-hidden="true" height={height + 56} />
        </div>
      ) : chartData.length === 0 ? (
        <BodyText className={classes.emptyMessage} component="p" tone="muted">
          {emptyMessage}
        </BodyText>
      ) : (
        <>
          <div className={classes.averageSummary}>
            <BodyText size="sm" tone="secondary">
              {averageLabel}
            </BodyText>
            <DataText fw={500} size="sm" tone="primary">
              {formatValue(average)}
            </DataText>
          </div>
          <div className={classes.chartViewport} style={{ height }}>
            <BarChart
              accessibilityLayer
              className={classes.chart ?? ""}
              data={chartData}
              height={height}
              margin={{ top: 24, right: 12, bottom: 48, left: 12 }}
              width={Math.max(width, 1)}
            >
              {includeGrid && (
                <CartesianGrid
                  stroke="var(--bbui-monthly-spending-chart-border)"
                  strokeDasharray="3 3"
                />
              )}
              <XAxis
                angle={-20}
                axisLine={{
                  stroke: "var(--bbui-monthly-spending-chart-border)",
                }}
                dataKey="month"
                height={64}
                textAnchor="end"
                tick={{
                  fill: "var(--bbui-monthly-spending-chart-axis)",
                  fontFamily: "var(--bbui-monthly-spending-chart-font-body)",
                  fontSize: "var(--mantine-font-size-xs, 0.75rem)",
                }}
                tickLine={false}
                tickMargin={8}
              />
              <YAxis
                axisLine={false}
                domain={chartDomain}
                hide={!includeYAxis}
                tick={{
                  fill: "var(--bbui-monthly-spending-chart-axis)",
                  fontFamily: "var(--bbui-monthly-spending-chart-font-body)",
                  fontSize: "var(--mantine-font-size-xs, 0.75rem)",
                }}
                tickFormatter={formatValue}
                tickLine={false}
                width={72}
              />
              <Bar
                dataKey="total"
                animationBegin={0}
                animationDuration={700}
                animationEasing="ease-out"
                fill="var(--bbui-monthly-spending-chart-bar)"
                fillOpacity={0.4}
                isAnimationActive="auto"
                shape={renderBarShape}
                stroke="var(--bbui-monthly-spending-chart-bar)"
                strokeOpacity={1}
              />
              <ReferenceLine
                ifOverflow="extendDomain"
                stroke="var(--bbui-monthly-spending-chart-average)"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                y={average}
              />
            </BarChart>
          </div>
        </>
      )}
    </div>
  );

  return ensureBBUIMantineProvider(content, hasMantineContext, colorScheme);
}
