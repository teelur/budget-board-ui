import { MantineProvider } from "@mantine/core";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Card } from "../src";
import classes from "../src/Card/Card.module.css";
import { budgetBoardDarkTheme } from "../src/theme";

describe("Card", () => {
  it("renders conventional content with semantic surface defaults", () => {
    render(
      <Card data-testid="card">
        <span>Available balance</span>
      </Card>,
    );

    const card = screen.getByTestId("card");

    expect(card).toHaveClass(classes.root);
    expect(card).toHaveAttribute("data-with-border");
    expect(card.style.getPropertyValue("--bbui-card-surface")).toBe(
      "var(--bb-color-surface, #ffffff)",
    );
    expect(card.style.getPropertyValue("--bbui-card-border")).toBe(
      "var(--bb-color-border-subtle, #d8d5ce)",
    );
    expect(screen.getByText("Available balance")).toBeInTheDocument();
  });

  it("separates padded header and adjacent sections", () => {
    render(
      <Card>
        <Card.Header data-testid="header" py="sm">
          Accounts
        </Card.Header>
        <Card.Section data-testid="first-section" py="sm">
          Checking
        </Card.Section>
        <Card.Section data-testid="second-section" py="xs">
          Savings
        </Card.Section>
      </Card>,
    );

    for (const testId of ["header", "first-section", "second-section"]) {
      const section = screen.getByTestId(testId);

      expect(section).toHaveClass(classes.section);
      expect(section).toHaveAttribute("data-with-border");
      expect(section).not.toHaveAttribute("data-inherit-padding");
      expect(section).toHaveAttribute("data-orientation", "vertical");
      expect(section.style.padding).toBe("");
      expect(section.style.getPropertyValue("padding-block")).toBe(
        testId === "second-section"
          ? "var(--mantine-spacing-xs)"
          : "var(--mantine-spacing-sm)",
      );
    }

    const header = screen.getByTestId("header");
    expect(header).toHaveClass(classes.section);
    expect(header).toHaveAttribute("data-first-section", "true");
    expect(screen.getByTestId("second-section")).toHaveAttribute(
      "data-last-section",
      "true",
    );
    expect(screen.getByText("Accounts")).toBeInTheDocument();
    expect(screen.getByText("Checking")).toBeInTheDocument();
    expect(screen.getByText("Savings")).toBeInTheDocument();
  });

  it("keeps automatic section separators when parts render through a child component", () => {
    function NestedSections() {
      return (
        <>
          <Card.Section data-testid="nested-first">Email</Card.Section>
          <Card.Section data-testid="nested-second">
            Identity provider
          </Card.Section>
        </>
      );
    }

    render(
      <Card p={0}>
        <NestedSections />
      </Card>,
    );

    for (const testId of ["nested-first", "nested-second"]) {
      expect(screen.getByTestId(testId)).toHaveAttribute(
        "data-orientation",
        "vertical",
      );
      expect(screen.getByTestId(testId).style.padding).toBe("");
    }
  });

  it("renders a labeled divider and forwards Mantine Divider props", () => {
    render(
      <Card>
        <span>Use email</span>
        <Card.Divider data-testid="divider" label="or" labelPosition="right" />
        <span>Use identity provider</span>
      </Card>,
    );

    const divider = screen.getByTestId("divider");

    expect(divider).toHaveClass(classes.divider);
    expect(divider).toHaveAttribute("data-orientation", "horizontal");
    expect(divider).toHaveAttribute("data-with-label");
    expect(screen.getByText("or")).toHaveAttribute("data-position", "right");
  });

  it("allows consumer styling and Mantine border overrides", () => {
    render(
      <Card
        className="consumer-card"
        data-testid="card"
        style={{ "--bbui-card-surface": "pink" } as React.CSSProperties}
        withBorder={false}
      />,
    );

    const card = screen.getByTestId("card");

    expect(card).toHaveClass(classes.root, "consumer-card");
    expect(card).not.toHaveAttribute("data-with-border");
    expect(card.style.getPropertyValue("--bbui-card-surface")).toBe("pink");
  });

  it("resolves semantic surface colors in dark mode", () => {
    render(
      <MantineProvider forceColorScheme="dark" theme={budgetBoardDarkTheme}>
        <Card data-testid="card" />
      </MantineProvider>,
    );

    const card = screen.getByTestId("card");

    expect(card.style.getPropertyValue("--bbui-card-surface")).toBe(
      "var(--bb-color-surface, #191b1f)",
    );
    expect(card.style.getPropertyValue("--bbui-card-border")).toBe(
      "var(--bb-color-border-subtle, #3a3d42)",
    );
  });

  it("applies hover styling without adding interactive semantics", () => {
    const onClick = vi.fn();

    render(
      <>
        <Card data-testid="plain" hoverable>
          Plain card
        </Card>
        <Card
          component="button"
          data-testid="button"
          hoverable
          onClick={onClick}
          type="button"
        >
          Open month
        </Card>
        <Card component="a" data-testid="link" href="#card" hoverable>
          View account
        </Card>
      </>,
    );

    const plain = screen.getByTestId("plain");
    const button = screen.getByRole("button", { name: "Open month" });
    const link = screen.getByRole("link", { name: "View account" });

    expect(plain).toHaveClass(classes.hoverable);
    expect(plain).not.toHaveAttribute("role");
    expect(plain).not.toHaveAttribute("tabindex");
    expect(button).toHaveClass(classes.hoverable);
    expect(link).toHaveAttribute("href", "#card");

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });
});
