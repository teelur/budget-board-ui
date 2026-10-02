import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Textarea } from "../src/Textarea/Textarea";
import classes from "../src/Textarea/Textarea.module.css";
import { budgetBoardDarkTheme } from "../src/theme";

describe("Textarea", () => {
  it("renders an accessible multiline field with Mantine row options", () => {
    render(
      <Textarea
        defaultValue="Rent and utilities"
        label="Transaction note"
        maxLength={240}
        name="note"
        placeholder="Add details"
        resize="vertical"
        rows={4}
      />,
    );

    const textarea = screen.getByRole("textbox", { name: "Transaction note" });
    const root = textarea.parentElement?.parentElement;

    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea).toHaveValue("Rent and utilities");
    expect(textarea).toHaveAttribute("name", "note");
    expect(textarea).toHaveAttribute("maxlength", "240");
    expect(textarea).toHaveAttribute("placeholder", "Add details");
    expect(textarea).toHaveAttribute("rows", "4");
    expect(textarea).toHaveClass(classes.input);
    expect(root).toHaveAttribute("data-budget-board-color-scheme", "light");
    expect(root?.style.getPropertyValue("--bbui-textarea-background")).toBe(
      "var(--bb-color-surface-input, #e9eae8)",
    );
  });

  it("preserves controlled multiline changes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(
      <Textarea aria-label="Note" onChange={onChange} value="Initial note" />,
    );

    const textarea = screen.getByRole("textbox", { name: "Note" });
    await user.clear(textarea);
    await user.type(textarea, "Updated note");

    expect(onChange).toHaveBeenCalled();
    expect(textarea).toHaveValue("Initial note");

    rerender(
      <Textarea aria-label="Note" onChange={onChange} value="Updated note" />,
    );
    expect(textarea).toHaveValue("Updated note");
  });

  it("supports uncontrolled multiline changes", async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="Uncontrolled note" defaultValue="Starting" />);

    const textarea = screen.getByRole("textbox", { name: "Uncontrolled note" });
    await user.clear(textarea);
    await user.type(textarea, "Changed");

    expect(textarea).toHaveValue("Changed");
  });

  it("forwards disabled, read-only, custom classes, and wrapper styles", () => {
    render(
      <>
        <Textarea aria-label="Disabled note" disabled />
        <Textarea
          aria-label="Read only note"
          classNames={{ input: "consumer-textarea" }}
          readOnly
          wrapperProps={{ style: { marginTop: "1rem" } }}
        />
      </>,
    );

    expect(
      screen.getByRole("textbox", { name: "Disabled note" }),
    ).toBeDisabled();
    const readOnlyTextarea = screen.getByRole("textbox", {
      name: "Read only note",
    });
    expect(readOnlyTextarea).toHaveAttribute("readonly");
    expect(readOnlyTextarea).toHaveClass("consumer-textarea");
    expect(
      readOnlyTextarea.parentElement?.parentElement?.style.getPropertyValue(
        "margin-top",
      ),
    ).toBe("1rem");
  });

  it("uses the same explicit fill on page and card surfaces", () => {
    render(
      <>
        <div style={{ backgroundColor: "#f7f6f2" }}>
          <Textarea aria-label="Page note" data-testid="page-note" />
        </div>
        <div style={{ backgroundColor: "#fffcf7" }}>
          <Textarea aria-label="Card note" data-testid="card-note" />
        </div>
      </>,
    );

    const pageTextarea = screen.getByTestId("page-note");
    const cardTextarea = screen.getByTestId("card-note");
    const pageRoot = pageTextarea.parentElement?.parentElement;
    const cardRoot = cardTextarea.parentElement?.parentElement;

    expect(pageRoot?.style.getPropertyValue("--bbui-textarea-background")).toBe(
      "var(--bb-color-surface-input, #e9eae8)",
    );
    expect(cardRoot?.style.getPropertyValue("--bbui-textarea-background")).toBe(
      "var(--bb-color-surface-input, #e9eae8)",
    );
  });

  it("uses the dark theme input surface fallback", () => {
    render(
      <MantineProvider forceColorScheme="dark" theme={budgetBoardDarkTheme}>
        <Textarea aria-label="Dark note" data-testid="dark-note" />
      </MantineProvider>,
    );

    const textarea = screen.getByTestId("dark-note");
    const root = textarea.parentElement?.parentElement;

    expect(root).toHaveAttribute("data-budget-board-color-scheme", "dark");
    expect(root?.style.getPropertyValue("--bbui-textarea-background")).toBe(
      "var(--bb-color-surface-input, #1c1e21)",
    );
  });
});
