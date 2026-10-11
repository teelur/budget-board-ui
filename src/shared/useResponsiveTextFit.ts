import { useLayoutEffect, useRef, useState } from "react";
import type { ReactNode, RefObject } from "react";

interface UseResponsiveTextFitOptions {
  enabled: boolean | undefined;
  fontSize: string;
  children: ReactNode;
  className: string | undefined;
  fontFamily: unknown;
  fontWeight: unknown;
  style: unknown;
}

function getCssPixelValue(value: string): number {
  const parsedValue = Number.parseFloat(value);
  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

export function useResponsiveTextFit<T extends HTMLElement>({
  enabled,
  fontSize,
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
      const availableWidth =
        container.clientWidth -
        getCssPixelValue(containerStyles.paddingLeft) -
        getCssPixelValue(containerStyles.paddingRight) -
        getCssPixelValue(elementStyles.marginLeft) -
        getCssPixelValue(elementStyles.marginRight);

      if (availableWidth <= 0) {
        return;
      }

      const currentFontSize = element.style.fontSize;
      let baseFontSize = Number.NaN;
      let textWidth = 0;

      try {
        element.style.fontSize = fontSize;
        baseFontSize = Number.parseFloat(
          window.getComputedStyle(element).fontSize,
        );
        const range = document.createRange();
        range.selectNodeContents(element);
        const rangeWidth =
          typeof range.getBoundingClientRect === "function"
            ? range.getBoundingClientRect().width
            : 0;
        textWidth = Math.max(rangeWidth, element.scrollWidth);
      } finally {
        element.style.fontSize = currentFontSize;
      }

      const nextFittedFontSize =
        Number.isFinite(baseFontSize) &&
        Number.isFinite(textWidth) &&
        textWidth > availableWidth
          ? `${((baseFontSize * Math.max(0, availableWidth - 1)) / (textWidth * mantineScale)).toFixed(2)}px`
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
  }, [children, className, enabled, fontFamily, fontSize, fontWeight, style]);

  return { ref, fittedFontSize };
}
