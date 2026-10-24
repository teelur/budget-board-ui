import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  MonthToolcards,
  type MonthToolcardsProps,
  type MonthToolcardStatus,
} from "../src";
import cardClasses from "../src/Card/Card.module.css";

vi.mock("@mantine/hooks", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("@mantine/hooks")>();

  return {
    ...actual,
    useElementSize: () => ({
      height: 0,
      ref: { current: null },
      width: 512,
    }),
  };
});

function createProps(
  overrides: Partial<MonthToolcardsProps> = {},
): MonthToolcardsProps {
  return {
    allowSelectMultiple: true,
    getMonthStatus: () => "positive",
    isPending: false,
    selectedDates: [],
    setSelectedDates: vi.fn(),
    ...overrides,
  };
}

describe("MonthToolcards", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 18, 12));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders responsive month buttons with semantic status colors", () => {
    render(
      <MonthToolcards
        {...createProps({
          selectedDates: [new Date(2026, 9, 1)],
          getMonthStatus: (): MonthToolcardStatus => "positive",
        })}
      />,
    );

    const monthButtons = screen
      .getAllByRole("button")
      .filter((button) => button.hasAttribute("aria-pressed"));

    expect(monthButtons).toHaveLength(6);
    expect(
      screen.getByRole("button", { name: "October 2026" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByRole("button", { name: "October 2026" }),
    ).toHaveClass(cardClasses.hoverable, cardClasses.selected);
    expect(
      screen
        .getByRole("button", { name: "October 2026" })
        .style.getPropertyValue("--bbui-month-toolcard-primary"),
    ).toBe("");
    expect(
      screen.getByRole("button", { name: "October 2026" }).querySelector(
        "[data-month-status]",
      ),
    ).toHaveStyle({
      backgroundColor: "var(--bb-color-success, #27803d)",
    });
    expect(
      screen.getByRole("button", { name: "October 2026" }),
    ).toHaveAttribute("data-budget-board-selected", "true");
  });

  it("uses the error semantic color for negative months", () => {
    render(
      <MonthToolcards
        {...createProps({ getMonthStatus: () => "negative" })}
      />,
    );

    expect(
      screen
        .getByRole("button", { name: "October 2026" })
        .querySelector("[data-month-status]"),
    ).toHaveStyle({
      backgroundColor: "var(--bb-color-error, #c92a2a)",
    });
  });

  it("uses the sunken surface while pending and bypasses status lookup", () => {
    const getMonthStatus = vi.fn<MonthToolcardsProps["getMonthStatus"]>();

    render(
      <MonthToolcards
        {...createProps({ getMonthStatus, isPending: true })}
      />,
    );

    const statusStrip = screen
      .getByRole("button", { name: "October 2026" })
      .querySelector("[data-month-status]");

    expect(statusStrip).toHaveAttribute("data-month-status", "pending");
    expect(statusStrip).toHaveStyle({
      backgroundColor: "var(--bb-color-surface-sunken, #ebe8df)",
    });
    expect(getMonthStatus).not.toHaveBeenCalled();
  });

  it("toggles selected months when multiple selection is enabled", () => {
    const setSelectedDates =
      vi.fn<MonthToolcardsProps["setSelectedDates"]>();
    const selectedDate = new Date(2026, 9, 1);

    render(
      <MonthToolcards
        {...createProps({
          selectedDates: [selectedDate],
          setSelectedDates,
        })}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "September 2026" }));

    const update = setSelectedDates.mock.calls[0]?.[0];

    expect(typeof update).toBe("function");
    if (typeof update === "function") {
      expect(update([selectedDate])).toEqual([
        new Date(2026, 8, 1),
        selectedDate,
      ]);
      expect(update([selectedDate, new Date(2026, 8, 1)])).toEqual([
        selectedDate,
      ]);
    }
  });

  it("replaces the selection when multiple selection is disabled", () => {
    const setSelectedDates =
      vi.fn<MonthToolcardsProps["setSelectedDates"]>();
    const selectedDate = new Date(2026, 9, 1);

    render(
      <MonthToolcards
        {...createProps({
          allowSelectMultiple: false,
          selectedDates: [selectedDate],
          setSelectedDates,
        })}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "September 2026" }));

    const update = setSelectedDates.mock.calls[0]?.[0];

    expect(typeof update).toBe("function");
    if (typeof update === "function") {
      expect(update([selectedDate])).toEqual([new Date(2026, 8, 1)]);
    }
  });

  it("navigates older months and gates future months unless enabled", () => {
    const { unmount } = render(<MonthToolcards {...createProps()} />);

    expect(
      screen.getByRole("button", { name: "Show newer months" }),
    ).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: "Show older months" }));
    expect(
      screen.getByRole("button", { name: "September 2026" }),
    ).toBeInTheDocument();

    unmount();
    render(
      <MonthToolcards {...createProps({ allowFutureMonths: true })} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Show newer months" }));

    expect(
      screen.getByRole("button", { name: "November 2026" }),
    ).toBeInTheDocument();
  });
});
