# CHAPTER 56 — UX WRITING & MICROCOPY SYSTEM

**Trady Perch Design System Bible · Volume V: Content & Communication**

**Inherited From:** Master Vision Chapter 16 (Copywriting Guidelines, in full). Design System Bible Chapter 1 (P1, P4), Chapter 18 (button labels), Chapter 21 (form copy), Chapter 23 (dialog confirmation copy), Chapter 39 (state model, error/success copy), Chapter 47 (error copy structure).

---

## 1. INTRODUCTION

Master Vision Chapter 16 defines the brand's voice at the level of headlines and section copy. It does not, on its own, produce a consistent voice at the level of a "Save changes" button versus a "Confirm" button, or a validation error's exact phrasing. This chapter extends that voice down to the shortest, most frequent strings in the system.

This chapter depends on Master Vision Chapter 16 completely and Chapter 47's error-copy structure directly. It is depended on by Chapter 57 (Data Formatting) and Chapter 58 (Notification Content Standards).

---

## 2. PHILOSOPHY

The rejected alternative is assuming brand voice, once defined for headlines, will naturally extend to interface microcopy without separate specification. This was rejected because microcopy is written by many more people, many more times, than headline copy — a button label is written every time a new feature ships, by whoever happens to be building it, and without an explicit microcopy standard, that frequency guarantees drift long before any headline-level inconsistency would ever surface.

---

## 3. CORE PRINCIPLES

### Uw-1 — Every String Passes the Skeptical-CEO Test

**Purpose.** Every interface string, however short, is checked against Master Vision §16.1's test: would a skeptical, busy CEO find it worth their time, or skim past it as filler? A string that could be deleted with no loss of meaning is deleted.

**Reasoning.** Direct restatement of Master Vision §16.1, extended from body copy to the shortest strings in the system, where the temptation to add unnecessary words ("Great, thanks! Your changes have been successfully saved.") is often greater precisely because the string feels too small to warrant the same scrutiny as a headline.

**Examples.** "Changes saved." — passes. "Great, thanks! Your changes have been successfully saved to our system." — fails; every added word beyond "Changes saved" is filler.

**When it applies.** To every interface string. **When it does not apply.** No exception.

### Uw-2 — Button Labels Are Verbs, Never Nouns

**Purpose.** Every button label is an imperative verb phrase describing the action it performs — "Save," "Delete," "Book a Strategy Call" — never a noun describing the button's category, like "Submission" or "Confirmation."

**Reasoning.** Descends from Principle 2: a verb label states exactly what will happen on click; a noun label requires the user to infer the action from context, adding unnecessary interpretive work to the system's most frequent interactive moment.

**Examples.** "Delete case study" (verb phrase, specific). Never "Deletion" or generic "Confirm" where a more specific verb phrase is available and clearer.

**When it applies.** To every button label in the system. **When it does not apply.** No exception.

### Uw-3 — Placeholder Text Never Carries Instruction Alone

**Purpose.** Placeholder text inside an input (Chapter 21) shows a format example only — any actual instruction the user needs lives in the persistent Label or Helper Text, never solely in the placeholder, which disappears from view the moment the field is populated in most implementations and is invisible to assistive technology by default in many others.

**Reasoning.** Direct extension of Chapter 21's Fm-1 to copy specifically: a placeholder reading "Enter your work email so we can verify your company" is carrying essential instruction in a channel Fm-1 already identifies as unreliable — that instruction belongs in persistent Helper Text instead, with the placeholder reduced to a bare format example ("you@company.com").

**When it applies.** To every placeholder string. **When it does not apply.** No exception.

### Uw-4 — Confirmation Copy States the Specific Consequence, Never a Generic Question

**Purpose.** A confirmation dialog's body copy (Chapter 23) names the specific, concrete consequence of proceeding — "This will permanently delete the Northwind Logistics case study" — never a generic "Are you sure?" with no stated consequence.

**Reasoning.** Descends from Principle 1 and Master Vision Chapter 4's emotional-debt reasoning: a generic confirmation forces the user to already remember what they're confirming, which is an unnecessary cognitive tax at exactly the moment — often a destructive action — where clarity matters most.

**Examples.** "This will permanently delete the Northwind Logistics case study. This cannot be undone." Never: "Are you sure?"

**When it applies.** To every confirmation dialog. **When it does not apply.** No exception.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Button label grammar (Uw-2):** verb + object, imperative mood, no trailing punctuation. **Placeholder grammar (Uw-3):** format example only, no imperative sentence. **Confirmation grammar (Uw-4):** stated consequence (what will happen) + reversibility note (can/cannot be undone).

---

## 5. MEASUREMENTS

Maximum button label length: approximately four words. Maximum confirmation body copy: two short sentences (consequence + reversibility).

---

## 6. BEHAVIORAL RULES

**Before finalizing any button label.** Verify it is a verb phrase per Uw-2. **Before finalizing any confirmation dialog.** Verify its copy states the specific consequence per Uw-4, not a generic question.

---

## 7–9. MOTION / ACCESSIBILITY / RESPONSIVE

Not independently specified — see each consuming component chapter's own sections. This chapter's contribution is content, not visual or behavioral specification.

---

## 10. AI & FUTURE INTERFACES

Master Vision Chapter 19's AI Personality Constitution already governs the AI's own generated text at a deeper level than this chapter addresses; this chapter's Uw-1 through Uw-4 apply directly to the *surrounding* interface copy (Chapter 45's Cp-4), ensuring no tonal seam between what the AI says and what the interface around it says.

---

## 11. DO / 12. DON'T

**Do:** "Delete case study" as a button label, paired with a confirmation reading "This will permanently delete the Northwind Logistics case study. This cannot be undone." **Don't:** A button labeled "Confirmation" opening a dialog that asks only "Are you sure?" — fails Uw-2 and Uw-4 simultaneously.

---

## 13. ANTI-PATTERNS

**Padded politeness.** Adding pleasantries ("Great!," "Awesome!," "Thanks so much!") to interface copy under the assumption that warmth requires extra words. This is dangerous because it directly contradicts Master Vision §2.2's composed register at the exact micro-level where consistency is hardest to enforce and most frequently violated by well-meaning contributors. It is detected by auditing any interface string for words that could be removed without losing meaning, per Uw-1, and fixed by removing them.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does every string pass the skeptical-CEO test, with no removable filler? *(Uw-1)*
- [ ] Is every button label a verb phrase, never a noun? *(Uw-2)*
- [ ] Does placeholder text carry only a format example, with real instruction in persistent Helper Text? *(Uw-3)*
- [ ] Does every confirmation state the specific consequence and reversibility? *(Uw-4)*

---

## 15. CROSS REFERENCES

Chapter 1 (P1, P4). Chapter 18 (button labels). Chapter 21 (Fm-1, placeholder discipline). Chapter 23 (confirmation copy). Chapter 39 (state copy). Chapter 45 (Cp-4, AI-surrounding copy). Chapter 47 (error copy structure). Chapter 57, 58 (direct dependents). Master Vision Chapter 16, §2.2.

---

## 16. FUTURE EXPANSION

No open questions currently identified.

---

*End of Chapter 56. The next chapter, per the authoring sequence, is Data, Number & Unit Formatting Standards.*
