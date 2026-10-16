import { Code as MantineCode } from "@mantine/core";
import type { CodeProps as MantineCodeProps } from "@mantine/core";
import type { CSSProperties } from "react";
import { useBBUITheme, ensureBBUIMantineProvider } from "../shared/themeStyles";
import { budgetBoardTypography } from "../theme";
import classes from "./Code.module.css";

export type CodeProps = MantineCodeProps;

export function Code({ className, style, ...props }: CodeProps) {
  const { colorScheme, colors, hasMantineContext } = useBBUITheme();
  const themeStyle = {
    "--bbui-code-background": `var(--bb-color-surface-sunken, ${colors.surfaceSunken})`,
    "--bbui-code-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
    "--bbui-code-foreground": `var(--bb-color-text-primary, ${colors.textPrimary})`,
    "--bbui-code-font": `var(--bb-font-code, ${budgetBoardTypography.code})`,
    backgroundColor: "var(--code-bg, var(--bbui-code-background))",
    border: "1px solid var(--bbui-code-border)",
    color: "var(--bbui-code-foreground)",
    fontFamily: "var(--bbui-code-font)",
  } as CSSProperties;
  const element = (
    <MantineCode
      {...props}
      className={[classes.root, className].filter(Boolean).join(" ")}
      style={[themeStyle, style]}
    />
  );

  return ensureBBUIMantineProvider(element, hasMantineContext, colorScheme);
}
