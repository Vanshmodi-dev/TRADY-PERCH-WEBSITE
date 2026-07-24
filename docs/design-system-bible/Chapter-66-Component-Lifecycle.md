# CHAPTER 66 — COMPONENT LIFECYCLE

**Trady Perch Design System Bible · Volume VI: Quality, Governance & Evolution**

**Inherited From:** Design System Bible Chapter 2, §4 (the Proposed→Retired token lifecycle this chapter generalizes to full components), Chapter 63, N-3 (names never reused), Chapter 65 (approval gates by tier).

---

## 1. INTRODUCTION

Chapter 2 introduced a five-state lifecycle for tokens — the simplest artifact in the system — specifically because tokens were the correct place to prove the model works before asking it to govern something as complex as a Dialog. This chapter is where that proof pays off: the identical five-state model, generalized to full components, with the criteria for moving between states now given complete treatment.

This chapter depends on Chapter 2's lifecycle model directly and Chapter 65's tiered approval gates. It is depended on by Chapter 69 (Design Debt Register) and Chapter 70 (Component Evolution & Case Studies).

---

## 2. PHILOSOPHY

The rejected alternative is defining a bespoke, component-specific lifecycle model independent of Chapter 2's already-proven one, on the theory that a full component (with anatomy, states, and variants) is different enough from a single token to need its own governance shape. This was rejected on Principle 7 grounds: nothing about a component's added complexity actually requires a different *lifecycle shape* — Proposed, Draft, Stable, Deprecated, Retired describes any artifact's maturity arc equally well regardless of how complex the artifact itself is.

---

## 3. CORE PRINCIPLES

### Lc-1 — Five States, Identical to Chapter 2's Token Model

**Purpose.** Every component moves through exactly the same five states Chapter 2 defines for tokens: Proposed (documented, not yet approved), Draft (approved, not yet battle-tested), Stable (in general use, fully trusted), Deprecated (marked for removal, still available), Retired (removed).

**Reasoning.** Direct reuse of Chapter 2's model, per Principle 7 — the exact reasoning stated in this chapter's introduction.

**When it applies.** To every component in Volume II. **When it does not apply.** No exception.

### Lc-2 — Deprecation Always Names a Successor or an Explicit Removal Reason

**Purpose.** A component entering Deprecated state is accompanied by either a named successor component consumers should migrate to, or an explicit statement that the component is being removed with no replacement and why.

**Reasoning.** Descends from Principle 1: a deprecation with no stated path forward leaves every consumer independently guessing what to do next, exactly the cost Chapter 64's Vs-2 migration-guide requirement exists to prevent at the version level, now applied at the individual-component level.

**When it applies.** To every component deprecation. **When it does not apply.** No exception.

### Lc-3 — A Retired Component's Name Is Never Reassigned

**Purpose.** Once a component is Retired, its name is never reused for a new, unrelated component.

**Reasoning.** Direct restatement of Chapter 63's N-3, generalized from tokens to full components.

**When it applies.** To every retired component name. **When it does not apply.** No exception.

---

## 4. COMPLETE DESIGN SPECIFICATION

**State transition criteria:** Proposed → Draft requires Chapter 65's appropriate-tier approval (Gov-4). Draft → Stable requires surviving one full release cycle in production use without requiring correction (matching Chapter 2's identical token criterion). Stable → Deprecated requires Lc-2's successor-or-reason statement. Deprecated → Retired requires a defined grace period (matching Chapter 2's T-5, no fewer than one release cycle) during which the component remains functional but flagged.

---

## 5. MEASUREMENTS

Lifecycle states: 5 (Lc-1). Minimum Draft→Stable duration: one full release cycle. Minimum Deprecated grace period: one full release cycle (Chapter 2, T-5).

---

## 6. BEHAVIORAL RULES

**Before deprecating any component.** State its successor or removal reason per Lc-2. **Before retiring any component's name.** Confirm no future reuse is planned, per Lc-3, permanently.

---

## 7–10. MOTION / ACCESSIBILITY / RESPONSIVE / AI

Not applicable — this chapter governs component governance process, not a visual or platform category.

---

## 11. DO / 12. DON'T

**Do:** Deprecating an early Dropdown variant in favor of Chapter 26's more complete specification, explicitly naming that chapter as the successor and giving consumers a full release cycle to migrate. **Don't:** Silently removing a component with no deprecation period or stated successor, breaking any surface still referencing it without warning.

---

## 13. ANTI-PATTERNS

**Silent retirement.** Removing a component directly from Stable to gone, skipping the Deprecated grace period entirely. This mirrors Chapter 2's "silent breaking deprecation" anti-pattern exactly, generalized to full components — it is detected and fixed the same way, by enforcing the grace period per Lc-1's five-state model without exception.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Is this component in one of exactly five defined lifecycle states? *(Lc-1)*
- [ ] Does its deprecation (if applicable) name a successor or explicit reason? *(Lc-2)*
- [ ] If retired, has its name been permanently retired from reuse? *(Lc-3)*

---

## 15. CROSS REFERENCES

Chapter 2 (§4, the model this chapter generalizes). Chapter 63 (N-3). Chapter 64 (Vs-2, migration guide parallel). Chapter 65 (approval gates). Chapter 69 (design debt, direct dependent). Chapter 70 (evolution case studies, direct dependent).

---

## 16. FUTURE EXPANSION

No open questions currently identified.

---

*End of Chapter 66. The next chapter, per the authoring sequence, is Contribution Guidelines.*
