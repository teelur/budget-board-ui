import { forwardRef } from "react";
import { Pagination as MantinePagination } from "@mantine/core";
import type {
  PaginationProps as MantinePaginationProps,
  PaginationRootProps,
} from "@mantine/core";
import { BodyText } from "../BodyText/BodyText";
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

function withBodyTextItemLabels(
  getItemProps: PaginationRootProps["getItemProps"],
): NonNullable<PaginationRootProps["getItemProps"]> {
  return (page) => {
    const itemProps = getItemProps?.(page);

    return {
      ...itemProps,
      children: itemProps?.children ?? (
        <BodyText component="span">{page}</BodyText>
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
    { className, color, getItemProps, ...props },
    ref,
  ) {
    const { colorScheme, hasMantineContext } = useBBUITheme();
    const pagination = (
      <MantinePagination
        {...props}
        className={getRootClassName(className, colorScheme)}
        {...(color === undefined ? {} : { color })}
        data-bbui-pagination-color={color === undefined ? "default" : undefined}
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
