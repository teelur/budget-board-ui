import { useContext } from "react";
import type { CSSProperties } from "react";
import {
  MantineContext,
  MantineProvider,
  Textarea as MantineTextarea,
} from "@mantine/core";
import type { TextareaProps as MantineTextareaProps } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { budgetBoardColors } from "../colors";
import classes from "./Textarea.module.css";

export type TextareaProps = MantineTextareaProps;

type TextareaClassNames = NonNullable<TextareaProps["classNames"]>;
type TextareaClassNamesObject = Extract<
  TextareaClassNames,
  { input?: string | undefined }
>;

function mergeClassNames(
  classNames: TextareaProps["classNames"],
): TextareaClassNames {
  if (typeof classNames !== "function") {
    return withBBUIClassNames(classNames);
  }

  return (theme, props, context) =>
    withBBUIClassNames(classNames(theme, props, context));
}

function withBBUIClassNames(
  classNames: TextareaClassNamesObject | undefined,
): TextareaClassNamesObject {
  return {
    ...classNames,
    input: [classes.input, classNames?.input].filter(Boolean).join(" "),
  };
}

export function Textarea(props: TextareaProps) {
  const { className, classNames, style, wrapperProps, ...textareaProps } =
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
    "--bbui-textarea-background": `var(--bb-color-surface-input, ${colors.surfaceInput})`,
    "--bbui-textarea-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
    "--bbui-textarea-focus": `var(--bb-color-focus-ring, ${colors.focusRing})`,
    "--bbui-textarea-foreground": `var(--bb-color-text-primary, ${colors.textPrimary})`,
    "--bbui-textarea-placeholder": `var(--bb-color-text-secondary, ${colors.textSecondary})`,
    ...wrapperProps?.style,
  } as CSSProperties;

  const control = (
    <MantineTextarea
      {...textareaProps}
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
