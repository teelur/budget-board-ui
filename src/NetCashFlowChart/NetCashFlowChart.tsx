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
import { useBBUITheme, ensureBBUIMantineProvider } from "../shared/themeStyles";
import classes from "./NetCashFlowChart.module.css";

export interface NetCashFlowChartData {
  month: string;
  income: number;
  spending: number;
  net: number;
}

export interface NetCashFlowChartSeriesLabels {
  income: string;
  spending: string;
  net: string;
}

export interface NetCashFlowChartProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  ariaLabel: string;
  data: NetCashFlowChartData[];
  emptyMessage?: ReactNode;
  formatValue: (value: number) => string;
  height?: number;
  isLoading?: boolean;
  seriesLabels: NetCashFlowChartSeriesLabels;
}

type SeriesKey = keyof NetCashFlowChartSeriesLabels;

interface ChartSeries {
  key: SeriesKey;
  label: string;
  color: string;
  legendClassName: string;
}

function validateData(data: NetCashFlowChartData[]) {
  data.forEach((datum, index) => {
    if (
      !Number.isFinite(datum.income) ||
      !Number.isFinite(datum.spending) ||
      !Number.isFinite(datum.net)
    ) {
      throw new RangeError(
        `Net cash flow datum at index ${index} must contain finite values.`,
      );
    }
  });
}

export function NetCashFlowChart({
  ariaLabel,
  className,
  data,
  emptyMessage = "No cash flow data available.",
  formatValue,
  height = 400,
  isLoading = false,
  seriesLabels,
  style,
  ...rootProps
}: NetCashFlowChartProps) {
  const { colorScheme, colors, hasMantineContext } = useBBUITheme();
  const { ref: sizeRef, width } = useElementSize<HTMLDivElement>();
  const [hoveredSeriesKey, setHoveredSeriesKey] =
    useState<SeriesKey | null>(null);
  const [focusedSeriesKey, setFocusedSeriesKey] =
    useState<SeriesKey | null>(null);
  const activeSeriesKey = hoveredSeriesKey ?? focusedSeriesKey;
  const chartData = useMemo(() => {
    validateData(data);
    return data;
  }, [data]);
  const getFillOpacity = (seriesKey: SeriesKey, defaultOpacity: number) =>
    activeSeriesKey === null
      ? defaultOpacity
      : activeSeriesKey === seriesKey
        ? 0.8
        : defaultOpacity;
  const getStrokeOpacity = (seriesKey: SeriesKey) =>
    activeSeriesKey === null || activeSeriesKey === seriesKey ? 1 : 0.25;

  if (!Number.isFinite(height) || height <= 0) {
    throw new RangeError(
      "Net cash flow chart height must be a positive number.",
    );
  }

  const chartStyle = {
    ...style,
    "--bbui-net-cash-flow-font-body": `var(--bb-font-body, ${budgetBoardTypography.body})`,
    "--bbui-net-cash-flow-axis": `var(--bb-color-text-secondary, ${colors.textSecondary})`,
    "--bbui-net-cash-flow-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
    "--bbui-net-cash-flow-focus": `var(--bb-color-focus-ring, ${colors.focusRing})`,
    "--bbui-net-cash-flow-hover": `var(--bb-color-surface-hover, ${colors.surfaceHover})`,
    "--bbui-net-cash-flow-income": `var(--bb-color-success, ${colors.success})`,
    "--bbui-net-cash-flow-net": `var(--bb-color-text-primary, ${colors.textPrimary})`,
    "--bbui-net-cash-flow-spending": `var(--bb-color-error, ${colors.error})`,
    "--bbui-net-cash-flow-tooltip-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
    "--bbui-net-cash-flow-tooltip-surface": `var(--bb-color-surface-overlay, ${colors.surfaceOverlay})`,
  } as CSSProperties;

  const seriesColors: Record<SeriesKey, string> = {
    income: "var(--bbui-net-cash-flow-income)",
    spending: "var(--bbui-net-cash-flow-spending)",
    net: "var(--bbui-net-cash-flow-net)",
  };
  const chartSeries: ChartSeries[] = [
    {
      key: "income",
      label: seriesLabels.income,
      color: seriesColors.income,
      legendClassName: classes.legendIncome ?? "",
    },
    {
      key: "spending",
      label: seriesLabels.spending,
      color: seriesColors.spending,
      legendClassName: classes.legendSpending ?? "",
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
                stroke="var(--bbui-net-cash-flow-border)"
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                axisLine={{ stroke: "var(--bbui-net-cash-flow-border)" }}
                dataKey="month"
                tick={{
                  fill: "var(--bbui-net-cash-flow-axis)",
                  fontFamily: "var(--bbui-net-cash-flow-font-body)",
                  fontSize: "var(--mantine-font-size-xs, 0.75rem)",
                }}
                tickLine={false}
                tickMargin={8}
              />
              <YAxis
                axisLine={false}
                tick={{
                  fill: "var(--bbui-net-cash-flow-axis)",
                  fontFamily: "var(--bbui-net-cash-flow-font-body)",
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
                                  "--bbui-net-cash-flow-marker": entry.color,
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
                cursor={{ fill: "var(--bbui-net-cash-flow-hover)" }}
                wrapperStyle={{ outline: "none" }}
              />
              <Bar
                {...(activeSeriesKey !== null && activeSeriesKey !== "income"
                  ? { className: classes.seriesDimmed }
                  : {})}
                dataKey="income"
                fill={seriesColors.income}
                fillOpacity={getFillOpacity("income", 0.4)}
                name={seriesLabels.income}
                stackId="cash-flow"
                stroke={seriesColors.income}
                strokeOpacity={1}
                {...(activeSeriesKey === "income" ? { strokeWidth: 2 } : {})}
              />
              <Bar
                {...(activeSeriesKey !== null && activeSeriesKey !== "spending"
                  ? { className: classes.seriesDimmed }
                  : {})}
                dataKey="spending"
                fill={seriesColors.spending}
                fillOpacity={getFillOpacity("spending", 0.4)}
                name={seriesLabels.spending}
                stackId="cash-flow"
                stroke={seriesColors.spending}
                strokeOpacity={1}
                {...(activeSeriesKey === "spending"
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
