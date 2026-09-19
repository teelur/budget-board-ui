import { createTheme } from "@mantine/core";

const budgetBoardColorPlaceholder = "#b8b8b8";

export const budgetBoardColors = {
  page: "#f7f6f2",
  surface: "#ffffff",
  surfaceElevated: "#fffcf7",
  navigation: "#f1efe9",
  surfaceSunken: "#ebe8df",
  surfaceOverlay: "#fffaf2",
  textHeading: "#242321",
  textPrimary: "#3a3834",
  textSecondary: "#68645d",
  textMetadata: "#807a70",
  textMuted: "#969087",
  textDisabled: "#b7b1a7",
  textInverse: "#fffaf2",
  primary: budgetBoardColorPlaceholder,
  primaryContent: budgetBoardColorPlaceholder,
  secondary: budgetBoardColorPlaceholder,
  secondaryContent: budgetBoardColorPlaceholder,
  accent: budgetBoardColorPlaceholder,
  accentContent: budgetBoardColorPlaceholder,
  neutral: budgetBoardColorPlaceholder,
  neutralContent: budgetBoardColorPlaceholder,
  border: "color-mix(in srgb, #3a3834 18%, transparent)",
  borderSubtle: budgetBoardColorPlaceholder,
  borderStrong: budgetBoardColorPlaceholder,
  focusRing: budgetBoardColorPlaceholder,
  selection: budgetBoardColorPlaceholder,
  info: budgetBoardColorPlaceholder,
  infoContent: budgetBoardColorPlaceholder,
  success: budgetBoardColorPlaceholder,
  successContent: budgetBoardColorPlaceholder,
  warning: budgetBoardColorPlaceholder,
  warningContent: budgetBoardColorPlaceholder,
  error: budgetBoardColorPlaceholder,
  errorContent: budgetBoardColorPlaceholder,
} as const;

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
  other: {
    colors: budgetBoardColors,
  },
});
