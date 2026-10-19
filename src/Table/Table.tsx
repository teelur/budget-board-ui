import { forwardRef, type CSSProperties } from "react";
import {
  Table as MantineTable,
  type TableData as MantineTableData,
  type TableProps as MantineTableProps,
} from "@mantine/core";
import { budgetBoardTypography } from "../theme";
import { ensureBBUIMantineProvider, useBBUITheme } from "../shared/themeStyles";
import classes from "./Table.module.css";

export type TableProps = MantineTableProps;
export type TableData = MantineTableData;

const TableRoot = forwardRef<HTMLTableElement, TableProps>(
  function TableRoot(
    {
      borderColor,
      className,
      highlightOnHoverColor,
      stripedColor,
      style,
      vars,
      ...props
    },
    ref,
  ) {
    const { colorScheme, colors, hasMantineContext } = useBBUITheme();
    const mergedVars: NonNullable<TableProps["vars"]> = (
      theme,
      tableProps,
      ctx,
    ) => {
      const consumerVars = vars?.(theme, tableProps, ctx);

      return {
        table: {
          ...(tableProps.borderColor === undefined
            ? {
                "--table-border-color": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
              }
            : {}),
          ...(tableProps.stripedColor === undefined
            ? {
                "--table-striped-color": `var(--bb-color-surface-sunken, ${colors.surfaceSunken})`,
              }
            : {}),
          ...(tableProps.highlightOnHoverColor === undefined
            ? {
                "--table-highlight-on-hover-color": `var(--bb-color-surface-hover, ${colors.surfaceHover})`,
              }
            : {}),
          ...consumerVars?.table,
        },
      };
    };
    const semanticStyle = {
      "--bbui-table-text": `var(--bb-color-text-primary, ${colors.textPrimary})`,
      "--bbui-table-heading": `var(--bb-color-text-heading, ${colors.textHeading})`,
      "--bbui-table-caption": `var(--bb-color-text-secondary, ${colors.textSecondary})`,
      "--bbui-table-body-font": `var(--bb-font-body, ${budgetBoardTypography.body})`,
      "--bbui-table-heading-font": `var(--bb-font-display, ${budgetBoardTypography.display})`,
    } as CSSProperties;
    const table = (
      <MantineTable
        {...props}
        className={[classes.table, className].filter(Boolean).join(" ")}
        ref={ref}
        style={[semanticStyle, style]}
        vars={mergedVars}
        {...(borderColor === undefined ? {} : { borderColor })}
        {...(highlightOnHoverColor === undefined
          ? {}
          : { highlightOnHoverColor })}
        {...(stripedColor === undefined ? {} : { stripedColor })}
      />
    );

    return ensureBBUIMantineProvider(table, hasMantineContext, colorScheme);
  },
);

TableRoot.displayName = "@mantine/core/Table";

export const Table: typeof MantineTable = Object.assign(
  TableRoot,
  {
    Caption: MantineTable.Caption,
    DataRenderer: MantineTable.DataRenderer,
    ScrollContainer: MantineTable.ScrollContainer,
    Tbody: MantineTable.Tbody,
    Td: MantineTable.Td,
    Tfoot: MantineTable.Tfoot,
    Th: MantineTable.Th,
    Thead: MantineTable.Thead,
    Tr: MantineTable.Tr,
  },
) as typeof MantineTable;
