import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PasswordInput } from "../src/PasswordInput/PasswordInput";
import classes from "../src/shared/inputStyles.module.css";
import componentClasses from "../src/PasswordInput/PasswordInput.module.css";
import { budgetBoardDarkTheme } from "../src/theme";

describe("PasswordInput", () => {
  it("renders an accessible password field with BBUI styling", () => {
    render(
      <PasswordInput
        autoComplete="current-password"
        defaultValue="correct-horse"
        label="Password"
        name="password"
        required
      />,
    );

    const input = screen.getByDisplayValue("correct-horse");
    const root = input.parentElement?.parentElement?.parentElement;

    expect(screen.getByText("Password").closest("label")).toHaveAttribute(
      "for",
      input.id,
    );
    expect(input).toHaveAttribute("type", "password");
    expect(input).toHaveAttribute("name", "password");
    expect(input).toHaveAttribute("autocomplete", "current-password");
    expect(input).toBeRequired();
    expect(input).toHaveValue("correct-horse");
    expect(root).toHaveAttribute("data-budget-board-color-scheme", "light");
    expect(
      root?.style.getPropertyValue("--bbui-input-background"),
    ).toBe("var(--bb-color-surface-input, #e9eae8)");
    expect(input.parentElement).toHaveClass(classes.input);
    expect(input).toHaveClass(componentClasses.innerInput);
    expect(
      screen.getByRole("button", { name: "Toggle password visibility" }),
    ).toHaveClass(componentClasses.visibilityToggle);
  });

  it("toggles password visibility and reports visibility changes", async () => {
    const user = userEvent.setup();
    const onVisibilityChange = vi.fn();
    render(
      <PasswordInput
        aria-label="Account password"
        defaultValue="secret"
        onVisibilityChange={onVisibilityChange}
      />,
    );

    const input = screen.getByLabelText("Account password");
    const toggle = screen.getByRole("button", {
      name: "Toggle password visibility",
    });

    expect(input).toHaveAttribute("type", "password");
    expect(toggle).toHaveAttribute("aria-pressed", "false");

    await user.click(toggle);

    expect(input).toHaveAttribute("type", "text");
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(onVisibilityChange).toHaveBeenLastCalledWith(true);

    await user.click(toggle);

    expect(input).toHaveAttribute("type", "password");
    expect(onVisibilityChange).toHaveBeenLastCalledWith(false);
  });

  it("supports controlled visibility and keyboard-focusable toggles", async () => {
    const user = userEvent.setup();
    const onVisibilityChange = vi.fn();
    const { rerender } = render(
      <PasswordInput
        aria-label="Controlled password"
        onVisibilityChange={onVisibilityChange}
        visibilityToggleFocusable
        visible={false}
      />,
    );

    const input = screen.getByLabelText("Controlled password");
    const toggle = screen.getByRole("button", {
      name: "Toggle password visibility",
    });

    expect(toggle).toHaveAttribute("tabindex", "0");
    await user.click(toggle);
    expect(onVisibilityChange).toHaveBeenCalledWith(true);
    expect(input).toHaveAttribute("type", "password");

    rerender(
      <PasswordInput
        aria-label="Controlled password"
        onVisibilityChange={onVisibilityChange}
        visibilityToggleFocusable
        visible
      />,
    );

    expect(input).toHaveAttribute("type", "text");
  });

  it("forwards disabled state, custom classes, and wrapper styles", () => {
    render(
      <>
        <PasswordInput aria-label="Disabled password" disabled />
        <PasswordInput
          aria-label="Read only password"
          classNames={{ innerInput: "consumer-password" }}
          readOnly
          wrapperProps={{ style: { marginTop: "1rem" } }}
        />
      </>,
    );

    expect(screen.getByLabelText("Disabled password")).toBeDisabled();
    const readOnlyInput = screen.getByLabelText("Read only password");
    expect(readOnlyInput).toHaveAttribute("readonly");
    expect(readOnlyInput).toHaveClass("consumer-password");
    expect(
      readOnlyInput.parentElement?.parentElement?.parentElement?.style.getPropertyValue(
        "margin-top",
      ),
    ).toBe("1rem");
  });

  it("uses the same explicit fill on page and card surfaces", () => {
    render(
      <>
        <div style={{ backgroundColor: "#f7f6f2" }}>
          <PasswordInput
            aria-label="Page password"
            data-testid="page-password"
          />
        </div>
        <div style={{ backgroundColor: "#fffcf7" }}>
          <PasswordInput
            aria-label="Card password"
            data-testid="card-password"
          />
        </div>
      </>,
    );

    const pageInput = screen.getByTestId("page-password");
    const cardInput = screen.getByTestId("card-password");
    const pageRoot = pageInput.parentElement?.parentElement?.parentElement;
    const cardRoot = cardInput.parentElement?.parentElement?.parentElement;

    expect(
      pageRoot?.style.getPropertyValue("--bbui-input-background"),
    ).toBe("var(--bb-color-surface-input, #e9eae8)");
    expect(
      cardRoot?.style.getPropertyValue("--bbui-input-background"),
    ).toBe("var(--bb-color-surface-input, #e9eae8)");
  });

  it("uses the dark theme input surface fallback", () => {
    render(
      <MantineProvider forceColorScheme="dark" theme={budgetBoardDarkTheme}>
        <PasswordInput aria-label="Dark password" data-testid="dark-password" />
      </MantineProvider>,
    );

    const input = screen.getByTestId("dark-password");
    const root = input.parentElement?.parentElement?.parentElement;

    expect(root).toHaveAttribute("data-budget-board-color-scheme", "dark");
    expect(
      root?.style.getPropertyValue("--bbui-input-background"),
    ).toBe("var(--bb-color-surface-input, #1c1e21)");
  });
});
