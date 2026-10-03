import { MantineProvider } from "@mantine/core";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Autocomplete } from "../src/Autocomplete/Autocomplete";
import classes from "../src/Autocomplete/Autocomplete.module.css";
import inputClasses from "../src/shared/inputStyles.module.css";
import { budgetBoardDarkTheme } from "../src/theme";

describe("Autocomplete", () => {
  it("filters and selects options with Mantine's input behavior", async () => {
    const user = userEvent.setup();
    render(
      <Autocomplete
        data={["Coffee shop", "Groceries"]}
        label="Merchant"
        placeholder="Search merchants"
      />,
    );

    const input = screen.getByRole("combobox", { name: "Merchant" });
    expect(input).toHaveClass(inputClasses.input);

    await user.type(input, "coffee");
    const option = screen.getByRole("option", {
      hidden: true,
      name: "Coffee shop",
    });

    expect(
      screen.queryByRole("option", { hidden: true, name: "Groceries" }),
    ).toBeNull();
    fireEvent.click(option);

    expect(input).toHaveValue("Coffee shop");
  });

  it("resolves class name callbacks with Autocomplete props", async () => {
    const user = userEvent.setup();
    render(
      <Autocomplete
        aria-label="Merchant"
        data={["Coffee shop"]}
        disabled={false}
        size="lg"
        classNames={(_theme, callbackProps) => {
          if (callbackProps.disabled !== false) {
            throw new Error("Autocomplete classNames received the wrong props");
          }

          return {
            dropdown: "large-dropdown",
            option:
              callbackProps.size === "lg" ? "large-option" : "small-option",
          };
        }}
      />,
    );

    const input = screen.getByRole("combobox", { name: "Merchant" });
    await user.type(input, "coffee");

    expect(document.querySelector(`.${classes.dropdown}`)).toHaveClass(
      "large-dropdown",
    );
    expect(
      screen.getByRole("option", { hidden: true, name: "Coffee shop" }),
    ).toHaveClass("large-option");
  });

  it("styles the dropdown for BBUI dark mode and preserves consumer overrides", async () => {
    const user = userEvent.setup();
    render(
      <MantineProvider forceColorScheme="dark" theme={budgetBoardDarkTheme}>
        <Autocomplete
          aria-label="Dark merchant"
          data={["Coffee shop"]}
          classNames={{
            dropdown: "consumer-dropdown",
            option: "consumer-option",
          }}
          comboboxProps={{
            classNames: { dropdown: "nested-dropdown" },
            styles: { dropdown: { borderWidth: "3px" } },
          }}
          styles={{ dropdown: { borderColor: "red" } }}
        />
      </MantineProvider>,
    );

    const input = screen.getByRole("combobox", { name: "Dark merchant" });
    await user.type(input, "coffee");
    const option = screen.getByRole("option", {
      hidden: true,
      name: "Coffee shop",
    });
    const dropdown = document.querySelector(`.${classes.dropdown}`);

    expect(dropdown).toHaveClass("consumer-dropdown", "nested-dropdown");
    expect(dropdown?.getAttribute("style")).toContain("border-color: red");
    expect(dropdown?.getAttribute("style")).toContain("border-width: 3px");
    expect(dropdown).toHaveStyle({
      "--bbui-autocomplete-background":
        "var(--bb-color-surface-elevated, #22252a)",
    });
    expect(option).toHaveClass(classes.option, "consumer-option");
  });
});
