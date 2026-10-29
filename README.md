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
Cloudflare Pages connects directly to this GitHub repository and builds the documentation on pushes
and pull requests. Configure the Pages project with the `main` production branch, build command
`corepack enable && yarn install --immutable && yarn docs:build`, and build output directory
`docs-dist`. The site is published at `https://budget-board-ui.pages.dev`; pull requests receive
Cloudflare preview deployments.

Add new component examples and API reference rows in `docs/App.tsx`, keeping the examples tied to
the public exports from `src/index.ts`.

Import the package stylesheet once in the consuming app:

```ts
import "@teelur/budget-board-ui/styles.css";
```

The stylesheet includes BBUI's IBM Plex Sans and Plus Jakarta Sans variable fonts.

`SpendingCategoriesChart` uses Recharts and requires the `recharts` and `react-is` peer dependencies.

When using `DateInput` or `DatePickerInput`, also import the Mantine Dates stylesheet:

```ts
import "@mantine/dates/styles.css";
```

Canary packages are published to GitHub Packages and npm under the `canary` tag when changes are
merged into `main`; documentation-only changes do not publish a package. Publishing a GitHub
release publishes the matching stable version to both registries. npm publishing uses GitHub
Actions OIDC trusted publishing; configure `canary.yml` and `release.yml` as trusted publishers in
the npm package settings.
