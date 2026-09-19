import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HeadlessMantineProvider, MantineProvider } from "@mantine/core";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../src/Button";
import { budgetBoardDarkTheme, budgetBoardTheme } from "../src/theme";

function renderButton(
  button: React.ReactNode,
  Provider:
    | typeof MantineProvider
    | typeof HeadlessMantineProvider = MantineProvider,
) {
  return render(<Provider env="test">{button}</Provider>);
}

describe("Button", () => {
  it("renders the primary medium button by default", () => {
    renderButton(<Button>Save changes</Button>);

    const button = screen.getByRole("button", { name: "Save changes" });

    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("data-budget-board-variant", "filled");
    expect(button).toHaveAttribute("data-budget-board-color", "primary");
    expect(button).toHaveAttribute("data-budget-board-size", "md");
  });

  it("resolves light semantic palette roles for each color", () => {
    render(
      <MantineProvider env="test" theme={budgetBoardTheme}>
        <Button>Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="error">Error</Button>
        <Button color="info" variant="outline">
          Info outline
        </Button>
        <Button color="warning" variant="ghost">
          Warning ghost
        </Button>
      </MantineProvider>,
    );

    expect(
      screen
        .getByRole("button", { name: "Primary" })
        .style.getPropertyValue("--button-bg"),
    ).toBe("var(--budget-board-button-primary-background, #4c6ef5)");
    expect(
      screen
        .getByRole("button", { name: "Secondary" })
        .style.getPropertyValue("--button-color"),
    ).toBe("var(--budget-board-button-secondary-color, #063b2f)");
    expect(
      screen
        .getByRole("button", { name: "Error" })
        .style.getPropertyValue("--button-bg"),
    ).toBe("var(--budget-board-button-error-background, #c92a2a)");
    expect(
      screen
        .getByRole("button", { name: "Info outline" })
        .style.getPropertyValue("--button-border"),
    ).toBe("var(--budget-board-button-info-outline-border, #1971c2)");
    expect(
      screen
        .getByRole("button", { name: "Warning ghost" })
        .style.getPropertyValue("--button-bg"),
    ).toBe("transparent");
  });

  it("resolves dark semantic palette roles", () => {
    render(
      <MantineProvider env="test" theme={budgetBoardDarkTheme}>
        <Button>Primary</Button>
        <Button color="error">Error</Button>
      </MantineProvider>,
    );

    expect(
      screen
        .getByRole("button", { name: "Primary" })
        .style.getPropertyValue("--button-bg"),
    ).toBe("var(--budget-board-button-primary-background, #91a7ff)");
    expect(
      screen
        .getByRole("button", { name: "Error" })
        .style.getPropertyValue("--button-color"),
    ).toBe("var(--budget-board-button-error-color, #4a0c0c)");
    expect(
      screen
        .getByRole("button", { name: "Primary" })
        .style.getPropertyValue("--button-focus"),
    ).toBe("var(--budget-board-button-focus-ring, #91a7ff)");
  });

  it("supports every public semantic color", () => {
    const colors = [
      "primary",
      "secondary",
      "accent",
      "neutral",
      "info",
      "success",
      "warning",
      "error",
    ] as const;

    renderButton(
      <>
        {colors.map((color) => (
          <Button color={color} key={color}>
            {color}
          </Button>
        ))}
      </>,
    );

    for (const color of colors) {
      expect(screen.getByRole("button", { name: color })).toHaveAttribute(
        "data-budget-board-color",
        color,
      );
    }
  });

  it("keeps system fallbacks when no Budget Board palette is provided", () => {
    renderButton(<Button>Fallback</Button>);

    expect(
      screen
        .getByRole("button", { name: "Fallback" })
        .style.getPropertyValue("--button-bg"),
    ).toBe("var(--budget-board-button-primary-background, Canvas)");
  });

  it("forwards the visual options and custom button attributes", () => {
    renderButton(
      <Button
        aria-label="Delete transaction"
        color="error"
        size="lg"
        variant="outline"
      >
        Delete
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Delete transaction" });

    expect(button).toHaveAttribute("data-budget-board-variant", "outline");
    expect(button).toHaveAttribute("data-budget-board-color", "error");
    expect(button).toHaveAttribute("data-budget-board-size", "lg");
  });

  it("calls its click handler and supports an explicit form type", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    renderButton(
      <Button onClick={onClick} type="submit">
        Continue
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Continue" });
    await user.click(button);

    expect(button).toHaveAttribute("type", "submit");
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not activate when disabled or loading", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    renderButton(
      <>
        <Button disabled onClick={onClick}>
          Disabled
        </Button>
        <Button loading onClick={onClick}>
          Loading
        </Button>
      </>,
    );

    await user.click(screen.getByRole("button", { name: "Disabled" }));
    await user.click(screen.getByRole("button", { name: "Loading" }));

    expect(screen.getByRole("button", { name: "Disabled" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Loading" })).toBeDisabled();
    expect(onClick).not.toHaveBeenCalled();
  });

  it("supports full-width rendering", () => {
    renderButton(<Button fullWidth>Full width</Button>);

    expect(screen.getByRole("button", { name: "Full width" })).toHaveAttribute(
      "data-budget-board-full-width",
      "true",
    );
  });

  it("works with both Mantine provider modes", () => {
    const { unmount } = renderButton(
      <Button>Headless button</Button>,
      HeadlessMantineProvider,
    );

    expect(
      screen.getByRole("button", { name: "Headless button" }),
    ).toBeVisible();
    unmount();

    renderButton(<Button>Styled button</Button>, MantineProvider);

    expect(screen.getByRole("button", { name: "Styled button" })).toBeVisible();
  });
});
