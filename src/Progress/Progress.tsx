import {
  MantineContext,
  MantineProvider,
  Progress as MantineProgress,
} from "@mantine/core";
import type { ProgressRootProps } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { useContext, type CSSProperties } from "react";
import { budgetBoardColors } from "../colors";
import type { BudgetBoardContentColorKey } from "../colors";
import { buttonColors, type ButtonColor } from "../shared/buttonStyles";
import classes from "./Progress.module.css";

export const progressColors = buttonColors;
export type ProgressColor = ButtonColor;
export const progressTypes = ["default", "income", "expense"] as const;
export type ProgressType = (typeof progressTypes)[number];

export interface ProgressSection {
  value: number;
  color?: ProgressColor;
  ariaLabel: string;
  striped?: boolean;
  animated?: boolean;
}

interface ProgressCommonProps extends Omit<
  ProgressRootProps,
  "children" | "color" | "style"
> {
  color?: ProgressColor;
  amount?: number;
  limit?: number;
  warningThreshold?: number;
  label?: boolean;
  ariaLabel: string;
  striped?: boolean;
  animated?: boolean;
  sections?: ProgressSection[];
  style?: ProgressRootProps["style"];
}

export type ProgressProps = ProgressCommonProps &
  (
    | { type?: "default"; value: number }
    | {
        type: Exclude<ProgressType, "default">;
        amount: number;
        limit: number;
        value?: number;
      }
  );

const clampProgressValue = (value: number) => Math.min(100, Math.max(0, value));

const roundAwayFromZero = (value: number) =>
  value >= 0 ? Math.round(value) : Math.round(value * -1) * -1;

function getProgressValue(
  amount: number,
  limit: number,
  type: Exclude<ProgressType, "default">,
) {
  if (limit <= 0) {
    return 0;
  }

  const direction = type === "expense" ? -1 : 1;
  return roundAwayFromZero(((amount * direction) / limit) * 100);
}

function getResponsiveColor(
  amount: number,
  limit: number,
  type: ProgressType,
  warningThreshold: number,
): ProgressColor | undefined {
  const roundedAmount = Math.sign(amount) * Math.round(Math.abs(amount));

  if (type === "income") {
    return roundedAmount < limit ? "info" : "success";
  }

  if (type === "expense") {
    const amountTowardsLimit = roundedAmount * -1;

    if (amountTowardsLimit > limit) {
      return "error";
    }

    if (amountTowardsLimit >= limit * (warningThreshold / 100)) {
      return "warning";
    }

    return "success";
  }

  return undefined;
}

export function Progress({
  animated,
  amount,
  ariaLabel,
  className,
  color: requestedColor = "primary",
  label,
  limit,
  radius = "xl",
  sections = [],
  size,
  style,
  striped,
  type = "default",
  value,
  warningThreshold = 80,
  w = "100%",
  ...rootProps
}: ProgressProps) {
  const progressValue =
    value ??
    (type !== "default" && amount !== undefined && limit !== undefined
      ? getProgressValue(amount, limit, type)
      : 0);
  const color =
    amount === undefined || limit === undefined
      ? requestedColor
      : (getResponsiveColor(amount, limit, type, warningThreshold) ??
        requestedColor);
  const mantineContext = useContext(MantineContext);
  const systemColorScheme = useColorScheme("light");
  const colorScheme =
    mantineContext?.colorScheme === "auto"
      ? systemColorScheme
      : mantineContext?.colorScheme === "dark"
        ? "dark"
        : "light";
  const colors = budgetBoardColors[colorScheme];
  const labelContentColor =
    colors[`${color}Content` as BudgetBoardContentColorKey];
  const sectionColor = (sectionColor: ProgressColor) =>
    `var(--bb-color-${sectionColor}, ${colors[sectionColor]})`;
  const animatedStripedClass = (isAnimated?: boolean, isStriped?: boolean) =>
    isAnimated && isStriped ? classes.animatedStripedSection : undefined;

  const progress = (
    <div
      className={classes.container}
      style={
        { "--bbui-progress-label-color": colors.textPrimary } as CSSProperties
      }
    >
      <MantineProgress.Root
        {...rootProps}
        className={[classes.root, className].filter(Boolean).join(" ")}
        data-budget-board-progress-color={color}
        radius={radius}
        style={[
          {
            "--bbui-progress-track-bg": `var(--bb-color-surface-sunken, ${colors.surfaceSunken})`,
            backgroundColor: "var(--bbui-progress-track-bg)",
          } as CSSProperties,
          style,
        ]}
        w={w}
        {...(size === undefined ? {} : { size })}
      >
        <MantineProgress.Section
          color={sectionColor(color)}
          className={animatedStripedClass(animated, striped)}
          data-budget-board-progress-section-color={color}
          value={clampProgressValue(progressValue)}
          withAria
          {...(animated === undefined
            ? {}
            : { animated: animated && striped === true })}
          {...(ariaLabel === undefined ? {} : { "aria-label": ariaLabel })}
          {...(striped === undefined ? {} : { striped })}
        />
        {sections.map((section, index) => {
          const sectionFill = section.color ?? color;

          return (
            <MantineProgress.Section
              color={sectionColor(sectionFill)}
              className={animatedStripedClass(
                section.animated,
                section.striped,
              )}
              data-budget-board-progress-section-color={sectionFill}
              key={`${index}-${section.ariaLabel}`}
              value={clampProgressValue(section.value)}
              withAria
              {...(section.animated === undefined
                ? {}
                : { animated: section.animated && section.striped === true })}
              aria-label={section.ariaLabel}
              {...(section.striped === undefined
                ? {}
                : { striped: section.striped })}
            />
          );
        })}
      </MantineProgress.Root>
      {label && (
        <span className={classes.label}>
          {clampProgressValue(progressValue)}%
        </span>
      )}
    </div>
  );

  return mantineContext ? (
    progress
  ) : (
    <MantineProvider>{progress}</MantineProvider>
  );
}
