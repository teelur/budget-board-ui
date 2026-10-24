import { Checkbox as MantineCheckbox } from "@mantine/core";
import type {
  CheckboxProps as MantineCheckboxProps,
  CheckboxStylesNames,
} from "@mantine/core";
import type { CSSProperties } from "react";
import {
  ensureBBUIMantineProvider,
  useBBUITheme,
} from "../shared/themeStyles";
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
    style,
    wrapperProps,
    ...checkboxProps
  } = props;
  const { className: wrapperClassName, ...remainingWrapperProps } =
    wrapperProps ?? {};
  const { colorScheme, colors, hasMantineContext } = useBBUITheme();
  const color = consumerColor ?? `var(--bb-color-primary, ${colors.primary})`;
  const themeStyle = {
    "--bbui-checkbox-surface-input": `var(--bb-color-surface-input, ${colors.surfaceInput})`,
    "--bbui-checkbox-border-subtle": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
    "--bbui-checkbox-focus-ring": `var(--bb-color-focus-ring, ${colors.focusRing})`,
    "--bbui-checkbox-surface-sunken": `var(--bb-color-surface-sunken, ${colors.surfaceSunken})`,
    "--bbui-checkbox-text-primary": `var(--bb-color-text-primary, ${colors.textPrimary})`,
    "--bbui-checkbox-text-secondary": `var(--bb-color-text-secondary, ${colors.textSecondary})`,
    "--bbui-checkbox-error": `var(--bb-color-error, ${colors.error})`,
  } as CSSProperties;
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
      style={[themeStyle, style]}
      wrapperProps={remainingWrapperProps}
    />
  );

  return ensureBBUIMantineProvider(control, hasMantineContext, colorScheme);
}
