import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createRef } from "react";
import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Table } from "../src/Table/Table";
import classes from "../src/Table/Table.module.css";
import { budgetBoardDarkTheme } from "../src/theme";

const tableStyles = readFileSync(
  resolve(process.cwd(), "src/Table/Table.module.css"),
  "utf8",
);

describe("Table", () => {
  it("renders Mantine compound elements with BBUI semantic colors and typography", () => {
    render(
      <Table
        aria-label="Budget overview"
        data-testid="budget-table"
        highlightOnHover
        striped
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th scope="col">Category</Table.Th>
            <Table.Th scope="col">Budget</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>Groceries</Table.Td>
            <Table.Td>$450</Table.Td>
          </Table.Tr>
        </Table.Tbody>
        <Table.Caption>Monthly budget totals</Table.Caption>
      </Table>,
    );

    const table = screen.getByRole("table", { name: "Budget overview" });

    expect(table).toHaveClass(classes.table);
    expect(table.style.getPropertyValue("--table-border-color")).toBe(
      "var(--bb-color-border-subtle, #d8d5ce)",
    );
    expect(table.style.getPropertyValue("--table-striped-color")).toBe(
      "var(--bb-color-surface-sunken, #ebe8df)",
    );
    expect(
      table.style.getPropertyValue("--table-highlight-on-hover-color"),
    ).toBe("var(--bb-color-surface-hover, #d8d5ce)");
    expect(table.style.getPropertyValue("--bbui-table-text")).toBe(
      "var(--bb-color-text-primary, #3a3834)",
    );
    expect(table.style.getPropertyValue("--bbui-table-heading")).toBe(
      "var(--bb-color-text-heading, #242321)",
    );
    expect(screen.getByRole("columnheader", { name: "Category" })).toBeInTheDocument();
    expect(screen.getByText("Groceries")).toBeInTheDocument();
    expect(screen.getByText("Monthly budget totals")).toBeInTheDocument();
    expect(tableStyles).toContain("font-weight: 600;");
    expect(tableStyles).toContain("color: var(--bbui-table-caption);");
  });

  it("uses the dark BBUI palette", () => {
    render(
      <MantineProvider
        env="test"
        forceColorScheme="dark"
        theme={budgetBoardDarkTheme}
      >
        <Table
          data-testid="dark-table"
          highlightOnHover
          striped
        >
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>Checking</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </MantineProvider>,
    );

    const table = screen.getByTestId("dark-table");

    expect(table.style.getPropertyValue("--table-border-color")).toBe(
      "var(--bb-color-border-subtle, #3a3d42)",
    );
    expect(table.style.getPropertyValue("--table-striped-color")).toBe(
      "var(--bb-color-surface-sunken, #0d0f12)",
    );
    expect(table.style.getPropertyValue("--table-highlight-on-hover-color")).toBe(
      "var(--bb-color-surface-hover, #34373a)",
    );
    expect(table.style.getPropertyValue("--bbui-table-text")).toBe(
      "var(--bb-color-text-primary, #d8d5ce)",
    );
  });

  it("forwards Mantine props, refs, classes, and consumer variable overrides", () => {
    const ref = createRef<HTMLTableElement>();
    const vars = vi.fn(() => ({
      table: { "--table-border-color": "tomato" },
    }));

    render(
      <Table
        borderColor="#123456"
        className="consumer-table"
        classNames={{ th: "consumer-heading" }}
        data-testid="custom-table"
        highlightOnHover
        highlightOnHoverColor="#fedcba"
        ref={ref}
        striped
        stripedColor="#abcdef"
        vars={vars}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th scope="col">Account</Table.Th>
          </Table.Tr>
        </Table.Thead>
      </Table>,
    );

    const table = screen.getByTestId("custom-table");

    expect(table).toHaveClass(classes.table, "consumer-table");
    expect(table.style.getPropertyValue("--table-border-color")).toBe("tomato");
    expect(table.style.getPropertyValue("--table-striped-color")).toBe("#abcdef");
    expect(table.style.getPropertyValue("--table-highlight-on-hover-color")).toBe(
      "#fedcba",
    );
    expect(screen.getByRole("columnheader", { name: "Account" })).toHaveClass(
      "consumer-heading",
    );
    expect(ref.current).toBe(table);
    expect(vars).toHaveBeenCalled();
  });

  it("renders Mantine table data", () => {
    render(
      <Table
        data={{
          head: ["Category", "Amount"],
          body: [["Utilities", "$120"]],
          foot: ["Total", "$120"],
          caption: "Monthly spending",
        }}
        data-testid="data-table"
      />,
    );

    expect(screen.getByRole("table", { name: "Monthly spending" })).toBe(
      screen.getByTestId("data-table"),
    );
    expect(screen.getByRole("columnheader", { name: "Category" })).toBeInTheDocument();
    expect(screen.getByText("Utilities")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
  });
});
