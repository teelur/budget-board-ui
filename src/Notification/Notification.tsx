import { forwardRef } from "react";
import {
  Notification as MantineNotification,
  type NotificationProps as MantineNotificationProps,
} from "@mantine/core";
import { buttonColors, type ButtonColor } from "../shared/buttonStyles";
import { ensureBBUIMantineProvider, useBBUITheme } from "../shared/themeStyles";
import { mergeClassNames, mergeStyles } from "../shared/styleSlots";
import classes from "./Notification.module.css";

export const notificationColors = buttonColors;
export type NotificationColor =
  | ButtonColor
  | NonNullable<MantineNotificationProps["color"]>;

export type NotificationProps = Omit<MantineNotificationProps, "color"> & {
  color?: NotificationColor;
};

function isSemanticColor(color: NotificationColor): color is ButtonColor {
  return (
    typeof color === "string" &&
    (notificationColors as readonly string[]).includes(color)
  );
}

const notificationClassNames = {
  root: classes.root,
  icon: classes.icon,
  loader: classes.loader,
  body: classes.body,
  title: classes.title,
  description: classes.description,
  closeButton: classes.closeButton,
};

const NotificationRoot = forwardRef<HTMLDivElement, NotificationProps>(
  function NotificationRoot(
    {
      classNames,
      className,
      color,
      p,
      styles,
      vars,
      withBorder,
      ...props
    },
    ref,
  ) {
    const { colorScheme, colors, hasMantineContext } = useBBUITheme();
    const semanticColor =
      color === undefined
        ? "info"
        : isSemanticColor(color)
          ? color
          : undefined;

    const mergedVars: NonNullable<NotificationProps["vars"]> = (
      theme,
      notificationProps,
      ctx,
    ) => {
      const consumerVars = vars?.(theme, notificationProps, ctx);
      if (!semanticColor) {
        return {
          ...consumerVars,
          root: { ...consumerVars?.root },
        };
      }

      return {
        ...consumerVars,
        root: {
          "--notification-color": `var(--bb-color-${semanticColor}, ${colors[semanticColor]})`,
          ...consumerVars?.root,
        },
      };
    };

    const notificationStyles = mergeStyles(styles, {
      root: {
        backgroundColor: `color-mix(in srgb, var(--notification-color) 15%, var(--bb-color-surface-elevated, ${colors.surfaceElevated}))`,
        borderColor: `color-mix(in srgb, var(--notification-color) 35%, var(--bb-color-border-subtle, ${colors.borderSubtle}))`,
        boxShadow: "var(--mantine-shadow-lg)",
      },
    }) as NonNullable<NotificationProps["styles"]>;

    const notification = (
      <MantineNotification
        {...props}
        className={[classes.root, className].filter(Boolean).join(" ")}
        classNames={
          mergeClassNames(
            classNames,
            notificationClassNames,
          ) as NonNullable<NotificationProps["classNames"]>
        }
        color={color ?? "info"}
        data-budget-board-notification-color={semanticColor}
        p={p ?? "0.5rem"}
        ref={ref}
        styles={notificationStyles}
        vars={mergedVars}
        withBorder={withBorder ?? true}
      />
    );

    return ensureBBUIMantineProvider(
      notification,
      hasMantineContext,
      colorScheme,
    );
  },
);

export const Notification = NotificationRoot;
