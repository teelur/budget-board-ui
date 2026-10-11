import { act, render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  BodyText,
  CaptionText,
  DataText,
  DisplayText,
  HeadingText,
  budgetBoardTheme,
} from "../src";

let activeResizeObservers: TestResizeObserver[] = [];

class TestResizeObserver implements ResizeObserver {
  readonly root = null;
  readonly rootMargin = "0px";
  readonly thresholds: readonly number[] = [];

  constructor(private readonly callback: ResizeObserverCallback) {
    activeResizeObservers.push(this);
  }

  observe(): void {}

  unobserve(): void {}

  disconnect(): void {}

  takeRecords(): ResizeObserverEntry[] {
    return [];
  }

  trigger(): void {
    this.callback([], this);
  }
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  activeResizeObservers = [];
});

function triggerResizeObservers() {
  activeResizeObservers.forEach((observer) => observer.trigger());
}

describe("text role components", () => {
  it("adds the xxs Mantine font size to the BBUI theme", () => {
    expect(budgetBoardTheme.fontSizes.xxs).toBe("0.65rem");
  });

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

  it("preserves the rendered element's native and custom styles when unstyled", () => {
    render(
      <>
        <BodyText
          className="existing-copy"
          data-testid="unstyled-body"
          unstyled
        >
          Body copy
        </BodyText>
        <HeadingText
          className="existing-heading"
          data-testid="unstyled-heading"
          level={3}
          unstyled
        >
          Section heading
        </HeadingText>
        <BodyText
          c="rebeccapurple"
          data-testid="unstyled-override"
          fw={600}
          unstyled
        >
          Explicit styles
        </BodyText>
      </>,
    );

    const body = screen.getByTestId("unstyled-body");
    expect(body.tagName).toBe("P");
    expect(body).toHaveClass("existing-copy");
    expect(body.style.color).toBe("");
    expect(body.style.fontFamily).toBe("");
    expect(body.style.getPropertyValue("--text-fz")).toBe("");

    const heading = screen.getByTestId("unstyled-heading");
    expect(heading.tagName).toBe("H3");
    expect(heading).toHaveClass("existing-heading");
    expect(heading.style.color).toBe("");
    expect(heading.style.fontFamily).toBe("");

    expect(screen.getByTestId("unstyled-override")).toHaveStyle({
      color: "rgb(102, 51, 153)",
      fontWeight: "600",
    });
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
    expect(display).toHaveAttribute("data-budget-board-text-role", "display");
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

  it("scales every text role from its container width when responsive", () => {
    render(
      <div style={{ containerType: "inline-size" }}>
        <DisplayText data-testid="responsive-display" responsive>
          Display
        </DisplayText>
        <HeadingText data-testid="responsive-heading" responsive>
          Heading
        </HeadingText>
        <BodyText data-testid="responsive-body" fz="3rem" responsive size="xs">
          Body
        </BodyText>
        <CaptionText data-testid="responsive-caption" responsive>
          Caption
        </CaptionText>
        <DataText data-testid="responsive-data" responsive>
          Data
        </DataText>
      </div>,
    );

    expect(screen.getByTestId("responsive-display").style.fontSize).toBe(
      "clamp(1.25rem, 6cqi, 4rem)",
    );
    expect(screen.getByTestId("responsive-heading").style.fontSize).toBe(
      "clamp(1.25rem, 5cqi, 3.5rem)",
    );
    expect(screen.getByTestId("responsive-body").style.fontSize).toBe(
      "clamp(0.875rem, 3cqi, 1.75rem)",
    );
    expect(screen.getByTestId("responsive-caption").style.fontSize).toBe(
      "clamp(0.75rem, 2.25cqi, 1.25rem)",
    );
    expect(screen.getByTestId("responsive-data").style.fontSize).toBe(
      "clamp(0.875rem, 5cqi, 3rem)",
    );
  });

  it("fits responsive headings to their parent and recalculates on resize and text changes", () => {
    let availableWidth = 100;
    let textWidth = 200;
    let mantineScale = 1;
    const originalGetComputedStyle = window.getComputedStyle.bind(window);

    vi.stubGlobal("ResizeObserver", TestResizeObserver);
    vi.spyOn(window, "getComputedStyle").mockImplementation(
      (element, pseudoElement) => {
        const styles = originalGetComputedStyle(element, pseudoElement);
        if (
          element instanceof HTMLElement &&
          element.dataset.testid === "fit-heading"
        ) {
          Object.defineProperty(element, "scrollWidth", {
            configurable: true,
            get: () => textWidth,
          });
          Object.defineProperty(styles, "fontSize", {
            configurable: true,
            value: "20px",
          });
          const originalGetPropertyValue = styles.getPropertyValue.bind(styles);
          Object.defineProperty(styles, "getPropertyValue", {
            configurable: true,
            value: (property: string) =>
              property === "--mantine-scale"
                ? String(mantineScale)
                : originalGetPropertyValue(property),
          });
        }
        return styles;
      },
    );

    const { rerender } = render(
      <div
        data-testid="fit-container"
        ref={(container) => {
          if (container) {
            Object.defineProperty(container, "clientWidth", {
              configurable: true,
              get: () => availableWidth,
            });
          }
        }}
      >
        <HeadingText data-testid="fit-heading" responsive>
          Long title
        </HeadingText>
      </div>,
    );

    act(triggerResizeObservers);

    const heading = screen.getByTestId("fit-heading");
    expect(heading.style.whiteSpace).toBe("nowrap");
    expect(heading.style.fontSize).toBe(
      "calc(0.61875rem * var(--mantine-scale))",
    );

    act(() => {
      availableWidth = 150;
      mantineScale = 2;
      triggerResizeObservers();
    });
    expect(heading.style.fontSize).toBe(
      "calc(0.465625rem * var(--mantine-scale))",
    );

    act(() => {
      availableWidth = 250;
      mantineScale = 1;
      triggerResizeObservers();
    });
    expect(heading.style.fontSize).toBe("clamp(1.25rem, 5cqi, 3.5rem)");

    availableWidth = 100;
    textWidth = 400;
    rerender(
      <div
        data-testid="fit-container"
        ref={(container) => {
          if (container) {
            Object.defineProperty(container, "clientWidth", {
              configurable: true,
              get: () => availableWidth,
            });
          }
        }}
      >
        <HeadingText data-testid="fit-heading" responsive>
          A much longer title
        </HeadingText>
      </div>,
    );
    act(triggerResizeObservers);
    expect(heading.style.fontSize).toBe(
      "calc(0.309375rem * var(--mantine-scale))",
    );
  });

  it("fits every responsive text role on one line", () => {
    let availableWidth = 100;
    const fontSizes: Record<string, string> = {
      "fit-display": "30px",
      "fit-heading": "20px",
      "fit-body": "16px",
      "fit-caption": "14px",
      "fit-data": "18px",
    };
    const originalGetComputedStyle = window.getComputedStyle.bind(window);

    vi.stubGlobal("ResizeObserver", TestResizeObserver);
    vi.spyOn(window, "getComputedStyle").mockImplementation(
      (element, pseudoElement) => {
        const styles = originalGetComputedStyle(element, pseudoElement);
        if (
          element instanceof HTMLElement &&
          element.dataset.testid in fontSizes
        ) {
          Object.defineProperty(element, "scrollWidth", {
            configurable: true,
            value: 300,
          });
          Object.defineProperty(styles, "fontSize", {
            configurable: true,
            value: fontSizes[element.dataset.testid],
          });
        }
        return styles;
      },
    );

    render(
      <div
        ref={(container) => {
          if (container) {
            Object.defineProperty(container, "clientWidth", {
              configurable: true,
              get: () => availableWidth,
            });
          }
        }}
      >
        <DisplayText data-testid="fit-display" responsive>
          Long display
        </DisplayText>
        <HeadingText data-testid="fit-heading" responsive>
          Long heading
        </HeadingText>
        <BodyText data-testid="fit-body" responsive>
          Long body
        </BodyText>
        <CaptionText data-testid="fit-caption" responsive>
          Long caption
        </CaptionText>
        <DataText data-testid="fit-data" responsive>
          Long data
        </DataText>
      </div>,
    );

    act(triggerResizeObservers);

    Object.keys(fontSizes).forEach((testId) => {
      const element = screen.getByTestId(testId);
      expect(element.style.whiteSpace).toBe("nowrap");
      expect(element.style.fontSize).toContain("var(--mantine-scale)");
    });
  });

  it("keeps semantic tone independent from BodyText and CaptionText", () => {
    render(
      <>
        <BodyText data-testid="heading-tone" tone="heading">
          Heading tone
        </BodyText>
        <BodyText data-testid="body" tone="metadata">
          Body
        </BodyText>
        <HeadingText data-testid="heading" tone="heading">
          Heading
        </HeadingText>
        <CaptionText data-testid="caption">Caption</CaptionText>
      </>,
    );

    expect(screen.getByTestId("heading-tone")).toHaveStyle({
      color: "var(--bb-color-text-heading, #242321)",
    });
    expect(screen.getByTestId("body")).toHaveStyle({
      color: "var(--bb-color-text-metadata, #807a70)",
    });
    expect(screen.getByTestId("heading")).toHaveStyle({
      color: "var(--bb-color-text-heading, #242321)",
    });
    expect(screen.getByTestId("caption").tagName).toBe("SPAN");
    expect(screen.getByTestId("caption")).toHaveStyle({
      color: "var(--bb-color-text-secondary, #68645d)",
    });
  });

  it("forwards the ARIA role on every text role component", () => {
    render(
      <>
        <BodyText data-testid="body-status" role="status">
          Body
        </BodyText>
        <DisplayText data-testid="display-status" role="status">
          Display
        </DisplayText>
        <CaptionText data-testid="caption-status" role="status">
          Caption
        </CaptionText>
        <DataText data-testid="data-status" role="status">
          Data
        </DataText>
      </>,
    );

    expect(screen.getByTestId("body-status")).toHaveAttribute("role", "status");
    expect(screen.getByTestId("display-status")).toHaveAttribute(
      "role",
      "status",
    );
    expect(screen.getByTestId("caption-status")).toHaveAttribute(
      "role",
      "status",
    );
    expect(screen.getByTestId("data-status")).toHaveAttribute("role", "status");
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
