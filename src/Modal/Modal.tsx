import type { CSSProperties, ReactElement } from "react";
import { Modal as MantineModal } from "@mantine/core";
import type { ModalProps as MantineModalProps } from "@mantine/core";
import { budgetBoardTypography } from "../theme";
import { HeadingText } from "../HeadingText/HeadingText";
import { ensureBBUIMantineProvider, useBBUITheme } from "../shared/themeStyles";
import { mergeClassNames, mergeStyles } from "../shared/styleSlots";
import classes from "./Modal.module.css";

export type ModalProps = MantineModalProps;

export function Modal({
  children,
  classNames,
  p,
  styles,
  title,
  ...props
}: ModalProps): ReactElement {
  const { colorScheme, colors, hasMantineContext } = useBBUITheme();
  const pageBackground = `var(--bb-color-page, ${colors.page})`;
  const modalStyles = mergeStyles(styles, {
    content: {
      "--bbui-modal-background": pageBackground,
      "--bbui-modal-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
      "--bbui-modal-title": `var(--bb-color-text-heading, ${colors.textHeading})`,
      "--bbui-modal-body": `var(--bb-color-text-primary, ${colors.textPrimary})`,
      "--bbui-modal-body-font": `var(--bb-font-body, ${budgetBoardTypography.body})`,
    } as CSSProperties,
    inner: {
      left: "0",
      right: "0",
    },
  }) as NonNullable<ModalProps["styles"]>;

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
      classNames={
        mergeClassNames(classNames, {
          content: classes.content,
          header: classes.header,
          body: classes.body,
          inner: classes.inner,
        }) as NonNullable<ModalProps["classNames"]>
      }
      p={p ?? "0.5rem"}
      styles={modalStyles}
    >
      {children}
    </MantineModal>
  );

  return ensureBBUIMantineProvider(modal, hasMantineContext, colorScheme);
}
