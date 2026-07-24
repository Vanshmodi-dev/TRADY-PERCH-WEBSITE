# CHAPTER 6 — REPOSITORY STRUCTURE PHILOSOPHY

**Trady Perch Product Implementation Constitution · Part II: Repository & Project Architecture**

**Inherited From:** Master Vision Document Chapter 25 (Full Brand Ecosystem) and Chapter 26 (Future Expansion Roadmap). Chapter 2's monorepo decision is this chapter's direct premise; this chapter does not re-decide monorepo versus polyrepo, only the reasoning for how a single repository is internally divided.

---

## 1. INTRODUCTION

Chapter 2 decided that Trady Perch's surfaces live in one repository. That decision alone does not say whether the Marketing Site, Client Portal, and AI-Native Conversational Layer are three top-level applications sharing common packages, or one undifferentiated application with internal routing branches, or some other division entirely. This chapter reasons through that question, so Chapter 7 can fix the literal answer without also having to justify it from scratch.

---

## 2. THE APPS-AND-PACKAGES SPLIT

A monorepo can be organized as a flat collection of files, or as an explicit split between **apps** — deployable, surface-specific entry points corresponding to Chapter 2's four named surfaces — and **packages** — shared code with no independent deployment of its own, consumed by one or more apps. This Constitution adopts the apps-and-packages split, for three reasons tied directly to Chapter 1's principles.

**IP1, Traceable Translation.** A shared package's existence is a direct claim that more than one surface needs it; an app's existence is a direct claim that a surface from Chapter 2's diagram is actually being built. Both claims are falsifiable by inspection — a package used by only one app, or an app with no corresponding Chapter 2 surface, is immediately suspect — where a flat structure gives no equivalent signal.

**IP6, Non-Negotiable Floors.** Chapter 2's trust boundaries are drawn between surfaces. An apps-and-packages split makes that boundary a structural property of the repository itself — a Marketing Site app cannot accidentally import Client Portal session-handling code that was never placed in a shared package, because the trust-sensitive code was never structurally reachable from the wrong app in the first place. A flat structure relies entirely on developer discipline to maintain the same boundary; this split makes the boundary partly self-enforcing.

**IP3, Restraint in Construction.** New shared code is only justified once a second, genuinely independent consumer exists — the split makes that threshold visible: code either lives inside a single app (one consumer, no sharing claim made) or inside a package (an explicit, checkable claim of multiple consumers). A flat structure has no equivalent mechanism forcing that distinction to be made honestly.

---

## 3. WHAT BELONGS IN AN APP VERSUS A PACKAGE

**An app** contains code specific to one of Chapter 2's named surfaces: its routes, its surface-specific business logic, and its deployment configuration. An app never directly imports another app's internals — only shared packages.

**A package** contains code with a demonstrated need in more than one app: the Part III component library, the Chapter 22 state-management utilities genuinely shared across surfaces, the Chapter 24 API contract types consumed by more than one app's data layer. A package is created only when Chapter 1's IP3 threshold is actually met — a second consumer exists or is concretely, immediately planned — never speculatively ahead of that need.

---

## 4. WHY THIS SCALES WITH CHAPTER 2'S FOUR SURFACES

Chapter 2 named four surfaces and explicitly declined to invent a rendering category for one that doesn't yet exist. This chapter's structure inherits that same discipline: an app exists in the repository only for a surface that is actually being built, per Chapter 2 Section 6's classification procedure. The Future Roadmap surface named in Chapter 2 does not get a placeholder app created in anticipation of it — creating one would be exactly the "architecting a fifth surface no one has committed to" anti-pattern Chapter 2 §11 already names and forbids.

---

## 5. ENFORCEMENT & MEASUREMENT

A dependency-graph check can, in principle, verify that no app imports directly from another app's internal directory rather than through a shared package — a mechanical enforcement of Section 2's trust-boundary claim, specified fully once Chapter 7 fixes the literal paths involved. A package with only one consuming app is a mechanically detectable signal that either a second consumer is imminent (and the package is justified) or the code should be moved back into that single app (and the package retired) — checked periodically per Chapter 66's debt-register review rather than left to accumulate unnoticed.

---

## 6. BEHAVIORAL RULES

**Before creating a new package.** IP3's threshold is checked explicitly: does a second consumer already exist, or is one concretely committed — not merely plausible.

**Before creating a new app.** Chapter 2 Section 6's classification procedure has already run, and the surface it identifies does not already correspond to an existing app.

**When a package's second consumer disappears.** The package is reconsidered for consolidation back into its remaining single consumer, rather than left in place on the assumption that removing it is more work than it's worth.

---

## 7. DO / DON'T

**Do** create a shared package the moment a second real consumer exists, rather than leaving the logic duplicated in two apps out of inertia.

**Don't** create a package speculatively for code currently used by only one app, on the reasoning that it will probably be needed elsewhere eventually — this is IP3's violation applied to repository structure specifically.

**Don't** allow one app to import another app's internal files directly, even for a small, seemingly harmless utility — extract it to a package first, so the trust boundary Section 2 describes stays structurally real rather than merely conventional.

---

## 8. QUALITY ASSURANCE CHECKLIST

- [ ] Does every app in the repository correspond to a named surface from Chapter 2, established via that chapter's classification procedure?
- [ ] Does every package have at least two genuine, current consumers — or a concretely committed second one?
- [ ] Does any app import another app's internals directly, rather than through a shared package?

---

## 9. CROSS REFERENCES

**Within this Constitution:** Chapter 2 (the surface diagram and trust boundaries this chapter's split enforces structurally). Chapter 1 (IP1, IP3, IP6). Chapter 7 (Repository Structure Standard) fixes the literal directory tree this chapter's reasoning produces. Chapter 66 (Engineering Debt Register) tracks packages that have drifted below the two-consumer threshold.

**Within the five documents above this Constitution:** Master Vision Chapter 25, Chapter 26.

---

## 10. FUTURE EXPANSION

**Documented limitations.** This chapter assumes the apps-and-packages split remains proportionate to four or fewer active surfaces. Should Master Vision Chapter 26's roadmap materialize into substantially more surfaces than Chapter 2 currently names, this chapter's reasoning should be re-checked against the resulting scale via Chapter 62's ADR process, rather than assumed to hold indefinitely without re-examination.

---

*End of Chapter 6. The next chapter, Repository Structure Standard, fixes this reasoning into an actual, literal directory tree.*
