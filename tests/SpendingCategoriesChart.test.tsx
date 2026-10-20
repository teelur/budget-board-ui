import { MantineProvider } from "@mantine/core";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  budgetBoardDataColors,
  SpendingCategoriesChart,
  type SpendingCategoryChartData,
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

const originalMatchMedia = window.matchMedia.bind(window);

function setReducedMotionPreference(prefersReducedMotion: boolean) {
  window.matchMedia = (query) => ({
    ...originalMatchMedia(query),
    matches:
      query === "(prefers-reduced-motion: reduce)" && prefersReducedMotion,
  });
}

const categories: SpendingCategoryChartData[] = [
  {
    name: "Housing",
    value: 700,
    subcategories: [
      { name: "Rent", value: 650 },
      { name: "Utilities", value: 50 },
    ],
  },
  {
    name: "Food",
    value: 300,
    subcategories: [
      { name: "Groceries", value: 250 },
      { name: "Dining", value: 50 },
    ],
  },
];

const formatValue = (value: number) => `$${value.toFixed(2)}`;

function renderChart(
  overrides: Partial<React.ComponentProps<typeof SpendingCategoriesChart>> = {},
) {
  return render(
    <SpendingCategoriesChart
      ariaLabel="Spending by category"
      data={categories}
      data-testid="spending-chart"
      formatValue={formatValue}
      {...overrides}
    />,
  );
}

describe("SpendingCategoriesChart", () => {
  beforeEach(() => {
    document.documentElement.dataset.chartWidth = "880";
    setReducedMotionPreference(true);
  });

  it("renders category and subcategory rings with a centered total and adjacent wide labels", () => {
    renderChart();

    const chart = screen.getByTestId("spending-chart");

    expect(chart).toHaveAttribute("data-budget-board-chart-layout", "wide");
    expect(chart.querySelectorAll('[data-budget-board-chart-ring="category"]'))
      .toHaveLength(2);
    expect(
      chart.querySelectorAll('[data-budget-board-chart-ring="subcategory"]'),
    ).toHaveLength(4);
    expect(screen.getByText("$1000.00")).toBeInTheDocument();
    expect(screen.getByText("Total spending")).toBeInTheDocument();
    expect(screen.getByText("Rent")).toBeInTheDocument();
    const labels = Array.from(chart.querySelectorAll("text")).filter((label) =>
      ["start", "end"].includes(label.getAttribute("text-anchor") ?? ""),
    );
    const viewBox = chart
      .querySelector("svg")
      ?.getAttribute("viewBox")
      ?.split(" ")
      .map(Number);

    expect(labels).toHaveLength(4);
    expect(viewBox).toHaveLength(4);
    const leaders = Array.from(
      chart.querySelectorAll("[data-budget-board-chart-leader]"),
    );
    expect(leaders).toHaveLength(4);
    labels.forEach((label) => {
      const x = Number(label.getAttribute("x"));
      const y = Number(label.getAttribute("y"));
      const centerX = viewBox![2]! / 2;
      const centerY = viewBox![3]! / 2;

      expect(Math.hypot(x - centerX, y - centerY)).toBeGreaterThan(142);
    });
    leaders.forEach((leader) => {
      const points = Array.from(
        leader
          .getAttribute("d")!
          .matchAll(/(?:M|L)\s*(-?[\d.]+)[,\s]+(-?[\d.]+)/g),
        (match) => [Number(match[1]), Number(match[2])] as const,
      );
      const centerX = viewBox![2]! / 2;
      const centerY = viewBox![3]! / 2;
      const [start, leaderBend, labelEnd] = points;

      expect(points).toHaveLength(3);
      expect(
        Math.hypot(start![0] - centerX, start![1] - centerY),
      ).toBeCloseTo(142, 8);
      expect(
        Math.hypot(
          leaderBend![0] - centerX,
          leaderBend![1] - centerY,
        ),
      ).toBeCloseTo(192, 8);
      expect(leaderBend![1]).toBe(labelEnd![1]);
      expect(Math.abs(labelEnd![0] - leaderBend![0])).toBeCloseTo(40, 8);
    });
    const utilitiesLeader = chart.querySelector<SVGPathElement>(
      '[data-budget-board-chart-leader="subcategory-0-1"]',
    );
    const utilitiesStart = Array.from(
      utilitiesLeader!
        .getAttribute("d")!
        .matchAll(/(?:M|L)\s*(-?[\d.]+)[,\s]+(-?[\d.]+)/g),
      (match) => [Number(match[1]), Number(match[2])] as const,
    )[0]!;
    const utilitiesAngle = (-153 * Math.PI) / 180;

    expect(utilitiesStart[0]).toBeCloseTo(
      viewBox![2]! / 2 + 142 * Math.cos(utilitiesAngle),
      8,
    );
    expect(utilitiesStart[1]).toBeCloseTo(
      viewBox![3]! / 2 + 142 * Math.sin(utilitiesAngle),
      8,
    );
    expect(
      Number(screen.getByText("Dining").getAttribute("x")),
    ).toBeGreaterThan(Number(screen.getByText("Groceries").getAttribute("x")));
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("omits wide labels for slices below one percent", () => {
    renderChart({
      data: [
        {
          name: "Housing",
          value: 1000,
          subcategories: [
            { name: "Tiny charge", value: 1 },
            { name: "Everything else", value: 999 },
          ],
        },
      ],
    });

    expect(screen.queryByText("Tiny charge")).not.toBeInTheDocument();
    expect(screen.getByText("Everything else")).toBeInTheDocument();
    expect(
      screen.getByTestId("spending-chart").querySelectorAll(
        "[data-budget-board-chart-leader]",
      ),
    ).toHaveLength(1);
  });

  it("spreads crowded labels to maintain consistent spacing", () => {
    renderChart({
      data: [
        {
          name: "Housing",
          value: 1000,
          subcategories: [
            { name: "Lead-in", value: 175 },
            { name: "Tiny A", value: 15 },
            { name: "Tiny B", value: 15 },
            { name: "Tiny C", value: 15 },
            { name: "Rest", value: 780 },
          ],
        },
      ],
    });

    const tinyLabelYs = ["Tiny A", "Tiny B", "Tiny C"]
      .map((name) => Number(screen.getByText(name).getAttribute("y")))
      .sort((left, right) => left - right);

    expect(tinyLabelYs[1]! - tinyLabelYs[0]!).toBeCloseTo(20, 8);
    expect(tinyLabelYs[2]! - tinyLabelYs[1]!).toBeCloseTo(20, 8);
  });

  it("shows a single category ring and matching labels when subcategories are hidden", () => {
    renderChart({ showSubcategories: false });

    const chart = screen.getByTestId("spending-chart");

    expect(
      chart.querySelectorAll('[data-budget-board-chart-ring="category"]'),
    ).toHaveLength(2);
    expect(
      chart.querySelector('[data-budget-board-chart-ring="subcategory"]'),
    ).toBeNull();
    expect(screen.getByText("Housing")).toBeInTheDocument();
    expect(screen.queryByText("Rent")).not.toBeInTheDocument();
  });

  it("animates on load and data changes without restarting on hover", async () => {
    setReducedMotionPreference(false);
    const { rerender } = renderChart();
    const chart = screen.getByTestId("spending-chart");

    await waitFor(
      () =>
        expect(
          chart.querySelectorAll("[data-budget-board-chart-ring]"),
        ).toHaveLength(6),
      { timeout: 1500 },
    );
    const getHousingPath = () =>
      chart
        .querySelector<SVGPathElement>(
          '[data-budget-board-chart-ring="category"]',
        )
        ?.getAttribute("d");
    const initialHousingPath = getHousingPath();

    await waitFor(() => {
      expect(getHousingPath()).not.toBe(initialHousingPath);
    }, { timeout: 500, interval: 20 });
    await waitFor(
      () => expect(chart.querySelectorAll("svg text")).toHaveLength(4),
      { timeout: 1500 },
    );
    const rent = screen.getByRole("img", {
      name: "Housing, Rent: $650.00 (65.0%)",
    });

    fireEvent.mouseEnter(rent);
    await new Promise<void>((resolve) => window.setTimeout(resolve, 200));
    expect(chart.querySelectorAll("svg text")).toHaveLength(4);
    fireEvent.mouseLeave(rent);

    rerender(
      <SpendingCategoriesChart
        ariaLabel="Spending by category"
        data={[
          {
            name: "Housing",
            value: 800,
            subcategories: [
              { name: "Rent", value: 750 },
              { name: "Utilities", value: 50 },
            ],
          },
          {
            name: "Food",
            value: 450,
            subcategories: [
              { name: "Groceries", value: 300 },
              { name: "Dining", value: 150 },
            ],
          },
        ]}
        data-testid="spending-chart"
        formatValue={formatValue}
      />,
    );

    expect(screen.getByText("$1250.00")).toBeInTheDocument();
    const pathAtDataChange = getHousingPath();

    await waitFor(
      () => {
        expect(getHousingPath()).not.toBe(pathAtDataChange);
      },
      { timeout: 1500, interval: 20 },
    );
    await waitFor(
      () => {
        expect(
          screen.getByRole("img", {
            name: "Housing: $800.00 (64.0%)",
          }),
        ).toBeInTheDocument();
        expect(
          screen.getByRole("img", {
            name: "Housing, Rent: $750.00 (60.0%)",
          }),
        ).toBeInTheDocument();
      },
      { timeout: 1500 },
    );
  });

  it("uses a compact legend instead of slice labels on narrow layouts", () => {
    document.documentElement.dataset.chartWidth = "500";
    renderChart();

    const chart = screen.getByTestId("spending-chart");

    expect(chart).toHaveAttribute("data-budget-board-chart-layout", "compact");
    expect(chart.querySelector("svg")).toHaveAttribute(
      "viewBox",
      "0 0 500 280",
    );
    expect(screen.getByRole("list").children).toHaveLength(4);
    expect(screen.getByText("Rent")).toBeInTheDocument();
  });

  it("uses Recharts hover and keyboard interactions for the accessible tooltip", () => {
    renderChart();

    const chart = screen.getByTestId("spending-chart");
    const rent = screen.getByRole("img", {
      name: "Housing, Rent: $650.00 (65.0%)",
    });

    expect(chart.querySelectorAll("svg text")).toHaveLength(4);

    fireEvent.mouseEnter(rent);
    expect(screen.getByRole("tooltip")).toHaveTextContent("Housing");
    expect(screen.getByRole("tooltip")).toHaveTextContent(
      "$650.00 (65.0%)",
    );

    const tooltip = screen.getByRole("tooltip");
    expect(rent).toHaveAttribute("aria-describedby", tooltip.id);
    expect(rent).toHaveAttribute("fill-opacity", "0.58");
    expect(chart.querySelectorAll("svg text")).toHaveLength(4);

    fireEvent.mouseLeave(rent);
    fireEvent.focus(rent);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  it("uses the BBUI dark data palette and caller-provided category colors", () => {
    const { rerender } = render(
      <MantineProvider forceColorScheme="dark">
        <SpendingCategoriesChart
          ariaLabel="Dark chart"
          data={[{ name: "Home", value: 100 }]}
          formatValue={formatValue}
        />
      </MantineProvider>,
    );

    const darkRings = screen.getAllByRole("img", {
      name: "Home: $100.00 (100.0%)",
    });

    expect(darkRings).toHaveLength(2);
    expect(darkRings[0]).toHaveAttribute("fill", budgetBoardDataColors.dark[0]);
    expect(darkRings[0]).toHaveAttribute("d", expect.stringContaining("A "));

    rerender(
      <SpendingCategoriesChart
        ariaLabel="Custom chart"
        data={[{ color: "#123456", name: "Home", value: 100 }]}
        formatValue={formatValue}
        showSubcategories={false}
      />,
    );

    expect(
      screen.getByRole("img", { name: "Home: $100.00 (100.0%)" }),
    ).toHaveAttribute("fill", "#123456");
  });

  it("keeps labels visible while transitioning theme colors", async () => {
    setReducedMotionPreference(false);
    const renderWithColorScheme = (colorScheme: "light" | "dark") => (
      <MantineProvider forceColorScheme={colorScheme}>
        <SpendingCategoriesChart
          ariaLabel="Spending by category"
          data={categories}
          data-testid="spending-chart"
          formatValue={formatValue}
        />
      </MantineProvider>
    );
    const { rerender } = render(renderWithColorScheme("light"));
    const chart = screen.getByTestId("spending-chart");

    expect(chart.querySelectorAll("svg text")).toHaveLength(4);
    await waitFor(
      () =>
        expect(
          chart.querySelectorAll("[data-budget-board-chart-ring]"),
        ).toHaveLength(6),
      { timeout: 1500 },
    );
    const categoryRing = chart.querySelector<SVGPathElement>(
      '[data-budget-board-chart-ring="category"]',
    );
    const lightPath = categoryRing?.getAttribute("d");

    rerender(renderWithColorScheme("dark"));
    const darkCategoryRing = chart.querySelector<SVGPathElement>(
      '[data-budget-board-chart-ring="category"]',
    );

    expect(darkCategoryRing).toHaveAttribute(
      "fill",
      budgetBoardDataColors.dark[0],
    );
    expect(chart.querySelectorAll("svg text")).toHaveLength(4);
    expect(darkCategoryRing).toHaveAttribute("d", lightPath);
  });

  it("uses translucent fills with full-strength category-colored outlines", () => {
    document.documentElement.dataset.chartWidth = "500";
    const { container } = renderChart({
      data: [{ color: "#123456", name: "Home", value: 100 }],
    });

    const segments = Array.from(
      container.querySelectorAll<SVGPathElement>(
        "[data-budget-board-chart-ring]",
      ),
    );

    expect(segments).toHaveLength(2);
    segments.forEach((segment) => {
      expect(segment).toHaveAttribute("fill-opacity", "0.4");
      expect(segment).toHaveAttribute("stroke", "#123456");
      expect(segment).toHaveAttribute("stroke-opacity", "1");
    });

    const legendSwatch = screen.getByRole("list").querySelector("span");
    expect(legendSwatch).toHaveAttribute(
      "style",
      expect.stringContaining("border: 1px solid rgb(18, 52, 86)"),
    );
    expect(legendSwatch).toHaveAttribute(
      "style",
      expect.stringContaining("40%"),
    );
  });

  it("uses five tonal shades for subcategories and wraps after five", () => {
    const subcategories = Array.from({ length: 6 }, (_, index) => ({
      name: `Child ${index + 1}`,
      value: 1,
    }));
    const { container } = renderChart({
      data: [
        {
          color: "#c92a2a",
          name: "Parent",
          subcategories,
          value: subcategories.length,
        },
      ],
    });
    const fills = Array.from(
      container.querySelectorAll<SVGPathElement>(
        '[data-budget-board-chart-ring="subcategory"]',
      ),
      (segment) => segment.getAttribute("fill"),
    );

    expect(new Set(fills.slice(0, 5)).size).toBe(5);
    expect(fills[5]).toBe(fills[0]);
    expect(fills[0]).toContain(
      "color-mix(in srgb, #c92a2a 90%, #242321)",
    );
  });

  it("renders loading and empty states", () => {
    const { rerender } = renderChart({ isLoading: true });

    expect(
      screen.getByRole("status", { name: "Spending by category" }),
    ).toBeInTheDocument();

    rerender(
      <SpendingCategoriesChart
        ariaLabel="Spending by category"
        data={[]}
        emptyMessage="Choose a month to see spending."
        formatValue={formatValue}
      />,
    );

    expect(
      screen.getByText("Choose a month to see spending."),
    ).toBeInTheDocument();
  });

  it("draws a full ring for a single category", () => {
    renderChart({
      data: [{ name: "Housing", value: 100 }],
      showSubcategories: false,
    });

    expect(
      screen.getByRole("img", { name: "Housing: $100.00 (100.0%)" }),
    ).toHaveAttribute("d", expect.stringContaining("A 142,142"));
  });

  it("rejects negative, non-finite, and inconsistent category values", () => {
    expect(() =>
      renderChart({ data: [{ name: "Housing", value: -1 }] }),
    ).toThrow("must have a finite, non-negative value");
    expect(() =>
      renderChart({ data: [{ name: "Housing", value: Number.NaN }] }),
    ).toThrow("must have a finite, non-negative value");
    expect(() =>
      renderChart({
        data: [
          {
            name: "Housing",
            value: 100,
            subcategories: [{ name: "Rent", value: 99 }],
          },
        ],
      }),
    ).toThrow("must sum to the category value");
  });
});
