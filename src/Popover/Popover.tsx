import type { CSSProperties, ReactElement } from "react";
import { Popover as MantinePopover } from "@mantine/core";
import type { PopoverProps as MantinePopoverProps } from "@mantine/core";
import { budgetBoardTypography } from "../theme";
import { ensureBBUIMantineProvider, useBBUITheme } from "../shared/themeStyles";
import { mergeClassNames, mergeStyles } from "../shared/styleSlots";
import classes from "./Popover.module.css";

export type PopoverProps = MantinePopoverProps;

function PopoverRoot({
  classNames,
  styles,
  ...props
}: PopoverProps): ReactElement {
  const { colorScheme, colors, hasMantineContext } = useBBUITheme();
  const popoverStyles = mergeStyles(styles, {
    dropdown: {
      "--bbui-popover-background": `var(--bb-color-page, ${colors.page})`,
      "--bbui-popover-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
      "--bbui-popover-text": `var(--bb-color-text-primary, ${colors.textPrimary})`,
      "--bbui-popover-font": `var(--bb-font-body, ${budgetBoardTypography.body})`,
    } as CSSProperties,
  }) as NonNullable<PopoverProps["styles"]>;

  const popover = (
    <MantinePopover
      {...props}
      classNames={
        mergeClassNames(classNames, {
          dropdown: classes.dropdown,
        }) as NonNullable<PopoverProps["classNames"]>
      }
      styles={popoverStyles}
    />
  );

  return ensureBBUIMantineProvider(popover, hasMantineContext, colorScheme);
}

export const Popover = Object.assign(PopoverRoot, {
  Target: MantinePopover.Target,
  Dropdown: MantinePopover.Dropdown,
  ContextMenu: MantinePopover.ContextMenu,
});
