import { PinInput as MantinePinInput } from "@mantine/core";
import type { PinInputProps as MantinePinInputProps } from "@mantine/core";
import {
  ensureMantineProvider,
  mergeInputClassNames,
  useBBUIInputStyles,
} from "../shared/inputStyles";

export type PinInputProps = MantinePinInputProps;

export function PinInput(props: PinInputProps) {
  const { className, classNames, ref, style, ...pinInputProps } = props;
  const inputStyles = useBBUIInputStyles();
  const rootProps = inputStyles.getWrapperProps();
  const mergedStyle: PinInputProps["style"] =
    style === undefined ? rootProps.style : [rootProps.style, style];

  const control = (
    <MantinePinInput
      {...pinInputProps}
      {...(ref === undefined ? {} : { ref })}
      className={className}
      classNames={mergeInputClassNames(classNames, {
        root: inputStyles.classes.root,
        input: inputStyles.classes.input,
      })}
      {...rootProps}
      style={mergedStyle}
    />
  );

  return ensureMantineProvider(control, inputStyles.hasMantineContext);
}
