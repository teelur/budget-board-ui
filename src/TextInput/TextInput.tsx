import { TextInput as MantineTextInput } from "@mantine/core";
import type { TextInputProps as MantineTextInputProps } from "@mantine/core";
import {
  ensureMantineProvider,
  mergeInputClassNames,
  mergeInputStyles,
  useBBUIInputStyles,
} from "../shared/inputStyles";

export type TextInputProps = MantineTextInputProps;

export function TextInput(props: TextInputProps) {
  const { className, classNames, styles, wrapperProps, ...textInputProps } =
    props;
  const inputStyles = useBBUIInputStyles();

  const control = (
    <MantineTextInput
      {...textInputProps}
      className={className}
      classNames={mergeInputClassNames(classNames, {
        root: inputStyles.classes.root,
        input: inputStyles.classes.input,
      })}
      styles={mergeInputStyles(styles, "root", inputStyles.wrapperStyle)}
      wrapperProps={inputStyles.getWrapperProps(wrapperProps)}
    />
  );

  return ensureMantineProvider(control, inputStyles.hasMantineContext);
}
