import { describe, expect, it } from "vitest";
import { budgetBoardColors } from "../src/theme";

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
] as const;

describe("budgetBoardColors", () => {
  it("includes every semantic color key", () => {
    expect(Object.keys(budgetBoardColors)).toEqual(semanticColorKeys);
  });

  it("finalizes inverse text and theme roles", () => {
    const placeholder = "#b8b8b8";

    expect(budgetBoardColors.textInverse).toBe("#fffaf2");
    expect(budgetBoardColors.primary).toBe("#4c6ef5");
    expect(budgetBoardColors.primaryContent).toBe("#fffaf2");
    expect(budgetBoardColors.secondary).toBe("#12b886");
    expect(budgetBoardColors.secondaryContent).toBe("#063b2f");
    expect(budgetBoardColors.accent).toBe("#f76707");
    expect(budgetBoardColors.accentContent).toBe("#4a2103");
    expect(budgetBoardColors.neutral).toBe("#e7e3da");
    expect(budgetBoardColors.neutralContent).toBe("#3a3834");
    expect(budgetBoardColors.borderSubtle).toBe(placeholder);
    expect(budgetBoardColors.info).toBe(placeholder);
    expect(budgetBoardColors.errorContent).toBe(placeholder);
  });

  it("preserves the finalized background and content values", () => {
    expect(budgetBoardColors.page).toBe("#f7f6f2");
    expect(budgetBoardColors.surface).toBe("#ffffff");
    expect(budgetBoardColors.surfaceSunken).toBe("#ebe8df");
    expect(budgetBoardColors.surfaceOverlay).toBe("#fffaf2");
    expect(budgetBoardColors.textHeading).toBe("#242321");
    expect(budgetBoardColors.textPrimary).toBe("#3a3834");
    expect(budgetBoardColors.border).toBe(
      "color-mix(in srgb, #3a3834 18%, transparent)",
    );
  });
});
