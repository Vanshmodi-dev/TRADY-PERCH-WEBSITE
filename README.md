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

Milestones 1–9 complete: setup; global layout/navigation/footer; homepage; every remaining page; motion & interactivity; responsive implementation; accessibility (WCAG 2.1 AA, automated Layers 1–2 — see `docs/product-implementation-constitution/Chapter-66-Engineering-Debt-Register.md` for the one remaining manual-testing gap); performance (Core Web Vitals budgets, see the same register for one deliberately-accepted exception); SEO (structured data, `llms.txt`, sitemap/robots). Milestone 10 (final QA and production readiness) is in progress. See `docs/adr/` for architectural decisions and Chapter 66 above for every currently-open, disclosed gap.

Additional verification scripts beyond `npm run test`, each self-contained (boots its own server):

```bash
npm run test:a11y --workspace=@trady-perch/marketing-site         # real-Chromium axe-core, every route
npm run test:keyboard --workspace=@trady-perch/marketing-site     # keyboard-only navigation
npm run test:performance --workspace=@trady-perch/marketing-site  # Lighthouse + CDP byte measurement
npm run test:schema --workspace=@trady-perch/marketing-site       # structured-data (JSON-LD) validation
```
