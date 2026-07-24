# CHAPTER 7 — REPOSITORY STRUCTURE STANDARD

**Trady Perch Product Implementation Constitution · Part II: Repository & Project Architecture**

**Inherited From:** Design System Bible Chapter 2 (Design Tokens Architecture) — specifically its core/semantic/component tiering, mirrored below in how packages are tiered by how foundational they are. Chapter 6 (Repository Structure Philosophy) is this chapter's direct premise; this chapter fixes Chapter 6's reasoning into a literal, versioned tree.

---

## 1. INTRODUCTION

Chapter 6 established why the repository splits into apps and packages. This chapter names, exhaustively, what exists at the repository root and one level below it. Nothing in this chapter is aspirational — every folder named here either exists because a current, named need requires it (per Chapter 1's IP3) or is explicitly marked as created only once a specific, named trigger occurs.

---

## 2. THE ROOT TREE

```
/
├── apps/
│   ├── marketing-site/
│   ├── client-portal/
│   └── conversational/
├── packages/
│   ├── ui/
│   ├── tokens/
│   ├── motion/
│   ├── api-contracts/
│   ├── testing/
│   └── config/
├── docs/
│   ├── adr/
│   └── [the six constitutional documents and their chapters]
├── ci/
├── scripts/
├── [workspace manifest, lockfile, root config files]
```

Every entry is justified individually below. No entry exists without a justification here; a folder discovered in the repository with no corresponding entry in this section is, per Chapter 3's orphan definition, itself a defect.

---

## 3. `apps/` — ONE FOLDER PER BUILT SURFACE

Each subfolder under `apps/` corresponds to exactly one surface from Chapter 2's diagram, created only once that surface passes Chapter 2 §6's classification procedure and is actively being built — never speculatively.

**`apps/marketing-site/`** — Chapter 2's Surface 1. Static-first per Chapter 2 §4; the only app permitted to ship without any authenticated route.

**`apps/client-portal/`** — Chapter 2's Surface 2. Every route inside this app requires an authenticated session by default, per Chapter 2 §5 — this is a structural property of the app's own routing layer, not a per-page decision made inside it.

**`apps/conversational/`** — Chapter 2's Surface 3, where it exists as a standalone entry point rather than embedded inside another app. The server-mediation boundary Chapter 2 §4 requires lives here regardless of which app's UI ultimately renders a conversational widget consuming it.

A fourth app is added under `apps/` only when Chapter 2's Future Roadmap surface is actually commissioned, following the same classification procedure, and named at that time — not reserved in advance.

---

## 4. `packages/` — TIERED BY HOW FOUNDATIONAL

Packages are tiered, mirroring Design System Bible Chapter 2's core/semantic/component token tiering: a **foundational** package has no dependency on any other package in this repository; a **composed** package depends on one or more foundational packages but not on another composed one, preventing circular or unpredictable dependency graphs from forming as the package count grows.

**`packages/tokens/`** *(foundational)* — the build-time output of Chapter 13's Design Token Implementation, translating Design System Bible Chapters 2–5's token tiers into consumable code. Depends on nothing else in this repository.

**`packages/motion/`** *(foundational)* — Chapter 14's motion primitives, translating Motion Bible's duration and easing tokens into code. Depends on nothing else in this repository, though it is frequently consumed alongside `tokens`.

**`packages/api-contracts/`** *(foundational)* — Chapter 24's schema and type definitions, the single source of truth for request/response shapes consumed by any app's data layer. Depends on nothing else in this repository.

**`packages/config/`** *(foundational)* — shared lint, type-check, and build configuration per Chapter 9 and Chapter 10, consumed by every app and every other package.

**`packages/ui/`** *(composed)* — Chapter 12's component library, depending on `tokens` and `motion` directly, per Part III's translation of the Design System Bible and Motion Bible into code.

**`packages/testing/`** *(composed)* — shared test utilities and fixtures per Chapter 47, depending on `api-contracts` for typed mock data and `ui` for component-testing helpers.

A package created outside these six requires the justification Chapter 6 §3 already specifies — a demonstrated, current, cross-app need — stated explicitly in the pull request introducing it, not assumed from the package's name alone.

---

## 5. `docs/`

Houses the six constitutional documents in full, including this Constitution's own chapters, and `docs/adr/` — the flat, chronologically numbered store of every Architecture Decision Record Chapter 62 requires. `docs/` is the one top-level folder whose contents are prose rather than code, and it is held to Chapter 60's documentation philosophy rather than Part III's component standards.

---

## 6. `ci/` AND `scripts/`

**`ci/`** contains the literal pipeline configuration Chapter 56 specifies — every stage from commit to merge-ready, versioned alongside the code it checks, per Chapter 1's IP2.

**`scripts/`** contains repository-level tooling that operates across apps and packages — a workspace-wide lint runner, a release-tagging script per Chapter 58 — never feature-specific logic, which belongs inside the relevant app or package instead.

---

## 7. ROOT-LEVEL FILES

The workspace manifest (declaring the apps-and-packages layout to the package manager), a single lockfile, and root-level configuration files consumed by `packages/config/` live at the repository root and nowhere else — Chapter 9 forbids a second, app-local copy of any configuration file that is supposed to be shared, since a duplicated config file is a duplicate translation in Chapter 3's sense, and will drift the same way any other duplicate does.

---

## 8. ENFORCEMENT & MEASUREMENT

A repository-structure linter, run in CI per Chapter 56, checks that every folder under `apps/` and `packages/` matches an entry in Section 3 or Section 4 respectively — an unrecognized top-level folder fails this check by default, requiring either its removal or an explicit amendment to this chapter through Chapter 64's governance path. This is the direct, mechanical realization of this chapter's own success criterion: two engineers or agents scaffolding independently from this chapter's text alone should produce identical top-level trees, and a linter is what confirms that claim rather than merely asserting it.

---

## 9. BEHAVIORAL RULES

**When starting a new app or package.** Section 3 or Section 4's justification is satisfied and stated in the introducing pull request before any code is written inside it.

**When a package's tier is ambiguous.** A package depending on another composed package is a structural signal the dependency graph is growing more complex than Section 4's two-tier model anticipates — resolved by either promoting the dependency to foundational (if it genuinely has no further dependencies of its own) or reconsidering whether the two packages should be one.

---

## 10. DO / DON'T

**Do** place a new shared utility inside the most foundational existing package that already fits it, rather than creating a new package for a single new function.

**Don't** create an app-local copy of `packages/config/`'s settings, even temporarily — per Chapter 9, this is a duplicate translation and will drift.

**Don't** let a composed package depend on another composed package — extract the shared foundation into its own foundational package instead, keeping the dependency graph exactly two levels deep.

---

## 11. QUALITY ASSURANCE CHECKLIST

- [ ] Does every folder under `apps/` correspond to a Chapter 2 surface, created only once that surface is actively being built?
- [ ] Does every folder under `packages/` fit one of Section 4's six named packages, or carry an explicit, stated justification for a new one?
- [ ] Is every package correctly tiered — foundational packages depending on nothing else in this repository, composed packages depending only on foundational ones?
- [ ] Does the repository-structure linter pass with zero unrecognized top-level folders?

---

## 12. CROSS REFERENCES

**Within this Constitution:** Chapter 6 (the reasoning this chapter fixes into a literal tree). Chapter 2 (the surface diagram `apps/` mirrors exactly). Chapter 8 (Folder Hierarchy Standard) specifies structure one level deeper, inside each app and package. Chapter 9 (Naming Conventions), Chapter 13 (Design Token Implementation), Chapter 14 (Motion Implementation Strategy), Chapter 24 (API Contract & Schema Standards), Chapter 47 (Testing Strategy), Chapter 56 (Continuous Integration Standard), Chapter 58 (Release & Versioning Standard), Chapter 62 (Architecture Decision Record Standard) each own the content living inside a folder this chapter names.

**Within the five documents above this Constitution:** Design System Bible Chapter 2.

---

## 13. FUTURE EXPANSION

**Possible future additions.** A new foundational or composed package is added to Section 4 only once Section 4's own justification standard is met by an actual, current need — this chapter is amended to reflect it at that time, not ahead of it.

---

*End of Chapter 7. The next chapter, Folder Hierarchy Standard, specifies the convention one level deeper — inside any single app or package.*
