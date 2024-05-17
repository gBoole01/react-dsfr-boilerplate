# React DSFR Boilerplate

This project is developped with React and TypeScript.

Its tooling includes:

- React
- TypeScript
- Vite
- ESLint
- Prettier
- Lint-staged
- Commitlint
- Husky
- Vitest
- Cypress
- Redux Toolkit
- RTK Query
- MaterialUI
- React-DSFR

## Installation

```bash
git clone react-dsfr-boilerplate
cd react-dsfr-boilerplate
cp .env.example .env
npm install
```

## Usage

### Launch development server

```bash
npm run dev
```

### Build production

```bash
npm run build
```

### Preview production

```bash
npm run preview
```

### Lint

Linting is run on staged files before commiting. That way, you can't commit if there is linting errors.

```bash
npm run lint
```

### Run unit tests once

```bash
npm run test
```

### Run unit tests in watch mode

```bash
npm run test:watch
```

### Run unit tests with coverage

```bash
npm run test:coverage
```

### Open Cypress

```bash
npm run test:e2e
```
