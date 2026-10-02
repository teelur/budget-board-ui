import { PasswordInput as MantinePasswordInput } from "@mantine/core";
import type { PasswordInputProps as MantinePasswordInputProps } from "@mantine/core";
import {
  ensureMantineProvider,
  mergeInputClassNames,
  useBBUIInputStyles,
} from "../shared/inputStyles";
import componentClasses from "./PasswordInput.module.css";

export type PasswordInputProps = MantinePasswordInputProps;

export function PasswordInput(props: PasswordInputProps) {
  const { className, classNames, style, wrapperProps, ...passwordInputProps } =
    props;
  const inputStyles = useBBUIInputStyles();

  const control = (
    <MantinePasswordInput
      {...passwordInputProps}
      className={[inputStyles.classes.root, componentClasses.root, className]
        .filter(Boolean)
        .join(" ")}
      classNames={mergeInputClassNames(classNames, {
        input: inputStyles.classes.input,
        innerInput: componentClasses.innerInput,
        visibilityToggle: componentClasses.visibilityToggle,
      })}
      style={style}
      wrapperProps={inputStyles.getWrapperProps(wrapperProps)}
    />
  );

  return ensureMantineProvider(control, inputStyles.hasMantineContext);
}
