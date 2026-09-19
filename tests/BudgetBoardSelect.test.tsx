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

    await user.click(screen.getByRole('combobox', { name: 'Choose an option' }));
    expect(screen.getByRole('combobox', { name: 'Choose an option' })).toHaveAttribute('aria-expanded', 'true');
    await user.click(screen.getByRole('option', { name: 'Food' }));

    expect(onChange).toHaveBeenCalledWith('food');
    expect(screen.getByRole('combobox', { name: 'Choose an option' })).toHaveTextContent('Food');
  });

  it('renders an empty state when no options are provided', async () => {
    const user = userEvent.setup();

    render(
      <MantineProvider env="test">
        <BudgetBoardSelect ariaLabel="Empty select" data={[]} emptyMessage="Nothing to choose" />
      </MantineProvider>,
    );

    await user.click(screen.getByRole('combobox', { name: 'Empty select' }));

    expect(screen.getByText('Nothing to choose')).toBeVisible();
  });

  it('supports controlled and default values', () => {
    const { rerender } = render(
      <MantineProvider env="test">
        <BudgetBoardSelect
          data={[
            { label: 'Housing', value: 'housing' },
            { label: 'Food', value: 'food' },
          ]}
          defaultValue="housing"
        />
      </MantineProvider>,
    );

    expect(screen.getByRole('combobox', { name: 'Choose an option' })).toHaveTextContent('Housing');

    rerender(
      <MantineProvider env="test">
        <BudgetBoardSelect
          data={[
            { label: 'Housing', value: 'housing' },
            { label: 'Food', value: 'food' },
          ]}
          value="food"
        />
      </MantineProvider>,
    );

    expect(screen.getByRole('combobox', { name: 'Choose an option' })).toHaveTextContent('Food');
  });

  it('shows the placeholder for null values and reports null when cleared', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <MantineProvider env="test">
        <BudgetBoardSelect
          data={[
            { label: 'Clear selection', value: '' },
            { label: 'Food', value: 'food' },
          ]}
          defaultValue={null}
          onChange={onChange}
          value={null}
        />
      </MantineProvider>,
    );

    expect(screen.getByRole('combobox', { name: 'Choose an option' })).toHaveTextContent(
      'Select an option',
    );

    await user.click(screen.getByRole('combobox', { name: 'Choose an option' }));
    await user.click(screen.getByRole('option', { name: 'Clear selection' }));

    expect(onChange).toHaveBeenCalledWith(null);
    expect(screen.getByRole('combobox', { name: 'Choose an option' })).toHaveTextContent(
      'Select an option',
    );
  });
});
