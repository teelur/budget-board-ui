import { MonthPickerInput as MantineMonthPickerInput } from "@mantine/dates";
import type {
  DatePickerType,
  MonthPickerInputProps as MantineMonthPickerInputProps,
} from "@mantine/dates";
import {
  ensureMantineProvider,
  mergeInputClassNames,
  mergeInputStyles,
  mergeInputModalProps,
  mergeInputPopoverProps,
  useBBUIInputStyles,
} from "../shared/inputStyles";
import popoverClasses from "../shared/datePickerStyles.module.css";

export type MonthPickerInputProps<Type extends DatePickerType = "default"> =
  MantineMonthPickerInputProps<Type>;

export function MonthPickerInput<Type extends DatePickerType = "default">(
  props: MonthPickerInputProps<Type>,
) {
  const {
    className,
    classNames,
    modalProps,
    popoverProps,
    ref,
    styles,
    wrapperProps,
    ...monthPickerInputProps
  } = props;
  const inputStyles = useBBUIInputStyles();

  const control = (
    <MantineMonthPickerInput<Type>
      {...monthPickerInputProps}
      {...(ref === undefined ? {} : { ref })}
      className={className}
      classNames={mergeInputClassNames(classNames, {
        root: inputStyles.classes.root,
        input: inputStyles.classes.input,
        placeholder: inputStyles.classes.placeholder,
      })}
      styles={mergeInputStyles(styles, "root", inputStyles.wrapperStyle)}
      modalProps={mergeInputModalProps(
        modalProps,
        popoverClasses.dropdown!,
        inputStyles.calendarDropdownStyle,
      )}
      popoverProps={mergeInputPopoverProps(
        popoverProps,
        popoverClasses.dropdown!,
        inputStyles.calendarDropdownStyle,
      )}
      wrapperProps={inputStyles.getWrapperProps(wrapperProps)}
    />
  );

  return ensureMantineProvider(control, inputStyles.hasMantineContext);
}
