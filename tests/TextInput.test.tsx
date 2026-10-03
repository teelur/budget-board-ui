import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TextInput } from "../src/TextInput/TextInput";
import classes from "../src/shared/inputStyles.module.css";
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
    const root = input.closest<HTMLElement>("[data-budget-board-color-scheme]");

    expect(input).toHaveValue("person@example.com");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("name", "email");
    expect(input).toHaveAttribute("autocomplete", "email");
    expect(input).toHaveAttribute("placeholder", "name@example.com");
    expect(input).toBeRequired();
    expect(input).toHaveClass(classes.input);
    expect(root).toHaveAttribute("data-budget-board-color-scheme", "light");
    expect(root?.style.getPropertyValue("--bbui-input-background")).toBe(
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
          style={{ paddingLeft: "2rem", paddingRight: "4rem" }}
        />
        <TextInput
          aria-label="Wrapper-styled input"
          wrapperProps={{
            "data-testid": "text-input-wrapper",
            style: { marginTop: "1rem", paddingLeft: "3rem" },
          }}
        />
      </>,
    );

    expect(screen.getByRole("textbox", { name: "Disabled" })).toBeDisabled();
    const readOnlyInput = screen.getByRole("textbox", { name: "Read only" });
    expect(readOnlyInput).toHaveAttribute("readonly");
    expect(readOnlyInput).toHaveClass("consumer-input");
    const root = readOnlyInput.closest<HTMLElement>(
      "[data-budget-board-color-scheme]",
    );
    const wrapper = screen.getByTestId("text-input-wrapper");
    expect(root?.style.paddingLeft).toBe("2rem");
    expect(root?.style.paddingRight).toBe("4rem");
    expect(wrapper.style.marginTop).toBe("1rem");
    expect(wrapper.style.paddingLeft).toBe("3rem");
    expect(wrapper.style.paddingRight).toBe("");
  });

  it("keeps the BBUI root class when wrapperProps has a className", () => {
    render(
      <>
        <TextInput
          aria-label="Wrapped name"
          wrapperProps={{ className: "consumer-wrapper" }}
        />
        <TextInput aria-label="Consumer class" className="consumer-root" />
      </>,
    );

    const input = screen.getByRole("textbox", { name: "Wrapped name" });
    const root = input.closest<HTMLElement>("[data-budget-board-color-scheme]");
    const consumerInput = screen.getByRole("textbox", {
      name: "Consumer class",
    });
    const consumerRoot = consumerInput.closest<HTMLElement>(
      "[data-budget-board-color-scheme]",
    );

    expect(root).toHaveClass(classes.root, "consumer-wrapper");
    expect(consumerRoot).toHaveClass(classes.root, "consumer-root");
  });

  it("merges BBUI classes with callback-based classNames", () => {
    render(
      <TextInput
        aria-label="Callback classes"
        classNames={() => ({ input: "callback-input" })}
      />,
    );

    expect(
      screen.getByRole("textbox", { name: "Callback classes" }),
    ).toHaveClass(classes.input, "callback-input");
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
    const pageRoot = pageInput.closest<HTMLElement>(
      "[data-budget-board-color-scheme]",
    );
    const cardRoot = cardInput.closest<HTMLElement>(
      "[data-budget-board-color-scheme]",
    );

    expect(pageRoot).toHaveAttribute("data-budget-board-color-scheme", "light");
    expect(cardRoot).toHaveAttribute("data-budget-board-color-scheme", "light");
    expect(pageRoot?.style.getPropertyValue("--bbui-input-background")).toBe(
      "var(--bb-color-surface-input, #e9eae8)",
    );
    expect(cardRoot?.style.getPropertyValue("--bbui-input-background")).toBe(
      "var(--bb-color-surface-input, #e9eae8)",
    );
  });

  it("uses the dark theme input surface fallback", () => {
    render(
      <MantineProvider forceColorScheme="dark" theme={budgetBoardDarkTheme}>
        <TextInput aria-label="Dark name" data-testid="dark-name" />
      </MantineProvider>,
    );

    const input = screen.getByTestId("dark-name");
    const root = input.closest<HTMLElement>("[data-budget-board-color-scheme]");

    expect(root).toHaveAttribute("data-budget-board-color-scheme", "dark");
    expect(root?.style.getPropertyValue("--bbui-input-background")).toBe(
      "var(--bb-color-surface-input, #1c1e21)",
    );
  });
});
