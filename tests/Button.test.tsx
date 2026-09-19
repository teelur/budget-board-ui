import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MantineProvider } from '@mantine/core';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../src/Button';

function renderButton(button: React.ReactNode) {
  return render(<MantineProvider env="test">{button}</MantineProvider>);
}

describe('Button', () => {
  it('renders the primary medium button by default', () => {
    renderButton(<Button>Save changes</Button>);

    const button = screen.getByRole('button', { name: 'Save changes' });

    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('data-budget-board-variant', 'primary');
    expect(button).toHaveAttribute('data-budget-board-size', 'md');
  });

  it('forwards the visual options and custom button attributes', () => {
    renderButton(
      <Button aria-label="Delete transaction" size="lg" variant="danger">
        Delete
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Delete transaction' });

    expect(button).toHaveAttribute('data-budget-board-variant', 'danger');
    expect(button).toHaveAttribute('data-budget-board-size', 'lg');
  });

  it('calls its click handler and supports an explicit form type', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    renderButton(
      <Button onClick={onClick} type="submit">
        Continue
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Continue' });
    await user.click(button);

    expect(button).toHaveAttribute('type', 'submit');
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('does not activate when disabled or loading', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    renderButton(
      <>
        <Button disabled onClick={onClick}>
          Disabled
        </Button>
        <Button loading onClick={onClick}>
          Loading
        </Button>
      </>,
    );

    await user.click(screen.getByRole('button', { name: 'Disabled' }));
    await user.click(screen.getByRole('button', { name: 'Loading' }));

    expect(screen.getByRole('button', { name: 'Disabled' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Loading' })).toBeDisabled();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('supports full-width rendering', () => {
    renderButton(<Button fullWidth>Full width</Button>);

    expect(screen.getByRole('button', { name: 'Full width' })).toHaveAttribute(
      'data-budget-board-full-width',
      'true',
    );
  });
});