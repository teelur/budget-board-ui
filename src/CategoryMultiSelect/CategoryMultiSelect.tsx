import { CheckIcon, Group } from "@mantine/core";
import { useMemo } from "react";
import type { ReactNode } from "react";
import {
  flattenCategories,
  flattenOptions,
} from "../CategorySelect/categoryOptions";
import type {
  CategorySelectCategory,
  CategorySelectOption,
} from "../CategorySelect/categoryOptions";
import categoryClasses from "../CategorySelect/CategorySelect.module.css";
import { MultiSelect } from "../MultiSelect/MultiSelect";
import type { MultiSelectProps } from "../MultiSelect/MultiSelect";

interface CategoryMultiSelectCommonProps extends Omit<MultiSelectProps, "data"> {
  includeUncategorized?: boolean;
  nothingFoundMessage?: ReactNode;
  uncategorizedLabel?: string;
  withinPortal?: boolean;
}

export type CategoryMultiSelectProps = CategoryMultiSelectCommonProps &
  (
    | { categories: CategorySelectCategory[]; data?: never }
    | { categories?: never; data: CategorySelectOption[] }
  );

export function CategoryMultiSelect({
  categories,
  data,
  includeUncategorized = false,
  nothingFoundMessage = "No categories found",
  uncategorizedLabel = "Uncategorized",
  withinPortal = false,
  comboboxProps,
  renderOption,
  searchable,
  placeholder = "Select categories",
  ...inputProps
}: CategoryMultiSelectProps) {
  const flattenedOptions = useMemo(() => {
    const options = categories
      ? flattenCategories(categories)
      : flattenOptions(data ?? []);

    return includeUncategorized
      ? [
          ...options.filter(
            (option) =>
              option.value.toLocaleLowerCase() !== "uncategorized",
          ),
          {
            value: "uncategorized",
            label: uncategorizedLabel,
            depth: 0,
          },
        ]
      : options;
  }, [
    categories,
    data,
    includeUncategorized,
    uncategorizedLabel,
  ]);
  const optionDepths = useMemo(
    () =>
      new Map(
        flattenedOptions.map((option) => [
          option.value.toLocaleLowerCase(),
          option.depth,
        ]),
      ),
    [flattenedOptions],
  );
  const options = useMemo(
    () =>
      flattenedOptions.map(({ value, label }) => ({
        value,
        label,
      })),
    [flattenedOptions],
  );

  return (
    <MultiSelect
      {...inputProps}
      comboboxProps={{
        ...comboboxProps,
        withinPortal,
      }}
      data={options}
      nothingFoundMessage={nothingFoundMessage}
      placeholder={placeholder}
      renderOption={(optionProps) =>
        renderOption?.(optionProps) ?? (
          <Group gap="xs" wrap="nowrap">
            {optionProps.checked ? (
              <CheckIcon aria-hidden size={12} />
            ) : (
              <span aria-hidden style={{ width: 12 }} />
            )}
            <span
              className={
                optionDepths.get(
                  optionProps.option.value.toLocaleLowerCase(),
                ) === 0
                  ? categoryClasses.parentLabel
                  : categoryClasses.childLabel
              }
            >
              {optionProps.option.label}
            </span>
          </Group>
        )
      }
      searchable={searchable ?? true}
    />
  );
}
