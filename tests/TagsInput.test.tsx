import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TagsInput } from "../src/TagsInput/TagsInput";
import tagsInputClasses from "../src/TagsInput/TagsInput.module.css";
import inputStylesClasses from "../src/shared/inputStyles.module.css";
import { budgetBoardDarkTheme } from "../src/theme";

describe("TagsInput", () => {
  it("creates free-form tags and removes them with Backspace", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TagsInput aria-label="Tags" onChange={onChange} />);

    const input = screen.getByRole("combobox", { name: "Tags" });
    await user.type(input, "Home{Enter}");

    expect(
      screen.getByText("Home", { selector: ".mantine-Pill-label" }),
    ).toBeInTheDocument();
    expect(onChange).toHaveBeenLastCalledWith(["Home"]);

    await user.keyboard("{Backspace}");

    expect(
      screen.queryByText("Home", { selector: ".mantine-Pill-label" }),
    ).not.toBeInTheDocument();
    expect(onChange).toHaveBeenLastCalledWith([]);
  });

  it("adds a selected suggestion", async () => {
    const user = userEvent.setup();
    render(<TagsInput aria-label="Tags" data={["Food", "Home"]} />);

    const input = screen.getByRole("combobox", { name: "Tags" });
    await user.click(input);
    await user.click(
      await screen.findByRole("option", { hidden: true, name: "Food" }),
    );

    expect(
      screen.getByText("Food", { selector: ".mantine-Pill-label" }),
    ).toBeInTheDocument();
  });

  it("applies BBUI input and pill styles in light mode", () => {
    render(<TagsInput aria-label="Tags" defaultValue={["Home"]} />);

    const input = screen.getByRole("combobox", { name: "Tags" });
    const root = input.closest(`.${inputStylesClasses.root}`);
    const pill = screen
      .getByText("Home", { selector: ".mantine-Pill-label" })
      .closest(`.${tagsInputClasses.pill}`);

    expect(root).toHaveStyle({
      "--bbui-input-background": "var(--bb-color-surface-input, #e9eae8)",
      "--bbui-tags-pill-background":
        "var(--bb-color-surface-elevated, #fffcf7)",
    });
    expect(root).toHaveClass(tagsInputClasses.root);
    expect(input).toHaveClass(tagsInputClasses.inputField);
    expect(pill).toBeInTheDocument();
  });

  it("uses BBUI pill colors in dark mode", () => {
    render(
      <MantineProvider forceColorScheme="dark" theme={budgetBoardDarkTheme}>
        <TagsInput aria-label="Tags" defaultValue={["Home"]} />
      </MantineProvider>,
    );

    const input = screen.getByRole("combobox", { name: "Tags" });
    const root = input.closest(`.${inputStylesClasses.root}`);

    expect(root).toHaveStyle({
      "--bbui-tags-pill-background":
        "var(--bb-color-surface-elevated, #22252a)",
      "--bbui-tags-pill-border": "var(--bb-color-border-subtle, #3a3d42)",
    });
  });

  it("preserves consumer class names and styles", () => {
    render(
      <TagsInput
        aria-label="Tags"
        classNames={{ inputField: "custom-input", pill: "custom-pill" }}
        defaultValue={["Home"]}
        styles={{ pill: { opacity: 0.7 } }}
      />,
    );

    expect(screen.getByRole("combobox", { name: "Tags" })).toHaveClass(
      tagsInputClasses.inputField,
      "custom-input",
    );
    const pill = screen
      .getByText("Home", { selector: ".mantine-Pill-label" })
      .closest(`.${tagsInputClasses.pill}`);
    expect(pill).toHaveClass("custom-pill");
    expect(pill).toHaveStyle({ opacity: "0.7" });
  });
});
