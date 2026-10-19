import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useElementSize } from "@mantine/hooks";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ActionIcon } from "../ActionIcon/ActionIcon";
import { BodyText } from "../BodyText/BodyText";
import { Card } from "../Card/Card";
import { useBBUITheme } from "../shared/themeStyles";
import classes from "./MonthToolcards.module.css";

export type MonthToolcardStatus = "positive" | "neutral" | "negative";

export interface MonthToolcardsProps {
  selectedDates: Date[];
  setSelectedDates: Dispatch<SetStateAction<Date[]>>;
  getMonthStatus: (date: Date) => MonthToolcardStatus;
  isPending: boolean;
  allowSelectMultiple: boolean;
  allowFutureMonths?: boolean;
  locale?: string;
  olderMonthsLabel?: string;
  newerMonthsLabel?: string;
}

const pageButtonWidth = 36;
const monthCardSlotWidth = 68;

function getMonthDate(monthsAgo: number): Date {
  const date = new Date();
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  date.setMonth(date.getMonth() - monthsAgo);
  return date;
}

export function MonthToolcards({
  selectedDates,
  setSelectedDates,
  getMonthStatus,
  isPending,
  allowSelectMultiple,
  allowFutureMonths = false,
  locale,
  olderMonthsLabel = "Show older months",
  newerMonthsLabel = "Show newer months",
}: MonthToolcardsProps) {
  const { ref, width } = useElementSize();
  const { colors } = useBBUITheme();
  const [index, setIndex] = useState(0);
  const dates = Array.from(
    {
      length: Math.floor(
        (width - pageButtonWidth * 2) / monthCardSlotWidth,
      ),
    },
    (_, i) => getMonthDate(i + index),
  );
  const monthFormatter = new Intl.DateTimeFormat(locale, { month: "short" });
  const yearFormatter = new Intl.DateTimeFormat(locale, { year: "numeric" });
  const accessibleDateFormatter = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  });

  const handleClick = (date: Date) => {
    setSelectedDates((currentDates) => {
      if (!allowSelectMultiple) {
        return [date];
      }

      const isSelected = currentDates.some(
        (selectedDate) => selectedDate.getTime() === date.getTime(),
      );

      return isSelected
        ? currentDates.filter(
            (selectedDate) => selectedDate.getTime() !== date.getTime(),
          )
        : [date, ...currentDates];
    });
  };

  return (
    <div className={classes.root} ref={ref}>
      <ActionIcon
        aria-label={olderMonthsLabel}
        className={classes.navButton}
        color="primary"
        flex="0 0 auto"
        h={62}
        onClick={() => setIndex((currentIndex) => currentIndex + 1)}
        size={32}
        variant="outline"
        w={32}
      >
        <ChevronLeft aria-hidden="true" size={24} />
      </ActionIcon>
      <div className={classes.months}>
        {dates.map((date) => {
          const isSelected = selectedDates.some(
            (selectedDate) => selectedDate.getTime() === date.getTime(),
          );
          const status = isPending ? "pending" : getMonthStatus(date);
          const statusColor =
            status === "positive"
              ? `var(--bb-color-success, ${colors.success})`
              : status === "negative"
                ? `var(--bb-color-error, ${colors.error})`
                : `var(--bb-color-surface-sunken, ${colors.surfaceSunken})`;

          return (
            <Card
              aria-label={accessibleDateFormatter.format(date)}
              aria-pressed={isSelected}
              className={classes.card}
              component="button"
              h="62px"
              hoverable
              key={date.getTime()}
              onClick={() => handleClick(date)}
              p="0.125rem"
              selected={isSelected}
              type="button"
              w="60px"
            >
              <div className={classes.cardContent}>
                <div
                  aria-hidden="true"
                  className={classes.statusStrip}
                  data-month-status={status}
                  style={{ backgroundColor: statusColor }}
                />
                <BodyText component="span" fw={500} m={0} size="sm">
                  {monthFormatter.format(date)}
                </BodyText>
                <BodyText component="span" m={0} size="xs" tone="secondary">
                  {yearFormatter.format(date)}
                </BodyText>
              </div>
            </Card>
          );
        })}
      </div>
      <ActionIcon
        aria-label={newerMonthsLabel}
        className={classes.navButton}
        color="primary"
        disabled={index <= 0 && !allowFutureMonths}
        flex="0 0 auto"
        h={62}
        onClick={() => setIndex((currentIndex) => currentIndex - 1)}
        size={32}
        variant="outline"
        w={32}
      >
        <ChevronRight aria-hidden="true" size={24} />
      </ActionIcon>
    </div>
  );
}
