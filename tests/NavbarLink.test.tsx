import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MantineProvider } from "@mantine/core";
import { describe, expect, it, vi } from "vitest";
import { NavbarLink } from "../src/NavbarLink/NavbarLink";
import { budgetBoardDarkTheme } from "../src/theme";

describe("NavbarLink", () => {
  it("shows the label when expanded and forwards button attributes", () => {
    render(
      <NavbarLink
        aria-label="Open transactions navigation"
        icon={<span aria-hidden="true">I</span>}
        label="Transactions"
        name="transactions"
        showLabel
        title="Open transactions"
      />,
    );

    const link = screen.getByRole("button", {
      name: "Open transactions navigation",
    });

    expect(link).toHaveAttribute("name", "transactions");
    expect(link).toHaveAttribute("title", "Open transactions");
    expect(link).toHaveAttribute("type", "button");
    expect(link).toHaveAttribute("aria-label", "Open transactions navigation");
  });

  it("keeps a collapsed item accessible and displays its tooltip", async () => {
    const user = userEvent.setup();
    render(
      <NavbarLink icon={<span aria-hidden="true">I</span>} label="Accounts" />,
    );

    const link = screen.getByRole("button", { name: "Accounts" });

    expect(link).toHaveAttribute("aria-label", "Accounts");
    await user.hover(link);
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Accounts");
  });

  it("supports active, compact, click, and custom style states", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <NavbarLink
        active
        compact
        icon={<span aria-hidden="true">I</span>}
        label="Budgets"
        onClick={onClick}
        showLabel
        style={{ "--bbui-navbar-link-active": "pink" } as React.CSSProperties}
      />,
    );

    const link = screen.getByRole("button", { name: "Budgets" });

    expect(link).toHaveAttribute("data-active", "true");
    expect(link).toHaveAttribute(
      "data-budget-board-navbar-link-compact",
      "true",
    );
    expect(link.style.getPropertyValue("--bbui-navbar-link-active")).toBe(
      "pink",
    );
    await user.click(link);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("resolves semantic colors in dark mode", () => {
    render(
      <MantineProvider forceColorScheme="dark" theme={budgetBoardDarkTheme}>
        <NavbarLink icon={<span aria-hidden="true">I</span>} label="Accounts" />
      </MantineProvider>,
    );

    expect(
      screen
        .getByRole("button", { name: "Accounts" })
        .style.getPropertyValue("--bbui-navbar-link-active"),
    ).toBe("var(--bb-color-selection, #1e2450)");
  });
});
