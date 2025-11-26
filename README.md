# Justin Yum Portfolio v3

A personal portfolio website showcasing my frontend development skills and passion for modern web technologies. This project demonstrates proficiency with cutting-edge tools and frameworks while serving as a platform to highlight my work and experience.

## Tech Stack

### Core Framework & Runtime
- **[Next.js 16](https://nextjs.org)** - React framework with App Router for server-side rendering, static site generation, and optimized routing
- **[React 19](https://react.dev)** - Latest version of React with the React Compiler enabled for automatic optimization and improved performance
- **[TypeScript 5](https://www.typescriptlang.org)** - Type-safe development with full static type checking across the codebase

### Styling
- **[Tailwind CSS v4](https://tailwindcss.com)** - Utility-first CSS framework using the new CSS-first configuration approach with custom theming
- **[Geist Font](https://vercel.com/font)** - Vercel's optimized font family loaded via `next/font` for improved performance

### Testing
- **[Vitest](https://vitest.dev)** - Fast unit testing framework with React Testing Library for component testing
- **[React Testing Library](https://testing-library.com/react)** - User-centric testing utilities focusing on behavior over implementation
- **[Storybook](https://storybook.js.org)** - Component development and testing in isolation with visual documentation
- **[Playwright](https://playwright.dev)** - End-to-end testing for critical user flows and interactions

### Development Tools
- **[ESLint](https://eslint.org)** - Code linting with Next.js recommended configurations for code quality
- **[Husky](https://typicode.github.io/husky/)** - Git hooks for automated linting, testing, and commit message validation
- **[Docker](https://www.docker.com)** - Containerization for consistent development environments across all stages

### CI/CD & Deployment
- **[GitHub Actions](https://github.com/features/actions)** - Automated testing and deployment pipelines
- **[Vercel](https://vercel.com)** - Deployment platform optimized for Next.js applications

## Getting Started

### Prerequisites
- Node.js 20 or higher
- npm or yarn
- Docker and Docker Compose (for containerized development)

### Local Development

#### Without Docker

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Run tests
npm test

# Run Storybook
npm run storybook

# Run E2E tests
npx playwright test
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

#### With Docker

**Development mode with hot-reload:**
```bash
# Start the development container
docker-compose up dev

# Stop the container
docker-compose down
```

**Production mode:**
```bash
# Build and start the production container
docker-compose up app

# Or build separately
docker-compose build app
docker-compose up app
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint
- `npm test` - Run Vitest tests
- `npm run test:ui` - Run Vitest with UI
- `npm run test:coverage` - Run tests with coverage report
- `npm run storybook` - Start Storybook on port 6006
- `npm run build-storybook` - Build Storybook for deployment
- `npm run changeset` - Create a new changeset for version management
- `npm run version` - Update versions based on changesets

## Docker Architecture

This project includes multi-stage Docker builds optimized for Next.js:

- **Dockerfile** - Production-optimized build with standalone output
- **Dockerfile.dev** - Development build with hot-reload support
- **docker-compose.yml** - Orchestrates both development and production containers

The production build uses Next.js's `output: 'standalone'` mode to create minimal, self-contained images.

## CI/CD & Deployment

### GitHub Actions Workflows

This project uses GitHub Actions for automated testing and deployment:

#### CI Pipeline (`.github/workflows/ci.yml`)
Runs on every pull request and push to `main`:

- **Lint**: ESLint code quality checks
- **Test**: Vitest unit and integration tests with coverage
- **E2E**: Playwright end-to-end tests across multiple browsers
- **Build**: Next.js production build verification

All jobs run in parallel for fast feedback.

#### Deployment Workflows

**Production** (`.github/workflows/deploy.yml`)
- Triggers on push to `main` branch
- Deploys to Vercel production environment using Vercel CLI
- Full control over deployment process

**Preview** (`.github/workflows/preview.yml`)
- Triggers on pull requests
- Creates preview deployment for each PR
- Automatically comments on PR with preview URL
- Preview environments are deleted when PR is closed

## Version Management

This project uses **[Changesets](https://github.com/changesets/changesets)** for semantic versioning and changelog generation.

### Workflow

1. **Create a changeset** when making user-facing changes:
   ```bash
   npm run changeset
   ```
   - Select the change type:
     - `patch` - Bug fixes and minor updates
     - `minor` - New features (backwards compatible)
     - `major` - Breaking changes
   - Write a summary that will appear in the changelog
   - Commit the generated `.changeset/*.md` file with your PR

2. **Update versions** when ready to release:
   ```bash
   npm run version
   ```
   - Updates `package.json` version following semver
   - Generates/updates `CHANGELOG.md` with all changeset summaries
   - Removes consumed changeset files
   - Commit and merge these changes to trigger deployment

### Best Practices

- Create changesets for features, bug fixes, and user-visible changes
- Skip changesets for internal changes (CI config, documentation, refactoring)
- Write clear, user-focused summaries (they become release notes)
- One changeset per feature/fix, or combine related changes
- Review changesets in PRs before merging
