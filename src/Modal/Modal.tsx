import type { CSSProperties, ReactElement } from "react";
import { Modal as MantineModal } from "@mantine/core";
import type { ModalProps as MantineModalProps } from "@mantine/core";
import { budgetBoardTypography } from "../theme";
import { HeadingText } from "../HeadingText/HeadingText";
import { ensureBBUIMantineProvider, useBBUITheme } from "../shared/themeStyles";
import classes from "./Modal.module.css";

export type ModalProps = MantineModalProps;

type ModalClassNameSlots = Record<string, string | undefined>;
type ModalStyleSlots = Record<string, CSSProperties | undefined>;

function mergeClassNameSlots(
  defaults: ModalClassNameSlots,
  consumerClassNames?: ModalClassNameSlots,
): ModalClassNameSlots {
  const merged = { ...consumerClassNames };

  for (const [slot, className] of Object.entries(defaults)) {
    merged[slot] = [className, consumerClassNames?.[slot]]
      .filter(Boolean)
      .join(" ");
  }

  return merged;
}

function mergeModalClassNames(
  classNames: ModalProps["classNames"],
  defaults: ModalClassNameSlots,
): NonNullable<ModalProps["classNames"]> {
  if (typeof classNames === "function") {
    const resolveClassNames = classNames as unknown as (
      ...args: unknown[]
    ) => ModalClassNameSlots;

    return ((...args: unknown[]) =>
      mergeClassNameSlots(defaults, resolveClassNames(...args))) as NonNullable<
      ModalProps["classNames"]
    >;
  }

  return mergeClassNameSlots(
    defaults,
    classNames as ModalClassNameSlots | undefined,
  );
}

function mergeStyleSlots(
  defaults: ModalStyleSlots,
  consumerStyles: unknown,
): ModalStyleSlots {
  const stylesBySlot = consumerStyles as ModalStyleSlots | undefined;
  const merged = { ...defaults, ...stylesBySlot };

  for (const [slot, style] of Object.entries(defaults)) {
    merged[slot] = { ...style, ...stylesBySlot?.[slot] };
  }

  return merged;
}

function mergeModalStyles(
  styles: ModalProps["styles"],
  defaults: ModalStyleSlots,
): NonNullable<ModalProps["styles"]> {
  if (typeof styles === "function") {
    const resolveStyles = styles as unknown as (
      ...args: unknown[]
    ) => ModalStyleSlots;

    return ((...args: unknown[]) =>
      mergeStyleSlots(defaults, resolveStyles(...args))) as NonNullable<
      ModalProps["styles"]
    >;
  }

  return mergeStyleSlots(defaults, styles);
}

export function Modal({
  children,
  classNames,
  p,
  styles,
  title,
  ...props
}: ModalProps): ReactElement {
  const { colorScheme, colors, hasMantineContext } = useBBUITheme();
  const surface = `var(--bb-color-surface, ${colors.surface})`;
  const modalStyles = mergeModalStyles(styles, {
    content: {
      "--bbui-modal-surface": surface,
      "--bbui-modal-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
      "--bbui-modal-title": `var(--bb-color-text-heading, ${colors.textHeading})`,
      "--bbui-modal-body": `var(--bb-color-text-primary, ${colors.textPrimary})`,
      "--bbui-modal-body-font": `var(--bb-font-body, ${budgetBoardTypography.body})`,
    } as CSSProperties,
    inner: {
      left: "0",
      right: "0",
    },
  });

  const modal = (
    <MantineModal
      {...props}
      title={
        title ? (
          <HeadingText component="span" tone="heading" level={5}>
            {title}
          </HeadingText>
        ) : (
          title
        )
      }
      classNames={mergeModalClassNames(classNames, {
        content: classes.content,
        header: classes.header,
        body: classes.body,
        inner: classes.inner,
      })}
      p={p ?? "0.5rem"}
      styles={modalStyles}
    >
      {children}
    </MantineModal>
  );

  return ensureBBUIMantineProvider(modal, hasMantineContext, colorScheme);
}
