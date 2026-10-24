import { createRef } from "react";
import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LoadingOverlay } from "../src/LoadingOverlay/LoadingOverlay";
import { budgetBoardColors, budgetBoardDarkTheme } from "../src/theme";

describe("LoadingOverlay", () => {
  it("uses BBUI semantic surface and loader colors by default", () => {
    render(
      <LoadingOverlay
        data-testid="loading-overlay"
        loaderProps={{ "data-testid": "loading-spinner" }}
        overlayProps={{ "data-testid": "loading-surface" }}
        visible
      />,
    );

    const root = screen.getByTestId("loading-overlay");
    const loader = screen.getByTestId("loading-spinner");
    const overlays = screen.getAllByTestId("loading-surface");

    expect(root.style.getPropertyValue("--lo-z-index")).toBe("400");
    expect(loader.style.getPropertyValue("--loader-color")).toBe(
      "var(--bb-color-primary, #4263eb)",
    );
    expect(overlays).toHaveLength(2);
    for (const overlay of overlays) {
      expect(overlay.style.getPropertyValue("--overlay-bg")).toBe(
        "color-mix(in srgb, var(--bb-color-surface-overlay, #fffaf2), transparent 25%)",
      );
    }
  });

  it("uses dark palette fallbacks and lets Mantine overlay and loader props override defaults", () => {
    render(
      <MantineProvider
        env="test"
        forceColorScheme="dark"
        theme={budgetBoardDarkTheme}
      >
        <LoadingOverlay
          data-testid="dark-loading-overlay"
          loaderProps={{ color: "hotpink", "data-testid": "dark-spinner" }}
          overlayProps={{
            backgroundOpacity: 0.5,
            color: "#aabbcc",
            "data-testid": "dark-surface",
          }}
          visible
        />
      </MantineProvider>,
    );

    expect(
      screen.getByTestId("dark-spinner").style.getPropertyValue("--loader-color"),
    ).toBe("hotpink");
    const overlays = screen.getAllByTestId("dark-surface");

    expect(overlays).toHaveLength(2);
    for (const overlay of overlays) {
      expect(overlay.style.getPropertyValue("--overlay-bg")).toBe(
        "rgba(170, 187, 204, 0.5)",
      );
    }
    expect(budgetBoardColors.dark.surfaceOverlay).toBe("#292c31");
  });

  it("forwards Mantine props and refs and renders nothing when hidden", () => {
    const ref = createRef<HTMLDivElement>();

    const { rerender } = render(
      <LoadingOverlay
        className="consumer-overlay"
        data-testid="forwarded-overlay"
        ref={ref}
        visible
        zIndex={650}
      />,
    );

    const root = screen.getByTestId("forwarded-overlay");

    expect(root).toHaveClass("consumer-overlay");
    expect(root.style.getPropertyValue("--lo-z-index")).toBe("650");
    expect(ref.current).toBe(root);

    rerender(<LoadingOverlay data-testid="hidden-overlay" visible={false} />);

    expect(screen.queryByTestId("hidden-overlay")).not.toBeInTheDocument();
  });
});
