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

export type TextTone =
  | "heading"
  | "primary"
  | "secondary"
  | "metadata"
  | "muted";

export type TextRoleProps = Omit<TextProps, "component"> & {
  children?: ReactNode;
  component?: ElementType;
  responsive?: boolean;
  tone?: TextTone;
};

type TextRoleName = "display" | "body" | "caption" | "data";

type ResponsiveTextRoleName = TextRoleName | "heading";

const responsiveFontSizes: Record<ResponsiveTextRoleName, string> = {
  display: "clamp(1.25rem, 6cqi, 4rem)",
  body: "clamp(0.875rem, 3cqi, 1.75rem)",
  caption: "clamp(0.75rem, 2.25cqi, 1.25rem)",
  data: "clamp(0.875rem, 5cqi, 3rem)",
  heading: "clamp(1.25rem, 5cqi, 3.5rem)",
};

export function getResponsiveTextFontSize(role: ResponsiveTextRoleName) {
  return responsiveFontSizes[role];
}

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
  heading: "textHeading",
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
  responsive,
  textRole,
  size,
  tone,
  unstyled,
  ...textProps
}: TextRoleProps & { textRole: TextRoleName }): ReactElement {
  const { colorScheme, colors, hasMantineContext } = useBBUITheme();
  const defaults: TextRoleDefaults = roleDefaults[textRole];
  const responsiveFz = responsive
    ? getResponsiveTextFontSize(textRole)
    : undefined;
  const resolvedFz = responsiveFz ?? fz;
  const roleStyleProps = unstyled
    ? {
        ...(c === undefined ? {} : { c }),
        ...(ff === undefined ? {} : { ff }),
        ...(resolvedFz === undefined ? {} : { fz: resolvedFz }),
        ...(fw === undefined ? {} : { fw }),
        ...(lh === undefined ? {} : { lh }),
        ...(size === undefined ? {} : { size }),
      }
    : {
        c: c ?? getToneColor(tone ?? defaults.tone, colors),
        ff: ff ?? defaults.font,
        fw: fw ?? defaults.weight,
        size: size ?? defaults.size,
        ...(textRole === "display"
          ? { fz: resolvedFz ?? "1.6rem", lh: lh ?? 1.1 }
          : {
              ...(resolvedFz === undefined ? {} : { fz: resolvedFz }),
              ...(lh === undefined ? {} : { lh }),
            }),
      };
  const element = (
    <Text
      {...textProps}
      {...roleStyleProps}
      className={[
        !unstyled && textRole === "data" ? classes.data : undefined,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-budget-board-text-role={textRole}
      renderRoot={(props) =>
        createElement(component ?? defaults.component, props)
      }
      {...(unstyled ? { unstyled: true } : {})}
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
