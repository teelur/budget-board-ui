import { forwardRef, type CSSProperties, type ReactNode } from "react";
import {
  Card as MantineCard,
  createPolymorphicComponent,
  Divider as MantineDivider,
} from "@mantine/core";
import type {
  CardProps as MantineCardProps,
  CardSectionProps as MantineCardSectionProps,
  DividerProps as MantineDividerProps,
} from "@mantine/core";
import { ensureBBUIMantineProvider, useBBUITheme } from "../shared/themeStyles";
import classes from "./Card.module.css";

export type CardProps = MantineCardProps & {
  hoverable?: boolean;
};

type CardPartProps = MantineCardSectionProps & {
  children?: ReactNode;
  "data-orientation"?: "horizontal" | "vertical";
};

export type CardHeaderProps = CardPartProps;
export type CardSectionProps = CardPartProps &
  Pick<MantineDividerProps, "label" | "labelPosition">;

function mergeClassName(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function CardPart({
  "data-orientation": orientation = "vertical",
  className,
  inheritPadding = false,
  p,
  withBorder = true,
  ...props
}: CardPartProps) {
  return (
    <MantineCard.Section
      {...props}
      className={mergeClassName(classes.section, className)}
      data-orientation={orientation}
      inheritPadding={inheritPadding}
      {...(p === undefined ? {} : { p })}
      withBorder={withBorder}
    />
  );
}

CardPart.displayName = "@mantine/core/CardSection";

function CardSection({
  children,
  className,
  label,
  labelPosition = "center",
  withBorder = true,
  ...props
}: CardSectionProps) {
  const hasLabel = label !== undefined && label !== null && withBorder;

  return (
    <CardPart
      {...props}
      className={mergeClassName(
        className,
        hasLabel ? classes.labeledSection : undefined,
      )}
      withBorder={withBorder}
    >
      {children}
      {hasLabel ? (
        <MantineDivider
          className={mergeClassName(classes.divider, classes.sectionDivider)}
          label={label}
          labelPosition={labelPosition}
        />
      ) : null}
    </CardPart>
  );
}

CardSection.displayName = "@teelur/budget-board-ui/CardSection";

const CardRoot = forwardRef<HTMLDivElement, CardProps>(function CardRoot(
  { className, hoverable = false, style, withBorder = true, ...props },
  ref,
) {
  const { colors, colorScheme, hasMantineContext } = useBBUITheme();
  const card = (
    <MantineCard
      {...props}
      className={mergeClassName(
        classes.root,
        hoverable ? classes.hoverable : undefined,
        className,
      )}
      ref={ref}
      style={[
        {
          "--bbui-card-surface": `var(--bb-color-surface, ${colors.surface})`,
          "--bbui-card-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
          "--bbui-card-text": `var(--bb-color-text-primary, ${colors.textPrimary})`,
          "--bbui-card-text-secondary": `var(--bb-color-text-secondary, ${colors.textSecondary})`,
          "--bbui-card-hover-surface": `var(--bb-color-surface-hover, ${colors.surfaceHover})`,
          "--bbui-card-hover-border": `var(--bb-color-border-strong, ${colors.borderStrong})`,
          "--bbui-card-focus-ring": `var(--bb-color-focus-ring, ${colors.focusRing})`,
        } as CSSProperties,
        style,
      ]}
      withBorder={withBorder}
    />
  );

  return ensureBBUIMantineProvider(card, hasMantineContext, colorScheme);
});

export const Card = Object.assign(
  createPolymorphicComponent<"div", CardProps>(CardRoot),
  {
    Header: CardPart,
    Section: CardSection,
  },
);
