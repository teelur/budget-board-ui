import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { describe, expect, it } from "vitest";
import {
  BodyText,
  CaptionText,
  DataText,
  DisplayText,
  HeadingText,
} from "../src";

describe("text role components", () => {
  it("renders HeadingText as a level-two semantic heading by default", () => {
    render(<HeadingText>Section title</HeadingText>);

    expect(
      screen.getByRole("heading", { level: 2, name: "Section title" }),
    ).toBeInTheDocument();
  });

  it("supports heading levels, element overrides, and Mantine props", () => {
    render(
      <HeadingText
        component="div"
        data-testid="custom-heading"
        fw={600}
        id="heading-id"
        level={4}
        size="2rem"
        tone="secondary"
      >
        Custom heading
      </HeadingText>,
    );

    const heading = screen.getByTestId("custom-heading");
    expect(heading.tagName).toBe("DIV");
    expect(heading).toHaveAttribute("id", "heading-id");
    expect(heading).toHaveAttribute("data-budget-board-text-role", "heading");
  });

  it("renders DisplayText as a large non-semantic role with overrides", () => {
    render(
      <>
        <DisplayText data-testid="display">Display</DisplayText>
        <DisplayText
          component="div"
          data-testid="custom-display"
          fz="2rem"
          fw={600}
          tone="metadata"
        >
          Custom display
        </DisplayText>
      </>,
    );

    const display = screen.getByTestId("display");
    expect(display.tagName).toBe("SPAN");
    expect(display).toHaveAttribute(
      "data-budget-board-text-role",
      "display",
    );
    expect(display.style.fontSize).toBe("1.6rem");
    expect(display.style.lineHeight).toBe("1.1");
    expect(screen.getByTestId("custom-display").tagName).toBe("DIV");
    const customDisplay = screen.getByTestId("custom-display");
    expect(customDisplay.style.color).toBe(
      "var(--bb-color-text-metadata, #807a70)",
    );
    expect(customDisplay.style.fontSize).toBe("2rem");
    expect(customDisplay.style.fontWeight).toBe("600");
  });

  it("keeps semantic tone independent from BodyText and CaptionText", () => {
    render(
      <>
        <BodyText data-testid="body" tone="metadata">
          Body
        </BodyText>
        <CaptionText data-testid="caption">Caption</CaptionText>
      </>,
    );

    expect(screen.getByTestId("body")).toHaveStyle({
      color: "var(--bb-color-text-metadata, #807a70)",
    });
    expect(screen.getByTestId("caption").tagName).toBe("SPAN");
    expect(screen.getByTestId("caption")).toHaveStyle({
      color: "var(--bb-color-text-secondary, #68645d)",
    });
  });

  it("renders DataText with tabular-number role metadata and allows overrides", () => {
    render(
      <DataText c="rebeccapurple" component="output" data-testid="balance">
        1,204.50
      </DataText>,
    );

    expect(screen.getByTestId("balance")).toHaveAttribute(
      "data-budget-board-text-role",
      "data",
    );
    expect(screen.getByTestId("balance").tagName).toBe("OUTPUT");
    expect(screen.getByTestId("balance")).toHaveStyle({
      color: "rgb(102, 51, 153)",
      fontWeight: "500",
    });
  });

  it("uses the dark palette for semantic tones inside a dark MantineProvider", () => {
    render(
      <MantineProvider forceColorScheme="dark">
        <DisplayText data-testid="dark-display" tone="muted">
          Dark display
        </DisplayText>
      </MantineProvider>,
    );

    expect(screen.getByTestId("dark-display")).toHaveStyle({
      color: "var(--bb-color-text-muted, #716f6b)",
    });
  });
});
