import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { ReactNode } from "react";
import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Modal } from "../src/Modal/Modal";
import classes from "../src/Modal/Modal.module.css";
import { budgetBoardDarkTheme } from "../src/theme";

const modalStyles = readFileSync(
  resolve(process.cwd(), "src/Modal/Modal.module.css"),
  "utf8",
);

function renderModal(children: ReactNode = "Modal content") {
  return render(
    <MantineProvider env="test">
      <Modal
        onClose={vi.fn()}
        opened
        title="Modal title"
        withinPortal={false}
      >
        {children}
      </Modal>
    </MantineProvider>,
  );
}

describe("Modal", () => {
  it("renders the accessible dialog with BBUI semantic styles and default padding", () => {
    renderModal();

    const dialog = screen.getByRole("dialog", { name: "Modal title" });
    const title = screen.getByText("Modal title");
    const body = screen.getByText("Modal content");
    const modalRoot = dialog.closest(".mantine-Modal-root");
    const inner = dialog.closest(`.${classes.inner}`);

    expect(dialog).toHaveClass(classes.content);
    expect(modalRoot).toHaveStyle({ padding: "8px" });
    expect(dialog.style.getPropertyValue("--bbui-modal-background")).toBe(
      "var(--bb-color-page, #f7f6f2)",
    );
    expect(dialog.style.getPropertyValue("--bbui-modal-border")).toBe(
      "var(--bb-color-border-subtle, #d8d5ce)",
    );
    expect(dialog.style.getPropertyValue("--bbui-modal-title")).toBe(
      "var(--bb-color-text-heading, #242321)",
    );
    expect(dialog.style.getPropertyValue("--bbui-modal-body")).toBe(
      "var(--bb-color-text-primary, #3a3834)",
    );
    expect(title).toHaveAttribute("data-budget-board-text-role", "heading");
    expect(title.tagName).toBe("SPAN");
    expect(body.closest(`.${classes.body}`)).not.toBeNull();
    expect(inner).toHaveStyle({ left: "0px", right: "0px" });
    expect(modalStyles).toContain("padding: 0 !important;");
  });

  it("uses the dark semantic palette when rendered in a dark Mantine provider", () => {
    render(
      <MantineProvider
        env="test"
        forceColorScheme="dark"
        theme={budgetBoardDarkTheme}
      >
        <Modal
          onClose={vi.fn()}
          opened
          title="Dark modal"
          withinPortal={false}
        />
      </MantineProvider>,
    );

    const dialog = screen.getByRole("dialog", { name: "Dark modal" });

    expect(dialog.style.getPropertyValue("--bbui-modal-background")).toBe(
      "var(--bb-color-page, #111214)",
    );
    expect(dialog.style.getPropertyValue("--bbui-modal-title")).toBe(
      "var(--bb-color-text-heading, #f2f0eb)",
    );
  });

  it("allows consumer padding, classes, and slot styles to override defaults", () => {
    render(
      <MantineProvider env="test">
        <Modal
          classNames={{ content: "consumer-content", title: "consumer-title" }}
          onClose={vi.fn()}
          opened
          p="1rem"
          styles={{ content: { backgroundColor: "rebeccapurple" } }}
          title="Customized modal"
          withinPortal={false}
        />
      </MantineProvider>,
    );

    const dialog = screen.getByRole("dialog", { name: "Customized modal" });

    expect(dialog).toHaveClass(classes.content, "consumer-content");
    expect(dialog.closest(".mantine-Modal-root")).toHaveStyle({
      padding: "16px",
    });
    expect(dialog.style.backgroundColor).toBe("rebeccapurple");
    expect(
      screen.getByRole("heading", { name: "Customized modal" }),
    ).toHaveClass("consumer-title");
  });

  it("preserves Mantine styles API callbacks and merges their slot values", () => {
    const styles = vi.fn(() => ({
      title: { opacity: 0.8 },
    }));

    render(
      <MantineProvider env="test">
        <Modal
          onClose={vi.fn()}
          opened
          styles={styles}
          title="Callback styles"
          withinPortal={false}
        />
      </MantineProvider>,
    );

    expect(styles).toHaveBeenCalled();
    expect(
      screen.getByRole("heading", { name: "Callback styles" }),
    ).toHaveStyle({ opacity: "0.8" });
    expect(
      screen
        .getByRole("dialog", { name: "Callback styles" })
        .style.getPropertyValue("--bbui-modal-background"),
    ).toBe("var(--bb-color-page, #f7f6f2)");
  });

  it("forwards Mantine close behavior", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <MantineProvider env="test">
        <Modal
          onClose={onClose}
          opened
          title="Closable modal"
          withinPortal={false}
        />
      </MantineProvider>,
    );

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledOnce();
  });
});
