import { Combobox as MantineCombobox } from "@mantine/core";
import type { ComboboxProps as MantineComboboxProps } from "@mantine/core";
import type { ReactElement } from "react";
import {
  ensureMantineProvider,
  mergeInputClassNames,
  mergeInputStyles,
  useBBUIInputStyles,
} from "../shared/inputStyles";
import { getComboboxDropdownStyle } from "../shared/comboboxStyles";
import comboboxClasses from "../shared/comboboxStyles.module.css";

export type ComboboxProps = MantineComboboxProps;
export type {
  ComboboxStore,
  ComboboxStylesNames,
  UseComboboxOptions,
} from "@mantine/core";
export { useCombobox } from "@mantine/core";

function ComboboxRoot({
  classNames,
  styles,
  ...props
}: ComboboxProps): ReactElement {
  const inputStyles = useBBUIInputStyles();
  const componentClassNames = mergeInputClassNames(classNames, {
    dropdown: comboboxClasses.dropdown,
    option: comboboxClasses.option,
  });
  const componentStyles = mergeInputStyles(
    styles,
    "dropdown",
    getComboboxDropdownStyle(inputStyles.colorScheme),
  );

  const control = (
    <MantineCombobox
      {...props}
      classNames={componentClassNames}
      styles={componentStyles}
    />
  );

  return ensureMantineProvider(control, inputStyles.hasMantineContext);
}

export const Combobox: typeof MantineCombobox & typeof ComboboxRoot =
  Object.assign(ComboboxRoot, MantineCombobox);
