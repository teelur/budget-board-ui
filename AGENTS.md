# Repository guidance

This repository publishes `@teelur/budget-board-ui`, a React component library built on Mantine. Keep changes scoped to the requested behavior and preserve existing public APIs unless a breaking change is requested.

## Structure and commands

- `src/` contains package source, `src/index.ts` defines public exports, and `src/shared/` contains cross-component helpers.
- Components use PascalCase folders and filenames. Focused Vitest and React Testing Library tests live in `tests/`.
- Component documentation lives in `docs/pages/`; `docs/App.tsx` assembles the pages and navigation.
- For component changes, run `yarn test`, `yarn build`, and `yarn docs:build`. Use `yarn docs:dev` to manually check UI changes that affect layout, styling, or interaction. See `README.md` for setup and publishing details.
- `dist/` and `docs-dist/` are generated outputs; do not edit them directly.

## Component workflow

- Before editing, inspect the target component, its CSS Module, focused test, related docs page, and public export. For a new component, follow the closest existing component pattern.
- Use the existing React and Mantine patterns. Export a named component matching its file, strongly type its props, and keep component-specific styles in a matching CSS Module.
- Preserve accessible names, keyboard and focus behavior, disabled/loading states, and supported DOM attributes. Add or update focused tests for the behavior changed; test theme modes and consumer overrides when relevant.
- Keep shared styling in its existing helper: input theme, wrapper, and field styles in `src/shared/inputStyles.ts` and `inputStyles.module.css`; combobox dropdown and option styling in `src/shared/comboboxStyles.ts` and `comboboxStyles.module.css`. Keep component-specific behavior and layout local.
- Use `src/colors.ts` as the semantic color source. Prefer `budgetBoardColors` and `--bb-color-*` variables over repeated palette hex values; use `surfaceHover` for neutral hover surfaces and `selection` for selected surfaces.
- Reuse color-mode and Mantine-provider helpers in `src/shared/themeStyles.ts` where applicable. Set component `--bbui-*` variables on the outer element shared by the affected descendants. Interactive control labels use `font-weight: 600`.

## Documentation

- For a new public component, add its export to `src/index.ts`, create a page under `docs/pages/`, and wire the page into `docs/App.tsx`.
- When public behavior or API changes, update the relevant page's live example, interactive API playground, and API reference, including accepted values and defaults. Prefer exported BBUI components in examples; use native controls only for documentation-specific controls without a package equivalent.
- Every component page must include an interactive API playground and an API reference, ordered after all individual feature examples: feature examples, API playground, then API reference. Keep this order consistent across the component pages.
