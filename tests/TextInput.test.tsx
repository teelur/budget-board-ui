import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TextInput } from "../src/TextInput/TextInput";
import classes from "../src/TextInput/TextInput.module.css";
import { budgetBoardDarkTheme } from "../src/theme";

describe("TextInput", () => {
  it("renders an accessible, styled native text input", () => {
    render(
      <TextInput
        autoComplete="email"
        defaultValue="person@example.com"
        label="Email address"
        name="email"
        placeholder="name@example.com"
        required
        type="email"
      />,
    );

    const input = screen.getByRole("textbox", { name: "Email address" });
    const root = input.parentElement?.parentElement;

    expect(input).toHaveValue("person@example.com");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("name", "email");
    expect(input).toHaveAttribute("autocomplete", "email");
    expect(input).toHaveAttribute("placeholder", "name@example.com");
    expect(input).toBeRequired();
    expect(input).toHaveClass(classes.input);
    expect(root).toHaveAttribute("data-budget-board-color-scheme", "light");
    expect(root?.style.getPropertyValue("--bbui-text-input-background")).toBe(
      "var(--bb-color-surface-input, #e9eae8)",
    );
  });

  it("preserves controlled native input changes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(
      <TextInput aria-label="Name" onChange={onChange} value="Ada" />,
    );

    const input = screen.getByRole("textbox", { name: "Name" });
    await user.clear(input);
    await user.type(input, "Lin");

    expect(onChange).toHaveBeenCalled();
    expect(input).toHaveValue("Ada");

    rerender(<TextInput aria-label="Name" onChange={onChange} value="Lin" />);

    expect(input).toHaveValue("Lin");
  });

  it("forwards disabled, read-only, custom classes, and wrapper styles", () => {
    render(
      <>
        <TextInput aria-label="Disabled" disabled />
        <TextInput
          aria-label="Read only"
          classNames={{ input: "consumer-input" }}
          readOnly
          wrapperProps={{ style: { marginTop: "1rem" } }}
        />
      </>,
    );

    expect(screen.getByRole("textbox", { name: "Disabled" })).toBeDisabled();
    const readOnlyInput = screen.getByRole("textbox", { name: "Read only" });
    expect(readOnlyInput).toHaveAttribute("readonly");
    expect(readOnlyInput).toHaveClass("consumer-input");
    expect(
      readOnlyInput.parentElement?.parentElement?.style.getPropertyValue(
        "margin-top",
      ),
    ).toBe("1rem");
  });

  it("uses the same explicit fill on page and card surfaces", () => {
    render(
      <>
        <div style={{ backgroundColor: "#f7f6f2" }}>
          <TextInput aria-label="Page name" data-testid="page-name" />
        </div>
        <div style={{ backgroundColor: "#fffcf7" }}>
          <TextInput aria-label="Card name" data-testid="card-name" />
        </div>
      </>,
    );

    const pageInput = screen.getByTestId("page-name");
    const cardInput = screen.getByTestId("card-name");
    const pageRoot = pageInput.parentElement?.parentElement;
    const cardRoot = cardInput.parentElement?.parentElement;

    expect(pageRoot).toHaveAttribute("data-budget-board-color-scheme", "light");
    expect(cardRoot).toHaveAttribute("data-budget-board-color-scheme", "light");
    expect(
      pageRoot?.style.getPropertyValue("--bbui-text-input-background"),
    ).toBe("var(--bb-color-surface-input, #e9eae8)");
    expect(
      cardRoot?.style.getPropertyValue("--bbui-text-input-background"),
    ).toBe("var(--bb-color-surface-input, #e9eae8)");
  });

  it("uses the dark theme input surface fallback", () => {
    render(
      <MantineProvider forceColorScheme="dark" theme={budgetBoardDarkTheme}>
        <TextInput aria-label="Dark name" data-testid="dark-name" />
      </MantineProvider>,
    );

    const input = screen.getByTestId("dark-name");
    const root = input.parentElement?.parentElement;

    expect(root).toHaveAttribute("data-budget-board-color-scheme", "dark");
    expect(root?.style.getPropertyValue("--bbui-text-input-background")).toBe(
      "var(--bb-color-surface-input, #1c1e21)",
    );
  });
});