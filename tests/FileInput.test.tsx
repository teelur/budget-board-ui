import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FileInput } from "../src/FileInput/FileInput";
import classes from "../src/shared/inputStyles.module.css";
import { budgetBoardDarkTheme } from "../src/theme";

describe("FileInput", () => {
  it("renders a styled file picker and forwards native file attributes", () => {
    const { container } = render(
      <FileInput
        accept="application/pdf"
        aria-label="Upload statement"
        classNames={{ input: "consumer-input" }}
        name="statement"
        placeholder="Choose a PDF"
      />,
    );

    const trigger = screen.getByRole("button", { name: "Upload statement" });
    const nativeInput =
      container.querySelector<HTMLInputElement>('input[type="file"]');
    const root = trigger.closest<HTMLElement>(
      "[data-budget-board-color-scheme]",
    );

    expect(trigger).toHaveClass(classes.input, "consumer-input");
    expect(trigger).toHaveTextContent("Choose a PDF");
    expect(nativeInput).toHaveAttribute("accept", "application/pdf");
    expect(nativeInput).toHaveAttribute("name", "statement");
    expect(root).toHaveAttribute("data-budget-board-color-scheme", "light");
    expect(root?.style.getPropertyValue("--bbui-input-background")).toBe(
      "var(--bb-color-surface-input, #e9eae8)",
    );
  });

  it("forwards selected files and applies the dark theme input surface", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const file = new File(["statement"], "statement.pdf", {
      type: "application/pdf",
    });
    const { container } = render(
      <MantineProvider forceColorScheme="dark" theme={budgetBoardDarkTheme}>
        <FileInput
          aria-label="Upload statement"
          onChange={onChange}
          placeholder="Choose a PDF"
        />
      </MantineProvider>,
    );

    const nativeInput =
      container.querySelector<HTMLInputElement>('input[type="file"]');
    const trigger = screen.getByRole("button", { name: "Upload statement" });
    const root = trigger.closest<HTMLElement>(
      "[data-budget-board-color-scheme]",
    );

    expect(root).toHaveAttribute("data-budget-board-color-scheme", "dark");
    expect(root?.style.getPropertyValue("--bbui-input-background")).toBe(
      "var(--bb-color-surface-input, #1c1e21)",
    );

    await user.upload(nativeInput!, file);

    expect(onChange).toHaveBeenCalledWith(file);
    expect(trigger).toHaveTextContent("statement.pdf");
  });
});
