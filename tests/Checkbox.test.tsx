import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "../src/Checkbox/Checkbox";
import classes from "../src/Checkbox/Checkbox.module.css";
import { budgetBoardDarkTheme } from "../src/theme";

describe("Checkbox", () => {
  it("renders an accessible BBUI checkbox with its label", () => {
    render(<Checkbox label="Accept terms" name="terms" value="accepted" />);

    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" });

    expect(checkbox).toHaveAttribute("name", "terms");
    expect(checkbox).toHaveAttribute("value", "accepted");
    expect(checkbox).toHaveClass(classes.input);
    expect(checkbox.closest(".mantine-Checkbox-root")).toHaveStyle({
      "--checkbox-color": "var(--bb-color-primary, #4c6ef5)",
      "--checkbox-icon-color": "var(--bb-color-primary-content, #fffaf2)",
      "--bbui-checkbox-surface-input":
        "var(--bb-color-surface-input, #f2f3f1)",
      "--bbui-checkbox-border-subtle":
        "var(--bb-color-border-subtle, #d8d5ce)",
      "--bbui-checkbox-focus-ring": "var(--bb-color-focus-ring, #4c6ef5)",
      "--bbui-checkbox-surface-sunken":
        "var(--bb-color-surface-sunken, #ebe8df)",
      "--bbui-checkbox-text-primary":
        "var(--bb-color-text-primary, #3a3834)",
      "--bbui-checkbox-text-secondary":
        "var(--bb-color-text-secondary, #68645d)",
      "--bbui-checkbox-error": "var(--bb-color-error, #c92a2a)",
    });
  });

  it("supports uncontrolled and controlled changes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(
      <Checkbox defaultChecked label="Uncontrolled" onChange={onChange} />,
    );

    const uncontrolled = screen.getByRole("checkbox", {
      name: "Uncontrolled",
    });
    expect(uncontrolled).toBeChecked();
    await user.click(uncontrolled);
    expect(uncontrolled).not.toBeChecked();
    expect(onChange).toHaveBeenCalled();

    rerender(<Checkbox checked label="Controlled" onChange={onChange} />);
    const controlled = screen.getByRole("checkbox", { name: "Controlled" });
    await user.click(controlled);

    expect(controlled).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("forwards disabled and indeterminate states", () => {
    render(
      <>
        <Checkbox disabled label="Unavailable" />
        <Checkbox indeterminate label="Partially selected" />
      </>,
    );

    expect(
      screen.getByRole("checkbox", { name: "Unavailable" }),
    ).toBeDisabled();
    expect(
      screen.getByRole("checkbox", { name: "Partially selected" }),
    ).toHaveProperty("indeterminate", true);
  });

  it("preserves consumer classes and wrapper styles", () => {
    render(
      <Checkbox
        className="consumer-root"
        classNames={{ input: "consumer-input", label: "consumer-label" }}
        label="Styled checkbox"
        wrapperProps={{
          "data-testid": "checkbox-root",
          className: "consumer-wrapper",
          style: { marginTop: "1rem" },
        }}
      />,
    );

    const checkbox = screen.getByRole("checkbox", { name: "Styled checkbox" });
    const root = screen.getByTestId("checkbox-root");
    const label = screen.getByText("Styled checkbox");

    expect(checkbox).toHaveClass(classes.input, "consumer-input");
    expect(label).toHaveClass(classes.label, "consumer-label");
    expect(root).toHaveClass("consumer-root", "consumer-wrapper");
    expect(root.style.marginTop).toBe("1rem");
  });

  it("uses dark BBUI colors when rendered in the dark theme", () => {
    render(
      <MantineProvider forceColorScheme="dark" theme={budgetBoardDarkTheme}>
        <Checkbox label="Dark checkbox" />
      </MantineProvider>,
    );

    const checkbox = screen.getByRole("checkbox", { name: "Dark checkbox" });

    expect(checkbox.closest("[data-mantine-color-scheme='dark']")).toBeTruthy();
    expect(checkbox.closest(".mantine-Checkbox-root")).toHaveStyle({
      "--checkbox-color": "var(--bb-color-primary, #91a7ff)",
      "--checkbox-icon-color": "var(--bb-color-primary-content, #1e2450)",
      "--bbui-checkbox-surface-input":
        "var(--bb-color-surface-input, #1c1e21)",
      "--bbui-checkbox-border-subtle":
        "var(--bb-color-border-subtle, #3a3d42)",
      "--bbui-checkbox-focus-ring": "var(--bb-color-focus-ring, #91a7ff)",
      "--bbui-checkbox-surface-sunken":
        "var(--bb-color-surface-sunken, #0d0f12)",
      "--bbui-checkbox-text-primary":
        "var(--bb-color-text-primary, #d8d5ce)",
      "--bbui-checkbox-text-secondary":
        "var(--bb-color-text-secondary, #aaa69e)",
      "--bbui-checkbox-error": "var(--bb-color-error, #ff6b6b)",
    });
  });
});
