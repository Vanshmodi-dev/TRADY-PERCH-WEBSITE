# CHAPTER 17 — COMPONENT LIBRARY GOVERNANCE & VERSIONING

**Trady Perch Product Implementation Constitution · Part III: Component Architecture & Design System Implementation**

**Inherited From:** Design System Bible Chapter 64 (Versioning & Release Philosophy — Vs-1 "Versioning Is Additive by Default," Vs-2 "A Breaking Change Requires a Major Version Number and a Documented Migration Path," Vs-3 "Every Release Note Cites the Specific Chapter and Reason") and Chapter 66 (Component Lifecycle — Lc-1 "Five States, Identical to Chapter 2's Token Model," Lc-2 "Deprecation Always Names a Successor or an Explicit Removal Reason," Lc-3 "A Retired Component's Name Is Never Reassigned"). Chapter 12 (Component Implementation Standard) and Chapter 7 (Repository Structure Standard) are this chapter's direct premises.

---

## 1. INTRODUCTION

Design System Bible Chapter 64 and Chapter 66 fix how the component library evolves and retires at the level of design decision — additive by default, breaking changes major-versioned, five lifecycle states, retired names never reused. This chapter is the mechanism: how `packages/ui/`, consumed by every app in Chapter 7's tree, is actually versioned, published, and consumed, such that a breaking change in the library cannot silently break a consuming app that hasn't chosen to accept it.

---

## 2. SEMANTIC VERSIONING, MAPPED DIRECTLY TO Vs-1 AND Vs-2

`packages/ui/` follows semantic versioning exactly: a patch version for a fix with no API change, a minor version for an additive, backward-compatible change (per Vs-1's default), and a major version for any breaking change (per Vs-2). The determination of which category a given change falls into is not a judgment call left to the author — it is mechanically checked per Section 5, because "does this change break an existing consumer" is a question a type-level and behavioral compatibility check can answer more reliably than a human's own assessment of their own change.

---

## 3. EVERY APP PINS AN EXPLICIT VERSION

Per Chapter 7's monorepo structure, every app declares which version of `packages/ui/` it consumes explicitly, rather than always resolving to whatever the latest published version happens to be. A major version bump to `packages/ui/` does not automatically propagate to a consuming app — that app's pin is updated deliberately, in its own pull request, citing the migration path Vs-2 requires the major version to ship with. This is the direct mechanism behind this chapter's own success criterion: a breaking change fails CI in any app still pinned to the prior major version, because that app's build simply continues resolving against the version it explicitly declared, unaffected until its own maintainers choose to migrate.

---

## 4. THE FIVE LIFECYCLE STATES IN CODE

Lc-1's five lifecycle states — mirroring Chapter 13's token lifecycle exactly — are represented as an explicit status field on every component's entry in `packages/ui/`'s published manifest: active, deprecated, and the remaining states Chapter 66 defines. A component in the deprecated state carries, per Lc-2, either a named successor component (referenced directly in its own documentation per Chapter 61) or an explicit, stated removal reason with no successor — never deprecated silently with neither. A build-time warning surfaces automatically to any consuming app still importing a deprecated component, naming the successor or removal reason directly in the warning text, so a consumer never has to separately look up why a component was deprecated.

---

## 5. ENFORCEMENT & MEASUREMENT

A compatibility check, run in CI against every proposed change to `packages/ui/`, compares the change's public API surface (props types, exported symbols) against the currently published version and classifies it automatically as patch, minor, or major per Section 2 — a human-declared version bump that doesn't match this automatic classification fails CI, preventing a breaking change from ever being mis-labeled as a minor release, deliberately or by oversight. Every consuming app's CI run, per Section 3, resolves against its own pinned version — the mechanical guarantee that an unmigrated app never silently receives a breaking change.

---

## 6. BEHAVIORAL RULES

**When proposing a change to `packages/ui/`.** Section 5's compatibility check is run before the change is presented for review; its classification is treated as authoritative over the author's own initial assumption about whether the change is breaking.

**When deprecating a component.** A successor or an explicit removal reason is named at the moment of deprecation, per Lc-2 — never deferred to "we'll explain later," which per Chapter 5's F2 becomes an undocumented exception the moment it's forgotten.

**When migrating a consuming app to a new major version.** The migration path the major version shipped with (per Vs-2) is followed and any deviation from it is logged as a Chapter 66 (this Constitution's) debt-register entry if the migration can't be completed in the same pull request.

---

## 7. DO / DON'T

**Do** let Section 5's automated compatibility check, not personal judgment, determine whether a change is a major, minor, or patch version.

**Do** name a deprecated component's successor directly in its own build-time warning text.

**Don't** allow a consuming app to silently float on "latest" `packages/ui/` version — every app pins explicitly, per Section 3.

**Don't** reassign a retired component's name to a new, unrelated component, per Lc-3 — this mirrors Chapter 9 §8's identical rule for code names generally.

---

## 8. ANTI-PATTERNS

**The silent breaking minor.** A change to `packages/ui/` that technically alters existing behavior (a default value change, a subtly different rendered output) is shipped as a minor version because its author didn't recognize it as breaking, rather than deliberately mislabeling it. This is dangerous specifically because it is unintentional — the author genuinely believed the change was additive, and a consuming app pinned loosely (a version range rather than Section 3's explicit pin) would silently receive it. It is detected by Section 5's automated compatibility check, which does not rely on the author's own classification. It is fixed by re-releasing the change under a correct major version with Vs-2's required migration path, and by treating the original mis-release as compromised, per the same logic Chapter 10 applies to a leaked secret — once shipped incorrectly, it cannot simply be relabeled after the fact without a clean corrective release.

---

## 9. QUALITY ASSURANCE CHECKLIST

- [ ] Does the proposed change's version bump match Section 5's automated compatibility classification? *(Vs-1, Vs-2)*
- [ ] Does every consuming app pin an explicit `packages/ui/` version, rather than floating on latest? *(Section 3)*
- [ ] Does every deprecated component name a successor or an explicit removal reason? *(Lc-2)*
- [ ] Does the release note cite the specific Design System Bible chapter and reason behind the change, per Vs-3?
- [ ] Has any retired component's name been checked against reuse, per Lc-3?

---

## 10. CROSS REFERENCES

**Within this Constitution:** Chapter 7 (the monorepo structure Section 3's per-app pinning operates inside). Chapter 9 §8 (the name-retirement rule Lc-3 mirrors). Chapter 12 (the component template whose public API Section 5 checks compatibility against). Chapter 13 (the token lifecycle Lc-1 mirrors exactly). Chapter 61 (Code-Level Documentation, where a deprecated component's successor is documented). Chapter 66 (this Constitution's own Engineering Debt Register, for incomplete migrations).

**Within the five documents above this Constitution:** Design System Bible Chapter 64 (in full), Chapter 66 (in full).

---

## 11. FUTURE EXPANSION

**Documented limitations.** Section 5's automated compatibility check currently covers type-level and prop-surface changes; a behavioral change with no type-level signature difference (a component silently rendering different output for the same props) is not yet mechanically detectable by this chapter's tooling alone, and remains dependent on Chapter 48's visual regression suite to catch — a known, current limitation rather than a gap this chapter claims to have already closed.

---

*End of Chapter 17, and of Part III. Part IV, Accessibility & Inclusive Engineering, is where "non-negotiable" stops being a claim in prose and becomes a build that cannot ship without passing.*
