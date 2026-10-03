import { FileInput as MantineFileInput } from "@mantine/core";
import type { FileInputProps as MantineFileInputProps } from "@mantine/core";
import {
  ensureMantineProvider,
  mergeInputClassNames,
  mergeInputStyles,
  useBBUIInputStyles,
} from "../shared/inputStyles";

export type FileInputProps<Multiple extends boolean = false> =
  MantineFileInputProps<Multiple>;

export function FileInput<Multiple extends boolean = false>(
  props: FileInputProps<Multiple>,
) {
  const { className, classNames, styles, wrapperProps, ...fileInputProps } =
    props;
  const inputStyles = useBBUIInputStyles();

  const control = (
    <MantineFileInput<Multiple>
      {...fileInputProps}
      className={className}
      classNames={mergeInputClassNames(classNames, {
        root: inputStyles.classes.root,
        input: inputStyles.classes.input,
        placeholder: inputStyles.classes.placeholder,
      })}
      styles={mergeInputStyles(styles, "root", inputStyles.wrapperStyle)}
      wrapperProps={inputStyles.getWrapperProps(wrapperProps)}
    />
  );

  return ensureMantineProvider(control, inputStyles.hasMantineContext);
}
