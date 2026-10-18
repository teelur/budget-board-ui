import { MantineProvider } from "@mantine/core";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createRef, type CSSProperties } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Divider } from "../src/Divider/Divider";
import classes from "../src/Divider/Divider.module.css";
import { budgetBoardDarkTheme } from "../src/theme";

const dividerStyles = readFileSync(
  resolve(process.cwd(), "src/Divider/Divider.module.css"),
  "utf8",
);

describe("Divider", () => {
  it("renders a separator with BBUI semantic styling", () => {
    render(
      <Divider
        aria-label="Accounts separator"
        data-testid="divider"
        label="or"
      />,
    );

    const divider = screen.getByRole("separator", {
      name: "Accounts separator",
    });

    expect(divider).toHaveClass(classes.root);
    expect(divider).toHaveAttribute("data-testid", "divider");
    expect(screen.getByText("or")).toBeInTheDocument();
    expect(divider.style.getPropertyValue("--bbui-divider-border")).toBe(
      "var(--bb-color-border-subtle, #d8d5ce)",
    );
    expect(divider.style.getPropertyValue("--bbui-divider-text")).toBe(
      "var(--bb-color-text-secondary, #68645d)",
    );
    expect(dividerStyles).toContain("background-color: transparent;");
  });

  it("uses dark BBUI semantic styling inside a dark Mantine provider", () => {
    render(
      <MantineProvider forceColorScheme="dark" theme={budgetBoardDarkTheme}>
        <Divider data-testid="dark-divider" label="or" />
      </MantineProvider>,
    );

    const divider = screen.getByTestId("dark-divider");

    expect(divider.style.getPropertyValue("--bbui-divider-border")).toBe(
      "var(--bb-color-border-subtle, #3a3d42)",
    );
    expect(divider.style.getPropertyValue("--bbui-divider-text")).toBe(
      "var(--bb-color-text-secondary, #aaa69e)",
    );
  });

  it("forwards Mantine props, refs, and consumer styles", () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <Divider
        className="consumer-divider"
        color="red"
        data-testid="custom-divider"
        label="or"
        labelPosition="left"
        orientation="vertical"
        ref={ref}
        size="2px"
        style={{ "--bbui-divider-text": "tomato" } as CSSProperties}
        variant="dashed"
      />,
    );

    const divider = screen.getByTestId("custom-divider");

    expect(divider).toHaveClass(classes.root, "consumer-divider");
    expect(divider).toHaveAttribute("data-orientation", "vertical");
    expect(divider).toHaveAttribute("data-with-label");
    expect(divider.style.getPropertyValue("--divider-color")).toBe(
      "var(--mantine-color-red-filled)",
    );
    expect(divider.style.getPropertyValue("--divider-size")).toBe(
      "calc(0.125rem * var(--mantine-scale))",
    );
    expect(divider.style.getPropertyValue("--divider-border-style")).toBe(
      "dashed",
    );
    expect(divider.style.getPropertyValue("--bbui-divider-text")).toBe(
      "tomato",
    );
    expect(ref.current).toBe(divider);
  });
});
