import { MantineProvider } from "@mantine/core";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  budgetBoardColors,
  budgetBoardDataColors,
  budgetBoardTypography,
  ValueChart,
  type ValueChartData,
  type ValueChartSeries,
} from "../src";
import chartClasses from "../src/ValueChart/ValueChart.module.css";

vi.mock("@mantine/hooks", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@mantine/hooks")>();

  return {
    ...actual,
    useElementSize: () => ({
      height: 0,
      ref: { current: null },
      width: Number(document.documentElement.dataset.chartWidth ?? 880),
    }),
  };
});

const chartData: ValueChartData[] = [
  { date: "August 2026", cash: 1000, investments: 5000, debt: -2000 },
  { date: "September 2026", cash: 1100, investments: 5400, debt: -2200 },
];

const series: ValueChartSeries[] = [
  { key: "cash", label: "Cash" },
  { key: "investments", label: "Investments" },
  { key: "debt", label: "Debt" },
];

const formatValue = (value: number) => `$${value.toLocaleString("en-US")}`;

function renderChart(
  overrides: Partial<React.ComponentProps<typeof ValueChart>> = {},
) {
  return render(
    <ValueChart
      ariaLabel="Values over time"
      data={chartData}
      data-testid="value-chart"
      formatValue={formatValue}
      series={series}
      {...overrides}
    />,
  );
}

function renderWithColorScheme(colorScheme: "light" | "dark") {
  return (
    <MantineProvider forceColorScheme={colorScheme}>
      <ValueChart
        ariaLabel="Values over time"
        data={chartData}
        data-testid="value-chart"
        formatValue={formatValue}
        series={series}
      />
    </MantineProvider>
  );
}

describe("ValueChart", () => {
  beforeEach(() => {
    document.documentElement.dataset.chartWidth = "880";
  });

  afterEach(() => {
    delete document.documentElement.dataset.chartWidth;
  });

  it("renders stacked bars, axes, and a localized series legend", () => {
    renderChart();

    const chart = screen.getByRole("group", { name: "Values over time" });

    expect(chart.querySelector("svg")).toBeInTheDocument();
    expect(chart.querySelectorAll(".recharts-bar")).toHaveLength(series.length);
    expect(chart.querySelectorAll(".recharts-bar-rectangle")).toHaveLength(
      chartData.length * series.length,
    );
    expect(chart.querySelector(".recharts-xAxis")).toBeInTheDocument();
    expect(chart.querySelector(".recharts-yAxis")).toBeInTheDocument();
    expect(chart.querySelector(".recharts-cartesian-grid")).toBeInTheDocument();
    expect(screen.getByText("August 2026")).toBeInTheDocument();
    expect(screen.getByText("Cash")).toBeInTheDocument();
    expect(screen.getByText("Investments")).toBeInTheDocument();
    expect(screen.getByText("Debt")).toBeInTheDocument();
  });

  it("uses the BBUI data palette and semantic chart colors in both themes", () => {
    const { rerender } = render(renderWithColorScheme("light"));
    let chart = screen.getByTestId("value-chart");

    expect(chart.style.getPropertyValue("--bbui-value-chart-axis")).toContain(
      budgetBoardColors.light.textSecondary,
    );
    expect(chart.style.getPropertyValue("--bbui-value-chart-border")).toContain(
      budgetBoardColors.light.borderSubtle,
    );
    expect(
      chart.style.getPropertyValue("--bbui-value-chart-tooltip-surface"),
    ).toContain(budgetBoardColors.light.surfaceOverlay);
    expect(
      chart
        .querySelector<HTMLElement>(`.${chartClasses.legendSwatch}`)
        ?.style.getPropertyValue("--bbui-value-chart-series-color"),
    ).toBe(budgetBoardDataColors.light[0]);

    rerender(renderWithColorScheme("dark"));
    chart = screen.getByTestId("value-chart");

    expect(chart.style.getPropertyValue("--bbui-value-chart-focus")).toContain(
      budgetBoardColors.dark.focusRing,
    );
    expect(
      chart
        .querySelector<HTMLElement>(`.${chartClasses.legendSwatch}`)
        ?.style.getPropertyValue("--bbui-value-chart-series-color"),
    ).toBe(budgetBoardDataColors.dark[0]);
  });

  it("uses BBUI body typography for the chart axis labels", () => {
    renderChart();

    const chart = screen.getByTestId("value-chart");
    const axisLabels = chart.querySelectorAll(
      "text.recharts-cartesian-axis-tick-value",
    );

    expect(chart.style.getPropertyValue("--bbui-value-chart-font-body")).toBe(
      `var(--bb-font-body, ${budgetBoardTypography.body})`,
    );
    expect(axisLabels.length).toBeGreaterThan(0);
    axisLabels.forEach((label) => {
      expect(label).toHaveAttribute(
        "font-family",
        "var(--bbui-value-chart-font-body)",
      );
    });
  });

  it("highlights the series corresponding to a hovered or focused legend item", async () => {
    renderChart();

    const chart = screen.getByTestId("value-chart");
    const getBars = () => chart.querySelectorAll(".recharts-bar");
    const cashLegend = screen.getByText("Cash").closest("li");
    const debtLegend = screen.getByText("Debt").closest("li");

    expect(getBars()).toHaveLength(3);
    expect(cashLegend).not.toBeNull();
    expect(debtLegend).not.toBeNull();

    fireEvent.mouseEnter(cashLegend!);

    await waitFor(() =>
      expect(getBars()[1]).toHaveClass(chartClasses.seriesDimmed),
    );
    expect(getBars()[0]).not.toHaveClass(chartClasses.seriesDimmed);
    expect(getBars()[2]).toHaveClass(chartClasses.seriesDimmed);

    fireEvent.mouseLeave(cashLegend!);
    await waitFor(() =>
      expect(getBars()[1]).not.toHaveClass(chartClasses.seriesDimmed),
    );

    fireEvent.focus(debtLegend!);

    expect(getBars()[0]).toHaveClass(chartClasses.seriesDimmed);
    expect(getBars()[1]).toHaveClass(chartClasses.seriesDimmed);

    fireEvent.blur(debtLegend!);
    expect(getBars()[0]).not.toHaveClass(chartClasses.seriesDimmed);
  });

  it("shows signed formatted values and their total in the keyboard tooltip", () => {
    renderChart({ totalLabel: "Combined value" });

    const chart = screen.getByTestId("value-chart");
    const chartSurface = chart.querySelector(".recharts-surface");

    expect(chartSurface).not.toBeNull();
    fireEvent.focus(chartSurface!);
    fireEvent.keyDown(chartSurface!, { key: "ArrowRight" });

    const tooltip = screen.getByRole("tooltip");
    expect(tooltip).toHaveTextContent("September 2026");
    expect(tooltip).toHaveTextContent("Cash");
    expect(tooltip).toHaveTextContent("$1,100");
    expect(tooltip).toHaveTextContent("Investments");
    expect(tooltip).toHaveTextContent("$5,400");
    expect(tooltip).toHaveTextContent("Debt");
    expect(tooltip).toHaveTextContent("$-2,200");
    expect(tooltip).toHaveTextContent("Combined value");
    expect(tooltip).toHaveTextContent("$4,300");
  });

  it("supports narrow containers and renders loading and empty states", () => {
    document.documentElement.dataset.chartWidth = "480";
    const { rerender } = renderChart({
      data: [],
      emptyMessage: "Select values to see the chart.",
    });

    expect(
      screen.getByText("Select values to see the chart."),
    ).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();

    rerender(
      <ValueChart
        ariaLabel="Values over time"
        data={chartData}
        data-testid="value-chart"
        formatValue={formatValue}
        isLoading
        series={series}
      />,
    );

    expect(
      screen.getByRole("status", { name: "Values over time" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("group")).toHaveAttribute("aria-busy", "true");

    rerender(
      <ValueChart
        ariaLabel="Values over time"
        data={chartData}
        data-testid="value-chart"
        formatValue={formatValue}
        series={series}
      />,
    );
    expect(
      screen.getByTestId("value-chart").querySelector("svg"),
    ).toHaveAttribute("viewBox", "0 0 480 400");
  });

  it("forwards root attributes and rejects invalid data, series, and dimensions", () => {
    renderChart({
      className: "custom-chart",
      "data-custom": "forwarded",
    });

    const chart = screen.getByTestId("value-chart");
    expect(chart).toHaveClass("custom-chart");
    expect(chart).toHaveAttribute("data-custom", "forwarded");

    expect(() =>
      renderChart({
        data: [{ date: " ", cash: 0 }],
      }),
    ).toThrow(RangeError);
    expect(() =>
      renderChart({
        data: [{ date: "October 2026", cash: Number.POSITIVE_INFINITY }],
      }),
    ).toThrow(RangeError);
    expect(() =>
      renderChart({
        series: [{ key: "date", label: "Date" }],
      }),
    ).toThrow(RangeError);
    expect(() =>
      renderChart({
        series: [
          { key: "cash", label: "Cash" },
          { key: "cash", label: "Cash again" },
        ],
      }),
    ).toThrow(RangeError);
    expect(() => renderChart({ height: 0 })).toThrow(RangeError);
  });
});
