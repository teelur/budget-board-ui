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

export interface ProgressSection {
  value: number;
  color?: ProgressColor;
  ariaLabel: string;
  striped?: boolean;
  animated?: boolean;
}

export interface ProgressProps extends Omit<
  ProgressRootProps,
  "children" | "color" | "style"
> {
  value: number;
  color?: ProgressColor;
  label?: boolean;
  ariaLabel: string;
  striped?: boolean;
  animated?: boolean;
  sections?: ProgressSection[];
  style?: ProgressRootProps["style"];
}

const clampProgressValue = (value: number) => Math.min(100, Math.max(0, value));

export function Progress({
  animated,
  ariaLabel,
  className,
  color = "primary",
  label,
  radius = "xl",
  sections = [],
  size,
  style,
  striped,
  value,
  w = "100%",
  ...rootProps
}: ProgressProps) {
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
          value={clampProgressValue(value)}
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
        <span className={classes.label}>{clampProgressValue(value)}%</span>
      )}
    </div>
  );

  return mantineContext ? (
    progress
  ) : (
    <MantineProvider>{progress}</MantineProvider>
  );
}
