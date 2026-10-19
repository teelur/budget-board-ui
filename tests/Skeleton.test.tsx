import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createRef, type CSSProperties } from "react";
import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skeleton } from "../src/Skeleton/Skeleton";
import classes from "../src/Skeleton/Skeleton.module.css";
import { budgetBoardDarkTheme } from "../src/theme";

const skeletonStyles = readFileSync(
  resolve(process.cwd(), "src/Skeleton/Skeleton.module.css"),
  "utf8",
);

describe("Skeleton", () => {
  it("uses BBUI semantic surface and highlight colors with Mantine defaults", () => {
    render(<Skeleton data-testid="skeleton" />);

    const skeleton = screen.getByTestId("skeleton");

    expect(skeleton).toHaveClass(classes.root);
    expect(skeleton).toHaveAttribute("data-visible");
    expect(skeleton).toHaveAttribute("data-animate");
    expect(skeleton.style.getPropertyValue("--bbui-skeleton-surface")).toBe(
      "var(--bb-color-surface, #ffffff)",
    );
    expect(skeleton.style.getPropertyValue("--bbui-skeleton-highlight")).toBe(
      "var(--bb-color-surface-hover, #d8d5ce)",
    );
    expect(skeletonStyles).toContain(
      "background-color: var(--bbui-skeleton-surface);",
    );
    expect(skeletonStyles).toContain(
      "background-color: var(--bbui-skeleton-highlight);",
    );
  });

  it("uses dark palette fallbacks and allows consumer styles to override semantic variables", () => {
    render(
      <MantineProvider
        env="test"
        forceColorScheme="dark"
        theme={budgetBoardDarkTheme}
      >
        <Skeleton
          data-testid="dark-skeleton"
          style={
            {
              "--bbui-skeleton-highlight": "tomato",
            } as CSSProperties
          }
        />
      </MantineProvider>,
    );

    const skeleton = screen.getByTestId("dark-skeleton");

    expect(skeleton.style.getPropertyValue("--bbui-skeleton-surface")).toBe(
      "var(--bb-color-surface, #191b1f)",
    );
    expect(skeleton.style.getPropertyValue("--bbui-skeleton-highlight")).toBe(
      "tomato",
    );
  });

  it("forwards Mantine props, refs, and children when not visible", () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <Skeleton
        animate={false}
        className="consumer-skeleton"
        data-testid="content-placeholder"
        height={24}
        ref={ref}
        visible={false}
      >
        Account summary
      </Skeleton>,
    );

    const skeleton = screen.getByTestId("content-placeholder");

    expect(skeleton).toHaveClass(classes.root, "consumer-skeleton");
    expect(skeleton).not.toHaveAttribute("data-visible");
    expect(skeleton).not.toHaveAttribute("data-animate");
    expect(skeleton.style.getPropertyValue("--skeleton-height")).toBe(
      "calc(1.5rem * var(--mantine-scale))",
    );
    expect(screen.getByText("Account summary")).toBeInTheDocument();
    expect(ref.current).toBe(skeleton);
  });
});
