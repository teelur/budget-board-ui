import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MantineProvider } from '@mantine/core';
import { describe, expect, it, vi } from 'vitest';
import { BudgetBoardSelect } from '../src';

describe('BudgetBoardSelect', () => {
  it('renders the placeholder and selects an option', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <MantineProvider env="test">
        <BudgetBoardSelect
          data={[
            { label: 'Housing', value: 'housing' },
            { label: 'Food', value: 'food' },
          ]}
          onChange={onChange}
          placeholder="Pick a category"
        />
      </MantineProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'Choose an option' }));
    await user.click(screen.getByRole('option', { name: 'Food' }));

    expect(onChange).toHaveBeenCalledWith('food');
    expect(screen.getByRole('button', { name: 'Choose an option' })).toHaveTextContent('Food');
  });

  it('renders an empty state when no options are provided', async () => {
    const user = userEvent.setup();

    render(
      <MantineProvider env="test">
        <BudgetBoardSelect ariaLabel="Empty select" data={[]} emptyMessage="Nothing to choose" />
      </MantineProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'Empty select' }));

    expect(screen.getByText('Nothing to choose')).toBeVisible();
  });
});
