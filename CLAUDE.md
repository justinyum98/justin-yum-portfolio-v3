# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website (v3) built with Next.js 16, React 19, and Tailwind CSS v4. The project uses the Next.js App Router architecture with TypeScript and has React Compiler enabled for optimized performance.

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Run unit/integration tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run Storybook (runs on http://localhost:6006)
npm run storybook

# Build Storybook for production
npm run build-storybook

# Run Playwright E2E tests
npx playwright test

# Run Playwright in UI mode
npx playwright test --ui
```

## Architecture

### Framework Configuration

- **Next.js 16** with App Router (src/app directory structure)
- **React 19** with React Compiler enabled (`reactCompiler: true` in next.config.ts)
- **Tailwind CSS v4** using the new `@import "tailwindcss"` syntax
- **TypeScript** with strict mode enabled
- **Standalone output** enabled for optimized Docker builds (`output: 'standalone'` in next.config.ts)

### Project Structure

```
src/
  app/                  # App Router pages and layouts
    layout.tsx          # Root layout with Geist fonts
    page.tsx            # Home page
    page.test.tsx       # Co-located test file (example)
    globals.css         # Global styles with Tailwind v4 theme configuration
  components/           # Reusable components
    Button/
      Button.tsx        # Component implementation
      Button.stories.ts # Storybook story (co-located)
      Button.test.tsx   # Unit tests (co-located)
      button.css        # Component styles
      index.ts          # Public exports
  assets/               # Shared assets (images, icons, etc.)
  test/                 # Global test setup and utilities only
    setup.ts            # Vitest/testing-library configuration
tests/                  # Playwright E2E tests
  example.spec.ts       # E2E test example
.storybook/             # Storybook configuration
  main.ts               # Storybook main config
  preview.ts            # Storybook preview config
  vitest.setup.ts       # Vitest integration setup
```

**File Organization Principles:**
- **Co-located tests**: Place `.test.tsx` files next to the components they test
- **Co-located stories**: Place `.stories.ts` files next to components for Storybook
- **Component structure**: Each component in its own directory with index.ts for clean imports
- **Global test utilities**: Only use `src/test/` for shared test setup, utilities, and helpers
- **E2E tests**: Place in `tests/` directory with `.spec.ts` extension
- This approach improves maintainability, discoverability, and developer experience

### Styling System

The project uses Tailwind CSS v4 with a custom theme configuration in `globals.css`:

- CSS variables for theming (`--background`, `--foreground`)
- Automatic dark mode via `prefers-color-scheme`
- Geist fonts configured as CSS variables (`--font-geist-sans`, `--font-geist-mono`)
- New Tailwind v4 `@theme inline` syntax for theme customization

### TypeScript Configuration

- Path alias: `@/*` maps to `./src/*`
- Target: ES2017
- JSX mode: `react-jsx` (new JSX transform)
- Strict mode enabled

### React Compiler

The React Compiler is enabled, which means:
- Components are automatically optimized for re-rendering
- Manual memoization (useMemo, useCallback, memo) is often unnecessary
- Follow React best practices for optimal compilation

## Key Technologies

- **Next.js 16**: Latest version with App Router
- **React 19**: Latest stable release with new features
- **Tailwind CSS v4**: Using new CSS-first configuration approach
- **TypeScript 5**: Full type safety across the codebase
- **Geist Fonts**: Vercel's font family optimized with next/font

## ESLint Configuration

The project uses Next.js's recommended ESLint configurations:
- `eslint-config-next/core-web-vitals`
- `eslint-config-next/typescript`
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

## Testing Strategy

### Unit & Integration Testing (Vitest + React Testing Library)
- **Vitest 4** as the test runner with jsdom environment
- **React Testing Library** for component testing with user-centric patterns
- **@vitest/ui** for visual test interface
- **Coverage reporting** with v8 provider
- Tests are co-located with components (`.test.tsx` files)
- Global test setup in `src/test/setup.ts`
- Run with `npm test` or `npm run test:ui`

### Component Development & Testing (Storybook 10)
- **Storybook 10** with Next.js Vite support
- Stories co-located with components (`.stories.ts` files)
- **Addons enabled:**
  - `@storybook/addon-docs` - Auto-generated documentation
  - `@storybook/addon-a11y` - Accessibility testing
  - `@storybook/addon-vitest` - Run stories as tests in Vitest
- Stories are tested in browser using Playwright via Vitest browser mode
- Run with `npm run storybook`

### End-to-End Testing (Playwright)
- **Playwright 1.56** for E2E tests across Chromium, Firefox, and WebKit
- Tests located in `tests/` directory with `.spec.ts` extension
- Configured with `playwright.config.ts`
- Base URL set to `http://localhost:3000`
- Run with `npx playwright test` or `npx playwright test --ui`

## Development Philosophy

### Test-Driven Development (TDD)
- Write tests before implementation
- Follow the Red-Green-Refactor cycle
- Ensure high test coverage for business logic

### Domain-Driven Design
- Organize code around business domains
- Clear separation of concerns
- Meaningful abstractions that reflect the problem domain

### CI/CD Pipeline

#### GitHub Actions Workflows
**CI Workflow** (`.github/workflows/ci.yml`)
- Runs on: Pull requests and pushes to `main`
- **4 parallel jobs:**
  1. **Lint**: ESLint code quality checks
  2. **Test**: Vitest unit/integration tests with coverage reporting
  3. **E2E**: Playwright tests across Chromium, Firefox, and WebKit
  4. **Build**: Next.js production build verification
- Uploads test coverage and Playwright reports as artifacts

**Production Deployment** (`.github/workflows/deploy.yml`)
- Runs on: Push to `main` branch
- Uses Vercel CLI for deployment control
- Deploys to production environment
- Creates deployment summary in GitHub Actions

**Preview Deployment** (`.github/workflows/preview.yml`)
- Runs on: Pull requests to `main`
- Deploys preview environment via Vercel CLI
- Automatically comments on PR with preview URL
- Preview deleted when PR is closed

**Required GitHub Secrets:**
- `VERCEL_TOKEN` - Vercel authentication token
- `VERCEL_ORG_ID` - Vercel organization/team ID
- `VERCEL_PROJECT_ID` - Vercel project ID

### Source Control Workflow
- **Husky 9** for Git hooks automation
  - Pre-commit hook runs tests automatically
  - Ensures code quality before commits
  - Configured in `.husky/` directory
- **Feature branch naming**: Use `feature/` prefix (e.g., `feature/user-authentication`)
- **Pull requests**: Create PRs for merging feature branches into `main`
- All changes must go through PR review process before merging

## Containerization

### Docker Setup
- **Multi-stage builds** for optimized production images
- **Node.js 20 Alpine** base image for minimal size
- **Next.js standalone output** for self-contained deployments
- **Non-root user** for security best practices

### Files
- `Dockerfile` - Production-optimized build with standalone output
- `Dockerfile.dev` - Development build with hot-reload support
- `docker-compose.yml` - Orchestrates dev and production containers
- `.dockerignore` - Optimizes build context

### Usage
```bash
# Development with hot-reload
docker-compose up dev

# Production build
docker-compose up app
```

See [README.md](README.md) for detailed Docker documentation.
