# APPENDIX A — PRESENTING THE CONSTITUTION: TOOLING & ENFORCEMENT INDEX

**Trady Perch Product Implementation Constitution · Appendices**

**Inherited From:** Chapter 1 (IP2, Machine-Checkable Truth, in full). Design System Bible's own Appendix A — mirrored in structure, but indexing enforcement tooling specifically rather than documentation-presentation tooling, per this Constitution's own §0.4 emphasis on chapters that are "only truly finished once they exist as executable configuration."

---

## 1. PURPOSE

Per Chapter 1's IP2, a standard with no corresponding mechanical check is a draft of an intention, not a finished standard. This appendix is the living, honest record of which chapters have already crossed that line — an actual lint rule, CI job, or configuration file — and which remain partially or fully manual, tracked openly rather than glossed over. It is compiled directly from every chapter's own "Enforcement & Measurement" section; where this table and a chapter's own text ever disagree, the chapter's own text governs, per this Constitution's own citation discipline.

---

## 2. STATUS LEGEND

**Mechanical** — a fully automated, blocking check exists or is directly specified. **Partial** — automation covers part of the standard; a judgment-dependent remainder is checked at review. **Manual** — currently review- or cadence-dependent, with the automation gap explicitly acknowledged as a Chapter 66 debt-register candidate rather than claimed as solved.

---

## 3. THE INDEX

| Ch. | Standard | Enforcement Mechanism | Status |
|---|---|---|---|
| 1 | Seven implementation principles | Section 5's per-principle mapping; IP5/IP7 verified empirically | Partial |
| 2 | Surface classification | ADR requirement per Ch. 62; dependency-boundary check | Partial |
| 3 | Translation ledger | Orphan/duplicate lint rule on constants and tokens | Partial |
| 4 | AI self-containment | Empirical cold-start test, tracked via escalation rate | Manual |
| 5 | Anti-pattern taxonomy (F1–F5) | Duplicate-code and dependency-audit tooling (Ch. 45/47) | Partial |
| 6 | Apps-and-packages split | Dependency-graph / two-consumer package check | Partial |
| 7 | Repository structure | Repository-structure linter, CI-blocking | Mechanical |
| 8 | Folder hierarchy | Structural lint rule on feature-folder shape | Mechanical |
| 9 | Naming conventions | ESLint/filename/commit-hook validators | Mechanical |
| 10 | Configuration schema | Startup validation, secret scanner | Mechanical |
| 11 | Component anatomy/variant mapping | Manual review against DSB citation (pending machine-readable DSB) | Manual |
| 12 | Component implementation template | Generated structural test per component | Mechanical |
| 13 | Design token pipeline | Build-time generation + literal-value lint rule | Mechanical |
| 14 | Motion primitive | Duration/easing assertion test; raw-animation lint rule | Mechanical |
| 15 | Responsive breakpoints | Breakpoint-literal lint rule; 4-breakpoint visual regression | Mechanical |
| 16 | No-toggle guardrail | Theme-prop/localStorage-key lint rule; first-paint test | Mechanical |
| 17 | Component versioning | Automated API-compatibility classifier | Mechanical |
| 18 | Accessibility (Layers 1–2) | Static a11y lint + automated behavioral suite, CI-blocking | Mechanical |
| 19 | Assistive-technology testing | Cadence dashboard flagging stale/missing records | Manual |
| 20 | i18n scaffolding | Hardcoded-string lint rule; synthetic-locale test | Mechanical |
| 21 | State categorization | Partial static detection of miscategorized server state | Partial |
| 22 | Global-state threshold | Mandatory PR justification field (presence checked, substance reviewed) | Partial |
| 23 | Integration trust boundary | Dependency-boundary scan for client-exposed credentials | Mechanical |
| 24 | API contract validation | Generated runtime validator at every boundary | Mechanical |
| 25 | Cache invalidation | Mandatory mutation-invalidation integration test | Mechanical |
| 26 | Error taxonomy | Typed-error constructor requiring both axes (compile-time) | Mechanical |
| 27 | Error handling pattern | Fault-injection suite; raw-throw lint rule | Mechanical |
| 28 | Loading / no fabricated delay | `setTimeout`-pattern lint rule | Mechanical |
| 29 | AI delegation classification | Briefing-completeness check (presence, not substantive accuracy) | Partial |
| 30 | AI briefing format | Six-field completeness check | Mechanical |
| 31 | AI guardrails (G1–G8) | Per-guardrail CI/branch-protection check; G6/G7 partial | Partial |
| 32 | AI self-review | Required self-review report artifact; gap-rate tracking | Partial |
| 33 | Handoff records | Completeness check mirroring briefing check | Mechanical |
| 34 | AI tooling properties | One-time ADR verification at adoption | Manual |
| 35 | Performance design-review | Mandatory budget-category statement at design review | Manual |
| 36 | Performance budgets | Lighthouse-equivalent + bundle-size CI gate | Mechanical |
| 37 | Asset/bundle optimization | Automated image/font pipeline check | Mechanical |
| 38 | Rendering strategy | Build-time strategy/behavior consistency check | Mechanical |
| 39 | SEO structural philosophy | Folded into Ch. 40's template-level check | Partial |
| 40 | Technical SEO | Structured-data schema validator; sitemap/robots generator | Mechanical |
| 41 | AI-search discoverability | Periodic manual spot-check against third-party AI output | Manual |
| 42 | Security design-review | Mandatory access-model statement at design review | Manual |
| 43 | OWASP-mapped controls | SAST tool, CI-blocking, per category | Partial |
| 44 | Data classification/deletion | Schema-mandatory field; automated deletion integration test | Mechanical |
| 45 | Dependency vulnerability SLA | Scheduled scan, CI-blocking on critical severity | Mechanical |
| 46 | Testing philosophy | Review-time judgment against stated criteria | Manual |
| 47 | Testing pyramid | Layer-triggering tied to change scope | Partial |
| 48 | A11y/perf test automation | Three individually visible, blocking CI checks | Mechanical |
| 49 | Quality gate sequence | Branch-protection configuration, no override | Mechanical |
| 50 | Definition of Done | Gate-backed items mechanical; remainder reviewer-checked | Partial |
| 51 | Review territory | Sampling audit for redundant comments | Manual |
| 52 | Human review procedure | Sampling audit for evidence-of-engagement pattern | Manual |
| 53 | AI-output reconciliation | Mandatory gap log, rate tracked over time | Partial |
| 54 | Review checklist | Required attached checklist/report per PR | Mechanical |
| 55 | CI/CD philosophy | Written justification required for any batching proposal | Manual |
| 56 | CI pipeline | Version-controlled `ci/` config; periodic fresh-environment reproduction test | Mechanical |
| 57 | Deployment workflow | Automatic staging deploy; explicit production promotion gate | Mechanical |
| 58 | Release/versioning | Automatic tag + changelog generation on promotion | Mechanical |
| 59 | Incident/rollback | Documented rollback steps; periodic drill | Partial |
| 60 | Documentation philosophy | Review-time why-vs-what judgment | Manual |
| 61 | Code-level documentation | Textual-similarity lint rule (flags for confirmation) | Partial |
| 62 | ADR standard | Review-time threshold check; timeline tracked quarterly | Partial |
| 63 | Onboarding documentation | Empirical first-task-success tracking | Manual |
| 64 | Governance decision-rights | Closed routing map; no automated substitute | Manual |
| 65 | Continuous improvement | Calendar-scheduled cycle; missed-cycle self-logging | Mechanical (scheduling) / Manual (content) |
| 66 | Debt register | Quarterly cross-reference audit against every P0 chapter | Partial |
| 67 | Anti-pattern index | Quarterly completeness audit against chapter-level entries | Manual |
| 68 | Ten-Year Test | Written justification at proposal time; no mechanical check possible | Manual |

---

## 4. HOW TO USE THIS INDEX

A contributor — human or AI — checking whether a given chapter's standard is currently enforced consults this table first, per Chapter 1's IP5, rather than assuming mechanical enforcement exists simply because a chapter describes one in detail. A row marked **Manual** or **Partial** is not a defect in the underlying standard — several, per their own chapters' honest admissions, are inherently judgment-dependent (Chapter 46, Chapter 51, Chapter 64, Chapter 68) — but every **Manual** row for a P0-priority chapter is a standing candidate for Chapter 66's debt register if no active tracking already covers it.

---

## 5. MAINTENANCE

This table is updated in the same change that alters a chapter's own Enforcement & Measurement section, per Chapter 3's translation-ledger discipline applied to this appendix directly — an appendix drifting from the chapters it indexes is exactly the kind of stale documentation Chapter 60 §4 already warns against, made worse here by this specific appendix's entire purpose being accurate status reporting.

---

*End of Appendix A.*
