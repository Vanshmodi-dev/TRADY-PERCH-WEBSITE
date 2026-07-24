# CHAPTER 24 — API CONTRACT & SCHEMA STANDARDS

**Trady Perch Product Implementation Constitution · Part V: State, Data & API Architecture**

**Inherited From:** Design System Bible Chapter 57 (Data, Number & Unit Formatting Standards). Chapter 23 (API Integration Philosophy) is this chapter's direct premise — this chapter specifies the contract mechanism Chapter 23's server-mediation boundary relies on.

---

## 1. INTRODUCTION

Chapter 23 established that every external integration is server-mediated and classified. This chapter specifies what actually crosses that mediation boundary: a schema-defined, validated contract, living in `packages/api-contracts/` per Chapter 7 §4, that both the producing and consuming side of every request treat as the single source of truth for shape — never an implicit, informally-agreed structure that each side happens to assume matches the other's.

---

## 2. SCHEMA-FIRST, NOT TYPE-INFERRED

Every request and response shape is defined as an explicit schema first — not inferred after the fact from an example payload, and not hand-written as a TypeScript interface independently on both the producing and consuming side, which per Chapter 3's duplicate-translation model would create exactly two hand-maintained copies of the same contract, free to drift. The schema is the one definition; every consuming type (a TypeScript type for the frontend, a validation function for the server boundary) is generated from it, mirroring Chapter 13's single-source-of-truth token model exactly, applied here to data shape instead of design values.

---

## 3. VALIDATION AT THE BOUNDARY, NOT AT THE POINT OF USE

Every response crossing Chapter 23's server-mediation boundary is validated against its schema at the moment it arrives — before it is passed further into application code, never lazily checked the first time a specific field happens to be read deep inside a component. A response that fails validation is surfaced immediately as a typed error per Chapter 27's error-handling standard, never allowed to propagate as a partially-shaped object where a missing field silently resolves to `undefined` and fails, confusingly, somewhere unrelated and much later in the code path. This is the direct mechanism behind this chapter's own success criterion.

---

## 4. VERSIONING THE CONTRACT

A schema change that removes a field, changes a field's type, or changes a field's meaning is a breaking change, versioned exactly as Chapter 17 versions the component library — a major version bump with a documented migration path, never introduced as a silent, in-place edit to an existing schema version. A purely additive change (a new optional field) is versioned as additive, mirroring Chapter 17's Vs-1 default directly. A consumer pins to a specific contract version, exactly as Chapter 17 §3 requires an app to pin a specific `packages/ui/` version — a breaking contract change does not silently propagate to a consumer that hasn't explicitly migrated.

---

## 5. DATA FORMATTING AT THE BOUNDARY

Design System Bible Chapter 57's data, number, and unit formatting standards govern how a value is *displayed*; this chapter governs how it is *transmitted*, and the two are kept deliberately distinct. A schema transmits a value in its most precise, unformatted, unambiguous form (a raw numeric value with an explicit unit field, an ISO-8601 timestamp) — never a pre-formatted display string — and Design System Bible Chapter 57's formatting rules are applied only at the point of render, in the component layer, per Chapter 12's template. This separation exists because a pre-formatted string baked into the contract would force every consumer to either accept one specific display format or re-parse a string that should never have needed parsing in the first place.

---

## 6. ENFORCEMENT & MEASUREMENT

Section 3's boundary validation is fully mechanical by construction — every generated consumer type comes paired with a runtime validation function, and a response failing that validation throws a typed error before reaching any further application code, with no code path that skips this step. Section 4's versioning discipline is checked the same way Chapter 17 §5 checks component-library compatibility: an automated schema-diff tool classifies a proposed contract change as additive or breaking, and a human-declared version bump that doesn't match this automatic classification fails CI.

---

## 7. BEHAVIORAL RULES

**Before implementing any new integration.** The schema is defined first, in `packages/api-contracts/`, before either the producing or consuming code is written — schema-first, mirroring Chapter 12 §8's types-first component discipline exactly.

**When a response fails boundary validation in production.** It is treated as an integration defect requiring immediate investigation, per Chapter 59's incident protocol if it affects a live user — never patched around by relaxing the schema to accept whatever shape was actually received, which would silently weaken the contract for every other consumer relying on its original guarantee.

**When a contract needs to change.** Section 4's versioning procedure runs in full — additive changes ship freely; breaking changes require the same major-version, migration-path discipline Chapter 17 already establishes for the component library.

---

## 8. DO / DON'T

**Do** define every request and response shape as an explicit schema before writing the code that produces or consumes it.

**Do** validate every response at the server-mediation boundary, surfacing a typed error immediately on any mismatch.

**Don't** hand-write a duplicate TypeScript interface on the consuming side that isn't generated from the shared schema — this recreates exactly the duplicate-translation risk Chapter 3 exists to prevent.

**Don't** transmit a pre-formatted display string in a contract where a precise, unformatted value would serve — apply Design System Bible Chapter 57's formatting only at render time.

---

## 9. ANTI-PATTERNS

**The optimistic type assertion.** A frontend developer, confident about what shape an API response "should" have, writes a type assertion (`as ClientInvoice`) instead of running it through Section 3's actual runtime validation, because the assertion compiles instantly and the validation setup feels like extra work. This is dangerous because a type assertion is a compile-time-only claim with zero runtime effect — if the actual response doesn't match, the assertion doesn't fail, it simply lies to the rest of the code about what shape the data has, and the resulting bug surfaces confusingly far from its actual cause. It is detected by a lint rule flagging any type assertion applied directly to a network response. It is fixed by routing the response through Section 3's generated validation function instead of asserting its shape.

---

## 10. QUALITY ASSURANCE CHECKLIST

- [ ] Is every request/response shape defined as an explicit schema in `packages/api-contracts/`, before any consuming code is written?
- [ ] Does every response get validated at the boundary, surfacing a typed error on mismatch rather than propagating `undefined`?
- [ ] Does a proposed schema change's declared version match Section 6's automated additive/breaking classification?
- [ ] Does the contract transmit precise, unformatted values, with display formatting applied only at render time per Design System Bible Chapter 57?

---

## 11. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP1, IP3). Chapter 3 (duplicate-translation model, applied to contract types). Chapter 7 §4 (`packages/api-contracts/`'s foundational tier). Chapter 12 (types-first discipline, mirrored in Section 7). Chapter 13 (single-source-of-truth model, applied here to data shape). Chapter 17 (versioning discipline Section 4 mirrors directly). Chapter 23 (the trust boundary this chapter's contracts cross). Chapter 27 (Error Handling Implementation Standard, the destination for Section 3's typed validation errors). Chapter 59 (Incident Response, for production validation failures).

**Within the five documents above this Constitution:** Design System Bible Chapter 57.

---

## 12. FUTURE EXPANSION

**Documented limitations.** Section 6's schema-diff automation assumes a schema-definition format expressive enough to represent additive-versus-breaking distinctions mechanically; Chapter 10's eventual specific tooling pin may require adapting the exact mechanism without changing this chapter's underlying requirement.

---

*End of Chapter 24. The next chapter, Data Fetching & Caching Strategy, specifies when data crossing this contract boundary is actually fetched, and how its staleness is managed.*
