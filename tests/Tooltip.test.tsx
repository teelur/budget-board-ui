import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Tooltip } from "../src/Tooltip/Tooltip";
import classes from "../src/Tooltip/Tooltip.module.css";
import { budgetBoardDarkTheme } from "../src/theme";

describe("Tooltip", () => {
  it("forwards Mantine props and applies BBUI styles without a provider", () => {
    render(
      <Tooltip
        label="Tooltip content"
        opened
        withArrow
        withinPortal={false}
      >
        <button type="button">Tooltip target</button>
      </Tooltip>,
    );

    const tooltip = screen.getByRole("tooltip");

    expect(tooltip).toHaveClass(classes.tooltip);
    expect(tooltip).toHaveTextContent("Tooltip content");
    expect(document.querySelector(".mantine-Tooltip-arrow")).toHaveClass(
      classes.arrow,
    );
    expect(
      tooltip.style.getPropertyValue("--bbui-tooltip-background"),
    ).toBe("var(--bb-color-surface-overlay, #fffaf2)");
    expect(tooltip.style.getPropertyValue("--bbui-tooltip-border")).toBe(
      "var(--bb-color-border-subtle, #d8d5ce)",
    );
    expect(tooltip.style.getPropertyValue("--bbui-tooltip-text")).toBe(
      "var(--bb-color-text-primary, #3a3834)",
    );
    expect(tooltip.style.getPropertyValue("--bbui-tooltip-font")).toBe(
      'var(--bb-font-body, "IBM Plex Sans Variable", sans-serif)',
    );
  });

  it("uses the dark semantic palette in a dark Mantine provider", () => {
    render(
      <MantineProvider
        env="test"
        forceColorScheme="dark"
        theme={budgetBoardDarkTheme}
      >
        <Tooltip label="Dark tooltip content" opened withinPortal={false}>
          <button type="button">Dark tooltip target</button>
        </Tooltip>
      </MantineProvider>,
    );

    const tooltip = screen.getByRole("tooltip");

    expect(
      tooltip.style.getPropertyValue("--bbui-tooltip-background"),
    ).toBe("var(--bb-color-surface-overlay, #292c31)");
    expect(tooltip.style.getPropertyValue("--bbui-tooltip-border")).toBe(
      "var(--bb-color-border-subtle, #3a3d42)",
    );
    expect(tooltip.style.getPropertyValue("--bbui-tooltip-text")).toBe(
      "var(--bb-color-text-primary, #d8d5ce)",
    );
  });

  it("merges consumer classes and styles with BBUI defaults", () => {
    const classNames = vi.fn(() => ({
      arrow: "consumer-arrow",
      tooltip: "consumer-tooltip",
    }));
    const styles = vi.fn(() => ({
      tooltip: { backgroundColor: "rebeccapurple", opacity: 0.8 },
    }));

    render(
      <MantineProvider env="test">
        <Tooltip
          classNames={classNames}
          label="Customized tooltip"
          opened
          styles={styles}
          withArrow
          withinPortal={false}
        >
          <button type="button">Customized target</button>
        </Tooltip>
      </MantineProvider>,
    );

    const tooltip = screen.getByRole("tooltip");
    const arrow = document.querySelector(".mantine-Tooltip-arrow");

    expect(classNames).toHaveBeenCalled();
    expect(styles).toHaveBeenCalled();
    expect(tooltip).toHaveClass(classes.tooltip, "consumer-tooltip");
    expect(arrow).toHaveClass(classes.arrow, "consumer-arrow");
    expect(tooltip.style.backgroundColor).toBe("rebeccapurple");
    expect(tooltip.style.opacity).toBe("0.8");
    expect(
      tooltip.style.getPropertyValue("--bbui-tooltip-background"),
    ).toBe("var(--bb-color-surface-overlay, #fffaf2)");
  });
});
