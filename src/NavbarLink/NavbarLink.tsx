import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { Group, Text, Tooltip, UnstyledButton } from "@mantine/core";
import { useBBUITheme, ensureBBUIMantineProvider } from "../shared/themeStyles";
import classes from "./NavbarLink.module.css";

export interface NavbarLinkProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  icon: ReactNode;
  label: string;
  active?: boolean;
  showLabel?: boolean;
  labelSize?: "sm" | "xs";
  compact?: boolean;
}

export function NavbarLink({
  active,
  className,
  compact,
  icon,
  label,
  labelSize = "sm",
  showLabel,
  style,
  type = "button",
  "aria-label": ariaLabel,
  ...buttonProps
}: NavbarLinkProps) {
  const { colors, colorScheme, hasMantineContext } = useBBUITheme();
  const isLabelVisible = showLabel ?? false;
  const navbarLink = (
    <Tooltip
      disabled={isLabelVisible}
      label={label}
      position="right"
      transitionProps={{ duration: 0 }}
    >
      <UnstyledButton
        {...buttonProps}
        aria-label={ariaLabel ?? (!isLabelVisible ? label : undefined)}
        className={[classes.root, className].filter(Boolean).join(" ")}
        data-active={active || undefined}
        data-budget-board-navbar-link-compact={compact ? "true" : undefined}
        style={[
          {
            "--bbui-navbar-link-secondary": `var(--bb-color-text-secondary, ${colors.textSecondary})`,
            "--bbui-navbar-link-primary": `var(--bb-color-text-primary, ${colors.textPrimary})`,
            "--bbui-navbar-link-hover": `var(--bb-color-surface-elevated, ${colors.surfaceElevated})`,
            "--bbui-navbar-link-active": `var(--bb-color-selection, ${colors.selection})`,
            "--bbui-navbar-link-focus": `var(--bb-color-focus-ring, ${colors.focusRing})`,
          } as CSSProperties,
          style,
        ]}
        type={type}
      >
        <Group
          justify={isLabelVisible ? "flex-start" : "center"}
          gap="xs"
          wrap="nowrap"
          w="100%"
        >
          {icon}
          {isLabelVisible && (
            <Text className={classes.label} component="span" size={labelSize}>
              {label}
            </Text>
          )}
        </Group>
      </UnstyledButton>
    </Tooltip>
  );

  return ensureBBUIMantineProvider(navbarLink, hasMantineContext, colorScheme);
}
