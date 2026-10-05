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
import type { MouseEventHandler, ReactNode } from "react";
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
  label?: string;
  children?: CategorySelectOption[];
}

export interface CategorySelectCategory {
  value: string;
  parent: string;
  categoryType?: string;
}

interface CategorySelectCommonProps extends Omit<
  InputBaseProps,
  "defaultValue" | "onChange" | "value"
> {
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  nothingFoundMessage?: ReactNode;
  withinPortal?: boolean;
  includeUncategorized?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  readOnly?: boolean;
  comboboxProps?: Omit<
    ComboboxProps,
    "children" | "onOptionSubmit" | "store" | "withinPortal"
  >;
}

export type CategorySelectProps = CategorySelectCommonProps &
  (
    | { categories: CategorySelectCategory[]; data?: never }
    | { categories?: never; data: CategorySelectOption[] }
  );

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
    { value: option.value, label: option.label ?? option.value, depth },
    ...(option.children ? flattenOptions(option.children, depth + 1) : []),
  ]);
}

function flattenCategories(
  categories: CategorySelectCategory[],
): FlattenedCategorySelectOption[] {
  const compareCategories = (
    first: CategorySelectCategory,
    second: CategorySelectCategory,
  ) =>
    first.value
      .toLocaleLowerCase()
      .localeCompare(second.value.toLocaleLowerCase());

  return categories
    .filter((category) => category.parent.length === 0)
    .sort(compareCategories)
    .flatMap((parent) => [
      { value: parent.value, label: parent.value, depth: 0 },
      ...categories
        .filter(
          (category) =>
            category.parent.toLocaleLowerCase() ===
            parent.value.toLocaleLowerCase(),
        )
        .sort(compareCategories)
        .map((category) => ({
          value: category.value,
          label: category.value,
          depth: 1,
        })),
    ]);
}

function categoryValuesMatch(first: string, second: string | null): boolean {
  return (
    second !== null && first.toLocaleLowerCase() === second.toLocaleLowerCase()
  );
}

export function CategorySelect({
  data,
  categories,
  value,
  onChange,
  onClick,
  readOnly,
  classNames,
  comboboxProps,
  styles,
  wrapperProps,
  placeholder = "Select a category",
  searchPlaceholder = "Search categories",
  nothingFoundMessage = "No categories found",
  withinPortal = false,
  includeUncategorized = false,
  ...inputProps
}: CategorySelectProps) {
  const [search, setSearch] = useState("");
  const inputStyles = useBBUIInputStyles();
  const flattenedOptions = useMemo(() => {
    const options = categories
      ? flattenCategories(categories)
      : flattenOptions(data ?? []);

    return includeUncategorized
      ? [
          ...options,
          { value: "uncategorized", label: "uncategorized", depth: 0 },
        ]
      : options;
  }, [categories, data, includeUncategorized]);
  const selectedOption =
    value === null
      ? undefined
      : flattenedOptions.find((option) =>
          categoryValuesMatch(option.value, value),
        );
  const selectedLabel =
    value === null
      ? null
      : categories && categoryValuesMatch(value, "uncategorized")
        ? "Uncategorized"
        : (selectedOption?.label ?? (categories ? "Uncategorized" : null));
  const searchTerm = search.trim().toLocaleLowerCase();
  const filteredOptions = flattenedOptions.filter((option) =>
    `${option.label} ${option.value}`.toLocaleLowerCase().includes(searchTerm),
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
  const searchClassNames = mergeInputClassNames(inputStyles.classes, {
    input: categoryClasses.searchInput,
  });
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
    "input",
    inputStyles.wrapperStyle,
  );

  const control = (
    <Combobox
      {...comboboxProps}
      classNames={
        dropdownClassNames as NonNullable<ComboboxProps["classNames"]>
      }
      onOptionSubmit={(selectedValue) => {
        onChange(
          categoryValuesMatch(selectedValue, value) ? "" : selectedValue,
        );
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
            onClick?.(event);
            if (!readOnly) {
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
          {selectedLabel ? (
            selectedLabel
          ) : (
            <Input.Placeholder>{placeholder}</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>
      <Combobox.Dropdown maw="min(90vw, 32rem)">
        <Combobox.Search
          classNames={searchClassNames}
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
                active={categoryValuesMatch(option.value, value)}
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
