import { createTheme } from "@mantine/core";
import { budgetBoardColors } from "./colors";
import type {
  BudgetBoardColorKey,
  BudgetBoardColorMode,
  BudgetBoardColors,
  BudgetBoardContentColorKey,
} from "./colors";

declare module "@mantine/core" {
  export interface MantineThemeSizesOverride {
    fontSizes: "xxs";
  }
}

export { budgetBoardColors } from "./colors";
export { budgetBoardDataColors } from "./colors";
export { getBudgetBoardDataColor } from "./colors";
export type {
  BudgetBoardColorKey,
  BudgetBoardColorMode,
  BudgetBoardColors,
  BudgetBoardContentColorKey,
  BudgetBoardDataColors,
} from "./colors";

export const budgetBoardTypography = {
  body: '"IBM Plex Sans Variable", sans-serif',
  code: '"IBM Plex Mono", monospace',
  data: '"IBM Plex Sans Variable", sans-serif',
  display: '"Plus Jakarta Sans Variable", sans-serif',
} as const;

export type BudgetBoardFontKey = keyof typeof budgetBoardTypography;
export type BudgetBoardTypography = typeof budgetBoardTypography;

function createBudgetBoardTheme(colors: BudgetBoardColorMode) {
  return createTheme({
    fontFamily: budgetBoardTypography.body,
    fontSizes: {
      xxs: "0.65rem",
    },
    headings: {
      fontFamily: budgetBoardTypography.display,
    },
    defaultRadius: "sm",
    other: {
      colors,
    },
  });
}

export const budgetBoardTheme = createBudgetBoardTheme(budgetBoardColors.light);

export const budgetBoardDarkTheme = createBudgetBoardTheme(
  budgetBoardColors.dark,
);
