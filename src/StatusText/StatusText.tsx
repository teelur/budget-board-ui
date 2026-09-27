import { useContext, type ReactNode } from "react";
import { MantineContext, MantineProvider, Text } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import type { TextProps } from "@mantine/core";
import { budgetBoardColors } from "../colors";
import type { BudgetBoardColorMode } from "../colors";

export enum StatusColorType {
  Expense,
  Income,
  Total,
  Target,
}

const statusButtonColors = {
  neutral: "info",
  good: "success",
  warning: "warning",
  bad: "error",
} as const;

type StatusButtonColor =
  (typeof statusButtonColors)[keyof typeof statusButtonColors];

function getSemanticStatusColor(
  color: StatusButtonColor,
  colors: BudgetBoardColorMode,
) {
  return `var(--bb-color-${color}, ${colors[color]})`;
}

export function getStatusColor(
  amount: number,
  total: number,
  type: StatusColorType,
  warningThreshold?: number,
  colors: BudgetBoardColorMode = budgetBoardColors.light,
): string {
  if (type === StatusColorType.Income) {
    return getSemanticStatusColor(
      amount < total ? statusButtonColors.neutral : statusButtonColors.good,
      colors,
    );
  }

  if (type === StatusColorType.Expense) {
    const invertedAmount = amount * -1;

    if (invertedAmount > total) {
      return getSemanticStatusColor(statusButtonColors.bad, colors);
    }

    if (
      warningThreshold !== undefined &&
      invertedAmount >= total * (warningThreshold / 100)
    ) {
      return getSemanticStatusColor(statusButtonColors.warning, colors);
    }

    return getSemanticStatusColor(statusButtonColors.good, colors);
  }

  if (type === StatusColorType.Total) {
    return getSemanticStatusColor(
      amount < 0 ? statusButtonColors.bad : statusButtonColors.good,
      colors,
    );
  }

  if (type === StatusColorType.Target) {
    return getSemanticStatusColor(
      amount < total ? statusButtonColors.bad : statusButtonColors.good,
      colors,
    );
  }

  return `var(--bb-color-text, ${colors.textPrimary})`;
}

export interface StatusTextProps extends TextProps {
  amount: number;
  total?: number;
  type?: StatusColorType;
  warningThreshold?: number;
  disableStatusColor?: boolean;
  children?: ReactNode;
}

export function StatusText({
  amount,
  total,
  type = StatusColorType.Total,
  warningThreshold,
  disableStatusColor = false,
  children,
  c,
  fw,
  ...textProps
}: StatusTextProps) {
  const mantineContext = useContext(MantineContext);
  const systemColorScheme = useColorScheme("light");
  const colorScheme =
    mantineContext?.colorScheme === "auto"
      ? systemColorScheme
      : mantineContext?.colorScheme === "dark"
        ? "dark"
        : "light";
  const resolvedColor =
    c ??
    (disableStatusColor
      ? undefined
      : getStatusColor(
          amount,
          total ?? 0,
          type,
          warningThreshold,
          colorScheme === "dark"
            ? budgetBoardColors.dark
            : budgetBoardColors.light,
        ));
  const textPropsWithColor =
    resolvedColor === undefined
      ? textProps
      : { ...textProps, c: resolvedColor };
  const text = (
    <Text {...textPropsWithColor} fw={fw ?? 600}>
      {children}
    </Text>
  );

  return mantineContext ? text : <MantineProvider>{text}</MantineProvider>;
}
