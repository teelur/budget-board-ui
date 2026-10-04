import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CategorySelect } from "../src/CategorySelect/CategorySelect";
import categoryClasses from "../src/CategorySelect/CategorySelect.module.css";
import comboboxClasses from "../src/shared/comboboxStyles.module.css";
import { budgetBoardDarkTheme } from "../src/theme";

const categories = [
  {
    value: "Home",
    label: "Home",
    children: [{ value: "Utilities", label: "Utilities" }],
  },
  { value: "Food", label: "Food" },
];

describe("CategorySelect", () => {
  it("searches a hierarchy and selects a matching child", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <CategorySelect
        aria-label="Category"
        data={categories}
        onChange={onChange}
        value={null}
      />,
    );

    const input = screen.getByRole("button", { name: "Category" });
    await user.click(input);

    const parentOption = screen.getByRole("option", {
      hidden: true,
      name: "Home",
    });
    const childOption = screen.getByRole("option", {
      hidden: true,
      name: "Utilities",
    });
    expect(parentOption.style.paddingInlineStart).toBe("");
    expect(childOption.style.paddingInlineStart).toBe("");
    expect(
      screen.getByText("Home", { selector: `.${categoryClasses.parentLabel}` }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Utilities", {
        selector: `.${categoryClasses.childLabel}`,
      }),
    ).toBeInTheDocument();
    expect(document.querySelector(`.${comboboxClasses.dropdown}`)).toHaveStyle({
      "--bbui-combobox-secondary-foreground":
        "var(--bb-color-text-secondary, #68645d)",
    });

    await user.type(screen.getByPlaceholderText("Search categories"), "util");

    expect(
      screen.getByRole("option", { hidden: true, name: "Utilities" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("option", { hidden: true, name: "Home" }),
    ).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("option", { hidden: true, name: "Utilities" }),
    );
    expect(onChange).toHaveBeenCalledWith("Utilities");
  });

  it("clears the current selection when selected again", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <CategorySelect
        aria-label="Category"
        data={categories}
        onChange={onChange}
        value="Utilities"
      />,
    );

    await user.click(screen.getByRole("button", { name: "Category" }));
    await user.click(
      await screen.findByRole("option", { hidden: true, name: "Utilities" }),
    );

    expect(onChange).toHaveBeenCalledWith("");
  });

  it("forwards trigger clicks and does not open when read-only", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <CategorySelect
        aria-label="Read-only category"
        data={categories}
        onChange={() => undefined}
        onClick={onClick}
        readOnly
        value={null}
      />,
    );

    const trigger = screen.getByRole("button", { name: "Read-only category" });
    await user.click(trigger);

    expect(onClick).toHaveBeenCalledOnce();
    expect(
      screen.queryByRole("option", { name: "Food" }),
    ).not.toBeInTheDocument();
  });

  it("uses BBUI dropdown tokens in dark mode", async () => {
    const user = userEvent.setup();
    render(
      <MantineProvider forceColorScheme="dark" theme={budgetBoardDarkTheme}>
        <CategorySelect
          aria-label="Dark category"
          data={categories}
          onChange={() => undefined}
          value={null}
        />
      </MantineProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Dark category" }));
    await screen.findByRole("option", { hidden: true, name: "Food" });

    expect(document.querySelector(`.${comboboxClasses.dropdown}`)).toHaveStyle({
      "--bbui-combobox-background": "var(--bb-color-surface-elevated, #22252a)",
      "--bbui-combobox-secondary-foreground":
        "var(--bb-color-text-secondary, #aaa69e)",
    });
  });

  it("forwards disabled state", () => {
    render(
      <CategorySelect
        aria-label="Unavailable category"
        data={categories}
        disabled
        onChange={() => undefined}
        value={null}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Unavailable category" }),
    ).toBeDisabled();
  });
});
