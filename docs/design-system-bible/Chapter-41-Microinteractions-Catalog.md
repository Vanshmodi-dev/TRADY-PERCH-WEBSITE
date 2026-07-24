# CHAPTER 41 — MICROINTERACTIONS CATALOG

**Trady Perch Design System Bible · Volume III: Interaction & Behavior**

**Inherited From:** Master Vision Chapter 18 (Premium Interaction Library, in full — §18.1–§18.12, the twelve interaction domains that chapter covers for the original homepage). Design System Bible Chapter 1 (P2, P6), Chapter 15 (motion tiers), Chapter 39 (state model), Chapter 40 (animation budget), and every component chapter in Volume II.

---

## 1. INTRODUCTION

Master Vision Chapter 18 specified microinteraction philosophy for twelve homepage-specific domains — Hero, Navigation, Pricing, Testimonials, Timeline, Portfolio, Demo, FAQ, Footer, Search, Tooltips, Touch — written before this Bible's full 22-component Volume II existed. This chapter is where every remaining component (Tables, Dialogs, Drawers, Toasts, Dropdowns, Badges, Avatars, Charts, and the rest) receives the same rigor Master Vision Chapter 18 already gave its original twelve, consolidated into one catalog rather than scattered restatements inside each component chapter.

This chapter depends on Chapter 40's budget and every Volume II component chapter directly — it does not redefine any component's states or timing, only compiles and cross-references the specific microinteraction each one already specified into a single, browsable reference.

---

## 2. PHILOSOPHY

The rejected alternative is leaving each component's microinteraction detail scattered across its own chapter with no consolidated view — technically complete, since every detail already lives somewhere in Volume II, but practically hard to browse for a designer trying to get a holistic sense of "how does this whole system feel to touch." This chapter exists as that consolidated view, adding no new rules, only organizing existing ones for a different kind of reader than a component chapter serves.

---

## 3. CORE PRINCIPLES

### Mi-1 — This Chapter Compiles; It Never Contradicts

**Purpose.** Every entry in this catalog is a direct citation of a rule already established in its source component chapter — this chapter introduces no new timing value, color, or behavior that doesn't already exist elsewhere.

**Reasoning.** Descends from Principle 1: a second, independently-written description of the same interaction risks drifting from its source over time; citing rather than restating keeps the two permanently synchronized by construction, since this chapter has nothing of its own to drift.

**When it applies.** To every entry in this chapter. **When it does not apply.** No exception — any apparent new detail found here that isn't traceable to a source chapter is an error in this chapter, not a legitimate addition, and should be corrected by removing it rather than treated as authoritative.

### Mi-2 — Organized by User Intent, Not by Component Name

**Purpose.** This catalog is organized around what the user is trying to do (confirm a choice, dismiss something, inspect detail) rather than alphabetically by component name, so a designer asking "how should dismissal feel across this whole system" can read one section rather than hunting through twenty chapters.

**Reasoning.** Descends from Principle 2 applied to this chapter's own usability as a reference document — an alphabetical index serves lookup of a known component; an intent-based index serves the more common real question, which starts from a behavior, not a component name.

**When it applies.** To this chapter's structure. **When it does not apply.** No exception.

---

## 4. COMPLETE DESIGN SPECIFICATION — THE CATALOG

**Confirming a choice:** Buttons' Active compression (Chapter 18, Instant tier) → Cards' Active compression (Chapter 19) → Tabs' sliding indicator (Chapter 27, Standard tier) → Segmented control fill (Chapter 27).

**Dismissing something:** Dialogs' three-path dismissal (Chapter 23, Dl-3) → Drawers' edge-return slide (Chapter 24) → Toasts' auto-dismiss and pause-on-hover (Chapter 25, Ts-3) → Tooltips' immediate-on-exit removal (Chapter 30, Tt-2).

**Inspecting detail:** Tooltips' 400ms deliberate delay (Chapter 30) → Charts' immediate-on-hover data point tooltip exception (Chapter 32) → Table row hover elevation (Chapter 22) → Card hover elevation (Chapter 19).

**Waiting for something:** Skeleton pulse (Chapter 31, Sk-2) → Button Loading+Disabled combination (Chapter 39, St-4) → escalating wait messaging (Chapter 31, Sk-3).

**Being told something happened:** Toast entrance (Chapter 25) → inline field validation (Chapter 21, Fm-2) → Badge status color shift (Chapter 33).

**Navigating a sequence:** Timeline connecting-line draw (Chapter 36, Tl-1) → Pagination Load-More append (Chapter 35, Pg-1) → Accordion single-open expand/collapse (Chapter 37, Ac-1).

**Choosing from options:** Dropdown/Menu open-on-click, close-on-select (Chapter 26, Dp-3) → Navigation dropdown hover-open exception (Chapter 20) → Select-input list (Chapter 21/26).

*(This catalog grows as new components are added to Volume II; it is a living index, not a fixed, one-time compilation.)*

---

## 5. MEASUREMENTS

Not applicable independently — every value cited in Section 4 carries its own measurement in its source chapter, per Mi-1.

---

## 6. BEHAVIORAL RULES

**Before adding a new entry.** Confirm the cited behavior already exists, specified, in a source component chapter — this chapter never specifies a behavior for the first time.

**When a source chapter's rule changes.** Update this catalog's citation to match — since this chapter has no independent content, a source-chapter revision should be checked against this catalog's index in the same pass, not as a separate follow-up task easily forgotten.

---

## 7. MOTION SPECIFICATION

Not independently specified — see Chapter 15 and each cited component chapter's own Section 7.

---

## 8. ACCESSIBILITY

Not independently specified — see each cited component chapter's own Section 8; this catalog's only accessibility contribution is making those existing requirements easier to browse by intent.

---

## 9. RESPONSIVE BEHAVIOUR

Not independently specified — see Chapter 8 and each cited component's own Section 9.

---

## 10. AI & FUTURE INTERFACES

This catalog's intent-based organization (Mi-2) is itself a useful model for Chapter 71's future work: an AI-native interface's own interaction catalog should likely be organized by user intent rather than by UI element, for the identical reason this chapter chose that structure — intent is what a user actually has; the underlying component or lack thereof is an implementation detail they don't reason in.

---

## 11. DO / 12. DON'T

**Do:** Consulting this chapter to confirm every "dismiss" interaction across Dialogs, Drawers, Toasts, and Tooltips uses a consistent underlying logic (each dismissing faster/quieter than it appeared, per Chapter 15's asymmetry) before shipping a new dismissible component. **Don't:** Adding a new timing value directly into this catalog because "it's just a quick note," without first establishing it properly in the relevant component chapter — this violates Mi-1 and creates exactly the drift risk this chapter's own structure is designed to prevent.

---

## 13. ANTI-PATTERNS

**Catalog drift.** Allowing this chapter's citations to fall out of sync with their source chapters after a source chapter is later revised. This is detected by periodically re-verifying every citation in Section 4 against its current source chapter, and fixed by updating the citation or, if the source rule itself changed meaningfully, noting the change here as part of that same revision.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does every entry in this catalog cite a rule that actually exists, unmodified, in its source chapter? *(Mi-1)*
- [ ] Is the catalog organized by user intent rather than alphabetically by component? *(Mi-2)*
- [ ] Has this catalog been checked for drift since the last revision of any cited source chapter?

---

## 15. CROSS REFERENCES

Every chapter cited in Section 4. Chapter 1 (P1, P2, P6). Chapter 15 (motion tiers underlying every entry). Chapter 39 (state model underlying every entry). Chapter 40 (the budget every entry operates within). Master Vision Chapter 18, in full.

---

## 16. FUTURE EXPANSION

This chapter is explicitly designed to grow as new components are added — each new Volume II component chapter should add its own entry to the appropriate intent category here as part of its own publication, not as a separate follow-up task.

---

*End of Chapter 41. The next chapter, per the authoring sequence, is Keyboard Interaction Standards.*
