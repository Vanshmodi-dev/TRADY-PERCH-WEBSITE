# CHAPTER 31 — MOBILE PSYCHOLOGY

**Trady Perch Hero Experience Bible · Part IX: Context**
*First-canonical-draft. Implementation-independent.*

**Inherited From:** Master Vision Ch. 21 (mobile-first, "not a responsive afterthought retrofit"), §9.5. Design System Bible Ch. 43 (Touch & Gesture), Ch. 49 (Mobile Design Standards), Nv-3. UX Blueprint Ch. 91 (economic and access inclusivity).
**Governs:** What is different about the hero on a phone, and what that changes.
**Does Not Govern:** Breakpoint or touch specifications (DSB Ch. 43, Ch. 49).

---

## 1. THE POSITION

**The mobile visitor's context.** The desktop visitor is evaluating at a desk. The mobile visitor is somewhere else, and the differences are consequential:

- **They are interruptible, and probably interrupted.** A phone visit is frequently a few seconds between other things. The hero must be comprehensible from a cold restart at any moment, because the visitor will look away and back.
- **Their environment is uncontrolled.** Sunlight, glare, a cracked screen, a low-brightness setting to save battery. On mobile this is not an edge case, it is a Tuesday.
- **Their connection may be poor and their device may be old.** Ch. 91's framing applies directly: "older devices, slower connections, smaller data plans." A hero assuming a recent phone on good wifi excludes people on the basis of what they can afford — a business loss and, for a brand positioned on judgment, a poor look.
- **They are holding the device in one hand.** Reach is constrained; the comfortable zone is lower-centre; top corners are hardest.
- **They will scroll almost immediately.** The hero's window is shorter not because attention is shorter but because the *gesture* is closer to hand.

**Scarcity forces the discipline the desktop lacks.** Chapter 30 identified abundance as desktop's difficulty. Mobile's is the opposite, and it is a gift: nothing extra fits. The stakeholder request that could always be accommodated on a 1440px display cannot be, and the conversation shifts from "where does this go" to "does this earn its place." **This is the strongest practical argument for mobile-first that does not appear in the source material: the mobile constraint enforces this Bible's rules automatically, at no political cost.** A four-chunk budget is an argument on desktop and a physical fact on mobile.

**Two temptations, both common, both wrong.** *Do not make the mobile hero a different hero* — a mobile hero with less content means the desktop hero escaped the budget; one with *different* content means the brand says different things depending on device, failing Pa-5 and Ui-4 (the forwarded link is frequently opened on a phone). *Do not drop the CTA* — Nv-3 is explicit that it is "never dropped from mobile to save space"; ordinary items compress or collapse first.

---

## 2. CORE PRINCIPLES

**Mb-1 — Compose for mobile, elaborate for desktop.** The mobile hero is designed first, as a complete composition; desktop is its elaboration. A hero derived by compression inherits every desktop decision that assumed space, and the compression is performed under deadline by whoever is available — which is how a mobile hero acquires a truncated claim, a collapsed qualifier, and a CTA below the fold. *A rule about which composition is* authoritative*: changes are validated on mobile before being accepted on desktop.*

**Mb-2 — Identical content, composed differently.** The same three rungs and the same single action as desktop. Only composition, scale, and spacing differ.

**Mb-3 — The claim is always in the first viewport.** Fully visible in the initial mobile viewport, at every supported device height, including landscape. A claim requiring a scroll has failed the only goal every other goal depends on — and mobile landscape is where this fails most often and is checked least often. *The qualifier and CTA may sit below the fold if the composition requires; the claim may not.*

**Mb-4 — The CTA is never dropped.** Present and reachable on mobile; other elements compress or collapse first. *Present and reachable without hunting is the standard — not necessarily above the fold.*

**Mb-5 — Everything is touch-operable, nothing is hover-dependent.** No information or affordance depends on hover, cursor, or pointer precision. Hover does not exist on touch, and hover-emulation produces sticky states that persist after a tap — a defect the visitor experiences as the surface being broken. *A rule about the hero, verified on mobile, because that is where it fails.*

**Mb-6 — Assume a weak device on a poor connection.** The baseline target is an older device on a constrained connection, not a current flagship on wifi. The design-team device is the least representative phone available, and every performance failure in Chapter 29's catalogue appears first on hardware nobody on the team is using. *A requirement that the baseline be realistic rather than aspirational.*

---

## 3. THE MOBILE DEGRADATION ORDER

Extends Chapter 20's space-job ordering and Chapter 29's sacrifice order into the specific case.

```
  COMPRESS / SACRIFICE FIRST
     ▲   1. Standing space (the generous margins that signal position)
     │   2. Grouping space (tighten ratios, preserving relative order)
     │   3. Ceremonial elaboration
     │   4. The ceremonial sequence entirely
     │   5. Ambient material richness
     │   6. The CTA's position above the fold  (not its presence)
     │   ─────────────────────────────────────────────
     │      never:
     │   ✗  The claim's presence in the first viewport   (Mb-3)
     │   ✗  The CTA's presence anywhere                  (Mb-4)
     │   ✗  Isolation of the claim                       (Ch. 20)
     ▼   ✗  Contrast and touch-target adequacy           (Ax-1)
  NEVER
```

**On item 6.** The CTA's *position* is negotiable; its *presence* is not. A mobile hero where the CTA sits just below the fold, reachable with a single short scroll, is compliant and often correct — the claim's completeness in the first viewport matters more.

---

## 4. THE MOBILE CONTEXT

| Property | Mobile reality | Hero obligation |
|---|---|---|
| **Posture** | Standing, moving, between tasks | Comprehensible in seconds; restartable from cold |
| **Attention** | Highly interruptible | No dependency on having watched a sequence (Mo-4, Ax-4) |
| **Time** | Phases compress (Ch. 6 §4.3) | Claim lands by ~T+2s rather than T+3s |
| **Space** | Genuinely scarce | Degradation order (§3); isolation preserved |
| **Vision** | Whole viewport near-foveal | Composition read all at once; blur test still applies |
| **Input** | Thumb; imprecise; one-handed | Generous targets; nothing hover-dependent (Mb-5) |
| **Reach** | Lower-centre comfortable; top corners hardest | Consider where the CTA sits relative to the thumb |
| **Environment** | Sunlight, glare, low brightness | Contrast obligations are absolute (Ax-3) |
| **Connection** | Frequently constrained | Claim costs nothing (Pf-1) |
| **Device** | Often old | Frame rate verified on real hardware (Pf-3, Mb-6) |
| **Data** | Sometimes metered | Heavy assets deferred; grain and imagery are the first cuts |
| **Landscape** | Very short viewport | Mb-3 still binds — this is where it usually breaks |

---

## 5. THE INTRO SEQUENCE ON MOBILE

Mobile is where the ceremonial moment's cost is highest and its case is weakest.

**Unchanged:** it runs once per session, is always interruptible, resolves to a full static presentation under reduced motion, and must never gate the claim.

**Harder on mobile:** interruption probability is far higher, so the sequence is more likely to be seen partially than completely — which makes Fs-4 (the claim exists underneath regardless) the load-bearing requirement rather than a safeguard. The skip affordance must be reachable by thumb, adequately sized, and not in a top corner. Frame rate is at greater risk on older hardware. And Chapter 6's mobile timeline compresses Phase 2 from 0.4–3s to 0.4–2s: **ceremony has less licence on a phone.**

**The honest position:** the ceremonial sequence is a desktop-optimal decision applied to mobile because consistency requires it (Pa-5). It is defensible — a brand moment appearing only on desktop would be a worse inconsistency — but it is the element in this Bible with the weakest mobile case, and §3 places it accordingly.

---

## 6. DO / DON'T

**Do.** Validate every hero change on a real, mid-range, several-year-old phone on a throttled connection before accepting it on desktop. It costs a minute, it enforces Mb-1's ordering in practice rather than in principle, and it catches the entire class of failure — truncated claims, unreachable CTAs, dropped frames, illegible secondary text — that is invisible on the hardware the change was authored on.

**Don't.** Truncate or shorten the claim for mobile. It is the most common mobile compromise and it fails Mb-2 (content differs by device), Mb-3 (a truncated claim is not a claim), and G1 (the only goal everything else depends on). If the claim does not fit the mobile viewport, the claim is too long *everywhere* — mobile has diagnosed a problem the desktop composition was concealing, and the fix belongs in Chapter 18.

---

## 7. ANTI-PATTERNS

**Derivation by compression.** A mobile hero produced by shrinking the desktop one under deadline. Detected by asking which composition was authored first and which one changes are validated against. Fixed by Mb-1.

**The flagship baseline.** Verification performed on current, high-end devices only. Detected by the absence of a recorded result from representative hardware. Mb-6's whole content.

**Landscape blindness.** Portrait verified thoroughly; landscape never checked. Detected by rotating the device. It is where Mb-3 breaks, and it is the most-skipped check in the entire stress matrix.

**Hover leakage.** An affordance or piece of information that exists only on hover, surviving into the mobile build because it was never exercised by touch. Detected by operating the hero entirely by thumb.

---

## 8. ACCEPTANCE CRITERIA

- [ ] The mobile composition was authored first and is the authoritative one. *(Mb-1)*
- [ ] Content inventory is identical to desktop. *(Mb-2)*
- [ ] The claim is fully visible in the first viewport, portrait *and* landscape. *(Mb-3)*
- [ ] The CTA is present and reachable at every mobile viewport. *(Mb-4)*
- [ ] Nothing depends on hover, cursor, or pointer precision. *(Mb-5)*
- [ ] Verified on representative older hardware and a throttled connection. *(Mb-6)*
- [ ] §3's degradation order applied where space is scarce; nothing below the line sacrificed. *(§3)*
- [ ] The skip affordance is thumb-reachable and adequately sized. *(§5)*
- [ ] Touch targets meet the system's size and spacing standards. *(DSB Ch. 43)*
- [ ] The blur test and paraphrase test both pass at 375px. *(Ch. 6)*

---

## 9. CROSS REFERENCES

Ch. 6 (§4.3, the mobile timeline; Fs-4) · Ch. 9 (the stress matrix) · Ch. 12 (Pa-5) · Ch. 13 (Ui-4) · Ch. 15 (Rung 1) · Ch. 20 (the space-job degradation order) · Ch. 26 (Cu-4) · Ch. 27 (Ct-6) · Ch. 28 (Ax-1, Ax-3) · Ch. 29 (Pf-1, Pf-3, the sacrifice order) · Ch. 30 (the mirror case). Master Vision §9.5, Ch. 21. Design System Bible Ch. 20 (Nv-3), Ch. 43, Ch. 49. UX Blueprint Ch. 91.

---

## 10. STATUS

§5 states a genuine weakness rather than defending it: the ceremonial sequence has the weakest case on mobile of any element in this Bible, and it is retained for consistency reasons that are real but not overwhelming. If evidence ever showed the sequence materially harming mobile outcomes, that would be a legitimate trigger to revisit Master Vision §9.2 — a brand decision, not an engineering one, and outside this Bible's authority to make.

**Documented limitation.** Chapter 6's compressed mobile timings (§4.3) inherit that chapter's caveats: the *direction* of the compression is well reasoned, the specific boundaries are proposals. No mobile-specific comprehension data exists for this brand.

---

*End of Part IX. Part X turns to how this document changes, what it forbids permanently, and how a hero is finally judged against it.*
