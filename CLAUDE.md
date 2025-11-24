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
```

## Architecture

### Framework Configuration

- **Next.js 16** with App Router (src/app directory structure)
- **React 19** with React Compiler enabled (`reactCompiler: true` in next.config.ts)
- **Tailwind CSS v4** using the new `@import "tailwindcss"` syntax
- **TypeScript** with strict mode enabled

### Project Structure

```
src/
  app/                  # App Router pages and layouts
    layout.tsx          # Root layout with Geist fonts
    page.tsx            # Home page
    globals.css         # Global styles with Tailwind v4 theme configuration
```

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

### Unit & Integration Testing
- **Vitest** with **React Testing Library** for component and integration tests
- Focus on user-centric testing patterns (testing behavior, not implementation)

### Component Testing in Isolation
- **Storybook** for developing and testing components in isolation
- Provides visual documentation and component playground

### End-to-End Testing
- **Playwright** for E2E tests
- Tests critical user flows and interactions

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
- **Feature branches** for all development work
- **GitHub Actions** for automated testing and deployment
- **Vercel** as the deployment target
- Automated checks before merging to main branch

### Source Control Workflow
- **Husky** for Git hooks to automatically:
  - Lint commit messages
  - Lint code before commits
  - Run tests before commits/pushes
- **Feature branch naming**: Use `feature/` prefix (e.g., `feature/user-authentication`)
- **Pull requests**: Create PRs for merging feature branches into `main`
- All changes must go through PR review process before merging

## Containerization

- **Docker** with **Docker Compose** for consistent development environments
- Ensures parity between development, staging, and production environments
