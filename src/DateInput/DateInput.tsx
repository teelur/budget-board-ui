import { DateInput as MantineDateInput } from "@mantine/dates";
import type { DateInputProps as MantineDateInputProps } from "@mantine/dates";
import {
  ensureMantineProvider,
  mergeInputClassNames,
  mergeInputPopoverProps,
  useBBUIInputStyles,
} from "../shared/inputStyles";
import popoverClasses from "../shared/datePickerStyles.module.css";

export type DateInputProps = MantineDateInputProps;

export function DateInput(props: DateInputProps) {
  const {
    className,
    classNames,
    popoverProps,
    style,
    wrapperProps,
    ...dateInputProps
  } = props;
  const inputStyles = useBBUIInputStyles();

  const control = (
    <MantineDateInput
      {...dateInputProps}
      firstDayOfWeek={dateInputProps.firstDayOfWeek ?? 0}
      className={className}
      classNames={mergeInputClassNames(classNames, {
        root: inputStyles.classes.root,
        input: inputStyles.classes.input,
      })}
      popoverProps={mergeInputPopoverProps(
        popoverProps,
        popoverClasses.dropdown!,
        inputStyles.calendarDropdownStyle,
      )}
      style={style}
      wrapperProps={inputStyles.getWrapperProps(wrapperProps)}
    />
  );

  return ensureMantineProvider(control, inputStyles.hasMantineContext);
}
