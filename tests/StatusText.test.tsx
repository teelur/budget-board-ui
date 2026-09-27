import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { describe, expect, it } from "vitest";
import { budgetBoardDarkTheme } from "../src/theme";
import {
  getStatusColor,
  StatusColorType,
  StatusText,
} from "../src/StatusText/StatusText";

const colors = {
  neutral: "var(--bb-color-info, #1971c2)",
  good: "var(--bb-color-success, #2f9e44)",
  warning: "var(--bb-color-warning, #fcc419)",
  bad: "var(--bb-color-error, #c92a2a)",
} as const;

describe("StatusText", () => {
  it("preserves the four status color rules", () => {
    expect(getStatusColor(80, 100, StatusColorType.Income)).toBe(
      colors.neutral,
    );
    expect(getStatusColor(100, 100, StatusColorType.Income)).toBe(colors.good);
    expect(getStatusColor(-100, 100, StatusColorType.Expense)).toBe(
      colors.good,
    );
    expect(getStatusColor(-101, 100, StatusColorType.Expense)).toBe(colors.bad);
    expect(getStatusColor(-1, 0, StatusColorType.Total)).toBe(colors.bad);
    expect(getStatusColor(0, 0, StatusColorType.Total)).toBe(colors.good);
    expect(getStatusColor(99, 100, StatusColorType.Target)).toBe(colors.bad);
    expect(getStatusColor(100, 100, StatusColorType.Target)).toBe(colors.good);
  });

  it("only applies the expense warning threshold when explicitly provided", () => {
    expect(getStatusColor(-110, 100, StatusColorType.Expense)).toBe(colors.bad);
    expect(getStatusColor(-95, 100, StatusColorType.Expense)).toBe(colors.good);
    expect(getStatusColor(-90, 100, StatusColorType.Expense, 90)).toBe(
      colors.warning,
    );
  });

  it("keeps warning opt-in at the StatusText component boundary", () => {
    render(
      <>
        <StatusText
          amount={-90}
          data-testid="without-threshold"
          total={100}
          type={StatusColorType.Expense}
        >
          No threshold
        </StatusText>
        <StatusText
          amount={-90}
          data-testid="with-threshold"
          total={100}
          type={StatusColorType.Expense}
          warningThreshold={90}
        >
          Explicit threshold
        </StatusText>
      </>,
    );

    expect(screen.getByTestId("without-threshold")).toHaveStyle({
      color: colors.good,
    });
    expect(screen.getByTestId("with-threshold")).toHaveStyle({
      color: colors.warning,
    });
  });

  it("handles zero and negative values using the reference comparisons", () => {
    expect(getStatusColor(0, 0, StatusColorType.Income)).toBe(colors.good);
    expect(getStatusColor(0, 100, StatusColorType.Income)).toBe(colors.neutral);
    expect(getStatusColor(0, 100, StatusColorType.Expense)).toBe(colors.good);
    expect(getStatusColor(-1, -2, StatusColorType.Target)).toBe(colors.good);
  });

  it("renders with a default weight and forwards Mantine TextProps", () => {
    render(
      <StatusText
        amount={100}
        data-testid="status"
        fw={700}
        fz="lg"
        id="forwarded"
      >
        On track
      </StatusText>,
    );

    const status = screen.getByTestId("status");

    expect(status).toHaveAttribute("id", "forwarded");
    expect(status).toHaveStyle({
      fontSize: "var(--mantine-font-size-lg)",
      fontWeight: "700",
    });
  });

  it("uses the dark Button palette when rendered in dark mode", () => {
    render(
      <MantineProvider forceColorScheme="dark" theme={budgetBoardDarkTheme}>
        <StatusText amount={-1} type={StatusColorType.Total}>
          Dark total
        </StatusText>
      </MantineProvider>,
    );

    expect(screen.getByText("Dark total")).toHaveStyle({
      color: "var(--bb-color-error, #ff6b6b)",
    });
  });

  it("applies the default font weight when it is not provided", () => {
    render(<StatusText amount={100}>Default weight</StatusText>);

    expect(screen.getByText("Default weight")).toHaveStyle({
      fontWeight: "600",
    });
  });

  it("allows consumers to disable status colors and still pass an explicit color", () => {
    render(
      <MantineProvider>
        <StatusText amount={-1} disableStatusColor>
          Uncolored
        </StatusText>
        <StatusText
          amount={-1}
          c="var(--base-color-text-primary)"
          disableStatusColor
        >
          Privacy adapter
        </StatusText>
      </MantineProvider>,
    );

    expect(screen.getByText("Uncolored")).not.toHaveStyle({
      color: colors.bad,
    });
    expect(screen.getByText("Privacy adapter")).toHaveStyle({
      color: "var(--base-color-text-primary)",
    });
  });
});
