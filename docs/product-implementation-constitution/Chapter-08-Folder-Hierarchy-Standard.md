# CHAPTER 8 — FOLDER HIERARCHY STANDARD

**Trady Perch Product Implementation Constitution · Part II: Repository & Project Architecture**

**Inherited From:** Design System Bible Chapter 17 (Component Philosophy & Anatomy Standard) — its per-component internal structure is the direct structural parallel this chapter generalizes to a per-feature folder. Chapter 7 (Repository Structure Standard) is this chapter's premise; this chapter specifies one level deeper, inside any single app or package.

---

## 1. INTRODUCTION

Chapter 7 named the top-level folders. Inside any one of them — `apps/client-portal/`, `packages/ui/` — a second, consistent question remains: where does a component live relative to the hook that drives it, the test that verifies it, and the fixture that feeds the test? This chapter answers that question once, so it never has to be separately decided per feature, per app, or per contributor.

---

## 2. THE FEATURE-FOLDER PRINCIPLE

Code is organized around the feature it serves, not around its technical type. A folder named `hooks/` sitting at an app's root, containing every hook the entire app uses regardless of what feature they belong to, is not permitted — it is exactly the kind of structure that requires a reader to already know which hook belongs to which feature, violating Chapter 1's IP4. Instead, every app follows:

```
apps/<app-name>/src/
├── features/
│   └── <feature-name>/
│       ├── components/
│       ├── hooks/
│       ├── api/
│       ├── types/
│       ├── tests/
│       └── fixtures/
├── shared/
│   ├── components/
│   ├── hooks/
│   └── utils/
└── routes/
```

A **feature** is a cohesive unit of user-facing capability — Chapter 2's Client Portal app might have `features/project-status/`, `features/invoicing/`. Everything a feature needs to function — its components, its data-fetching hooks, its types, its own tests and fixtures — lives inside that one folder, colocated rather than scattered across type-based top-level folders.

---

## 3. `shared/` VERSUS `features/`

Code moves from a feature folder into `shared/` under the same threshold Chapter 6 §3 sets for promoting app code into a package: a second, genuine consumer exists. A component used only inside `features/invoicing/` stays there even if it seems generically reusable in principle — per Chapter 1's IP3, the move to `shared/` is justified by an actual second feature needing it, not by the component's hypothetical reusability. `shared/` itself never contains feature-specific logic; anything that only makes sense in the context of one feature has drifted out of place and is moved back.

---

## 4. `routes/`

Route definitions live in their own top-level folder, thin by design — a route file imports and renders a feature's top-level component and contains no business logic of its own. This keeps Chapter 38's rendering-strategy decisions (which are made per route) cleanly separable from Chapter 12's component-implementation decisions (which are made per feature), rather than tangled together in files that mix both concerns.

---

## 5. THE SAME PATTERN INSIDE `packages/`

A composed package like `packages/ui/` follows the same colocation logic at component granularity rather than feature granularity: each component's implementation, its tests, and its Storybook-equivalent documentation (per Chapter 61) live together in one folder named for the component, mirroring Design System Bible Chapter 17's anatomy standard directly. A foundational package like `packages/tokens/` follows whatever internal structure Chapter 13 specifies for token output, since its content is generated rather than feature-organized.

---

## 6. ENFORCEMENT & MEASUREMENT

A structural lint rule, run in CI, checks that every folder under `features/` contains only the six subfolder names Section 2 permits, that no top-level `hooks/` or `components/` folder exists outside `shared/`, and that no file inside `features/<x>/` imports directly from inside `features/<y>/` without going through `shared/` — a direct feature-to-feature import is a signal the two should either be merged or the shared logic promoted, per Section 3. This is the mechanism behind this chapter's own success criterion: a feature folder scaffolded by an AI agent either matches this schema exactly or fails the lint rule immediately, with no manual correction cycle required to catch the mismatch later.

---

## 7. BEHAVIORAL RULES

**When starting a new feature.** All six subfolders from Section 2 are not required to be populated immediately — an empty `fixtures/` folder is not created speculatively — but any subfolder that is populated uses exactly the name Section 2 specifies, never a synonym.

**When a feature grows large enough to need its own sub-features.** The same pattern nests: `features/invoicing/features/recurring-billing/`, rather than flattening into a differently-shaped structure at depth.

---

## 8. DO / DON'T

**Do** colocate a feature's tests and fixtures with the feature itself, not in a parallel top-level `tests/` tree that mirrors the source tree at a distance.

**Don't** create a top-level `utils/` folder outside `shared/utils/` — a second location for the same kind of code is exactly the ambiguity Chapter 1's IP4 exists to prevent.

**Don't** import directly between two feature folders — promote the shared need into `shared/` first, per Section 3.

---

## 9. QUALITY ASSURANCE CHECKLIST

- [ ] Does every feature folder use only the subfolder names Section 2 specifies?
- [ ] Does any code in `shared/` genuinely have two or more current consumers, per Section 3's threshold?
- [ ] Are route files thin, containing no business logic that belongs in a feature folder instead?
- [ ] Does the structural lint rule pass with zero manual correction?

---

## 10. CROSS REFERENCES

**Within this Constitution:** Chapter 7 (the top-level tree this chapter operates inside). Chapter 6 §3 (the promotion threshold Section 3 reuses). Chapter 12 (Component Implementation Standard) governs what lives inside a `components/` folder. Chapter 38 (Rendering Strategy Standard) governs what a `routes/` file is responsible for deciding. Chapter 47 (Testing Strategy) governs what belongs in a `tests/` folder.

**Within the five documents above this Constitution:** Design System Bible Chapter 17.

---

## 11. FUTURE EXPANSION

**Documented limitations.** This chapter's feature-folder model is calibrated for the Client Portal and Marketing Site apps' current scale. If a single feature grows large enough that its own internal structure needs further standardization beyond Section 2's six subfolders, that extension is proposed through Chapter 64's governance path rather than improvised ad hoc per feature.

---

*End of Chapter 8. The next chapter, Naming Conventions, extends this structural discipline to what everything inside these folders is actually called.*
