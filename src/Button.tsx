import type { CSSProperties, ButtonHTMLAttributes, ReactNode } from 'react';
import { Button as MantineButton } from '@mantine/core';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'color' | 'disabled'> {
  children?: ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  leftSection?: ReactNode;
  loading?: boolean;
  rightSection?: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

type ButtonStyle = CSSProperties & Record<'--button-bg' | '--button-color' | '--button-hover', string>;

const variantStyles: Record<ButtonVariant, ButtonStyle> = {
  primary: {
    '--button-bg': 'var(--budget-board-button-primary-background, #2563eb)',
    '--button-color': 'var(--budget-board-button-primary-color, #ffffff)',
    '--button-hover': 'var(--budget-board-button-primary-hover, #1d4ed8)',
  },
  secondary: {
    '--button-bg': 'var(--budget-board-button-secondary-background, #e2e8f0)',
    '--button-color': 'var(--budget-board-button-secondary-color, #172033)',
    '--button-hover': 'var(--budget-board-button-secondary-hover, #cbd5e1)',
  },
  danger: {
    '--button-bg': 'var(--budget-board-button-danger-background, #dc2626)',
    '--button-color': 'var(--budget-board-button-danger-color, #ffffff)',
    '--button-hover': 'var(--budget-board-button-danger-hover, #b91c1c)',
  },
  ghost: {
    '--button-bg': 'transparent',
    '--button-color': 'var(--budget-board-button-ghost-color, #2563eb)',
    '--button-hover': 'var(--budget-board-button-ghost-hover, #dbeafe)',
  },
};

const mantineVariants: Record<ButtonVariant, 'filled' | 'default' | 'subtle'> = {
  primary: 'filled',
  secondary: 'default',
  danger: 'filled',
  ghost: 'subtle',
};

export function Button({
  children,
  className,
  disabled,
  fullWidth = false,
  leftSection,
  loading = false,
  rightSection,
  size = 'md',
  style,
  type = 'button',
  variant = 'primary',
  ...buttonProps
}: ButtonProps) {
  return (
    <MantineButton
      {...buttonProps}
      className={className}
      data-budget-board-full-width={fullWidth ? 'true' : undefined}
      data-budget-board-size={size}
      data-budget-board-variant={variant}
      disabled={disabled ?? false}
      fullWidth={fullWidth}
      leftSection={leftSection}
      loading={loading}
      rightSection={rightSection}
      size={size}
      style={{ ...variantStyles[variant], ...style }}
      type={type}
      variant={mantineVariants[variant]}
    >
      {children}
    </MantineButton>
  );
}