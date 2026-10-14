import { forwardRef } from "react";
import {
  Alert as MantineAlert,
  type AlertProps as MantineAlertProps,
} from "@mantine/core";
import { buttonColors, type ButtonColor } from "../shared/buttonStyles";
import { ensureBBUIMantineProvider, useBBUITheme } from "../shared/themeStyles";
import classes from "./Alert.module.css";

export const alertColors = buttonColors;
export type AlertColor = ButtonColor | NonNullable<MantineAlertProps["color"]>;

export const alertVariants = [
  "filled",
  "light",
  "outline",
  "default",
  "transparent",
  "white",
] as const;
export type AlertVariant = (typeof alertVariants)[number];

export type AlertProps = Omit<MantineAlertProps, "color"> & {
  color?: AlertColor;
};

function isSemanticColor(color: AlertColor): color is ButtonColor {
  return (
    typeof color === "string" &&
    (alertColors as readonly string[]).includes(color)
  );
}

function getSemanticVariables(
  color: ButtonColor,
  variant: string | undefined,
  colors: ReturnType<typeof useBBUITheme>["colors"],
  colorScheme: ReturnType<typeof useBBUITheme>["colorScheme"],
) {
  const background = `var(--bb-color-${color}, ${colors[color]})`;
  const content = `var(--bb-color-${color}-content, ${colors[`${color}Content` as keyof typeof colors]})`;
  const surface = `var(--bb-color-surface, ${colors.surface})`;
  const text = `var(--bb-color-text-primary, ${colors.textPrimary})`;
  const whiteSurfaceText =
    colorScheme === "dark"
      ? `var(--bb-color-text-inverse, ${colors.textInverse})`
      : text;
  const border = `var(--bb-color-border-subtle, ${colors.borderSubtle})`;

  switch (variant ?? "light") {
    case "filled":
      return {
        root: {
          "--alert-bg": background,
          "--alert-color": content,
          "--alert-bd": `1px solid ${background}`,
        },
      };
    case "light":
      return {
        root: {
          "--alert-bg": `color-mix(in srgb, ${background} 12%, ${surface})`,
          "--alert-color": background,
          "--alert-bd": `1px solid color-mix(in srgb, ${background} 28%, ${border})`,
        },
      };
    case "outline":
      return {
        root: {
          "--alert-bg": "transparent",
          "--alert-color": background,
          "--alert-bd": `1px solid ${background}`,
        },
      };
    case "transparent":
      return {
        root: {
          "--alert-bg": "transparent",
          "--alert-color": background,
          "--alert-bd": "1px solid transparent",
        },
      };
    case "default":
      return {
        root: {
          "--alert-bg": surface,
          "--alert-color": background,
          "--alert-bd": `1px solid ${border}`,
        },
      };
    case "white":
      return {
        root: {
          "--alert-bg": "var(--mantine-color-white, #fff)",
          "--alert-color": whiteSurfaceText,
          "--alert-bd": `1px solid color-mix(in srgb, ${background} 28%, ${border})`,
        },
      };
    default:
      return undefined;
  }
}

const AlertRoot = forwardRef<HTMLDivElement, AlertProps>(function AlertRoot(
  { className, color, vars, ...props },
  ref,
) {
  const { colorScheme, colors, hasMantineContext } = useBBUITheme();
  const semanticColor =
    color === undefined ? "info" : isSemanticColor(color) ? color : undefined;

  const mergedVars: NonNullable<AlertProps["vars"]> = (
    theme,
    alertProps,
    ctx,
  ) => {
    const consumerVars = vars?.(theme, alertProps, ctx);
    if (!semanticColor) {
      return {
        ...consumerVars,
        root: { ...consumerVars?.root },
      };
    }

    const semanticVars = getSemanticVariables(
      semanticColor,
      alertProps.variant,
      colors,
      colorScheme,
    );

    if (!semanticVars) {
      return {
        ...consumerVars,
        root: { ...consumerVars?.root },
      };
    }

    return {
      ...semanticVars,
      ...consumerVars,
      root: {
        ...semanticVars.root,
        ...consumerVars?.root,
      },
    };
  };

  const alert = (
    <MantineAlert
      {...props}
      className={[classes.root, className].filter(Boolean).join(" ")}
      data-budget-board-alert-color={semanticColor}
      ref={ref}
      vars={mergedVars}
      {...(color === undefined ? {} : { color })}
    />
  );

  return ensureBBUIMantineProvider(alert, hasMantineContext, colorScheme);
});

export const Alert = AlertRoot;
