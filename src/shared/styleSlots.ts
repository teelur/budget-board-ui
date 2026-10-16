import type { CSSProperties } from "react";

type ClassNameSlots = Record<string, string | undefined>;
type StyleSlots = Record<string, CSSProperties | undefined>;

function mergeClassNameSlots(
  defaults: ClassNameSlots,
  consumerClassNames?: ClassNameSlots,
): ClassNameSlots {
  const merged = { ...consumerClassNames };

  for (const [slot, className] of Object.entries(defaults)) {
    merged[slot] = [className, consumerClassNames?.[slot]]
      .filter(Boolean)
      .join(" ");
  }

  return merged;
}

function mergeStyleSlots(
  defaults: StyleSlots,
  consumerStyles: unknown,
): StyleSlots {
  const stylesBySlot = consumerStyles as StyleSlots | undefined;
  const merged = { ...defaults, ...stylesBySlot };

  for (const [slot, style] of Object.entries(defaults)) {
    merged[slot] = { ...style, ...stylesBySlot?.[slot] };
  }

  return merged;
}

export function mergeClassNames(
  classNames: unknown,
  defaults: ClassNameSlots,
): unknown {
  if (typeof classNames === "function") {
    const resolveClassNames = classNames as unknown as (
      ...args: unknown[]
    ) => ClassNameSlots;

    return (...args: unknown[]) =>
      mergeClassNameSlots(defaults, resolveClassNames(...args));
  }

  return mergeClassNameSlots(defaults, classNames as ClassNameSlots | undefined);
}

export function mergeStyles(styles: unknown, defaults: StyleSlots): unknown {
  if (typeof styles === "function") {
    const resolveStyles = styles as unknown as (
      ...args: unknown[]
    ) => StyleSlots;

    return (...args: unknown[]) => mergeStyleSlots(defaults, resolveStyles(...args));
  }

  return mergeStyleSlots(defaults, styles);
}
