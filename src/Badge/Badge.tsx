import { useContext, type ReactNode } from "react";
import { Box, MantineContext, MantineProvider } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import type { BoxProps } from "@mantine/core";
import { budgetBoardColors } from "../colors";
import {
  badgeColors,
  badgeVariants,
  getBadgeVariantStyles,
  type BadgeColor,
  type BadgeVariant,
} from "../shared/badgeStyles";
import classes from "./Badge.module.css";

export { badgeColors, badgeVariants };
export type { BadgeColor, BadgeVariant };

export const badgeSizes = ["xs", "sm", "md"] as const;
export type BadgeSize = (typeof badgeSizes)[number];

export interface BadgeProps extends Omit<
  BoxProps,
  "children" | "color" | "component" | "style" | "variant"
> {
  children?: ReactNode;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  size?: BadgeSize;
  color?: BadgeColor;
  variant?: BadgeVariant;
  style?: BoxProps["style"];
}

export function Badge({
  children,
  className,
  color = "primary",
  leftSection,
  rightSection,
  size = "md",
  style,
  variant = "filled",
  ...boxProps
}: BadgeProps) {
  const mantineContext = useContext(MantineContext);
  const systemColorScheme = useColorScheme("light");
  const colorScheme =
    mantineContext?.colorScheme === "auto"
      ? systemColorScheme
      : mantineContext?.colorScheme === "dark"
        ? "dark"
        : "light";

  const badge = (
    <Box
      {...boxProps}
      className={[classes.root, classes[size], className]
        .filter(Boolean)
        .join(" ")}
      component="span"
      data-budget-board-badge-color={color}
      data-budget-board-badge-size={size}
      data-budget-board-badge-variant={variant}
      style={[
        getBadgeVariantStyles(budgetBoardColors[colorScheme], color, variant),
        style,
      ]}
    >
      {leftSection && (
        <span aria-hidden="true" className={classes.section}>
          {leftSection}
        </span>
      )}
      <span className={classes.content}>{children}</span>
      {rightSection && (
        <span aria-hidden="true" className={classes.section}>
          {rightSection}
        </span>
      )}
    </Box>
  );

  return mantineContext ? badge : <MantineProvider>{badge}</MantineProvider>;
}
