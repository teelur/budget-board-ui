import { DatePickerInput as MantineDatePickerInput } from "@mantine/dates";
import type {
  DatePickerInputProps as MantineDatePickerInputProps,
  DatePickerType,
} from "@mantine/dates";
import {
  ensureMantineProvider,
  mergeInputClassNames,
  mergeInputPopoverProps,
  useBBUIInputStyles,
} from "../shared/inputStyles";
import popoverClasses from "../shared/datePickerStyles.module.css";

export type DatePickerInputProps<Type extends DatePickerType = "default"> =
  MantineDatePickerInputProps<Type>;

export function DatePickerInput<Type extends DatePickerType = "default">(
  props: DatePickerInputProps<Type>,
) {
  const {
    className,
    classNames,
    popoverProps,
    ref,
    style,
    wrapperProps,
    ...datePickerInputProps
  } = props;
  const inputStyles = useBBUIInputStyles();

  const control = (
    <MantineDatePickerInput<Type>
      {...datePickerInputProps}
      firstDayOfWeek={datePickerInputProps.firstDayOfWeek ?? 0}
      {...(ref === undefined ? {} : { ref })}
      className={className}
      classNames={mergeInputClassNames(classNames, {
        root: inputStyles.classes.root,
        input: inputStyles.classes.input,
      })}
      popoverProps={mergeInputPopoverProps(
        popoverProps,
        `${popoverClasses.dropdown} ${popoverClasses[inputStyles.colorScheme]}`,
      )}
      style={style}
      wrapperProps={inputStyles.getWrapperProps(wrapperProps)}
    />
  );

  return ensureMantineProvider(control, inputStyles.hasMantineContext);
}
