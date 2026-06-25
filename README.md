# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Design & UX review tooling

This repo includes tooling so designers and engineers can review the app's
workflow, UX, and visual states without manually reproducing each state.

### Storybook — component catalog

[Storybook](https://storybook.js.org/) renders every component and UI state in
isolation, so you can browse them like a gallery instead of clicking through the
running app.

```bash
npm run storybook        # dev server at http://localhost:6006
npm run build-storybook  # static build in storybook-static/ for deploying
```

Stories live next to their components (e.g. `src/components/TripCard.stories.tsx`).
**Convention:** when you add or change a shared component, add/update a story for
each meaningful state in the same PR so the catalog never drifts.

Storybook is configured with the **accessibility addon** (`@storybook/addon-a11y`),
which auto-scans each rendered state for contrast/ARIA issues — part of UX review.

### Visual regression snapshots — Playwright

`tests/visual.spec.ts` captures pixel screenshots of the key UX states (light,
dark mode, filtered list, empty search, validation error, success message) and
diffs them against committed baselines, so unintended visual changes are caught
automatically.

```bash
npm run test:visual          # compare against baselines (fails on visual diff)
npm run test:visual:update   # accept current rendering as the new baseline
```

Baselines are committed under `tests/visual.spec.ts-snapshots/`. Only run the
update command when a visual change is intentional, then review and commit the
updated images. This is free and runs locally / in CI with no external account.

### Chromatic (optional, future) — hosted visual review

We could add [Chromatic](https://www.chromatic.com/) — a hosted service from the
Storybook team — for cloud-based visual review. The `@chromatic-com/storybook`
addon is already installed. Connecting a Chromatic project would let it:

- screenshot every story on each PR across browsers/viewports,
- highlight visual diffs in a side-by-side review UI,
- let a designer **Accept** or **Deny** changes as a PR check,
- publish the Storybook online as a shareable catalog.

It is a paid SaaS (with a free tier) and requires a Chromatic account plus a
project token in CI, so it is not wired up yet — the local Playwright snapshots
above cover visual regression for free in the meantime.

## PR deploy previews — Azure Static Web Apps

Every pull request gets its own live preview environment so designers can review
the running app and the Storybook catalog with no local setup:

- `/` → the live app
- `/storybook` → the component catalog

Each PR deploys to an isolated URL that the workflow posts as a PR comment.
Pushing new commits redeploys that same PR's preview; merging or closing the PR
tears it down automatically. Merges to `main` deploy to the production URL.

The build outputs both surfaces into one artifact:

```bash
npm run build:preview   # app -> dist/, Storybook -> dist/storybook/
```

Routing is controlled by `public/staticwebapp.config.json` (SPA fallback for the
app, with `/storybook/*` excluded so the catalog is served as static files).

### One-time setup (required to activate previews)

The workflow (`.github/workflows/azure-static-web-apps.yml`) is ready, but needs
an Azure Static Web App resource and a deployment-token secret:

1. Create the resource (free tier), without letting it generate its own workflow:

   ```bash
   az staticwebapp create \
     --name playwright-demo-preview \
     --resource-group <your-rg> \
     --location <region e.g. westus2> \
     --sku Free
   ```

2. Get the deployment token:

   ```bash
   az staticwebapp secrets list \
     --name playwright-demo-preview \
     --query "properties.apiKey" -o tsv
   ```

3. Add it as a GitHub repo secret named `AZURE_STATIC_WEB_APPS_API_TOKEN`
   (Settings → Secrets and variables → Actions), or:

   ```bash
   gh secret set AZURE_STATIC_WEB_APPS_API_TOKEN --body "<token-from-step-2>"
   ```

Once the secret exists, open a PR and the preview URL will be commented on it.

> Note: the Free tier allows up to 10 concurrent PR preview environments.

## Vite plugins

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
