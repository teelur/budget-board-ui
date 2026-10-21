import { MantineProvider } from "@mantine/core";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  budgetBoardColors,
  budgetBoardTypography,
  NetCashFlowChart,
  type NetCashFlowChartData,
  type NetCashFlowChartSeriesLabels,
} from "../src";

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

const chartData: NetCashFlowChartData[] = [
  { month: "August 2026", income: 4200, spending: -3350, net: 850 },
  { month: "September 2026", income: 4600, spending: -3890, net: 710 },
];

const seriesLabels: NetCashFlowChartSeriesLabels = {
  income: "Income",
  spending: "Spending",
  net: "Net",
};

const formatValue = (value: number) => `$${value.toLocaleString("en-US")}`;

function renderChart(
  overrides: Partial<React.ComponentProps<typeof NetCashFlowChart>> = {},
) {
  return render(
    <NetCashFlowChart
      ariaLabel="Net cash flow by month"
      data={chartData}
      data-testid="net-cash-flow-chart"
      formatValue={formatValue}
      seriesLabels={seriesLabels}
      {...overrides}
    />,
  );
}

function renderWithColorScheme(colorScheme: "light" | "dark") {
  return (
    <MantineProvider forceColorScheme={colorScheme}>
      <NetCashFlowChart
        ariaLabel="Net cash flow by month"
        data={chartData}
        data-testid="net-cash-flow-chart"
        formatValue={formatValue}
        seriesLabels={seriesLabels}
      />
    </MantineProvider>
  );
}

describe("NetCashFlowChart", () => {
  beforeEach(() => {
    document.documentElement.dataset.chartWidth = "880";
  });

  afterEach(() => {
    delete document.documentElement.dataset.chartWidth;
  });

  it("renders the accessible composite chart and localized series legend", () => {
    renderChart();

    const chart = screen.getByRole("group", {
      name: "Net cash flow by month",
    });

    expect(chart.querySelector("svg")).toBeInTheDocument();
    expect(chart.querySelectorAll(".recharts-bar-rectangle").length).toBe(4);
    expect(screen.getByText("August 2026")).toBeInTheDocument();
    expect(screen.getByText("Income")).toBeInTheDocument();
    expect(screen.getByText("Spending")).toBeInTheDocument();
    expect(screen.getByText("Net")).toBeInTheDocument();
  });

  it("sizes the chart to a narrow container", () => {
    document.documentElement.dataset.chartWidth = "480";
    renderChart();

    expect(
      screen.getByTestId("net-cash-flow-chart").querySelector("svg"),
    ).toHaveAttribute("viewBox", "0 0 480 400");
  });

  it("uses BBUI body typography for chart axis labels", () => {
    renderChart();

    const chart = screen.getByTestId("net-cash-flow-chart");
    const axisLabels = chart.querySelectorAll(
      "text.recharts-cartesian-axis-tick-value",
    );

    expect(
      chart.style.getPropertyValue("--bbui-net-cash-flow-font-body"),
    ).toBe(`var(--bb-font-body, ${budgetBoardTypography.body})`);
    expect(axisLabels.length).toBeGreaterThan(0);
    axisLabels.forEach((label) => {
      expect(label).toHaveAttribute(
        "font-family",
        "var(--bbui-net-cash-flow-font-body)",
      );
    });
  });

  it("uses BBUI semantic series and surface colors in both themes", () => {
    const { rerender } = render(renderWithColorScheme("light"));
    const chart = screen.getByTestId("net-cash-flow-chart");

    expect(
      chart.style.getPropertyValue("--bbui-net-cash-flow-income"),
    ).toContain(budgetBoardColors.light.success);
    expect(
      chart.style.getPropertyValue("--bbui-net-cash-flow-spending"),
    ).toContain(budgetBoardColors.light.error);
    expect(
      chart.style.getPropertyValue("--bbui-net-cash-flow-tooltip-surface"),
    ).toContain(budgetBoardColors.light.surfaceOverlay);

    rerender(renderWithColorScheme("dark"));

    expect(
      chart.style.getPropertyValue("--bbui-net-cash-flow-income"),
    ).toContain(budgetBoardColors.dark.success);
    expect(
      chart.style.getPropertyValue("--bbui-net-cash-flow-spending"),
    ).toContain(budgetBoardColors.dark.error);
    expect(
      chart.style.getPropertyValue("--bbui-net-cash-flow-focus"),
    ).toContain(budgetBoardColors.dark.focusRing);
  });

  it("shows the formatted values in an accessible tooltip during keyboard navigation", () => {
    renderChart();

    const chart = screen.getByTestId("net-cash-flow-chart");
    const chartSurface = chart.querySelector(".recharts-surface");

    expect(chartSurface).not.toBeNull();
    fireEvent.focus(chartSurface!);
    fireEvent.keyDown(chartSurface!, { key: "ArrowRight" });

    expect(screen.getByRole("tooltip")).toHaveTextContent("September 2026");
    expect(screen.getByRole("tooltip")).toHaveTextContent("$4,600");
    expect(screen.getByRole("tooltip")).toHaveTextContent("$-3,890");
    expect(screen.getByRole("tooltip")).toHaveTextContent("$710");
  });

  it("renders the loading and empty states", () => {
    const { rerender } = renderChart({
      data: [],
      emptyMessage: "Select a month to see cash flow.",
    });

    expect(
      screen.getByText("Select a month to see cash flow."),
    ).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();

    rerender(
      <NetCashFlowChart
        ariaLabel="Net cash flow by month"
        data={chartData}
        formatValue={formatValue}
        isLoading
        seriesLabels={seriesLabels}
      />,
    );

    expect(
      screen.getByRole("status", { name: "Net cash flow by month" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("group")).toHaveAttribute("aria-busy", "true");
  });

  it("rejects non-finite chart values and non-positive heights", () => {
    expect(() =>
      renderChart({
        data: [
          { month: "August 2026", income: Number.NaN, spending: 0, net: 0 },
        ],
      }),
    ).toThrow(RangeError);

    expect(() => renderChart({ height: 0 })).toThrow(RangeError);
  });
});
