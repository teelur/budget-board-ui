import { MantineProvider, Popover as MantinePopover } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Popover } from "../src/Popover/Popover";
import classes from "../src/Popover/Popover.module.css";
import { budgetBoardDarkTheme } from "../src/theme";

describe("Popover", () => {
  it("exposes Mantine compound components and renders a themed dropdown", () => {
    render(
      <MantineProvider env="test">
        <Popover opened withinPortal={false}>
          <Popover.Target>
            <button type="button">Open popover</button>
          </Popover.Target>
          <Popover.Dropdown>Popover content</Popover.Dropdown>
        </Popover>
      </MantineProvider>,
    );

    const dropdown = screen.getByRole("dialog");

    expect(Popover.Target).toBe(MantinePopover.Target);
    expect(Popover.Dropdown).toBe(MantinePopover.Dropdown);
    expect(Popover.ContextMenu).toBe(MantinePopover.ContextMenu);
    expect(dropdown).toHaveClass(classes.dropdown);
    expect(
      dropdown.style.getPropertyValue("--bbui-popover-background"),
    ).toBe("var(--bb-color-page, #f7f6f2)");
    expect(dropdown.style.getPropertyValue("--bbui-popover-border")).toBe(
      "var(--bb-color-border-subtle, #d8d5ce)",
    );
    expect(dropdown.style.getPropertyValue("--bbui-popover-text")).toBe(
      "var(--bb-color-text-primary, #3a3834)",
    );
    expect(dropdown.style.getPropertyValue("--bbui-popover-font")).toBe(
      'var(--bb-font-body, "IBM Plex Sans Variable", sans-serif)',
    );
    expect(screen.getByText("Popover content")).toBeInTheDocument();
  });

  it("uses the dark semantic palette when rendered in a dark Mantine provider", () => {
    render(
      <MantineProvider
        env="test"
        forceColorScheme="dark"
        theme={budgetBoardDarkTheme}
      >
        <Popover opened withinPortal={false}>
          <Popover.Target>
            <button type="button">Open dark popover</button>
          </Popover.Target>
          <Popover.Dropdown>Dark popover content</Popover.Dropdown>
        </Popover>
      </MantineProvider>,
    );

    const dropdown = screen.getByRole("dialog");

    expect(
      dropdown.style.getPropertyValue("--bbui-popover-background"),
    ).toBe("var(--bb-color-page, #111214)");
    expect(dropdown.style.getPropertyValue("--bbui-popover-border")).toBe(
      "var(--bb-color-border-subtle, #3a3d42)",
    );
    expect(dropdown.style.getPropertyValue("--bbui-popover-text")).toBe(
      "var(--bb-color-text-primary, #d8d5ce)",
    );
  });

  it("merges consumer class names and style callbacks with BBUI defaults", () => {
    const classNames = vi.fn(() => ({ dropdown: "consumer-dropdown" }));
    const styles = vi.fn(() => ({
      dropdown: { backgroundColor: "rebeccapurple", opacity: 0.8 },
    }));

    render(
      <MantineProvider env="test">
        <Popover
          classNames={classNames}
          opened
          styles={styles}
          withinPortal={false}
        >
          <Popover.Target>
            <button type="button">Customized popover</button>
          </Popover.Target>
          <Popover.Dropdown>Customized content</Popover.Dropdown>
        </Popover>
      </MantineProvider>,
    );

    const dropdown = screen.getByRole("dialog");

    expect(classNames).toHaveBeenCalled();
    expect(styles).toHaveBeenCalled();
    expect(dropdown).toHaveClass(classes.dropdown, "consumer-dropdown");
    expect(dropdown.style.backgroundColor).toBe("rebeccapurple");
    expect(dropdown.style.opacity).toBe("0.8");
    expect(
      dropdown.style.getPropertyValue("--bbui-popover-background"),
    ).toBe("var(--bb-color-page, #f7f6f2)");
  });

  it("forwards Mantine open and close behavior", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <MantineProvider env="test">
        <Popover onChange={onChange} withinPortal={false}>
          <Popover.Target>
            <button type="button">Toggle popover</button>
          </Popover.Target>
          <Popover.Dropdown>Toggle content</Popover.Dropdown>
        </Popover>
      </MantineProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Toggle popover" }));
    const dropdown = await screen.findByRole("dialog");
    expect(onChange).toHaveBeenCalledWith(true);

    dropdown.focus();
    await user.keyboard("{Escape}");
    expect(onChange).toHaveBeenLastCalledWith(false);
  });
});
