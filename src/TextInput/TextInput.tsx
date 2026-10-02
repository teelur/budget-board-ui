import { TextInput as MantineTextInput } from "@mantine/core";
import type { TextInputProps as MantineTextInputProps } from "@mantine/core";
import {
  ensureMantineProvider,
  mergeInputClassNames,
  useBBUIInputStyles,
} from "../shared/inputStyles";

export type TextInputProps = MantineTextInputProps;

export function TextInput(props: TextInputProps) {
  const { className, classNames, style, wrapperProps, ...textInputProps } =
    props;
  const inputStyles = useBBUIInputStyles();

  const control = (
    <MantineTextInput
      {...textInputProps}
      className={[inputStyles.classes.root, className]
        .filter(Boolean)
        .join(" ")}
      classNames={mergeInputClassNames(classNames, {
        input: inputStyles.classes.input,
      })}
      style={style}
      wrapperProps={inputStyles.getWrapperProps(wrapperProps)}
    />
  );

  return ensureMantineProvider(control, inputStyles.hasMantineContext);
}
