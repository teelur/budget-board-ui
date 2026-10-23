import { useElementSize } from "@mantine/hooks";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BodyText } from "../BodyText/BodyText";
import { Skeleton } from "../Skeleton/Skeleton";
import { budgetBoardTypography } from "../theme";
import { ensureBBUIMantineProvider, useBBUITheme } from "../shared/themeStyles";
import classes from "./NetWorthChart.module.css";

export interface NetWorthChartData {
  date: string;
  assets: number;
  liabilities: number;
  net: number;
}

export interface NetWorthChartSeriesLabels {
  assets: string;
  liabilities: string;
  net: string;
}

export interface NetWorthChartProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  ariaLabel: string;
  data: NetWorthChartData[];
  emptyMessage?: ReactNode;
  formatValue: (value: number) => string;
  height?: number;
  isLoading?: boolean;
  seriesLabels: NetWorthChartSeriesLabels;
}

type SeriesKey = keyof NetWorthChartSeriesLabels;

interface ChartSeries {
  key: SeriesKey;
  label: string;
  color: string;
  legendClassName: string;
}

function validateData(data: NetWorthChartData[]) {
  data.forEach((datum, index) => {
    if (typeof datum.date !== "string" || datum.date.trim().length === 0) {
      throw new RangeError(
        `Net worth datum at index ${index} must have a date label.`,
      );
    }

    if (
      !Number.isFinite(datum.assets) ||
      !Number.isFinite(datum.liabilities) ||
      !Number.isFinite(datum.net)
    ) {
      throw new RangeError(
        `Net worth datum at index ${index} must contain finite values.`,
      );
    }
  });
}

export function NetWorthChart({
  ariaLabel,
  className,
  data,
  emptyMessage = "No net worth data available.",
  formatValue,
  height = 400,
  isLoading = false,
  seriesLabels,
  style,
  ...rootProps
}: NetWorthChartProps) {
  const { colorScheme, colors, hasMantineContext } = useBBUITheme();
  const { ref: sizeRef, width } = useElementSize<HTMLDivElement>();
  const [hoveredSeriesKey, setHoveredSeriesKey] = useState<SeriesKey | null>(
    null,
  );
  const [focusedSeriesKey, setFocusedSeriesKey] = useState<SeriesKey | null>(
    null,
  );
  const activeSeriesKey = hoveredSeriesKey ?? focusedSeriesKey;
  const chartData = useMemo(() => {
    validateData(data);
    return data;
  }, [data]);
  const getFillOpacity = (seriesKey: SeriesKey) =>
    activeSeriesKey === seriesKey ? 0.8 : 0.4;
  const getStrokeOpacity = (seriesKey: SeriesKey) =>
    activeSeriesKey === null || activeSeriesKey === seriesKey ? 1 : 0.25;

  if (!Number.isFinite(height) || height <= 0) {
    throw new RangeError("Net worth chart height must be a positive number.");
  }

  const chartStyle = {
    ...style,
    "--bbui-net-worth-chart-assets": `var(--bb-color-success, ${colors.success})`,
    "--bbui-net-worth-chart-axis": `var(--bb-color-text-secondary, ${colors.textSecondary})`,
    "--bbui-net-worth-chart-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
    "--bbui-net-worth-chart-focus": `var(--bb-color-focus-ring, ${colors.focusRing})`,
    "--bbui-net-worth-chart-font-body": `var(--bb-font-body, ${budgetBoardTypography.body})`,
    "--bbui-net-worth-chart-hover": `var(--bb-color-surface-hover, ${colors.surfaceHover})`,
    "--bbui-net-worth-chart-liabilities": `var(--bb-color-error, ${colors.error})`,
    "--bbui-net-worth-chart-net": `var(--bb-color-text-primary, ${colors.textPrimary})`,
    "--bbui-net-worth-chart-tooltip-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
    "--bbui-net-worth-chart-tooltip-surface": `var(--bb-color-surface-overlay, ${colors.surfaceOverlay})`,
  } as CSSProperties;

  const seriesColors: Record<SeriesKey, string> = {
    assets: "var(--bbui-net-worth-chart-assets)",
    liabilities: "var(--bbui-net-worth-chart-liabilities)",
    net: "var(--bbui-net-worth-chart-net)",
  };
  const chartSeries: ChartSeries[] = [
    {
      key: "assets",
      label: seriesLabels.assets,
      color: seriesColors.assets,
      legendClassName: classes.legendAssets ?? "",
    },
    {
      key: "liabilities",
      label: seriesLabels.liabilities,
      color: seriesColors.liabilities,
      legendClassName: classes.legendLiabilities ?? "",
    },
    {
      key: "net",
      label: seriesLabels.net,
      color: seriesColors.net,
      legendClassName: classes.legendNet ?? "",
    },
  ];
  const seriesByKey = new Map<string, ChartSeries>(
    chartSeries.map((series) => [series.key, series]),
  );

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
      ) : chartData.length === 0 ? (
        <BodyText className={classes.emptyMessage} component="p" tone="muted">
          {emptyMessage}
        </BodyText>
      ) : (
        <>
          <div className={classes.chartViewport} style={{ height }}>
            <ComposedChart
              accessibilityLayer
              className={classes.chart ?? ""}
              data={chartData}
              height={height}
              margin={{ top: 12, right: 12, bottom: 8, left: 12 }}
              stackOffset="sign"
              width={Math.max(width, 1)}
            >
              <CartesianGrid
                stroke="var(--bbui-net-worth-chart-border)"
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                axisLine={{ stroke: "var(--bbui-net-worth-chart-border)" }}
                dataKey="date"
                tick={{
                  fill: "var(--bbui-net-worth-chart-axis)",
                  fontFamily: "var(--bbui-net-worth-chart-font-body)",
                  fontSize: "var(--mantine-font-size-xs, 0.75rem)",
                }}
                tickLine={false}
                tickMargin={8}
              />
              <YAxis
                axisLine={false}
                tick={{
                  fill: "var(--bbui-net-worth-chart-axis)",
                  fontFamily: "var(--bbui-net-worth-chart-font-body)",
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
                    const itemSeries =
                      typeof item.dataKey === "string"
                        ? seriesByKey.get(item.dataKey)
                        : undefined;
                    const value =
                      typeof item.value === "number" ? item.value : undefined;

                    return itemSeries && value !== undefined
                      ? [{ ...itemSeries, value }]
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
                              className={[
                                classes.tooltipMarker,
                                entry.key === "net"
                                  ? classes.tooltipMarkerNet
                                  : "",
                              ]
                                .filter(Boolean)
                                .join(" ")}
                              style={
                                {
                                  "--bbui-net-worth-chart-marker": entry.color,
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
                cursor={{ fill: "var(--bbui-net-worth-chart-hover)" }}
                wrapperStyle={{ outline: "none" }}
              />
              <Bar
                {...(activeSeriesKey !== null && activeSeriesKey !== "assets"
                  ? { className: classes.seriesDimmed }
                  : {})}
                dataKey="assets"
                fill={seriesColors.assets}
                fillOpacity={getFillOpacity("assets")}
                name={seriesLabels.assets}
                stackId="net-worth"
                stroke={seriesColors.assets}
                strokeOpacity={1}
                {...(activeSeriesKey === "assets" ? { strokeWidth: 2 } : {})}
              />
              <Bar
                {...(activeSeriesKey !== null &&
                activeSeriesKey !== "liabilities"
                  ? { className: classes.seriesDimmed }
                  : {})}
                dataKey="liabilities"
                fill={seriesColors.liabilities}
                fillOpacity={getFillOpacity("liabilities")}
                name={seriesLabels.liabilities}
                stackId="net-worth"
                stroke={seriesColors.liabilities}
                strokeOpacity={1}
                {...(activeSeriesKey === "liabilities"
                  ? { strokeWidth: 2 }
                  : {})}
              />
              <Line
                activeDot={{ r: 4 }}
                dataKey="net"
                dot={{ r: 3 }}
                name={seriesLabels.net}
                stroke={seriesColors.net}
                strokeOpacity={getStrokeOpacity("net")}
                strokeWidth={activeSeriesKey === "net" ? 3.5 : 2}
                type="linear"
              />
            </ComposedChart>
          </div>
          <ul className={classes.legend}>
            {chartSeries.map((series) => (
              <li
                className={classes.legendItem}
                key={series.key}
                onBlur={() => setFocusedSeriesKey(null)}
                onFocus={() => setFocusedSeriesKey(series.key)}
                onMouseEnter={() => setHoveredSeriesKey(series.key)}
                onMouseLeave={() => setHoveredSeriesKey(null)}
                tabIndex={0}
              >
                <span
                  aria-hidden="true"
                  className={[
                    classes.legendSwatch,
                    series.legendClassName,
                  ].join(" ")}
                />
                <BodyText fw={500} size="xs" tone="secondary">
                  {series.label}
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
