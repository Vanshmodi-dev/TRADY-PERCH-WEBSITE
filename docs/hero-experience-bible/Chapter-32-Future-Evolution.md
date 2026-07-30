# CHAPTER 32 — FUTURE EVOLUTION

**Trady Perch Hero Experience Bible · Part X: Governance & Endurance**
*First-canonical-draft. Implementation-independent.*

**Inherited From:** Master Vision Ch. 26, Ch. 27 (the Twelve Non-Negotiables). Design System Bible Ch. 65, Ch. 74. Product Implementation Constitution Ch. 62 (ADR standard), Ch. 64, Ch. 68. ADR-0008 (published-correction practice).
**Governs:** How this Bible changes, what it may never change, and how its ideas extend to future surfaces.
**Does Not Govern:** Decision rights, which the sibling documents establish.

---

## 1. THE POSITION

A constitutional document that cannot change becomes a document people work around. One that changes casually was never constitutional.

The pressure on this surface is unlike any other on the site, and **the opinions are not random — they point overwhelmingly in one direction.** Add a badge. Add a second CTA. Add the logo strip. Make the button bigger. Add urgency for the quarter-end push. Try a bolder headline. **Nobody ever asks for less.** The asymmetry is structural, not cultural: additions have advocates and the things they damage — clarity, silence, restraint, focus — do not. A hero without a governance mechanism does not stay minimal; it accretes, one reasonable request at a time, and no individual decision is identifiable as the one that broke it.

**Three tiers of changeability.** Conflating them produces either paralysis or drift.

| Tier | Contains | Who may change it | How |
|---|---|---|---|
| **Inherited** | Anything traceable to Master Vision, the Design System Bible, or the Motion Bible — the gold budget, motion tiers, single-CTA rule, urgency prohibition, material vocabulary | Nobody at the hero level | Amend the source; this Bible follows |
| **Constitutional** | This Bible's own principles and the goal stack ordering | The governance body | §3's procedure |
| **Compositional** | Which element occupies which rung, the composition, copy, spacing, assets | The team building it | Ordinary review against Chapter 34 |

**Most hero changes are compositional and should move quickly.** §3 exists for the second tier, which should be rare. The first tier is not this Bible's to amend at all.

**The Twelve Non-Negotiables are the floor.** Several bind the hero directly: gold is accent-only and never a theme; every section answers a named question and installs a named feeling; every animation is diegetic; no stock photos of generic business people, lightbulbs, or robots; no page launched thin or placeholder; no urgency or pressure tactics; no claim without nearby evidence; no accessibility or performance shortcuts for visual effect; no more than one dominant idea or motion per screen; the intro is shown once and is always interruptible. **These are not amendable by this Bible under any procedure** — a proposal requiring one to break is a brand proposal, not a hero proposal.

**The ten-year question:** *which parts of this hero would look dated in ten years, and which would look merely old?* The distinction is real. A well-set line of type, a convincingly rendered material, a correct focus state, and a specific claim will look *old* in a decade — of their period, less sophisticated than what is then possible. None of that is embarrassing. A trend-derived element looks *dated*, which is different: it identifies the exact eighteen-month window in which the decision was made, and makes everything around it look like it was made then too. The category's current conventions — gradient mesh, particle field, custom cursor, scroll-jacked reveal — are all in the second category, and every one is forbidden elsewhere in this Bible for reasons that converge on durability. **That convergence is not a coincidence:** the properties making an element durable are the same properties making it credible to a skeptical buyer today.

---

## 2. CORE PRINCIPLES

**Fx-1 — Additive pressure is structural and must be countered structurally.** Governance assumes continuous pressure toward addition and is designed to counter that specific bias rather than evaluate proposals neutrally. A neutral process is not neutral in effect when inputs are one-sided: it approves reasonable additions and never generates the corresponding subtractions. Ns-4 and Test 2 correct the asymmetry directly. *Compositional changes should be frequent; the bias correction applies to what is added, not what is improved.*

**Fx-2 — Change the reason, not the rule.** A principle is amended by refuting its reasoning, never by outvoting its conclusion. Every principle here states a reason; if the reason is wrong, the principle should change. If the reason holds and the conclusion is merely inconvenient, the principle stands. *Not an unfalsifiable defence — the opposite: it specifies exactly what would change the rule.*

**Fx-3 — Every change is recorded, including the rejections.** A recorded rejection prevents the same proposal returning quarterly with a new advocate, and preserves the reasoning for the next person with the same reasonable idea. The Constitution's ADR standard is the mechanism for anything substantive. *A rejection record is two sentences and saves the same argument three times.*

**Fx-4 — Trend adoption requires a ten-year answer.** Any element derived from a current convention must state why it will not look dated in a decade. Most trend-derived elements cannot answer this, which is the point — the question is a filter, not a formality. *A hero should look like it was made competently in its era; it should not look like it was made in response to its era.*

**Fx-5 — Corrections are published, not edited away.** When this Bible is wrong, the correction appears alongside the original claim rather than replacing it silently. Inherited practice: ADR-0008 carries exactly such a correction and states its justification — removing an honest correction to look more finished is worse than leaving the original mistake visible alongside its fix.

**Fx-6 — New surfaces inherit the psychology, not the composition.** When the hero's ideas extend to a client dashboard, mobile app, voice interface, or AI-mediated summary, the psychological principles transfer and the compositional decisions do not. *The principles are binding; only their expression varies.*

---

## 3. THE AMENDMENT PROCEDURE

For constitutional changes. Deliberately lightweight; its purpose is a record and a reasoning test, not a delay.

```
  1. STATE THE PRINCIPLE AND ITS REASON
     Quote the principle. Quote its stated reasoning.
        ↓
  2. REFUTE THE REASON
     What has changed, or what was wrong? Evidence preferred;
     argument acceptable; inconvenience insufficient.        (Fx-2)
        ↓
  3. CHECK THE FLOOR
     Does it require breaking a Master Vision non-negotiable,
     or an inherited Design System / Motion Bible rule?
        YES ──► not a hero decision. Escalate.               (§1)
        NO  ▼
  4. TRACE THE DEPENDENTS
     Which chapters cite this principle? (Appendix A)
     What breaks if it changes?
        ↓
  5. DECIDE, AND RECORD BOTH OUTCOMES
     Accepted → amend; add a correction note if the original
     reasoning was wrong (Fx-5); update dependents.
     Rejected → record the proposal and the reason.          (Fx-3)
        ↓
  6. RE-RUN CHAPTER 34
     A constitutional change invalidates prior checklist runs.
```

**Who decides.** This Bible does not invent a governance body. The Design System Bible's Ch. 65 and the Constitution's Ch. 64 define decision rights for their domains, and the hero's constitutional changes route to whichever body those documents establish. Naming a different one here would create a conflict.

---

## 4. THE HERO'S IDEAS ON FUTURE SURFACES

| Surface | What transfers | What does not |
|---|---|---|
| **Client dashboard / portal** | Composure; no eagerness; one dominant idea; correctness at the edges as evidence | The claim/qualifier/CTA hierarchy — an authenticated user needs orientation, not persuasion |
| **Mobile app** | The full sensory language; the interaction contract; the reduced-motion discipline | Ceremonial intro logic — a daily-use app cannot have a once-per-session ceremony |
| **Enterprise / admin dashboard** | Precision, consistency, restraint | Negative-space generosity — density is correct where operators work daily |
| **Voice interface** | The register (composed, precise, no exclamation, no forced warmth); brevity; honest uncertainty | Everything visual |
| **AR / spatial** | Material vocabulary; the fixed lighting logic; the object ceiling | Two-dimensional composition |
| **AI-mediated summary** | The claim's specificity and self-sufficiency; semantic structure; honest description | All presentation |

**On the last row** — the newest and least-discussed surface, and possibly the most consequential. A growing share of first impressions will be formed by an AI system reading this page and summarising it for someone who never sees it — which strips away every channel this Bible spends twenty chapters on and leaves exactly one: **what the claim actually says.**

That is not a reason to change the hero. It is a strong argument that Chapter 18's specificity requirement is the most durable decision in this Bible, because it is the only one surviving complete removal of the presentation layer. A hero whose persuasive force is in its material and timing transmits nothing through that channel; a hero whose force is a specific, honest claim transmits fully.

---

## 5. WHAT MUST NEVER CHANGE

Not because change is forbidden in principle, but because these are inherited from documents this Bible does not govern. Listed so a proposal touching one is routed correctly rather than debated here.

- Gold as accent only, never a theme; the ≤10% ceiling.
- The single-CTA doctrine.
- The permanent prohibition on urgency and scarcity.
- The diegetic requirement for all motion.
- The Ceremonial tier's reservation to the intro sequence alone.
- The intro's once-per-session, always-interruptible, static-under-reduced-motion contract.
- No claim without nearby evidence.
- No accessibility or performance shortcut for visual effect.
- The closed material vocabulary and the closed colour palette.
- The prohibition on robot, lightbulb, and generic-business-people imagery.

---

## 6. DO / DON'T

**Do.** Record rejections with their reasoning, in the same place changes are recorded. It is the single highest-yield governance habit available here: the hero attracts the same handful of proposals repeatedly, from different people, each of whom is reasoning in good faith and none of whom has seen the previous discussion. Two sentences on the record ends a recurring argument permanently.

**Don't.** Amend a principle because it has become inconvenient under a deadline. Fx-2 exists precisely for that moment: the question is not whether the rule is costly now but whether its stated reason still holds. If it does, the cost is the rule working as designed. If it does not, the amendment is legitimate and should be made properly rather than by exception.

---

## 7. ANTI-PATTERNS

**Amendment by exception.** A principle left formally intact while a "one-time" exception is granted, then cited as precedent. Detected by counting exceptions — two to the same principle means the principle has been amended without anyone deciding to. Fixed by either amending properly or refusing the second exception.

**Tier confusion.** Debating an inherited rule at the hero level. Detected by checking §1's table before the discussion starts. It wastes review time and produces decisions the hero has no authority to make.

**Silent correction.** Editing away a claim that turned out to be wrong. Detected by comparing versions. Fx-5's inherited justification applies directly.

**Governance decay.** The procedure observed at first and abandoned as the team gets busy. Detected by the absence of any amendment or rejection record over a period the hero visibly changed — the same signature as Chapter 14's silent trading.

---

## 8. ACCEPTANCE CRITERIA

- [ ] Every proposed change is classified by tier before discussion. *(§1)*
- [ ] Constitutional changes followed §3's six steps, with dependents traced. *(§3)*
- [ ] Every amendment refutes a stated reason rather than outvoting a conclusion. *(Fx-2)*
- [ ] Rejections are recorded with reasoning. *(Fx-3)*
- [ ] Any element referencing a current convention has a written ten-year answer. *(Fx-4)*
- [ ] Corrections appear alongside the original claims, not in place of them. *(Fx-5)*
- [ ] No proposal touching §5's list was debated at the hero level. *(§5)*
- [ ] Chapter 34 re-run after any constitutional change. *(§3, step 6)*

---

## 9. CROSS REFERENCES

Ch. 1 (Ms-5) · Ch. 2 (Test 2; the durability argument) · Ch. 14 (the goal stack this procedure protects) · Ch. 18 (the most durable decision, per §4) · Ch. 20 (Ns-4) · Ch. 33 · Ch. 34 · Appendix A (the dependency trace in step 4). Master Vision Ch. 26, Ch. 27. Design System Bible Ch. 65, Ch. 74. Constitution Ch. 62, Ch. 64, Ch. 68. ADR-0008.

---

## 10. STATUS

This chapter deliberately does not name a governance body, because two sibling documents already define decision rights and inventing a third would create a conflict. That is a real gap in practice: until someone confirms which body owns hero constitutional changes, §3's step 5 has no named owner. Worth resolving at the first amendment rather than in advance.

**Untested by construction.** No amendment has yet been made under this procedure, so its weight is unvalidated. The risk runs both ways — too heavy and it will be bypassed, too light and it will not counter Fx-1's asymmetry. It should be adjusted after the first three real uses, and that adjustment is itself a constitutional change.

---

*End of Chapter 32. Chapter 33 catalogues what this governance exists to keep out.*
