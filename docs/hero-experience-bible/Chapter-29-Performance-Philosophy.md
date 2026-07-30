# CHAPTER 29 — PERFORMANCE PHILOSOPHY

**Trady Perch Hero Experience Bible · Part VIII: Universal Obligations**
*First-canonical-draft. Implementation-independent.*

**Inherited From:** Master Vision Ch. 23, Ch. 27 item 8, §9.2 (performance as "a launch-blocking quality bar, not a post-launch optimization pass"). Product Implementation Constitution Ch. 35 (content over animation), Ch. 36 §2 (Marketing Site LCP ≤ 2000ms), Ch. 37. Motion Bible ethics. ADR-0008, ADR-0009.
**Governs:** The hero's performance obligations, the fixed order of sacrifice, and the bounds of the one accepted violation.
**Does Not Govern:** Site-wide budgets or the tooling that enforces them.

---

## 1. THE POSITION

Performance is where this Bible's argument is hardest to hold, because the hero contains a deliberate, documented, accepted budget violation — and defending it correctly requires distinguishing it from every violation that is not defensible.

Stated plainly: §9.2 specifies a ceremonial intro with deliberate pacing; that pacing costs measurably in lab metrics; ADR-0008 records the decision to keep it and to accept, on the record, that the homepage's LCP will not clear the 2000ms budget for a first-time visitor during the one-time intro — logging it as debt rather than silently accepting a failing check or cutting the intro's timing to force a pass.

**That decision is correct and it is narrow. It protects one specific, reasoned, once-per-session brand moment. It protects nothing else**, and the most likely misuse of this chapter is to cite it as general precedent for trading performance against visual ambition — which Ch. 27 item 8 forbids outright.

**Performance is a brand property, not an engineering metric.** Chapter 11 established the hero's strongest capability signal as being a well-engineered artefact; Chapter 17 listed stutter, layout shift, and slow paint in the counter-signal catalogue; Chapter 9 made speed under adverse conditions the distinguishing property of a premium surface. Those converge: **for an AI automation agency, a slow hero is a capability disclosure.** A prospect evaluating whether this company can be trusted to deploy systems into their operations has exactly one sample of its engineering available, and it is the page they are on.

**Real time and felt time.** The governing constraint: perceived-performance techniques must always shorten *felt* time toward *real* time, **never lengthen it**. Fabricating delay is forbidden because a user who later realises a delay was fabricated "retroactively distrusts every prior loading state they saw."

| Legitimate (shortens felt time) | Forbidden (lengthens felt time) |
|---|---|
| Server-rendering the claim so it paints immediately | Holding content back to make an animation land |
| Prioritising the critical path | Adding a delay so the surface feels considered |
| Preventing layout shift so nothing is re-processed | A fake "analysing" or "loading" state (Ac-3) |
| Loading ambient material after the claim | A skeleton shown longer than the real wait |
| A ceremonial moment *honest about being ceremonial* | A ceremonial moment presented as a loading state |

**The intro sits in the left column, narrowly.** It is not disguised as loading; it is visibly a brand moment, skippable, and happens once. Presented as a loading indicator it would be in the right column, and ADR-0008's reasoning would not apply.

**The order of sacrifice**, fixed in advance because deciding under pressure produces the wrong answer:

```
  SACRIFICE FIRST
     ▲   1. Ambient material richness (grain, texture fidelity)
     │   2. Render or image fidelity
     │   3. The ceremonial sequence's elaboration
     │   4. The ceremonial sequence entirely
     │   5. All non-essential motion
     │   ─────────────────────────────────────────
     │      never below this line:
     │   ✗  The claim's presence and legibility
     ▼   ✗  The CTA's presence
  NEVER   ✗  Layout stability
          ✗  Accessibility obligations (Ax-1)
```

Constitution Ch. 35's content-over-animation principle sets the direction; this makes it operational. ADR-0008 notes the same priority: the real content "is already server-rendered and available underneath, just not what a lab tool happens to measure as 'largest.'"

---

## 2. CORE PRINCIPLES

**Pf-1 — The claim is never on the critical path behind anything.** It paints in the first meaningful render, gated by nothing — no font, image, hydration, or client-side state. ADR-0008 documents a real instance in this codebase where an element was kept out of the DOM until a client-side check resolved, costing 1424ms of pure load delay — a genuine defect, distinct from the pacing question, fixed by rendering markup unconditionally with a CSS-only hidden state. *A rule about dependencies, not about server-side rendering specifically.*

**Pf-2 — Layout stability is absolute.** Nothing shifts after first paint, under any condition. Chapter 4 ranks layout shift third among cost drivers and notes it is the only one spending the budget twice; Bp-3 makes it a Precision failure; Chapter 17 lists it first among counter-signals. *A design obligation, not a metric threshold: reserve space for everything that will arrive.*

**Pf-3 — Stutter is removed, not tolerated.** Motion that cannot hold frame rate on target hardware is removed rather than shipped degraded. A stutter is a visible defect, and one visible defect costs more than a successful animation earns. *A brand decision with a performance trigger.*

**Pf-4 — Never fabricate delay.** No element implies work that is not occurring, and no wait is extended to seem considered. *The ceremonial sequence is not an exception because it does not present itself as a wait.*

**Pf-5 — The sacrifice order is fixed in advance.** When the hero must give something up it follows §1's order, and the decision is not renegotiated under deadline. Under pressure, the item most likely to be cut is whichever is cheapest to cut — usually accessibility work or content completeness, both below the line. *Most heroes will never need to sacrifice anything; the order exists so the one that does is not improvised.*

**Pf-6 — An accepted violation is narrow, documented, and revisited.** Any accepted budget violation names exactly what it protects, is recorded in the debt register, and is never cited as precedent for a different trade. ADR-0008's own structure demonstrates the standard: it scopes the decision, records it publicly, logs it as debt, states the condition for revisiting it, and carries a published correction of its own scope claim. *A mechanism for bounding the exception that exists, not for approving further ones.*

---

## 3. THE HERO'S PERFORMANCE OBLIGATIONS

| Obligation | Standard | Notes |
|---|---|---|
| Claim in first meaningful paint | Absolute | Not gated by font, image, hydration, or state |
| Layout stability | Absolute — zero shift | Reserve space for every late-arriving element |
| Frame rate under CPU throttling | Holds, or the motion is removed | Verified, not assumed |
| LCP | Constitution Ch. 36 §2: ≤ 2000ms | **Known accepted exception** during the one-time intro (ADR-0008) |
| No fabricated delay | Absolute | Includes skeletons shown longer than the real wait |
| Degradation order | §1 | Content and accessibility never sacrificed |
| Critical-path asset weight | As low as the claim requires — very low | The claim is text; it should cost almost nothing |

**On the LCP row.** ADR-0008's Milestone-10 correction must be carried accurately: the homepage's LCP overage is *not* solely attributable to the ceremonial sequence. A later full-route audit found every route over the lab budget, traced to a shared bundle exceeding its own ceiling under simulated CPU throttling, while an unthrottled real-browser measurement found the homepage at 276ms. The honest reading: **the ceremonial sequence has a real cost, and it is additive on top of a larger, unrelated, general cause.** Citing the intro as the reason the homepage is slow would be inaccurate; citing the ADR as proof that lab metrics can be ignored would be worse.

---

## 4. PERCEIVED PERFORMANCE IN THE HERO

| Technique | Effect | Permitted? |
|---|---|---|
| Server-rendered claim | Content present before anything else resolves | Required (Pf-1) |
| Reserved space for late assets | Nothing shifts; nothing is re-processed | Required (Pf-2) |
| Progressive material fidelity | Surface present immediately, refines quietly | Yes — provided it does not shift or flash |
| Prioritising the critical path | The claim arrives first by construction | Yes |
| Ceremonial sequence | Occupies attention honestly during a brand moment, not a wait | Yes, within ADR-0008's scope |
| Skeleton placeholder for the claim | Implies loading when content should already be present | **No** (Pf-1) |
| Artificial minimum display time on any state | Lengthens felt time | **No** (Pf-4) |
| A "loading" presentation for the intro | Reframes a brand moment as a wait | **No** (Pf-4) |

**The pattern.** Legitimate perceived-performance work in a hero is almost entirely structural — get the right thing there first and keep it still. Techniques that involve *showing something instead* are mostly unavailable, because the hero's essential content is text, and text that needs a placeholder has a dependency problem rather than a loading problem.

---

## 5. DO / DON'T

**Do.** Treat the claim as the only thing on the critical path and everything else as optional cargo. It is a text string; it should reach the visitor faster than anything else on the page can, and every hero performance problem worth having is a problem about what was allowed to get in front of it.

**Don't.** Cite ADR-0008 to justify a new performance cost. It protects one named, reasoned, once-per-session moment specified in the Master Vision, and its own text is explicit that the LCP budget "was never the reason the ceremonial pacing exists, and shouldn't become the reason it changes either." A new cost has no such standing and needs its own decision record, which Pf-6 requires to be narrow, documented, and revisitable.

---

## 6. ANTI-PATTERNS

**Precedent laundering.** Using the accepted intro exception to justify an unrelated trade. Detected by asking which ADR covers the new cost; "the same one" is the finding. Fixed by Pf-6.

**The metric-shaped fix.** Changing a brand decision to move a lab number rather than to improve a visitor's experience — shortening the intro to pass an audit. ADR-0008 explicitly declines this, and its Milestone-10 correction shows why it would have failed anyway: the number had a different dominant cause.

**Silent late arrival.** An asset that loads after first paint and reflows the composition — a webfont, a background, an image without reserved space. Detected by throttled testing, invisible on a fast connection. The most common Pf-2 failure and the easiest to miss in review.

**Assumed frame rate.** Motion validated on the design team's hardware only. Detected by the absence of a recorded throttled result.

---

## 7. ACCEPTANCE CRITERIA

- [ ] The claim paints in the first meaningful render, gated by nothing. *(Pf-1)*
- [ ] Zero layout shift after first paint under every tested condition. *(Pf-2)*
- [ ] All motion verified under CPU throttling, with results recorded. *(Pf-3)*
- [ ] No fabricated delay, minimum display time, or fake processing state. *(Pf-4)*
- [ ] The sacrifice order is documented and was not renegotiated under deadline. *(Pf-5)*
- [ ] Any accepted violation names what it protects and is in the debt register. *(Pf-6)*
- [ ] No new performance cost cites ADR-0008 as its justification. *(§5)*
- [ ] Critical-path weight for the claim is measured and minimal. *(§3)*

---

## 8. CROSS REFERENCES

Ch. 4 (layout shift as a double cost) · Ch. 6 (Fs-1, Fs-4; the slow-connection variant) · Ch. 9 (the stress matrix) · Ch. 11 (rung 5) · Ch. 17 (the counter-signal catalogue) · Ch. 21 (Mo-5) · Ch. 24 (the grain trade) · Ch. 28 (Ax-1's precedence) · Ch. 31. Master Vision §9.2, Ch. 23, Ch. 27. Constitution Ch. 35, Ch. 36, Ch. 37, Ch. 66. ADR-0008, ADR-0009.

---

## 9. STATUS

This chapter carries a live, documented exception rather than a clean standard, and states it as such. ADR-0008 remains the record of record for the homepage's LCP; anyone re-litigating that number should start there rather than re-diagnosing from scratch, and should read its Milestone-10 correction before drawing conclusions about cause.

**Dependency.** ADR-0009's question — whether `prefers-reduced-motion` should serve as the sole degradation signal for weak hardware — is unresolved and bears directly on Pf-3 and Pf-5. A device-capability signal distinct from a stated motion preference would change how the sacrifice order is triggered, though not its contents.

---

*End of Part VIII. Part IX turns to the two contexts in which every obligation so far is actually experienced.*
