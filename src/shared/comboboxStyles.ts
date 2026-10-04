import type { CSSProperties } from "react";
import { budgetBoardColors } from "../colors";
import { mergeInputClassNames } from "./inputStyles";

type ClassNames = Record<string, string | undefined>;

export function getComboboxDropdownStyle(
  colorScheme: "light" | "dark",
): CSSProperties {
  const colors = budgetBoardColors[colorScheme];

  return {
    backgroundColor: "var(--bbui-combobox-background)",
    "--bbui-combobox-background": `var(--bb-color-surface-elevated, ${colors.surfaceElevated})`,
    "--bbui-combobox-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
    "--bbui-combobox-foreground": `var(--bb-color-text-primary, ${colors.textPrimary})`,
    "--bbui-combobox-secondary-foreground": `var(--bb-color-text-secondary, ${colors.textSecondary})`,
    "--bbui-combobox-hover": `var(--bb-color-surface-input, ${colors.surfaceInput})`,
    "--bbui-combobox-selected": `var(--bb-color-selection, ${colors.selection})`,
    "--bbui-combobox-focus": `var(--bb-color-focus-ring, ${colors.focusRing})`,
  } as CSSProperties;
}

function resolveClassNames(classNames: unknown, args: unknown[]): ClassNames {
  const resolved =
    typeof classNames === "function" ? classNames(...args) : classNames;

  return resolved && typeof resolved === "object"
    ? (resolved as ClassNames)
    : {};
}

export function mergeComponentComboboxClassNames<TClassNames>(
  classNames: TClassNames | undefined,
  defaults: ClassNames,
  comboboxClassNames: unknown,
): {
  componentClassNames: TClassNames;
  comboboxClassNames: TClassNames;
} {
  const mergedClassNames = mergeInputClassNames(classNames, defaults);
  let resolvedComponentClassNames: ClassNames =
    typeof mergedClassNames === "function"
      ? {}
      : (mergedClassNames as ClassNames);
  const componentClassNames =
    typeof mergedClassNames === "function"
      ? (((...args: unknown[]) => {
          resolvedComponentClassNames = resolveClassNames(
            mergedClassNames,
            args,
          );
          return resolvedComponentClassNames;
        }) as TClassNames)
      : (mergedClassNames as TClassNames);
  const nestedClassNames = ((...args: unknown[]) => {
    const nested = resolveClassNames(comboboxClassNames, args);
    const result: ClassNames = { ...nested };

    for (const slot of ["dropdown", "option"]) {
      result[slot] = [resolvedComponentClassNames[slot], nested[slot]]
        .filter(Boolean)
        .join(" ");
    }

    return result;
  }) as TClassNames;

  return {
    componentClassNames,
    comboboxClassNames: nestedClassNames,
  };
}

function resolveStyles(styles: unknown, args: unknown[]) {
  const resolved = typeof styles === "function" ? styles(...args) : styles;

  return resolved && typeof resolved === "object"
    ? (resolved as Record<string, CSSProperties | undefined>)
    : {};
}

export function mergeComboboxStyles<TStyles>(
  componentStyles: unknown,
  comboboxStyles: unknown,
  dropdownStyle: CSSProperties,
): TStyles {
  return ((...args: unknown[]) => {
    const component = resolveStyles(componentStyles, args);
    const combobox = resolveStyles(comboboxStyles, args);

    return {
      ...component,
      ...combobox,
      dropdown: {
        ...dropdownStyle,
        ...component.dropdown,
        ...combobox.dropdown,
      },
    };
  }) as TStyles;
}