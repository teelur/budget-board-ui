import type { ElementType, ReactElement } from "react";
import { Title } from "@mantine/core";
import type { TitleOrder, TitleProps } from "@mantine/core";
import { budgetBoardTypography } from "../theme";
import { ensureBBUIMantineProvider, useBBUITheme } from "../shared/themeStyles";
import { getResponsiveTextFontSize, type TextTone } from "../shared/TextRole";
import { useResponsiveTextFit } from "../shared/useResponsiveTextFit";

export type HeadingTextProps = Omit<TitleProps, "component" | "order"> & {
  component?: ElementType;
  level?: TitleOrder;
  responsive?: boolean;
  tone?: TextTone;
};

const toneColorKeys = {
  heading: "textHeading",
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
  fz,
  fw,
  level = 2,
  responsive,
  tone = "primary",
  unstyled,
  style,
  ...titleProps
}: HeadingTextProps): ReactElement {
  const { colorScheme, colors, hasMantineContext } = useBBUITheme();
  const colorKey = toneColorKeys[tone];
  const responsiveFz = getResponsiveTextFontSize("heading");
  const { ref: headingRef, fittedFontSize } =
    useResponsiveTextFit<HTMLHeadingElement>({
      enabled: responsive,
      fontSize: responsiveFz,
      maxFontSize: fz ?? titleProps.size,
      children,
      className,
      fontFamily: ff,
      fontWeight: fw,
      style,
    });
  const resolvedFz = responsive ? (fittedFontSize ?? responsiveFz) : fz;

  const resolvedStyle = responsive
    ? { ...style, whiteSpace: "nowrap" as const }
    : style;

  const roleStyleProps = unstyled
    ? {
        ...(c === undefined ? {} : { c }),
        ...(ff === undefined ? {} : { ff }),
        ...(resolvedFz === undefined ? {} : { fz: resolvedFz }),
        ...(fw === undefined ? {} : { fw }),
      }
    : {
        c: c ?? `var(--bb-color-text-${tone}, ${colors[colorKey]})`,
        ff: ff ?? budgetBoardTypography.display,
        ...(resolvedFz === undefined ? {} : { fz: resolvedFz }),
        fw: fw ?? 700,
      };
  const element = (
    <Title
      {...titleProps}
      {...roleStyleProps}
      className={className}
      ref={headingRef}
      style={resolvedStyle}
      component={component ?? `h${level}`}
      data-budget-board-text-role="heading"
      order={level}
      {...(unstyled ? { unstyled: true } : {})}
    >
      {children}
    </Title>
  );

  return ensureBBUIMantineProvider(element, hasMantineContext, colorScheme);
}
