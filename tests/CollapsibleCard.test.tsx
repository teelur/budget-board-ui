import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MantineProvider } from "@mantine/core";
import { describe, expect, it, vi } from "vitest";
import { CollapsibleCard } from "../src/CollapsibleCard/CollapsibleCard";
import classes from "../src/CollapsibleCard/CollapsibleCard.module.css";
import { budgetBoardDarkTheme } from "../src/theme";

const collapsibleCardStyles = readFileSync(
  resolve(process.cwd(), "src/CollapsibleCard/CollapsibleCard.module.css"),
  "utf8",
);

describe("CollapsibleCard", () => {
  it("renders expanded by default with an accessible toggle and region", () => {
    render(
      <CollapsibleCard title="Account overview">
        Checking account details
      </CollapsibleCard>,
    );

    const toggle = screen.getByRole("button", { name: "Account overview" });
    const panelId = toggle.getAttribute("aria-controls");
    const panel = document.getElementById(panelId ?? "");

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(panel).toHaveAttribute("role", "region");
    expect(panel).toHaveAttribute("aria-labelledby", toggle.id);
    expect(panel).not.toHaveAttribute("inert");
    expect(screen.getByText("Checking account details")).toBeInTheDocument();
  });

  it("toggles uncontrolled content and reports expansion changes", async () => {
    const user = userEvent.setup();
    const onExpandedChange = vi.fn();
    render(
      <CollapsibleCard
        defaultExpanded={false}
        onExpandedChange={onExpandedChange}
        title="Account overview"
      >
        Checking account details
      </CollapsibleCard>,
    );

    const toggle = screen.getByRole("button", { name: "Account overview" });
    const panel = document.getElementById(
      toggle.getAttribute("aria-controls") ?? "",
    );

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(panel).toHaveAttribute("inert");

    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(panel).not.toHaveAttribute("inert");
    expect(onExpandedChange).toHaveBeenCalledExactlyOnceWith(true);

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(onExpandedChange).toHaveBeenLastCalledWith(false);
  });

  it("reports changes without changing a controlled value", async () => {
    const user = userEvent.setup();
    const onExpandedChange = vi.fn();
    const { rerender } = render(
      <CollapsibleCard
        expanded={false}
        onExpandedChange={onExpandedChange}
        title="Account overview"
      >
        Checking account details
      </CollapsibleCard>,
    );

    const toggle = screen.getByRole("button", { name: "Account overview" });
    await user.click(toggle);

    expect(onExpandedChange).toHaveBeenCalledExactlyOnceWith(true);
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    rerender(
      <CollapsibleCard
        expanded
        onExpandedChange={onExpandedChange}
        title="Account overview"
      >
        Checking account details
      </CollapsibleCard>,
    );

    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  it("forwards Card props and preserves themed surface styling", () => {
    render(
      <>
        <CollapsibleCard data-testid="light-card" surface="sunken" title="Light">
          Content
        </CollapsibleCard>
        <MantineProvider forceColorScheme="dark" theme={budgetBoardDarkTheme}>
          <CollapsibleCard
            className="consumer-card"
            data-testid="dark-card"
            surface="sunken"
            title="Dark"
            withBorder={false}
          >
            Content
          </CollapsibleCard>
        </MantineProvider>
      </>,
    );

    expect(screen.getByTestId("light-card").style.padding).toBe("0rem");
    expect(
      screen.getByTestId("light-card").style.getPropertyValue(
        "--bbui-card-surface",
      ),
    ).toBe("var(--bb-color-surface-sunken, #ebe8df)");
    expect(screen.getByTestId("dark-card")).toHaveClass(
      classes.root,
      "consumer-card",
    );
    expect(screen.getByTestId("dark-card")).not.toHaveAttribute(
      "data-with-border",
    );
    expect(
      screen.getByTestId("dark-card").style.getPropertyValue(
        "--bbui-card-surface",
      ),
    ).toBe("var(--bb-color-surface-sunken, #0d0f12)");
  });

  it("supports the outline surface using the app page color", () => {
    render(
      <>
        <CollapsibleCard
          data-testid="light-card"
          surface="outline"
          title="Light"
        >
          Content
        </CollapsibleCard>
        <MantineProvider forceColorScheme="dark" theme={budgetBoardDarkTheme}>
          <CollapsibleCard
            data-testid="dark-card"
            surface="outline"
            title="Dark"
          >
            Content
          </CollapsibleCard>
        </MantineProvider>
      </>,
    );

    expect(
      screen.getByTestId("light-card").style.getPropertyValue(
        "--bbui-card-surface",
      ),
    ).toBe("var(--bb-color-page, #f7f6f2)");
    expect(
      screen.getByTestId("dark-card").style.getPropertyValue(
        "--bbui-card-surface",
      ),
    ).toBe("var(--bb-color-page, #111214)");
  });

  it("animates expansion and disables motion when requested by the user", () => {
    expect(collapsibleCardStyles).toContain(
      "transition: grid-template-rows 250ms ease;",
    );
    expect(collapsibleCardStyles).toContain(
      "@media (prefers-reduced-motion: reduce)",
    );
    expect(collapsibleCardStyles).toContain("transition: none;");
  });
});
