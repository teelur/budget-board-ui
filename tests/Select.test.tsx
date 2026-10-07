import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Select } from "../src/Select/Select";
import inputClasses from "../src/shared/inputStyles.module.css";
import { budgetBoardDarkTheme } from "../src/theme";

describe("Select", () => {
  it("renders a themed combobox and selects an option", async () => {
    const user = userEvent.setup();
    render(
      <Select
        data={[
          { value: "checking", label: "Checking" },
          { value: "savings", label: "Savings" },
        ]}
        label="Account type"
        placeholder="Choose an account type"
      />,
    );

    const input = screen.getByRole("combobox", { name: "Account type" });
    expect(input).toHaveClass(inputClasses.input);

    await user.click(input);
    await user.click(
      await screen.findByRole("option", { hidden: true, name: "Checking" }),
    );

    expect(input).toHaveValue("Checking");
  });

  it("preserves component and combobox overrides in dark mode", async () => {
    const user = userEvent.setup();
    render(
      <MantineProvider forceColorScheme="dark" theme={budgetBoardDarkTheme}>
        <Select
          aria-label="Dark account type"
          classNames={{
            dropdown: "consumer-dropdown",
            option: "consumer-option",
          }}
          comboboxProps={{
            classNames: { dropdown: "nested-dropdown" },
            styles: { dropdown: { borderWidth: "3px" } },
          }}
          data={[{ value: "checking", label: "Checking" }]}
          styles={{ dropdown: { borderColor: "red" } }}
        />
      </MantineProvider>,
    );

    const input = screen.getByRole("combobox", { name: "Dark account type" });
    await user.click(input);

    const option = await screen.findByRole("option", {
      hidden: true,
      name: "Checking",
    });
    const dropdown = document.querySelector(".consumer-dropdown");

    expect(dropdown).toHaveClass("consumer-dropdown", "nested-dropdown");
    expect(option).toHaveClass("consumer-option");
    expect(dropdown?.getAttribute("style")).toContain("border-color: red");
    expect(dropdown?.getAttribute("style")).toContain("border-width: 3px");
    expect(dropdown?.style.backgroundColor).toBe(
      "var(--bbui-combobox-background)",
    );
    expect(dropdown).toHaveStyle({
      "--bbui-combobox-background": "var(--bb-color-surface-elevated, #22252a)",
      "--bbui-combobox-hover": "var(--bb-color-surface-hover, #34373a)",
      "--bbui-combobox-selected": "var(--bb-color-selection, #414b85)",
    });
  });

  it("forwards disabled state", () => {
    render(<Select aria-label="Unavailable" data={[]} disabled />);

    expect(
      screen.getByRole("combobox", { name: "Unavailable" }),
    ).toBeDisabled();
  });
});
