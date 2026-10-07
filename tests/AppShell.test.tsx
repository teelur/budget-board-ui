import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { describe, expect, it } from "vitest";
import {
  AppShell,
  AppShellAside,
  AppShellFooter,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  AppShellSection,
} from "../src/AppShell/AppShell";
import classes from "../src/AppShell/AppShell.module.css";
import { budgetBoardDarkTheme } from "../src/theme";

describe("AppShell", () => {
  it("composes the Mantine shell primitives and forwards props", () => {
    render(
      <AppShell
        aria-label="Application"
        data-testid="app-shell"
        footer={{ height: 32 }}
        header={{ height: 48 }}
        navbar={{ breakpoint: "sm", width: 180 }}
        aside={{ breakpoint: "sm", width: 160 }}
      >
        <AppShellHeader data-testid="header">Header</AppShellHeader>
        <AppShellNavbar data-testid="navbar">
          <AppShellSection data-testid="section">Navigation</AppShellSection>
        </AppShellNavbar>
        <AppShellAside data-testid="aside">Aside</AppShellAside>
        <AppShellMain data-testid="main">Content</AppShellMain>
        <AppShellFooter data-testid="footer">Footer</AppShellFooter>
      </AppShell>,
    );

    expect(screen.getByTestId("app-shell")).toHaveAttribute(
      "aria-label",
      "Application",
    );
    expect(screen.getByTestId("header")).toHaveTextContent("Header");
    expect(screen.getByTestId("header")).toHaveClass(classes.headerSurface);
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("navbar")).toHaveClass(classes.navigation);
    expect(screen.getByTestId("aside")).toBeInTheDocument();
    expect(screen.getByTestId("main")).toHaveTextContent("Content");
    expect(screen.getByTestId("footer")).toHaveTextContent("Footer");
    expect(screen.getByTestId("section")).toHaveTextContent("Navigation");
  });

  it("applies semantic light palette defaults and allows style overrides", () => {
    render(
      <AppShell
        data-testid="app-shell"
        style={{ "--bbui-app-shell-page": "pink" } as React.CSSProperties}
      />,
    );

    const appShell = screen.getByTestId("app-shell");

    expect(appShell.style.getPropertyValue("--bbui-app-shell-page")).toBe(
      "pink",
    );
    expect(appShell.style.getPropertyValue("--bbui-app-shell-navigation")).toBe(
      "var(--bb-color-navigation, #f1efe9)",
    );
    expect(appShell.style.getPropertyValue("--bbui-app-shell-header")).toBe(
      "var(--bb-color-surface-sunken, #ebe8df)",
    );
  });

  it("resolves semantic palette defaults in dark mode", () => {
    render(
      <MantineProvider forceColorScheme="dark" theme={budgetBoardDarkTheme}>
        <AppShell data-testid="app-shell" />
      </MantineProvider>,
    );

    expect(
      screen
        .getByTestId("app-shell")
        .style.getPropertyValue("--bbui-app-shell-page"),
    ).toBe("var(--bb-color-page, #111214)");
    expect(
      screen
        .getByTestId("app-shell")
        .style.getPropertyValue("--bbui-app-shell-header"),
    ).toBe("var(--bb-color-surface-sunken, #0d0f12)");
  });
});
