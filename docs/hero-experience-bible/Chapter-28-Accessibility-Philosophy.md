# CHAPTER 28 — ACCESSIBILITY PHILOSOPHY

**Trady Perch Hero Experience Bible · Part VIII: Universal Obligations**
*First-canonical-draft. Implementation-independent.*

**Inherited From:** Master Vision Ch. 27 item 8 (no accessibility or performance shortcuts for visual effect), §9.5, WCAG AA minimum with AAA preferred for body copy. Design System Bible Ch. 15 §8, Ch. 39, Ch. 42, Ch. 43, Ch. 53, Ag-3, Mt-4. UX Blueprint Ch. 88.
**Governs:** The hero's accessibility obligations and why they are commercially, not only ethically, correct.
**Does Not Govern:** The wider system's accessibility specification (DSB Ch. 53).

---

## 1. THE POSITION

**For this brand, accessibility is evidence.** Not of virtue — of *competence*. Chapter 11 established that the hero's only available capability signal is being a well-engineered artefact; Chapter 17 established that its proof of process rigor is behavioural rather than described. Accessibility is where both claims are most severely tested, because it cannot be faked, cannot be finished at the last minute, and cannot be reviewed from a screenshot.

A hero that works correctly for a keyboard visitor, a screen-reader visitor, a visitor at 200% zoom, and one with `prefers-reduced-motion` enabled demonstrates a level of care a competitor's particle field cannot approach. A hero that fails any of those demonstrates something too — Ch. 17 lists an inaccessible path as "evidence of work that stopped at the happy path," which is precisely the inference a technical buyer will draw about the company's production systems.

**The curb-cut argument, in hero terms.** Ch. 88: accessibility work for permanent disability "frequently serves the widest population," because impairment is frequently situational.

| Measure | Also serves |
|---|---|
| High contrast | Anyone on a phone outdoors; on a low-quality display; in a bright meeting room |
| Reduced-motion support | Anyone on a corporate machine with animations disabled by policy; on weak hardware |
| Keyboard operability | Power users; anyone whose trackpad is unavailable; anyone screen-sharing |
| Text scaling to 200% | Anyone over about 45; anyone at default scaling on a high-resolution display |
| Semantic structure | Every search engine and AI crawler that will ever summarise this company |
| No motion as sole information | Anyone who looked away for two seconds — which is most people |

**Interruption is the most common "impairment" a hero encounters.** A visitor who glances at their phone mid-sequence and looks back has the same needs as one who cannot perceive motion, and there are far more of them.

**Accessibility is a design constraint, not a remediation task.** Most of the hero's obligations are *compositional*: contrast is decided by the lighting plan, reading order by the hierarchy, motion behaviour by the motion budget, focus visibility by the interaction model. Which means **by the time a hero reaches an accessibility audit, nearly every finding is a composition change.** A late audit produces re-work, and re-work under deadline becomes compromise — the mechanism by which well-intentioned teams ship inaccessible heroes. It is procedural rather than attitudinal, and the correction is Chapter 9's stress matrix used as a design input.

**Reduced motion is not a lesser experience.** The most consequential decision here is already inherited: Mt-4 specifies the Ceremonial tier's companion as **full static presentation, no animation** — not shortened, not faster — and §9.5 requires the content still be delivered. For that visitor, the personality Phase 2 transmits through timing must arrive through material, light, type, and space instead. A reduced-motion hero that is the animated hero with the animation deleted has transmitted no personality at all — and because `prefers-reduced-motion` is set at the OS level and often forgotten, that visitor has no idea they received a diminished version. **Design the static hero first.**

---

## 2. CORE PRINCIPLES

**Ax-1 — Accessibility is non-negotiable and non-tradeable.** No obligation is traded for a visual, motion, or performance outcome. Chapter 14's goal stack does not include accessibility as a goal precisely because it is not a goal — it is a constraint on all of them. *Not a claim that accessibility never conflicts with aesthetics. It does, regularly. The principle fixes which side yields.*

**Ax-2 — Every path delivers the same three rungs.** Visual, keyboard, screen-reader, touch, and reduced-motion paths all deliver claim → qualifier → action, in order, completely. The single most important accessibility requirement here because it subsumes most others: a hero genuinely satisfying it cannot have a decorative element announced before the claim, cannot have a keyboard trap before the CTA, and cannot have content existing only in an animation. *Identical content sequence; presentation varies.*

**Ax-3 — Contrast is absolute; composition yields.** Contrast obligations are met by changing the composition, never by lowering text contrast or flattening the composition with a scrim. Acceptable fixes: reposition, re-light, re-crop, or introduce a legitimate surface. *Not a licence to abandon the dark art direction — a near-black field with off-white text is comfortably above AA before any adjustment; conflicts arise only where text sits over imagery, which is a placement decision.*

**Ax-4 — Motion is never the sole carrier.** No information exists only in an animation. Doubly binding here because the Ceremonial tier's reduced-motion companion removes the animation entirely rather than shortening it. *Motion that is expressive rather than informational satisfies this automatically.*

**Ax-5 — Focus is visible, predictable, and never trapped.** Keyboard focus is always visible, follows the hierarchy's order, and is never captured by the intro sequence or any hero element. The first `Tab` press is a first impression in its own right. A focus ring suppressed for aesthetic reasons is invisible to every reviewer using a mouse and decisive for every visitor who is not. *Not accepting the browser default — DSB Ch. 39 specifies a gold focus ring as the system default, and the hero uses it.*

**Ax-6 — Reduced motion is structural, not optional.** Reduced-motion behaviour is inherited automatically from the motion tokens, never implemented per element. Ag-3 states this as its primary accessibility mechanism, closing "the most common real-world reduced-motion failure mode (simply forgetting to wire it up per component)." The hero, carrying the system's only Ceremonial motion, is where a per-component approach would fail most visibly.

---

## 3. THE FIVE PATHS

Each is a complete first impression. Each is verified independently; none is inferred from another.

| Path | What must be true | Most common failure |
|---|---|---|
| **Visual / pointer** | Three rungs in order; contrast holds at every breakpoint | Text over imagery at one width only |
| **Keyboard** | First focus predictable; ring visible; tab order matches the hierarchy; intro skippable from the keyboard; no trap | Focus ring suppressed; skip control unreachable |
| **Screen reader** | Reading order delivers claim → qualifier → action; decorative content not announced; intro does not steal focus or announce itself as content | A decorative image announced before the claim |
| **Touch** | Targets adequate; no hover-dependent information; CTA reachable | An affordance communicated only by cursor change (Cu-4) |
| **Reduced motion** | Full static presentation; content complete; personality carried statically | The animated hero with the animation deleted |

**On the intro sequence.** It sits across four of the five paths and is the hero's highest-risk accessibility element. Consolidated obligations: it must not trap focus; must be skippable by keyboard using the same affordance a pointer user has; must not announce itself as content; must not delay the claim's presence in the DOM (Fs-4); and under reduced motion must resolve to a static presentation rather than being shortened. Every one is inherited from an existing rule; none is new here.

---

## 4. WHAT THE HERO OWES

| Obligation | Standard | Verified by |
|---|---|---|
| Text contrast | WCAG AA minimum; AAA preferred for body copy | Measurement at every breakpoint, against every background state |
| Keyboard operability | Complete, in logical order | Full traversal by keyboard only |
| Focus visibility | Always visible; brand-consistent ring | Visual check on every operable element |
| Reduced motion | Ceremonial → full static presentation | OS preference enabled, full path re-run |
| Content under reduced motion | Content still delivered | Paraphrase test with motion disabled |
| Semantic structure | Reading order matches hierarchy | DOM read aloud in source order |
| Text scaling | Usable and complete at 200% | Browser zoom |
| Touch targets | Adequate size and spacing | Real device |
| No motion-only information | Absolute | Motion disabled, content re-checked |

---

## 5. DO / DON'T

**Do.** Run Chapter 9's stress matrix as a *design input* — before composition is finalised — rather than as a QA gate afterward. Every accessibility finding in a hero is a composition change, so discovering them at audit time converts them into re-work, and re-work under deadline becomes compromise. Teams that check contrast, keyboard order, and the static path while the composition is still fluid ship accessible heroes without heroics; teams that audit at the end ship exceptions.

**Don't.** Suppress the focus ring because it interferes with the hero's visual composure. It is the single most common accessibility failure in design-led heroes, it is invisible to everyone reviewing with a mouse, and it renders the hero unusable for an entire class of visitor. If the default ring genuinely conflicts with the material language, the fix is the brand's own gold ring — specified in the system precisely so this trade never has to be made.

---

## 6. ANTI-PATTERNS

**The late audit.** Accessibility checked after the composition is signed off. Detected by when the check happened, not by its findings. Fixed procedurally — §1's argument is that this is a scheduling failure, not an attitude failure.

**Reduced motion as deletion.** Shipping the reduced-motion path by removing animations from the full path and testing nothing further. Detected by asking what personality that path transmits. Fixed by designing the static hero first.

**Contrast by scrim.** Resolving a text-over-imagery contrast failure with a translucent overlay. Detected by tracking scrim opacity across releases. It converts a lit composition into a graded one and treats a compositional problem as post-production.

**Path inference.** Testing the visual path and assuming the others follow. Detected by asking for the recorded result of each path; "we didn't check separately" is the finding. Fs-3 requires independent verification of each.

---

## 7. ACCEPTANCE CRITERIA

- [ ] All five paths in §3 verified independently, with results recorded. *(Ax-2, Fs-3)*
- [ ] Text contrast measured at every breakpoint against every background state. *(Ax-3)*
- [ ] No contrast failure resolved by lowering text contrast or adding a scrim. *(Ax-3)*
- [ ] Focus visible on every operable element, using the brand ring. *(Ax-5)*
- [ ] Focus never trapped, including during the intro sequence. *(Ax-5)*
- [ ] The intro is skippable by keyboard with the same affordance a pointer user has. *(§3)*
- [ ] Reduced-motion behaviour inherited from tokens, not implemented per element. *(Ax-6)*
- [ ] No information exists only in an animation. *(Ax-4)*
- [ ] The hero is complete and usable at 200% zoom. *(§4)*
- [ ] Accessibility checks occurred while the composition was still fluid. *(§5)*

---

## 8. CROSS REFERENCES

Ch. 6 (Fs-3; the keyboard and screen-reader variants) · Ch. 9 (the stress matrix) · Ch. 11 (rung 5) · Ch. 15 (Ih-3) · Ch. 17 (the counter-signal catalogue) · Ch. 19 (Ty-5) · Ch. 21 (Mo-4) · Ch. 23 (contrast vs lighting) · Ch. 24 (Mr-4) · Ch. 25 (Ix-4) · Ch. 26 (Cu-4) · Ch. 31. Master Vision §9.5, Ch. 21, Ch. 27. Design System Bible Ch. 15, Ch. 39, Ch. 42, Ch. 43, Ch. 53, Ch. 40 (Ag-3). UX Blueprint Ch. 88. ADR-0009.

---

## 9. STATUS

This chapter introduces no obligations of its own — every standard is inherited. Its contribution is the *argument* in §1 (accessibility as capability evidence for this specific buyer) and the five-path structure in §3, which consolidates requirements distributed across the inherited documents into a verification unit.

**Known gaps.** UX Blueprint Ch. 87 (Cognitive Accessibility Doctrine), Ch. 89 (Plain Language & Comprehension Standard), and Ch. 91 (Economic & Access Inclusivity) are planned and unwritten. When they land, this chapter inherits from them — particularly on reading-level ceilings, which currently have no stated standard anywhere in the corpus and which Chapter 18's plain-language requirement approximates without measuring.

**Dependency.** ADR-0009's open question — `prefers-reduced-motion` used as the sole degradation signal for weak hardware — sits directly on Ax-6. Its resolution belongs to the Constitution's performance chapters; Ax-6 is written to be compatible with either outcome.

---

*End of Chapter 28. Chapter 29 addresses the other universal obligation, and the one place this Bible's canon has already accepted a documented violation.*
