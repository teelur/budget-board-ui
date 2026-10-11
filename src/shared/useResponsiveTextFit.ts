import { useLayoutEffect, useRef, useState } from "react";
import type { ReactNode, RefObject } from "react";
import { getFontSize } from "@mantine/core";

interface UseResponsiveTextFitOptions {
  enabled: boolean | undefined;
  fontSize: string;
  maxFontSize: unknown;
  children: ReactNode;
  className: string | undefined;
  fontFamily: unknown;
  fontWeight: unknown;
  style: unknown;
}

function getResponsiveMaxFontSize(value: unknown): string | undefined {
  if (typeof value !== "string" && typeof value !== "number") {
    return undefined;
  }

  if (typeof value === "string" && /^h[1-6]$/.test(value)) {
    return `var(--mantine-${value}-font-size)`;
  }

  return getFontSize(value);
}

function getCssPixelValue(value: string): number {
  const parsedValue = Number.parseFloat(value);
  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

export function useResponsiveTextFit<T extends HTMLElement>({
  enabled,
  fontSize,
  maxFontSize,
  children,
  className,
  fontFamily,
  fontWeight,
  style,
}: UseResponsiveTextFitOptions): {
  ref: RefObject<T | null>;
  fittedFontSize: string | undefined;
} {
  const ref = useRef<T>(null);
  const [fittedFontSize, setFittedFontSize] = useState<string>();
  const responsiveMaxFontSize = getResponsiveMaxFontSize(maxFontSize);

  useLayoutEffect(() => {
    if (!enabled) {
      return;
    }

    const element = ref.current;
    const container = element?.parentElement;
    if (!element || !container) {
      return;
    }

    let isActive = true;
    const updateFittedFontSize = () => {
      if (!isActive) {
        return;
      }

      const containerStyles = window.getComputedStyle(container);
      const elementStyles = window.getComputedStyle(element);
      const mantineScaleValue = Number.parseFloat(
        elementStyles.getPropertyValue("--mantine-scale"),
      );
      const mantineScale =
        Number.isFinite(mantineScaleValue) && mantineScaleValue > 0
          ? mantineScaleValue
          : 1;
      const currentFontSize = element.style.fontSize;
      let baseFontSize = Number.NaN;
      let textWidth = 0;
      let textHeight = 0;
      let availableWidth = 0;
      let availableHeight = 0;
      let maxFontSizePixels = Number.POSITIVE_INFINITY;

      try {
        element.style.fontSize = fontSize;
        baseFontSize = Number.parseFloat(
          window.getComputedStyle(element).fontSize,
        );
        if (responsiveMaxFontSize !== undefined) {
          element.style.fontSize = responsiveMaxFontSize;
          maxFontSizePixels = Number.parseFloat(
            window.getComputedStyle(element).fontSize,
          );
          element.style.fontSize = fontSize;
        }
        const range = document.createRange();
        range.selectNodeContents(element);
        const rangeWidth =
          typeof range.getBoundingClientRect === "function"
            ? range.getBoundingClientRect().width
            : 0;
        textWidth = Math.max(rangeWidth, element.scrollWidth);
        textHeight = element.getBoundingClientRect().height;
        availableWidth =
          container.clientWidth -
          getCssPixelValue(containerStyles.paddingLeft) -
          getCssPixelValue(containerStyles.paddingRight) -
          getCssPixelValue(elementStyles.marginLeft) -
          getCssPixelValue(elementStyles.marginRight);
        availableHeight =
          container.clientHeight -
          getCssPixelValue(containerStyles.paddingTop) -
          getCssPixelValue(containerStyles.paddingBottom) -
          getCssPixelValue(elementStyles.marginTop) -
          getCssPixelValue(elementStyles.marginBottom);
      } finally {
        element.style.fontSize = currentFontSize;
      }

      if (availableWidth <= 0) {
        return;
      }

      const explicitHeightConstraint = [
        container.style.height,
        container.style.maxHeight,
        container.style.minHeight,
      ].some(
        (value) =>
          value !== "" &&
          value !== "auto" &&
          value !== "none" &&
          getCssPixelValue(value) !== 0,
      );
      const hasVerticalSpace =
        availableHeight > textHeight + 1 ||
        availableHeight < textHeight - 1 ||
        explicitHeightConstraint;
      const widthScale = Math.max(0, availableWidth - 1) / textWidth;
      const heightScale =
        hasVerticalSpace && availableHeight >= 0 && textHeight > 0
          ? Math.max(0, availableHeight - 1) / textHeight
          : Number.POSITIVE_INFINITY;
      const maxScale =
        Number.isFinite(maxFontSizePixels) && baseFontSize > 0
          ? maxFontSizePixels / baseFontSize
          : Number.POSITIVE_INFINITY;
      const fitScale = Math.min(widthScale, heightScale, maxScale);
      const nextFittedFontSize =
        Number.isFinite(baseFontSize) &&
        Number.isFinite(textWidth) &&
        textWidth > 0 &&
        Number.isFinite(fitScale) &&
        Math.abs(fitScale - 1) >= 0.01
          ? `${((baseFontSize * fitScale) / mantineScale).toFixed(2)}px`
          : undefined;

      setFittedFontSize((currentFittedFontSize) =>
        currentFittedFontSize === nextFittedFontSize
          ? currentFittedFontSize
          : nextFittedFontSize,
      );
    };

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? undefined
        : new ResizeObserver(updateFittedFontSize);

    resizeObserver?.observe(container);
    resizeObserver?.observe(element);
    if (!resizeObserver) {
      window.addEventListener("resize", updateFittedFontSize);
    }

    const fontSet = document.fonts;
    fontSet?.addEventListener("loadingdone", updateFittedFontSize);
    updateFittedFontSize();

    return () => {
      isActive = false;
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateFittedFontSize);
      fontSet?.removeEventListener("loadingdone", updateFittedFontSize);
    };
  }, [
    children,
    className,
    enabled,
    fontFamily,
    fontSize,
    fontWeight,
    responsiveMaxFontSize,
    style,
  ]);

  return { ref, fittedFontSize };
}
