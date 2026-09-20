import {
  useContext,
  type CSSProperties,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { MantineContext, MantineProvider, UnstyledButton } from "@mantine/core";
import type { UnstyledButtonProps } from "@mantine/core";
import { budgetBoardColors } from "../colors";
import type {
  BudgetBoardColorMode,
  BudgetBoardContentColorKey,
} from "../colors";
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

export const buttonSizes = [
  "compact-xs",
  "compact-sm",
  "compact-md",
  "compact-lg",
  "compact-xl",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
] as const;
export type ButtonSize = (typeof buttonSizes)[number];

export interface ButtonProps
  extends
    Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      "children" | "color" | "disabled" | "style"
    >,
    Omit<
      UnstyledButtonProps,
      "children" | "color" | "disabled" | "size" | "style" | "variant"
    > {
  selected?: boolean;
  children?: ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  leftSection?: ReactNode;
  loading?: boolean;
  rightSection?: ReactNode;
  size?: ButtonSize;
  color?: ButtonColor;
  variant?: ButtonVariant;
  style?: UnstyledButtonProps["style"];
}

type ButtonStyle = CSSProperties &
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

function getVariantStyles(
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

export function Button({
  selected,
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
  const isTab = buttonProps.role === "tab";
  const mantineContext = useContext(MantineContext);
  const colorScheme = mantineContext?.colorScheme === "dark" ? "dark" : "light";

  const button = (
    <UnstyledButton
      {...buttonProps}
      {...(selected === undefined || isTab ? {} : { "aria-pressed": selected })}
      aria-busy={loading || undefined}
      className={[
        classes.root,
        classes[size],
        selected && classes.selected,
        fullWidth && classes.fullWidth,
        loading && classes.loading,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-budget-board-full-width={fullWidth ? "true" : undefined}
      data-budget-board-selected={
        selected === undefined ? undefined : selected ? "true" : "false"
      }
      data-budget-board-color={color}
      data-budget-board-size={size}
      data-budget-board-variant={variant}
      disabled={disabled ?? loading}
      style={[
        getVariantStyles(budgetBoardColors[colorScheme], color, variant),
        style,
      ]}
      type={type}
    >
      {loading && <span aria-hidden="true" className={classes.loader} />}
      {leftSection && <span className={classes.section}>{leftSection}</span>}
      <span className={classes.content}>{children}</span>
      {rightSection && <span className={classes.section}>{rightSection}</span>}
    </UnstyledButton>
  );

  return mantineContext ? button : <MantineProvider>{button}</MantineProvider>;
}
