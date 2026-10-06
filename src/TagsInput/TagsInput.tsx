import { TagsInput as MantineTagsInput } from "@mantine/core";
import type { TagsInputProps as MantineTagsInputProps } from "@mantine/core";
import type { CSSProperties } from "react";
import { budgetBoardColors } from "../colors";
import {
  ensureMantineProvider,
  mergeInputStyles,
  useBBUIInputStyles,
} from "../shared/inputStyles";
import {
  getComboboxDropdownStyle,
  mergeComboboxStyles,
  mergeComponentComboboxClassNames,
} from "../shared/comboboxStyles";
import comboboxClasses from "../shared/comboboxStyles.module.css";
import classes from "./TagsInput.module.css";

export type TagsInputProps = MantineTagsInputProps;

export function TagsInput(props: TagsInputProps) {
  const {
    className,
    classNames,
    comboboxProps,
    styles,
    wrapperProps,
    ...tagsInputProps
  } = props;
  const inputStyles = useBBUIInputStyles();
  const colors = budgetBoardColors[inputStyles.colorScheme];
  const wrapperStyle = {
    ...inputStyles.wrapperStyle,
    "--bbui-tags-pill-background": `var(--bb-color-surface-elevated, ${colors.surfaceElevated})`,
    "--bbui-tags-pill-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
    "--bbui-tags-pill-foreground": `var(--bb-color-text-primary, ${colors.textPrimary})`,
  } as CSSProperties;
  const { componentClassNames, comboboxClassNames } =
    mergeComponentComboboxClassNames(
      classNames,
      {
        root: `${inputStyles.classes.root} ${classes.root}`,
        input: inputStyles.classes.input,
        inputField: classes.inputField,
        pill: classes.pill,
        dropdown: comboboxClasses.dropdown,
        option: comboboxClasses.option,
      },
      comboboxProps?.classNames,
    );
  const componentStyles = mergeInputStyles(styles, "root", wrapperStyle);
  const nestedStyles = mergeComboboxStyles(
    componentStyles,
    comboboxProps?.styles,
    getComboboxDropdownStyle(inputStyles.colorScheme),
  );

  const control = (
    <MantineTagsInput
      {...tagsInputProps}
      className={className}
      classNames={componentClassNames}
      comboboxProps={{
        ...comboboxProps,
        classNames: comboboxClassNames as NonNullable<
          NonNullable<typeof comboboxProps>["classNames"]
        >,
        styles: nestedStyles as NonNullable<
          NonNullable<typeof comboboxProps>["styles"]
        >,
      }}
      styles={componentStyles}
      wrapperProps={inputStyles.getWrapperProps(wrapperProps)}
    />
  );

  return ensureMantineProvider(control, inputStyles.hasMantineContext);
}
