export type ColorMode = "light" | "dark";

export function valueForMode<T>(
  lightValue: T,
  darkValue: T,
  colorMode: ColorMode,
) {
  return colorMode === "light" ? lightValue : darkValue;
}
