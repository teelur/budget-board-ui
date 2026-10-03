import { PasswordInput as MantinePasswordInput } from "@mantine/core";
import type { PasswordInputProps as MantinePasswordInputProps } from "@mantine/core";
import {
  ensureMantineProvider,
  mergeInputClassNames,
  mergeInputStyles,
  useBBUIInputStyles,
} from "../shared/inputStyles";
import componentClasses from "./PasswordInput.module.css";

export type PasswordInputProps = MantinePasswordInputProps;

export function PasswordInput(props: PasswordInputProps) {
  const { className, classNames, styles, wrapperProps, ...passwordInputProps } =
    props;
  const inputStyles = useBBUIInputStyles();

  const control = (
    <MantinePasswordInput
      {...passwordInputProps}
      classNames={mergeInputClassNames(classNames, {
        root: [inputStyles.classes.root, componentClasses.root]
          .filter(Boolean)
          .join(" "),
        input: inputStyles.classes.input,
        innerInput: componentClasses.innerInput,
        visibilityToggle: componentClasses.visibilityToggle,
      })}
      styles={mergeInputStyles(styles, "root", inputStyles.wrapperStyle)}
      className={className}
      wrapperProps={inputStyles.getWrapperProps(wrapperProps)}
    />
  );

  return ensureMantineProvider(control, inputStyles.hasMantineContext);
}
