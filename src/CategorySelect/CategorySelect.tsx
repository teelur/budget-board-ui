import {
  CheckIcon,
  Combobox,
  Group,
  Input,
  InputBase,
  useCombobox,
} from "@mantine/core";
import type { ComboboxProps, InputBaseProps } from "@mantine/core";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  ensureMantineProvider,
  mergeInputClassNames,
  mergeInputStyles,
  useBBUIInputStyles,
} from "../shared/inputStyles";
import {
  getComboboxDropdownStyle,
  mergeComboboxStyles,
  mergeComponentComboboxClassNames,
} from "../shared/comboboxStyles";
import comboboxClasses from "../shared/comboboxStyles.module.css";
import categoryClasses from "./CategorySelect.module.css";

export interface CategorySelectOption {
  value: string;
  label: string;
  children?: CategorySelectOption[];
}

export interface CategorySelectProps extends Omit<
  InputBaseProps,
  "defaultValue" | "onChange" | "value"
> {
  data: CategorySelectOption[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  nothingFoundMessage?: ReactNode;
  withinPortal?: boolean;
  comboboxProps?: Omit<
    ComboboxProps,
    "children" | "onOptionSubmit" | "store" | "withinPortal"
  >;
}

interface FlattenedCategorySelectOption {
  value: string;
  label: string;
  depth: number;
}

function flattenOptions(
  options: CategorySelectOption[],
  depth = 0,
): FlattenedCategorySelectOption[] {
  return options.flatMap((option) => [
    { value: option.value, label: option.label, depth },
    ...(option.children ? flattenOptions(option.children, depth + 1) : []),
  ]);
}

export function CategorySelect({
  data,
  value,
  onChange,
  classNames,
  comboboxProps,
  styles,
  wrapperProps,
  placeholder = "Select a category",
  searchPlaceholder = "Search categories",
  nothingFoundMessage = "No categories found",
  withinPortal = false,
  ...inputProps
}: CategorySelectProps) {
  const [search, setSearch] = useState("");
  const inputStyles = useBBUIInputStyles();
  const flattenedOptions = useMemo(() => flattenOptions(data), [data]);
  const selectedOption = flattenedOptions.find(
    (option) => option.value === value,
  );
  const searchTerm = search.trim().toLocaleLowerCase();
  const filteredOptions = flattenedOptions.filter((option) =>
    `${option.label} ${option.value}`
      .toLocaleLowerCase()
      .includes(searchTerm),
  );
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.focusTarget();
      setSearch("");
    },
    onDropdownOpen: () => combobox.focusSearchInput(),
  });
  const inputClassNames = mergeInputClassNames(classNames, {
    root: inputStyles.classes.root,
    input: inputStyles.classes.input,
  });
  const inputComponentStyles = mergeInputStyles(
    styles,
    "root",
    inputStyles.wrapperStyle,
  );
  const { componentClassNames: dropdownClassNames } =
    mergeComponentComboboxClassNames(
      comboboxProps?.classNames,
      {
        dropdown: comboboxClasses.dropdown,
        option: comboboxClasses.option,
      },
      undefined,
    );
  const dropdownStyles = mergeComboboxStyles(
    undefined,
    comboboxProps?.styles,
    getComboboxDropdownStyle(inputStyles.colorScheme),
  );
  const searchStyles = mergeInputStyles(
    undefined,
    "root",
    inputStyles.wrapperStyle,
  );

  const control = (
    <Combobox
      {...comboboxProps}
      classNames={dropdownClassNames as NonNullable<ComboboxProps["classNames"]>}
      onOptionSubmit={(selectedValue) => {
        onChange(selectedValue === value ? "" : selectedValue);
        combobox.closeDropdown();
      }}
      store={combobox}
      styles={dropdownStyles as NonNullable<ComboboxProps["styles"]>}
      withinPortal={withinPortal}
    >
      <Combobox.Target>
        <InputBase
          {...inputProps}
          classNames={inputClassNames}
          component="button"
          onClick={(event) => {
            inputProps.onClick?.(event);
            if (!inputProps.readOnly) {
              combobox.toggleDropdown();
            }
          }}
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          styles={inputComponentStyles}
          type="button"
          wrapperProps={inputStyles.getWrapperProps(wrapperProps)}
          multiline
          pointer
        >
          {selectedOption ? (
            selectedOption.label
          ) : (
            <Input.Placeholder>
              {placeholder}
            </Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>
      <Combobox.Dropdown maw="min(90vw, 32rem)">
        <Combobox.Search
          classNames={inputStyles.classes}
          onChange={(event) => setSearch(event.currentTarget.value)}
          placeholder={searchPlaceholder}
          size={inputProps.size ?? "sm"}
          styles={searchStyles}
          value={search}
        />
        <Combobox.Options mah={300} style={{ overflowY: "auto" }}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <Combobox.Option
                active={option.value === value}
                key={option.value}
                value={option.value}
              >
                <Group gap="xs" wrap="nowrap">
                  {option.value === value ? (
                    <CheckIcon aria-hidden size={12} />
                  ) : (
                    <span aria-hidden style={{ width: 12 }} />
                  )}
                  <span
                    className={
                      option.depth === 0
                        ? categoryClasses.parentLabel
                        : categoryClasses.childLabel
                    }
                  >
                    {option.label}
                  </span>
                </Group>
              </Combobox.Option>
            ))
          ) : (
            <Combobox.Empty>{nothingFoundMessage}</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );

  return ensureMantineProvider(control, inputStyles.hasMantineContext);
}