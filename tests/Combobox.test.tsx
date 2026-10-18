import { MantineProvider } from "@mantine/core";
import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Combobox, useCombobox } from "../src/Combobox/Combobox";
import type { ComboboxProps } from "../src/Combobox/Combobox";
import { TextInput } from "../src/TextInput/TextInput";
import classes from "../src/shared/comboboxStyles.module.css";
import { budgetBoardDarkTheme } from "../src/theme";

function ComboboxHarness(
  props: Pick<ComboboxProps, "classNames" | "styles"> = {},
) {
  const store = useCombobox();
  const [submitted, setSubmitted] = useState("");

  return (
    <>
      <Combobox
        onOptionSubmit={(value) => setSubmitted(value)}
        store={store}
        withinPortal={false}
        {...props}
      >
        <Combobox.Target>
          <TextInput
            aria-label="Formula"
            placeholder="Enter a formula"
            onClick={() => store.openDropdown()}
            onFocus={() => store.openDropdown()}
          />
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Options>
            <Combobox.Option value="sum">Sum</Combobox.Option>
            <Combobox.Option value="count">Count</Combobox.Option>
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
      <output>{submitted}</output>
    </>
  );
}

describe("Combobox", () => {
  it("uses BBUI dropdown and option styles while preserving Mantine interactions", async () => {
    const user = userEvent.setup();
    render(<ComboboxHarness />);

    const input = screen.getByRole("textbox", { name: "Formula" });
    await user.click(input);
    expect(input).toHaveAttribute("data-expanded", "true");

    const dropdown = document.querySelector(`.${classes.dropdown}`);
    const option = await screen.findByRole("option", {
      hidden: true,
      name: "Sum",
    });

    expect(dropdown).toHaveClass(classes.dropdown);
    expect(dropdown?.style.backgroundColor).toBe(
      "var(--bbui-combobox-background)",
    );
    expect(option).toHaveClass(classes.option);

    await user.click(option);

    expect(screen.getByText("sum")).toBeInTheDocument();
  });

  it("preserves consumer class and style overrides in dark mode", async () => {
    const user = userEvent.setup();
    render(
      <MantineProvider forceColorScheme="dark" theme={budgetBoardDarkTheme}>
        <ComboboxHarness
          classNames={{
            dropdown: "consumer-dropdown",
            option: "consumer-option",
          }}
          styles={{ dropdown: { borderColor: "red", borderWidth: "3px" } }}
        />
      </MantineProvider>,
    );

    const input = screen.getByRole("textbox", { name: "Formula" });
    await user.click(input);
    expect(input).toHaveAttribute("data-expanded", "true");

    const dropdown = document.querySelector(".consumer-dropdown");
    const option = await screen.findByRole("option", {
      hidden: true,
      name: "Sum",
    });

    expect(dropdown).toHaveClass(
      classes.dropdown,
      "consumer-dropdown",
    );
    expect(dropdown?.getAttribute("style")).toContain("border-color: red");
    expect(dropdown?.getAttribute("style")).toContain("border-width: 3px");
    expect(dropdown?.style.backgroundColor).toBe(
      "var(--bbui-combobox-background)",
    );
    expect(
      dropdown?.style.getPropertyValue("--bbui-combobox-background"),
    ).toBe("var(--bb-color-surface-elevated, #22252a)");
    expect(dropdown?.style.getPropertyValue("--bbui-combobox-selected")).toBe(
      "var(--bb-color-selection, #414b85)",
    );
    expect(option).toHaveClass(classes.option, "consumer-option");
  });
});
