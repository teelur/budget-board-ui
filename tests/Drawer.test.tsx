import type { ReactNode } from "react";
import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Drawer } from "../src/Drawer/Drawer";
import classes from "../src/Drawer/Drawer.module.css";
import { budgetBoardDarkTheme } from "../src/theme";

function renderDrawer(children: ReactNode = "Drawer content") {
  return render(
    <MantineProvider env="test">
      <Drawer
        onClose={vi.fn()}
        opened
        title="Drawer title"
        withinPortal={false}
      >
        {children}
      </Drawer>
    </MantineProvider>,
  );
}

describe("Drawer", () => {
  it("renders an accessible drawer with BBUI semantic styles and no wrapper root padding", () => {
    renderDrawer();

    const dialog = screen.getByRole("dialog", { name: "Drawer title" });
    const title = screen.getByText("Drawer title");
    const body = screen.getByText("Drawer content");

    expect(dialog).toHaveClass(classes.content);
    expect(
      dialog.closest(".mantine-Drawer-root")?.style.padding,
    ).toBe("");
    expect(dialog.style.getPropertyValue("--bbui-drawer-background")).toBe(
      "var(--bb-color-surface, #ffffff)",
    );
    expect(dialog.style.getPropertyValue("--bbui-drawer-border")).toBe(
      "var(--bb-color-border-subtle, #d8d5ce)",
    );
    expect(dialog.style.getPropertyValue("--bbui-drawer-title")).toBe(
      "var(--bb-color-text-heading, #242321)",
    );
    expect(dialog.style.getPropertyValue("--bbui-drawer-body")).toBe(
      "var(--bb-color-text-primary, #3a3834)",
    );
    expect(title).toHaveAttribute("data-budget-board-text-role", "heading");
    expect(title.tagName).toBe("SPAN");
    expect(body.closest(`.${classes.body}`)).not.toBeNull();
  });

  it("uses the dark semantic palette when rendered in a dark Mantine provider", () => {
    render(
      <MantineProvider
        env="test"
        forceColorScheme="dark"
        theme={budgetBoardDarkTheme}
      >
        <Drawer
          onClose={vi.fn()}
          opened
          title="Dark drawer"
          withinPortal={false}
        />
      </MantineProvider>,
    );

    const dialog = screen.getByRole("dialog", { name: "Dark drawer" });

    expect(dialog.style.getPropertyValue("--bbui-drawer-background")).toBe(
      "var(--bb-color-surface, #191b1f)",
    );
    expect(dialog.style.getPropertyValue("--bbui-drawer-title")).toBe(
      "var(--bb-color-text-heading, #f2f0eb)",
    );
  });

  it("forwards Mantine position and allows consumer padding, classes, and styles to override defaults", () => {
    render(
      <MantineProvider env="test">
        <Drawer
          classNames={{ content: "consumer-content", title: "consumer-title" }}
          onClose={vi.fn()}
          opened
          p="1rem"
          position="right"
          size="lg"
          styles={{ content: { backgroundColor: "rebeccapurple" } }}
          title="Customized drawer"
          withinPortal={false}
        />
      </MantineProvider>,
    );

    const dialog = screen.getByRole("dialog", { name: "Customized drawer" });
    const root = dialog.closest(".mantine-Drawer-root");

    expect(dialog).toHaveClass(classes.content, "consumer-content");
    expect(root).toHaveStyle({ padding: "16px" });
    expect(root?.style.getPropertyValue("--drawer-justify")).toBe("flex-end");
    expect(dialog.style.backgroundColor).toBe("rebeccapurple");
    expect(
      screen.getByRole("heading", { name: "Customized drawer" }),
    ).toHaveClass("consumer-title");
  });

  it("preserves Mantine classNames and styles callbacks while merging BBUI defaults", () => {
    const classNames = vi.fn(() => ({ title: "callback-title" }));
    const styles = vi.fn(() => ({ title: { opacity: 0.8 } }));

    render(
      <MantineProvider env="test">
        <Drawer
          classNames={classNames}
          onClose={vi.fn()}
          opened
          styles={styles}
          title="Callback drawer"
          withinPortal={false}
        />
      </MantineProvider>,
    );

    expect(classNames).toHaveBeenCalled();
    expect(styles).toHaveBeenCalled();
    expect(
      screen.getByRole("heading", { name: "Callback drawer" }),
    ).toHaveClass("callback-title");
    expect(
      screen.getByRole("heading", { name: "Callback drawer" }),
    ).toHaveStyle({ opacity: "0.8" });
    expect(
      screen
        .getByRole("dialog", { name: "Callback drawer" })
        .style.getPropertyValue("--bbui-drawer-background"),
    ).toBe("var(--bb-color-surface, #ffffff)");
  });

  it("forwards Mantine close behavior", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <MantineProvider env="test">
        <Drawer
          onClose={onClose}
          opened
          title="Closable drawer"
          withinPortal={false}
        />
      </MantineProvider>,
    );

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledOnce();
  });
});
