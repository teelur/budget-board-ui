import { useContext } from "react";
import type { CSSProperties } from "react";
import {
  MantineContext,
  MantineProvider,
  TextInput as MantineTextInput,
} from "@mantine/core";
import type { TextInputProps as MantineTextInputProps } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { budgetBoardColors } from "../colors";
import classes from "./TextInput.module.css";

export type TextInputProps = MantineTextInputProps;

type TextInputClassNames = NonNullable<TextInputProps["classNames"]>;
type TextInputClassNamesObject = Extract<
  TextInputClassNames,
  { input?: string | undefined }
>;

function mergeClassNames(
  classNames: TextInputProps["classNames"],
): TextInputClassNames {
  if (typeof classNames !== "function") {
    return withBBUIClassNames(classNames);
  }

  return (theme, props, context) =>
    withBBUIClassNames(classNames(theme, props, context));
}

function withBBUIClassNames(
  classNames: TextInputClassNamesObject | undefined,
): TextInputClassNamesObject {
  return {
    ...classNames,
    input: [classes.input, classNames?.input].filter(Boolean).join(" "),
  };
}

export function TextInput(props: TextInputProps) {
  const { className, classNames, style, wrapperProps, ...textInputProps } =
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
    "--bbui-text-input-background": `var(--bb-color-surface-input, ${colors.surfaceInput})`,
    "--bbui-text-input-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
    "--bbui-text-input-focus": `var(--bb-color-focus-ring, ${colors.focusRing})`,
    "--bbui-text-input-foreground": `var(--bb-color-text-primary, ${colors.textPrimary})`,
    "--bbui-text-input-placeholder": `var(--bb-color-text-secondary, ${colors.textSecondary})`,
    ...wrapperProps?.style,
  } as CSSProperties;

  const control = (
    <MantineTextInput
      {...textInputProps}
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
