import { useMemo, type CSSProperties, type KeyboardEvent } from 'react';
import { Combobox, useCombobox } from '@mantine/core';
import { useUncontrolled } from '@mantine/hooks';

export interface BudgetBoardSelectOption {
  label: string;
  value: string;
}

export interface BudgetBoardSelectProps {
  allowDeselect?: boolean;
  ariaLabel?: string;
  className?: string;
  data: readonly BudgetBoardSelectOption[];
  defaultValue?: string | null;
  emptyMessage?: string;
  onChange?: (value: string | null) => void;
  placeholder?: string;
  style?: CSSProperties;
  value?: string | null;
}

export function BudgetBoardSelect({
  allowDeselect = false,
  ariaLabel = 'Choose an option',
  className,
  data,
  defaultValue,
  emptyMessage = 'No options available',
  onChange,
  placeholder = 'Select an option',
  style,
  value,
}: BudgetBoardSelectProps) {
  const [selectedValue, setSelectedValue] = useUncontrolled<string | null>({
    ...(value !== undefined ? { value } : {}),
    ...(defaultValue !== undefined ? { defaultValue } : {}),
    ...(onChange ? { onChange } : {}),
    finalValue: null,
  });

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const selectedOption = useMemo(
    () => data.find((option) => option.value === selectedValue) ?? null,
    [data, selectedValue],
  );

  const triggerStyle: CSSProperties = {
    alignItems: 'center',
    backgroundColor: 'var(--budget-board-select-background, #ffffff)',
    border: '1px solid var(--budget-board-select-border-color, #ced4da)',
    borderRadius: 'var(--budget-board-select-radius, 0.5rem)',
    color: 'var(--budget-board-select-color, #191f28)',
    cursor: 'pointer',
    display: 'inline-flex',
    font: 'inherit',
    gap: '0.5rem',
    justifyContent: 'space-between',
    minWidth: 'var(--budget-board-select-min-width, 12rem)',
    padding: 'var(--budget-board-select-padding, 0.625rem 0.875rem)',
    ...style,
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();

      if (!combobox.dropdownOpened) {
        combobox.openDropdown('keyboard');
        combobox.selectFirstOption();
      } else {
        combobox.selectNextOption();
      }

      combobox.updateSelectedOptionIndex('selected', { scrollIntoView: true });
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();

      if (!combobox.dropdownOpened) {
        combobox.openDropdown('keyboard');
        combobox.selectFirstOption();
      } else {
        combobox.selectPreviousOption();
      }

      combobox.updateSelectedOptionIndex('selected', { scrollIntoView: true });
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();

      if (combobox.dropdownOpened && combobox.getSelectedOptionIndex() !== -1) {
        combobox.clickSelectedOption();
      } else {
        combobox.openDropdown('keyboard');
        combobox.updateSelectedOptionIndex('selected', { scrollIntoView: true });
      }
    }

    if (event.key === 'Escape') {
      combobox.closeDropdown('keyboard');
    }
  };

  const options = data.map((option) => (
    <Combobox.Option
      active={option.value === selectedValue}
      key={option.value}
      value={option.value}
    >
      {option.label}
    </Combobox.Option>
  ));

  return (
    <Combobox
      onOptionSubmit={(nextValue) => {
        setSelectedValue(allowDeselect && nextValue === selectedValue ? null : nextValue);
        combobox.closeDropdown();
      }}
      store={combobox}
      withinPortal={false}
    >
      <Combobox.DropdownTarget>
        <Combobox.EventsTarget targetType="button" withExpandedAttribute withKeyboardNavigation={false}>
          <button
            aria-haspopup="listbox"
            aria-label={ariaLabel}
            className={className}
            onClick={() => combobox.toggleDropdown()}
            onKeyDown={handleTriggerKeyDown}
            style={triggerStyle}
            type="button"
          >
            <span>{selectedOption?.label ?? placeholder}</span>
            <span aria-hidden="true">▾</span>
          </button>
        </Combobox.EventsTarget>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length > 0 ? options : <Combobox.Empty>{emptyMessage}</Combobox.Empty>}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
