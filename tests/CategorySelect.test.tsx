import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CategorySelect } from "../src/CategorySelect/CategorySelect";
import categoryClasses from "../src/CategorySelect/CategorySelect.module.css";
import comboboxClasses from "../src/shared/comboboxStyles.module.css";
import inputStylesClasses from "../src/shared/inputStyles.module.css";
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

  it("uses option values when labels are omitted", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <CategorySelect
        aria-label="Category"
        data={[{ value: "Home", children: [{ value: "Utilities" }] }]}
        onChange={onChange}
        value={null}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Category" }));
    await user.type(screen.getByPlaceholderText("Search categories"), "util");

    const option = screen.getByRole("option", {
      hidden: true,
      name: "Utilities",
    });
    expect(option).toBeInTheDocument();

    await user.click(option);
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

  it("accepts BB flat categories and uncategorized options", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const budgetBoardCategories = [
      { value: "Utilities", parent: "Home", categoryType: "expense" },
      { value: "Food", parent: "", categoryType: "expense" },
      { value: "Home", parent: "", categoryType: "expense" },
      { value: "Groceries", parent: "Food", categoryType: "expense" },
    ];

    render(
      <CategorySelect
        aria-label="Category"
        categories={budgetBoardCategories}
        includeUncategorized
        onChange={onChange}
        value="home"
      />,
    );

    const trigger = screen.getByRole("button", { name: "Category" });
    expect(trigger.closest(`.${inputStylesClasses.root}`)).toHaveStyle({
      "--bbui-input-background":
        "var(--bb-color-surface-input, #e9eae8)",
    });

    await user.click(trigger);

    expect(
      screen
        .getAllByRole("option", { hidden: true })
        .map((option) => option.textContent?.trim()),
    ).toEqual(["Food", "Groceries", "Home", "Utilities", "uncategorized"]);

    await user.click(
      screen.getByRole("option", { hidden: true, name: "uncategorized" }),
    );
    expect(onChange).toHaveBeenCalledWith("uncategorized");

    await user.click(trigger);
    await user.click(
      screen.getByRole("option", { hidden: true, name: "Home" }),
    );
    expect(onChange).toHaveBeenLastCalledWith("");
  });

  it("formats the selected uncategorized value like BB", () => {
    render(
      <CategorySelect
        aria-label="Category"
        categories={[]}
        includeUncategorized
        onChange={() => undefined}
        value="uncategorized"
      />,
    );

    expect(screen.getByRole("button", { name: "Category" })).toHaveTextContent(
      "Uncategorized",
    );
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
    expect(screen.getByPlaceholderText("Search categories")).toHaveClass(
      categoryClasses.searchInput,
    );
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
