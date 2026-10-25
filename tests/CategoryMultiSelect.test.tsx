import { MantineProvider, Modal } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  CategoryMultiSelect,
  type CategorySelectCategory,
} from "../src";
import categoryClasses from "../src/CategorySelect/CategorySelect.module.css";

const categories: CategorySelectCategory[] = [
  { value: "Utilities", parent: "Home" },
  { value: "Food", parent: "" },
  { value: "Home", parent: "" },
  { value: "Groceries", parent: "Food" },
];

describe("CategoryMultiSelect", () => {
  it("searches and selects multiple flat categories in CategorySelect order", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <CategoryMultiSelect
        aria-label="Categories"
        categories={categories}
        includeUncategorized
        onChange={onChange}
        uncategorizedLabel="Uncategorized"
        value={[]}
      />,
    );

    const input = screen.getByRole("combobox", { name: "Categories" });
    await user.click(input);

    expect(
      screen
        .getAllByRole("option", { hidden: true })
        .map((option) => option.textContent?.trim()),
    ).toEqual(["Food", "Groceries", "Home", "Utilities", "Uncategorized"]);
    expect(
      screen
        .getByRole("option", { hidden: true, name: "Groceries" })
        .querySelector(`.${categoryClasses.childLabel}`),
    ).toBeInTheDocument();

    await user.type(input, "util");
    await user.click(
      screen.getByRole("option", { hidden: true, name: "Utilities" }),
    );
    expect(onChange).toHaveBeenCalledWith(["Utilities"]);
  });

  it("supports nested option data and the localized Uncategorized option", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <MantineProvider>
        <CategoryMultiSelect
          aria-label="Categories"
          data={[
            {
              value: "Home",
              children: [{ value: "Utilities", label: "Power and water" }],
            },
          ]}
          includeUncategorized
          onChange={onChange}
          value={["uncategorized"]}
        />
      </MantineProvider>,
    );

    expect(screen.getAllByText("Uncategorized").length).toBeGreaterThan(0);

    const input = screen.getByRole("combobox", { name: "Categories" });
    await user.click(input);
    expect(
      screen.getByRole("option", {
        hidden: true,
        name: "Power and water",
      }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("option", {
        hidden: true,
        name: "Uncategorized",
      }),
    );
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it("shows checkmarks for selected options", async () => {
    const user = userEvent.setup();
    render(
      <CategoryMultiSelect
        aria-label="Categories"
        categories={categories}
        onChange={() => undefined}
        value={["Utilities"]}
      />,
    );

    await user.click(screen.getByRole("combobox", { name: "Categories" }));

    expect(
      screen
        .getByRole("option", { hidden: true, name: "Utilities" })
        .querySelector("svg"),
    ).toBeInTheDocument();
    expect(
      screen
        .getByRole("option", { hidden: true, name: "Food" })
        .querySelector("svg"),
    ).not.toBeInTheDocument();
  });

  it("portals the dropdown outside a modal to avoid clipping", async () => {
    const user = userEvent.setup();
    render(
      <MantineProvider>
        <Modal opened onClose={() => undefined} title="Settings">
          <CategoryMultiSelect
            aria-label="Categories"
            categories={categories}
          />
        </Modal>
      </MantineProvider>,
    );

    await user.click(screen.getByRole("combobox", { name: "Categories" }));
    const option = await screen.findByRole("option", {
      hidden: true,
      name: "Food",
    });

    expect(screen.getByRole("dialog")).not.toContainElement(option);
  });

  it("forwards disabled state", () => {
    render(
      <CategoryMultiSelect
        aria-label="Unavailable categories"
        categories={[]}
        disabled
      />,
    );

    expect(
      screen.getByRole("combobox", { name: "Unavailable categories" }),
    ).toBeDisabled();
  });
});
