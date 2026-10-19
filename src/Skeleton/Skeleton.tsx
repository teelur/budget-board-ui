import { forwardRef, type CSSProperties } from "react";
import {
  Skeleton as MantineSkeleton,
  type SkeletonProps as MantineSkeletonProps,
} from "@mantine/core";
import { ensureBBUIMantineProvider, useBBUITheme } from "../shared/themeStyles";
import classes from "./Skeleton.module.css";

export type SkeletonProps = MantineSkeletonProps;

const SkeletonRoot = forwardRef<HTMLDivElement, SkeletonProps>(
  function SkeletonRoot({ className, style, ...props }, ref) {
    const { colorScheme, colors, hasMantineContext } = useBBUITheme();
    const semanticStyle = {
      "--bbui-skeleton-surface": `var(--bb-color-surface, ${colors.surface})`,
      "--bbui-skeleton-highlight": `var(--bb-color-surface-hover, ${colors.surfaceHover})`,
    } as CSSProperties;
    const skeleton = (
      <MantineSkeleton
        {...props}
        className={[classes.root, className].filter(Boolean).join(" ")}
        ref={ref}
        style={[semanticStyle, style]}
      />
    );

    return ensureBBUIMantineProvider(skeleton, hasMantineContext, colorScheme);
  },
);

SkeletonRoot.displayName = "@mantine/core/Skeleton";

export const Skeleton = SkeletonRoot;
