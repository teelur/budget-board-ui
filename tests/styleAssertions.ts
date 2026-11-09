import { expect } from "vitest";

export function expectInlineStyles(
  element: Element | null,
  styles: Record<string, string | number>,
) {
  if (!(element instanceof HTMLElement)) {
    throw new Error("Expected an HTML element");
  }

  for (const [property, value] of Object.entries(styles)) {
    const cssProperty = property.replace(/[A-Z]/g, "-$&").toLowerCase();
    expect(element.style.getPropertyValue(cssProperty)).toBe(String(value));
  }
}
