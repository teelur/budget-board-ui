import {
  forwardRef,
  type CSSProperties,
  type MouseEventHandler,
  type ReactNode,
} from "react";
import {
  Card as MantineCard,
  createPolymorphicComponent,
} from "@mantine/core";
import type {
  CardProps as MantineCardProps,
  CardSectionProps as MantineCardSectionProps,
  DividerProps as MantineDividerProps,
} from "@mantine/core";
import { ensureBBUIMantineProvider, useBBUITheme } from "../shared/themeStyles";
import { Divider } from "../Divider/Divider";
import classes from "./Card.module.css";

export type CardSurface = "default" | "elevated" | "sunken" | "outline";
export type CardSeparatorThickness = "default" | "thick";

export type CardProps = MantineCardProps & {
  hoverable?: boolean;
  selected?: boolean;
  surface?: CardSurface;
};

type CardPartProps = MantineCardSectionProps & {
  children?: ReactNode;
  "data-orientation"?: "horizontal" | "vertical";
  hoverable?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  separatorThickness?: CardSeparatorThickness;
};

export type CardSectionProps = CardPartProps &
  Pick<MantineDividerProps, "label" | "labelPosition">;

function mergeClassName(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

const CardPart = forwardRef<HTMLDivElement, CardPartProps>(function CardPart(
  {
    "data-orientation": orientation = "vertical",
    className,
    hoverable = false,
    inheritPadding = false,
    p,
    separatorThickness = "default",
    withBorder = true,
    ...props
  },
  ref,
) {
  return (
    <MantineCard.Section
      {...props}
      className={mergeClassName(
        classes.section,
        hoverable ? classes.hoverable : undefined,
        className,
      )}
      data-orientation={orientation}
      data-budget-board-separator-thickness={separatorThickness}
      inheritPadding={inheritPadding}
      {...(p === undefined ? {} : { p })}
      ref={ref}
      withBorder={withBorder}
    />
  );
});

CardPart.displayName = "@mantine/core/CardSection";

const CardSectionRoot = forwardRef<HTMLDivElement, CardSectionProps>(
  function CardSectionRoot(
    {
      children,
      className,
      label,
      labelPosition = "center",
      withBorder = true,
      ...props
    },
    ref,
  ) {
    const hasLabel = label !== undefined && label !== null && withBorder;

    return (
      <CardPart
        {...props}
        className={mergeClassName(
          className,
          hasLabel ? classes.labeledSection : undefined,
        )}
        ref={ref}
        withBorder={withBorder}
      >
        {children}
        {hasLabel ? (
          <Divider
            className={mergeClassName(classes.divider, classes.sectionDivider)}
            label={label}
            labelPosition={labelPosition}
          />
        ) : null}
      </CardPart>
    );
  },
);

CardSectionRoot.displayName = "@mantine/core/CardSection";
const CardSection = createPolymorphicComponent<"div", CardSectionProps>(
  CardSectionRoot,
);

const CardRoot = forwardRef<HTMLDivElement, CardProps>(function CardRoot(
  {
    className,
    hoverable = false,
    p,
    padding,
    selected,
    style,
    surface = "default",
    withBorder = true,
    ...props
  },
  ref,
) {
  const { colors, colorScheme, hasMantineContext } = useBBUITheme();
  const sectionPadding =
    typeof p === "string" || typeof p === "number"
      ? p
      : padding ?? "0.5rem";
  const cardPadding = p ?? padding ?? "0.5rem";
  const card = (
    <MantineCard
      {...props}
      className={mergeClassName(
        classes.root,
        hoverable ? classes.hoverable : undefined,
        selected ? classes.selected : undefined,
        className,
      )}
      data-budget-board-selected={
        selected === undefined ? undefined : selected ? "true" : "false"
      }
      p={cardPadding}
      padding={sectionPadding}
      ref={ref}
      style={[
        {
          "--bbui-card-surface":
            surface === "sunken"
              ? `var(--bb-color-surface-sunken, ${colors.surfaceSunken})`
              : surface === "elevated"
                ? `var(--bb-color-surface-elevated, ${colors.surfaceElevated})`
                : surface === "outline"
                  ? `var(--bb-color-page, ${colors.page})`
                  : `var(--bb-color-surface, ${colors.surface})`,
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
    Section: CardSection,
  },
);
