import { Autocomplete as MantineAutocomplete } from "@mantine/core";
import type { AutocompleteProps as MantineAutocompleteProps } from "@mantine/core";
import type { CSSProperties } from "react";
import { budgetBoardColors } from "../colors";
import {
  ensureMantineProvider,
  mergeInputClassNames,
  mergeInputStyles,
  useBBUIInputStyles,
} from "../shared/inputStyles";
import classes from "./Autocomplete.module.css";

export type AutocompleteProps = MantineAutocompleteProps;

function resolveClassNames(
  classNames: unknown,
  args: unknown[],
): Record<string, string | undefined> {
  const resolved =
    typeof classNames === "function" ? classNames(...args) : classNames;

  return resolved && typeof resolved === "object"
    ? (resolved as Record<string, string | undefined>)
    : {};
}

function mergeAutocompleteClassNames<TClassNames>(
  getAutocompleteClassNames: () => Record<string, string | undefined>,
  comboboxClassNames: unknown,
): TClassNames {
  return ((...args: unknown[]) => {
    const merged: Record<string, string | undefined> = {};
    const autocomplete = getAutocompleteClassNames();
    const combobox = resolveClassNames(comboboxClassNames, args);

    for (const slot of ["dropdown", "option"]) {
      merged[slot] = [autocomplete[slot], combobox[slot]]
        .filter(Boolean)
        .join(" ");
    }

    return merged;
  }) as TClassNames;
}

function resolveStyles(
  styles: unknown,
  args: unknown[],
): Record<string, CSSProperties | undefined> {
  const resolved = typeof styles === "function" ? styles(...args) : styles;

  return resolved && typeof resolved === "object"
    ? (resolved as Record<string, CSSProperties | undefined>)
    : {};
}

function mergeAutocompleteStyles<TStyles>(
  autocompleteStyles: unknown,
  comboboxStyles: unknown,
  dropdownStyle: CSSProperties,
): TStyles {
  return ((...args: unknown[]) => {
    const autocomplete = resolveStyles(autocompleteStyles, args);
    const combobox = resolveStyles(comboboxStyles, args);

    return {
      ...autocomplete,
      ...combobox,
      dropdown: {
        ...dropdownStyle,
        ...autocomplete.dropdown,
        ...combobox.dropdown,
      },
    };
  }) as TStyles;
}

export function Autocomplete(props: AutocompleteProps) {
  const {
    className,
    classNames,
    comboboxProps,
    styles,
    wrapperProps,
    ...autocompleteProps
  } = props;
  const inputStyles = useBBUIInputStyles();
  const colors = budgetBoardColors[inputStyles.colorScheme];
  const dropdownStyle = {
    "--bbui-autocomplete-background": `var(--bb-color-surface-elevated, ${colors.surfaceElevated})`,
    "--bbui-autocomplete-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
    "--bbui-autocomplete-foreground": `var(--bb-color-text-primary, ${colors.textPrimary})`,
    "--bbui-autocomplete-hover": `var(--bb-color-surface-input, ${colors.surfaceInput})`,
    "--bbui-autocomplete-selected": `var(--bb-color-selection, ${colors.selection})`,
    "--bbui-autocomplete-focus": `var(--bb-color-focus-ring, ${colors.focusRing})`,
  } as CSSProperties;
  const autocompleteClassNames = mergeInputClassNames(classNames, {
    root: inputStyles.classes.root,
    input: inputStyles.classes.input,
    dropdown: classes.dropdown,
    option: classes.option,
  });
  let resolvedAutocompleteClassNames: Record<string, string | undefined> =
    typeof autocompleteClassNames === "function"
      ? {}
      : (autocompleteClassNames as Record<string, string | undefined>);
  const classNamesForAutocomplete =
    typeof autocompleteClassNames === "function"
      ? (((...args: unknown[]) => {
          resolvedAutocompleteClassNames = resolveClassNames(
            autocompleteClassNames,
            args,
          );
          return resolvedAutocompleteClassNames;
        }) as typeof autocompleteClassNames)
      : autocompleteClassNames;
  const autocompleteStyles = mergeInputStyles(
    styles,
    "root",
    inputStyles.wrapperStyle,
  );

  const control = (
    <MantineAutocomplete
      {...autocompleteProps}
      className={className}
      classNames={classNamesForAutocomplete}
      comboboxProps={{
        ...comboboxProps,
        classNames: mergeAutocompleteClassNames(
          () => resolvedAutocompleteClassNames,
          comboboxProps?.classNames,
        ) as NonNullable<NonNullable<typeof comboboxProps>["classNames"]>,
        styles: mergeAutocompleteStyles<
          NonNullable<NonNullable<typeof comboboxProps>["styles"]>
        >(autocompleteStyles, comboboxProps?.styles, dropdownStyle),
      }}
      styles={autocompleteStyles}
      wrapperProps={inputStyles.getWrapperProps(wrapperProps)}
    />
  );

  return ensureMantineProvider(control, inputStyles.hasMantineContext);
}
