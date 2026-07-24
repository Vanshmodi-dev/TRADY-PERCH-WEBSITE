# Trady Perch

Monorepo for the Trady Perch flagship marketing website and its shared design-system packages.

## Structure

```
apps/
  marketing-site/     Next.js (App Router) marketing site — the only app built so far
packages/
  tokens/              Design tokens (Design System Bible Ch.2-11, 52) -> CSS custom properties + TS
  motion/              Motion timing/easing tokens (Ch.15) + animation governance (Ch.40)
  ui/                  Shared React component library (framework-agnostic w.r.t. Next.js)
  config/              Shared tsconfig, eslint, prettier, performance budget
docs/
  adr/                 Architecture Decision Records
  _synthesis/          Extracted, actionable summaries of the ~150-document constitution
  design-system-bible/, product-implementation-constitution/, ...   Source-of-truth documents
```

## Why this structure

Every architectural choice here traces to a specific chapter of the constitutional documents in `docs/`, per the Translation Doctrine (Product Implementation Constitution Ch.3). Where the constitution left a decision open (it deliberately names no frontend framework, for example), the decision and its reasoning are recorded in `docs/adr/`. Start there — and in `docs/_synthesis/` — before assuming a value or convention; nothing in this codebase should be invented from habit or a framework's defaults when a governing document exists.

## Getting started

```bash
npm install
npm run dev     # builds tokens, then starts the marketing site at localhost:3000
```

```bash
npm run build       # production build (tokens + Next.js)
npm run lint         # ESLint across all workspaces
npm run typecheck    # TypeScript across all workspaces
npm run test         # Vitest across all workspaces
```

## Status

Milestone 2 (Global layout, navigation, footer & routing) complete — the site now has a real Header (desktop dropdowns + mobile drawer), Footer, and every required route from `docs/adr/0006-sitemap-and-navigation-ia.md` (page *content* for most of them is still a placeholder, arriving in Milestones 3–4). See `docs/adr/` for the decisions made. Full milestone plan: Global layout → Homepage → remaining pages → interactivity/motion → responsive → accessibility → performance → SEO → final QA.
