import type { CSSProperties, ReactElement } from "react";
import { Drawer as MantineDrawer } from "@mantine/core";
import type { DrawerProps as MantineDrawerProps } from "@mantine/core";
import { budgetBoardTypography } from "../theme";
import { HeadingText } from "../HeadingText/HeadingText";
import { ensureBBUIMantineProvider, useBBUITheme } from "../shared/themeStyles";
import { mergeClassNames, mergeStyles } from "../shared/styleSlots";
import classes from "./Drawer.module.css";

export type DrawerProps = MantineDrawerProps;

export function Drawer({
  children,
  classNames,
  p,
  styles,
  title,
  ...props
}: DrawerProps): ReactElement {
  const { colorScheme, colors, hasMantineContext } = useBBUITheme();
  const drawerStyles = mergeStyles(styles, {
    content: {
      "--bbui-drawer-background": `var(--bb-color-page, ${colors.page})`,
      "--bbui-drawer-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
      "--bbui-drawer-title": `var(--bb-color-text-heading, ${colors.textHeading})`,
      "--bbui-drawer-body": `var(--bb-color-text-primary, ${colors.textPrimary})`,
      "--bbui-drawer-body-font": `var(--bb-font-body, ${budgetBoardTypography.body})`,
    } as CSSProperties,
  }) as NonNullable<DrawerProps["styles"]>;

  const drawer = (
    <MantineDrawer
      {...props}
      title={
        title ? (
          <HeadingText component="span" tone="heading" level={5}>
            {title}
          </HeadingText>
        ) : (
          title
        )
      }
      classNames={
        mergeClassNames(classNames, {
          content: classes.content,
          header: classes.header,
          body: classes.body,
        }) as NonNullable<DrawerProps["classNames"]>
      }
      {...(p === undefined ? {} : { p })}
      styles={drawerStyles}
    >
      {children}
    </MantineDrawer>
  );

  return ensureBBUIMantineProvider(drawer, hasMantineContext, colorScheme);
}
