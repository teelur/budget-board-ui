import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createRef } from "react";
import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "../src/Pagination/Pagination";
import classes from "../src/Pagination/Pagination.module.css";

const paginationStyles = readFileSync(
  resolve(process.cwd(), "src/Pagination/Pagination.module.css"),
  "utf8",
);

describe("Pagination", () => {
  it("uses BBUI primary tokens instead of Mantine primary colors", () => {
    expect(paginationStyles).toContain(
      "--bbui-pagination-active: var(--bb-color-primary, #4c6ef5);",
    );
    expect(paginationStyles).toContain(
      "--bbui-pagination-active: var(--bb-color-primary, #91a7ff);",
    );
    expect(paginationStyles).not.toContain("--mantine-primary-color");
  });

  it("supports uncontrolled pagination and forwards Mantine props", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Pagination
        aria-label="Transaction pages"
        defaultValue={2}
        getControlProps={(control) => ({ "data-control": control })}
        getItemProps={(page) => ({ "data-page": page })}
        id="transaction-pagination"
        onChange={onChange}
        total={8}
        withEdges
      />,
    );

    const currentPage = screen.getByRole("button", { name: "2" });
    expect(currentPage).toHaveAttribute("aria-current", "page");
    expect(currentPage).toHaveAttribute("data-page", "2");
    expect(currentPage).toHaveAttribute("data-budget-board-color", "primary");
    expect(currentPage).toHaveAttribute("data-budget-board-selected", "true");
    const navigationControls = screen
      .getAllByRole("button")
      .filter((control) => control.querySelector("svg"));
    expect(navigationControls).toHaveLength(4);
    for (const [index, control] of navigationControls.entries()) {
      expect(control).toHaveAttribute("data-budget-board-color", "primary");
      expect(control).toHaveAttribute(
        "data-control",
        ["first", "previous", "next", "last"][index],
      );
    }
    expect(currentPage.style.getPropertyValue("--bbui-button-bg")).toBe(
      "var(--budget-board-button-primary-background, var(--bb-color-primary, #4c6ef5))",
    );
    expect(screen.getByRole("button", { name: "1" })).toHaveAttribute(
      "data-budget-board-selected",
      "false",
    );
    expect(
      screen.getByText("2", {
        selector: '[data-budget-board-text-role="body"]',
      }),
    ).toBeInTheDocument();
    expect(currentPage.closest("#transaction-pagination")).toHaveAttribute(
      "aria-label",
      "Transaction pages",
    );

    await user.click(screen.getByRole("button", { name: "3" }));

    expect(onChange).toHaveBeenCalledWith(3);
    expect(screen.getByRole("button", { name: "3" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("button", { name: "3" })).toHaveAttribute(
      "data-budget-board-selected",
      "true",
    );
  });

  it("keeps controlled state in sync with the value prop", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(
      <Pagination onChange={onChange} total={5} value={2} />,
    );

    await user.click(screen.getByRole("button", { name: "3" }));

    expect(onChange).toHaveBeenCalledWith(3);
    expect(screen.getByRole("button", { name: "2" })).toHaveAttribute(
      "aria-current",
      "page",
    );

    rerender(<Pagination onChange={onChange} total={5} value={3} />);

    expect(screen.getByRole("button", { name: "3" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("preserves consumer classes and forwards refs and attributes", () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <Pagination
        className="consumer-root"
        classNames={{ control: "consumer-control", root: "consumer-mantine-root" }}
        color="red"
        data-testid="pagination"
        id="styled-pagination"
        ref={ref}
        total={6}
        value={4}
      />,
    );

    const root = screen.getByTestId("pagination");

    expect(root).toHaveClass(
      classes.root,
      "consumer-root",
      "consumer-mantine-root",
    );
    expect(root).not.toHaveAttribute("data-bbui-pagination-color");
    expect(screen.getByRole("button", { name: "4" })).toHaveClass(
      "consumer-control",
    );
    expect(ref.current).toBe(root);
    expect(root).toHaveAttribute("id", "styled-pagination");
  });

  it("uses BBUI's default primary treatment and dark theme class", () => {
    const { rerender } = render(
      <Pagination data-testid="light-pagination" total={4} value={2} />,
    );

    const lightRoot = screen.getByTestId("light-pagination");
    expect(lightRoot).toHaveAttribute("data-bbui-pagination-color", "default");
    expect(lightRoot).toHaveClass(classes.root);

    rerender(
      <MantineProvider forceColorScheme="dark">
        <Pagination data-testid="dark-pagination" total={4} value={2} />
      </MantineProvider>,
    );

    expect(screen.getByTestId("dark-pagination")).toHaveClass(classes.dark);
  });

  it("retains Mantine's compound API with BBUI styling on the root", () => {
    render(
      <Pagination.Root
        data-testid="compound-pagination"
        defaultValue={1}
        total={4}
      >
        <Pagination.Items />
      </Pagination.Root>,
    );

    expect(screen.getByTestId("compound-pagination")).toHaveClass(classes.root);
    expect(screen.getByRole("button", { name: "1" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(
      screen.getByText("1", {
        selector: '[data-budget-board-text-role="body"]',
      }),
    ).toBeInTheDocument();
  });
});
