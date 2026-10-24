const lightColors = {
  page: "#f7f6f2",
  surface: "#ffffff",
  surfaceElevated: "#fffcf7",
  navigation: "#f1efe9",
  appShellNavigation: "#2f3a4d",
  appShellHeader: "#ffffff",
  navigationTextPrimary: "#f7f6f2",
  navigationTextSecondary: "#c7cbd3",
  navigationSurfaceHover: "#3b4962",
  navigationSelection: "#465a7a",
  navigationFocusRing: "#91a7ff",
  navigationBorder: "#47536b",
  surfaceSunken: "#ebe8df",
  surfaceInput: "#e9eae8",
  surfaceHover: "#d8d5ce",
  surfaceOverlay: "#fffaf2",
  textHeading: "#242321",
  textPrimary: "#3a3834",
  textSecondary: "#68645d",
  textMetadata: "#807a70",
  textMuted: "#969087",
  textDisabled: "#b7b1a7",
  textInverse: "#fffaf2",
  contrast: "#242321",
  contrastContent: "#fffaf2",
  primary: "#4c6ef5",
  primaryContent: "#fffaf2",
  secondary: "#6b8d86",
  secondaryContent: "#123b3a",
  accent: "#b26a50",
  accentContent: "#3b2115",
  muted: "#6e7378",
  mutedContent: "#fffaf2",
  neutral: "#e7e3da",
  neutralContent: "#3a3834",
  border: "color-mix(in srgb, #3a3834 18%, transparent)",
  borderSubtle: "#d8d5ce",
  borderStrong: "#aaa69e",
  buttonHoverBorder: "#3b5bdb",
  focusRing: "#4c6ef5",
  selection: "#c7d4ff",
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
export type BudgetBoardContentColorKey = Extract<
  BudgetBoardColorKey,
  `${string}Content`
>;

const darkColors = {
  page: "#111214",
  surface: "#191b1f",
  surfaceElevated: "#22252a",
  navigation: "#191b1f",
  appShellNavigation: "#191b1f",
  appShellHeader: "#0d0f12",
  navigationTextPrimary: "#d8d5ce",
  navigationTextSecondary: "#aaa69e",
  navigationSurfaceHover: "#34373a",
  navigationSelection: "#414b85",
  navigationFocusRing: "#91a7ff",
  navigationBorder: "#3a3d42",
  surfaceSunken: "#0d0f12",
  surfaceInput: "#1c1e21",
  surfaceHover: "#34373a",
  surfaceOverlay: "#292c31",
  textHeading: "#f2f0eb",
  textPrimary: "#d8d5ce",
  textSecondary: "#aaa69e",
  textMetadata: "#8e8a83",
  textMuted: "#716f6b",
  textDisabled: "#55585d",
  textInverse: "#242321",
  contrast: "#f2f0eb",
  contrastContent: "#242321",
  primary: "#91a7ff",
  primaryContent: "#1e2450",
  secondary: "#82b9b2",
  secondaryContent: "#123b3a",
  accent: "#d58e72",
  accentContent: "#3b2115",
  muted: "#969aa2",
  mutedContent: "#242321",
  neutral: "#34373a",
  neutralContent: "#f2f0eb",
  border: "color-mix(in srgb, #d8d5ce 18%, transparent)",
  borderSubtle: "#3a3d42",
  borderStrong: "#686b70",
  buttonHoverBorder: "#91a7ff",
  focusRing: "#91a7ff",
  selection: "#414b85",
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

export const budgetBoardDataColors = {
  light: [
    "#4c6ef5",
    "#0b7285",
    "#2f9e44",
    "#5c940d",
    "#b08900",
    "#d9480f",
    "#b26a50",
    "#c92a2a",
    "#c2255c",
    "#7950f2",
  ],
  dark: [
    "#91a7ff",
    "#66d9e8",
    "#69db7c",
    "#a9e34b",
    "#ffe066",
    "#ffa94d",
    "#d58e72",
    "#ff6b6b",
    "#faa2c1",
    "#b197fc",
  ],
} as const;

export type BudgetBoardDataColors = typeof budgetBoardDataColors;

export function getBudgetBoardDataColor(
  index: number,
  colorScheme: "light" | "dark",
): string {
  if (!Number.isSafeInteger(index) || index < 0) {
    throw new RangeError("Graph color index must be a non-negative integer.");
  }

  const palette = budgetBoardDataColors[colorScheme];
  return palette[index % palette.length]!;
}
export type BudgetBoardColorMode = Record<BudgetBoardColorKey, string>;
