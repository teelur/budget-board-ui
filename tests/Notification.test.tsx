import { createRef } from "react";
import { MantineProvider } from "@mantine/core";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  Notification,
  notificationColors,
} from "../src/Notification/Notification";
import { budgetBoardColors, budgetBoardDarkTheme } from "../src/theme";

describe("Notification", () => {
  it("renders with the default info color, tinted surface, and border", () => {
    render(
      <Notification title="Import complete">
        Your transactions are ready.
      </Notification>,
    );

    const notification = screen.getByRole("alert");

    expect(notification).toHaveAttribute(
      "data-budget-board-notification-color",
      "info",
    );
    expect(notification.style.getPropertyValue("--notification-color")).toBe(
      "var(--bb-color-info, #1971c2)",
    );
    expect(notification.style.backgroundColor).toBe(
      "color-mix(in srgb, var(--notification-color) 15%, var(--bb-color-surface-elevated, #F6F6F3))",
    );
    expect(notification.style.borderColor).toBe(
      "color-mix(in srgb, var(--notification-color) 35%, var(--bb-color-border-subtle, #d8d5ce))",
    );
    expect(notification.style.padding).toBe("0.5rem");
    expect(screen.getByText("Your transactions are ready.")).toBeInTheDocument();
  });

  it("supports the full BBUI semantic palette", () => {
    render(
      <>
        {notificationColors.map((color) => (
          <Notification key={color} color={color} title={color}>
            {color} details
          </Notification>
        ))}
      </>,
    );

    for (const color of notificationColors) {
      const notification = screen
        .getAllByRole("alert")
        .find(
          (item) =>
            item.getAttribute("data-budget-board-notification-color") ===
            color,
        );
      if (!notification) {
        throw new Error(`Expected a ${color} notification to render.`);
      }

      expect(notification).toHaveAttribute(
        "data-budget-board-notification-color",
        color,
      );
      expect(
        notification.style.getPropertyValue("--notification-color"),
      ).toBe(`var(--bb-color-${color}, ${budgetBoardColors.light[color]})`);
    }
  });

  it("preserves Mantine props, styles, vars, close behavior, and refs", () => {
    const onClose = vi.fn();
    const ref = createRef<HTMLDivElement>();
    const vars = vi.fn(() => ({
      root: { "--notification-color": "custom-notification-color" },
    }));

    render(
      <MantineProvider env="test">
        <Notification
          className="consumer-root"
          classNames={{ title: "consumer-title" }}
          closeButtonProps={{ "aria-label": "Dismiss notification" }}
          color="warning"
          onClose={onClose}
          ref={ref}
          styles={{ root: { opacity: 0.8 } }}
          title="Review needed"
          vars={vars}
        >
          Check the account details.
        </Notification>
      </MantineProvider>,
    );

    const notification = screen.getByRole("alert");

    expect(notification).toHaveClass("consumer-root");
    expect(screen.getByText("Review needed")).toHaveClass("consumer-title");
    expect(notification).toHaveStyle({ opacity: "0.8" });
    expect(
      notification.style.getPropertyValue("--notification-color"),
    ).toBe("custom-notification-color");
    expect(vars).toHaveBeenCalled();
    expect(ref.current).toBe(notification);

    fireEvent.click(screen.getByRole("button", { name: "Dismiss notification" }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("uses the dark BBUI palette", () => {
    render(
      <MantineProvider
        env="test"
        forceColorScheme="dark"
        theme={budgetBoardDarkTheme}
      >
        <Notification color="info" title="Dark notification">
          Dark theme content
        </Notification>
      </MantineProvider>,
    );

    const notification = screen.getByRole("alert");

    expect(notification.style.getPropertyValue("--notification-color")).toBe(
      "var(--bb-color-info, #74c0fc)",
    );
    expect(notification.style.backgroundColor).toBe(
      "color-mix(in srgb, var(--notification-color) 15%, var(--bb-color-surface-elevated, #2A2D33))",
    );
  });

  it("keeps non-BBUI Mantine colors and works without a provider", () => {
    render(
      <Notification color="#123456" title="Custom Mantine color">
        Custom color content
      </Notification>,
    );

    const notification = screen.getByRole("alert");

    expect(notification).not.toHaveAttribute(
      "data-budget-board-notification-color",
    );
    expect(notification).toHaveStyle({ backgroundColor: expect.any(String) });
    expect(notification).toBeVisible();
  });
});
