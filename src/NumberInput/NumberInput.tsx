import { useContext } from "react";
import type { CSSProperties } from "react";
import {
  MantineContext,
  MantineProvider,
  NumberInput as MantineNumberInput,
} from "@mantine/core";
import type {
  NumberInputNumericType as MantineNumberInputNumericType,
  NumberInputProps as MantineNumberInputProps,
  NumberInputStylesNames as MantineNumberInputStylesNames,
} from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { budgetBoardColors } from "../colors";
import classes from "./NumberInput.module.css";

export type NumberInputProps<T extends MantineNumberInputNumericType = number> =
  MantineNumberInputProps<T>;

export type NumberInputValue<T extends MantineNumberInputNumericType = number> =
  | T
  | string;

export type {
  NumberInputHandlers,
  NumberInputMode,
  NumberInputNumericType,
} from "@mantine/core";

type NumberInputClassNames = NonNullable<NumberInputProps["classNames"]>;
type NumberInputClassNamesObject = Partial<
  Record<MantineNumberInputStylesNames, string | undefined>
>;

function mergeClassNames(
  classNames: NumberInputProps["classNames"],
): NumberInputClassNames {
  if (typeof classNames !== "function") {
    return withBBUIClassNames(classNames);
  }

  return (theme, props, context) =>
    withBBUIClassNames(classNames(theme, props, context));
}

function withBBUIClassNames(
  classNames: NumberInputClassNamesObject | undefined,
): NumberInputClassNamesObject {
  return {
    ...classNames,
    input: [classes.input, classNames?.input].filter(Boolean).join(" "),
    controls: [classes.controls, classNames?.controls]
      .filter(Boolean)
      .join(" "),
    control: [classes.control, classNames?.control].filter(Boolean).join(" "),
  };
}

export function NumberInput<T extends MantineNumberInputNumericType = number>(
  props: NumberInputProps<T>,
) {
  const { className, classNames, style, wrapperProps, ...numberInputProps } =
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
    "--bbui-number-input-background": `var(--bb-color-surface-input, ${colors.surfaceInput})`,
    "--bbui-number-input-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
    "--bbui-number-input-focus": `var(--bb-color-focus-ring, ${colors.focusRing})`,
    "--bbui-number-input-foreground": `var(--bb-color-text-primary, ${colors.textPrimary})`,
    "--bbui-number-input-placeholder": `var(--bb-color-text-secondary, ${colors.textSecondary})`,
    "--bbui-number-input-stepper-hover": `var(--bb-color-surface-elevated, ${colors.surfaceElevated})`,
    "--bbui-number-input-stepper-color": `var(--bb-color-text-secondary, ${colors.textSecondary})`,
    ...wrapperProps?.style,
  } as CSSProperties;

  const control = (
    <MantineNumberInput<T>
      {...numberInputProps}
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
