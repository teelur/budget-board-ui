import { describe, expect, it } from "vitest";
import {
  budgetBoardColors,
  budgetBoardDarkTheme,
  budgetBoardTheme,
  budgetBoardTypography,
} from "../src/theme";
import type {
  BudgetBoardColorKey,
  BudgetBoardContentColorKey,
  BudgetBoardFontKey,
} from "../src/theme";

const semanticColorKeys = [
  "page",
  "surface",
  "surfaceElevated",
  "navigation",
  "surfaceSunken",
  "surfaceOverlay",
  "textHeading",
  "textPrimary",
  "textSecondary",
  "textMetadata",
  "textMuted",
  "textDisabled",
  "textInverse",
  "primary",
  "primaryContent",
  "secondary",
  "secondaryContent",
  "accent",
  "accentContent",
  "neutral",
  "neutralContent",
  "border",
  "borderSubtle",
  "borderStrong",
  "buttonHoverBorder",
  "focusRing",
  "selection",
  "info",
  "infoContent",
  "success",
  "successContent",
  "warning",
  "warningContent",
  "error",
  "errorContent",
] as const satisfies readonly BudgetBoardColorKey[];

const fontKeys = [
  "body",
  "data",
  "display",
] as const satisfies readonly BudgetBoardFontKey[];

const contentColorKeys = [
  "primaryContent",
  "secondaryContent",
  "accentContent",
  "neutralContent",
  "infoContent",
  "successContent",
  "warningContent",
  "errorContent",
] as const satisfies readonly BudgetBoardContentColorKey[];

describe("budgetBoardColors", () => {
  it("includes every semantic color key in both modes", () => {
    expect(Object.keys(budgetBoardColors.light)).toEqual(semanticColorKeys);
    expect(Object.keys(budgetBoardColors.dark)).toEqual(semanticColorKeys);
    expect(Object.keys(budgetBoardTypography)).toEqual(fontKeys);
  });

  it("finalizes structural and feedback roles in both modes", () => {
    expect(budgetBoardColors.light.borderSubtle).toBe("#d8d5ce");
    expect(budgetBoardColors.light.borderStrong).toBe("#aaa69e");
    expect(budgetBoardColors.light.buttonHoverBorder).toBe("#5f3dc4");
    expect(budgetBoardColors.light.focusRing).toBe("#4c6ef5");
    expect(budgetBoardColors.light.selection).toBe("#dbe4ff");
    expect(budgetBoardColors.light.info).toBe("#1971c2");
    expect(budgetBoardColors.light.infoContent).toBe("#e7f5ff");
    expect(budgetBoardColors.light.success).toBe("#2f9e44");
    expect(budgetBoardColors.light.successContent).toBe("#ebfbee");
    expect(budgetBoardColors.light.warning).toBe("#fcc419");
    expect(budgetBoardColors.light.warningContent).toBe("#5f3b00");
    expect(budgetBoardColors.light.error).toBe("#c92a2a");
    expect(budgetBoardColors.light.errorContent).toBe("#fff5f5");

    expect(budgetBoardColors.dark.borderSubtle).toBe("#3a3d42");
    expect(budgetBoardColors.dark.borderStrong).toBe("#686b70");
    expect(budgetBoardColors.dark.buttonHoverBorder).toBe("#63e6be");
    expect(budgetBoardColors.dark.focusRing).toBe("#91a7ff");
    expect(budgetBoardColors.dark.selection).toBe("#1e2450");
    expect(budgetBoardColors.dark.info).toBe("#74c0fc");
    expect(budgetBoardColors.dark.infoContent).toBe("#1864ab");
    expect(budgetBoardColors.dark.success).toBe("#69db7c");
    expect(budgetBoardColors.dark.successContent).toBe("#2b8a3e");
    expect(budgetBoardColors.dark.warning).toBe("#ffd43b");
    expect(budgetBoardColors.dark.warningContent).toBe("#5f3b00");
    expect(budgetBoardColors.dark.error).toBe("#ff6b6b");
    expect(budgetBoardColors.dark.errorContent).toBe("#4a0c0c");
  });

  it("includes content color keys", () => {
    expect(semanticColorKeys.filter((key) => key.endsWith("Content"))).toEqual(
      contentColorKeys,
    );
  });

  it("preserves the finalized background and content values", () => {
    expect(budgetBoardColors.light.page).toBe("#f7f6f2");
    expect(budgetBoardColors.light.surface).toBe("#ffffff");
    expect(budgetBoardColors.light.surfaceSunken).toBe("#ebe8df");
    expect(budgetBoardColors.light.surfaceOverlay).toBe("#fffaf2");
    expect(budgetBoardColors.light.textHeading).toBe("#242321");
    expect(budgetBoardColors.light.textPrimary).toBe("#3a3834");
    expect(budgetBoardColors.light.border).toBe(
      "color-mix(in srgb, #3a3834 18%, transparent)",
    );
    expect(budgetBoardColors.dark.page).toBe("#111214");
    expect(budgetBoardColors.dark.surface).toBe("#191b1f");
    expect(budgetBoardColors.dark.textHeading).toBe("#f2f0eb");
    expect(budgetBoardColors.dark.textPrimary).toBe("#d8d5ce");
  });

  it("uses the matching mode colors in each theme", () => {
    expect(budgetBoardTheme.other.colors).toBe(budgetBoardColors.light);
    expect(budgetBoardDarkTheme.other.colors).toBe(budgetBoardColors.dark);
  });
});
