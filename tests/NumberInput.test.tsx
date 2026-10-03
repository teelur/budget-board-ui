import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { NumberInput } from "../src/NumberInput/NumberInput";
import classes from "../src/shared/inputStyles.module.css";
import componentClasses from "../src/NumberInput/NumberInput.module.css";
import { budgetBoardDarkTheme } from "../src/theme";

describe("NumberInput", () => {
  it("renders an accessible Mantine number input with BBUI styling", () => {
    render(
      <NumberInput
        data-testid="amount-root"
        defaultValue={25}
        label="Amount"
        name="amount"
        required
      />,
    );

    const input = screen.getByRole("textbox", { name: "Amount" });

    expect(input).toHaveValue("25");
    expect(input).toHaveAttribute("name", "amount");
    expect(input).toBeRequired();
    const root = input.parentElement?.parentElement;
    expect(root).toHaveAttribute("data-budget-board-color-scheme", "light");
    expect(input).toHaveClass(classes.input);
    expect(root?.style.getPropertyValue("--bbui-input-background")).toBe(
      "var(--bb-color-surface-input, #e9eae8)",
    );
    expect(root?.style.getPropertyValue("--bbui-input-control-hover")).toBe(
      "var(--bb-color-surface-elevated, #fffcf7)",
    );
    expect(
      input.parentElement?.querySelector("button.mantine-NumberInput-control"),
    ).toHaveClass(componentClasses.control);
  });

  it("preserves controlled change and keyboard step behavior", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(
      <NumberInput
        aria-label="Amount"
        max={12}
        min={10}
        onChange={onChange}
        value={10}
      />,
    );

    const input = screen.getByRole("textbox", { name: "Amount" });
    await user.click(input);
    await user.keyboard("{ArrowUp}");

    expect(onChange).toHaveBeenLastCalledWith(11);
    expect(input).toHaveValue("10");

    rerender(
      <NumberInput
        aria-label="Amount"
        max={12}
        min={10}
        onChange={onChange}
        value={11}
      />,
    );

    expect(screen.getByRole("textbox", { name: "Amount" })).toHaveValue("11");
  });

  it("supports uncontrolled values and min/max constraints", async () => {
    const user = userEvent.setup();
    render(
      <NumberInput aria-label="Amount" defaultValue={11} max={12} min={10} />,
    );

    const input = screen.getByRole("textbox", { name: "Amount" });
    await user.click(input);
    await user.keyboard("{ArrowUp}{ArrowUp}");

    expect(input).toHaveValue("12");
  });

  it("forwards disabled, read-only, and custom class props", () => {
    render(
      <>
        <NumberInput aria-label="Disabled" disabled />
        <NumberInput
          aria-label="Read only"
          classNames={{ input: "consumer-input" }}
          readOnly
          style={{ paddingLeft: "2rem", paddingRight: "4rem" }}
        />
        <NumberInput
          aria-label="Wrapper-styled amount"
          wrapperProps={{
            "data-testid": "number-input-wrapper",
            style: { marginTop: "1rem", paddingLeft: "3rem" },
          }}
        />
      </>,
    );

    expect(screen.getByRole("textbox", { name: "Disabled" })).toBeDisabled();
    expect(screen.getByRole("textbox", { name: "Read only" })).toHaveAttribute(
      "readonly",
    );
    expect(screen.getByRole("textbox", { name: "Read only" })).toHaveClass(
      "consumer-input",
    );
    const readOnlyInput = screen.getByRole("textbox", { name: "Read only" });
    const root = readOnlyInput.parentElement?.parentElement;
    const wrapper = screen.getByTestId("number-input-wrapper");
    expect(root?.style.paddingLeft).toBe("2rem");
    expect(root?.style.paddingRight).toBe("4rem");
    expect(wrapper.style.marginTop).toBe("1rem");
    expect(wrapper.style.paddingLeft).toBe("3rem");
    expect(wrapper.style.paddingRight).toBe("");
  });

  it("keeps BBUI root classes when wrapperProps provides a class", () => {
    render(
      <NumberInput
        aria-label="Amount"
        className="consumer-root"
        wrapperProps={{ className: "consumer-wrapper" }}
      />,
    );

    const root = screen.getByRole("textbox", { name: "Amount" }).parentElement
      ?.parentElement;

    expect(root).toHaveClass(
      classes.root,
      componentClasses.root,
      "consumer-wrapper",
    );
  });

  it("uses the same explicit fill on different parent surfaces", () => {
    render(
      <>
        <div style={{ backgroundColor: "#f7f6f2" }}>
          <NumberInput aria-label="Page amount" data-testid="page-amount" />
        </div>
        <div style={{ backgroundColor: "#fffcf7" }}>
          <NumberInput aria-label="Card amount" data-testid="card-amount" />
        </div>
      </>,
    );

    const pageInput = screen.getByTestId("page-amount");
    const cardInput = screen.getByTestId("card-amount");
    const pageRoot = pageInput.parentElement?.parentElement;
    const cardRoot = cardInput.parentElement?.parentElement;

    expect(pageInput).toHaveClass(classes.input);
    expect(cardInput).toHaveClass(classes.input);
    expect(pageRoot).toHaveAttribute("data-budget-board-color-scheme", "light");
    expect(cardRoot).toHaveAttribute("data-budget-board-color-scheme", "light");
    expect(pageRoot?.style.getPropertyValue("--bbui-input-background")).toBe(
      "var(--bb-color-surface-input, #e9eae8)",
    );
    expect(cardRoot?.style.getPropertyValue("--bbui-input-background")).toBe(
      "var(--bb-color-surface-input, #e9eae8)",
    );
  });

  it("resolves the surface fallback in dark mode", () => {
    render(
      <MantineProvider forceColorScheme="dark" theme={budgetBoardDarkTheme}>
        <NumberInput aria-label="Dark amount" data-testid="dark-amount" />
      </MantineProvider>,
    );

    const darkInput = screen.getByTestId("dark-amount");
    const darkRoot = darkInput.parentElement?.parentElement;
    expect(darkRoot).toHaveAttribute("data-budget-board-color-scheme", "dark");
    expect(screen.getByTestId("dark-amount")).toHaveClass(classes.input);
    expect(darkRoot?.style.getPropertyValue("--bbui-input-background")).toBe(
      "var(--bb-color-surface-input, #1c1e21)",
    );
  });
});
