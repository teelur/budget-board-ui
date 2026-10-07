import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MantineProvider } from "@mantine/core";
import { describe, expect, it, vi } from "vitest";
import { NavbarLink } from "../src/NavbarLink/NavbarLink";
import { budgetBoardDarkTheme } from "../src/theme";

const navbarLinkStyles = readFileSync(
  resolve(process.cwd(), "src/NavbarLink/NavbarLink.module.css"),
  "utf8",
);

describe("NavbarLink", () => {
  it("insets expanded icons without changing their layout footprint", () => {
    const iconStyles = navbarLinkStyles.match(/\.icon\s*\{([^}]*)\}/)?.[1];
    const iconInsetStyles = navbarLinkStyles.match(
      /\.iconInset\s*\{([^}]*)\}/,
    )?.[1];
    const iconCollapsedStyles = navbarLinkStyles.match(
      /\.iconCollapsed\s*\{([^}]*)\}/,
    )?.[1];
    const childrenStyles = navbarLinkStyles.match(
      /\.children\s*\{([^}]*)\}/,
    )?.[1];

    expect(iconStyles).toContain("width: 1.125rem;");
    expect(iconInsetStyles).toContain("transform: translateX(0.5rem);");
    expect(iconCollapsedStyles).toContain("width: 1.375rem;");
    expect(iconCollapsedStyles).toContain("flex-basis: 1.375rem;");
    expect(iconCollapsedStyles).toContain("height: 1.375rem;");
    expect(iconStyles).toContain("justify-content: center;");
    expect(childrenStyles).toContain("padding-left: 1.1875rem;");
    expect(childrenStyles).toContain("margin: 0.25rem 0 0 1.0625rem;");
  });

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
    expect(screen.getByText("Transactions")).toHaveStyle({
      fontWeight: "600",
    });
    expect(
      screen
        .getByText("Transactions")
        .parentElement?.style.getPropertyValue("--group-gap"),
    ).toBe("var(--mantine-spacing-md)");
    expect(link.style.getPropertyValue("--bbui-navbar-link-hover")).toBe(
      "var(--bb-color-surface-hover, #e7e3da)",
    );
    expect(navbarLinkStyles).toContain(
      '&:hover:not(:disabled):not([data-active="true"]) {',
    );
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

  it("renders a disclosure independently from the parent and child actions", async () => {
    const onParentClick = vi.fn();
    const onChildClick = vi.fn();
    const user = userEvent.setup();
    render(
      <NavbarLink
        icon={<span aria-hidden="true">I</span>}
        items={[
          {
            id: "account-types",
            label: "Account types",
            active: true,
            onClick: onChildClick,
          },
        ]}
        label="Accounts"
        onClick={onParentClick}
        showLabel
      />,
    );

    const disclosure = screen.getByRole("button", { name: "Expand Accounts" });
    const parent = screen.getByRole("button", { name: "Accounts" });
    const panelId = disclosure.getAttribute("aria-controls");

    expect(disclosure).toHaveAttribute("aria-expanded", "false");
    expect(panelId).toBeTruthy();
    expect(document.getElementById(panelId!)).not.toBeNull();

    await user.click(disclosure);

    expect(
      screen.getByRole("button", { name: "Collapse Accounts" }),
    ).toHaveAttribute("aria-expanded", "true");
    const child = await screen.findByRole("button", { name: "Account types" });
    expect(child).toHaveAttribute("data-active", "true");

    await user.click(parent);
    await user.click(child);
    expect(onParentClick).toHaveBeenCalledOnce();
    expect(onChildClick).toHaveBeenCalledOnce();
  });

  it("supports controlled expansion and localized disclosure labels", async () => {
    const onExpandedChange = vi.fn();
    const user = userEvent.setup();
    const props = {
      icon: <span aria-hidden="true">I</span>,
      items: [{ id: "deleted", label: "Deleted accounts", onClick: vi.fn() }],
      label: "Accounts",
      onExpandedChange,
      expandLabel: "Show account pages",
      collapseLabel: "Hide account pages",
      showLabel: true,
    };
    const { rerender } = render(<NavbarLink {...props} expanded={false} />);

    await user.click(
      screen.getByRole("button", { name: "Show account pages" }),
    );
    expect(onExpandedChange).toHaveBeenCalledWith(true);
    expect(
      screen.getByRole("button", { name: "Show account pages" }),
    ).toHaveAttribute("aria-expanded", "false");

    rerender(<NavbarLink {...props} expanded />);
    expect(
      screen.getByRole("button", { name: "Hide account pages" }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      await screen.findByRole("button", { name: "Deleted accounts" }),
    ).toBeInTheDocument();
  });

  it("toggles child links with keyboard activation", async () => {
    const user = userEvent.setup();
    render(
      <NavbarLink
        icon={<span aria-hidden="true">I</span>}
        items={[{ id: "categories", label: "Categories", onClick: vi.fn() }]}
        label="Transactions"
        showLabel
      />,
    );

    const disclosure = screen.getByRole("button", {
      name: "Expand Transactions",
    });
    disclosure.focus();
    await user.keyboard("{Enter}");

    expect(
      screen.getByRole("button", { name: "Collapse Transactions" }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      await screen.findByRole("button", { name: "Categories" }),
    ).toBeInTheDocument();
  });

  it("hides grouped navigation controls when labels are collapsed", () => {
    render(
      <NavbarLink
        defaultExpanded
        icon={<span aria-hidden="true">I</span>}
        items={[{ id: "categories", label: "Categories", onClick: vi.fn() }]}
        label="Transactions"
      />,
    );

    expect(screen.getByRole("button", { name: "Transactions" })).toBeVisible();
    expect(
      screen.queryByRole("button", { name: "Expand Transactions" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Categories")).not.toBeInTheDocument();
  });

  it("preserves disabled child-link behavior", async () => {
    const onChildClick = vi.fn();
    const user = userEvent.setup();
    render(
      <NavbarLink
        defaultExpanded
        icon={<span aria-hidden="true">I</span>}
        items={[
          {
            id: "deleted",
            label: "Deleted accounts",
            disabled: true,
            onClick: onChildClick,
          },
        ]}
        label="Accounts"
        showLabel
      />,
    );

    const child = screen.getByRole("button", { name: "Deleted accounts" });
    expect(child).toBeDisabled();
    await user.click(child);
    expect(onChildClick).not.toHaveBeenCalled();
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
    ).toBe("var(--bb-color-selection, #414b85)");
    expect(
      screen
        .getByRole("button", { name: "Accounts" })
        .style.getPropertyValue("--bbui-navbar-link-hover"),
    ).toBe("var(--bb-color-surface-hover, #34373a)");
  });
});
