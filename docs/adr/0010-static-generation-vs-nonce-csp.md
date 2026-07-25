# ADR-0010: Content-Security-Policy uses `'unsafe-inline'` for scripts, not a nonce

**Status:** Accepted
**Date:** 2026-07-26
**Origin:** Product Implementation Constitution Ch.43 §6 (Security Misconfiguration — the gap this ADR closes); Ch.2 §4, Ch.38 (Rendering Strategy Standard — static generation as the Marketing Site's deliberate default, the constraint this ADR resolves against).

## Context

Milestone 10's independent review found this site shipped through Milestone 9 with zero response security headers — no CSP, no `X-Frame-Options`, no HSTS, nothing. The first fix attempt used a textbook `script-src 'self'` CSP with no `'unsafe-inline'`, which correctly blocks inline-script XSS injection — and also, discovered immediately via a real-browser console check the same milestone ran, blocked every one of Next.js's own inline hydration/RSC-payload scripts on every single route. The site rendered, then immediately failed to hydrate anywhere.

The standard, correct fix for that specific problem is a per-request nonce: generate a random value in middleware, put it in the CSP header, and Next.js automatically stamps that nonce onto its own inline scripts so the browser trusts them specifically, and nothing else. This was implemented (`middleware.ts`, later renamed `proxy.ts` per this Next.js version's own build-time deprecation notice for the old convention name) and it still didn't work — every script still failed the same way, as if no nonce were present at all.

Reading Next's own source (`node_modules/next/dist/server/app-render/get-script-nonce-from-header.js` and its caller in `app-render.js`) rather than guessing further: Next extracts the nonce from the *request's* `content-security-policy` header at render time and stamps it onto the scripts it emits *during that render*. That mechanism only has meaning for a render that happens per-request — but this app's build output (checked directly) marks 28 of its 29 routes `○ (Static)`: prerendered once, at build time, long before any request — and therefore any per-request nonce — exists. A statically-generated page's HTML, including every `<script>` tag in it, is fixed at build time; there is no request-time step left in which a nonce could be woven into content that was already written to disk.

This is not a bug in the implementation attempt — it's a structural mismatch between two things this Constitution independently, correctly wants: Ch.2 §4/Ch.38's static-generation-first mandate (real, load-bearing: it's why this site's TTFB is single-digit milliseconds and why Chapter 36's budget for that metric passes cleanly everywhere) and nonce-based CSP (which fundamentally requires dynamic, per-request rendering to have anywhere to put the nonce).

## Decision

Ship `script-src 'self' 'unsafe-inline'` — same-origin scripts only, inline execution allowed — rather than either (a) a broken nonce that silently fails closed on every route, or (b) forcing the entire site to dynamic (`force-dynamic`) rendering purely to give a nonce somewhere to live.

(b) was seriously considered and rejected: trading away this site's actual, measured static-generation performance profile (near-instant TTFB across all 29 routes, per Milestone 8 and Milestone 10's own performance audits) for a CSP refinement is exactly the wrong trade given this site's actual, verified attack surface. The Milestone 10 independent review specifically checked for a live inline-script-injection path (any `dangerouslySetInnerHTML` fed by user input, any endpoint reflecting unescaped user content into HTML) and found none — the one `dangerouslySetInnerHTML` call in the codebase (`shared/json-ld.tsx`) renders only static, build-time-authored data through an escaping helper, never anything a visitor supplies. `'unsafe-inline'` on `script-src` removes CSP's protection against a threat this site does not currently have a path to.

Every other directive stays strict and gets real value from being strict: `frame-ancestors 'none'` (clickjacking), `form-action 'self'` (the contact form can't be hijacked to submit elsewhere), `base-uri 'self'`, same-origin-only `img-src`/`font-src`/`connect-src`. Only the one directive that structurally cannot work against this site's rendering architecture was relaxed, and only to the minimum needed.

## Consequences

- If this site's rendering strategy ever changes — a future page genuinely needs `force-dynamic` for its own reasons (unrelated to CSP) — revisit whether a nonce becomes viable for that specific route via a per-route CSP override. Not worth pursuing sitewide today for a site that is, by design, almost entirely static.
- If a future feature introduces a real inline-script-injection surface (rendering any user-supplied or third-party-supplied content as raw HTML), `'unsafe-inline'`'s risk profile changes from "unused protection" to "the one thing that would have caught this" — that feature's own design review (Ch.42 §6) must explicitly re-examine this ADR's premise before shipping, not assume it still holds.
- `apps/marketing-site/next.config.ts` is the single source of truth for this policy; no per-route override exists today, and none should be added without updating this ADR.
