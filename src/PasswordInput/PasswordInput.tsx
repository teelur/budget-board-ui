import { useContext } from "react";
import type { CSSProperties } from "react";
import {
  MantineContext,
  MantineProvider,
  PasswordInput as MantinePasswordInput,
} from "@mantine/core";
import type {
  PasswordInputProps as MantinePasswordInputProps,
  PasswordInputStylesNames,
} from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { budgetBoardColors } from "../colors";
import classes from "./PasswordInput.module.css";

export type PasswordInputProps = MantinePasswordInputProps;

type PasswordInputClassNames = NonNullable<PasswordInputProps["classNames"]>;
type PasswordInputClassNamesObject = Partial<
  Record<PasswordInputStylesNames, string | undefined>
>;

function mergeClassNames(
  classNames: PasswordInputProps["classNames"],
): PasswordInputClassNames {
  if (typeof classNames !== "function") {
    return withBBUIClassNames(classNames);
  }

  return (theme, props, context) =>
    withBBUIClassNames(classNames(theme, props, context));
}

function withBBUIClassNames(
  classNames: PasswordInputClassNamesObject | undefined,
): PasswordInputClassNamesObject {
  return {
    ...classNames,
    input: [classes.input, classNames?.input].filter(Boolean).join(" "),
    innerInput: [classes.innerInput, classNames?.innerInput]
      .filter(Boolean)
      .join(" "),
    visibilityToggle: [classes.visibilityToggle, classNames?.visibilityToggle]
      .filter(Boolean)
      .join(" "),
  };
}

export function PasswordInput(props: PasswordInputProps) {
  const { className, classNames, style, wrapperProps, ...passwordInputProps } =
    props;
  const mantineContext = useContext(MantineContext);
  const systemColorScheme = useColorScheme("light");
  const colorScheme =
    mantineContext?.colorScheme === "auto"
      ? systemColorScheme
      : mantineContext?.colorScheme === "dark"
        ? "dark"
        : "light";
  const colors = budgetBoardColors[colorScheme];
  const wrapperStyle = {
    "--bbui-password-input-background": `var(--bb-color-surface-input, ${colors.surfaceInput})`,
    "--bbui-password-input-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
    "--bbui-password-input-focus": `var(--bb-color-focus-ring, ${colors.focusRing})`,
    "--bbui-password-input-foreground": `var(--bb-color-text-primary, ${colors.textPrimary})`,
    "--bbui-password-input-placeholder": `var(--bb-color-text-secondary, ${colors.textSecondary})`,
    "--bbui-password-input-toggle-hover": `var(--bb-color-surface-elevated, ${colors.surfaceElevated})`,
    ...wrapperProps?.style,
  } as CSSProperties;

  const control = (
    <MantinePasswordInput
      {...passwordInputProps}
      className={[classes.root, className].filter(Boolean).join(" ")}
      classNames={mergeClassNames(classNames)}
      style={style}
      wrapperProps={{
        ...wrapperProps,
        "data-budget-board-color-scheme": colorScheme,
        style: wrapperStyle,
      }}
    />
  );

  return mantineContext ? (
    control
  ) : (
    <MantineProvider>{control}</MantineProvider>
  );
}
