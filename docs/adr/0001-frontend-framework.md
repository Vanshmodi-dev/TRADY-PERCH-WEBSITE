# ADR-0001: Frontend framework — Next.js (App Router) + TypeScript

**Status:** Accepted
**Date:** 2026-07-24
**Origin:** Product Implementation Constitution Ch.2 §4, Ch.4 §4, Ch.38 (see `docs/_synthesis/02-tech-architecture-synthesis.md`)

## Context

The Product Implementation Constitution deliberately names no specific framework (confirmed across 19 chapters — see synthesis doc). It fixes requirements only: component-based with composition-over-configuration props (Ch.11–12), static generation as the Marketing Site's default render mode with server rendering as a justified per-route exception (Ch.2 §4, Ch.38), a single-source-of-truth token pipeline compiling to CSS custom properties + typed TS constants (Ch.13), native CSS pseudo-states (Ch.12 §4), TypeScript-strength typing (no `[key: string]: any` escape hatch), and monorepo compatibility (Ch.6–7) since `packages/ui` is meant to stay reusable across the Marketing Site and future surfaces (Client Portal, AI-Native Conversational Layer). Chapter 4 (AI-Built Product Doctrine) explicitly classifies a foundational stack choice as requiring a human decision, not an AI-inferred default.

## Decision

**Next.js (App Router) with TypeScript.** Human-confirmed. Server Components are the default for every route; a component opts into Client Component status (`"use client"`) only when it genuinely needs interactivity, browser APIs, or React state/effects — never by default. Rendering strategy per-route follows Ch.38's decision tree: static generation (`force-static` / default) unless a route demonstrably needs per-request personalization, in which case server rendering is used as the named exception.

## Consequences

- Every marketing page ships as static HTML at build time by default, satisfying Ch.38 §4's SEO bias toward static generation.
- The App Router's `app/` directory is a framework-imposed, non-negotiable routing convention. This is reconciled with Ch.8's `src/{features,shared,routes}` folder standard in ADR-0004 — `app/` is kept thin (route + minimal composition only), with real implementation living in `src/features/`.
- `packages/ui` is built as framework-agnostic-to-Next.js React (no `next/*` imports inside the package itself) so it remains portable to a future Client Portal or Conversational surface even if that surface doesn't use Next.js — see ADR-0005.
- React 19 / Next.js 16 is the version line used (Next.js 16.2.11 at time of writing), since both are current stable and Next's App Router + Server Components model is mature on this line.
