# budget-board-ui

UI components for the Budget Board app built on Mantine headless primitives

## Development

```sh
yarn install
yarn test
yarn build
yarn docs:dev
```

The component documentation site is a static Vite app. Use `yarn docs:dev` for local development,
`yarn docs:build` to generate `docs-dist`, and `yarn docs:preview` to preview the generated site.
The GitHub Pages workflows publish the site at `https://teelur.github.io/budget-board-ui/`.
Configure GitHub Pages to deploy from the `gh-pages` branch. Pull requests receive temporary
previews at `https://teelur.github.io/budget-board-ui/pr-preview/pr-<number>/`, which are removed
when the pull request closes.

Add new component examples and API reference rows in `docs/App.tsx`, keeping the examples tied to
the public exports from `src/index.ts`.

Publishing runs automatically after changes are merged into `main` and publishes canary packages
to GitHub Packages under the `canary` tag. Publishing a GitHub release publishes the matching
stable version to GitHub Packages.
