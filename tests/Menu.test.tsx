import { MantineProvider, Menu as MantineMenu } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Menu } from "../src/Menu/Menu";
import classes from "../src/Menu/Menu.module.css";
import { budgetBoardDarkTheme } from "../src/theme";

describe("Menu", () => {
  it("exposes all Mantine compound components and applies BBUI styles", () => {
    render(
      <MantineProvider env="test">
        <Menu opened width={220} withinPortal={false} withArrow>
          <Menu.Target>
            <button type="button">Open menu</button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Account actions</Menu.Label>
            <Menu.Item leftSection={<span>icon</span>}>Edit account</Menu.Item>
            <Menu.Divider />
            <Menu.Item disabled>Unavailable action</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </MantineProvider>,
    );

    const dropdown = screen.getByRole("menu");
    const item = screen.getByRole("menuitem", { name: /Edit account/ });

    expect(Menu.Target).toBe(MantineMenu.Target);
    expect(Menu.Dropdown).toBe(MantineMenu.Dropdown);
    expect(Menu.Item).toBe(MantineMenu.Item);
    expect(Menu.Label).toBe(MantineMenu.Label);
    expect(Menu.Divider).toBe(MantineMenu.Divider);
    expect(Menu.Search).toBe(MantineMenu.Search);
    expect(Menu.Sub).toBe(MantineMenu.Sub);
    expect(Menu.CheckboxItem).toBe(MantineMenu.CheckboxItem);
    expect(Menu.CheckboxGroup).toBe(MantineMenu.CheckboxGroup);
    expect(Menu.RadioItem).toBe(MantineMenu.RadioItem);
    expect(Menu.RadioGroup).toBe(MantineMenu.RadioGroup);
    expect(Menu.ContextMenu).toBe(MantineMenu.ContextMenu);
    expect(dropdown).toHaveClass(classes.dropdown);
    expect(item).toHaveClass(classes.item);
    expect(dropdown.style.backgroundColor).toBe(
      "var(--bbui-menu-background)",
    );
    expect(
      dropdown.style.getPropertyValue("--bbui-menu-background"),
    ).toBe("var(--bb-color-surface-elevated, #F6F6F3)");
    expect(dropdown.style.getPropertyValue("--bbui-menu-border")).toBe(
      "var(--bb-color-border-subtle, #d8d5ce)",
    );
    expect(dropdown.style.getPropertyValue("--bbui-menu-font")).toBe(
      'var(--bb-font-body, "IBM Plex Sans Variable", sans-serif)',
    );
    expect(document.querySelector(".mantine-Menu-arrow")).toHaveClass(
      classes.arrow,
    );
    expect(
      document.querySelector<HTMLElement>(".mantine-Menu-arrow")?.style
        .borderColor,
    ).toBe("");
  });

  it("uses semantic dark colors from a dark provider", () => {
    render(
      <MantineProvider
        env="test"
        forceColorScheme="dark"
        theme={budgetBoardDarkTheme}
      >
        <Menu opened withinPortal={false}>
          <Menu.Target>
            <button type="button">Open dark menu</button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>Dark action</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </MantineProvider>,
    );

    const dropdown = screen.getByRole("menu");

    expect(
      dropdown.style.getPropertyValue("--bbui-menu-background"),
    ).toBe("var(--bb-color-surface-elevated, #2A2D33)");
    expect(dropdown.style.getPropertyValue("--bbui-menu-hover")).toBe(
      "var(--bb-color-surface-hover, #34373a)",
    );
    expect(dropdown.style.getPropertyValue("--bbui-menu-text")).toBe(
      "var(--bb-color-text-primary, #d8d5ce)",
    );
  });

  it("merges consumer class names and style callbacks", () => {
    const classNames = vi.fn(() => ({
      dropdown: "consumer-dropdown",
      item: "consumer-item",
    }));
    const styles = vi.fn(() => ({
      dropdown: { borderColor: "rebeccapurple", opacity: 0.8 },
    }));

    render(
      <MantineProvider env="test">
        <Menu
          classNames={classNames}
          opened
          styles={styles}
          withinPortal={false}
        >
          <Menu.Target>
            <button type="button">Customized menu</button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>Customized action</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </MantineProvider>,
    );

    const dropdown = screen.getByRole("menu");
    const item = screen.getByRole("menuitem", {
      name: "Customized action",
    });

    expect(classNames).toHaveBeenCalled();
    expect(styles).toHaveBeenCalled();
    expect(dropdown).toHaveClass(classes.dropdown, "consumer-dropdown");
    expect(dropdown.style.borderColor).toBe("rebeccapurple");
    expect(dropdown.style.opacity).toBe("0.8");
    expect(item).toHaveClass(classes.item, "consumer-item");
    expect(
      dropdown.style.getPropertyValue("--bbui-menu-background"),
    ).toBe("var(--bb-color-surface-elevated, #F6F6F3)");
  });

  it("preserves Mantine open and item-click behavior", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onAction = vi.fn();

    render(
      <MantineProvider env="test">
        <Menu onChange={onChange} withinPortal={false}>
          <Menu.Target>
            <button type="button">Toggle menu</button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={onAction}>Run action</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </MantineProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Toggle menu" }));
    expect(await screen.findByRole("menu")).toBeInTheDocument();
    expect(onChange).toHaveBeenLastCalledWith(true);

    await user.click(screen.getByRole("menuitem", { name: "Run action" }));
    expect(onAction).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenLastCalledWith(false);
  });
});
