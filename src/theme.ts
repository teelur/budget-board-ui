import { createTheme } from "@mantine/core";

export const budgetBoardTypography = {
  body: '"IBM Plex Sans Variable", sans-serif',
  data: '"IBM Plex Sans Variable", sans-serif',
  display: '"Plus Jakarta Sans Variable", sans-serif',
} as const;

export const budgetBoardTheme = createTheme({
  fontFamily: budgetBoardTypography.body,
  headings: {
    fontFamily: budgetBoardTypography.display,
  },
  defaultRadius: "sm",
});
