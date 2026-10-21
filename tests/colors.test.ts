import {
  budgetBoardDataColors,
  getBudgetBoardDataColor,
} from "../src";
import { describe, expect, it } from "vitest";

describe("graph data colors", () => {
  it("provides ten unique colors in both themes", () => {
    expect(budgetBoardDataColors.light).toHaveLength(10);
    expect(budgetBoardDataColors.dark).toHaveLength(10);
    expect(new Set(budgetBoardDataColors.light).size).toBe(10);
    expect(new Set(budgetBoardDataColors.dark).size).toBe(10);
  });

  it("uses the same palette order and wraps after ten colors", () => {
    for (const colorScheme of ["light", "dark"] as const) {
      expect(getBudgetBoardDataColor(0, colorScheme)).toBe(
        budgetBoardDataColors[colorScheme][0],
      );
      expect(getBudgetBoardDataColor(9, colorScheme)).toBe(
        budgetBoardDataColors[colorScheme][9],
      );
      expect(getBudgetBoardDataColor(10, colorScheme)).toBe(
        budgetBoardDataColors[colorScheme][0],
      );
      expect(getBudgetBoardDataColor(11, colorScheme)).toBe(
        budgetBoardDataColors[colorScheme][1],
      );
    }
  });

  it("rejects invalid palette indexes", () => {
    expect(() => getBudgetBoardDataColor(-1, "light")).toThrow(
      "Graph color index must be a non-negative integer.",
    );
    expect(() => getBudgetBoardDataColor(1.5, "dark")).toThrow(
      "Graph color index must be a non-negative integer.",
    );
  });
});
