# CHAPTER 21 — MOTION PHILOSOPHY

**Trady Perch Hero Experience Bible · Part VI: The Sensory Language**
*First-canonical-draft. Implementation-independent.*

**Inherited From:** Master Vision Ch. 9, Ch. 10, §9.2, §9.5, Ch. 23. Design System Bible Ch. 15 (Mt-1–Mt-4), Ch. 40 (Ag-1–Ag-4).
**Governs:** Why the hero moves at all, what its motion must mean, how its budget is spent.
**Does Not Govern:** Durations, curves, permitted properties, or stagger values. Every number here is inherited and cited.

---

## 1. THE POSITION

**The hero's motion budget is almost entirely pre-spent by inherited rules, and the spending is already justified.**

The Ceremonial tier — 1200ms with its own easing curve — exists exclusively for the intro (Mt-3, stated absolutely: no other component, feature, or "particularly important" moment may use it, ever). The intro's metallic reflection sweep is the *only* named exception to the six-permitted-properties rule in the entire system (Ag-1). Both extraordinary allowances live in the hero, and both are allocated.

**So the hero has already received the system's two largest motion concessions, and has approximately nothing left.**

**Motion is read as intent, always.** Leaving it ungoverned is not neutral. Motion is the first channel perceived and the strongest attention capture available, which means **the hero's motion is the first statement the company makes about itself, made before any word is read.** A jittery entrance says something specific; a generous deceleration says something else; a looping ambient effect says a third thing. None is optional — the only choice is whether it was chosen.

**Composure is legible in timing.** The Entrance curve — `cubic-bezier(0.16, 1, 0.3, 1)` — is defined as "fast start, long generous deceleration into rest": the signature of something *settling* rather than *arriving*. Premium motion is read through "deceleration generosity and restraint," not speed. The inverse is equally legible: linear easing reads as mechanical; bounce and spring read as playful, forbidden by §2.2; uniform timing regardless of importance reads as thoughtless. Those four are the named taxonomy of cheap motion, and each is a personality failure before it is a craft failure.

**The hero's motion is a debt.** Fs-2 established ceremony as borrowed time requiring repayment; ADR-0008 makes it concrete — the intro's pacing costs measurably in lab metrics, accepted explicitly because the sequence is a deliberate brand moment rather than a fixable delay. That ADR protects *only* the intro, and only while it genuinely delivers personality that could not be transmitted otherwise. Any additional hero motion inherits none of that protection: a new debt, against a spent budget, with no ADR behind it.

---

## 2. CORE PRINCIPLES

**Mo-1 — Every motion answers "what does this represent?" first.** No animation is designed, timed, or discussed until a one-sentence diegetic justification is stated and accepted. The ordering is the mechanism: once an animation is beautifully executed, its removal becomes political rather than a design question. "It looks good" and "it feels premium" are explicitly insufficient — and are the two answers a hero proposal is most likely to arrive with. *"This represents the hero content arriving into a settled state" is valid; "this adds life" is not.*

**Mo-2 — One dominant motion, which must end.** At most one, and it resolves — nothing in the hero moves continuously. Hp-4 supplies the count; At-2 supplies the *resolution* requirement, the part usually missed: a moving element holds Rung-1 saliency for as long as it moves, so permanent motion means the claim never holds it. Continuous ambient motion structurally prevents the hero's primary job. *Exception: direct responses to input, which are user-initiated and transient.*

**Mo-3 — The hero inherits its timing; it does not set it.** Every duration and curve comes from the five tiers and three curves. Mt-1 states it absolutely — "no value at 220ms to split the difference." The hero is the surface most likely to argue for an exception, because it is the most scrutinised and most emotionally invested moment on the site. It gets none.

**Mo-4 — Motion never carries meaning alone.** No information is communicated solely through movement. Doubly binding here because the reduced-motion path replaces the Ceremonial tier with full static presentation — not a shortened animation. Anything the motion alone was saying is simply absent for that visitor, and Fs-3 forbids an incomplete variant. *The requirement is that the information survives, which happens automatically when motion is expressive rather than informational.*

**Mo-5 — Stutter is worse than stillness.** Motion that cannot hold frame rate on target hardware is removed, not degraded. Master Vision Ch. 23: stuttering animation is worse for the brand than no animation at all. A stutter is a visible defect, and one visible defect costs more than a successful animation earns. *A brand decision with a performance trigger — the response is to reduce the motion's ambition, not hope for better devices.*

**Mo-6 — The exit is not animated.** The hero does not animate its own departure as the visitor scrolls away. A hero that fades, parallaxes, or dissolves on scroll competes with the visitor's own gesture at the moment their confidence is being banked, and reads as reluctance to let go. *Scroll-linked motion within the hero, if ever justified under Mo-1, must never alter scroll velocity or distance. Section 3's own scroll-reveal is not the hero's exit.*

---

## 3. THE HERO MOTION BUDGET

| Allocation | Status | Governed by |
|---|---|---|
| **Ceremonial tier (1200ms, dedicated curve)** | **Spent** — intro, once per session, first visit | Mt-3; §9.2, §9.5 |
| **The one system-wide property exception** (reflection sweep) | **Spent** — intro only, never a precedent | Ag-1 |
| **Dominant motion slot** | **Spent** — the intro is the hero's one dominant motion | Hp-4 |
| **Simultaneous-animation ceiling (3 elements)** | Available but constrained | Ag-2 |
| **Deliberate tier (500ms)** | **Not used in the hero** — reserved for case-study and pricing moments | Lx-5 |
| **Quick tier (150ms)** | Available for input response only | DSB Ch. 15 |
| **Instant tier (80ms)** | Available for direct input response | DSB Ch. 15 |
| **Ambient / continuous motion** | **Forbidden** | Mo-2; At-2 |
| **Scroll-linked exit motion** | **Forbidden** | Mo-6; Fs-5 |

**Reading the budget.** After the intro, what remains is input response at the Quick and Instant tiers — motion the visitor caused. Not an accident of accounting but the correct answer: self-initiated motion competes with the claim; user-initiated motion confirms the surface is alive and responsive.

**The four inherited principles, in hero terms:**

| Principle | Hero application | Failure signature |
|---|---|---|
| **Diegetic motion** | Every movement represents a real relationship or state change | An animation justified as "atmosphere" |
| **Importance-scaled speed** | The intro earns Ceremonial; nothing else earns more than Quick | Duration inflation — a hover at Deliberate feels sluggish |
| **Non-bounce easing** | The three inherited curves only; no spring, no overshoot | Bounce reads as playful — forbidden |
| **Nothing moves without reason** | Motion is exceptional, not a default treatment | Every element having an entrance because entrances are available |

The fourth is most often violated by omission: a component library ships with entrance animations, they are not turned off, and the hero acquires four staggered reveals nobody chose. A visitor experiences a framework default exactly as if it were a deliberate brand choice.

---

## 4. WHAT IS DELIBERATELY NOT SPECIFIED HERE

Inventing these would create a conflict the moment the owning chapters are written.

- **The intro's per-beat timing.** The 1200ms total and its curve are fixed; the allocation across §9.2's seven beats is unwritten (Motion Bible Ch. 66).
- **Hero content stagger.** The interval between claim, qualifier, and CTA revealing is conceptual only (Ch. 47, unwritten).
- **Displacement distances.** Unspecified system-wide (Ch. 10, unwritten).
- **Any new easing curve.** Three exist. A fourth is a Design System Bible amendment, not a hero decision.

The correct posture: treat the gap as an intentional absence in the brand documentation and flag it back to design, rather than inventing a value that later conflicts with a canonical chapter.

---

## 5. DO / DON'T

**Do.** Turn off every default entrance animation the framework provides, then add back only what survives Mo-1's justification requirement in writing. The default state of a hero should be *still*, with motion added deliberately — not animated by default with motion removed on objection. The two orderings produce completely different heroes, and the second never converges on the first.

**Don't.** Add slow continuous ambient motion — a drifting light, breathing glow, slow gradient shift — for atmosphere. It fails Mo-1 (no diegetic answer), Mo-2 (never resolves), At-2 (holds Rung 1 permanently), and Hp-6 (pleasant once, an irritant by the fifth viewing). If the hero needs to feel alive rather than static, that comes from material and light, which are perceived continuously without being attended to — the exact property continuous motion cannot have.

---

## 6. ANTI-PATTERNS

**Budget-blind addition.** Adding an animation without checking what already animates at that moment. Detected by auditing the full first fifteen seconds as a sequence, not the new animation alone.

**Duration inflation.** Reaching for a slower tier because slower reads as more premium. Explicitly named backwards: a hover at Deliberate "feels sluggish, not expensive." Anything slower than Quick for a hover is immediately suspect.

**Ceremony creep.** The intro gaining beats until the pre-comprehension delay exceeds what personality transmission repays. Detected by tracking total time-to-claim across releases. Dangerous because ADR-0008's protection is frequently cited as though it covered the sequence in general rather than the specific pacing that existed when it was written.

**Default inheritance.** Shipping whatever motion the framework provides because nobody designed it so it does not count. Detected by listing every animation actually present and checking each against Mo-1's record.

---

## 7. ACCEPTANCE CRITERIA

- [ ] Every animation has a written diegetic justification recorded before implementation. *(Mo-1)*
- [ ] Exactly one dominant motion, and it resolves. *(Mo-2)*
- [ ] Nothing moves continuously or loops. *(Mo-2, At-2)*
- [ ] Every duration and curve is one of the five tiers and three curves. *(Mo-3)*
- [ ] No information is carried by motion alone. *(Mo-4)*
- [ ] All motion holds frame rate under CPU throttling, or has been removed. *(Mo-5)*
- [ ] The hero does not animate its exit; scroll is unmodified at all speeds. *(Mo-6)*
- [ ] Framework defaults explicitly audited, not merely left in place. *(§3, §5)*
- [ ] Time-to-claim tracked across releases to detect ceremony creep. *(§6)*
- [ ] No value from §4's list has been invented locally. *(§4)*

---

## 8. CROSS REFERENCES

Ch. 2 (Hp-4, Hp-6) · Ch. 3 (Bp-2) · Ch. 5 (Ej-5) · Ch. 6 (Fs-2, Fs-5) · Ch. 7 (At-2) · Ch. 9 (Px-2) · Ch. 22 · Ch. 25 · Ch. 28 · Ch. 29. Master Vision §2.2, §9.2, §9.5, Ch. 9, Ch. 10, Ch. 23, Ch. 27. Design System Bible Ch. 15, Ch. 40. ADR-0008, ADR-0009.

---

## 9. STATUS

This chapter is deliberately thin on values and thick on reasoning, because the Motion Bible chapters covering hero choreography (Ch. 47) and intro beat timing (Ch. 66) are unwritten. When authored, this chapter inherits from them without amendment — nothing here contradicts what those chapters would fix, by construction.

ADR-0009 records an open question about `prefers-reduced-motion` used as the sole degradation signal for weak hardware — distinct from reduced motion as a stated preference. It affects the hero directly, since the hero carries the system's only Ceremonial motion. Mo-5 is written to be compatible with either outcome.

---

*End of Chapter 21. Chapter 22 addresses a channel the hero may not need at all — and the procedure for finding out.*
