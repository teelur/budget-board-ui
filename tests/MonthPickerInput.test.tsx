import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MonthPickerInput } from "../src/MonthPickerInput/MonthPickerInput";
import popoverClasses from "../src/shared/datePickerStyles.module.css";
import classes from "../src/shared/inputStyles.module.css";

describe("MonthPickerInput", () => {
  it("applies BBUI field styling and selects a month", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <MonthPickerInput
        aria-label="Pick a month"
        data-testid="month-picker-trigger"
        defaultDate={new Date(2025, 5, 1)}
        onChange={onChange}
        valueFormat="MMMM YYYY"
      />,
    );

    const trigger = screen.getByTestId("month-picker-trigger");
    expect(trigger).toHaveClass(classes.input);
    expect(trigger.closest(`.${classes.root}`)).toHaveAttribute(
      "data-budget-board-color-scheme",
      "light",
    );

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    const selectedMonth = await screen.findByRole("button", { name: "Jun" });
    const dropdown = await screen.findByRole("dialog");
    expect(dropdown).toHaveClass(popoverClasses.dropdown);
    expect(dropdown.style.getPropertyValue("--bbui-calendar-primary")).toBe(
      "var(--bb-color-primary, #4c6ef5)",
    );
    expect(selectedMonth).toHaveClass("mantine-MonthPickerInput-pickerControl");
    await user.click(selectedMonth);

    expect(onChange).toHaveBeenCalled();
  });
});
