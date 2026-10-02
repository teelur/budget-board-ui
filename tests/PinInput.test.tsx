import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PinInput } from "../src/PinInput/PinInput";
import classes from "../src/shared/inputStyles.module.css";
import { budgetBoardDarkTheme } from "../src/theme";

describe("PinInput", () => {
  it("renders accessible BBUI-styled cells and preserves consumer styling", () => {
    render(
      <PinInput
        ariaLabel="Verification code"
        className="consumer-root"
        classNames={{ input: "consumer-cell", root: "consumer-pin" }}
        data-testid="verification-code"
        length={6}
        style={[
          { marginTop: "12px" },
          (theme) => ({ marginBottom: theme.spacing.xs }),
        ]}
      />,
    );

    const root = screen.getByTestId("verification-code");
    const cells = screen.getAllByRole("textbox", {
      name: "Verification code",
    });

    expect(cells).toHaveLength(6);
    expect(root).toHaveClass(classes.root, "consumer-root", "consumer-pin");
    expect(cells[0]).toHaveClass(classes.input, "consumer-cell");
    expect(root).toHaveAttribute("data-budget-board-color-scheme", "light");
    expect(root.style.getPropertyValue("--bbui-input-background")).toBe(
      "var(--bb-color-surface-input, #e9eae8)",
    );
    expect(root.style.marginTop).toBe("12px");
    expect(root.style.marginBottom).not.toBe("");
  });

  it("preserves numeric entry and completion behavior", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onComplete = vi.fn();
    render(
      <PinInput
        ariaLabel="Numeric code"
        length={4}
        onChange={onChange}
        onComplete={onComplete}
        type="number"
      />,
    );

    const cells = screen.getAllByRole("textbox", { name: "Numeric code" });
    for (const [index, cell] of cells.entries()) {
      await user.type(cell, String(index + 1));
    }

    expect(onChange).toHaveBeenLastCalledWith("1234");
    expect(onComplete).toHaveBeenCalledWith("1234");
  });

  it("resolves shared field tokens in dark mode", () => {
    render(
      <MantineProvider forceColorScheme="dark" theme={budgetBoardDarkTheme}>
        <PinInput ariaLabel="Dark verification code" data-testid="dark-pin" />
      </MantineProvider>,
    );

    const root = screen.getByTestId("dark-pin");

    expect(root).toHaveAttribute("data-budget-board-color-scheme", "dark");
    expect(root.style.getPropertyValue("--bbui-input-background")).toBe(
      "var(--bb-color-surface-input, #1c1e21)",
    );
    expect(screen.getAllByRole("textbox", { name: "Dark verification code" }))
      .toHaveLength(4);
  });
});