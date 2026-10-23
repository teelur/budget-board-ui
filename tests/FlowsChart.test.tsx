import { MantineProvider } from "@mantine/core";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { SankeyProps } from "recharts";
import {
  budgetBoardColors,
  budgetBoardTypography,
  FlowsChart,
  type FlowsChartData,
  type FlowsChartLabels,
} from "../src";
import chartClasses from "../src/FlowsChart/FlowsChart.module.css";

vi.mock("recharts", async (importOriginal) => {
  const actual = await importOriginal<typeof import("recharts")>();
  const React = await import("react");

  return {
    ...actual,
    ResponsiveContainer: ({
      children,
      height,
    }: {
      children?: React.ReactNode;
      height?: number | string;
    }) => {
      if (!React.isValidElement<SankeyProps>(children)) {
        return null;
      }

      return React.cloneElement(children, {
        height: typeof height === "number" ? height : 750,
        width: Number(document.documentElement.dataset.chartWidth ?? 880),
      });
    },
  };
});

const chartData: FlowsChartData = {
  nodes: [
    { name: "Salary", flowType: "income", transactionCount: 1 },
    { name: "Income", flowType: "income", transactionCount: 1 },
    { name: "Cash available" },
    { name: "Living", flowType: "expense", transactionCount: 2 },
    {
      name: "Housing",
      parentName: "Living",
      flowType: "expense",
      transactionCount: 1,
    },
    {
      name: "Food",
      parentName: "Living",
      flowType: "expense",
      transactionCount: 1,
    },
    { name: "Surplus", flowType: "surplus" },
  ],
  links: [
    {
      source: 0,
      target: 1,
      value: 4800,
      transactionCount: 1,
      flowType: "income",
    },
    {
      source: 1,
      target: 2,
      value: 4800,
      transactionCount: 1,
      flowType: "income",
    },
    {
      source: 2,
      target: 3,
      value: 3300,
      transactionCount: 2,
      flowType: "expense",
    },
    {
      source: 3,
      target: 4,
      value: 2200,
      transactionCount: 1,
      flowType: "expense",
    },
    {
      source: 3,
      target: 5,
      value: 1100,
      transactionCount: 1,
      flowType: "expense",
    },
    { source: 2, target: 6, value: 1500, flowType: "surplus" },
  ],
  totalIncome: 4800,
  totalSpending: 3300,
};

const labels: FlowsChartLabels = {
  cashAvailable: "Cash available",
  amount: "Amount",
  from: "From",
  to: "To",
  percentOfIncome: "Percent of income",
  percentOfSpending: "Percent of spending",
  percentOfBranch: "Percent of branch",
  transactions: "Transactions",
  income: "Income",
  expense: "Expense",
  surplus: "Surplus",
  deficit: "Deficit",
};

const formatValue = (value: number) => `$${value.toLocaleString("en-US")}`;

function renderChart(
  overrides: Partial<React.ComponentProps<typeof FlowsChart>> = {},
) {
  return render(
    <FlowsChart
      ariaLabel="Transaction flows"
      data={chartData}
      data-testid="flows-chart"
      formatValue={formatValue}
      labels={labels}
      {...overrides}
    />,
  );
}

function renderWithColorScheme(colorScheme: "light" | "dark") {
  return (
    <MantineProvider forceColorScheme={colorScheme}>
      <FlowsChart
        ariaLabel="Transaction flows"
        data={chartData}
        data-testid="flows-chart"
        formatValue={formatValue}
        labels={labels}
      />
    </MantineProvider>
  );
}

describe("FlowsChart", () => {
  beforeEach(() => {
    document.documentElement.dataset.chartWidth = "880";
  });

  afterEach(() => {
    delete document.documentElement.dataset.chartWidth;
  });

  it("renders the accessible Sankey diagram and localized node labels", () => {
    renderChart();

    const chart = screen.getByRole("group", { name: "Transaction flows" });

    expect(chart.querySelector("svg")).toBeInTheDocument();
    expect(chart.querySelectorAll(`.${chartClasses.nodeRect}`)).toHaveLength(
      chartData.nodes.length,
    );
    expect(chart.querySelectorAll(`.${chartClasses.link}`)).toHaveLength(
      chartData.links.length,
    );
    expect(chart.querySelector("svg")).toHaveAttribute(
      "viewBox",
      "0 0 880 750",
    );
    expect(screen.getByText("Salary")).toBeInTheDocument();
    expect(screen.getByText("Cash available")).toBeInTheDocument();
  });

  it("uses theme-aware category colors, neutral ribbons, and BBUI typography", () => {
    const { rerender } = render(renderWithColorScheme("light"));
    let chart = screen.getByTestId("flows-chart");

    expect(
      chart.style.getPropertyValue("--bbui-flows-chart-tooltip-surface"),
    ).toContain(budgetBoardColors.light.surfaceOverlay);
    expect(
      chart.style.getPropertyValue("--bbui-flows-chart-neutral"),
    ).toContain(budgetBoardColors.light.muted);
    expect(chart.style.getPropertyValue("--bbui-flows-chart-ribbon")).toContain(
      budgetBoardColors.light.borderStrong,
    );

    const nodeLabels = chart.querySelectorAll(`.${chartClasses.nodeName}`);
    expect(nodeLabels.length).toBeGreaterThan(0);
    const lightSalaryColor =
      chart.querySelector('[data-node-index="0"] rect')?.getAttribute("fill") ??
      "";
    expect(lightSalaryColor).toMatch(/^hsl\(\d+ 72% 26%\)$/);
    expect(
      chart
        .querySelector(`[data-node-index="0"] .${chartClasses.nodeName}`)
        ?.getAttribute("fill"),
    ).toBe(lightSalaryColor);
    expect(chart.style.getPropertyValue("--bbui-flows-chart-font-body")).toBe(
      `var(--bb-font-body, ${budgetBoardTypography.body})`,
    );
    nodeLabels.forEach((label) => {
      expect(label).toHaveAttribute(
        "font-family",
        "var(--bbui-flows-chart-font-body)",
      );
    });

    rerender(renderWithColorScheme("dark"));
    chart = screen.getByTestId("flows-chart");

    expect(chart.style.getPropertyValue("--bbui-flows-chart-focus")).toContain(
      budgetBoardColors.dark.focusRing,
    );
    expect(
      chart.style.getPropertyValue("--bbui-flows-chart-neutral"),
    ).toContain(budgetBoardColors.dark.muted);
    expect(chart.style.getPropertyValue("--bbui-flows-chart-ribbon")).toContain(
      budgetBoardColors.dark.borderStrong,
    );
    const darkSalaryColor =
      chart.querySelector('[data-node-index="0"] rect')?.getAttribute("fill") ??
      "";
    expect(darkSalaryColor).toMatch(/^hsl\(\d+ 72% 74%\)$/);
    expect(darkSalaryColor).not.toBe(lightSalaryColor);
  });

  it("uses distinct category colors on nodes and labels, not ribbons", () => {
    renderChart();

    const chart = screen.getByTestId("flows-chart");
    const nodeRects = chart.querySelectorAll(`.${chartClasses.nodeRect}`);
    expect(nodeRects[2]).toHaveAttribute(
      "fill",
      "var(--bbui-flows-chart-neutral)",
    );
    const categoryColors = Array.from(nodeRects, (node, index) =>
      index === 2 ? null : node.getAttribute("fill"),
    ).filter((color): color is string => color !== null);
    expect(new Set(categoryColors).size).toBe(nodeRects.length - 1);
    expect(nodeRects[0]).toHaveAttribute("fill-opacity", "0.16");
    expect(nodeRects[0]).toHaveAttribute("rx", "3");
    expect(nodeRects[0]).toHaveAttribute("stroke-opacity", "1");
    const links = chart.querySelectorAll(`.${chartClasses.link}`);
    links.forEach((link) => {
      expect(link).toHaveAttribute("fill", "var(--bbui-flows-chart-ribbon)");
      expect(link).toHaveAttribute("stroke", "var(--bbui-flows-chart-ribbon)");
      expect(link).toHaveAttribute("fill-opacity", "0.22");
    });
  });

  it("keeps category colors stable when the input node order changes", () => {
    const { rerender } = renderChart();
    const chart = screen.getByTestId("flows-chart");
    const salaryColor =
      chart.querySelector('[data-node-index="0"] rect')?.getAttribute("fill") ??
      "";
    const reversedData: FlowsChartData = {
      ...chartData,
      nodes: [...chartData.nodes].reverse(),
      links: chartData.links.map((link) => ({
        ...link,
        source: chartData.nodes.length - 1 - link.source,
        target: chartData.nodes.length - 1 - link.target,
      })),
    };

    rerender(
      <FlowsChart
        ariaLabel="Transaction flows"
        data={reversedData}
        data-testid="flows-chart"
        formatValue={formatValue}
        labels={labels}
      />,
    );

    expect(
      screen
        .getByTestId("flows-chart")
        .querySelector('[data-node-index="6"] rect'),
    ).toHaveAttribute("fill", salaryColor);
  });

  it("reorders linked nodes to reduce ribbon crossings", () => {
    const crossingData: FlowsChartData = {
      nodes: [
        { name: "Source A" },
        { name: "Source B" },
        { name: "Target A" },
        { name: "Target B" },
      ],
      links: [
        { source: 0, target: 3, value: 1000 },
        { source: 1, target: 2, value: 1000 },
      ],
      totalIncome: 2000,
      totalSpending: 0,
    };
    renderChart({ data: crossingData });

    const chart = screen.getByTestId("flows-chart");
    const getNodeCenter = (index: number) => {
      const node = chart.querySelector(`[data-node-index="${index}"] rect`);
      return (
        Number(node?.getAttribute("y")) +
        Number(node?.getAttribute("height")) / 2
      );
    };

    expect(getNodeCenter(1)).toBeLessThan(getNodeCenter(0));
    expect(getNodeCenter(2)).toBeLessThan(getNodeCenter(3));
  });

  it("keeps direct outcomes before deeper expense categories", () => {
    renderChart();

    const chart = screen.getByTestId("flows-chart");
    const getNodeX = (index: number) =>
      Number(
        chart
          .querySelector(`[data-node-index="${index}"] rect`)
          ?.getAttribute("x"),
      );

    expect(getNodeX(6)).toBeLessThan(getNodeX(4));
    expect(getNodeX(6)).toBeLessThan(getNodeX(5));
    expect(chart.querySelectorAll("[data-node-index]")).toHaveLength(
      chartData.nodes.length,
    );
    expect(chart.querySelectorAll("[data-link-index]")).toHaveLength(
      chartData.links.length,
    );
  });

  it("sizes the diagram to its responsive container", () => {
    document.documentElement.dataset.chartWidth = "480";
    renderChart();

    expect(
      screen.getByTestId("flows-chart").querySelector("svg"),
    ).toHaveAttribute("viewBox", "0 0 480 750");
  });

  it("highlights the shortest route from a hovered node to available cash", async () => {
    renderChart();

    const chart = screen.getByTestId("flows-chart");
    const incomeNode = chart.querySelector('[data-node-index="0"]');
    const incomeNodeRect = chart.querySelector('[data-node-index="0"] rect');
    const incomeLink = chart.querySelector('[data-link-index="0"]');
    const cashLink = chart.querySelector('[data-link-index="1"]');
    const spendingLink = chart.querySelector('[data-link-index="2"]');

    expect(incomeNode).not.toBeNull();
    expect(incomeNodeRect).not.toBeNull();
    expect(incomeLink).not.toBeNull();
    expect(cashLink).not.toBeNull();
    expect(spendingLink).not.toBeNull();
    expect(incomeLink).toHaveAttribute("fill-opacity", "0.22");
    expect(incomeLink).toHaveAttribute(
      "stroke",
      "var(--bbui-flows-chart-ribbon)",
    );
    expect(incomeLink).toHaveAttribute("stroke-opacity", "0.2");

    fireEvent.mouseEnter(incomeNode!);

    await waitFor(() =>
      expect(spendingLink).toHaveClass(chartClasses.linkDimmed),
    );
    expect(incomeNodeRect).toHaveAttribute("stroke-width", "2");
    expect(spendingLink).toHaveAttribute("fill-opacity", "0.16");
    expect(spendingLink).toHaveAttribute("stroke-opacity", "0.1");
    expect(incomeLink).toHaveAttribute("fill-opacity", "0.68");
    expect(incomeLink).toHaveAttribute("stroke-width", "1.5");
    expect(incomeLink).toHaveAttribute(
      "stroke",
      "var(--bbui-flows-chart-ribbon)",
    );
    expect(cashLink).toHaveAttribute("fill-opacity", "0.68");
  });

  it("shows flow details in the tooltip", () => {
    renderChart();

    const chart = screen.getByTestId("flows-chart");
    const salaryNode = chart.querySelector('[data-node-index="0"]');

    expect(salaryNode).not.toBeNull();
    fireEvent.mouseEnter(salaryNode!);

    expect(screen.getByRole("tooltip")).toHaveTextContent("Income");
    expect(screen.getByRole("tooltip")).toHaveTextContent("Salary");
    expect(screen.getByRole("tooltip")).toHaveTextContent("$4,800");
    expect(screen.getByRole("tooltip")).toHaveTextContent("100.0%");
    expect(screen.getByRole("tooltip")).toHaveTextContent("Transactions");
  });

  it("shows a compact route and branch details for a hovered link", () => {
    renderChart();

    const chart = screen.getByTestId("flows-chart");
    const expenseLink = chart.querySelector('[data-link-index="2"]');

    expect(expenseLink).not.toBeNull();
    fireEvent.mouseEnter(expenseLink!);

    const tooltip = screen.getByRole("tooltip");
    expect(tooltip).toHaveAttribute("data-flow-type", "expense");
    expect(tooltip.firstElementChild).toHaveClass(chartClasses.tooltipHeader);
    expect(tooltip.firstElementChild?.firstElementChild).toHaveClass(
      chartClasses.flowType,
    );
    expect(tooltip.firstElementChild?.children.item(1)).toHaveClass(
      chartClasses.tooltipRoute,
    );
    expect(tooltip.children.item(1)).toHaveClass(chartClasses.tooltipAmount);
    expect(tooltip).toHaveTextContent("From: Cash available");
    expect(tooltip).toHaveTextContent("To: Living");
    expect(
      tooltip.querySelector(`.${chartClasses.routeArrow}`),
    ).toHaveTextContent("→");
    expect(tooltip).toHaveTextContent("Expense");
    expect(
      tooltip.querySelector(`.${chartClasses.flowType} [aria-hidden="true"]`),
    ).toBeNull();
    expect(tooltip).toHaveTextContent("$3,300");
    expect(tooltip).toHaveTextContent("Percent of spending");
    expect(tooltip).toHaveTextContent("100.0%");
    expect(tooltip.querySelectorAll('[role="progressbar"]')).toHaveLength(1);

    const transactionMetric = Array.from(
      tooltip.querySelectorAll(`.${chartClasses.metric}`),
    ).find((metric) => metric.textContent?.includes("Transactions"));
    expect(transactionMetric).toHaveTextContent("Transactions");
    expect(transactionMetric).toHaveTextContent("2");
  });

  it("keeps branch percentages for nested category tooltips", () => {
    renderChart();

    const chart = screen.getByTestId("flows-chart");
    const foodNode = chart.querySelector('[data-node-index="5"]');

    expect(foodNode).not.toBeNull();
    fireEvent.mouseEnter(foodNode!);

    const tooltip = screen.getByRole("tooltip");
    expect(tooltip).toHaveTextContent("Food");
    expect(tooltip).toHaveTextContent("Percent of spending");
    expect(tooltip).toHaveTextContent("Percent of branch");
    expect(tooltip).toHaveTextContent("33.3%");
    expect(tooltip.querySelectorAll('[role="progressbar"]')).toHaveLength(2);
  });

  it("renders the loading and empty states", () => {
    const emptyData: FlowsChartData = {
      nodes: [],
      links: [],
      totalIncome: 0,
      totalSpending: 0,
    };
    const { rerender } = renderChart({
      data: emptyData,
      emptyMessage: "Select months to see transaction flows.",
    });

    expect(
      screen.getByText("Select months to see transaction flows."),
    ).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();

    rerender(
      <FlowsChart
        ariaLabel="Transaction flows"
        data={chartData}
        formatValue={formatValue}
        isLoading
        labels={labels}
      />,
    );

    expect(
      screen.getByRole("status", { name: "Transaction flows" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("group")).toHaveAttribute("aria-busy", "true");
  });

  it("rejects invalid flow values and non-positive chart heights", () => {
    expect(() =>
      renderChart({
        data: {
          ...chartData,
          links: [{ source: 0, target: 1, value: Number.NaN }],
        },
      }),
    ).toThrow(RangeError);

    expect(() => renderChart({ height: 0 })).toThrow(RangeError);
  });
});
