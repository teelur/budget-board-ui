import type { CSSProperties } from "react";
import type {
  BudgetBoardColorMode,
  BudgetBoardContentColorKey,
} from "../colors";
import { buttonColors, type ButtonColor } from "./buttonStyles";

export const badgeColors = buttonColors;
export type BadgeColor = ButtonColor;

export const badgeVariants = ["filled", "light", "outline", "ghost"] as const;
export type BadgeVariant = (typeof badgeVariants)[number];

export type BadgeStyle = CSSProperties &
  Record<
    "--bbui-badge-bg" | "--bbui-badge-color" | "--bbui-badge-border",
    string
  >;

export function getBadgeVariantStyles(
  colors: BudgetBoardColorMode,
  color: BadgeColor,
  variant: BadgeVariant,
): BadgeStyle {
  const background = `var(--bb-color-${color}, ${colors[color]})`;
  const content = `var(--bb-color-${color}-content, ${colors[`${color}Content` as BudgetBoardContentColorKey]})`;
  const colorToken = `var(--budget-board-badge-${color}`;

  if (variant === "light") {
    return {
      "--bbui-badge-bg": `${colorToken}-light-background, color-mix(in srgb, ${background} 14%, transparent))`,
      "--bbui-badge-color": `${colorToken}-light-color, ${background})`,
      "--bbui-badge-border": "transparent",
    };
  }

  if (variant === "outline") {
    return {
      "--bbui-badge-bg": "transparent",
      "--bbui-badge-color": `${colorToken}-outline-color, ${background})`,
      "--bbui-badge-border": `${colorToken}-outline-border, ${background})`,
    };
  }

  if (variant === "ghost") {
    return {
      "--bbui-badge-bg": "transparent",
      "--bbui-badge-color": `${colorToken}-ghost-color, ${background})`,
      "--bbui-badge-border": "transparent",
    };
  }

  return {
    "--bbui-badge-bg": `${colorToken}-background, ${background})`,
    "--bbui-badge-color": `${colorToken}-color, ${content})`,
    "--bbui-badge-border": "transparent",
  };
}
