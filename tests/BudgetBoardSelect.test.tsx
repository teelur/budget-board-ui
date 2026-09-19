import { useState } from 'react';
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

    function ControlledSelect() {
      const [value, setValue] = useState<string | null>(null);

      return (
        <MantineProvider env="test">
          <BudgetBoardSelect
            allowDeselect
            data={[{ label: 'Food', value: 'food' }]}
            onChange={(nextValue) => {
              onChange(nextValue);
              setValue(nextValue);
            }}
            value={value}
          />
        </MantineProvider>
      );
    }

    render(<ControlledSelect />);

    expect(screen.getByRole('combobox', { name: 'Choose an option' })).toHaveTextContent(
      'Select an option',
    );

    await user.click(screen.getByRole('combobox', { name: 'Choose an option' }));
    await user.click(screen.getByRole('option', { name: 'Food' }));
    await user.click(screen.getByRole('combobox', { name: 'Choose an option' }));
    await user.click(screen.getByRole('option', { name: 'Food' }));

    expect(onChange).toHaveBeenLastCalledWith(null);
    expect(screen.getByRole('combobox', { name: 'Choose an option' })).toHaveTextContent(
      'Select an option',
    );
  });

  it('supports empty-string option values without treating them as cleared', () => {
    render(
      <MantineProvider env="test">
        <BudgetBoardSelect
          data={[
            { label: 'Unassigned', value: '' },
            { label: 'Food', value: 'food' },
          ]}
          value=""
        />
      </MantineProvider>,
    );

    expect(screen.getByRole('combobox', { name: 'Choose an option' })).toHaveTextContent('Unassigned');
  });
});
