import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { DatePickerInput } from "../src/DatePickerInput/DatePickerInput";
import classes from "../src/shared/inputStyles.module.css";
import popoverClasses from "../src/shared/datePickerStyles.module.css";
import { budgetBoardDarkTheme } from "../src/theme";

describe("DatePickerInput", () => {
  it("renders an accessible picker trigger with BBUI field styling", () => {
    render(
      <>
        <DatePickerInput
          data-testid="date-picker-trigger"
          defaultValue="2025-06-15"
          label="Statement date"
          classNames={{ input: "consumer-date-picker" }}
          style={{ paddingLeft: "2rem", paddingRight: "4rem" }}
          valueFormat="YYYY-MM-DD"
        />
        <DatePickerInput
          aria-label="Wrapper-styled date picker"
          wrapperProps={{
            "data-testid": "date-picker-wrapper",
            style: { marginTop: "1rem", paddingLeft: "3rem" },
          }}
        />
      </>,
    );

    const trigger = screen.getByTestId("date-picker-trigger");
    const root = trigger.closest(`.${classes.root}`);

    expect(trigger).toHaveAttribute("type", "button");
    expect(trigger).toHaveTextContent("2025-06-15");
    expect(trigger).toHaveClass(classes.input, "consumer-date-picker");
    expect(root).toHaveAttribute("data-budget-board-color-scheme", "light");
    expect(root?.style.getPropertyValue("--bbui-input-background")).toBe(
      "var(--bb-color-surface-input, #e9eae8)",
    );
    const wrapper = screen.getByTestId("date-picker-wrapper");
    expect(root?.style.paddingLeft).toBe("2rem");
    expect(root?.style.paddingRight).toBe("4rem");
    expect(wrapper.style.marginTop).toBe("1rem");
    expect(wrapper.style.paddingLeft).toBe("3rem");
    expect(wrapper.style.paddingRight).toBe("");
  });

  it("opens the accessible calendar popover", async () => {
    const user = userEvent.setup();
    render(
      <DatePickerInput
        aria-label="Pick a date"
        data-testid="date-picker-trigger"
        defaultDate={new Date(2025, 5, 1)}
        valueFormat="YYYY-MM-DD"
      />,
    );

    const trigger = screen.getByTestId("date-picker-trigger");
    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("starts the calendar week on Sunday by default", async () => {
    const user = userEvent.setup();
    render(
      <DatePickerInput
        aria-label="Sunday-first date picker"
        defaultDate={new Date(2025, 5, 1)}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Sunday-first date picker" }),
    );
    await screen.findByRole("button", { name: "June 2025" });
    const weekdays = Array.from(
      document.querySelectorAll(".mantine-DatePickerInput-weekday"),
      (weekday) => weekday.textContent,
    );

    expect(weekdays).toEqual(["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]);
  });

  it("preserves an explicit first-day-of-week override", async () => {
    const user = userEvent.setup();
    render(
      <DatePickerInput
        aria-label="Monday-first date picker"
        defaultDate={new Date(2025, 5, 1)}
        firstDayOfWeek={1}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Monday-first date picker" }),
    );
    await screen.findByRole("button", { name: "June 2025" });
    const weekdays = Array.from(
      document.querySelectorAll(".mantine-DatePickerInput-weekday"),
      (weekday) => weekday.textContent,
    );

    expect(weekdays).toEqual(["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]);
  });

  it("applies the dark BBUI theme and preserves dropdown classes", async () => {
    const user = userEvent.setup();
    render(
      <MantineProvider forceColorScheme="dark" theme={budgetBoardDarkTheme}>
        <DatePickerInput
          aria-label="Dark date picker"
          defaultDate={new Date(2025, 5, 1)}
          popoverProps={{
            classNames: { dropdown: "consumer-picker-dropdown" },
            styles: () => ({ dropdown: { borderColor: "red" } }),
          }}
        />
      </MantineProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Dark date picker" }));
    const dropdown = await screen.findByRole("dialog");

    expect(dropdown).toHaveClass(
      popoverClasses.dropdown,
      "consumer-picker-dropdown",
    );
    expect(dropdown.style.getPropertyValue("--bbui-calendar-background")).toBe(
      "var(--bb-color-surface-elevated, #22252a)",
    );
    expect(
      dropdown.style.getPropertyValue("--bbui-calendar-range-foreground"),
    ).toBe("var(--bb-color-text-heading, #f2f0eb)");
    expect(dropdown.style.borderColor).toBe("red");
  });

  it("applies BBUI calendar styling to modal content", async () => {
    const user = userEvent.setup();
    render(
      <MantineProvider forceColorScheme="dark" theme={budgetBoardDarkTheme}>
        <DatePickerInput
          aria-label="Modal date picker"
          defaultDate={new Date(2025, 5, 1)}
          dropdownType="modal"
          modalProps={{
            classNames: { content: "consumer-picker-modal" },
            styles: { content: { borderColor: "red" } },
          }}
        />
      </MantineProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Modal date picker" }));
    const modalContent = await screen.findByRole("dialog");

    expect(modalContent).toHaveClass(
      popoverClasses.dropdown,
      "consumer-picker-modal",
    );
    expect(
      modalContent.style.getPropertyValue("--bbui-calendar-background"),
    ).toBe("var(--bb-color-surface-elevated, #22252a)");
    expect(modalContent.style.borderColor).toBe("red");
  });

  it("preserves the typed range value API", () => {
    const value: [string | null, string | null] = ["2025-06-01", "2025-06-05"];
    render(
      <DatePickerInput
        aria-label="Statement range"
        data-testid="date-range-trigger"
        type="range"
        value={value}
        valueFormat="YYYY-MM-DD"
      />,
    );

    const trigger = screen.getByTestId("date-range-trigger");
    expect(trigger).toHaveTextContent("2025-06-01");
    expect(trigger).toHaveTextContent("2025-06-05");
  });
});
