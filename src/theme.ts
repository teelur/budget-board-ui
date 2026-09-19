import { createTheme } from "@mantine/core";
import { budgetBoardColors } from "./colors";
import type {
  BudgetBoardColorKey,
  BudgetBoardColorMode,
  BudgetBoardColors,
  BudgetBoardContentColorKey,
} from "./colors";

export { budgetBoardColors } from "./colors";
export type {
  BudgetBoardColorKey,
  BudgetBoardColorMode,
  BudgetBoardColors,
  BudgetBoardContentColorKey,
} from "./colors";

export const budgetBoardTypography = {
  body: '"IBM Plex Sans", sans-serif',
  data: '"IBM Plex Sans", sans-serif',
  display: '"Plus Jakarta Sans", sans-serif',
} as const;

export type BudgetBoardFontKey = keyof typeof budgetBoardTypography;
export type BudgetBoardTypography = typeof budgetBoardTypography;

function createBudgetBoardTheme(colors: BudgetBoardColorMode) {
  return createTheme({
    fontFamily: budgetBoardTypography.body,
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
