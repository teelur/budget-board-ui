import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { MantineProvider } from "@mantine/core";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Card } from "../src";
import classes from "../src/Card/Card.module.css";
import { budgetBoardDarkTheme } from "../src/theme";

const cardStyles = readFileSync(
  resolve(process.cwd(), "src/Card/Card.module.css"),
  "utf8",
);

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
    expect(card.style.padding).toBe("0.5rem");
    expect(card.style.getPropertyValue("--bbui-card-surface")).toBe(
      "var(--bb-color-surface, #ffffff)",
    );
    expect(card.style.getPropertyValue("--bbui-card-border")).toBe(
      "var(--bb-color-border-subtle, #d8d5ce)",
    );
    expect(screen.getByText("Available balance")).toBeInTheDocument();
  });

  it("applies independent padding and separators to card sections", () => {
    render(
      <Card>
        <Card.Section data-testid="first-section" py="sm">
          Accounts
        </Card.Section>
        <Card.Section data-testid="second-section" py="sm">
          Checking
        </Card.Section>
        <Card.Section data-testid="third-section" py="xs">
          Savings
        </Card.Section>
      </Card>,
    );

    for (const testId of [
      "first-section",
      "second-section",
      "third-section",
    ]) {
      const section = screen.getByTestId(testId);

      expect(section).toHaveClass(classes.section);
      expect(section).toHaveAttribute("data-with-border");
      expect(section).not.toHaveAttribute("data-inherit-padding");
      expect(section).toHaveAttribute("data-orientation", "vertical");
      expect(section.style.padding).toBe("");
      expect(section.style.getPropertyValue("padding-block")).toBe(
        testId === "third-section"
          ? "var(--mantine-spacing-xs)"
          : "var(--mantine-spacing-sm)",
      );
    }

    const firstSection = screen.getByTestId("first-section");
    expect(firstSection).toHaveClass(classes.section);
    expect(firstSection).toHaveAttribute("data-first-section", "true");
    expect(screen.getByTestId("third-section")).toHaveAttribute(
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

  it("renders a label on a section border", () => {
    render(
      <Card>
        <Card.Section
          data-testid="labeled-section"
          label="or"
          labelPosition="right"
        >
          Use email
        </Card.Section>
        <Card.Section withBorder={false} label="Hidden label">
          Use identity provider
        </Card.Section>
      </Card>,
    );

    const section = screen.getByTestId("labeled-section");
    const label = screen.getByText("or");

    expect(section).toHaveClass(classes.section, classes.labeledSection);
    expect(section).toHaveAttribute("data-with-border");
    expect(label).toHaveAttribute("data-position", "right");
    expect(label.closest("[data-with-border]")).toBe(section);
    expect(screen.queryByText("Hidden label")).not.toBeInTheDocument();
  });

  it("allows consumer styling and Mantine border overrides", () => {
    render(
      <Card
        className="consumer-card"
        data-testid="card"
        p="1rem"
        style={{ "--bbui-card-surface": "pink" } as React.CSSProperties}
        withBorder={false}
      />,
    );

    const card = screen.getByTestId("card");

    expect(card).toHaveClass(classes.root, "consumer-card");
    expect(card).not.toHaveAttribute("data-with-border");
    expect(card.style.getPropertyValue("--bbui-card-surface")).toBe("pink");
    expect(card.style.padding).toBe("1rem");
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

  it("uses a pointer cursor for hoverable cards", () => {
    const hoverableStyles = cardStyles.match(/\.hoverable\s*\{([^}]*)\}/)?.[1];

    expect(hoverableStyles).toContain("cursor: pointer;");
  });

  it("uses half-rem default padding for card parts", () => {
    const sectionStyles = cardStyles.match(/\.section\s*\{([^}]*)\}/)?.[1];

    expect(sectionStyles).toContain("padding: 0.5rem;");
  });
});
