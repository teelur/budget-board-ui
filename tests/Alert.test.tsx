import { createRef } from "react";
import { MantineProvider } from "@mantine/core";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  Alert,
  alertColors,
  alertVariants,
} from "../src/Alert/Alert";
import { budgetBoardColors, budgetBoardDarkTheme } from "../src/theme";

describe("Alert", () => {
  it("renders with the default info color and Mantine's default light variant", () => {
    render(
      <Alert title="Import complete" data-testid="alert">
        Your transactions are ready.
      </Alert>,
    );

    const alert = screen.getByRole("alert");

    expect(alert).toHaveAttribute("data-budget-board-alert-color", "info");
    expect(alert.style.getPropertyValue("--alert-bg")).toBe(
      "color-mix(in srgb, var(--bb-color-info, #1971c2) 12%, var(--bb-color-surface, #ffffff))",
    );
    expect(alert.style.getPropertyValue("--alert-color")).toBe(
      "var(--bb-color-info, #1971c2)",
    );
    expect(screen.getByText("Your transactions are ready.")).toBeInTheDocument();
  });

  it("supports the full BBUI semantic palette", () => {
    render(
      <>
        {alertColors.map((color) => (
          <Alert key={color} color={color} title={color}>
            {color} details
          </Alert>
        ))}
      </>,
    );

    for (const color of alertColors) {
      const alert = screen.getByRole("alert", { name: color });
      expect(alert).toHaveAttribute("data-budget-board-alert-color", color);
      expect(alert.style.getPropertyValue("--alert-color")).toBe(
        `var(--bb-color-${color}, ${budgetBoardColors.light[color]})`,
      );
    }
  });

  it("applies semantic styles for every Mantine variant", () => {
    render(
      <>
        {alertVariants.map((variant) => (
          <Alert key={variant} color="success" title={variant} variant={variant}>
            {variant} content
          </Alert>
        ))}
      </>,
    );

    for (const variant of alertVariants) {
      expect(screen.getByRole("alert", { name: variant })).toHaveAttribute(
        "data-budget-board-alert-color",
        "success",
      );
    }

    expect(
      screen.getByRole("alert", { name: "filled" }).style.getPropertyValue(
        "--alert-color",
      ),
    ).toBe("var(--bb-color-success-content, #ebfbee)");
    expect(
      screen.getByRole("alert", { name: "outline" }).style.getPropertyValue(
        "--alert-bd",
      ),
    ).toBe("1px solid var(--bb-color-success, #2f9e44)");
    expect(
      screen
        .getByRole("alert", { name: "transparent" })
        .style.getPropertyValue("--alert-bg"),
    ).toBe("transparent");
  });

  it("preserves Mantine props, styles API, close behavior, and refs", () => {
    const onClose = vi.fn();
    const ref = createRef<HTMLDivElement>();
    const vars = vi.fn(() => ({
      root: { "--alert-bg": "custom-background" },
    }));

    render(
      <MantineProvider env="test">
        <Alert
          className="consumer-root"
          classNames={{ title: "consumer-title" }}
          closeButtonLabel="Dismiss alert"
          color="warning"
          onClose={onClose}
          ref={ref}
          styles={{ root: { opacity: 0.8 } }}
          title="Review needed"
          vars={vars}
          withCloseButton
        >
          Check the account details.
        </Alert>
      </MantineProvider>,
    );

    const alert = screen.getByRole("alert", { name: "Review needed" });

    expect(alert).toHaveClass("consumer-root");
    expect(screen.getByText("Review needed").parentElement).toHaveClass(
      "consumer-title",
    );
    expect(alert).toHaveStyle({ opacity: "0.8" });
    expect(alert.style.getPropertyValue("--alert-bg")).toBe(
      "custom-background",
    );
    expect(vars).toHaveBeenCalled();
    expect(ref.current).toBe(alert);

    fireEvent.click(screen.getByRole("button", { name: "Dismiss alert" }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("uses the dark BBUI palette", () => {
    render(
      <MantineProvider
        env="test"
        forceColorScheme="dark"
        theme={budgetBoardDarkTheme}
      >
        <Alert color="info" title="Dark alert">
          Dark theme content
        </Alert>
      </MantineProvider>,
    );

    const alert = screen.getByRole("alert", { name: "Dark alert" });

    expect(alert.style.getPropertyValue("--alert-bg")).toBe(
      "color-mix(in srgb, var(--bb-color-info, #74c0fc) 12%, var(--bb-color-surface, #191b1f))",
    );
  });

  it("uses a white surface and readable text in the dark-mode white variant", () => {
    render(
      <MantineProvider
        env="test"
        forceColorScheme="dark"
        theme={budgetBoardDarkTheme}
      >
        <Alert color="neutral" title="Dark neutral alert" variant="white">
          High contrast message
        </Alert>
      </MantineProvider>,
    );

    const alert = screen.getByRole("alert", { name: "Dark neutral alert" });

    expect(alert.style.getPropertyValue("--alert-bg")).toBe(
      "var(--mantine-color-white, #fff)",
    );
    expect(alert.style.getPropertyValue("--alert-color")).toBe(
      "var(--bb-color-text-inverse, #242321)",
    );
    expect(alert.style.getPropertyValue("--alert-bd")).toBe(
      "1px solid color-mix(in srgb, var(--bb-color-neutral, #34373a) 28%, var(--bb-color-border-subtle, #3a3d42))",
    );
  });

  it("keeps non-BBUI Mantine colors and works without a provider", () => {
    render(
      <Alert color="#123456" title="Custom Mantine color">
        Custom color content
      </Alert>,
    );

    const alert = screen.getByRole("alert", { name: "Custom Mantine color" });

    expect(alert).not.toHaveAttribute("data-budget-board-alert-color");
    expect(alert).toBeVisible();
  });
});
