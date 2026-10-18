import { forwardRef, type CSSProperties } from "react";
import { Divider as MantineDivider } from "@mantine/core";
import type {
  DividerProps as MantineDividerProps,
  DividerVariant as MantineDividerVariant,
} from "@mantine/core";
import { ensureBBUIMantineProvider, useBBUITheme } from "../shared/themeStyles";
import classes from "./Divider.module.css";

export type DividerProps = MantineDividerProps;
export type DividerVariant = MantineDividerVariant;

const DividerRoot = forwardRef<HTMLDivElement, DividerProps>(
  function DividerRoot({ className, style, ...props }, ref) {
    const { colorScheme, colors, hasMantineContext } = useBBUITheme();
    const themeStyle = {
      "--bbui-divider-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
      "--bbui-divider-surface": `var(--bb-color-surface, ${colors.surface})`,
      "--bbui-divider-text": `var(--bb-color-text-secondary, ${colors.textSecondary})`,
    } as CSSProperties;
    const divider = (
      <MantineDivider
        {...props}
        className={[classes.root, className].filter(Boolean).join(" ")}
        ref={ref}
        style={[themeStyle, style]}
      />
    );

    return ensureBBUIMantineProvider(divider, hasMantineContext, colorScheme);
  },
);

DividerRoot.displayName = "@mantine/core/Divider";

export const Divider = DividerRoot;
