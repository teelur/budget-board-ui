import type { CSSProperties, ButtonHTMLAttributes, ReactNode } from "react";
import { budgetBoardColors } from "./colors";
import type {
  BudgetBoardColorMode,
  BudgetBoardContentColorKey,
} from "./colors";
import classes from "./Button.module.css";

export const buttonColors = [
  "primary",
  "secondary",
  "accent",
  "neutral",
  "info",
  "success",
  "warning",
  "error",
] as const;
export type ButtonColor = (typeof buttonColors)[number];

export const buttonVariants = ["filled", "outline", "ghost"] as const;
export type ButtonVariant = (typeof buttonVariants)[number];

export const buttonSizes = ["xs", "sm", "md", "lg", "xl"] as const;
export type ButtonSize = (typeof buttonSizes)[number];

export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "color" | "disabled"
> {
  children?: ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  leftSection?: ReactNode;
  loading?: boolean;
  rightSection?: ReactNode;
  size?: ButtonSize;
  color?: ButtonColor;
  variant?: ButtonVariant;
}

type ButtonStyle = CSSProperties &
  Record<
    | "--button-bg"
    | "--button-color"
    | "--button-hover"
    | "--button-border"
    | "--button-focus",
    string
  >;

function getVariantStyles(
  colors: BudgetBoardColorMode,
  color: ButtonColor,
  variant: ButtonVariant,
): ButtonStyle {
  const background = `var(--bb-color-${color}, ${colors[color]})`;
  const content = `var(--bb-color-${color}-content, ${colors[`${color}Content` as BudgetBoardContentColorKey]})`;
  const focusRing = `var(--bb-color-focus-ring, ${colors.focusRing})`;
  const colorToken = `var(--budget-board-button-${color}`;
  const hoverFallback = `color-mix(in srgb, ${background} 88%, ${content})`;

  if (variant === "outline") {
    return {
      "--button-bg": "transparent",
      "--button-color": `${colorToken}-outline-color, ${background})`,
      "--button-hover": `${colorToken}-outline-hover, color-mix(in srgb, ${background} 12%, transparent))`,
      "--button-border": `${colorToken}-outline-border, ${background})`,
      "--button-focus": `var(--budget-board-button-focus-ring, ${focusRing})`,
    };
  }

  if (variant === "ghost") {
    return {
      "--button-bg": "transparent",
      "--button-color": `${colorToken}-ghost-color, ${background})`,
      "--button-hover": `${colorToken}-ghost-hover, color-mix(in srgb, ${background} 12%, transparent))`,
      "--button-border": "transparent",
      "--button-focus": `var(--budget-board-button-focus-ring, ${focusRing})`,
    };
  }

  return {
    "--button-bg": `${colorToken}-background, ${background})`,
    "--button-color": `${colorToken}-color, ${content})`,
    "--button-hover": `${colorToken}-hover, ${hoverFallback})`,
    "--button-border": "transparent",
    "--button-focus": `var(--budget-board-button-focus-ring, ${focusRing})`,
  };
}

export function Button({
  children,
  className,
  color = "primary",
  disabled,
  fullWidth = false,
  leftSection,
  loading = false,
  rightSection,
  size = "md",
  style,
  type = "button",
  variant = "filled",
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      {...buttonProps}
      aria-busy={loading || undefined}
      className={[
        classes.root,
        classes[size],
        fullWidth && classes.fullWidth,
        loading && classes.loading,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-budget-board-full-width={fullWidth ? "true" : undefined}
      data-budget-board-color={color}
      data-budget-board-size={size}
      data-budget-board-variant={variant}
      disabled={disabled ?? loading}
      style={{
        ...getVariantStyles(budgetBoardColors.light, color, variant),
        ...style,
      }}
      type={type}
    >
      {loading && <span aria-hidden="true" className={classes.loader} />}
      {leftSection && <span className={classes.section}>{leftSection}</span>}
      <span>{children}</span>
      {rightSection && <span className={classes.section}>{rightSection}</span>}
    </button>
  );
}
