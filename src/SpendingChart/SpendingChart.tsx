import { useElementSize } from "@mantine/hooks";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BodyText } from "../BodyText/BodyText";
import { Skeleton } from "../Skeleton/Skeleton";
import { getBudgetBoardDataColor } from "../colors";
import { budgetBoardTypography } from "../theme";
import { ensureBBUIMantineProvider, useBBUITheme } from "../shared/themeStyles";
import classes from "./SpendingChart.module.css";

export interface SpendingChartData {
  day: number;
  [seriesKey: string]: number;
}

export interface SpendingChartSeries {
  key: string;
  label: string;
  color?: string;
}

export interface SpendingChartProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  ariaLabel: string;
  data: SpendingChartData[];
  emptyMessage?: ReactNode;
  formatValue: (value: number) => string;
  height?: number;
  includeGrid?: boolean;
  includeYAxis?: boolean;
  isLoading?: boolean;
  series: SpendingChartSeries[];
}

interface ChartSeries extends SpendingChartSeries {
  color: string;
}

function validateData(
  data: SpendingChartData[],
  series: SpendingChartSeries[],
) {
  const seriesKeys = new Set<string>();

  series.forEach((item, index) => {
    if (!item.key.trim() || item.key === "day") {
      throw new RangeError(
        `Spending chart series at index ${index} must have a non-empty key other than "day".`,
      );
    }

    if (!item.label.trim()) {
      throw new RangeError(
        `Spending chart series at index ${index} must have a non-empty label.`,
      );
    }

    if (seriesKeys.has(item.key)) {
      throw new RangeError(
        `Spending chart series key "${item.key}" must be unique.`,
      );
    }

    seriesKeys.add(item.key);
  });

  data.forEach((datum, index) => {
    if (!Number.isFinite(datum.day)) {
      throw new RangeError(
        `Spending chart datum at index ${index} must have a finite day.`,
      );
    }

    series.forEach((item) => {
      const value = datum[item.key];

      if (value !== undefined && !Number.isFinite(value)) {
        throw new RangeError(
          `Spending chart datum at index ${index} must have a finite value for series "${item.key}".`,
        );
      }
    });
  });
}

export function SpendingChart({
  ariaLabel,
  className,
  data,
  emptyMessage = "No spending data available.",
  formatValue,
  height = 400,
  includeGrid = false,
  includeYAxis = true,
  isLoading = false,
  series,
  style,
  ...rootProps
}: SpendingChartProps) {
  const { colorScheme, colors, hasMantineContext } = useBBUITheme();
  const { ref: sizeRef, width } = useElementSize<HTMLDivElement>();
  const [hoveredSeriesKey, setHoveredSeriesKey] = useState<string | null>(null);
  const [focusedSeriesKey, setFocusedSeriesKey] = useState<string | null>(null);
  const activeSeriesKey = hoveredSeriesKey ?? focusedSeriesKey;
  const chartData = useMemo(() => {
    validateData(data, series);
    return data;
  }, [data, series]);
  const chartSeries = useMemo<ChartSeries[]>(
    () =>
      series.map((item, index) => ({
        ...item,
        color: item.color ?? getBudgetBoardDataColor(index, colorScheme),
      })),
    [colorScheme, series],
  );
  const seriesByKey = useMemo(
    () => new Map(chartSeries.map((item) => [item.key, item])),
    [chartSeries],
  );

  if (!Number.isFinite(height) || height <= 0) {
    throw new RangeError("Spending chart height must be a positive number.");
  }

  const chartStyle = {
    ...style,
    "--bbui-spending-chart-axis": `var(--bb-color-text-secondary, ${colors.textSecondary})`,
    "--bbui-spending-chart-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
    "--bbui-spending-chart-focus": `var(--bb-color-focus-ring, ${colors.focusRing})`,
    "--bbui-spending-chart-font-body": `var(--bb-font-body, ${budgetBoardTypography.body})`,
    "--bbui-spending-chart-hover": `var(--bb-color-surface-hover, ${colors.surfaceHover})`,
    "--bbui-spending-chart-tooltip-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
    "--bbui-spending-chart-tooltip-surface": `var(--bb-color-surface-overlay, ${colors.surfaceOverlay})`,
  } as CSSProperties;

  const getFillOpacity = (seriesKey: string) =>
    activeSeriesKey === null ? 0.24 : activeSeriesKey === seriesKey ? 0.4 : 0.08;
  const getStrokeOpacity = (seriesKey: string) =>
    activeSeriesKey === null || activeSeriesKey === seriesKey ? 1 : 0.25;

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
      {isLoading ? (
        <div aria-label={ariaLabel} role="status">
          <Skeleton aria-hidden="true" height={height + 25} />
        </div>
      ) : chartData.length === 0 || chartSeries.length === 0 ? (
        <BodyText className={classes.emptyMessage} component="p" tone="muted">
          {emptyMessage}
        </BodyText>
      ) : (
        <>
          <div className={classes.chartViewport} style={{ height }}>
            <AreaChart
              accessibilityLayer
              className={classes.chart ?? ""}
              data={chartData}
              height="100%"
              margin={{ top: 12, right: 12, bottom: 8, left: 12 }}
              width={Math.max(width, 1)}
            >
              {includeGrid && (
                <CartesianGrid
                  stroke="var(--bbui-spending-chart-border)"
                  strokeDasharray="3 3"
                />
              )}
              <XAxis
                axisLine={{ stroke: "var(--bbui-spending-chart-border)" }}
                dataKey="day"
                tick={{
                  fill: "var(--bbui-spending-chart-axis)",
                  fontFamily: "var(--bbui-spending-chart-font-body)",
                  fontSize: "var(--mantine-font-size-xs, 0.75rem)",
                }}
                tickLine={false}
                tickMargin={8}
              />
              {includeYAxis && (
                <YAxis
                  axisLine={false}
                  tick={{
                    fill: "var(--bbui-spending-chart-axis)",
                    fontFamily: "var(--bbui-spending-chart-font-body)",
                    fontSize: "var(--mantine-font-size-xs, 0.75rem)",
                  }}
                  tickFormatter={formatValue}
                  tickLine={false}
                  width={72}
                />
              )}
              <Tooltip
                content={({ active, label, payload }) => {
                  if (!active || !payload?.length) {
                    return null;
                  }

                  const entries = payload.flatMap((item) => {
                    const seriesKey =
                      typeof item.dataKey === "string" ? item.dataKey : undefined;
                    const chartSeriesItem = seriesKey
                      ? seriesByKey.get(seriesKey)
                      : undefined;
                    const value =
                      typeof item.value === "number" ? item.value : undefined;

                    return chartSeriesItem && value !== undefined
                      ? [{ ...chartSeriesItem, value }]
                      : [];
                  });

                  if (entries.length === 0) {
                    return null;
                  }

                  return (
                    <div className={classes.tooltip} role="tooltip">
                      <BodyText size="xs" tone="secondary">
                        {label}
                      </BodyText>
                      <ul className={classes.tooltipRows}>
                        {entries.map((entry) => (
                          <li className={classes.tooltipRow} key={entry.key}>
                            <span
                              aria-hidden="true"
                              className={classes.tooltipMarker}
                              style={
                                {
                                  "--bbui-spending-chart-marker": entry.color,
                                } as CSSProperties
                              }
                            />
                            <BodyText size="sm" tone="secondary">
                              {entry.label}
                            </BodyText>
                            <BodyText fw={600} size="sm" tone="primary">
                              {formatValue(entry.value)}
                            </BodyText>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }}
                cursor={{ fill: "var(--bbui-spending-chart-hover)" }}
                isAnimationActive={false}
                wrapperStyle={{ outline: "none" }}
              />
              {chartSeries.map((item) => (
                <Area
                  activeDot={{ r: 4 }}
                  {...(activeSeriesKey !== null &&
                  activeSeriesKey !== item.key
                    ? { className: classes.seriesDimmed ?? "" }
                    : {})}
                  dataKey={item.key}
                  dot={{ r: 3 }}
                  fill={item.color}
                  fillOpacity={getFillOpacity(item.key)}
                  isAnimationActive="auto"
                  key={item.key}
                  name={item.label}
                  stroke={item.color}
                  strokeOpacity={getStrokeOpacity(item.key)}
                  strokeWidth={activeSeriesKey === item.key ? 3 : 2}
                  type="monotone"
                />
              ))}
            </AreaChart>
          </div>
          <ul aria-label={`${ariaLabel} series`} className={classes.legend}>
            {chartSeries.map((item) => (
              <li
                className={classes.legendItem}
                key={item.key}
                onBlur={() => setFocusedSeriesKey(null)}
                onFocus={() => setFocusedSeriesKey(item.key)}
                onMouseEnter={() => setHoveredSeriesKey(item.key)}
                onMouseLeave={() => setHoveredSeriesKey(null)}
                tabIndex={0}
              >
                <span
                  aria-hidden="true"
                  className={classes.legendSwatch}
                  style={
                    {
                      "--bbui-spending-chart-series-color": item.color,
                    } as CSSProperties
                  }
                />
                <BodyText fw={500} size="xs" tone="secondary">
                  {item.label}
                </BodyText>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );

  return ensureBBUIMantineProvider(content, hasMantineContext, colorScheme);
}
