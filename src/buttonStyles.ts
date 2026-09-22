import type { CSSProperties } from "react";
import type {
  BudgetBoardColorMode,
  BudgetBoardContentColorKey,
} from "./colors";

export const buttonColors = [
  "primary",
  "secondary",
  "accent",
  "muted",
  "neutral",
  "info",
  "success",
  "warning",
  "error",
] as const;
export type ButtonColor = (typeof buttonColors)[number];

export const buttonVariants = ["filled", "outline", "ghost"] as const;
export type ButtonVariant = (typeof buttonVariants)[number];

export type ButtonStyle = CSSProperties &
  Record<
    | "--bbui-button-bg"
    | "--bbui-button-color"
    | "--bbui-button-hover"
    | "--bbui-button-active"
    | "--bbui-button-border"
    | "--bbui-button-hover-border"
    | "--bbui-button-focus",
    string
  >;

export function getButtonVariantStyles(
  colors: BudgetBoardColorMode,
  color: ButtonColor,
  variant: ButtonVariant,
): ButtonStyle {
  const background = `var(--bb-color-${color}, ${colors[color]})`;
  const content = `var(--bb-color-${color}-content, ${colors[`${color}Content` as BudgetBoardContentColorKey]})`;
  const hoverBorder = `var(--bb-color-button-hover-border, ${colors.buttonHoverBorder})`;
  const focusRing = `var(--bb-color-focus-ring, ${colors.focusRing})`;
  const colorToken = `var(--budget-board-button-${color}`;
  const hoverFallback = `color-mix(in srgb, ${background} 88%, ${content})`;

  if (variant === "outline") {
    return {
      "--bbui-button-bg": "transparent",
      "--bbui-button-color": `${colorToken}-outline-color, ${background})`,
      "--bbui-button-hover": `${colorToken}-outline-hover, color-mix(in srgb, ${background} 12%, transparent))`,
      "--bbui-button-active": `${colorToken}-outline-active, color-mix(in srgb, ${background} 20%, transparent))`,
      "--bbui-button-border": `${colorToken}-outline-border, ${background})`,
      "--bbui-button-hover-border": hoverBorder,
      "--bbui-button-focus": `var(--budget-board-button-focus-ring, ${focusRing})`,
    };
  }

  if (variant === "ghost") {
    return {
      "--bbui-button-bg": "transparent",
      "--bbui-button-color": `${colorToken}-ghost-color, ${background})`,
      "--bbui-button-hover": `${colorToken}-ghost-hover, color-mix(in srgb, ${background} 12%, transparent))`,
      "--bbui-button-active": `${colorToken}-ghost-active, color-mix(in srgb, ${background} 20%, transparent))`,
      "--bbui-button-border": "transparent",
      "--bbui-button-hover-border": hoverBorder,
      "--bbui-button-focus": `var(--budget-board-button-focus-ring, ${focusRing})`,
    };
  }

  return {
    "--bbui-button-bg": `${colorToken}-background, ${background})`,
    "--bbui-button-color": `${colorToken}-color, ${content})`,
    "--bbui-button-hover": `${colorToken}-hover, ${hoverFallback})`,
    "--bbui-button-active": `${colorToken}-active, color-mix(in srgb, ${background} 80%, ${content}))`,
    "--bbui-button-border": "transparent",
    "--bbui-button-hover-border": hoverBorder,
    "--bbui-button-focus": `var(--budget-board-button-focus-ring, ${focusRing})`,
  };
}
