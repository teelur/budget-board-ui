import { Textarea as MantineTextarea } from "@mantine/core";
import type { TextareaProps as MantineTextareaProps } from "@mantine/core";
import {
  ensureMantineProvider,
  mergeInputClassNames,
  useBBUIInputStyles,
} from "../shared/inputStyles";

export type TextareaProps = MantineTextareaProps;

export function Textarea(props: TextareaProps) {
  const { className, classNames, style, wrapperProps, ...textareaProps } =
    props;
  const inputStyles = useBBUIInputStyles();

  const control = (
    <MantineTextarea
      {...textareaProps}
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
