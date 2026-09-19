import type { CSSProperties, ButtonHTMLAttributes, ReactNode } from "react";
import { UnstyledButton } from "@mantine/core";
import classes from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

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
  variant?: ButtonVariant;
}

type ButtonStyle = CSSProperties &
  Record<"--button-bg" | "--button-color" | "--button-hover", string>;

const variantStyles: Record<ButtonVariant, ButtonStyle> = {
  primary: {
    "--button-bg": "var(--budget-board-button-primary-background, Canvas)",
    "--button-color": "var(--budget-board-button-primary-color, CanvasText)",
    "--button-hover": "var(--budget-board-button-primary-hover, ButtonFace)",
  },
  secondary: {
    "--button-bg":
      "var(--budget-board-button-secondary-background, ButtonFace)",
    "--button-color": "var(--budget-board-button-secondary-color, ButtonText)",
    "--button-hover": "var(--budget-board-button-secondary-hover, Canvas)",
  },
  danger: {
    "--button-bg": "var(--budget-board-button-danger-background, ButtonFace)",
    "--button-color": "var(--budget-board-button-danger-color, ButtonText)",
    "--button-hover": "var(--budget-board-button-danger-hover, Canvas)",
  },
  ghost: {
    "--button-bg": "transparent",
    "--button-color": "var(--budget-board-button-ghost-color, CanvasText)",
    "--button-hover": "var(--budget-board-button-ghost-hover, ButtonFace)",
  },
};

export function Button({
  children,
  className,
  disabled,
  fullWidth = false,
  leftSection,
  loading = false,
  rightSection,
  size = "md",
  style,
  type = "button",
  variant = "primary",
  ...buttonProps
}: ButtonProps) {
  return (
    <UnstyledButton
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
      data-budget-board-size={size}
      data-budget-board-variant={variant}
      disabled={disabled ?? loading}
      style={{ ...variantStyles[variant], ...style }}
      type={type}
    >
      {loading && <span aria-hidden="true" className={classes.loader} />}
      {leftSection && <span className={classes.section}>{leftSection}</span>}
      <span>{children}</span>
      {rightSection && <span className={classes.section}>{rightSection}</span>}
    </UnstyledButton>
  );
}
