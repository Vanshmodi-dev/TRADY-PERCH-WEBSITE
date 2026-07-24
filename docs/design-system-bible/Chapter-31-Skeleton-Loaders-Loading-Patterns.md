# CHAPTER 31 — SKELETON LOADERS & LOADING PATTERNS

**Trady Perch Design System Bible · Volume II: Components**
*First-canonical-draft.*

**Inherited From:** Master Vision §17.5 (Loading states — "never a generic spinner divorced from brand"), §18.7 (Interactive Demo, its "thinking" state). Design System Bible Chapter 1 (P1, P7), Chapter 3 (color), Chapter 15 (motion, the Loading tier's looping treatment), Chapter 39 (state model, Loading).

---

## 1. INTRODUCTION

Chapter 39 already defined Loading's motion treatment in the abstract — a slow, looping, Standard-tier pulse. This chapter is where that abstract treatment becomes a concrete, content-shaped component, referenced already by Chapters 22 and 29 as the specific mechanism behind their own Loading states.

This chapter depends on Chapter 39 directly and completely — it does not redefine Loading's timing, only its visual shape. It is depended on by every component chapter with asynchronous content: Chapters 19, 22, and 29 at minimum.

---

## 2. PHILOSOPHY

The rejected alternative is a generic, content-agnostic spinner — a single rotating icon shown regardless of what's loading beneath it. Master Vision §17.5 already rejects this directly. What replaces it is a skeleton shaped to the actual content it anticipates, so the loading moment itself previews the coming layout rather than obscuring it behind an unrelated abstraction.

---

## 3. CORE PRINCIPLES

### Sk-1 — Skeleton Shape Matches the Real Content's Proportions

**Purpose.** A skeleton loader's placeholder shapes (blocks, lines) match the actual dimensions and layout of the content they anticipate — a card's skeleton has a skeleton image region, title-width line, and body-width lines in the same positions the real card's anatomy will occupy.

**Reasoning.** Direct extension of Master Vision §17.5's brand-consistency requirement and Principle 1: a skeleton bearing no relationship to the real content it precedes is barely better than a generic spinner, since it gives the user no accurate preview of what's coming.

**When it applies.** To every skeleton loader. **When it does not apply.** No exception.

### Sk-2 — The Pulse Is the System's One Loading Signature, Never a Spinner

**Purpose.** Every loading indication in the system uses the same slow, looping opacity pulse (Chapter 39, Chapter 15) — never a rotating spinner icon, regardless of context.

**Reasoning.** Direct restatement of Master Vision §17.5, and an application of Principle 7: one loading signature, reused everywhere, is what makes "the system is thinking" instantly recognizable regardless of which component is loading.

**When it applies.** To every loading state in the system, inline or full-region. **When it does not apply.** No exception.

### Sk-3 — Extended Waits Escalate Their Messaging, Never Loop Silently Forever

**Purpose.** A loading state exceeding roughly 8 seconds adds a brief text message ("Still working on it...") alongside the pulse; a wait exceeding roughly 20 seconds offers a way to cancel or retry.

**Reasoning.** Descends from Master Vision §2.2's composure: a user watching an unexplained pulse indefinitely, with no escalating acknowledgment that the wait is unusual, reasonably begins to suspect the system has failed silently — a calm, honest acknowledgment at defined thresholds is more reassuring than silence, not less.

**When it applies.** To any loading state whose duration is unpredictable or potentially long. **When it does not apply.** To brief, reliably-fast loads (under 2 seconds) where escalation thresholds will essentially never be reached and needn't be implemented with the same rigor.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Anatomy** (per An-1): Placeholder Shapes (matching real content's regions, per Sk-1) → Pulse Animation (Chapter 15's Standard-tier loop) → conditional Escalation Message (Sk-3, appearing only past its time threshold).

**Token consumption:** `semantic.color.surface.card` at a slightly lifted opacity step for the placeholder shapes themselves, pulsing between two opacity values using Chapter 15's Standard-tier duration.

---

## 5. MEASUREMENTS

Pulse cycle duration: Chapter 15's Standard tier (300ms per half-cycle, looping). Escalation thresholds: 8 seconds (message appears), 20 seconds (cancel/retry action appears).

---

## 6. STATE COVERAGE (per An-3)

This component *is* the Loading state's visual implementation; its own "state coverage" is trivial — it exists only while Loading is active and is removed the moment content resolves into its final, populated state (or an Error state, Chapter 3 C-4, if the load fails).

---

## 7. MOTION SPECIFICATION

The pulse cycles continuously between two opacity values (approximately 100% and 60%) at Chapter 15's Standard-tier duration per half-cycle, using a smooth, symmetric easing (unlike most of this system's asymmetric entrance/exit curves, since a continuous loop has no directional "entrance" or "exit" to be asymmetric between).

---

## 8. ACCESSIBILITY

The loading region is announced to assistive technology as busy/loading, with the escalation message (Sk-3) also announced when it appears, so a screen-reader user receives the same "this is taking longer than usual" acknowledgment a sighted user sees visually.

---

## 9. RESPONSIVE BEHAVIOUR

Skeleton shapes resize to match their real content's responsive layout at every breakpoint (Chapter 8) — a card skeleton at Mobile matches the Mobile-collapsed card layout, not a scaled-down version of the Desktop skeleton.

---

## 10. AI & FUTURE INTERFACES

A voice interface's "thinking" equivalent (Master Vision §18.7's Interactive Demo reasoning, extended) is a brief acknowledgment tone or measured pause rather than silence, with Sk-3's escalation logic translating directly to a spoken "still working on that" past a similar threshold.

---

## 11. DO / 12. DON'T

**Do:** A case-study grid showing skeleton cards with image, title, and body-line placeholders in the exact positions real cards will occupy, pulsing gently while data loads. **Don't:** A single centered spinning icon shown in place of the entire grid while data loads — replace with Sk-1's content-shaped skeleton.

---

## 13. ANTI-PATTERNS

**Generic spinner fallback.** Reaching for a default framework spinner component "just for this one loading case" because building a proper skeleton felt like extra work for a minor moment. This is detected by auditing the codebase for any rotating-icon loading indicator, and fixed by replacing it with a content-shaped skeleton per Sk-1.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does the skeleton's shape match the real content's actual proportions and layout? *(Sk-1)*
- [ ] Does every loading state use the same pulse treatment, with no spinner anywhere in the system? *(Sk-2)*
- [ ] Does an extended wait escalate its messaging at the defined thresholds? *(Sk-3)*

---

## 15. CROSS REFERENCES

Chapter 1 (P1, P7). Chapter 3 (color). Chapter 15 (motion, Standard tier). Chapter 17 (anatomy standard). Chapter 19, 22, 29 (primary consumers). Chapter 39 (state model, Loading). Master Vision §17.5, §18.7.

---

## 16. FUTURE EXPANSION

Escalation thresholds (Section 5) are this chapter's first-canonical proposal and should be tuned against real network performance data once available.

---

*End of Chapter 31. The next chapter, per the authoring sequence, is Animation Governance & Rules (Chapter 40), followed by the remaining Volume II components.*
