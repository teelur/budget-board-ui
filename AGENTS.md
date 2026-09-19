# Component Update Workflow

This repository is a publishable React component library for Budget Board. Use this workflow when changing an existing component or adding a new one.

## Before Editing

1. Read the target component and its matching CSS Module, if present.
   If creating a new component, follow the directory and file naming conventions of an existing similar component instead of reading a non-existent file.
2. Read the nearest focused test in `tests/` and follow its provider and Testing Library patterns.
3. Check `src/index.ts` to determine whether the component is part of the public package API. Add new public components there.
4. Find the related example and API reference section in `docs/App.tsx`.
5. Check existing components for the local Mantine, TypeScript, accessibility, naming, and styling patterns before introducing a new approach.

Keep the change focused. Do not perform unrelated refactors or rewrite generated output.
When a repository norm is established or changed, update this file so future agents follow the current convention. Update this file only when a pattern is adopted across multiple components (e.g., a new prop-forwarding convention or naming pattern), not for one-off implementation choices.

## Implementation Rules

- Use React and Mantine primitives already used by the package.
- Keep component props strongly typed and export a named component matching the file name.
- Keep component-specific styles in a matching CSS Module, such as `Button/Button.module.css`.
- Preserve existing public APIs unless the task explicitly requires a breaking change.
- If a breaking change is unavoidable but not explicitly requested, pause and ask for confirmation before proceeding.
- Forward standard DOM attributes when the component API supports them.
- Preserve accessible names, keyboard behavior, focus behavior, disabled states, and loading states.
- Use the repository's existing design tokens and theme variables instead of adding unrelated styling systems.
- Keep source files in `src/`; keep focused tests in `tests/`.

## Tests

Add or update focused tests for every behavior changed. Prefer React Testing Library and Vitest, following the existing test setup.

Cover the behavior that matters for the change, such as:

- Default rendering and accessible roles or names.
- Public variants, sizes, slots, and prop forwarding.
- Click, keyboard, disabled, loading, and form behavior.
- Conditional or stateful visual attributes exposed for testing.
- Both with MantineProvider default theme and with a custom theme override when the component supports them.

Do not weaken an assertion just to make a test pass. Update the implementation or the expected behavior deliberately.

## Documentation

Update `docs/App.tsx` when a component is added or its public behavior changes:

- Add or update a live example that uses the public export.
- Document all public API in the component's API reference section, including public props, accepted values, and defaults.
- Demonstrate meaningful states and variants without duplicating implementation details.
- Use the package's exported UI components wherever an equivalent exists. Use native HTML controls only for documentation-specific controls that are not part of the package API, such as example configuration selectors.

Do not edit `dist/` or `docs-dist/` directly. They are generated outputs.

## Validation

Run these commands from the repository root after the change:

```sh
yarn test
yarn build
yarn docs:build
```

If any validation command fails, fix the underlying issue before proceeding; do not report the task complete with failing checks.

When the change affects layout, styling, or interaction, also use `yarn docs:dev` for a manual browser check. Confirm the component works in the relevant desktop and mobile states and that the documentation example renders correctly.

## Completion Checklist

### Code

- [ ] Component source and matching styles are updated.
- [ ] Public exports are updated when needed.
- [ ] Generated directories were not edited directly.

### Tests

- [ ] Focused tests cover the changed behavior.
- [ ] `yarn test` passes.

### Docs

- [ ] Documentation examples and API reference are updated when needed.

### Validation

- [ ] `yarn build` passes.
- [ ] `yarn docs:build` passes.
- [ ] The final diff contains only task-related changes.

Do not create commits or branches unless explicitly requested.
