# CHAPTER 33 — HERO ANTI-PATTERNS

**Trady Perch Hero Experience Bible · Part X: Governance & Endurance**
*First-canonical-draft. Implementation-independent.*

**Inherited From:** Design System Bible Ch. 68, Product Implementation Constitution Ch. 67 (the parallel anti-pattern libraries and their honest-status practice). Master Vision Ch. 27.
**Governs:** The named failure catalogue and the schedule that detects it.
**Does Not Govern:** Remediation of any specific instance — each entry routes to its origin chapter.

---

## 1. THE POSITION

A named failure is a preventable one. An unnamed failure recurs, because each instance looks like a fresh, reasonable decision rather than an instance of a known pattern.

This chapter names twenty-two, organised by severity: four unrecoverable, eight damaging, ten corrosive — individually survivable, collectively fatal.

**Honest status note.** Design System Bible Ch. 68 and Constitution Ch. 67 both state that an anti-pattern library grows from real production incidents. This one has none — no hero has shipped under this Bible, no visitor has bounced from it, no stakeholder request has yet eroded it. Every entry is derived from reasoning, from this brand's source documents, or from failures documented in this codebase's ADRs. That makes it a **predictive catalogue rather than a battle-tested one**, and the distinction should be stated rather than implied. Entries that survive contact with reality will earn their place; entries that never occur should be removed, not preserved for completeness.

---

## 2. TIER ONE — UNRECOVERABLE

Failures no other quality can compensate for.

**AP-1 — The Incomprehensible Hero.** A visitor cannot state what the company does. Every goal below G1 is conditional on it, and the failure is invisible internally because everyone reviewing already knows the answer. *Detect:* five-second paraphrase test with someone who has never seen the site. *Fix:* rewrite Rung 1 as a transformation in the reader's vocabulary. *(Ch. 14, 15, 18)*

**AP-2 — The Phase-One Failure.** The hero shifts, stalls, or intrudes within 400ms. Thin-slice judgments form fast and are then defended — later evidence is interpreted *through* the verdict rather than weighed against it. *Detect:* capture at 400ms under throttling; blur test; layout-shift measurement. *Fix:* server-render the claim with no dependencies; reserve space for late arrivals. *(Ch. 6, 29)*

**AP-3 — The Fabricated Signal.** A placeholder metric, illustrative client name, or proof element built from content the company does not have. One discovered inconsistency destroys more trust than fifty consistent signals build, and retroactively discredits everything around it. *Detect:* for each proof element, ask what a visitor could verify. *Fix:* remove it. *(Ch. 17)*

**AP-4 — The Inaccessible Hero.** A keyboard trap, suppressed focus ring, insufficient contrast, or content existing only in an animation. It excludes real visitors and — for a company selling engineering judgment — is a capability disclosure. *Detect:* Chapter 28's five paths, verified independently. *Fix:* compositional, not remedial. *(Ch. 28)*

---

## 3. TIER TWO — DAMAGING

**AP-5 — The Eager Hero.** Two CTAs, an exclamation mark, urgency copy, an exit-intent overlay, or a chat widget opening unprompted. Eagerness signals the wrong status: the party wanting the transaction more is the weaker party. *Detect:* Chapter 3's forbidden-register table applied to the whole hero including behaviours. *Fix:* remove the device — the visitor who is not ready needs the rest of the page, not a second button. *(Ch. 3, 16, 27)*

**AP-6 — The Generic Hero.** A claim a competitor could paste onto their own site unchanged. It collapses four functions at once — recognition, differentiation, qualification, and the only credibility signal a template cannot buy. *Detect:* §16.2's specificity test, applied mechanically. *Fix:* restore specificity; accept the bounce rate. *(Ch. 13, 18)*

**AP-7 — The Category-Mimic Hero.** A neural mesh, particle field, glowing orb, blue-to-purple gradient, or robot imagery. Every one is now evidence *against* technical depth. *Detect:* check against Chapter 11's AI-tell table. *Fix:* Chapter 11's substitution table — usually "nothing in the hero." *(Ch. 8, 11)*

**AP-8 — The Permanent Motion.** An ambient animation, drifting gradient, breathing glow, or cursor-following effect that never resolves. It holds Rung-1 saliency indefinitely, so the claim never does; subtlety is not a defence, because attention responds to motion rather than amplitude. *Detect:* watch for thirty seconds after load; anything still moving is this. *Fix:* remove — life comes from material and light. *(Ch. 7, 21, 26)*

**AP-9 — The Stolen Scroll.** Hijacking, snapping, momentum modification, a pinned hero, or an animated exit. It removes control at the moment the hero's work is being banked, handing irritation to the next section. *Detect:* scroll out at three speeds; compare against native behaviour. *Fix:* remove entirely. *(Ch. 5, 6, 21, 25)*

**AP-10 — Proof Front-Loading.** A logo strip, animated metric, rating, or testimonial in the hero. Proof lands where it cannot be interrogated, so it converts poorly — *and* is no longer available at full force where it would have converted well. *Detect:* any proof device in the hero. *Fix:* relocate to Portfolio, Case Studies, or Testimonials. *(Ch. 10, 17)*

**AP-11 — The Fourth Rung.** Content added at hierarchy level — a benefit list, a stat, an expander, a "learn more." It breaks three independent budgets simultaneously: four chunks, three rungs, four type sizes. *Detect:* ask which rung each element delivers. *Fix:* relocate to its owning section. *(Ch. 4, 15, 19)*

**AP-12 — The Compressed Mobile Hero.** A mobile hero produced by shrinking the desktop one; a claim requiring a scroll; a hidden qualifier; a dropped CTA. Mobile is where most first impressions occur and where every constraint binds hardest. *Detect:* ask which composition was designed first; verify on a real mid-range device, portrait and landscape. *Fix:* re-compose from the three rungs. *(Ch. 31)*

---

## 4. TIER THREE — CORROSIVE

Individually survivable, collectively fatal. These produce a degraded hero nobody decided to build.

**AP-13 — Density Creep.** Space eroding across releases with no single decision responsible. *Detect:* measure element-to-space ratio per release rather than reviewing changes individually. *Fix:* Ns-4. *(Ch. 2, 20)*

**AP-14 — Saliency Inflation.** The CTA strengthened repeatedly in response to low click-through. *Detect:* track emphasis changes; three strengthenings indicate a hierarchy problem. *Fix:* diagnose upstream — usually the claim failed. *(Ch. 7, 27)*

**AP-15 — Ceremony Creep.** The intro gaining beats over time. *Detect:* track total time-to-claim across releases. *Fix:* re-derive from §9.2's seven beats — ADR-0008 protects the *reasoned* pacing, not whatever the sequence has since become. *(Ch. 6, 21)*

**AP-16 — Gold Drift.** Gold expanding from one functional placement to underlines, borders, icons, ambient glows. *Detect:* measure gold's share against the ≤10% rule each release. *Fix:* revert to a single functional placement, not to trimming the newest addition. *(Ch. 10, 27)*

**AP-17 — Default Inheritance.** Framework-default animations, focus rings, and transitions shipped because nobody turned them off. A visitor experiences a platform default exactly as a deliberate brand choice. *Detect:* list every animation and state present; check each against a recorded decision. *Fix:* start from still and add back deliberately. *(Ch. 21, 25)*

**AP-18 — Breakpoint Inheritance.** Composition scaled between breakpoints without re-checking grouping ratios or measure. *Detect:* squint test and character count at three or more widths. *Fix:* re-compose rather than resize. *(Ch. 9, 20, 30)*

**AP-19 — Variant as Afterthought.** The reduced-motion, keyboard, or no-JS path derived by subtraction from the full-motion desktop path. *Detect:* ask what personality the reduced-motion hero transmits; "less" means it was derived. *Fix:* design the hardest case first. *(Ch. 6, 9, 28)*

**AP-20 — Metric Capture.** The goal stack quietly reordering around whatever is measurable — in practice, CTA click-through. *Detect:* ask which goal the last three changes served; three consecutive G5 changes indicate inversion. *Fix:* Ms-1 and Chapter 14's conflict procedure applied explicitly. *(Ch. 1, 14, 16, 27)*

**AP-21 — Restraint as an Alibi.** An under-developed hero presented as a minimal one, defended in this Bible's own vocabulary. *Detect:* run Test 2 in reverse — if removing an element breaks nothing *and* the hero still fails AP-1, no idea was ever formed. *Fix:* resolve the central idea. **This is the one anti-pattern this document itself makes easier to commit, which is why it is named.** *(Ch. 2)*

**AP-22 — Governance by Exception.** A principle nominally in force with a growing list of exceptions beneath it. *Detect:* count exceptions; more than one means the principle was amended in practice without being amended in fact. *Fix:* run Chapter 32's procedure honestly — either the reasoning fails and the principle changes, or it holds and the exceptions are withdrawn. *(Ch. 32)*

---

## 5. THE DETECTION SCHEDULE

Most anti-patterns above are undetectable by reviewing a single change.

| Cadence | What is checked | Catches |
|---|---|---|
| **Every change** | Chapter 34's checklist for affected sections; Chapter 14's conflict procedure | AP-5, 10, 11 |
| **Every release** | Blur test; paraphrase test; five accessibility paths; stress matrix | AP-1, 2, 4, 8, 9, 12 |
| **Every release, comparative** | Gold share; element-to-space ratio; time-to-claim; emphasis history | AP-13, 14, 15, 16 |
| **Quarterly** | Full Chapter 34 run; anti-pattern sweep; exception count | AP-17, 18, 19, 20, 21, 22 |
| **On any constitutional change** | Full Chapter 34 re-run | All |

**The comparative row is the important one.** Six anti-patterns are visible only in the difference between releases, and no per-change review will ever find them. A hero governed only at the change level will accumulate all six.

---

## 6. THE TWO ANTI-MODELS, AS CHECKLISTS

Any hero can be checked against both in under a minute.

**Reads as a freelancer portfolio if:** it is busy; it makes superlative claims; it uses a template hero; it has multiple eager CTAs; it borrows credibility through badges and logo strips; its tone is enthusiastic or informal; it looks like a person rather than a firm.

**Reads as an enterprise SaaS site if:** it is feature-dense; its language is abstract or jargon-heavy; it shows an architecture diagram or dense product screenshot; it offers several parallel actions; its tone is impersonal; it looks like a firm rather than a partner.

**Both lists must be run.** A correction away from one reliably drifts toward the other, and a hero reviewed against only the pole it was last criticised for will oscillate between them across releases.

---

## 7. DO / DON'T

**Do.** Run the comparative checks in §5 by literally placing this release's hero beside the last one. Six of the twenty-two are invisible in isolation and obvious side by side, and the comparison takes under a minute. It is the only detection method in this chapter that finds failures nobody made.

**Don't.** Treat this catalogue as complete. It is predictive, not observed (§1), and its most likely error is not a wrong entry but a missing one — a failure mode nobody anticipated, which will look like a fresh reasonable decision until it is named. When one is found, add it; when a listed entry never occurs across several years, remove it rather than preserving it for symmetry.

---

## 8. ACCEPTANCE CRITERIA

- [ ] No Tier One anti-pattern is present. *(§2)*
- [ ] No Tier Two anti-pattern is present. *(§3)*
- [ ] The comparative checks in §5 have been run against the previous release. *(§5)*
- [ ] Both anti-model checklists in §6 have been run, not only the one recently criticised. *(§6)*
- [ ] Exception count per principle is zero or one, with any exception documented. *(AP-22)*
- [ ] The quarterly full sweep is scheduled and has an owner. *(§5)*
- [ ] Newly observed failures have been added to this catalogue with their detection method. *(§7)*

---

## 9. CROSS REFERENCES

Every chapter of this Bible is an origin for at least one entry; the origin citations above are the routing index. See also Chapter 32 (the governance this catalogue protects), Chapter 34 (the checklist that operationalises it), Appendix A (the principle registry). Design System Bible Ch. 68. Constitution Ch. 67. Master Vision Ch. 27. ADR-0008.

---

## 10. STATUS

Restated because it governs how this chapter should be read: **this is a predictive catalogue.** Its sibling libraries make the same disclosure for the same reason — an anti-pattern library earns its authority from production incidents, and this one has none yet. Treat the entries as hypotheses with reasoning attached, and expect the first year of real use to reorder the severity tiers.

**Most likely wrong.** The Tier Three ordering is the least defensible part: the ten corrosive entries are listed in roughly the order they were derived rather than by observed frequency, because no frequency data exists. If any one of them turns out to be the dominant real-world failure, it belongs in Tier Two.

---

*End of Chapter 33. Chapter 34 is the instrument everything in this Bible has been building toward.*
