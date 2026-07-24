# CHAPTER 44 — DATA PRIVACY & COMPLIANCE IMPLEMENTATION

**Trady Perch Product Implementation Constitution · Part IX: Security Implementation**

**Inherited From:** Design System Bible Chapter 46 (Trust, Privacy & Security Visual Patterns); Brand Identity Manual Chapter 17 (Legal & Compliance Language Register); UX / Experience Blueprint Chapters 93–99 (Trust, Ethics & Dark Pattern Prohibition). Chapter 43 (Application Security Standard) is this chapter's direct premise.

*Scope note: this chapter specifies implementation mechanics. The legal requirements themselves derive from applicable law and are not invented, interpreted, or expanded here — where this chapter and actual legal counsel appear to differ, legal counsel governs, and this chapter is revised.*

---

## 1. INTRODUCTION

Chapter 43 secured the application layer. This chapter secures something narrower and, for a company handling client data and workflow access, equally consequential: how personal data is classified, collected with actual informed consent, retained only as long as justified, and — the single hardest mechanical requirement this chapter imposes — fully and verifiably deleted on request, from every store it touched, with no manual hunting required.

---

## 2. DATA CLASSIFICATION

Every field in Chapter 24's schema is classified, at the point it's defined, into one of three tiers: **public** (no privacy sensitivity), **personal** (identifies or relates to an individual, but not especially sensitive), or **sensitive** (financial, credential-adjacent, or otherwise high-impact if disclosed). This classification is a mandatory field in the schema definition itself, per Chapter 24 §2's mandatory-field discipline — a field with no stated classification fails schema validation, mirroring exactly how Chapter 26 §2 makes an error's classification mandatory rather than optional.

Classification determines handling automatically: sensitive-tier fields require Chapter 43 §4's encryption-at-rest by default; personal-tier fields are included in Section 5's deletion mechanism; public-tier fields carry no special handling requirement.

---

## 3. CONSENT CAPTURE

Where a feature collects personal or sensitive-tier data, per Design System Bible Tr-2, the consent request states exactly what is collected and why, at the moment of collection — never a broad, upfront consent covering data not yet actually being requested. The consent record itself is stored as structured, queryable data (what was consented to, when, under what stated purpose) — never merely inferred from the fact that a form was submitted, because a specific, recorded consent is what makes Section 5's deletion and Section 6's retention enforcement actually verifiable later.

---

## 4. THE LEGAL-LANGUAGE IMPLEMENTATION BOUNDARY

Per Brand Identity Manual Chapter 17, disclosure and consent copy is written to maintain the brand's composed register within genuine legal precision constraints. This chapter's contribution is narrower: the copy itself is Brand Identity Manual Chapter 17's territory, and this chapter only specifies that such copy, wherever it appears in product code, is externalized per Chapter 20 §2's string-externalization standard and version-tracked, so that a change to disclosure language is auditable — which specific version of which disclosure a specific user actually saw and consented to, per Section 3's consent record, is always reconstructable.

---

## 5. THE DELETION MECHANISM

Every personal- and sensitive-tier field, per Section 2's classification, is registered in a single, central data-inventory manifest — generated automatically from Chapter 24's schema classifications, never hand-maintained separately, per Chapter 3's duplicate-translation prohibition. A data-subject deletion request triggers one automated process that reads this manifest and issues a deletion or anonymization operation against every store containing a classified field for that subject — Class A backend stores, Class B third-party services per Chapter 23 that hold copies of the data, and any cache per Chapter 25 that might still hold a stale copy. This is the direct mechanism behind this chapter's own success criterion: no manual, per-system hunting is required, because the manifest is comprehensive by construction — a field that exists in the schema but isn't in the manifest is a schema-validation failure per Section 2, not a silent gap.

---

## 6. RETENTION ENFORCEMENT

Every personal- or sensitive-tier field's classification, per Section 2, also carries a stated retention period, after which the data is automatically deleted or anonymized absent an active, specific reason to retain it longer. This is enforced by a scheduled process reading the same manifest Section 5 uses, not a manual periodic audit someone has to remember to run — retention, like deletion, is a property of the data's classification, checked automatically rather than hoped for.

---

## 7. DATA MINIMIZATION AT THE INTEGRATION BOUNDARY

Chapter 23 §5 already requires the server-mediation layer to return only the fields a client actually needs. This chapter extends that requirement specifically to personal- and sensitive-tier data: a Class B integration (Chapter 23) is sent only the classified fields it genuinely requires for its specific function, never a broader payload that happens to be convenient to pass through — per Chapter 42 §4's contextual permission-request standard applied to data sharing specifically.

---

## 8. ENFORCEMENT & MEASUREMENT

Section 2's classification is enforced by Chapter 24's schema validation rejecting an unclassified field. Section 5's deletion mechanism is verified by a required integration test, mirroring Chapter 25 §7's mutation-invalidation test exactly: the test performs a deletion request and asserts that every store in the manifest no longer contains the subject's classified data — a deletion mechanism shipped with no such test is treated as incomplete per Chapter 49's quality gates, the same severity Chapter 25 already gives an untested cache invalidation. Section 6's retention enforcement is verified by a scheduled job's own execution log, audited per Chapter 59's incident-response cadence for any missed run.

---

## 9. BEHAVIORAL RULES

**When defining any new schema field, per Chapter 24.** Section 2's classification is stated as a mandatory part of that definition, before the field is used anywhere in application code.

**When implementing any feature that collects personal or sensitive data.** Section 3's specific, contextual consent capture is built in from the start — never a broad, pre-existing consent checkbox reused to cover a new kind of collection it wasn't originally scoped for.

**When a deletion request is received.** Section 5's automated process is invoked and its completion verified against the manifest — never handled by a person manually searching known systems from memory, which per this chapter's own success criterion is exactly the failure mode this mechanism exists to eliminate.

---

## 10. DO / DON'T

**Do** classify every schema field's privacy tier at the point it's defined, as a mandatory field.

**Do** capture consent specifically, at the moment of collection, stating exactly what and why per Design System Bible Tr-2.

**Don't** send a Class B integration a broader data payload than its specific, stated function requires.

**Don't** handle a deletion request manually, per system — invoke Section 5's single automated process and verify its result against the manifest.

---

## 11. ANTI-PATTERNS

**The undocumented data copy.** A feature caches or duplicates a piece of personal data into a new store — a local cache, an analytics event payload — without registering it in Section 5's manifest, because the copy felt incidental rather than a "real" data store. This is dangerous because it is precisely the gap that defeats this chapter's own deletion guarantee: the manifest is comprehensive by construction only if every actual copy is registered, and an unregistered copy is invisible to the deletion process while still containing the subject's data. It is detected by Chapter 45's dependency and data-flow auditing extended to trace where classified fields actually flow at runtime, flagging a destination not present in the manifest. It is fixed by registering the copy in the manifest immediately, or eliminating the copy if Chapter 1's IP3 shows it wasn't actually needed.

---

## 12. QUALITY ASSURANCE CHECKLIST

- [ ] Does every schema field carry an explicit privacy classification, per Section 2?
- [ ] Is consent captured specifically, at the moment of collection, with a queryable record per Section 3?
- [ ] Does the deletion mechanism's integration test verify every manifest-registered store is actually cleared? *(Section 8)*
- [ ] Does every Class B integration receive only the classified fields its specific function requires? *(Section 7)*
- [ ] Is disclosure copy externalized and version-tracked per Section 4, reconstructable to what a specific user actually saw?

---

## 13. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP3). Chapter 3 (duplicate-translation prohibition behind Section 5's manifest). Chapter 20 §2 (string externalization behind Section 4). Chapter 23 §5, Chapter 42 §4 (data-minimization and contextual-permission standards Section 7 extends). Chapter 24 (schema discipline behind Section 2). Chapter 25 §7 (the test pattern Section 8 mirrors). Chapter 26 §2 (mandatory-classification pattern mirrored in Section 2). Chapter 43 (the security floor this chapter builds on). Chapter 45 (dependency/data-flow auditing referenced in Section 11). Chapter 49 (quality gates enforcing Section 8). Chapter 59 (incident-response cadence auditing Section 6).

**Within the five documents above this Constitution:** Design System Bible Chapter 46; Brand Identity Manual Chapter 17; UX / Experience Blueprint Chapters 93–99.

---

## 14. FUTURE EXPANSION

**Documented limitations.** Section 5's deletion mechanism depends on Section 2's classification being applied comprehensively and correctly at the schema level; Section 11's anti-pattern names the specific, honest gap this depends on closing — an ongoing discipline, not a one-time guarantee.

---

*End of Chapter 44. The next chapter, Dependency & Supply Chain Security, specifies how the third-party packages this entire codebase depends on are vetted and monitored across the project's lifetime.*
