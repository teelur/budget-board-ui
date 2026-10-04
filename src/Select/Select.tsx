import { Select as MantineSelect } from "@mantine/core";
import type { SelectProps as MantineSelectProps } from "@mantine/core";
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

export type SelectProps = MantineSelectProps;

export function Select(props: SelectProps) {
  const {
    className,
    classNames,
    comboboxProps,
    styles,
    wrapperProps,
    ...selectProps
  } = props;
  const inputStyles = useBBUIInputStyles();
  const { componentClassNames, comboboxClassNames } =
    mergeComponentComboboxClassNames(
      classNames,
      {
        root: inputStyles.classes.root,
        input: inputStyles.classes.input,
        dropdown: comboboxClasses.dropdown,
        option: comboboxClasses.option,
      },
      comboboxProps?.classNames,
    );
  const componentStyles = mergeInputStyles(
    styles,
    "root",
    inputStyles.wrapperStyle,
  );
  const nestedStyles = mergeComboboxStyles(
    componentStyles,
    comboboxProps?.styles,
    getComboboxDropdownStyle(inputStyles.colorScheme),
  );

  const control = (
    <MantineSelect
      {...selectProps}
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