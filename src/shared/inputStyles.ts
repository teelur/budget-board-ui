import { createElement, useContext } from "react";
import type { CSSProperties, ReactElement } from "react";
import { MantineContext, MantineProvider } from "@mantine/core";
import type { ModalProps, PopoverProps } from "@mantine/core";
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

export function mergeInputStyles<TStyles>(
  styles: TStyles | undefined,
  slot: string,
  slotStyle: CSSProperties,
): NonNullable<TStyles> {
  const mergeSlot = (consumerStyles: unknown) => {
    const stylesBySlot = consumerStyles as
      | Record<string, CSSProperties | undefined>
      | undefined;

    return {
      ...stylesBySlot,
      [slot]: {
        ...slotStyle,
        ...stylesBySlot?.[slot],
      },
    };
  };

  if (typeof styles === "function") {
    const resolveStyles = styles as unknown as (...args: unknown[]) => unknown;
    return ((...args: unknown[]) =>
      mergeSlot(resolveStyles(...args))) as NonNullable<TStyles>;
  }

  return mergeSlot(styles) as NonNullable<TStyles>;
}

export function mergeInputPopoverProps(
  popoverProps: Partial<Omit<PopoverProps, "children">> | undefined,
  dropdownClassName: string,
  dropdownStyle: CSSProperties,
): Partial<Omit<PopoverProps, "children">> {
  const popoverStyles = popoverProps?.styles;
  const mergeStyles: NonNullable<PopoverProps["styles"]> = mergeInputStyles(
    popoverStyles,
    "dropdown",
    dropdownStyle,
  );

  return {
    ...popoverProps,
    classNames: mergeInputClassNames(popoverProps?.classNames, {
      dropdown: dropdownClassName,
    }),
    styles: mergeStyles,
  };
}

export function mergeInputModalProps(
  modalProps: Partial<Omit<ModalProps, "children">> | undefined,
  dropdownClassName: string,
  dropdownStyle: CSSProperties,
): Partial<Omit<ModalProps, "children">> {
  const modalStyles = modalProps?.styles;
  const mergeStyles: NonNullable<ModalProps["styles"]> = mergeInputStyles(
    modalStyles,
    "content",
    dropdownStyle,
  );

  return {
    ...modalProps,
    classNames: mergeInputClassNames(modalProps?.classNames, {
      content: dropdownClassName,
    }),
    styles: mergeStyles,
  };
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
    "--bbui-input-placeholder": `var(--bb-color-text-muted, ${colors.textMuted})`,
    "--bbui-input-control-hover": `var(--bb-color-surface-hover, ${colors.surfaceHover})`,
    "--bbui-input-control-hover-border": `var(--bb-color-border-strong, ${colors.borderStrong})`,
    "--bbui-input-control-color": `var(--bb-color-text-secondary, ${colors.textSecondary})`,
  } as CSSProperties;
  const calendarDropdownStyle = {
    backgroundColor: "var(--bbui-calendar-background)",
    "--bbui-calendar-background": `var(--bb-color-surface-elevated, ${colors.surfaceElevated})`,
    "--bbui-calendar-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
    "--bbui-calendar-foreground": `var(--bb-color-text-primary, ${colors.textPrimary})`,
    "--bbui-calendar-muted": `var(--bb-color-text-secondary, ${colors.textSecondary})`,
    "--bbui-calendar-hover": `var(--bb-color-surface-hover, ${colors.surfaceHover})`,
    "--bbui-calendar-primary": `var(--bb-color-primary, ${colors.primary})`,
    "--bbui-calendar-selection": `var(--bb-color-selection, ${colors.selection})`,
    "--bbui-calendar-selection-foreground": `var(--bb-color-text-primary, ${colors.textPrimary})`,
    "--bbui-calendar-focus": `var(--bb-color-focus-ring, ${colors.focusRing})`,
  } as CSSProperties;

  function getWrapperProps<T extends { style?: CSSProperties | undefined }>(
    wrapperProps?: T,
  ) {
    return {
      ...wrapperProps,
      "data-budget-board-color-scheme": colorScheme,
    } as T & {
      "data-budget-board-color-scheme": typeof colorScheme;
    };
  }

  return {
    classes,
    colorScheme,
    wrapperStyle,
    calendarDropdownStyle,
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
