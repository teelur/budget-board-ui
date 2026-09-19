import { useMemo } from 'react';
import { Combobox, useCombobox } from '@mantine/core';
import { useUncontrolled } from '@mantine/hooks';

export interface BudgetBoardSelectOption {
  label: string;
  value: string;
}

export interface BudgetBoardSelectProps {
  ariaLabel?: string;
  data: readonly BudgetBoardSelectOption[];
  defaultValue?: string | null;
  emptyMessage?: string;
  onChange?: (value: string | null) => void;
  placeholder?: string;
  value?: string | null;
}

export function BudgetBoardSelect({
  ariaLabel = 'Choose an option',
  data,
  defaultValue,
  emptyMessage = 'No options available',
  onChange,
  placeholder = 'Select an option',
  value,
}: BudgetBoardSelectProps) {
  const [selectedValue, setSelectedValue] = useUncontrolled<string>({
    ...(value !== undefined ? { value: value ?? '' } : {}),
    ...(defaultValue !== undefined ? { defaultValue: defaultValue ?? '' } : {}),
    ...(onChange ? { onChange: (nextValue: string) => onChange(nextValue || null) } : {}),
    finalValue: '',
  });

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const selectedOption = useMemo(
    () => data.find((option) => option.value === selectedValue) ?? null,
    [data, selectedValue],
  );

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
        setSelectedValue(nextValue);
        combobox.closeDropdown();
      }}
      store={combobox}
      withinPortal={false}
    >
      <Combobox.Target targetType="button" withExpandedAttribute>
        <button
          aria-haspopup="listbox"
          aria-label={ariaLabel}
          onClick={() => combobox.toggleDropdown()}
          style={{
            alignItems: 'center',
            backgroundColor: '#ffffff',
            border: '1px solid #ced4da',
            borderRadius: '0.5rem',
            color: '#191f28',
            cursor: 'pointer',
            display: 'inline-flex',
            font: 'inherit',
            gap: '0.5rem',
            justifyContent: 'space-between',
            minWidth: '12rem',
            padding: '0.625rem 0.875rem',
          }}
          type="button"
        >
          <span>{selectedOption?.label ?? placeholder}</span>
          <span aria-hidden="true">▾</span>
        </button>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length > 0 ? options : <Combobox.Empty>{emptyMessage}</Combobox.Empty>}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
