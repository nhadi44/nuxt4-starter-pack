# 🚀 Nuxt Enterprise Starter Pack

An enterprise-grade, highly scalable, and fully tested **Nuxt 3/4 Starter Pack** equipped with a massive collection of custom headless UI components, advanced data tables, form ecosystems, and composable architectures.

Designed to be the ultimate foundation for building complex Admin Dashboards, ERPs, and internal tools with extreme precision.

---

## 🌟 Key Features

*   **⚡ Modern Stack**: Nuxt, Vue 3, TypeScript, and Tailwind CSS.
*   **🧩 50+ Enterprise UI Components**: Built from the ground up using **Radix Vue** for ultimate accessibility (WAI-ARIA compliant) without sacrificing styling freedom.
*   **📊 Advanced Datatables**: Deep integration with **TanStack Table v8** including column toggling, pagination, loading states, and empty state fallbacks.
*   **🛠️ Robust Form Ecosystem**: Custom Date Pickers (no heavy external dependencies), Input OTPs, Debounce Inputs, Async Selects, and Toggle Groups.
*   **🎨 Advanced Overlays & Displays**: Command Palettes (Spotlight search `⌘ K`), Context Menus, Hover Cards, Carousels, and CSS-only Bar Charts.
*   **🧪 100% Test Coverage Focus**: Comes with **100+ passing Unit Tests** out of the box using **Vitest** and `@vue/test-utils`.
*   **📚 Storybook / Histoire**: Every component is beautifully documented and interactive via **Histoire**.
*   **🔔 Feedback Ecosystem**: Composable-driven toast notifications (`useToast`), loading overlays, and error states.

---

## 📦 Component Ecosystem Overview

This starter pack includes pre-built ecosystems ready to be dropped into your pages:

1.  **Core & Primitives**: Buttons, Avatars, Badges, Cards, Skeletons, Spinners.
2.  **Navigation & Layout**: Expandable App Sidebar, Breadcrumbs, Navigation Mega-Menus, ScrollAreas.
3.  **Advanced Inputs**: Headless Calendars, OTP Inputs, Slider, Toggles.
4.  **Data Display**: Stat Cards, Metric Cards with Progress Bars, Description Lists.
5.  **Overlays**: Command Palette, Modals, Drawers, Sheets, Popovers, Context Menus.

---

## 🚀 Getting Started

### 1. Installation

Clone the repository and install dependencies using `npm` or `pnpm`:

```bash
git clone git@github.com:nhadi44/nuxt4-starter-pack.git
cd nuxt4-starter-pack
npm install
```

### 2. Development Server

Start the Nuxt development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

### 3. Component Documentation (Histoire)

Explore the interactive component gallery:

```bash
npm run histoire
```

This will launch the Story dashboard (usually at `http://localhost:6006`), allowing you to interact with all the UI components, test their variants, and view their props.

### 4. Testing & Quality

Run the test suite to ensure everything is functioning correctly:

```bash
npm run test
```

We enforce strict TypeScript and Linting checks:

```bash
npm run typecheck
npm run lint
```

---

## 🏗️ Architecture

The project follows a strict separation of concerns:
*   `/app/components/ui`: The home for all reusable, generic UI components.
*   `/app/components/ui/stories`: The Histoire documentation files for every component.
*   `/app/components/ui/__tests__`: Comprehensive Vitest test suites.
*   `/app/composables`: Reusable logic like `useToast()`, `useLoading()`, and `useDataTable()`.
*   `/app/pages`: Application views and dashboards.

*Note: UI components are designed to be modified directly rather than installed via NPM packages, giving you 100% ownership over your design system code (inspired by shadcn/ui).*

---

## 📄 License

MIT License
