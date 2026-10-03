import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DateInput } from "../src/DateInput/DateInput";
import classes from "../src/shared/inputStyles.module.css";
import popoverClasses from "../src/shared/datePickerStyles.module.css";
import { budgetBoardDarkTheme } from "../src/theme";

describe("DateInput", () => {
  it("renders a labeled free-form date input with BBUI styling", () => {
    render(
      <DateInput
        defaultValue="2025-06-15"
        label="Transaction date"
        valueFormat="YYYY-MM-DD"
      />,
    );

    const input = screen.getByRole("textbox", { name: "Transaction date" });
    const root = input.closest(`.${classes.root}`);

    expect(input).toHaveValue("2025-06-15");
    expect(input).toHaveClass(classes.input);
    expect(root).toHaveAttribute("data-budget-board-color-scheme", "light");
    expect(root?.style.getPropertyValue("--bbui-input-background")).toBe(
      "var(--bb-color-surface-input, #e9eae8)",
    );
  });

  it("preserves controlled date changes and custom input classes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <DateInput
        aria-label="Due date"
        classNames={{ input: "consumer-date-input" }}
        onChange={onChange}
        value={null}
        valueFormat="YYYY-MM-DD"
      />,
    );

    const input = screen.getByRole("textbox", { name: "Due date" });
    await user.type(input, "2025-06-15");

    expect(input).toHaveClass(classes.input, "consumer-date-input");
    expect(onChange).toHaveBeenLastCalledWith("2025-06-15");
  });

  it("applies the BBUI theme to its calendar dropdown", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <DateInput
        aria-label="Calendar date"
        defaultDate={new Date(2025, 5, 1)}
        popoverProps={{
          classNames: { dropdown: "consumer-date-dropdown" },
          styles: { dropdown: { color: "tomato" } },
        }}
      />,
    );

    await user.click(screen.getByRole("textbox", { name: "Calendar date" }));
    await screen.findByRole("button", { name: "June 2025" });

    const dropdown = container.ownerDocument.querySelector(
      `.${popoverClasses.dropdown}`,
    );

    expect(dropdown).toHaveClass("consumer-date-dropdown");
    expect(dropdown).not.toHaveClass("light", "dark");
    expect(dropdown?.style.color).toBe("tomato");
    expect(dropdown?.style.getPropertyValue("--bbui-calendar-background")).toBe(
      "var(--bb-color-surface-elevated, #fffcf7)",
    );
  });

  it("starts the calendar week on Sunday by default", async () => {
    const user = userEvent.setup();
    render(
      <DateInput
        aria-label="Sunday-first date"
        defaultDate={new Date(2025, 5, 1)}
      />,
    );

    await user.click(
      screen.getByRole("textbox", { name: "Sunday-first date" }),
    );
    await screen.findByRole("button", { name: "June 2025" });
    const weekdays = Array.from(
      document.querySelectorAll(".mantine-DateInput-weekday"),
      (weekday) => weekday.textContent,
    );

    expect(weekdays).toEqual(["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]);
  });

  it("resolves shared field tokens in dark mode", () => {
    render(
      <MantineProvider forceColorScheme="dark" theme={budgetBoardDarkTheme}>
        <DateInput aria-label="Dark due date" />
      </MantineProvider>,
    );

    const input = screen.getByRole("textbox", { name: "Dark due date" });
    const root = input.closest(`.${classes.root}`);

    expect(root).toHaveAttribute("data-budget-board-color-scheme", "dark");
    expect(root?.style.getPropertyValue("--bbui-input-background")).toBe(
      "var(--bb-color-surface-input, #1c1e21)",
    );
  });
});
