import { createElement } from "react";
import type { ElementType, ReactElement, ReactNode } from "react";
import { Text } from "@mantine/core";
import type { TextProps } from "@mantine/core";
import type { BudgetBoardColorMode } from "../colors";
import { budgetBoardTypography } from "../theme";
import {
  ensureBBUIMantineProvider,
  useBBUITheme,
} from "./themeStyles";
import classes from "./textStyles.module.css";

export type TextTone = "primary" | "secondary" | "metadata" | "muted";

export type TextRoleProps = Omit<TextProps, "component"> & {
  children?: ReactNode;
  component?: ElementType;
  tone?: TextTone;
};

type TextRoleName = "display" | "body" | "caption" | "data";

const roleDefaults = {
  display: {
    component: "span",
    font: budgetBoardTypography.display,
    size: "md",
    tone: "primary",
    weight: 700,
  },
  body: {
    component: "p",
    font: budgetBoardTypography.body,
    size: "md",
    tone: "primary",
    weight: 400,
  },
  caption: {
    component: "span",
    font: budgetBoardTypography.body,
    size: "sm",
    tone: "secondary",
    weight: 400,
  },
  data: {
    component: "span",
    font: budgetBoardTypography.data,
    size: "md",
    tone: "primary",
    weight: 500,
  },
} as const;

type TextRoleDefaults = {
  component: ElementType;
  font: string;
  size: NonNullable<TextProps["size"]>;
  tone: TextTone;
  weight: number;
};

const toneColorKeys = {
  primary: "textPrimary",
  secondary: "textSecondary",
  metadata: "textMetadata",
  muted: "textMuted",
} as const;

function getToneColor(tone: TextTone, colors: BudgetBoardColorMode) {
  const colorKey = toneColorKeys[tone];
  return `var(--bb-color-text-${tone}, ${colors[colorKey]})`;
}

export function TextRole({
  children,
  className,
  c,
  component,
  ff,
  fz,
  fw,
  lh,
  role,
  size,
  tone,
  ...textProps
}: TextRoleProps & { role: TextRoleName }): ReactElement {
  const { colorScheme, colors, hasMantineContext } = useBBUITheme();
  const defaults: TextRoleDefaults = roleDefaults[role];
  const displayStyleProps =
    role === "display"
      ? { fz: fz ?? "1.6rem", lh: lh ?? 1.1 }
      : {
          ...(fz === undefined ? {} : { fz }),
          ...(lh === undefined ? {} : { lh }),
        };
  const element = (
    <Text
      {...textProps}
      c={c ?? getToneColor(tone ?? defaults.tone, colors)}
      className={[
        role === "data" ? classes.data : undefined,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-budget-board-text-role={role}
      ff={ff ?? defaults.font}
      fw={fw ?? defaults.weight}
      renderRoot={(props) =>
        createElement(component ?? defaults.component, props)
      }
      size={size ?? defaults.size}
      {...displayStyleProps}
    >
      {children}
    </Text>
  );

  return ensureBBUIMantineProvider(
    element,
    hasMantineContext,
    colorScheme,
  );
}
