import type { ElementType, ReactElement } from "react";
import { Title } from "@mantine/core";
import type { TitleOrder, TitleProps } from "@mantine/core";
import { budgetBoardTypography } from "../theme";
import {
  ensureBBUIMantineProvider,
  useBBUITheme,
} from "../shared/themeStyles";
import type { TextTone } from "../shared/TextRole";

export type HeadingTextProps = Omit<TitleProps, "component" | "order"> & {
  component?: ElementType;
  level?: TitleOrder;
  tone?: TextTone;
};

const toneColorKeys = {
  primary: "textPrimary",
  secondary: "textSecondary",
  metadata: "textMetadata",
  muted: "textMuted",
} as const;

export function HeadingText({
  children,
  className,
  c,
  component,
  ff,
  fw,
  level = 2,
  tone = "primary",
  ...titleProps
}: HeadingTextProps): ReactElement {
  const { colorScheme, colors, hasMantineContext } = useBBUITheme();
  const colorKey = toneColorKeys[tone];
  const element = (
    <Title
      {...titleProps}
      c={
        c ??
          `var(--bb-color-text-${tone}, ${colors[colorKey]})`
      }
      className={className}
      component={component ?? `h${level}`}
      data-budget-board-text-role="heading"
      ff={ff ?? budgetBoardTypography.display}
      fw={fw ?? 700}
      order={level}
    >
      {children}
    </Title>
  );

  return ensureBBUIMantineProvider(
    element,
    hasMantineContext,
    colorScheme,
  );
}
