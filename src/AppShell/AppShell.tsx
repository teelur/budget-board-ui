import type { CSSProperties, ReactNode } from "react";
import {
  AppShell as MantineAppShell,
  AppShellAside as MantineAppShellAside,
  AppShellFooter as MantineAppShellFooter,
  AppShellHeader as MantineAppShellHeader,
  AppShellMain as MantineAppShellMain,
  AppShellNavbar as MantineAppShellNavbar,
  AppShellSection as MantineAppShellSection,
} from "@mantine/core";
import type {
  AppShellAsideProps as MantineAppShellAsideProps,
  AppShellFooterProps as MantineAppShellFooterProps,
  AppShellHeaderProps as MantineAppShellHeaderProps,
  AppShellMainProps as MantineAppShellMainProps,
  AppShellNavbarProps as MantineAppShellNavbarProps,
  AppShellProps as MantineAppShellProps,
  AppShellSectionProps as MantineAppShellSectionProps,
} from "@mantine/core";
import { ensureBBUIMantineProvider, useBBUITheme } from "../shared/themeStyles";
import classes from "./AppShell.module.css";

export type AppShellProps = MantineAppShellProps;
export type AppShellAsideProps = MantineAppShellAsideProps;
export type AppShellFooterProps = MantineAppShellFooterProps;
export type AppShellHeaderProps = MantineAppShellHeaderProps;
export type AppShellMainProps = MantineAppShellMainProps;
export type AppShellNavbarProps = MantineAppShellNavbarProps;
export type AppShellSectionProps = MantineAppShellSectionProps & {
  children?: ReactNode;
};

function mergeClassName(
  defaultClassName: string | undefined,
  className?: string,
) {
  return [defaultClassName, className].filter(Boolean).join(" ");
}

export function AppShell({ className, style, ...props }: AppShellProps) {
  const { colors, colorScheme, hasMantineContext } = useBBUITheme();
  const appShell = (
    <MantineAppShell
      {...props}
      className={mergeClassName(classes.root, className)}
      style={[
        {
          "--app-shell-border-color": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
          "--bbui-app-shell-page": `var(--bb-color-page, ${colors.page})`,
          "--bbui-app-shell-surface": `var(--bb-color-surface, ${colors.surface})`,
          "--bbui-app-shell-header": `var(--bb-color-surface-sunken, ${colors.surfaceSunken})`,
          "--bbui-app-shell-navigation": `var(--bb-color-navigation, ${colors.navigation})`,
          "--bbui-app-shell-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
          "--bbui-app-shell-text": `var(--bb-color-text-primary, ${colors.textPrimary})`,
        } as CSSProperties,
        style,
      ]}
    />
  );

  return ensureBBUIMantineProvider(appShell, hasMantineContext, colorScheme);
}

export function AppShellAside({ className, ...props }: AppShellAsideProps) {
  return (
    <MantineAppShellAside
      {...props}
      className={mergeClassName(classes.surface, className)}
    />
  );
}

export function AppShellFooter({ className, ...props }: AppShellFooterProps) {
  return (
    <MantineAppShellFooter
      {...props}
      className={mergeClassName(classes.surface, className)}
    />
  );
}

export function AppShellHeader({ className, ...props }: AppShellHeaderProps) {
  return (
    <MantineAppShellHeader
      {...props}
      className={mergeClassName(classes.headerSurface, className)}
    />
  );
}

export function AppShellMain({ className, ...props }: AppShellMainProps) {
  return (
    <MantineAppShellMain
      {...props}
      className={mergeClassName(classes.main, className)}
    />
  );
}

export function AppShellNavbar({ className, ...props }: AppShellNavbarProps) {
  return (
    <MantineAppShellNavbar
      {...props}
      className={mergeClassName(classes.navigation, className)}
    />
  );
}

export function AppShellSection({ className, ...props }: AppShellSectionProps) {
  return (
    <MantineAppShellSection
      {...props}
      className={mergeClassName(classes.section, className)}
    />
  );
}
