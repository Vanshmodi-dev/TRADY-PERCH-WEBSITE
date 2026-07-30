# CHAPTER 26 — CURSOR PHILOSOPHY

**Trady Perch Hero Experience Bible · Part VII: Behaviour & Response**
*First-canonical-draft. Implementation-independent.*

**Inherited From:** Design System Bible Ch. 44 (Cursor & Pointer Behavior), Ch. 39 (state model). UX Blueprint Ch. 88 (curb-cut principle). Hero Experience Bible Ch. 7, 21, 25.
**Governs:** The cursor's behaviour in the hero and the standard any change to it must meet.
**Does Not Govern:** Pointer-device interaction generally (Ch. 25) or touch (Ch. 31).

---

## 1. THE POSITION

**The cursor is the visitor's body on the page.**

Not a decorative metaphor — the operating fact behind every rule here. The pointer is the only part of the interface the visitor *owns*. Its position is their attention, its movement is their intention, and its appearance is the system's continuous statement about what is possible at that location. It is also an element they brought with them: it existed before the page loaded, it is consistent across every application they use, and its behaviour is deeply learned.

Modifying it is therefore a larger act than it appears. A custom cursor is not a styling choice at the level of a button colour; it is a change to the visitor's own instrument, made without asking, on a site they have known for four seconds.

**The governing posture: the hero's cursor is the system cursor, changed only to communicate what is operable.**

**The cursor's one job.** It communicates affordance. Its standard vocabulary — arrow, hand, I-beam, and a small set of others — is understood universally and requires zero processing. That makes it the cheapest information channel on the page: no space, no load budget, no attention, no motion budget. It is also the only channel reporting continuously and privately. Ix-2 established that only operable things respond; the cursor is how that rule is *communicated*. A hero where the cursor changes exactly at the boundaries of operable elements has taught its entire interaction model without a word.

**Why custom cursors fail here specifically.** Replacing the system pointer with a dot, ring, blended circle, or trailing element is a recognised device in the design-forward corner of the web. Forbidden here, for compounding reasons:

- **They break a learned convention for no informational gain.** A dot conveys the same nothing with more novelty.
- **They are almost always laggy.** Drawn by the page, not the compositor, so they trail the real pointer by at least a frame — the visitor experiences their own hand as delayed, the most direct way to read as poorly built.
- **They capture attention permanently.** They move whenever the visitor moves, which is continuously — At-2 governs, and the claim never holds Rung 1.
- **They are visible effort in its purest form**, answering Test 1's question with a yes at every moment of the visit.
- **They read as playful or performative** — both explicitly forbidden registers.
- **They exclude.** Invisible to touch and keyboard visitors; may conflict with high-contrast or magnification tools; genuinely disorienting for some motor or visual differences. The curb-cut principle runs in reverse: a change serving nobody's access and degrading several people's.

**Cursor-driven effects are motion, not cursor design.** A more tempting category: leaving the cursor alone but letting the *hero* react to its position — a light following the pointer, a subtle parallax, a magnetic pull on the CTA, a spotlight revealing texture. **These are continuous motion with a pointer trigger**, routing to Chapter 21 before this chapter, where they fail Mo-2 (never resolves), Mo-1 (no diegetic answer beyond atmosphere), At-2, and Ix-2. The routing matters because they are usually proposed as *subtle* — and subtlety is an argument about visual amplitude, which is not the axis on which they fail. A barely-visible effect running whenever the mouse moves has the same attentional cost as a prominent one, because attention responds to motion rather than magnitude.

---

## 2. CORE PRINCIPLES

**Cu-1 — The system cursor is the default and the expectation.** The hero uses the operating system's own cursor, unmodified in appearance. *A prohibition on replacement, not on the standard affordance changes below.*

**Cu-2 — The cursor changes only to communicate affordance.** Appearance changes exactly at the boundary of what is operable, using the conventional vocabulary, and nowhere else. Precision matters in both directions: a pointer cursor over a non-interactive element is a false affordance (Cg-4); a default cursor over an interactive one is a missed affordance. *Most of this is achieved by using correct semantic elements and not overriding what the browser already does.*

**Cu-3 — No cursor-driven continuous effect.** Nothing in the hero animates in response to pointer position — backgrounds, materials, lighting, the CTA, anything. *Exception: discrete hover states on operable elements, triggered by the pointer* entering *an element rather than driven by its continuous position, and which resolve to a stable state. The distinction is discrete versus continuous: a hover state settles and stops; a cursor-driven effect never does.*

**Cu-4 — Cursor meaning must have a non-pointer equivalent.** Anything the cursor communicates must also reach keyboard and touch visitors by other means. A meaningful share of visitors never see a cursor at all; if the only signal that an element is operable is a cursor change, that element is invisible as a control to everyone on a touchscreen and everyone navigating by keyboard. *The equivalent is ordinary: an element that looks operable, has a visible focus state, and has an adequate touch target.*

**Cu-5 — The pointer is never captured or constrained.** The hero never locks, warps, magnetises, or constrains the pointer. Magnetic buttons pulling the cursor toward them are the most common instance — a small, deliberate removal of the visitor's motor control, charming once and interfering with precision permanently. For a visitor with a motor impairment, a magnetic target that moves the pointer is actively harmful. *Not a ban on generous hit areas: a larger hit area enlarges the* target*, which is the opposite of moving the* pointer*.*

---

## 3. THE CURSOR DECISION TABLE

| Situation | Correct cursor | Why |
|---|---|---|
| Over background, material, or any non-operable element | Default arrow | Nothing is operable here — and saying so is information |
| Over the primary CTA | Pointer (hand) | Standard affordance for an action |
| Over a navigation link | Pointer (hand) | Standard affordance |
| Over the skip control | Pointer (hand) | An operable control, not a hint |
| Over hero text | I-beam where selectable | Selectable text is a real affordance; suppressing selection is a hostile default |
| Over a disabled control (if one existed) | `not-allowed`, per system convention | Nav items are removed rather than disabled |
| While an action is genuinely pending | Standard progress cursor | Never a fabricated wait (Ac-3) |
| Anywhere, as a custom shape | **Never** | Cu-1 |

**On text selection.** Suppressing selection across the hero — a common measure to make a page feel more "app-like" — removes a genuine capability (copying the claim to send to a colleague) from the exact visitor Chapter 13 identifies as most valuable: the one forwarding the site to a decision-maker. It also feels subtly wrong to anyone who tries. Leave selection alone.

---

## 4. THE CUSTOM-CURSOR PROPOSAL GATE

Because the proposal recurs, and always arrives with a strong visual reference from a respected site.

```
  PROPOSAL: replace or augment the system cursor
     │
     ├─ Does it communicate information the standard cursor cannot?
     │     NO ──► reject (Cu-1, Cu-2)
     │     YES ▼
     ├─ Does it track pointer position continuously?
     │     YES ─► route to Ch. 21; fails Mo-1, Mo-2, At-2 ──► reject
     │     NO  ▼
     ├─ Is it perceptible to touch and keyboard visitors?
     │     NO ──► reject (Cu-4, Fs-3)
     │     YES ▼
     ├─ Does it render without lag on target hardware, always?
     │     NO ──► reject (Ix-1, Mo-5)
     │     YES ▼
     └─ Does it survive Test 1?          FAILS ──► reject
```

**Expected outcome: rejection at gate 1**, in every case encountered so far. Documented anyway, because a rejection with a recorded reason prevents the proposal returning quarterly, and because writing down *why* a well-executed idea from a respected site does not transfer is more useful than declining it by preference.

---

## 5. DO / DON'T

**Do.** Let the cursor do its ordinary job precisely — pointer exactly on the operable elements, arrow everywhere else, selection left alone. Precise cursor behaviour is a genuine craft signal that costs nothing, requires no custom code, works identically on every device and assistive technology, and is noticed by exactly the technically literate visitor whose judgment matters most. It is also, unlike almost every alternative here, free.

**Don't.** Add a magnetic effect to the primary CTA. It is the most charming item on the forbidden list and the most damaging: it violates the visitor's motor control (Cu-5), it is continuous pointer-driven motion (Cu-3), it makes the CTA harder to hit precisely for anyone with a tremor or reduced dexterity, and it draws attention to the button in a way that inverts the saliency ladder — the CTA is Rung 2, and a magnetic CTA behaves like Rung 1 whenever the pointer is nearby.

---

## 6. ANTI-PATTERNS

**The reference-site proposal.** A custom cursor proposed with a link to a respected agency or portfolio site. Detected trivially; resisted with difficulty, because the reference genuinely looks good. The response is §4's gate — those sites are frequently selling design itself, where visible design effort is the product. Here it is a counter-signal.

**False affordance by cursor.** A pointer cursor applied to a non-interactive element to make the hero feel "more interactive." Detected by clicking everything that shows a hand. Fixed by Cu-2 — this is Cg-4 delivered through the cheapest possible channel.

**Selection suppression.** `user-select: none` applied across the hero for a more app-like feel. Detected by trying to select the claim. It costs the forwarding visitor a real capability and buys nothing.

**Effect-by-another-name.** A cursor-driven effect proposed as a "material response" or "lighting response" rather than as motion. Detected by asking whether it runs continuously while the pointer moves; if yes, it routes to Chapter 21 regardless of what it is called.

---

## 7. ACCEPTANCE CRITERIA

- [ ] The system cursor is unmodified in appearance. *(Cu-1)*
- [ ] Cursor changes occur exactly at operable boundaries, and nowhere else. *(Cu-2)*
- [ ] Nothing animates in response to pointer position. *(Cu-3)*
- [ ] Every affordance the cursor signals is also signalled to keyboard and touch visitors. *(Cu-4)*
- [ ] The pointer is never locked, warped, magnetised, or constrained. *(Cu-5)*
- [ ] Text selection is available on hero copy. *(§3)*
- [ ] Every element showing a pointer cursor is genuinely operable, verified by clicking. *(§6)*
- [ ] Any custom-cursor proposal has a recorded gate result. *(§4)*

---

## 8. CROSS REFERENCES

Ch. 2 (Test 1; Hp-6) · Ch. 4 (Cg-4) · Ch. 7 (At-2) · Ch. 13 (the forwarding visitor) · Ch. 21 (Mo-1, Mo-2, Mo-5) · Ch. 25 (Ix-1, Ix-2, Ix-5) · Ch. 28 (Cu-4's obligations in full) · Ch. 31. Design System Bible Ch. 39, Ch. 44. UX Blueprint Ch. 88.

---

## 9. STATUS

This chapter's rules are consistent with Design System Bible Ch. 44 and add hero-specific reasoning rather than new constraints. §4's gate is this Bible's own instrument, written because the proposal is recurrent and because a reasoned rejection is more durable than a preference.

**Open question.** Fine-pointer versus coarse-pointer environments are treated here as a binary (cursor present or absent). Hybrid devices — a touchscreen laptop, a tablet with a trackpad — genuinely have both, sometimes alternating within one session. Cu-4 is written to be safe under that ambiguity by requiring non-pointer equivalents unconditionally, which is the correct conservative answer, but the source documents do not address hybrid input directly and DSB Ch. 43's touch standards were not written with alternation in mind.

---

*End of Chapter 26. Chapter 27 addresses the one element in the hero that asks for something.*
