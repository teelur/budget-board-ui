import {
  useContext,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type ReactNode,
} from "react";
import { MantineContext, MantineProvider, UnstyledButton } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import type { UnstyledButtonProps } from "@mantine/core";
import {
  getButtonVariantStyles,
  type ButtonColor,
  type ButtonVariant,
} from "../shared/buttonStyles";
import { budgetBoardColors } from "../colors";
import classes from "./ActionIcon.module.css";

export const actionIconSizes = [
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
export type ActionIconSize =
  | (typeof actionIconSizes)[number]
  | number
  | (string & {});

export interface ActionIconProps
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
  loading?: boolean;
  size?: ActionIconSize;
  color?: ButtonColor;
  variant?: ButtonVariant;
  style?: UnstyledButtonProps["style"];
}

export function ActionIcon({
  selected,
  children,
  className,
  color = "primary",
  disabled,
  loading = false,
  size = "md",
  style,
  type = "button",
  variant = "filled",
  ...buttonProps
}: ActionIconProps) {
  const isTab = buttonProps.role === "tab";
  const mantineContext = useContext(MantineContext);
  const systemColorScheme = useColorScheme("light");
  const colorScheme =
    mantineContext?.colorScheme === "auto"
      ? systemColorScheme
      : mantineContext?.colorScheme === "dark"
        ? "dark"
        : "light";
  const sizeClass =
    typeof size === "string" &&
    actionIconSizes.includes(size as (typeof actionIconSizes)[number])
      ? classes[size]
      : undefined;
  const sizeStyle: CSSProperties | undefined =
    typeof size === "number" || !sizeClass
      ? ({
          "--bbui-action-icon-size":
            typeof size === "number" ? `${size}px` : size,
        } as CSSProperties)
      : undefined;

  const actionIcon = (
    <UnstyledButton
      {...buttonProps}
      {...(selected === undefined || isTab ? {} : { "aria-pressed": selected })}
      aria-busy={loading || undefined}
      className={[
        classes.root,
        sizeClass,
        selected && classes.selected,
        loading && classes.loading,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-budget-board-action-icon-size={size}
      data-budget-board-color={color}
      data-budget-board-selected={
        selected === undefined ? undefined : selected ? "true" : "false"
      }
      data-budget-board-variant={variant}
      disabled={disabled || loading}
      style={[
        sizeStyle,
        getButtonVariantStyles(budgetBoardColors[colorScheme], color, variant),
        style,
      ]}
      type={type}
      unstyled
    >
      {loading && <span aria-hidden="true" className={classes.loader} />}
      <span className={classes.icon}>{children}</span>
    </UnstyledButton>
  );

  return mantineContext ? (
    actionIcon
  ) : (
    <MantineProvider>{actionIcon}</MantineProvider>
  );
}
