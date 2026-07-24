# CHAPTER 58 — NOTIFICATION & ALERT CONTENT STANDARDS

**Trady Perch Design System Bible · Volume V: Content & Communication**

**Inherited From:** Master Vision §5.5 (Why Urgency Is Forbidden), §11.3 (Trust Architecture). Design System Bible Chapter 1 (P4), Chapter 25 (Toasts, visual counterpart), Chapter 56 (UX Writing System).

---

## 1. INTRODUCTION

Chapter 25 specified a Toast's visual treatment; this chapter specifies what a notification is actually allowed to *say* — a content category structurally tempted toward urgency language by default marketing-automation tooling, which ships with templates written for products that have no anti-urgency doctrine to defend against.

This chapter depends on Master Vision §5.5 directly and Chapter 56's microcopy standard. It is depended on by any future email or push-notification system the brand builds.

---

## 2. PHILOSOPHY

The rejected alternative is adopting whatever notification copy convention a marketing-automation or push-notification platform's templates default to — urgency framing ("Don't miss this!"), artificial scarcity ("Only 2 spots left!"), engagement-bait phrasing ("You won't believe what just happened!"). This was rejected because these conventions exist specifically to compensate for low intrinsic interest in low-consideration products, and applying them to Trady Perch's considered, high-trust context would directly violate Master Vision §5.5 at exactly the automated, high-frequency surface most likely to ship on autopilot without individual review.

---

## 3. CORE PRINCIPLES

### Nt-1 — Notifications State a Fact; They Never Manufacture Urgency

**Purpose.** Every notification states what happened or what is available, plainly — never using urgency language, artificial scarcity, or engagement-bait phrasing to compel a click.

**Reasoning.** Direct restatement of Master Vision §5.5, applied specifically to the content category most structurally tempted to violate it by default tooling conventions.

**Examples.** "Your automation audit is ready to view." Never: "🚨 Don't miss your results — view now before they expire!"

**When it applies.** To every notification, email, or push message. **When it does not apply.** No exception.

### Nt-2 — Proof Is Distributed, Never Concentrated Into a Single Notification Blast

**Purpose.** Trust-building content (a new case study, a client result) is communicated through ordinary, calm notification copy — never packaged with the concentrated enthusiasm of a marketing "big announcement" blast.

**Reasoning.** Direct extension of Master Vision §11.3's "distributed, not concentrated" trust architecture to notification cadence and tone specifically.

**When it applies.** To every proof-related notification. **When it does not apply.** No exception.

### Nt-3 — Every Notification States What Happens Next, Not Only What Happened

**Purpose.** A notification includes the next available action where one exists, following Chapter 56's Uw-2 verb-label discipline — never leaving the recipient informed but with no clear path forward.

**Reasoning.** Descends from Principle 4 applied constructively, matching Chapter 38's Em-2 next-action principle for empty states.

**When it applies.** Wherever a genuine next action exists. **When it does not apply.** To a purely informational notification with no actionable follow-up.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Notification structure:** Fact stated plainly (Nt-1) → optional next action, verb-labeled per Chapter 56 (Nt-3). **Forbidden language:** urgency framing, artificial scarcity, exclamation marks, emoji — matching Chapter 19's (Master Vision) AI voice restrictions extended to all notification copy, human- or system-authored alike.

---

## 5. MEASUREMENTS

Maximum notification length: one to two short sentences, matching Chapter 56's brevity standard.

---

## 6. BEHAVIORAL RULES

**Before shipping any notification template.** Audit it against Nt-1's forbidden-language list directly, especially where a third-party tool's default template is the starting point.

---

## 7–9. MOTION / ACCESSIBILITY / RESPONSIVE

Not independently specified — see Chapter 25 for the visual/behavioral Toast specification this chapter's content rules apply within.

---

## 10. AI & FUTURE INTERFACES

Master Vision §19.4's AI closing-style guidance ("a clear, low-pressure next step... rather than a hard sales push") is this chapter's direct precedent, now generalized to every notification in the system, not only AI-generated ones.

---

## 11. DO / 12. DON'T

**Do:** "Your case study library has 3 new entries. View them." **Don't:** "🎉 BIG NEWS! You have to see our latest case studies — click now!!" — violates Nt-1 outright.

---

## 13. ANTI-PATTERNS

**Template default inheritance.** Shipping a marketing-automation platform's default notification copy unmodified, because rewriting every template felt like unnecessary effort. This is detected by auditing shipped notification copy against Nt-1's forbidden list, and fixed by rewriting to this chapter's standard.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does the notification state a fact plainly, with no urgency or scarcity language? *(Nt-1)*
- [ ] Is proof-related content communicated calmly, never as a concentrated marketing blast? *(Nt-2)*
- [ ] Does the notification include a next action where one genuinely exists? *(Nt-3)*

---

## 15. CROSS REFERENCES

Chapter 1 (P4). Chapter 25 (Toast visual counterpart). Chapter 38 (Em-2 parallel). Chapter 56 (microcopy standard). Master Vision §5.5, §11.3, §19.4.

---

## 16. FUTURE EXPANSION

No open questions currently identified.

---

*End of Chapter 58. The next chapter, per the authoring sequence, is Documentation & Help Content Design.*
