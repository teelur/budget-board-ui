import { MantineProvider } from "@mantine/core";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  budgetBoardColors,
  budgetBoardTypography,
  NetWorthChart,
  type NetWorthChartData,
  type NetWorthChartSeriesLabels,
} from "../src";
import chartClasses from "../src/NetWorthChart/NetWorthChart.module.css";

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

const chartData: NetWorthChartData[] = [
  { date: "August 2026", assets: 72500, liabilities: -18200, net: 54300 },
  { date: "September 2026", assets: 73900, liabilities: -19000, net: 54900 },
];

const seriesLabels: NetWorthChartSeriesLabels = {
  assets: "Assets",
  liabilities: "Liabilities",
  net: "Net",
};

const formatValue = (value: number) => `$${value.toLocaleString("en-US")}`;

function renderChart(
  overrides: Partial<React.ComponentProps<typeof NetWorthChart>> = {},
) {
  return render(
    <NetWorthChart
      ariaLabel="Net worth over time"
      data={chartData}
      data-testid="net-worth-chart"
      formatValue={formatValue}
      seriesLabels={seriesLabels}
      {...overrides}
    />,
  );
}

function renderWithColorScheme(colorScheme: "light" | "dark") {
  return (
    <MantineProvider forceColorScheme={colorScheme}>
      <NetWorthChart
        ariaLabel="Net worth over time"
        data={chartData}
        data-testid="net-worth-chart"
        formatValue={formatValue}
        seriesLabels={seriesLabels}
      />
    </MantineProvider>
  );
}

describe("NetWorthChart", () => {
  beforeEach(() => {
    document.documentElement.dataset.chartWidth = "880";
  });

  afterEach(() => {
    delete document.documentElement.dataset.chartWidth;
  });

  it("renders the accessible composite chart and localized series legend", () => {
    renderChart();

    const chart = screen.getByRole("group", { name: "Net worth over time" });

    expect(chart.querySelector("svg")).toBeInTheDocument();
    expect(chart.querySelectorAll(".recharts-bar-rectangle")).toHaveLength(4);
    expect(
      chart.querySelectorAll(".recharts-line-dots .recharts-dot"),
    ).toHaveLength(chartData.length);
    expect(
      chart.querySelector(".recharts-line-dots .recharts-dot"),
    ).toHaveAttribute("r", "3");
    expect(screen.getByText("August 2026")).toBeInTheDocument();
    expect(screen.getByText("Assets")).toBeInTheDocument();
    expect(screen.getByText("Liabilities")).toBeInTheDocument();
    expect(screen.getByText("Net")).toBeInTheDocument();
  });

  it("highlights the series corresponding to a hovered or focused legend item", async () => {
    renderChart();

    const chart = screen.getByTestId("net-worth-chart");
    const getBarGroups = () => chart.querySelectorAll(".recharts-bar");
    const getNetLine = () => chart.querySelector(".recharts-line-curve");
    const assetsLegend = screen.getByText("Assets").closest("li");
    const netLegend = screen.getByText("Net").closest("li");

    expect(getBarGroups()).toHaveLength(2);
    expect(getNetLine()).not.toBeNull();
    expect(assetsLegend).not.toBeNull();
    expect(netLegend).not.toBeNull();

    fireEvent.mouseEnter(assetsLegend!);

    await waitFor(() =>
      expect(getBarGroups()[1]).toHaveClass(chartClasses.seriesDimmed),
    );
    expect(getBarGroups()[0]).not.toHaveClass(chartClasses.seriesDimmed);
    expect(getNetLine()).toHaveAttribute("stroke-opacity", "0.25");

    fireEvent.mouseLeave(assetsLegend!);
    await waitFor(() =>
      expect(getBarGroups()[1]).not.toHaveClass(chartClasses.seriesDimmed),
    );

    fireEvent.focus(netLegend!);

    expect(getNetLine()).toHaveAttribute("stroke-width", "3.5");
    expect(getBarGroups()[0]).toHaveClass(chartClasses.seriesDimmed);
    expect(getBarGroups()[1]).toHaveClass(chartClasses.seriesDimmed);

    fireEvent.blur(netLegend!);
    expect(getNetLine()).toHaveAttribute("stroke-width", "2");
  });

  it("sizes the chart to a narrow container", () => {
    document.documentElement.dataset.chartWidth = "480";
    renderChart();

    expect(
      screen.getByTestId("net-worth-chart").querySelector("svg"),
    ).toHaveAttribute("viewBox", "0 0 480 400");
  });

  it("uses BBUI body typography for chart axis labels", () => {
    renderChart();

    const chart = screen.getByTestId("net-worth-chart");
    const axisLabels = chart.querySelectorAll(
      "text.recharts-cartesian-axis-tick-value",
    );

    expect(
      chart.style.getPropertyValue("--bbui-net-worth-chart-font-body"),
    ).toBe(`var(--bb-font-body, ${budgetBoardTypography.body})`);
    expect(axisLabels.length).toBeGreaterThan(0);
    axisLabels.forEach((label) => {
      expect(label).toHaveAttribute(
        "font-family",
        "var(--bbui-net-worth-chart-font-body)",
      );
    });
  });

  it("uses BBUI semantic series and surface colors in both themes", () => {
    const { rerender } = render(renderWithColorScheme("light"));
    const chart = screen.getByTestId("net-worth-chart");

    expect(
      chart.style.getPropertyValue("--bbui-net-worth-chart-assets"),
    ).toContain(budgetBoardColors.light.success);
    expect(
      chart.style.getPropertyValue("--bbui-net-worth-chart-liabilities"),
    ).toContain(budgetBoardColors.light.error);
    expect(
      chart.style.getPropertyValue("--bbui-net-worth-chart-tooltip-surface"),
    ).toContain(budgetBoardColors.light.surfaceOverlay);

    rerender(renderWithColorScheme("dark"));

    expect(
      chart.style.getPropertyValue("--bbui-net-worth-chart-assets"),
    ).toContain(budgetBoardColors.dark.success);
    expect(
      chart.style.getPropertyValue("--bbui-net-worth-chart-liabilities"),
    ).toContain(budgetBoardColors.dark.error);
    expect(
      chart.style.getPropertyValue("--bbui-net-worth-chart-focus"),
    ).toContain(budgetBoardColors.dark.focusRing);
  });

  it("shows signed formatted values in an accessible tooltip during keyboard navigation", () => {
    renderChart();

    const chart = screen.getByTestId("net-worth-chart");
    const chartSurface = chart.querySelector(".recharts-surface");

    expect(chartSurface).not.toBeNull();
    fireEvent.focus(chartSurface!);
    fireEvent.keyDown(chartSurface!, { key: "ArrowRight" });

    expect(screen.getByRole("tooltip")).toHaveTextContent("September 2026");
    expect(screen.getByRole("tooltip")).toHaveTextContent("$73,900");
    expect(screen.getByRole("tooltip")).toHaveTextContent("$-19,000");
    expect(screen.getByRole("tooltip")).toHaveTextContent("$54,900");
  });

  it("renders the loading and empty states", () => {
    const { rerender } = renderChart({
      data: [],
      emptyMessage: "Select an account to see net worth.",
    });

    expect(
      screen.getByText("Select an account to see net worth."),
    ).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();

    rerender(
      <NetWorthChart
        ariaLabel="Net worth over time"
        data={chartData}
        data-testid="net-worth-chart"
        formatValue={formatValue}
        isLoading
        seriesLabels={seriesLabels}
      />,
    );

    expect(
      screen.getByRole("status", { name: "Net worth over time" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("group")).toHaveAttribute("aria-busy", "true");
  });

  it("forwards root attributes and rejects invalid data and dimensions", () => {
    renderChart({
      className: "custom-chart",
      "data-custom": "forwarded",
    });

    const chart = screen.getByTestId("net-worth-chart");
    expect(chart).toHaveClass("custom-chart");
    expect(chart).toHaveAttribute("data-custom", "forwarded");

    expect(() =>
      renderChart({
        data: [
          {
            date: "August 2026",
            assets: Number.NaN,
            liabilities: 0,
            net: 0,
          },
        ],
      }),
    ).toThrow(RangeError);
    expect(() =>
      renderChart({
        data: [{ date: " ", assets: 0, liabilities: 0, net: 0 }],
      }),
    ).toThrow(RangeError);
    expect(() => renderChart({ height: 0 })).toThrow(RangeError);
  });
});
