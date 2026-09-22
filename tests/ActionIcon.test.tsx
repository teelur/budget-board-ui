import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MantineProvider } from "@mantine/core";
import { describe, expect, it, vi } from "vitest";
import { ActionIcon } from "../src/ActionIcon/ActionIcon";
import { budgetBoardDarkTheme } from "../src/theme";

function renderActionIcon(actionIcon: React.ReactNode) {
  return render(actionIcon);
}

describe("ActionIcon", () => {
  it("renders an accessible primary medium icon button by default", () => {
    renderActionIcon(
      <ActionIcon aria-label="Open menu">
        <span aria-hidden="true">+</span>
      </ActionIcon>,
    );

    const actionIcon = screen.getByRole("button", { name: "Open menu" });

    expect(actionIcon).toHaveAttribute("type", "button");
    expect(actionIcon).toHaveAttribute(
      "data-budget-board-action-icon-size",
      "md",
    );
    expect(actionIcon).toHaveAttribute("data-budget-board-color", "primary");
    expect(actionIcon).toHaveAttribute("data-budget-board-variant", "filled");
    expect(actionIcon).not.toHaveAttribute("aria-pressed");
  });

  it("supports every public size", () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

    renderActionIcon(
      <>
        {sizes.map((size) => (
          <ActionIcon aria-label={size} key={size} size={size}>
            {size}
          </ActionIcon>
        ))}
      </>,
    );

    for (const size of sizes) {
      expect(screen.getByRole("button", { name: size })).toHaveAttribute(
        "data-budget-board-action-icon-size",
        size,
      );
    }
  });

  it("supports numeric and CSS length sizes as square dimensions", () => {
    renderActionIcon(
      <>
        <ActionIcon aria-label="Numeric size" size={24}>
          N
        </ActionIcon>
        <ActionIcon aria-label="Rem size" size="1.5rem">
          R
        </ActionIcon>
      </>,
    );

    expect(screen.getByRole("button", { name: "Numeric size" })).toHaveStyle({
      "--bbui-action-icon-size": "24px",
    });
    expect(screen.getByRole("button", { name: "Rem size" })).toHaveStyle({
      "--bbui-action-icon-size": "1.5rem",
    });
  });

  it("forwards semantic appearance and native button attributes", () => {
    renderActionIcon(
      <ActionIcon
        aria-label="Delete transaction"
        color="error"
        name="delete"
        type="submit"
        variant="outline"
      >
        X
      </ActionIcon>,
    );

    const actionIcon = screen.getByRole("button", {
      name: "Delete transaction",
    });

    expect(actionIcon).toHaveAttribute("data-budget-board-color", "error");
    expect(actionIcon).toHaveAttribute("data-budget-board-variant", "outline");
    expect(actionIcon).toHaveAttribute("name", "delete");
    expect(actionIcon).toHaveAttribute("type", "submit");
  });

  it("supports selected state while remaining interactive", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    renderActionIcon(
      <ActionIcon aria-label="Pin transaction" onClick={onClick} selected>
        P
      </ActionIcon>,
    );

    const actionIcon = screen.getByRole("button", { name: "Pin transaction" });

    expect(actionIcon).toHaveAttribute("aria-pressed", "true");
    expect(actionIcon).toHaveAttribute("data-budget-board-selected", "true");

    await user.click(actionIcon);

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("uses aria-selected instead of aria-pressed for tabs", () => {
    renderActionIcon(
      <ActionIcon aria-label="Preview" aria-selected="true" role="tab" selected>
        P
      </ActionIcon>,
    );

    const actionIcon = screen.getByRole("tab", { name: "Preview" });

    expect(actionIcon).toHaveAttribute("aria-selected", "true");
    expect(actionIcon).not.toHaveAttribute("aria-pressed");
  });

  it("does not activate when disabled or loading", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    renderActionIcon(
      <>
        <ActionIcon aria-label="Disabled" disabled onClick={onClick}>
          D
        </ActionIcon>
        <ActionIcon aria-label="Loading" loading onClick={onClick}>
          L
        </ActionIcon>
      </>,
    );

    await user.click(screen.getByRole("button", { name: "Disabled" }));
    await user.click(screen.getByRole("button", { name: "Loading" }));

    expect(screen.getByRole("button", { name: "Disabled" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Loading" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Loading" })).toHaveAttribute(
      "aria-busy",
      "true",
    );
    expect(onClick).not.toHaveBeenCalled();
  });

  it("resolves dark semantic palette roles", () => {
    render(
      <MantineProvider forceColorScheme="dark" theme={budgetBoardDarkTheme}>
        <ActionIcon aria-label="Primary">P</ActionIcon>
      </MantineProvider>,
    );

    expect(
      screen
        .getByRole("button", { name: "Primary" })
        .style.getPropertyValue("--bbui-button-bg"),
    ).toBe(
      "var(--budget-board-button-primary-background, var(--bb-color-primary, #91a7ff))",
    );
  });

  it("supports Mantine dimension style props and style callbacks", () => {
    renderActionIcon(
      <ActionIcon
        aria-label="Dimensions"
        h={40}
        style={(theme) => ({
          "--bbui-button-bg": theme.colors.red[6],
        })}
        w={40}
      >
        D
      </ActionIcon>,
    );

    const actionIcon = screen.getByRole("button", { name: "Dimensions" });

    expect(actionIcon).not.toHaveAttribute("h");
    expect(actionIcon).not.toHaveAttribute("w");
    expect(actionIcon).toHaveStyle({
      width: "calc(2.5rem * var(--mantine-scale))",
      height: "calc(2.5rem * var(--mantine-scale))",
    });
    expect(actionIcon.style.getPropertyValue("--bbui-button-bg")).toBe(
      "#fa5252",
    );
  });

  it("works without a Mantine provider", () => {
    renderActionIcon(<ActionIcon aria-label="Standalone">S</ActionIcon>);

    expect(screen.getByRole("button", { name: "Standalone" })).toBeVisible();
  });
});
