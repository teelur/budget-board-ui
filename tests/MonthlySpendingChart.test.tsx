import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  budgetBoardColors,
  budgetBoardDataColors,
  budgetBoardTypography,
  MonthlySpendingChart,
  type MonthlySpendingChartData,
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

const chartData: MonthlySpendingChartData[] = [
  { month: "January 2026", total: 120 },
  { month: "February 2026", total: -40 },
  { month: "March 2026", total: 160 },
];

const formatValue = (value: number) => `$${value.toLocaleString("en-US")}`;

function renderChart(
  overrides: Partial<React.ComponentProps<typeof MonthlySpendingChart>> = {},
) {
  return render(
    <MonthlySpendingChart
      ariaLabel="Monthly spending"
      average={80}
      averageLabel="Average spending"
      data={chartData}
      data-testid="monthly-spending-chart"
      formatValue={formatValue}
      {...overrides}
    />,
  );
}

function renderWithColorScheme(colorScheme: "light" | "dark") {
  return (
    <MantineProvider forceColorScheme={colorScheme}>
      <MonthlySpendingChart
        ariaLabel="Monthly spending"
        average={80}
        averageLabel="Average spending"
        data={chartData}
        data-testid="monthly-spending-chart"
        formatValue={formatValue}
      />
    </MantineProvider>
  );
}

describe("MonthlySpendingChart", () => {
  beforeEach(() => {
    document.documentElement.dataset.chartWidth = "880";
  });

  afterEach(() => {
    delete document.documentElement.dataset.chartWidth;
  });

  it("renders monthly bars, average summary and reference line, axes, and optional grid", () => {
    renderChart({ includeGrid: true });

    const chart = screen.getByRole("group", { name: "Monthly spending" });

    expect(chart.querySelector("svg")).toBeInTheDocument();
    const bars = chart.querySelectorAll(".recharts-bar-rectangle");
    expect(bars).toHaveLength(3);
    expect(chart.querySelector(".recharts-xAxis")).toBeInTheDocument();
    expect(chart.querySelector(".recharts-yAxis")).toBeInTheDocument();
    expect(chart.querySelector(".recharts-cartesian-grid")).toBeInTheDocument();
    expect(chart.querySelector(".recharts-reference-line")).toBeInTheDocument();
    expect(screen.getByText("January 2026")).toBeInTheDocument();
    expect(screen.getByText("Average spending")).toBeInTheDocument();
    expect(screen.queryByText("Average")).not.toBeInTheDocument();
    expect(screen.getByText("$80")).toBeInTheDocument();
  });

  it("uses BBUI colors and typography in light and dark themes", () => {
    const { rerender } = render(renderWithColorScheme("light"));
    let chart = screen.getByTestId("monthly-spending-chart");

    expect(
      chart.style.getPropertyValue("--bbui-monthly-spending-chart-axis"),
    ).toContain(budgetBoardColors.light.textSecondary);
    expect(
      chart.style.getPropertyValue("--bbui-monthly-spending-chart-border"),
    ).toContain(budgetBoardColors.light.borderSubtle);
    expect(
      chart.style.getPropertyValue("--bbui-monthly-spending-chart-font-body"),
    ).toBe(`var(--bb-font-body, ${budgetBoardTypography.body})`);
    expect(
      chart.style.getPropertyValue("--bbui-monthly-spending-chart-bar"),
    ).toBe(budgetBoardDataColors.light[0]);

    rerender(renderWithColorScheme("dark"));
    chart = screen.getByTestId("monthly-spending-chart");

    expect(
      chart.style.getPropertyValue("--bbui-monthly-spending-chart-focus"),
    ).toContain(budgetBoardColors.dark.focusRing);
    expect(
      chart.style.getPropertyValue("--bbui-monthly-spending-chart-bar"),
    ).toBe(budgetBoardDataColors.dark[0]);
  });

  it("supports narrow containers and omitting optional axes and grid", () => {
    document.documentElement.dataset.chartWidth = "480";
    renderChart({ includeGrid: false, includeYAxis: false });

    const chart = screen.getByTestId("monthly-spending-chart");

    expect(chart.querySelector("svg")).toHaveAttribute("viewBox", "0 0 480 400");
    expect(chart.querySelector(".recharts-xAxis")).toBeInTheDocument();
    expect(chart.querySelector(".recharts-yAxis")).not.toBeInTheDocument();
    expect(chart.querySelector(".recharts-cartesian-grid")).not.toBeInTheDocument();
  });

  it("shows a skeleton without data and retains content during refreshes", () => {
    const { rerender } = renderChart({
      data: [],
      emptyMessage: "Select months to see spending.",
    });

    expect(
      screen.getByText("Select months to see spending."),
    ).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();

    rerender(
      <MonthlySpendingChart
        ariaLabel="Monthly spending"
        average={80}
        averageLabel="Average spending"
        data={[]}
        data-testid="monthly-spending-chart"
        formatValue={formatValue}
        isLoading
      />,
    );

    expect(
      screen.getByRole("status", { name: "Monthly spending" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("group")).toHaveAttribute("aria-busy", "true");

    rerender(
      <MonthlySpendingChart
        ariaLabel="Monthly spending"
        average={80}
        averageLabel="Average spending"
        data={chartData}
        data-testid="monthly-spending-chart"
        formatValue={formatValue}
        isLoading
      />,
    );

    const chart = screen.getByRole("group", { name: "Monthly spending" });
    expect(chart).toHaveAttribute("aria-busy", "true");
    expect(chart.querySelector("svg")).toBeInTheDocument();
    expect(chart.querySelector(".recharts-xAxis")).toBeInTheDocument();
    expect(screen.getByText("January 2026")).toBeInTheDocument();
    expect(screen.getByText("Average spending")).toBeInTheDocument();
    expect(screen.getByText("$80")).toBeInTheDocument();
    expect(screen.getByText("$120")).toBeInTheDocument();
    expect(
      screen.queryByRole("status", { name: "Monthly spending" }),
    ).not.toBeInTheDocument();
  });

  it("forwards root attributes and rejects invalid data and dimensions", () => {
    renderChart({
      className: "custom-chart",
      "data-custom": "forwarded",
    });

    const chart = screen.getByTestId("monthly-spending-chart");
    expect(chart).toHaveClass("custom-chart");
    expect(chart).toHaveAttribute("data-custom", "forwarded");

    expect(() =>
      renderChart({
        data: [{ month: "April 2026", total: Number.NaN }],
      }),
    ).toThrow(RangeError);
    expect(() => renderChart({ average: Number.POSITIVE_INFINITY })).toThrow(
      RangeError,
    );
    expect(() => renderChart({ height: 0 })).toThrow(RangeError);
  });
});
