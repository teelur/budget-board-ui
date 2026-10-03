import {
  Checkbox as MantineCheckbox,
  MantineContext,
  MantineProvider,
} from "@mantine/core";
import type {
  CheckboxProps as MantineCheckboxProps,
  CheckboxStylesNames,
} from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { useContext } from "react";
import { budgetBoardColors } from "../colors";
import classes from "./Checkbox.module.css";

export type CheckboxProps = MantineCheckboxProps;

type CheckboxClassNames = Partial<
  Record<CheckboxStylesNames, string | undefined>
>;

function mergeCheckboxClassNames(
  classNames: CheckboxProps["classNames"],
): NonNullable<CheckboxProps["classNames"]> {
  const merge = (consumerClassNames?: CheckboxClassNames) => ({
    ...consumerClassNames,
    input: [classes.input, consumerClassNames?.input].filter(Boolean).join(" "),
    label: [classes.label, consumerClassNames?.label].filter(Boolean).join(" "),
    description: [classes.description, consumerClassNames?.description]
      .filter(Boolean)
      .join(" "),
    error: [classes.error, consumerClassNames?.error].filter(Boolean).join(" "),
  });

  if (typeof classNames === "function") {
    return (theme, props, ctx) => merge(classNames(theme, props, ctx));
  }

  return merge(classNames);
}

export function Checkbox(props: CheckboxProps) {
  const {
    className,
    color: consumerColor,
    iconColor: consumerIconColor,
    wrapperProps,
    ...checkboxProps
  } = props;
  const { className: wrapperClassName, ...remainingWrapperProps } =
    wrapperProps ?? {};
  const mantineContext = useContext(MantineContext);
  const systemColorScheme = useColorScheme("light");
  const colorScheme =
    mantineContext?.colorScheme === "auto"
      ? systemColorScheme
      : mantineContext?.colorScheme === "dark"
        ? "dark"
        : "light";
  const colors = budgetBoardColors[colorScheme];
  const color = consumerColor ?? `var(--bb-color-primary, ${colors.primary})`;
  const iconColorProps =
    consumerIconColor !== undefined
      ? { iconColor: consumerIconColor }
      : consumerColor === undefined
        ? {
            iconColor:
              `var(--bb-color-primary-content, ${colors.primaryContent})` as NonNullable<
                CheckboxProps["iconColor"]
              >,
          }
        : {};

  const control = (
    <MantineCheckbox
      {...checkboxProps}
      {...iconColorProps}
      classNames={mergeCheckboxClassNames(checkboxProps.classNames)}
      className={[className, wrapperClassName].filter(Boolean).join(" ")}
      color={color}
      wrapperProps={remainingWrapperProps}
    />
  );

  return mantineContext ? (
    control
  ) : (
    <MantineProvider>{control}</MantineProvider>
  );
}
