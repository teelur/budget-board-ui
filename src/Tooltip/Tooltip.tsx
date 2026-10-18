import type { CSSProperties, ReactElement } from "react";
import { Tooltip as MantineTooltip } from "@mantine/core";
import type { TooltipProps as MantineTooltipProps } from "@mantine/core";
import { budgetBoardTypography } from "../theme";
import { ensureBBUIMantineProvider, useBBUITheme } from "../shared/themeStyles";
import { mergeClassNames, mergeStyles } from "../shared/styleSlots";
import classes from "./Tooltip.module.css";

export type TooltipProps = MantineTooltipProps;

function TooltipRoot({
  classNames,
  styles,
  ...props
}: TooltipProps): ReactElement {
  const { colorScheme, colors, hasMantineContext } = useBBUITheme();
  const tooltipStyles = mergeStyles(styles, {
    tooltip: {
      "--bbui-tooltip-background": `var(--bb-color-surface-overlay, ${colors.surfaceOverlay})`,
      "--bbui-tooltip-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
      "--bbui-tooltip-text": `var(--bb-color-text-primary, ${colors.textPrimary})`,
      "--bbui-tooltip-font": `var(--bb-font-body, ${budgetBoardTypography.body})`,
    } as CSSProperties,
  }) as NonNullable<TooltipProps["styles"]>;

  const tooltip = (
    <MantineTooltip
      {...props}
      classNames={
        mergeClassNames(classNames, {
          tooltip: classes.tooltip,
          arrow: classes.arrow,
        }) as NonNullable<TooltipProps["classNames"]>
      }
      styles={tooltipStyles}
    />
  );

  return ensureBBUIMantineProvider(tooltip, hasMantineContext, colorScheme);
}

export const Tooltip = TooltipRoot;
