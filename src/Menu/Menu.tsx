import type { CSSProperties, ReactElement } from "react";
import { Menu as MantineMenu } from "@mantine/core";
import type {
  MenuProps as MantineMenuProps,
  MenuStylesNames as MantineMenuStylesNames,
} from "@mantine/core";
import { budgetBoardTypography } from "../theme";
import { ensureBBUIMantineProvider, useBBUITheme } from "../shared/themeStyles";
import { mergeClassNames, mergeStyles } from "../shared/styleSlots";
import classes from "./Menu.module.css";

export type MenuProps = MantineMenuProps;
export type MenuStylesNames = MantineMenuStylesNames;

function MenuRoot({
  classNames,
  styles,
  ...props
}: MenuProps): ReactElement {
  const { colorScheme, colors, hasMantineContext } = useBBUITheme();
  const menuStyles = mergeStyles(styles, {
    arrow: {
      backgroundColor: "var(--bbui-menu-background)",
    },
    chevron: {
      color: "var(--bbui-menu-secondary-text)",
    },
    divider: {
      borderColor: "var(--bbui-menu-border)",
    },
    dropdown: {
      backgroundColor: "var(--bbui-menu-background)",
      borderColor: "var(--bbui-menu-border)",
      color: "var(--bbui-menu-text)",
      fontFamily: "var(--bbui-menu-font)",
      "--bbui-menu-background": `var(--bb-color-surface-elevated, ${colors.surfaceElevated})`,
      "--bbui-menu-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
      "--bbui-menu-text": `var(--bb-color-text-primary, ${colors.textPrimary})`,
      "--bbui-menu-secondary-text": `var(--bb-color-text-secondary, ${colors.textSecondary})`,
      "--bbui-menu-disabled-text": `var(--bb-color-text-disabled, ${colors.textDisabled})`,
      "--bbui-menu-hover": `var(--bb-color-surface-hover, ${colors.surfaceHover})`,
      "--bbui-menu-focus": `var(--bb-color-focus-ring, ${colors.focusRing})`,
      "--bbui-menu-input": `var(--bb-color-surface-input, ${colors.surfaceInput})`,
      "--bbui-menu-primary": `var(--bb-color-primary, ${colors.primary})`,
      "--bbui-menu-font": `var(--bb-font-body, ${budgetBoardTypography.body})`,
      "--menu-item-color": "var(--bbui-menu-text)",
      "--menu-item-hover": "var(--bbui-menu-hover)",
    } as CSSProperties,
    label: {
      color: "var(--bbui-menu-secondary-text)",
      fontFamily: "var(--bbui-menu-font)",
    },
    search: {
      backgroundColor: "var(--bbui-menu-input)",
      borderColor: "var(--bbui-menu-border)",
      color: "var(--bbui-menu-text)",
      fontFamily: "var(--bbui-menu-font)",
    },
  }) as NonNullable<MenuProps["styles"]>;

  const menu = (
    <MantineMenu
      {...props}
      classNames={
        mergeClassNames(classNames, {
          arrow: classes.arrow,
          chevron: classes.chevron,
          divider: classes.divider,
          dropdown: classes.dropdown,
          item: classes.item,
          itemIndicator: classes.itemIndicator,
          itemLabel: classes.itemLabel,
          label: classes.label,
          search: classes.search,
        }) as NonNullable<MenuProps["classNames"]>
      }
      styles={menuStyles}
    />
  );

  return ensureBBUIMantineProvider(menu, hasMantineContext, colorScheme);
}

export const Menu: typeof MantineMenu & typeof MenuRoot = Object.assign(
  MenuRoot,
  MantineMenu,
);
