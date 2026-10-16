import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Code } from "../src/Code/Code";
import classes from "../src/Code/Code.module.css";
import { budgetBoardDarkTheme } from "../src/theme";

describe("Code", () => {
  it("renders inline code with BBUI theme-aware styling", () => {
    render(<Code data-testid="inline-code">category = "housing"</Code>);

    const code = screen.getByTestId("inline-code");

    expect(code.tagName).toBe("CODE");
    expect(code).toHaveClass(classes.root);
    expect(code.style.getPropertyValue("--bbui-code-background")).toBe(
      "var(--bb-color-surface-sunken, #ebe8df)",
    );
    expect(code.style.getPropertyValue("--bbui-code-border")).toBe(
      "var(--bb-color-border-subtle, #d8d5ce)",
    );
    expect(code.style.getPropertyValue("--bbui-code-foreground")).toBe(
      "var(--bb-color-text-primary, #3a3834)",
    );
    expect(code.style.getPropertyValue("--bbui-code-font")).toBe(
      'var(--bb-font-code, "IBM Plex Mono", monospace)',
    );
  });

  it("renders block code as a pre element", () => {
    render(
      <Code aria-label="Example snippet" block data-testid="block-code">
        category = "housing"
      </Code>,
    );

    const code = screen.getByTestId("block-code");

    expect(code.tagName).toBe("PRE");
    expect(code).toHaveAttribute("data-block");
    expect(code).toHaveAccessibleName("Example snippet");
  });

  it("preserves Mantine styling props and native attributes", () => {
    render(
      <Code
        className="consumer-code"
        classNames={{ root: "consumer-slot" }}
        color="blue"
        data-testid="custom-code"
        style={{ color: "tomato" }}
      >
        1250
      </Code>,
    );

    const code = screen.getByTestId("custom-code");

    expect(code).toHaveClass(classes.root, "consumer-code", "consumer-slot");
    expect(code).toHaveAttribute("data-testid", "custom-code");
    expect(code.style.color).toBe("tomato");
  });

  it("uses dark BBUI color fallbacks inside a dark Mantine provider", () => {
    render(
      <MantineProvider forceColorScheme="dark" theme={budgetBoardDarkTheme}>
        <Code data-testid="dark-code">1250</Code>
      </MantineProvider>,
    );

    const code = screen.getByTestId("dark-code");

    expect(code.style.getPropertyValue("--bbui-code-background")).toBe(
      "var(--bb-color-surface-sunken, #0d0f12)",
    );
    expect(code.style.getPropertyValue("--bbui-code-border")).toBe(
      "var(--bb-color-border-subtle, #3a3d42)",
    );
    expect(code.style.getPropertyValue("--bbui-code-foreground")).toBe(
      "var(--bb-color-text-primary, #d8d5ce)",
    );
  });
});
