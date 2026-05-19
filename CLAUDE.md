# CLAUDE.md - Nuxt Starter Pack Developer Guide

## 🛠️ Project Commands

- **Start Development Server**: `npm run dev`
- **Build Production Bundle**: `npm run build`
- **Preview Production Build**: `npm run preview`
- **Type Check Project**: `npm run typecheck`
- **Static Code Analysis (Lint)**: `npm run lint`
- **Fix Linting Violations**: `npm run lint:fix`
- **Run Unit Tests**: `npm run test`
- **Watch Unit Tests**: `npm run test:watch`
- **Run Test Coverage**: `npm run test:coverage`
- **Start Histoire Visual sandbox**: `npm run histoire`
- **Build Histoire static assets**: `npm run histoire:build`

## 🏗️ Architecture & Coding Guidelines

This project utilizes a modern **Clean Architecture** layered layout combined with **SOLID principles**:

- **Domain Types (`/types/`)**: Pure TypeScript schemas and structural interfaces describing the application model domain (e.g. `user.type.ts`).
- **HTTP client Layer (`/services/`)**: Centralized HTTP client (`services/http.ts`) using Axios, with JWT inject/intercept logic.
- **Repository Abstraction Layer (`/repositories/`)**: Separation of concerns applying Dependency Inversion (SOLID DIP). Controllers & Views depend on repositories (`user.repository.ts`), which wrap raw API calls with reliable mock fallbacks.
- **State Management (`/app/stores/`)**: Clean typed Pinia stores (`auth.store.ts`) mapped per feature.
- **User Interface Components (`/app/components/ui/`)**: Reusable presentation primitives using `radix-vue` & Tailwind CSS. Every component includes loading, disabled, slot support, HSL HSB colors, responsive previews, unit testing, and Histoire stories.
- **Pages / Routing (`/app/pages/`)**: Master-detail visual layouts and CRUD operations utilizing form validations (`vee-validate` + `zod`).

## 💅 Style & TypeScript Rules

- **Strict TypeScript**: TypeScript `strict` mode is enabled in `nuxt.config.ts`. Avoid `any`, use proper typing definitions.
- **ESLint & Prettier**: Configured using ESLint flat-config (`eslint.config.mjs`) and Prettier (`.prettierrc`) via pre-commit hooks (`lint-staged`).
- **Tailwind class merging**: Import and use `cn` from `~/utils/cn` to merge dynamic class rules.
