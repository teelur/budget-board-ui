import { forwardRef, type CSSProperties, type ReactElement } from "react";
import { Stepper as MantineStepper } from "@mantine/core";
import type { StepperProps as MantineStepperProps } from "@mantine/core";
import { budgetBoardTypography } from "../theme";
import {
  ensureBBUIMantineProvider,
  useBBUITheme,
} from "../shared/themeStyles";
import { mergeClassNames, mergeStyles } from "../shared/styleSlots";
import classes from "./Stepper.module.css";

export type StepperProps = MantineStepperProps;
export type { StepperStepProps, StepperStylesNames } from "@mantine/core";

const StepperRoot = forwardRef<HTMLDivElement, StepperProps>(
  function StepperRoot(
    { autoContrast, classNames, color, styles, ...props },
    ref,
  ): ReactElement {
    const { colors, colorScheme, hasMantineContext } = useBBUITheme();
    const rootStyle = {
      "--bbui-stepper-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
      "--bbui-stepper-focus": `var(--bb-color-focus-ring, ${colors.focusRing})`,
      "--bbui-stepper-font": `var(--bb-font-body, ${budgetBoardTypography.body})`,
      "--bbui-stepper-text": `var(--bb-color-text-primary, ${colors.textPrimary})`,
      "--bbui-stepper-text-secondary": `var(--bb-color-text-secondary, ${colors.textSecondary})`,
      "--stepper-outline-color": "var(--bbui-stepper-border)",
      ...(color === undefined
        ? {
            "--stepper-color": `var(--bb-color-primary, ${colors.primary})`,
            ...(!autoContrast && {
              "--stepper-icon-color": `var(--bb-color-primary-content, ${colors.primaryContent})`,
            }),
          }
        : {}),
    } as CSSProperties;
    const component = (
      <MantineStepper
        {...props}
        {...(autoContrast === undefined ? {} : { autoContrast })}
        classNames={
          mergeClassNames(classNames, {
            content: classes.content,
            root: classes.root,
            separator: classes.separator,
            step: classes.step,
            stepDescription: classes.stepDescription,
            stepIcon: classes.stepIcon,
            stepLabel: classes.stepLabel,
            verticalSeparator: classes.verticalSeparator,
          }) as NonNullable<StepperProps["classNames"]>
        }
        {...(color === undefined ? {} : { color })}
        ref={ref}
        styles={
          mergeStyles(styles, { root: rootStyle }) as NonNullable<
            StepperProps["styles"]
          >
        }
      />
    );

    return ensureBBUIMantineProvider(component, hasMantineContext, colorScheme);
  },
);

type StepperCompoundComponents = Pick<typeof MantineStepper, "Step" | "Completed">;

export const Stepper: typeof StepperRoot & StepperCompoundComponents =
  Object.assign(StepperRoot, {
    Step: MantineStepper.Step,
    Completed: MantineStepper.Completed,
  });
