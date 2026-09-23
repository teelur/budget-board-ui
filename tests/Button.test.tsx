import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MantineProvider, UnstyledButton } from "@mantine/core";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../src/Button/Button";
import { budgetBoardDarkTheme } from "../src/theme";

const buttonStyles = readFileSync(
  resolve(process.cwd(), "src/Button/Button.module.css"),
  "utf8",
);

function renderButton(button: React.ReactNode) {
  return render(button);
}

describe("Button", () => {
  it("renders the primary medium button by default", () => {
    renderButton(<Button>Save changes</Button>);

    const button = screen.getByRole("button", { name: "Save changes" });

    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("data-budget-board-variant", "filled");
    expect(button).toHaveAttribute("data-budget-board-color", "primary");
    expect(button).toHaveAttribute("data-budget-board-size", "md");
    expect(button).not.toHaveAttribute("data-budget-board-selected");
    expect(button).not.toHaveAttribute("aria-pressed");
  });

  it("does not apply Mantine UnstyledButton styles", () => {
    renderButton(<Button>Owned styles</Button>);

    const unstyledButtonClass = UnstyledButton.classes.root;

    expect(unstyledButtonClass).toBeDefined();
    expect(
      screen
        .getByRole("button", { name: "Owned styles" })
        .classList.contains(unstyledButtonClass ?? ""),
    ).toBe(false);
  });

  it("supports a latched selected state while remaining interactive", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    renderButton(
      <Button selected onClick={onClick}>
        Edit mode
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Edit mode" });

    expect(button).toHaveAttribute("data-budget-board-selected", "true");
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button.className).toContain("selected");

    await user.hover(button);
    await user.click(button);

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders an explicitly unselected filled button as off", () => {
    const unselectedFilledBlock = buttonStyles.match(
      /\.root\[data-budget-board-selected="false"\]\[data-budget-board-variant="filled"\]:not\(\s*\n?\s*:disabled\s*\n?\s*\)\s*\{([^}]*)\}/,
    )?.[1];

    expect(unselectedFilledBlock).toContain(
      "background: color-mix(in srgb, var(--bbui-button-bg) 10%, transparent);",
    );
    expect(unselectedFilledBlock).toContain(
      "border-color: var(--bbui-button-bg);",
    );
    expect(unselectedFilledBlock).toContain("color: var(--bbui-button-bg);");
  });

  it("uses aria-selected instead of aria-pressed for tabs", () => {
    renderButton(
      <Button aria-selected="true" role="tab" selected>
        Preview
      </Button>,
    );

    const button = screen.getByRole("tab", { name: "Preview" });

    expect(button).toHaveAttribute("aria-selected", "true");
    expect(button).not.toHaveAttribute("aria-pressed");
  });

  it("supports every public size", () => {
    const sizes = [
      "compact-xs",
      "compact-sm",
      "compact-md",
      "compact-lg",
      "compact-xl",
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
    ] as const;

    renderButton(
      <>
        {sizes.map((size) => (
          <Button key={size} size={size}>
            {size}
          </Button>
        ))}
      </>,
    );

    for (const size of sizes) {
      expect(screen.getByRole("button", { name: size })).toHaveAttribute(
        "data-budget-board-size",
        size,
      );
    }
  });

  it("resolves light semantic palette roles for each color", () => {
    renderButton(
      <>
        <Button>Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="error">Error</Button>
        <Button color="info" variant="outline">
          Info outline
        </Button>
        <Button color="warning" variant="ghost">
          Warning ghost
        </Button>
      </>,
    );

    expect(
      screen
        .getByRole("button", { name: "Primary" })
        .style.getPropertyValue("--bbui-button-bg"),
    ).toBe(
      "var(--budget-board-button-primary-background, var(--bb-color-primary, #4c6ef5))",
    );
    expect(
      screen
        .getByRole("button", { name: "Secondary" })
        .style.getPropertyValue("--bbui-button-color"),
    ).toBe(
      "var(--budget-board-button-secondary-color, var(--bb-color-secondary-content, #063b2f))",
    );
    expect(
      screen
        .getByRole("button", { name: "Error" })
        .style.getPropertyValue("--bbui-button-bg"),
    ).toBe(
      "var(--budget-board-button-error-background, var(--bb-color-error, #c92a2a))",
    );
    expect(
      screen
        .getByRole("button", { name: "Info outline" })
        .style.getPropertyValue("--bbui-button-border"),
    ).toBe(
      "var(--budget-board-button-info-outline-border, var(--bb-color-info, #1971c2))",
    );
    expect(
      screen
        .getByRole("button", { name: "Warning ghost" })
        .style.getPropertyValue("--bbui-button-bg"),
    ).toBe("transparent");
    expect(
      screen
        .getByRole("button", { name: "Warning ghost" })
        .style.getPropertyValue("--bbui-button-hover-border"),
    ).toBe("var(--bb-color-button-hover-border, #5f3dc4)");
  });

  it("resolves dark semantic palette roles", () => {
    render(
      <MantineProvider forceColorScheme="dark" theme={budgetBoardDarkTheme}>
        <Button>Primary</Button>
        <Button color="error">Error</Button>
      </MantineProvider>,
    );

    expect(
      screen
        .getByRole("button", { name: "Primary" })
        .style.getPropertyValue("--bbui-button-bg"),
    ).toBe(
      "var(--budget-board-button-primary-background, var(--bb-color-primary, #91a7ff))",
    );
    expect(
      screen
        .getByRole("button", { name: "Error" })
        .style.getPropertyValue("--bbui-button-color"),
    ).toBe(
      "var(--budget-board-button-error-color, var(--bb-color-error-content, #4a0c0c))",
    );
    expect(
      screen
        .getByRole("button", { name: "Primary" })
        .style.getPropertyValue("--bbui-button-focus"),
    ).toBe(
      "var(--budget-board-button-focus-ring, var(--bb-color-focus-ring, #91a7ff))",
    );
    expect(
      screen
        .getByRole("button", { name: "Primary" })
        .style.getPropertyValue("--bbui-button-hover-border"),
    ).toBe("var(--bb-color-button-hover-border, #63e6be)");
  });

  it("resolves the dark system preference when the color scheme is auto", () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = ((query: string) => ({
      addEventListener: () => {},
      addListener: () => {},
      dispatchEvent: () => false,
      matches: query === "(prefers-color-scheme: dark)",
      media: query,
      onchange: null,
      removeEventListener: () => {},
      removeListener: () => {},
    })) as typeof window.matchMedia;

    try {
      render(
        <MantineProvider defaultColorScheme="auto">
          <Button>System dark</Button>
        </MantineProvider>,
      );

      expect(
        screen
          .getByRole("button", { name: "System dark" })
          .style.getPropertyValue("--bbui-button-bg"),
      ).toBe(
        "var(--budget-board-button-primary-background, var(--bb-color-primary, #91a7ff))",
      );
    } finally {
      window.matchMedia = originalMatchMedia;
    }
  });

  it("supports every public semantic color", () => {
    const colors = [
      "primary",
      "secondary",
      "accent",
      "muted",
      "neutral",
      "info",
      "success",
      "warning",
      "error",
    ] as const;

    renderButton(
      <>
        {colors.map((color) => (
          <Button color={color} key={color}>
            {color}
          </Button>
        ))}
      </>,
    );

    for (const color of colors) {
      expect(screen.getByRole("button", { name: color })).toHaveAttribute(
        "data-budget-board-color",
        color,
      );
    }
  });

  it("keeps system fallbacks when no Budget Board palette is provided", () => {
    renderButton(<Button>Fallback</Button>);

    expect(
      screen
        .getByRole("button", { name: "Fallback" })
        .style.getPropertyValue("--bbui-button-bg"),
    ).toBe(
      "var(--budget-board-button-primary-background, var(--bb-color-primary, #4c6ef5))",
    );
  });

  it("forwards the visual options and custom button attributes", () => {
    renderButton(
      <Button
        aria-label="Delete transaction"
        color="error"
        size="lg"
        variant="outline"
      >
        Delete
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Delete transaction" });

    expect(button).toHaveAttribute("data-budget-board-variant", "outline");
    expect(button).toHaveAttribute("data-budget-board-color", "error");
    expect(button).toHaveAttribute("data-budget-board-size", "lg");
  });

  it("calls its click handler and supports an explicit form type", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    renderButton(
      <Button onClick={onClick} type="submit">
        Continue
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Continue" });
    await user.click(button);

    expect(button).toHaveAttribute("type", "submit");
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not activate when disabled or loading", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    renderButton(
      <>
        <Button disabled onClick={onClick}>
          Disabled
        </Button>
        <Button loading onClick={onClick}>
          Loading
        </Button>
      </>,
    );

    await user.click(screen.getByRole("button", { name: "Disabled" }));
    await user.click(screen.getByRole("button", { name: "Loading" }));

    expect(screen.getByRole("button", { name: "Disabled" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Loading" })).toBeDisabled();
    expect(onClick).not.toHaveBeenCalled();
  });

  it("announces loading while preserving the button label", () => {
    renderButton(<Button loading>Saving changes</Button>);

    const button = screen.getByRole("button", { name: "Saving changes" });

    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toBeDisabled();
  });

  it("supports full-width rendering", () => {
    renderButton(<Button fullWidth>Full width</Button>);

    expect(screen.getByRole("button", { name: "Full width" })).toHaveAttribute(
      "data-budget-board-full-width",
      "true",
    );
  });

  it("supports Mantine dimension style props without leaking them to the DOM", () => {
    renderButton(
      <Button h={48} mah={56} maw="100%" mih={44} miw={200} w={240}>
        Dimensions
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Dimensions" });

    expect(button).not.toHaveAttribute("w");
    expect(button).not.toHaveAttribute("miw");
    expect(button).not.toHaveAttribute("maw");
    expect(button).not.toHaveAttribute("h");
    expect(button).not.toHaveAttribute("mih");
    expect(button).not.toHaveAttribute("mah");
    expect(button).toHaveStyle({
      width: "calc(15rem * var(--mantine-scale))",
      minWidth: "calc(12.5rem * var(--mantine-scale))",
      maxWidth: "100%",
      height: "calc(3rem * var(--mantine-scale))",
      minHeight: "calc(2.75rem * var(--mantine-scale))",
      maxHeight: "calc(3.5rem * var(--mantine-scale))",
    });
  });

  it("resolves Mantine style callbacks after applying button variant styles", () => {
    renderButton(
      <Button
        style={(theme) => ({
          "--bbui-button-bg": theme.colors.red[6],
          color: theme.colors.red[6],
        })}
      >
        Callback styles
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Callback styles" });

    expect(button.style.getPropertyValue("--bbui-button-bg")).toBe("#fa5252");
    expect(button).toHaveStyle({ color: "#fa5252" });
  });

  it("works without a Mantine provider", () => {
    renderButton(<Button>Standalone button</Button>);

    expect(
      screen.getByRole("button", { name: "Standalone button" }),
    ).toBeVisible();
  });
});
