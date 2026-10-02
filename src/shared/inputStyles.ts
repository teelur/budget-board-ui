import { createElement, useContext } from "react";
import type { CSSProperties, ReactElement } from "react";
import { MantineContext, MantineProvider } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { budgetBoardColors } from "../colors";
import classes from "./inputStyles.module.css";

type InputClassNames = Record<string, string | undefined>;

function mergeClassNames(
  defaults: InputClassNames,
  consumerClassNames?: InputClassNames,
): InputClassNames {
  const merged = { ...consumerClassNames };

  for (const [slot, defaultClassName] of Object.entries(defaults)) {
    merged[slot] = [defaultClassName, consumerClassNames?.[slot]]
      .filter(Boolean)
      .join(" ");
  }

  return merged;
}

export function mergeInputClassNames<T>(
  classNames: T | undefined,
  defaults: InputClassNames,
): T {
  if (typeof classNames === "function") {
    const resolveClassNames = classNames as unknown as (
      ...args: unknown[]
    ) => InputClassNames;

    return ((...args: unknown[]) =>
      mergeClassNames(defaults, resolveClassNames(...args))) as T;
  }

  return mergeClassNames(
    defaults,
    classNames as InputClassNames | undefined,
  ) as T;
}

export function useBBUIInputStyles() {
  const mantineContext = useContext(MantineContext);
  const systemColorScheme = useColorScheme("light");
  const colorScheme =
    mantineContext?.colorScheme === "auto"
      ? systemColorScheme
      : mantineContext?.colorScheme === "dark"
        ? "dark"
        : "light";
  const colors = budgetBoardColors[colorScheme];
  const wrapperStyle = {
    "--bbui-input-background": `var(--bb-color-surface-input, ${colors.surfaceInput})`,
    "--bbui-input-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
    "--bbui-input-focus": `var(--bb-color-focus-ring, ${colors.focusRing})`,
    "--bbui-input-foreground": `var(--bb-color-text-primary, ${colors.textPrimary})`,
    "--bbui-input-placeholder": `var(--bb-color-text-secondary, ${colors.textSecondary})`,
    "--bbui-input-control-hover": `var(--bb-color-surface-elevated, ${colors.surfaceElevated})`,
    "--bbui-input-control-color": `var(--bb-color-text-secondary, ${colors.textSecondary})`,
  } as CSSProperties;

  function getWrapperProps<
    T extends { style?: CSSProperties | undefined },
  >(
    wrapperProps?: T,
  ) {
    return {
      ...wrapperProps,
      "data-budget-board-color-scheme": colorScheme,
      style: {
        ...wrapperStyle,
        ...wrapperProps?.style,
      },
    } as T & {
      "data-budget-board-color-scheme": typeof colorScheme;
      style: CSSProperties;
    };
  }

  return {
    classes,
    getWrapperProps,
    hasMantineContext: mantineContext !== null,
  };
}

export function ensureMantineProvider(
  control: ReactElement,
  hasMantineContext: boolean,
): ReactElement {
  return hasMantineContext
    ? control
    : createElement(MantineProvider, null, control);
}