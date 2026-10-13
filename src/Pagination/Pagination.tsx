import { forwardRef } from "react";
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

function getRootClassName(className: string | undefined, colorScheme: string) {
  return [
    classes.root,
    colorScheme === "dark" && classes.dark,
    className,
  ]
    .filter(Boolean)
    .join(" ");
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
    { className, color, getItemProps, ...props },
    ref,
  ) {
    const { colorScheme, hasMantineContext } = useBBUITheme();
    const root = (
      <MantinePagination.Root
        {...props}
        className={getRootClassName(className, colorScheme)}
        {...(color === undefined ? {} : { color })}
        data-bbui-pagination-color={color === undefined ? "default" : undefined}
        getItemProps={withBodyTextItemLabels(getItemProps)}
        ref={ref}
      />
    );

    return ensureBBUIMantineProvider(root, hasMantineContext, colorScheme);
  },
);

const StyledPagination = forwardRef<HTMLDivElement, PaginationProps>(
  function StyledPagination(
    { className, color, getControlProps, getItemProps, ...props },
    ref,
  ) {
    const { colorScheme, hasMantineContext } = useBBUITheme();
    const pagination = (
      <MantinePagination
        {...props}
        className={getRootClassName(className, colorScheme)}
        {...(color === undefined ? {} : { color })}
        data-bbui-pagination-color={color === undefined ? "default" : undefined}
        getControlProps={withBBUIControlProps(getControlProps)}
        getItemProps={withBodyTextItemLabels(getItemProps)}
        ref={ref}
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
