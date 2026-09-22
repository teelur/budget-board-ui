import { useContext, type ButtonHTMLAttributes, type ReactNode } from "react";
import { MantineContext, MantineProvider, UnstyledButton } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import type { UnstyledButtonProps } from "@mantine/core";
import {
  buttonColors,
  buttonVariants,
  getButtonVariantStyles,
} from "../shared/buttonStyles";
import type { ButtonColor, ButtonVariant } from "../shared/buttonStyles";
import { budgetBoardColors } from "../colors";
import classes from "./Button.module.css";

export { buttonColors, buttonVariants };
export type { ButtonColor, ButtonVariant };

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
      | "children"
      | "color"
      | "disabled"
      | "size"
      | "style"
      | "unstyled"
      | "variant"
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
  const systemColorScheme = useColorScheme("light");
  const colorScheme =
    mantineContext?.colorScheme === "auto"
      ? systemColorScheme
      : mantineContext?.colorScheme === "dark"
        ? "dark"
        : "light";

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
        getButtonVariantStyles(budgetBoardColors[colorScheme], color, variant),
        style,
      ]}
      type={type}
      unstyled
    >
      {loading && <span aria-hidden="true" className={classes.loader} />}
      {leftSection && <span className={classes.section}>{leftSection}</span>}
      <span className={classes.content}>{children}</span>
      {rightSection && <span className={classes.section}>{rightSection}</span>}
    </UnstyledButton>
  );

  return mantineContext ? button : <MantineProvider>{button}</MantineProvider>;
}
