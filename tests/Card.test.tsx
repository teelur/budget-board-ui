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
    expect(card.style.getPropertyValue("--card-padding")).toBe("0.5rem");
    expect(card.style.getPropertyValue("--bbui-card-surface")).toBe(
      "var(--bb-color-surface, #ffffff)",
    );
    expect(card.style.getPropertyValue("--bbui-card-border")).toBe(
      "var(--bb-color-border-subtle, #d8d5ce)",
    );
    expect(screen.getByText("Available balance")).toBeInTheDocument();
  });

  it("keeps the section inset aligned with the card padding", () => {
    render(
      <>
        <Card data-testid="custom-p" p="sm" />
        <Card data-testid="mantine-padding" padding="lg" />
      </>,
    );

    expect(
      screen.getByTestId("custom-p").style.getPropertyValue("--card-padding"),
    ).toBe("var(--mantine-spacing-sm)");
    expect(
      screen
        .getByTestId("mantine-padding")
        .style.getPropertyValue("--card-padding"),
    ).toBe("var(--mantine-spacing-lg)"    );
  });

  it("allows the card to grow to fit its section content", () => {
    const rootStyles = cardStyles.match(
      /\.root:global\(\.mantine-Card-root\)\s*\{([^}]*)\}/,
    )?.[1];

    expect(rootStyles).toContain("min-height: max-content;");
  });

  it("uses the sunken semantic surface for nested cards in both color schemes", () => {
    render(
      <>
        <Card data-testid="light-card" surface="sunken" />
        <MantineProvider forceColorScheme="dark" theme={budgetBoardDarkTheme}>
          <Card data-testid="dark-card" surface="sunken" />
        </MantineProvider>
      </>,
    );

    expect(
      screen.getByTestId("light-card").style.getPropertyValue(
        "--bbui-card-surface",
      ),
    ).toBe("var(--bb-color-surface-sunken, #ebe8df)");
    expect(
      screen.getByTestId("dark-card").style.getPropertyValue(
        "--bbui-card-surface",
      ),
    ).toBe("var(--bb-color-surface-sunken, #0d0f12)");
    expect(screen.getByTestId("light-card")).not.toHaveAttribute("surface");
  });

  it("applies selected styling only when selected", () => {
    render(
      <>
        <Card data-testid="selected" selected />
        <Card data-testid="unselected" selected={false} />
        <Card data-testid="default" />
      </>,
    );

    const selected = screen.getByTestId("selected");
    const unselected = screen.getByTestId("unselected");
    const defaultCard = screen.getByTestId("default");

    expect(selected).toHaveClass(classes.selected);
    expect(selected).toHaveAttribute("data-budget-board-selected", "true");
    expect(unselected).not.toHaveClass(classes.selected);
    expect(unselected).toHaveAttribute("data-budget-board-selected", "false");
    expect(defaultCard).not.toHaveClass(classes.selected);
    expect(defaultCard).not.toHaveAttribute("data-budget-board-selected");
  });

  it("supports default and thick section separators", () => {
    render(
      <>
        <Card data-testid="default-card">
          <Card.Section>Default separator</Card.Section>
          <Card.Section>Following section</Card.Section>
        </Card>
        <Card data-testid="thick-card" separatorThickness="thick">
          <Card.Section>Thick separator</Card.Section>
          <Card.Section label="or">Labeled separator</Card.Section>
        </Card>
      </>,
    );

    expect(screen.getByTestId("default-card")).toHaveAttribute(
      "data-budget-board-separator-thickness",
      "default",
    );
    expect(screen.getByTestId("thick-card")).toHaveAttribute(
      "data-budget-board-separator-thickness",
      "thick",
    );
    expect(cardStyles).toContain("border-bottom-width: 2px;");
    expect(cardStyles).toContain("--divider-size: 2px;");
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

  it("uses semantic selected surface and border colors", () => {
    const selectedStyles = cardStyles.match(/\.selected\s*\{([^}]*)\}/)?.[1];

    expect(selectedStyles).toContain(
      "background-color: var(--bbui-card-hover-surface);",
    );
    expect(selectedStyles).toContain(
      "border-color: var(--bbui-card-hover-border);",
    );
  });

  it("softens hover and active surfaces while preserving their borders", () => {
    const hoverStyles = cardStyles.match(/\.hoverable:hover\s*\{([^}]*)\}/)?.[1];
    const activeStyles = cardStyles.match(/\.hoverable:active\s*\{([^}]*)\}/)?.[1];
    const softenedSurface =
      /background-color:\s*color-mix\(\s*in srgb,\s*var\(--bbui-card-hover-surface\)\s+40%,\s*var\(--bbui-card-surface\)\s*\);/;

    expect(hoverStyles).toMatch(softenedSurface);
    expect(hoverStyles).toContain(
      "border-color: var(--bbui-card-hover-border);",
    );
    expect(activeStyles).toMatch(softenedSurface);
    expect(activeStyles).toContain("border-color: var(--bbui-card-focus-ring);");
  });

  it("uses half-rem default padding for card parts", () => {
    const sectionStyles = cardStyles.match(/\.section\s*\{([^}]*)\}/)?.[1];

    expect(sectionStyles).toContain("padding: 0.5rem;");
  });
});
