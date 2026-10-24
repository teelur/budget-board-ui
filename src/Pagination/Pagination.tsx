import { forwardRef, type CSSProperties } from "react";
import { Pagination as MantinePagination } from "@mantine/core";
import type {
  PaginationProps as MantinePaginationProps,
  PaginationRootProps,
} from "@mantine/core";
import { BodyText } from "../BodyText/BodyText";
import { Button } from "../Button/Button";
import type { ButtonProps } from "../Button/Button";
import {
  ensureBBUIMantineProvider,
  useBBUITheme,
} from "../shared/themeStyles";
import classes from "./Pagination.module.css";

export type PaginationProps = MantinePaginationProps;

function getRootClassName(className: string | undefined) {
  return [
    classes.root,
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

function getPaginationThemeStyle(
  colors: ReturnType<typeof useBBUITheme>["colors"],
): CSSProperties {
  return {
    "--bbui-pagination-text": `var(--bb-color-text-primary, ${colors.textPrimary})`,
    "--bbui-pagination-neutral-content": `var(--bb-color-neutral-content, ${colors.neutralContent})`,
    "--bbui-pagination-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
    "--bbui-pagination-hover": `var(--bb-color-surface-hover, ${colors.surfaceHover})`,
    "--bbui-pagination-hover-border": `var(--bb-color-border-strong, ${colors.borderStrong})`,
    "--bbui-pagination-active": `var(--bb-color-primary, ${colors.primary})`,
    "--bbui-pagination-active-text": `var(--bb-color-primary-content, ${colors.primaryContent})`,
    "--bbui-pagination-focus": `var(--bb-color-focus-ring, ${colors.focusRing})`,
  } as CSSProperties;
}

function PaginationButton({
  color,
  selected,
  variant,
  ...props
}: ButtonProps) {
  const isSelected = selected ?? props["aria-current"] === "page";

  return (
    <Button
      {...props}
      color={color ?? (isSelected ? "primary" : "neutral")}
      selected={isSelected}
      variant={variant ?? "filled"}
    />
  );
}

function PaginationControlButton({
  color,
  selected,
  variant,
  ...props
}: ButtonProps) {
  return (
    <Button
      {...props}
      color={color ?? "primary"}
      selected={selected ?? props["aria-current"] === "page"}
      variant={variant ?? "outline"}
    />
  );
}

function withBBUIControlProps(
  getControlProps: PaginationProps["getControlProps"],
): NonNullable<PaginationProps["getControlProps"]> {
  return (control) => ({
    component: PaginationControlButton,
    ...getControlProps?.(control),
  });
}

function withBodyTextItemLabels(
  getItemProps: PaginationRootProps["getItemProps"],
): NonNullable<PaginationRootProps["getItemProps"]> {
  return (page) => {
    const itemProps = getItemProps?.(page);

    return {
      component: PaginationButton,
      ...itemProps,
      children: itemProps?.children ?? (
        <BodyText
          c="inherit"
          component="span"
          ff="inherit"
          fw="inherit"
          fz="inherit"
          lh="inherit"
        >
          {page}
        </BodyText>
      ),
    };
  };
}

const StyledPaginationRoot = forwardRef<HTMLDivElement, PaginationRootProps>(
  function StyledPaginationRoot(
    { className, color, getItemProps, style, ...props },
    ref,
  ) {
    const { colorScheme, colors, hasMantineContext } = useBBUITheme();
    const root = (
      <MantinePagination.Root
        {...props}
        className={getRootClassName(className)}
        {...(color === undefined ? {} : { color })}
        data-bbui-pagination-color={color === undefined ? "default" : undefined}
        getItemProps={withBodyTextItemLabels(getItemProps)}
        ref={ref}
        style={[getPaginationThemeStyle(colors), style]}
      />
    );

    return ensureBBUIMantineProvider(root, hasMantineContext, colorScheme);
  },
);

const StyledPagination = forwardRef<HTMLDivElement, PaginationProps>(
  function StyledPagination(
    { className, color, getControlProps, getItemProps, style, ...props },
    ref,
  ) {
    const { colorScheme, colors, hasMantineContext } = useBBUITheme();
    const pagination = (
      <MantinePagination
        {...props}
        className={getRootClassName(className)}
        {...(color === undefined ? {} : { color })}
        data-bbui-pagination-color={color === undefined ? "default" : undefined}
        getControlProps={withBBUIControlProps(getControlProps)}
        getItemProps={withBodyTextItemLabels(getItemProps)}
        ref={ref}
        style={[getPaginationThemeStyle(colors), style]}
      />
    );

    return ensureBBUIMantineProvider(
      pagination,
      hasMantineContext,
      colorScheme,
    );
  },
);

export const Pagination = Object.assign(
  StyledPagination,
  MantinePagination,
  { Root: StyledPaginationRoot },
);
