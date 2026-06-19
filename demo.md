# Playwright Demo: React + TypeScript + Azure Playwright Workspaces

This repo is a small React + TypeScript app you can use to practice Playwright end-to-end testing locally and at scale with Azure Playwright Workspaces.

## Run the React app locally

From the repo root:

```powershell
npm run dev
```

Open the local URL that Vite prints, usually:

```text
http://localhost:5173
```

## Run Playwright tests locally

Run the end-to-end test suite:

```powershell
npm run test:e2e
```

Run Playwright in interactive UI mode:

```powershell
npm run test:e2e:ui
```

## Run tests at scale with Azure Playwright Workspaces

Azure Playwright Workspaces runs your Playwright tests on cloud-hosted browsers so you can scale test execution across multiple workers.

### 1. Create an Azure Playwright Workspace

In the Azure portal:

1. Create a new **Playwright Workspaces** resource.
2. Open the workspace.
3. Go to **Get Started**.
4. Copy the browser endpoint URL.

### 2. Add Azure Playwright support to this repo

From the repo root:

```powershell
npm init @azure/playwright@latest
```

This creates `playwright.service.config.ts`, which is the config file used when running tests in Azure cloud browsers.

### 3. Configure the workspace endpoint

Install `dotenv`:

```powershell
npm install -D dotenv
```

Create a `.env` file next to `playwright.config.ts`:

```env
PLAYWRIGHT_SERVICE_URL=your-workspace-browser-endpoint-url
```

Replace `your-workspace-browser-endpoint-url` with the endpoint copied from your Azure Playwright Workspace.

Do not commit `.env`.

### 4. Sign in to Azure

Use Azure CLI authentication:

```powershell
az login
```

If your workspace is in a specific tenant, use:

```powershell
az login --tenant <TenantID>
```

### 5. Allow cloud browsers to reach the local Vite app

Because this demo app runs on localhost, update `playwright.service.config.ts` to expose the local loopback network:

```ts
exposeNetwork: '<loopback>',
```

That lets Azure's cloud-hosted browsers access the Vite app running on `localhost:5173`.

### 6. Run one test in Azure first

Start small to confirm everything works:

```powershell
npx playwright test tests\app.spec.ts --config=playwright.service.config.ts
```

### 7. Scale the full suite

After one test passes, run the full suite with more workers:

```powershell
npx playwright test --config=playwright.service.config.ts --workers=20
```

Azure Playwright Workspaces supports scaling up to 50 parallel workers, but increase gradually so you do not overload your app or use more test minutes than expected.

## Command summary

| Goal | Command |
| --- | --- |
| Run app locally | `npm run dev` |
| Run local Playwright tests | `npm run test:e2e` |
| Run Playwright UI mode | `npm run test:e2e:ui` |
| Add Azure Playwright config | `npm init @azure/playwright@latest` |
| Run one Azure-backed test | `npx playwright test tests\app.spec.ts --config=playwright.service.config.ts` |
| Run scaled Azure-backed suite | `npx playwright test --config=playwright.service.config.ts --workers=20` |

## Demo this in GitHub Actions

This repo includes `.github\workflows\playwright.yml`. The workflow runs on pushes and pull requests to `main`, and can also be started manually from the **Actions** tab with **workflow_dispatch**.

The workflow does four things:

1. Installs dependencies with `npm ci`.
2. Builds and lints the React app.
3. Signs in to Azure with GitHub OpenID Connect.
4. Runs Playwright tests in Azure Playwright Workspaces with `npm run test:e2e:azure`.

### Required GitHub secrets

Add these repository secrets in **Settings > Secrets and variables > Actions**:

| Secret | Value |
| --- | --- |
| `AZURE_CLIENT_ID` | Client ID for the Microsoft Entra app registration or managed identity trusted by GitHub Actions |
| `AZURE_TENANT_ID` | Microsoft Entra tenant ID |
| `AZURE_SUBSCRIPTION_ID` | Azure subscription ID |
| `PLAYWRIGHT_SERVICE_URL` | Browser endpoint URL copied from the Azure Playwright Workspace |

The workflow uses Microsoft Entra ID authentication through `azure/login@v2`, which is preferred over storing Playwright access tokens.

### GitHub Actions command

The CI workflow runs:

```powershell
npm run test:e2e:azure
```

That script maps to:

```powershell
playwright test --config=playwright.service.config.ts --workers=20
```

The Azure service config exposes localhost with:

```ts
exposeNetwork: '<loopback>'
```

This allows Azure cloud browsers to reach the Vite dev server that Playwright starts during the test run.
