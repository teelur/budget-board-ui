import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { describe, expect, it } from "vitest";
import { budgetBoardDarkTheme } from "../src/theme";
import {
  AmountText,
  getStatusColor,
  StatusColorType,
} from "../src/AmountText/AmountText";

const colors = {
  neutral: "var(--bb-color-info, #1971c2)",
  good: "var(--bb-color-success, #2f9e44)",
  warning: "var(--bb-color-warning, #fcc419)",
  bad: "var(--bb-color-error, #c92a2a)",
} as const;

describe("AmountText", () => {
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

  it("keeps warning opt-in at the AmountText component boundary", () => {
    render(
      <>
        <AmountText
          amount={-90}
          data-testid="without-threshold"
          total={100}
          type={StatusColorType.Expense}
        >
          No threshold
        </AmountText>
        <AmountText
          amount={-90}
          data-testid="with-threshold"
          total={100}
          type={StatusColorType.Expense}
          warningThreshold={90}
        >
          Explicit threshold
        </AmountText>
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
      <AmountText
        amount={100}
        data-testid="status"
        fw={700}
        fz="lg"
        id="forwarded"
      >
        On track
      </AmountText>,
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
        <AmountText amount={-1} type={StatusColorType.Total}>
          Dark total
        </AmountText>
      </MantineProvider>,
    );

    expect(screen.getByText("Dark total")).toHaveStyle({
      color: "var(--bb-color-error, #ff6b6b)",
    });
  });

  it("applies the default font weight when it is not provided", () => {
    render(<AmountText amount={100}>Default weight</AmountText>);

    expect(screen.getByText("Default weight")).toHaveStyle({
      fontWeight: "600",
    });
  });

  it("can show an amount without a semantic status color", () => {
    render(
      <AmountText amount={-1} disableStatusColor>
        $1.00
      </AmountText>,
    );

    expect(screen.getByText("$1.00")).not.toHaveStyle({
      color: colors.bad,
    });
  });

  it("formats currency amounts with the built-in formatter", () => {
    render(
      <AmountText
        amount={12.5}
        currency="USD"
        decimalPlaces={2}
        locale="en-US"
      />,
    );

    expect(screen.getByText("$12.50")).toBeInTheDocument();
  });

  it("supports sign display in the built-in formatter", () => {
    render(
      <AmountText
        amount={12.5}
        currency="USD"
        locale="en-US"
        signDisplay="always"
      />,
    );

    expect(screen.getByText("+$12.50")).toBeInTheDocument();
  });

  it("supports sign inversion while preserving the raw amount", () => {
    render(
      <>
        <AmountText
          amount={-12.5}
          currency="USD"
          data-testid="negative"
          locale="en-US"
          invertSign
          total={100}
          type={StatusColorType.Expense}
        />
        <AmountText
          amount={12.5}
          currency="USD"
          data-testid="positive"
          locale="en-US"
          invertSign
        />
      </>,
    );

    expect(screen.getByTestId("negative")).toHaveTextContent("$12.50");
    expect(screen.getByTestId("negative")).toHaveStyle({
      color: colors.good,
    });
    expect(screen.getByTestId("positive")).toHaveTextContent("-$12.50");
  });

  it("masks the built-in formatted amount when sensitivity is enabled", () => {
    render(<AmountText amount={12.5} currency="USD" isSensitive />);

    expect(screen.getByText("••••")).toBeInTheDocument();
    expect(screen.queryByText("$12.50")).not.toBeInTheDocument();
  });

  it("masks sensitive content and disables semantic colors", () => {
    render(
      <AmountText
        amount={-1}
        data-testid="sensitive"
        isSensitive
        type={StatusColorType.Total}
      >
        $1.00
      </AmountText>,
    );

    expect(screen.getByTestId("sensitive")).toHaveTextContent("••••");
    expect(screen.getByTestId("sensitive")).not.toHaveStyle({
      color: colors.bad,
    });
  });

  it("preserves an explicit color while masking sensitive content", () => {
    render(
      <AmountText amount={-1} c="var(--base-color-text-primary)" isSensitive>
        $1.00
      </AmountText>,
    );

    expect(screen.getByText("••••")).toHaveStyle({
      color: "var(--base-color-text-primary)",
    });
  });
});
