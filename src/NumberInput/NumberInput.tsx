import { NumberInput as MantineNumberInput } from "@mantine/core";
import type {
  NumberInputNumericType as MantineNumberInputNumericType,
  NumberInputProps as MantineNumberInputProps,
  NumberInputStylesNames as MantineNumberInputStylesNames,
} from "@mantine/core";
import {
  ensureMantineProvider,
  mergeInputClassNames,
  mergeInputStyles,
  useBBUIInputStyles,
} from "../shared/inputStyles";
import componentClasses from "./NumberInput.module.css";

export type NumberInputProps<T extends MantineNumberInputNumericType = number> =
  MantineNumberInputProps<T>;

export type NumberInputValue<T extends MantineNumberInputNumericType = number> =
  | T
  | string;

export type {
  NumberInputHandlers,
  NumberInputMode,
  NumberInputNumericType,
} from "@mantine/core";

export function NumberInput<T extends MantineNumberInputNumericType = number>(
  props: NumberInputProps<T>,
) {
  const { className, classNames, styles, wrapperProps, ...numberInputProps } =
    props;
  const inputStyles = useBBUIInputStyles();

  const control = (
    <MantineNumberInput<T>
      {...numberInputProps}
      className={className}
      classNames={mergeInputClassNames(classNames, {
        root: [inputStyles.classes.root, componentClasses.root].join(" "),
        input: inputStyles.classes.input,
        controls: componentClasses.controls,
        control: componentClasses.control,
      })}
      styles={mergeInputStyles(styles, "root", inputStyles.wrapperStyle)}
      wrapperProps={inputStyles.getWrapperProps(wrapperProps)}
    />
  );

  return ensureMantineProvider(control, inputStyles.hasMantineContext);
}
