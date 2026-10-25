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

export interface FlattenedCategorySelectOption {
  value: string;
  label: string;
  depth: number;
}

export function flattenOptions(
  options: CategorySelectOption[],
  depth = 0,
): FlattenedCategorySelectOption[] {
  return options.flatMap((option) => [
    { value: option.value, label: option.label ?? option.value, depth },
    ...(option.children ? flattenOptions(option.children, depth + 1) : []),
  ]);
}

export function flattenCategories(
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
