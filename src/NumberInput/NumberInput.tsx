import { NumberInput as MantineNumberInput } from "@mantine/core";
import type {
  NumberInputNumericType as MantineNumberInputNumericType,
  NumberInputProps as MantineNumberInputProps,
  NumberInputStylesNames as MantineNumberInputStylesNames,
} from "@mantine/core";
import {
  ensureMantineProvider,
  mergeInputClassNames,
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
  const { className, classNames, style, wrapperProps, ...numberInputProps } =
    props;
  const inputStyles = useBBUIInputStyles();

  const control = (
    <MantineNumberInput<T>
      {...numberInputProps}
      className={[inputStyles.classes.root, componentClasses.root, className]
        .filter(Boolean)
        .join(" ")}
      classNames={mergeInputClassNames(classNames, {
        input: inputStyles.classes.input,
        controls: componentClasses.controls,
        control: componentClasses.control,
      })}
      style={style}
      wrapperProps={inputStyles.getWrapperProps(wrapperProps)}
    />
  );

  return ensureMantineProvider(control, inputStyles.hasMantineContext);
}
