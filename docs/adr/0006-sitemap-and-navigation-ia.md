# ADR-0006: Sitemap and navigation information architecture

**Status:** Accepted
**Date:** 2026-07-24
**Origin:** Design System Bible Ch.20 (Navigation Systems) Nv-1/Nv-2/Nv-3; Master Vision Ch.13 (Solutions categories), target verticals list; master build prompt's required-pages list; `docs/_synthesis/04-ux-blueprint-synthesis.md` (no literal sitemap exists in the UX Blueprint — it is an unwritten blueprint).

## Context

The master build prompt lists ~18 required pages (Home, About, Services, Solutions, Case Studies, Process, Portfolio, Pricing, Resources, Blog, Careers, FAQ, Contact, Legal, 404, Search Results, Privacy, Terms). Chapter 20 caps primary navigation at a hard 5-item ceiling (Nv-1) plus one always-present CTA (Nv-3), and gives its own worked example verbatim: *"Solutions, Industries, Work, Pricing, Contact"* as the five items, with a "Solutions" dropdown of exactly *"AI Agents, Workflow Automation, Custom Integrations, Intelligent Systems"* (Nv-2's own example, citing Master Vision Ch.13's Solutions category count) and "Book a Strategy Call" as the CTA. Ch.20's own Future Expansion section explicitly leaves the Industries dropdown's exact sub-item selection as an open decision, to be "resolved with real content once the Industries section's final structure is confirmed" — that decision is made here.

Not every required page can or should have primary-nav real estate — Ch.20's own DON'T example explicitly warns against adding a nav item just because a new content type launched.

## Decision

**Primary navigation** (exactly Ch.20's own worked example): Solutions (dropdown) · Industries (dropdown) · Work · Pricing · Contact, plus the CTA "Book a Strategy Call" (always present, gold, never counted, links to `/contact`).

- **Solutions dropdown** (4 items, at the Nv-2 ceiling, verbatim from Ch.20's own example): AI Agents (`/solutions/ai-agents`), Workflow Automation (`/solutions/workflow-automation`), Custom Integrations (`/solutions/custom-integrations`), Intelligent Systems (`/solutions/intelligent-systems`). `/solutions` itself is the index.
- **Industries dropdown** (4 direct items + the explicitly-permitted "View All" escape hatch, resolving Ch.20's own documented open question): Real Estate, Medical, Legal, Manufacturing, + "View All Industries" → `/industries` (the index, which also covers Education, Finance, and E-commerce — the remaining three of Master Vision's seven named verticals). Real Estate/Medical/Legal/Manufacturing were chosen as the four highest-clarity, most immediately legible verticals for a first-time visitor; not a judgment about their business priority.
- **Work** — a flat link (no dropdown, matching Ch.20's own example exactly), routing to `/work`.
- **Pricing** — flat link to `/pricing`.
- **Contact** — flat link to `/contact`.

**Mapping the master prompt's full required-pages list onto this constrained nav** (everything not in the 5-item bar lives in the footer, or is reached by drilling into a nav destination — never by expanding the ceiling):

| Required page | Route | Reached via |
|---|---|---|
| Home | `/` | Logo |
| Services | — | **Merged into Solutions**, not a separate route — Master Vision uses "Solutions" as this system's own term for the same content; a parallel `/services` page would duplicate it. |
| Solutions | `/solutions` + 4 sub-routes | Primary nav dropdown |
| Portfolio | `/work` | Primary nav ("Work") |
| Case Studies | `/work/case-studies` | Linked from `/work`, not a separate nav slot |
| Pricing | `/pricing` | Primary nav |
| Contact | `/contact` | Primary nav + CTA |
| About | `/about` | Footer — Company |
| Process | `/process` | Footer — Company |
| Careers | `/careers` | Footer — Company |
| Resources | `/resources` | Footer — Resources |
| Blog | `/blog` | Footer — Resources |
| FAQ | `/faq` | Footer — Resources |
| Legal | `/legal` | Footer — Legal |
| Privacy | `/privacy` | Footer — Legal |
| Terms | `/terms` | Footer — Legal |
| 404 | `app/not-found.tsx` | Automatic (no nav entry — it's an error page) |
| Search Results | `/search` | Not linked from nav/footer yet — no search UI exists (Ch.29, Search Interfaces, not yet read); the route exists as a stub so the required page is real and crawlable, wired into navigation once search is actually built. |

## Consequences

- Every route above gets a real `app/**/page.tsx` in this milestone, even where full content is Milestone 3/4's job — Milestone 2's job is that no nav or footer link ever 404s.
- If a future page genuinely needs primary-nav placement, Ch.20's own anti-pattern section requires it go through "Chapter 2's proposal process" — i.e., a deliberate, documented decision to demote or merge an existing item, never a quiet ceiling increase.
