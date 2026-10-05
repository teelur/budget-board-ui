import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MultiSelect } from "../src/MultiSelect/MultiSelect";
import inputStylesClasses from "../src/shared/inputStyles.module.css";
import { budgetBoardDarkTheme } from "../src/theme";

describe("MultiSelect", () => {
  it("adds selected options", async () => {
    const user = userEvent.setup();
    render(
      <MultiSelect
        aria-label="Accounts"
        data={[{ value: "checking", label: "Checking" }]}
      />,
    );

    const input = screen.getByRole("combobox", { name: "Accounts" });
    await user.click(input);
    await user.click(
      await screen.findByRole("option", { hidden: true, name: "Checking" }),
    );

    expect(
      screen.getByText("Checking", { selector: ".mantine-Pill-label" }),
    ).toBeInTheDocument();
  });

  it("removes the last selected option with Backspace", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <MultiSelect
        aria-label="Accounts"
        data={[{ value: "checking", label: "Checking" }]}
        defaultValue={["checking"]}
        onChange={onChange}
        searchable
      />,
    );

    await user.click(screen.getByRole("combobox", { name: "Accounts" }));
    await user.keyboard("{Backspace}");

    expect(onChange).toHaveBeenCalledWith([]);
    expect(
      screen.queryByText("Checking", { selector: ".mantine-Pill-label" }),
    ).not.toBeInTheDocument();
  });

  it("supports Mantine selection limits with BBUI input styles", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <MultiSelect
        aria-label="Accounts"
        data={[
          { value: "checking", label: "Checking" },
          { value: "savings", label: "Savings" },
        ]}
        maxValues={1}
        onChange={onChange}
        searchable
      />,
    );

    const input = screen.getByRole("combobox", { name: "Accounts" });
    expect(input.closest(`.${inputStylesClasses.root}`)).toHaveStyle({
      "--bbui-input-background": "var(--bb-color-surface-input, #e9eae8)",
    });

    await user.click(input);
    await user.click(
      await screen.findByRole("option", { hidden: true, name: "Checking" }),
    );
    await user.click(
      await screen.findByRole("option", { hidden: true, name: "Savings" }),
    );

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(["checking"]);
  });

  it("supports Mantine's creatable option flow", async () => {
    const user = userEvent.setup();
    const onCreate = vi.fn((query: string) => ({
      value: `tag-${query}`,
      label: `Tag: ${query}`,
    }));
    const onChange = vi.fn();
    render(
      <MultiSelect
        aria-label="Tags"
        creatable
        data={[]}
        getCreateLabel={(query) => `Create ${query}`}
        onChange={onChange}
        onCreate={onCreate}
        searchable
      />,
    );

    const input = screen.getByRole("combobox", { name: "Tags" });
    await user.type(input, "home");
    await user.click(
      await screen.findByRole("option", { hidden: true, name: "Create home" }),
    );

    expect(onCreate).toHaveBeenCalledWith("home");
    expect(
      screen.getByText("Tag: home", { selector: ".mantine-Pill-label" }),
    ).toBeInTheDocument();
    expect(onChange).toHaveBeenCalledWith(["tag-home"]);
  });

  it("uses BBUI dropdown tokens in dark mode", async () => {
    const user = userEvent.setup();
    render(
      <MantineProvider forceColorScheme="dark" theme={budgetBoardDarkTheme}>
        <MultiSelect
          aria-label="Dark accounts"
          data={[{ value: "checking", label: "Checking" }]}
        />
      </MantineProvider>,
    );

    await user.click(screen.getByRole("combobox", { name: "Dark accounts" }));
    await screen.findByRole("option", { hidden: true, name: "Checking" });

    expect(document.querySelector(".mantine-MultiSelect-dropdown")).toHaveStyle(
      {
        "--bbui-combobox-background":
          "var(--bb-color-surface-elevated, #22252a)",
      },
    );
  });
});
