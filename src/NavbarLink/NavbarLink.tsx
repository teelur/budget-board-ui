import type {
  ButtonHTMLAttributes,
  CSSProperties,
  MouseEventHandler,
  ReactNode,
} from "react";
import { useId, useState } from "react";
import { Collapse, Group, Text, Tooltip, UnstyledButton } from "@mantine/core";
import { ChevronDownIcon } from "lucide-react";
import { useBBUITheme, ensureBBUIMantineProvider } from "../shared/themeStyles";
import classes from "./NavbarLink.module.css";

export interface NavbarLinkItem {
  id: string;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export type NavbarLinkMode = "navigation" | "selection";

export interface NavbarLinkProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  icon: ReactNode;
  label: string;
  mode?: NavbarLinkMode;
  active?: boolean;
  showLabel?: boolean;
  labelSize?: "sm" | "xs";
  compact?: boolean;
  items?: readonly NavbarLinkItem[];
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  expandLabel?: string;
  collapseLabel?: string;
}

export function NavbarLink({
  active,
  className,
  collapseLabel,
  compact,
  defaultExpanded = false,
  expandLabel,
  expanded,
  icon,
  items,
  label,
  labelSize = "sm",
  mode = "navigation",
  onExpandedChange,
  showLabel,
  style,
  type = "button",
  "aria-label": ariaLabel,
  ...buttonProps
}: NavbarLinkProps) {
  const { colors, colorScheme, hasMantineContext } = useBBUITheme();
  const isLabelVisible = showLabel ?? false;
  const [uncontrolledExpanded, setUncontrolledExpanded] =
    useState(defaultExpanded);
  const isExpanded = expanded ?? uncontrolledExpanded;
  const hasItems = Boolean(items?.length);
  const showGroup = hasItems && isLabelVisible;
  const isGroupExpanded = showGroup && isExpanded;
  const panelId = `bbui-navbar-link-panel-${useId()}`;
  const themeStyles = (
    mode === "navigation"
      ? {
          "--bbui-navbar-link-text": `var(--bb-color-navigation-text-primary, ${colors.navigationTextPrimary})`,
          "--bbui-navbar-link-primary": `var(--bb-color-navigation-text-primary, ${colors.navigationTextPrimary})`,
          "--bbui-navbar-link-hover": `var(--bb-color-navigation-surface-hover, ${colors.navigationSurfaceHover})`,
          "--bbui-navbar-link-active": `var(--bb-color-navigation-selection, ${colors.navigationSelection})`,
          "--bbui-navbar-link-focus": `var(--bb-color-navigation-focus-ring, ${colors.navigationFocusRing})`,
          "--bbui-navbar-link-border": `var(--bb-color-navigation-border, ${colors.navigationBorder})`,
        }
      : {
          "--bbui-navbar-link-text": `var(--bb-color-text-secondary, ${colors.textSecondary})`,
          "--bbui-navbar-link-primary": `var(--bb-color-text-primary, ${colors.textPrimary})`,
          "--bbui-navbar-link-hover": `var(--bb-color-surface-hover, ${colors.surfaceHover})`,
          "--bbui-navbar-link-active": `var(--bb-color-selection, ${colors.selection})`,
          "--bbui-navbar-link-focus": `var(--bb-color-focus-ring, ${colors.focusRing})`,
          "--bbui-navbar-link-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
        }
  ) as CSSProperties;
  const parentLinkStyles = {
    ...themeStyles,
    color: "var(--bbui-navbar-link-color)",
  } as CSSProperties;

  const toggleExpanded = () => {
    const nextExpanded = !isExpanded;
    if (expanded === undefined) {
      setUncontrolledExpanded(nextExpanded);
    }
    onExpandedChange?.(nextExpanded);
  };

  const parentLink = (
    <Tooltip
      disabled={isLabelVisible}
      label={label}
      position="right"
      transitionProps={{ duration: 0 }}
    >
      <UnstyledButton
        {...buttonProps}
        aria-label={ariaLabel ?? (!isLabelVisible ? label : undefined)}
        className={[classes.root, showGroup && classes.groupLink, className]
          .filter(Boolean)
          .join(" ")}
        data-active={active || undefined}
        data-budget-board-navbar-link-compact={compact ? "true" : undefined}
        style={[parentLinkStyles, style]}
        type={type}
      >
        <Group
          justify={isLabelVisible ? "flex-start" : "center"}
          gap="md"
          wrap="nowrap"
          w="100%"
        >
          <span
            className={[
              classes.icon,
              isLabelVisible && classes.iconInset,
              !isLabelVisible && classes.iconCollapsed,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {icon}
          </span>
          {isLabelVisible && (
            <Text
              c="inherit"
              className={classes.label}
              component="span"
              fw={600}
              size={labelSize}
            >
              {label}
            </Text>
          )}
        </Group>
      </UnstyledButton>
    </Tooltip>
  );

  const navbarLink = showGroup ? (
    <div className={classes.group} style={themeStyles}>
      <div className={classes.groupHeader}>
        {parentLink}
        <button
          aria-controls={panelId}
          aria-expanded={isGroupExpanded}
          aria-label={
            isGroupExpanded
              ? (collapseLabel ?? `Collapse ${label}`)
              : (expandLabel ?? `Expand ${label}`)
          }
          className={[
            classes.disclosure,
            isGroupExpanded && classes.disclosureOpen,
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={toggleExpanded}
          type="button"
        >
          <ChevronDownIcon aria-hidden="true" size="1rem" />
        </button>
      </div>
      <Collapse expanded={isGroupExpanded} id={panelId}>
        <div className={classes.children} inert={!isGroupExpanded}>
          {items?.map((item) => (
            <button
              key={item.id}
              className={classes.childLink}
              data-active={item.active || undefined}
              disabled={item.disabled}
              onClick={item.onClick}
              type="button"
            >
              <Text
                c="inherit"
                className={classes.label}
                component="span"
                fw={600}
                size="xs"
              >
                {item.label}
              </Text>
            </button>
          ))}
        </div>
      </Collapse>
    </div>
  ) : (
    parentLink
  );

  return ensureBBUIMantineProvider(navbarLink, hasMantineContext, colorScheme);
}
