import { CheckIcon, MultiSelect as MantineMultiSelect } from "@mantine/core";
import type { MultiSelectProps as MantineMultiSelectProps } from "@mantine/core";
import { useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  ensureMantineProvider,
  mergeInputStyles,
  useBBUIInputStyles,
} from "../shared/inputStyles";
import {
  getComboboxDropdownStyle,
  mergeComboboxStyles,
  mergeComponentComboboxClassNames,
} from "../shared/comboboxStyles";
import comboboxClasses from "../shared/comboboxStyles.module.css";

export interface MultiSelectProps extends Omit<
  MantineMultiSelectProps,
  "creatable" | "getCreateLabel" | "onCreate"
> {
  creatable?: boolean;
  getCreateLabel?: (query: string) => ReactNode;
  onCreate?: (
    query: string,
  ) => string | { value: string; label: string } | null | undefined;
}

type MultiSelectOption = { value: string; label: string };
type RenderOptionInput = Parameters<
  NonNullable<MantineMultiSelectProps["renderOption"]>
>[0];

function getOptions(
  data: NonNullable<MantineMultiSelectProps["data"]>,
): MultiSelectOption[] {
  return data.flatMap((item) => {
    if (typeof item === "string") {
      return [{ value: item, label: item }];
    }

    const items = "group" in item ? item.items : [item];
    return items.map((option) => {
      if (typeof option === "string") {
        return { value: option, label: option };
      }

      const value = String(option.value);
      return {
        value,
        label: "label" in option ? option.label : value,
      };
    });
  });
}

export function MultiSelect(props: MultiSelectProps) {
  const {
    className,
    classNames,
    comboboxProps,
    checkIconPosition = "left",
    creatable = false,
    data = [],
    defaultSearchValue,
    defaultValue,
    getCreateLabel,
    onChange,
    onCreate,
    onOptionSubmit,
    onSearchChange,
    renderOption,
    searchValue,
    searchable,
    styles,
    value,
    withAlignedLabels = false,
    withCheckIcon = true,
    wrapperProps,
    ...multiSelectProps
  } = props;
  const [uncontrolledValue, setUncontrolledValue] = useState(
    value ?? defaultValue ?? [],
  );
  const [uncontrolledSearch, setUncontrolledSearch] = useState(
    defaultSearchValue ?? "",
  );
  const [createdOptions, setCreatedOptions] = useState<MultiSelectOption[]>([]);
  const createdOptionsByQuery = useRef(new Map<string, MultiSelectOption>());
  const selectedValues = value ?? uncontrolledValue;
  const currentSearch = searchValue ?? uncontrolledSearch;
  const isSearchable = searchable ?? creatable;
  const query = creatable && isSearchable ? currentSearch.trim() : "";
  const sourceOptions = [...getOptions(data), ...createdOptions];
  const normalizedQuery = query.toLocaleLowerCase();
  const queryExists = sourceOptions.some(
    (option) =>
      option.value.toLocaleLowerCase() === normalizedQuery ||
      option.label.toLocaleLowerCase() === normalizedQuery,
  );
  const createOption = query && !queryExists ? [{ value: query, label: query }] : [];
  const mergedData = [...data, ...createdOptions, ...createOption];
  const hasCreateOption = createOption.length > 0;
  const inputStyles = useBBUIInputStyles();
  const { componentClassNames, comboboxClassNames } =
    mergeComponentComboboxClassNames(
      classNames,
      {
        root: inputStyles.classes.root,
        input: inputStyles.classes.input,
        dropdown: comboboxClasses.dropdown,
        option: comboboxClasses.option,
      },
      comboboxProps?.classNames,
    );
  const componentStyles = mergeInputStyles(
    styles,
    "root",
    inputStyles.wrapperStyle,
  );
  const nestedStyles = mergeComboboxStyles(
    componentStyles,
    comboboxProps?.styles,
    getComboboxDropdownStyle(inputStyles.colorScheme),
  );
  const handleSearchChange = (nextSearch: string) => {
    if (searchValue === undefined) {
      setUncontrolledSearch(nextSearch);
    }
    onSearchChange?.(nextSearch);
  };
  const handleChange = (values: string[]) => {
    const nextValues = values.map(
      (selectedValue) =>
        createdOptionsByQuery.current.get(selectedValue)?.value ?? selectedValue,
    );
    if (value === undefined) {
      setUncontrolledValue(nextValues);
    }
    onChange?.(nextValues);
  };
  const handleOptionSubmit = (value: string) => {
    if (query && !queryExists && value === query) {
      const created = onCreate?.(query);
      if (created === null) {
        return;
      }
      const option =
        typeof created === "string"
          ? { value: created, label: created }
          : (created ?? { value: query, label: query });
      createdOptionsByQuery.current.set(query, option);
      setCreatedOptions((current) =>
        current.some((item) => item.value === option.value)
          ? current
          : [...current, option],
      );
    }
    onOptionSubmit?.(value);
  };
  const renderDefaultOption = ({
    checked,
    option,
  }: RenderOptionInput) => {
    const check = withCheckIcon && (
      checked ? (
        <CheckIcon className={comboboxClasses.checkIcon} />
      ) : withAlignedLabels ? (
        <span className={comboboxClasses.checkPlaceholder} />
      ) : null
    );

    return (
      <>
        {checkIconPosition === "left" && check}
        <span>{option.label}</span>
        {checkIconPosition === "right" && check}
      </>
    );
  };
  const renderOptionContent =
    hasCreateOption || renderOption
      ? (optionProps: RenderOptionInput) => {
          const isCreateOption =
            hasCreateOption && optionProps.option.value === query;
          if (isCreateOption) {
            return getCreateLabel?.(query) ?? `Create "${query}"`;
          }
          return renderOption
            ? (renderOption(optionProps) ?? optionProps.option.label)
            : renderDefaultOption(optionProps);
        }
      : undefined;

  const control = (
    <MantineMultiSelect
      {...multiSelectProps}
      className={className}
      classNames={componentClassNames}
      comboboxProps={{
        ...comboboxProps,
        classNames: comboboxClassNames as NonNullable<
          NonNullable<typeof comboboxProps>["classNames"]
        >,
        styles: nestedStyles as NonNullable<
          NonNullable<typeof comboboxProps>["styles"]
        >,
      }}
      checkIconPosition={checkIconPosition}
      data={mergedData}
      onChange={handleChange}
      onOptionSubmit={handleOptionSubmit}
      onSearchChange={handleSearchChange}
      searchable={isSearchable}
      searchValue={currentSearch}
      value={selectedValues}
      styles={componentStyles}
      withAlignedLabels={withAlignedLabels}
      withCheckIcon={withCheckIcon}
      wrapperProps={inputStyles.getWrapperProps(wrapperProps)}
      {...(renderOptionContent ? { renderOption: renderOptionContent } : {})}
    />
  );

  return ensureMantineProvider(control, inputStyles.hasMantineContext);
}