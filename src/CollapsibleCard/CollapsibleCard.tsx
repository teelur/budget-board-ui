import { useId, useState } from "react";
import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Card } from "../Card/Card";
import type { CardProps } from "../Card/Card";
import classes from "./CollapsibleCard.module.css";

export type CollapsibleCardProps = Omit<
  CardProps,
  "children" | "p" | "padding"
> & {
  title: ReactNode;
  children: ReactNode;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
};

function mergeClassName(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function CollapsibleCard({
  children,
  className,
  defaultExpanded = true,
  expanded,
  onExpandedChange,
  title,
  ...cardProps
}: CollapsibleCardProps) {
  const [uncontrolledExpanded, setUncontrolledExpanded] =
    useState(defaultExpanded);
  const isExpanded = expanded ?? uncontrolledExpanded;
  const id = useId();
  const controlId = `${id}-control`;
  const panelId = `${id}-panel`;

  const toggleExpanded = () => {
    const nextExpanded = !isExpanded;
    if (expanded === undefined) {
      setUncontrolledExpanded(nextExpanded);
    }
    onExpandedChange?.(nextExpanded);
  };

  return (
    <Card
      {...cardProps}
      className={mergeClassName(classes.root, className)}
      data-budget-board-expanded={isExpanded ? "true" : "false"}
      p={0}
    >
      <button
        aria-controls={panelId}
        aria-expanded={isExpanded}
        className={classes.header}
        id={controlId}
        onClick={toggleExpanded}
        type="button"
      >
        <span className={classes.title}>{title}</span>
        <ChevronDown
          aria-hidden="true"
          className={mergeClassName(
            classes.chevron,
            isExpanded ? classes.chevronExpanded : undefined,
          )}
          size={16}
        />
      </button>
      <div
        aria-labelledby={controlId}
        className={mergeClassName(
          classes.panel,
          isExpanded ? classes.panelExpanded : undefined,
        )}
        id={panelId}
        inert={!isExpanded || undefined}
        role="region"
      >
        <div className={classes.panelInner}>
          <div className={classes.content}>{children}</div>
        </div>
      </div>
    </Card>
  );
}
