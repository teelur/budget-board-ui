import { forwardRef } from "react";
import {
  LoadingOverlay as MantineLoadingOverlay,
  type LoadingOverlayProps as MantineLoadingOverlayProps,
} from "@mantine/core";
import { ensureBBUIMantineProvider, useBBUITheme } from "../shared/themeStyles";

export type LoadingOverlayProps = MantineLoadingOverlayProps;

const LoadingOverlayRoot = forwardRef<HTMLDivElement, LoadingOverlayProps>(
  function LoadingOverlayRoot(
    { loaderProps, overlayProps, ...props },
    ref,
  ) {
    const { colorScheme, colors, hasMantineContext } = useBBUITheme();
    const loadingOverlay = (
      <MantineLoadingOverlay
        {...props}
        loaderProps={{
          ...loaderProps,
          color:
            loaderProps?.color ??
            `var(--bb-color-primary, ${colors.primary})`,
        }}
        overlayProps={{
          ...overlayProps,
          color:
            overlayProps?.color ??
            `var(--bb-color-surface-overlay, ${colors.surfaceOverlay})`,
        }}
        ref={ref}
      />
    );

    return ensureBBUIMantineProvider(
      loadingOverlay,
      hasMantineContext,
      colorScheme,
    );
  },
);

LoadingOverlayRoot.displayName = "@mantine/core/LoadingOverlay";

export const LoadingOverlay = LoadingOverlayRoot;
