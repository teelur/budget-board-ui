import { createTheme } from "@mantine/core";

const lightColors = {
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
  primary: "#4c6ef5",
  primaryContent: "#fffaf2",
  secondary: "#12b886",
  secondaryContent: "#063b2f",
  accent: "#f76707",
  accentContent: "#4a2103",
  neutral: "#e7e3da",
  neutralContent: "#3a3834",
  border: "color-mix(in srgb, #3a3834 18%, transparent)",
  borderSubtle: "#d8d5ce",
  borderStrong: "#aaa69e",
  focusRing: "#4c6ef5",
  selection: "#dbe4ff",
  info: "#1971c2",
  infoContent: "#e7f5ff",
  success: "#2f9e44",
  successContent: "#ebfbee",
  warning: "#fcc419",
  warningContent: "#5f3b00",
  error: "#c92a2a",
  errorContent: "#fff5f5",
} as const;

export type BudgetBoardColorKey = keyof typeof lightColors;

const darkColors = {
  page: "#111214",
  surface: "#191b1f",
  surfaceElevated: "#22252a",
  navigation: "#191b1f",
  surfaceSunken: "#0d0f12",
  surfaceOverlay: "#292c31",
  textHeading: "#f2f0eb",
  textPrimary: "#d8d5ce",
  textSecondary: "#aaa69e",
  textMetadata: "#8e8a83",
  textMuted: "#716f6b",
  textDisabled: "#55585d",
  textInverse: "#242321",
  primary: "#91a7ff",
  primaryContent: "#1e2450",
  secondary: "#63e6be",
  secondaryContent: "#063b2f",
  accent: "#ffa94d",
  accentContent: "#4a2103",
  neutral: "#34373a",
  neutralContent: "#f2f0eb",
  border: "color-mix(in srgb, #d8d5ce 18%, transparent)",
  borderSubtle: "#3a3d42",
  borderStrong: "#686b70",
  focusRing: "#91a7ff",
  selection: "#1e2450",
  info: "#74c0fc",
  infoContent: "#1864ab",
  success: "#69db7c",
  successContent: "#2b8a3e",
  warning: "#ffd43b",
  warningContent: "#5f3b00",
  error: "#ff6b6b",
  errorContent: "#4a0c0c",
} as const satisfies BudgetBoardColorMode;

export const budgetBoardColors = {
  light: lightColors,
  dark: darkColors,
} as const satisfies Record<"light" | "dark", BudgetBoardColorMode>;

export type BudgetBoardColors = typeof budgetBoardColors;

export const budgetBoardTypography = {
  body: '"IBM Plex Sans Variable", sans-serif',
  data: '"IBM Plex Sans Variable", sans-serif',
  display: '"Plus Jakarta Sans Variable", sans-serif',
} as const;

export type BudgetBoardFontKey = keyof typeof budgetBoardTypography;
export type BudgetBoardTypography = typeof budgetBoardTypography;
export type BudgetBoardColorMode = Record<BudgetBoardColorKey, string>;

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
