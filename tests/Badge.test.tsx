import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { describe, expect, it } from "vitest";
import {
  Badge,
  badgeColors,
  badgeSizes,
  badgeVariants,
} from "../src/Badge/Badge";
import { budgetBoardDarkTheme } from "../src/theme";

describe("Badge", () => {
  it("renders a primary medium passive span by default", () => {
    render(<Badge>Ready</Badge>);

    const badge = screen.getByText("Ready").parentElement;

    expect(badge).toBeInTheDocument();
    expect(badge?.tagName).toBe("SPAN");
    expect(badge).toHaveAttribute("data-budget-board-badge-variant", "filled");
    expect(badge).toHaveAttribute("data-budget-board-badge-color", "primary");
    expect(badge).toHaveAttribute("data-budget-board-badge-size", "md");
    expect(badge).not.toHaveAttribute("role", "button");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("supports every public size, color, and variant", () => {
    render(
      <>
        {badgeSizes.map((size) => (
          <Badge key={size} size={size}>
            {size}
          </Badge>
        ))}
        {badgeColors.map((color) => (
          <Badge color={color} key={color}>
            {color}
          </Badge>
        ))}
        {badgeVariants.map((variant) => (
          <Badge key={variant} variant={variant}>
            {variant}
          </Badge>
        ))}
      </>,
    );

    for (const size of badgeSizes) {
      expect(screen.getByText(size).parentElement).toHaveAttribute(
        "data-budget-board-badge-size",
        size,
      );
    }

    for (const color of badgeColors) {
      expect(screen.getByText(color).parentElement).toHaveAttribute(
        "data-budget-board-badge-color",
        color,
      );
    }

    for (const variant of badgeVariants) {
      expect(screen.getByText(variant).parentElement).toHaveAttribute(
        "data-budget-board-badge-variant",
        variant,
      );
    }
  });

  it("resolves semantic variant styles", () => {
    render(
      <>
        <Badge>Filled</Badge>
        <Badge color="success" variant="light">
          Light
        </Badge>
        <Badge color="info" variant="outline">
          Outline
        </Badge>
        <Badge color="warning" variant="ghost">
          Ghost
        </Badge>
      </>,
    );

    expect(screen.getByText("Filled").parentElement).toHaveStyle({
      "--bbui-badge-bg":
        "var(--budget-board-badge-primary-background, var(--bb-color-primary, #4c6ef5))",
      "--bbui-badge-color":
        "var(--budget-board-badge-primary-color, var(--bb-color-primary-content, #fffaf2))",
    });
    expect(screen.getByText("Light").parentElement).toHaveStyle({
      "--bbui-badge-bg":
        "var(--budget-board-badge-success-light-background, color-mix(in srgb, var(--bb-color-success, #2f9e44) 14%, transparent))",
      "--bbui-badge-color":
        "var(--budget-board-badge-success-light-color, var(--bb-color-success, #2f9e44))",
    });
    expect(screen.getByText("Outline").parentElement).toHaveStyle({
      "--bbui-badge-border":
        "var(--budget-board-badge-info-outline-border, var(--bb-color-info, #1971c2))",
    });
    expect(screen.getByText("Ghost").parentElement).toHaveStyle({
      "--bbui-badge-bg": "transparent",
      "--bbui-badge-border": "transparent",
    });
  });

  it("resolves the active dark semantic palette", () => {
    render(
      <MantineProvider forceColorScheme="dark" theme={budgetBoardDarkTheme}>
        <Badge color="contrast">Contrast</Badge>
      </MantineProvider>,
    );

    expect(screen.getByText("Contrast").parentElement).toHaveStyle({
      "--bbui-badge-bg":
        "var(--budget-board-badge-contrast-background, var(--bb-color-contrast, #f2f0eb))",
      "--bbui-badge-color":
        "var(--budget-board-badge-contrast-color, var(--bb-color-contrast-content, #242321))",
    });
  });

  it("supports sections and forwards native attributes", () => {
    render(
      <Badge
        aria-label="Transaction status: ready"
        data-testid="badge"
        leftSection={<span data-testid="left">!</span>}
        rightSection={<span data-testid="right">?</span>}
      >
        Ready
      </Badge>,
    );

    const badge = screen.getByTestId("badge");

    expect(badge).toHaveAttribute("aria-label", "Transaction status: ready");
    expect(screen.getByTestId("left").parentElement).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(screen.getByTestId("right").parentElement).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("supports Mantine dimension props without leaking them to the DOM", () => {
    render(
      <Badge h={48} mah={56} maw="100%" mih={44} miw={200} w={240}>
        Dimensions
      </Badge>,
    );

    const badge = screen.getByText("Dimensions").parentElement;

    expect(badge).not.toHaveAttribute("w");
    expect(badge).not.toHaveAttribute("miw");
    expect(badge).not.toHaveAttribute("maw");
    expect(badge).not.toHaveAttribute("h");
    expect(badge).not.toHaveAttribute("mih");
    expect(badge).not.toHaveAttribute("mah");
    expect(badge).toHaveStyle({
      width: "calc(15rem * var(--mantine-scale))",
      minWidth: "calc(12.5rem * var(--mantine-scale))",
      maxWidth: "100%",
      height: "calc(3rem * var(--mantine-scale))",
      minHeight: "calc(2.75rem * var(--mantine-scale))",
      maxHeight: "calc(3.5rem * var(--mantine-scale))",
    });
  });

  it("allows caller styles to override Badge variables", () => {
    render(
      <Badge
        style={{
          "--bbui-badge-bg": "tomato",
        }}
      >
        Custom
      </Badge>,
    );

    expect(screen.getByText("Custom").parentElement).toHaveStyle({
      "--bbui-badge-bg": "tomato",
    });
  });

  it("works without a Mantine provider", () => {
    render(<Badge>Standalone badge</Badge>);

    expect(screen.getByText("Standalone badge")).toBeVisible();
  });
});
