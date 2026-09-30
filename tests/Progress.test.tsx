import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Progress, progressColors } from "../src/Progress/Progress";
import { budgetBoardDarkTheme } from "../src/theme";

describe("Progress", () => {
  it("renders one accessible, full-width progress section by default", () => {
    render(
      <Progress
        ariaLabel="Report progress"
        data-testid="progress"
        value={42}
      />,
    );

    const progress = screen.getByRole("progressbar");
    const root = screen.getByTestId("progress");

    expect(progress).toHaveAttribute("aria-valuenow", "42");
    expect(root).toHaveAttribute("data-budget-board-progress-color", "primary");
    expect(root.style.width).toBe("100%");
    expect(root.style.getPropertyValue("--progress-radius")).toBe(
      "var(--mantine-radius-xl)",
    );
    expect(screen.queryByText("42%")).not.toBeInTheDocument();
  });

  it("clamps the primary and additional section values", () => {
    render(
      <Progress
        ariaLabel="Current progress"
        label
        sections={[
          { ariaLabel: "Projected amount", value: 120 },
          { ariaLabel: "Unavailable amount", value: -20 },
        ]}
        value={-10}
      />,
    );

    const sections = screen.getAllByRole("progressbar");

    expect(sections).toHaveLength(3);
    expect(sections[0]).toHaveAttribute("aria-valuenow", "0");
    expect(sections[1]).toHaveAttribute("aria-valuenow", "100");
    expect(sections[2]).toHaveAttribute("aria-valuenow", "0");
    expect(screen.getByText("-10%")).toBeInTheDocument();
  });

  it("animates striped sections without animating solid sections", () => {
    render(
      <Progress
        animated
        ariaLabel="Solid progress"
        sections={[
          {
            animated: true,
            ariaLabel: "Animated stripes",
            striped: true,
            value: 12,
          },
        ]}
        value={68}
      />,
    );

    expect(
      screen.getByRole("progressbar", { name: "Solid progress" }),
    ).not.toHaveAttribute("data-animated");
    expect(
      screen.getByRole("progressbar", { name: "Animated stripes" }),
    ).toHaveAttribute("data-animated");
  });

  it("shows the actual percentage when label is enabled", () => {
    render(
      <Progress
        ariaLabel="Actual spending"
        color="warning"
        data-testid="progress"
        label
        sections={[
          {
            animated: true,
            ariaLabel: "Projected recurring transactions",
            color: "muted",
            striped: true,
            value: 12,
          },
        ]}
        value={120}
      />,
    );

    const [actual, projected] = screen.getAllByRole("progressbar");
    const label = screen.getByText("120%");

    expect(label).toBeInTheDocument();
    expect(label.closest('[role="progressbar"]')).toBeNull();
    expect(label.parentElement).toBe(
      screen.getByTestId("progress")?.parentElement,
    );
    expect(actual).toHaveAttribute("aria-label", "Actual spending");
    expect(actual).toHaveAttribute(
      "data-budget-board-progress-section-color",
      "warning",
    );
    expect(projected).toHaveAttribute(
      "aria-label",
      "Projected recurring transactions",
    );
    expect(projected).toHaveAttribute(
      "data-budget-board-progress-section-color",
      "muted",
    );
    expect(projected).toHaveAttribute("data-striped");
    expect(projected).toHaveAttribute("data-animated");
  });

  it("supports every public semantic color", () => {
    render(
      <>
        {progressColors.map((color) => (
          <Progress
            ariaLabel={`${color} progress`}
            color={color}
            key={color}
            value={25}
          />
        ))}
      </>,
    );

    expect(screen.getAllByRole("progressbar")).toHaveLength(
      progressColors.length,
    );
  });

  it.each([
    {
      amount: 99,
      expectedColor: "info",
      limit: 100,
      type: "income",
    },
    {
      amount: 100,
      expectedColor: "success",
      limit: 100,
      type: "income",
    },
    {
      amount: -79,
      expectedColor: "success",
      limit: 100,
      type: "expense",
    },
    {
      amount: -79.5,
      expectedColor: "warning",
      limit: 100,
      type: "expense",
    },
    {
      amount: -80,
      expectedColor: "warning",
      limit: 100,
      type: "expense",
    },
    {
      amount: -85,
      expectedColor: "success",
      limit: 100,
      type: "expense",
      warningThreshold: 90,
    },
    {
      amount: -101,
      expectedColor: "error",
      limit: 100,
      type: "expense",
    },
  ] as const)(
    "calculates $type progress color for amount $amount as $expectedColor",
    ({ amount, expectedColor, limit, type, warningThreshold }) => {
      render(
        <Progress
          amount={amount}
          ariaLabel="Budget progress"
          data-testid="progress"
          limit={limit}
          type={type}
          value={50}
          warningThreshold={warningThreshold}
        />,
      );

      expect(screen.getByTestId("progress")).toHaveAttribute(
        "data-budget-board-progress-color",
        expectedColor,
      );
    },
  );

  it("uses responsive status color instead of a fixed color when configured", () => {
    render(
      <Progress
        amount={-90}
        ariaLabel="Budget progress"
        color="primary"
        data-testid="progress"
        limit={100}
        type="expense"
        value={90}
      />,
    );

    expect(screen.getByTestId("progress")).toHaveAttribute(
      "data-budget-board-progress-color",
      "warning",
    );
  });

  it.each([
    {
      amount: 720,
      expectedLabel: "90",
      expectedValue: "90",
      limit: 800,
      type: "income",
    },
    {
      amount: -85,
      expectedLabel: "85",
      expectedValue: "85",
      limit: 100,
      type: "expense",
    },
    {
      amount: -150,
      expectedLabel: "150",
      expectedValue: "100",
      limit: 100,
      type: "expense",
    },
    {
      amount: 20,
      expectedLabel: "0",
      expectedValue: "0",
      limit: 0,
      type: "income",
    },
  ] as const)(
    "derives the $type progress percentage from amount and limit",
    ({ amount, expectedLabel, expectedValue, limit, type }) => {
      render(
        <Progress
          amount={amount}
          ariaLabel="Budget progress"
          data-testid="progress"
          label
          limit={limit}
          type={type}
        />,
      );

      expect(screen.getByRole("progressbar")).toHaveAttribute(
        "aria-valuenow",
        expectedValue,
      );
      expect(screen.getByText(`${expectedLabel}%`)).toBeInTheDocument();
    },
  );

  it("uses an explicit value as the responsive percentage override", () => {
    render(
      <Progress
        amount={720}
        ariaLabel="Budget progress"
        limit={800}
        type="income"
        value={75}
      />,
    );

    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "75",
    );
  });

  it("resolves dark semantic colors and permits caller style overrides", () => {
    render(
      <MantineProvider forceColorScheme="dark" theme={budgetBoardDarkTheme}>
        <Progress
          ariaLabel="Current progress"
          data-testid="progress"
          label
          style={{ backgroundColor: "tomato" }}
          value={50}
        />
      </MantineProvider>,
    );

    const root = screen.getByTestId("progress");

    expect(root.style.getPropertyValue("--bbui-progress-track-bg")).toBe(
      "var(--bb-color-surface-sunken, #0d0f12)",
    );
    expect(root.style.backgroundColor).toBe("tomato");
    expect(
      screen
        .getByText("50%")
        .parentElement?.style.getPropertyValue("--bbui-progress-label-color"),
    ).toBe("#d8d5ce");
  });

  it("forwards root accessibility and data attributes", () => {
    render(
      <Progress
        aria-label="Upload progress group"
        ariaLabel="Upload progress"
        data-testid="progress"
        value={25}
      />,
    );

    expect(screen.getByTestId("progress")).toHaveAttribute(
      "aria-label",
      "Upload progress group",
    );
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-label",
      "Upload progress",
    );
  });

  it("works without a Mantine provider", () => {
    render(<Progress ariaLabel="Standalone progress" value={30} />);

    expect(screen.getByRole("progressbar")).toBeVisible();
  });
});
