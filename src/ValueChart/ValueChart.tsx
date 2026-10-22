import { useElementSize } from "@mantine/hooks";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { BodyText } from "../BodyText/BodyText";
import { Skeleton } from "../Skeleton/Skeleton";
import { getBudgetBoardDataColor } from "../colors";
import { budgetBoardTypography } from "../theme";
import { ensureBBUIMantineProvider, useBBUITheme } from "../shared/themeStyles";
import classes from "./ValueChart.module.css";

export interface ValueChartData {
  date: string;
  [seriesKey: string]: number | string;
}

export interface ValueChartSeries {
  key: string;
  label: string;
  color?: string;
}

export interface ValueChartProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  ariaLabel: string;
  data: ValueChartData[];
  emptyMessage?: ReactNode;
  formatValue: (value: number) => string;
  height?: number;
  isLoading?: boolean;
  series: ValueChartSeries[];
  totalLabel?: string;
}

interface ChartSeries extends ValueChartSeries {
  color: string;
}

function validateData(data: ValueChartData[], series: ValueChartSeries[]) {
  const seriesKeys = new Set<string>();

  series.forEach((item, index) => {
    if (!item.key.trim() || item.key === "date") {
      throw new RangeError(
        `Value chart series at index ${index} must have a non-empty key other than "date".`,
      );
    }

    if (!item.label.trim()) {
      throw new RangeError(
        `Value chart series at index ${index} must have a non-empty label.`,
      );
    }

    if (seriesKeys.has(item.key)) {
      throw new RangeError(
        `Value chart series key "${item.key}" must be unique.`,
      );
    }

    seriesKeys.add(item.key);
  });

  data.forEach((datum, index) => {
    if (typeof datum.date !== "string" || datum.date.trim().length === 0) {
      throw new RangeError(
        `Value chart datum at index ${index} must have a date label.`,
      );
    }

    series.forEach((item) => {
      const value = datum[item.key];

      if (
        value !== undefined &&
        (typeof value !== "number" || !Number.isFinite(value))
      ) {
        throw new RangeError(
          `Value chart datum at index ${index} must have a finite value for series "${item.key}".`,
        );
      }
    });
  });
}

export function ValueChart({
  ariaLabel,
  className,
  data,
  emptyMessage = "No value data available.",
  formatValue,
  height = 400,
  isLoading = false,
  series,
  style,
  totalLabel = "Total",
  ...rootProps
}: ValueChartProps) {
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
    throw new RangeError("Value chart height must be a positive number.");
  }

  const chartStyle = {
    ...style,
    "--bbui-value-chart-axis": `var(--bb-color-text-secondary, ${colors.textSecondary})`,
    "--bbui-value-chart-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
    "--bbui-value-chart-focus": `var(--bb-color-focus-ring, ${colors.focusRing})`,
    "--bbui-value-chart-font-body": `var(--bb-font-body, ${budgetBoardTypography.body})`,
    "--bbui-value-chart-hover": `var(--bb-color-surface-hover, ${colors.surfaceHover})`,
    "--bbui-value-chart-tooltip-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
    "--bbui-value-chart-tooltip-surface": `var(--bb-color-surface-overlay, ${colors.surfaceOverlay})`,
    "--bbui-value-chart-tooltip-total": `var(--bb-color-text-secondary, ${colors.textSecondary})`,
  } as CSSProperties;

  const getFillOpacity = (seriesKey: string) =>
    activeSeriesKey === seriesKey ? 0.8 : 0.4;
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
            <BarChart
              accessibilityLayer
              className={classes.chart ?? ""}
              data={chartData}
              height={height}
              margin={{ top: 12, right: 12, bottom: 8, left: 12 }}
              stackOffset="sign"
              width={Math.max(width, 1)}
            >
              <CartesianGrid
                stroke="var(--bbui-value-chart-border)"
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                axisLine={{ stroke: "var(--bbui-value-chart-border)" }}
                dataKey="date"
                tick={{
                  fill: "var(--bbui-value-chart-axis)",
                  fontFamily: "var(--bbui-value-chart-font-body)",
                  fontSize: "var(--mantine-font-size-xs, 0.75rem)",
                }}
                tickLine={false}
                tickMargin={8}
              />
              <YAxis
                axisLine={false}
                tick={{
                  fill: "var(--bbui-value-chart-axis)",
                  fontFamily: "var(--bbui-value-chart-font-body)",
                  fontSize: "var(--mantine-font-size-xs, 0.75rem)",
                }}
                tickFormatter={formatValue}
                tickLine={false}
                width={72}
              />
              <Tooltip
                content={({ active, label, payload }) => {
                  if (!active || !payload?.length) {
                    return null;
                  }

                  const entries = payload.flatMap((item) => {
                    const chartSeriesItem =
                      typeof item.dataKey === "string"
                        ? seriesByKey.get(item.dataKey)
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

                  const total = entries.reduce(
                    (sum, entry) => sum + entry.value,
                    0,
                  );

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
                                  "--bbui-value-chart-marker": entry.color,
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
                      <div className={classes.tooltipTotalRow}>
                        <span
                          aria-hidden="true"
                          className={[
                            classes.tooltipMarker,
                            classes.tooltipMarkerTotal,
                          ].join(" ")}
                        />
                        <BodyText size="sm" tone="secondary">
                          {totalLabel}
                        </BodyText>
                        <BodyText fw={600} size="sm" tone="primary">
                          {formatValue(total)}
                        </BodyText>
                      </div>
                    </div>
                  );
                }}
                cursor={{ fill: "var(--bbui-value-chart-hover)" }}
                isAnimationActive={false}
                wrapperStyle={{ outline: "none" }}
              />
              {chartSeries.map((item) => (
                <Bar
                  {...(activeSeriesKey !== null && activeSeriesKey !== item.key
                    ? { className: classes.seriesDimmed ?? "" }
                    : {})}
                  dataKey={item.key}
                  fill={item.color}
                  fillOpacity={getFillOpacity(item.key)}
                  key={item.key}
                  name={item.label}
                  stackId="values"
                  stroke={item.color}
                  strokeOpacity={getStrokeOpacity(item.key)}
                  {...(activeSeriesKey === item.key ? { strokeWidth: 2 } : {})}
                />
              ))}
            </BarChart>
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
                      "--bbui-value-chart-series-color": item.color,
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
