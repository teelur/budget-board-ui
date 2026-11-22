import { useElementSize } from "@mantine/hooks";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BodyText } from "../BodyText/BodyText";
import { Skeleton } from "../Skeleton/Skeleton";
import { getBudgetBoardDataColor } from "../colors";
import { budgetBoardTypography } from "../theme";
import { ensureBBUIMantineProvider, useBBUITheme } from "../shared/themeStyles";
import classes from "./TransactionTrendsChart.module.css";

export interface TransactionTrendsChartData {
  day: number;
  [seriesKey: string]: number;
}

export interface TransactionTrendsChartSeries {
  key: string;
  label: string;
  color?: string;
  colorIndex?: number;
  legendLabel?: string;
  strokeDasharray?: string;
  type?: "area" | "line";
}

export interface TransactionTrendsChartProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  ariaLabel: string;
  data: TransactionTrendsChartData[];
  emptyMessage?: ReactNode;
  formatValue: (value: number) => string;
  height?: number;
  includeGrid?: boolean;
  includeYAxis?: boolean;
  isLoading?: boolean;
  tooltipSummary?: (activeDataPoint: TransactionTrendsChartData) => ReactNode;
  series: TransactionTrendsChartSeries[];
}

interface ChartSeries extends TransactionTrendsChartSeries {
  color: string;
}

interface ChartLegendItem {
  key: string;
  label: string;
  series: ChartSeries[];
}

function validateData(
  data: TransactionTrendsChartData[],
  series: TransactionTrendsChartSeries[],
) {
  const seriesKeys = new Set<string>();

  series.forEach((item, index) => {
    if (!item.key.trim() || item.key === "day") {
      throw new RangeError(
        `Transaction trends chart series at index ${index} must have a non-empty key other than "day".`,
      );
    }

    if (!item.label.trim()) {
      throw new RangeError(
        `Transaction trends chart series at index ${index} must have a non-empty label.`,
      );
    }

    if (item.legendLabel !== undefined && !item.legendLabel.trim()) {
      throw new RangeError(
        `Transaction trends chart series at index ${index} must have a non-empty legend label.`,
      );
    }

    if (seriesKeys.has(item.key)) {
      throw new RangeError(
        `Transaction trends chart series key "${item.key}" must be unique.`,
      );
    }

    seriesKeys.add(item.key);
  });

  data.forEach((datum, index) => {
    if (!Number.isFinite(datum.day)) {
      throw new RangeError(
        `Transaction trends chart datum at index ${index} must have a finite day.`,
      );
    }

    series.forEach((item) => {
      const value = datum[item.key];

      if (value !== undefined && !Number.isFinite(value)) {
        throw new RangeError(
          `Transaction trends chart datum at index ${index} must have a finite value for series "${item.key}".`,
        );
      }
    });
  });
}

export function TransactionTrendsChart({
  ariaLabel,
  className,
  data,
  emptyMessage = "No transaction trend data available.",
  formatValue,
  height = 400,
  includeGrid = false,
  includeYAxis = true,
  isLoading = false,
  tooltipSummary,
  series,
  style,
  ...rootProps
}: TransactionTrendsChartProps) {
  const { colorScheme, colors, hasMantineContext } = useBBUITheme();
  const { ref: sizeRef, width } = useElementSize<HTMLDivElement>();
  const { ref: viewportRef, height: viewportHeight } =
    useElementSize<HTMLDivElement>();
  const [hoveredLegendKey, setHoveredLegendKey] = useState<string | null>(null);
  const [focusedLegendKey, setFocusedLegendKey] = useState<string | null>(null);
  // The viewport can shrink in flex containers to leave room for the legend.
  const chartHeight =
    viewportHeight > 0 ? Math.min(height, Math.floor(viewportHeight)) : height;
  const activeLegendKey = hoveredLegendKey ?? focusedLegendKey;
  const chartData = useMemo(() => {
    validateData(data, series);
    return data;
  }, [data, series]);
  const chartSeries = useMemo<ChartSeries[]>(
    () =>
      series.map((item, index) => ({
        ...item,
        color:
          item.color ??
          getBudgetBoardDataColor(item.colorIndex ?? index, colorScheme),
      })),
    [colorScheme, series],
  );
  const seriesByKey = useMemo(
    () => new Map(chartSeries.map((item) => [item.key, item])),
    [chartSeries],
  );
  const legendItems = useMemo(() => {
    const itemsByLabel = new Map<string, ChartLegendItem>();

    chartSeries.forEach((item) => {
      const label = item.legendLabel ?? item.label;
      const existing = itemsByLabel.get(label);

      if (existing) {
        existing.series.push(item);
      } else {
        itemsByLabel.set(label, {
          key: label,
          label,
          series: [item],
        });
      }
    });

    return [...itemsByLabel.values()];
  }, [chartSeries]);

  if (!Number.isFinite(height) || height <= 0) {
    throw new RangeError(
      "Transaction trends chart height must be a positive number.",
    );
  }

  const chartStyle = {
    ...style,
    "--bbui-transaction-trends-chart-axis": `var(--bb-color-text-secondary, ${colors.textSecondary})`,
    "--bbui-transaction-trends-chart-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
    "--bbui-transaction-trends-chart-focus": `var(--bb-color-focus-ring, ${colors.focusRing})`,
    "--bbui-transaction-trends-chart-font-body": `var(--bb-font-body, ${budgetBoardTypography.body})`,
    "--bbui-transaction-trends-chart-hover": `var(--bb-color-surface-hover, ${colors.surfaceHover})`,
    "--bbui-transaction-trends-chart-tooltip-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
    "--bbui-transaction-trends-chart-tooltip-surface": `var(--bb-color-surface-overlay, ${colors.surfaceOverlay})`,
  } as CSSProperties;

  const getLegendKey = (item: ChartSeries) => item.legendLabel ?? item.label;
  const getFillOpacity = (item: ChartSeries) =>
    activeLegendKey === null
      ? 0.24
      : activeLegendKey === getLegendKey(item)
        ? 0.4
        : 0.08;
  const getStrokeOpacity = (item: ChartSeries) =>
    activeLegendKey === null || activeLegendKey === getLegendKey(item)
      ? 1
      : 0.25;

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
          <div
            className={classes.chartViewport}
            ref={viewportRef}
            style={{ height }}
          >
            <ComposedChart
              accessibilityLayer
              className={classes.chart ?? ""}
              data={chartData}
              height={chartHeight}
              margin={{ top: 12, right: 12, bottom: 8, left: 12 }}
              width={Math.max(width, 1)}
            >
              {includeGrid && (
                <CartesianGrid
                  stroke="var(--bbui-transaction-trends-chart-border)"
                  strokeDasharray="3 3"
                />
              )}
              <XAxis
                axisLine={{
                  stroke: "var(--bbui-transaction-trends-chart-border)",
                }}
                dataKey="day"
                tick={{
                  fill: "var(--bbui-transaction-trends-chart-axis)",
                  fontFamily: "var(--bbui-transaction-trends-chart-font-body)",
                  fontSize: "var(--mantine-font-size-xs, 0.75rem)",
                }}
                tickLine={false}
                tickMargin={8}
              />
              {includeYAxis && (
                <YAxis
                  axisLine={false}
                  tick={{
                    fill: "var(--bbui-transaction-trends-chart-axis)",
                    fontFamily:
                      "var(--bbui-transaction-trends-chart-font-body)",
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
                      typeof item.dataKey === "string"
                        ? item.dataKey
                        : undefined;
                    const chartSeriesItem = seriesKey
                      ? seriesByKey.get(seriesKey)
                      : undefined;
                    const value =
                      typeof item.value === "number" ? item.value : undefined;

                    return chartSeriesItem && value !== undefined
                      ? [{ ...chartSeriesItem, value }]
                      : [];
                  });
                  const visibleEntries = entries.filter(
                    (entry) =>
                      entry.type !== "line" ||
                      !entries.some(
                        (other) =>
                          other.type !== "line" &&
                          getLegendKey(other) === getLegendKey(entry) &&
                          other.value === entry.value,
                      ),
                  );
                  const activeDataPoint = chartData.find(
                    (datum) => datum.day === Number(label),
                  );
                  const summary =
                    activeDataPoint !== undefined
                      ? tooltipSummary?.(activeDataPoint)
                      : undefined;

                  if (visibleEntries.length === 0) {
                    return null;
                  }

                  return (
                    <div className={classes.tooltip} role="tooltip">
                      <BodyText size="xs" tone="secondary">
                        {label}
                      </BodyText>
                      <ul className={classes.tooltipRows}>
                        {visibleEntries.map((entry) => (
                          <li className={classes.tooltipRow} key={entry.key}>
                            <span
                              aria-hidden="true"
                              className={[
                                classes.tooltipMarker,
                                entry.type === "line"
                                  ? classes.tooltipLineMarker
                                  : undefined,
                              ]
                                .filter(Boolean)
                                .join(" ")}
                              style={
                                {
                                  "--bbui-transaction-trends-chart-marker":
                                    entry.color,
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
                      {summary !== undefined && summary !== null && (
                        <BodyText
                          className={classes.tooltipSummary}
                          size="xs"
                          tone="secondary"
                        >
                          {summary}
                        </BodyText>
                      )}
                    </div>
                  );
                }}
                cursor={{
                  fill: "var(--bbui-transaction-trends-chart-hover)",
                }}
                isAnimationActive={false}
                wrapperStyle={{ outline: "none" }}
              />
              {chartSeries.map((item) => {
                const dimmed =
                  activeLegendKey !== null &&
                  activeLegendKey !== getLegendKey(item);
                const seriesProps = {
                  activeDot: { r: 4 },
                  ...(dimmed ? { className: classes.seriesDimmed ?? "" } : {}),
                  dataKey: item.key,
                  name: item.label,
                  stroke: item.color,
                  strokeOpacity: getStrokeOpacity(item),
                  strokeWidth: activeLegendKey === getLegendKey(item) ? 3 : 2,
                  type: "monotone" as const,
                };

                if (item.type === "line") {
                  return (
                    <Line
                      {...seriesProps}
                      dot={false}
                      isAnimationActive={false}
                      key={item.key}
                      {...(item.strokeDasharray !== undefined
                        ? { strokeDasharray: item.strokeDasharray }
                        : {})}
                    />
                  );
                }

                return (
                  <Area
                    {...seriesProps}
                    dot={{ r: 3 }}
                    fill={item.color}
                    fillOpacity={getFillOpacity(item)}
                    isAnimationActive="auto"
                    key={item.key}
                  />
                );
              })}
            </ComposedChart>
          </div>
          <ul aria-label={`${ariaLabel} series`} className={classes.legend}>
            {legendItems.map((item) => (
              <li
                aria-label={item.series
                  .map((seriesItem) => seriesItem.label)
                  .join(", ")}
                className={classes.legendItem}
                key={item.key}
                onBlur={() => setFocusedLegendKey(null)}
                onFocus={() => setFocusedLegendKey(item.key)}
                onMouseEnter={() => setHoveredLegendKey(item.key)}
                onMouseLeave={() => setHoveredLegendKey(null)}
                tabIndex={0}
              >
                {item.series.length > 1 ? (
                  <span aria-hidden="true" className={classes.legendSwatches}>
                    {item.series.map((seriesItem) => (
                      <span
                        className={
                          seriesItem.type === "line"
                            ? classes.legendGroupLineSwatch
                            : classes.legendGroupAreaSwatch
                        }
                        key={seriesItem.key}
                        style={
                          {
                            "--bbui-transaction-trends-chart-series-color":
                              seriesItem.color,
                          } as CSSProperties
                        }
                      />
                    ))}
                  </span>
                ) : (
                  <span
                    aria-hidden="true"
                    className={[
                      classes.legendSwatch,
                      item.series[0]?.type === "line"
                        ? classes.legendLineSwatch
                        : undefined,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={
                      {
                        "--bbui-transaction-trends-chart-series-color":
                          item.series[0]?.color,
                      } as CSSProperties
                    }
                  />
                )}
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
