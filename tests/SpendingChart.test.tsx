import { MantineProvider } from "@mantine/core";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  budgetBoardColors,
  budgetBoardDataColors,
  budgetBoardTypography,
  SpendingChart,
  type SpendingChartData,
  type SpendingChartSeries,
} from "../src";
import chartClasses from "../src/SpendingChart/SpendingChart.module.css";

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

const chartData: SpendingChartData[] = [
  { day: 1, march: 0, april: 0 },
  { day: 2, march: 25, april: 18 },
  { day: 3, march: 40, april: 46 },
];

const series: SpendingChartSeries[] = [
  { key: "march", label: "March 2026" },
  { key: "april", label: "April 2026" },
];

const formatValue = (value: number) => `$${value.toLocaleString("en-US")}`;

function renderChart(
  overrides: Partial<React.ComponentProps<typeof SpendingChart>> = {},
) {
  return render(
    <SpendingChart
      ariaLabel="Cumulative spending by day"
      data={chartData}
      data-testid="spending-chart"
      formatValue={formatValue}
      series={series}
      {...overrides}
    />,
  );
}

function renderWithColorScheme(colorScheme: "light" | "dark") {
  return (
    <MantineProvider forceColorScheme={colorScheme}>
      <SpendingChart
        ariaLabel="Cumulative spending by day"
        data={chartData}
        data-testid="spending-chart"
        formatValue={formatValue}
        series={series}
      />
    </MantineProvider>
  );
}

describe("SpendingChart", () => {
  beforeEach(() => {
    document.documentElement.dataset.chartWidth = "880";
  });

  afterEach(() => {
    delete document.documentElement.dataset.chartWidth;
  });

  it("renders cumulative area series, axes, an optional grid, and a legend", () => {
    renderChart({ includeGrid: true });

    const chart = screen.getByRole("group", {
      name: "Cumulative spending by day",
    });

    expect(chart.querySelector("svg")).toBeInTheDocument();
    expect(chart.querySelectorAll(".recharts-area-curve")).toHaveLength(2);
    expect(
      chart.querySelectorAll(".recharts-area-dots .recharts-dot"),
    ).toHaveLength(chartData.length * series.length);
    expect(
      chart.querySelector(".recharts-area-dots .recharts-dot"),
    ).toHaveAttribute("r", "3");
    expect(chart.querySelector(".recharts-xAxis")).toBeInTheDocument();
    expect(chart.querySelector(".recharts-yAxis")).toBeInTheDocument();
    expect(chart.querySelector(".recharts-cartesian-grid")).toBeInTheDocument();
    expect(screen.getByText("March 2026")).toBeInTheDocument();
    expect(screen.getByText("April 2026")).toBeInTheDocument();
  });

  it("uses the BBUI data palette and semantic chart colors in both themes", () => {
    const { rerender } = render(renderWithColorScheme("light"));
    let chart = screen.getByTestId("spending-chart");

    expect(
      chart.style.getPropertyValue("--bbui-spending-chart-axis"),
    ).toContain(budgetBoardColors.light.textSecondary);
    expect(
      chart.style.getPropertyValue("--bbui-spending-chart-border"),
    ).toContain(budgetBoardColors.light.borderSubtle);
    expect(
      chart.style.getPropertyValue("--bbui-spending-chart-tooltip-surface"),
    ).toContain(budgetBoardColors.light.surfaceOverlay);
    expect(
      chart.querySelector(".recharts-area-curve"),
    ).toHaveAttribute("stroke", budgetBoardDataColors.light[0]);

    rerender(renderWithColorScheme("dark"));
    chart = screen.getByTestId("spending-chart");

    expect(
      chart.style.getPropertyValue("--bbui-spending-chart-focus"),
    ).toContain(budgetBoardColors.dark.focusRing);
    expect(
      chart.querySelector(".recharts-area-curve"),
    ).toHaveAttribute("stroke", budgetBoardDataColors.dark[0]);
  });

  it("uses BBUI body typography for the chart axis labels", () => {
    renderChart();

    const chart = screen.getByTestId("spending-chart");
    const axisLabels = chart.querySelectorAll(
      "text.recharts-cartesian-axis-tick-value",
    );

    expect(
      chart.style.getPropertyValue("--bbui-spending-chart-font-body"),
    ).toBe(`var(--bb-font-body, ${budgetBoardTypography.body})`);
    expect(axisLabels.length).toBeGreaterThan(0);
    axisLabels.forEach((label) => {
      expect(label).toHaveAttribute(
        "font-family",
        "var(--bbui-spending-chart-font-body)",
      );
    });
  });

  it("highlights the series corresponding to a hovered or focused legend item", async () => {
    renderChart();

    const chart = screen.getByTestId("spending-chart");
    const getAreaGroups = () => chart.querySelectorAll(".recharts-area");
    const marchLegend = screen.getByText("March 2026").closest("li");
    const aprilLegend = screen.getByText("April 2026").closest("li");

    expect(getAreaGroups()).toHaveLength(2);
    expect(marchLegend).not.toBeNull();
    expect(aprilLegend).not.toBeNull();

    fireEvent.mouseEnter(marchLegend!);

    await waitFor(() =>
      expect(getAreaGroups()[1]).toHaveClass(chartClasses.seriesDimmed),
    );
    expect(getAreaGroups()[0]).not.toHaveClass(chartClasses.seriesDimmed);
    expect(
      chart.querySelectorAll(".recharts-area-curve")[1],
    ).toHaveAttribute("stroke-opacity", "0.25");

    fireEvent.mouseLeave(marchLegend!);
    await waitFor(() =>
      expect(getAreaGroups()[1]).not.toHaveClass(chartClasses.seriesDimmed),
    );

    fireEvent.focus(aprilLegend!);

    expect(getAreaGroups()[0]).toHaveClass(chartClasses.seriesDimmed);
    expect(
      chart.querySelectorAll(".recharts-area-curve")[1],
    ).toHaveAttribute("stroke-width", "3");

    fireEvent.blur(aprilLegend!);
    expect(getAreaGroups()[0]).not.toHaveClass(chartClasses.seriesDimmed);
  });

  it("shows formatted series values in the keyboard-accessible tooltip", () => {
    renderChart();

    const chart = screen.getByTestId("spending-chart");
    const chartSurface = chart.querySelector(".recharts-surface");

    expect(chartSurface).not.toBeNull();
    fireEvent.focus(chartSurface!);
    fireEvent.keyDown(chartSurface!, { key: "ArrowRight" });

    expect(screen.getByRole("tooltip")).toHaveTextContent("2");
    expect(screen.getByRole("tooltip")).toHaveTextContent("March 2026");
    expect(screen.getByRole("tooltip")).toHaveTextContent("$25");
    expect(screen.getByRole("tooltip")).toHaveTextContent("April 2026");
    expect(screen.getByRole("tooltip")).toHaveTextContent("$18");
  });

  it("supports narrow containers and omitting optional axes and grid", () => {
    document.documentElement.dataset.chartWidth = "480";
    renderChart({ includeGrid: false, includeYAxis: false });

    const chart = screen.getByTestId("spending-chart");

    expect(chart.querySelector("svg")).toHaveAttribute("viewBox", "0 0 480 400");
    expect(chart.querySelector(".recharts-xAxis")).toBeInTheDocument();
    expect(chart.querySelector(".recharts-yAxis")).not.toBeInTheDocument();
    expect(chart.querySelector(".recharts-cartesian-grid")).not.toBeInTheDocument();
  });

  it("renders loading and empty states", () => {
    const { rerender } = renderChart({
      data: [],
      emptyMessage: "Select months to see spending.",
    });

    expect(screen.getByText("Select months to see spending.")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();

    rerender(
      <SpendingChart
        ariaLabel="Cumulative spending by day"
        data={chartData}
        data-testid="spending-chart"
        formatValue={formatValue}
        isLoading
        series={series}
      />,
    );

    expect(
      screen.getByRole("status", { name: "Cumulative spending by day" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("group")).toHaveAttribute("aria-busy", "true");
  });

  it("forwards root attributes and rejects invalid data and dimensions", () => {
    renderChart({
      className: "custom-chart",
      "data-custom": "forwarded",
    });

    const chart = screen.getByTestId("spending-chart");
    expect(chart).toHaveClass("custom-chart");
    expect(chart).toHaveAttribute("data-custom", "forwarded");

    expect(() =>
      renderChart({
        data: [{ day: Number.NaN, march: 0, april: 0 }],
      }),
    ).toThrow(RangeError);
    expect(() =>
      renderChart({
        data: [{ day: 1, march: Number.POSITIVE_INFINITY, april: 0 }],
      }),
    ).toThrow(RangeError);
    expect(() => renderChart({ height: 0 })).toThrow(RangeError);
  });
});
