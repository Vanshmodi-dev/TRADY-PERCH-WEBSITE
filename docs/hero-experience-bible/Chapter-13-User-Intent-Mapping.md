# CHAPTER 13 — USER INTENT MAPPING

**Trady Perch Hero Experience Bible · Part IV: Intent, Goals & Hierarchy**
*First-canonical-draft. Implementation-independent.*

**Inherited From:** Master Vision §5.1, §11.2, §2.3, target verticals. UX Blueprint Ch. 56.
**Governs:** Who arrives, in what state, with what question — and how one hero serves all of them without adapting to any.
**Does Not Govern:** Demographic personas (none exist in the source, deliberately) or lead qualification after the hero.

---

## 1. THE POSITION

No formal personas appear in this brand's source documents. This chapter does not invent them. A fictional "Maria the Ops Manager" would produce a character whose preferences get cited in design arguments as though they were evidence — worse than no persona at all.

What the source *does* supply is more useful: a buyer psychology, a question sequence (§11.2), and a trust ordering (§2.3). From those, intent can be mapped without inventing people. **The unit of analysis is intent, not identity** — the same person arrives with different intents on different days.

**One hero, five intents, no adaptation.** The obvious response is to adapt: detect the referrer, personalise the headline, vary the CTA. Declined for three reasons. **Consistency is the brand asset** (Pa-5) — a buyer arriving twice from two sources would see two companies. **The forwarded link breaks it** — personalisation targeted at the sender arrives at a recipient it was not built for. **It is a capability signal pointing the wrong way** — detected personalisation reads as tracking.

The constraint this imposes: **the hero must be simultaneously sufficient for the least-prepared intent and non-obstructive for the most-prepared one.** Achievable — it is what a specific, self-contained, fast-to-skip claim looks like — but only if all five are designed for at once.

```
  INTENT                     ARRIVES AT         HERO MUST STILL DO
  Cold Skeptic          ──►  State 1 (Guarded)  ──►  everything
  Comparison Shopper    ──►  State 1–2          ──►  differentiate, fast
  Referred Evaluator    ──►  State 2–3          ──►  confirm the referral
  Returning Decider     ──►  State 3–4          ──►  not get in the way
  Wrong Audience        ──►  State 1            ──►  disqualify cleanly
```

The hero must be *complete* for the cold skeptic and *transparent* for the returning decider — compatible only if it is fast, self-contained, and free of anything that must be waited through. Which is why the intro's once-per-session, always-interruptible rule is load-bearing rather than decorative.

---

## 2. THE FIVE INTENTS

**1 — THE COLD SKEPTIC.** From search, a directory, an outbound message. Full guardedness; often under five seconds before a bounce decision. *Question:* "Is this worth any of my time?" *Must do:* everything — the primary design target, because a hero sufficient for it is nearly sufficient for the others. *Fails them:* ceremony delaying comprehension, abstraction, anything requiring interpretation, any eagerness signal.

**2 — THE COMPARISON SHOPPER.** From a shortlist, three to five tabs open. Analytical, high pattern sensitivity; first heuristic is *which of these is not like the others*. *Question:* "How is this different from the other four?" *Must do:* be legibly different within the first second — where every competitor is loud, achieved by being quiet — then be specific enough that the difference has content. *Fails them:* any category convention; a hero that looks like the other four tabs has lost regardless of what it says. *Success:* the tab stays open. This intent rarely converts on a first pass, which makes Hp-6 load-bearing.

**3 — THE REFERRED EVALUATOR.** From a recommendation — the strongest inbound intent. Borrowed trust, conditionally: they are checking whether the referral was sound, and a mismatch costs more than a cold visitor's disappointment because it also damages the referrer. *Question:* "Does this match what I was told?" *Must do:* confirm rather than convince — the claim must be recognisably the thing their contact described. *Fails them:* a hero more abstract than the human description. If a peer said "they built a thing that qualifies our inbound leads automatically" and the hero says "intelligent systems for the modern enterprise," the referral has been contradicted.

**4 — THE RETURNING DECIDER.** Second, third, or fifth visit; frequently accompanied by the colleague they must convince. They do not need the claim explained; they need to get somewhere, or show someone something. *Question:* "Can I get to what I need — and does this hold up with someone watching?" *Must do:* get out of the way and remain worth showing. The intro must not replay; nav must be available; the hero must be exactly as good on the fifth viewing as the first, because this is the viewing where money is decided.

**5 — THE WRONG AUDIENCE.** A job seeker, student, competitor, or business too small for the engagement model. *Must do:* let them self-identify as out of scope, quickly and without friction. **A success condition, not a failure** — the positioning depends on the site not being for everyone, and unqualified leads consume the most expensive resource the business has. *Fails them (and the business):* a hero broad enough to be plausible for everyone. Every generic phrase that keeps this intent engaged also weakens Intent 3's recognition and Intent 2's differentiation.

---

## 3. INTENT × HERO OBLIGATION MATRIX

A property failing any intent is a defect, not a trade-off.

| Hero property | Cold Skeptic | Comparison Shopper | Referred Evaluator | Returning Decider | Wrong Audience |
|---|---|---|---|---|---|
| **Claim comprehensible in one read** | Essential | Essential | Essential | Neutral | Essential (to self-disqualify) |
| **Claim specific to an outcome** | Essential | Essential — the differentiator | Essential — must match the referral | Neutral | Essential |
| **Visually unlike the category** | Helps | **Decisive** | Helps | Neutral | Neutral |
| **Intro plays once per session** | Tolerable once | Tolerable once | Tolerable once | **Essential** | Neutral |
| **Intro interruptible** | **Essential** | **Essential** | Helps | **Essential** | Helps |
| **Nav immediately available** | Low value | Moderate | Moderate | **Essential** | Helps |
| **Single CTA, low-pressure label** | Essential | Helps | Essential | Essential | Neutral |
| **No urgency or scarcity** | **Essential** | Essential | Essential | Essential | Neutral |
| **Survives a fifth viewing** | Neutral | **Essential** | Helps | **Essential** | Neutral |
| **Holds up when forwarded cold** | Neutral | Helps | **Essential** | **Essential** | Neutral |
| **Loads fast on a poor connection** | **Essential** | Essential | Essential | Essential | Neutral |

**Two properties are essential or decisive for four of five intents:** a specific, one-read claim, and an interruptible, once-per-session ceremony. The highest-leverage hero decisions in this Bible, and neither is visual.

**The matrix's real function** is catching proposals that serve one intent at another's expense. Auto-expanding a demo in the hero serves the Comparison Shopper and damages the Cold Skeptic and Returning Decider — three columns must be checked before that trade is legible.

---

## 4. CORE PRINCIPLES

**Ui-1 — Design for the Cold Skeptic; verify against all five.** Intent 1 requires most and tolerates least. A hero sufficient for it is nearly sufficient for the others, and the residual gaps are additive rather than contradictory. Designing for a more prepared intent produces a hero that fails the least prepared one — unrecoverable. *The others are verification-critical; §3 is not optional.*

**Ui-2 — Disqualification is a feature.** A non-fit visitor must recognise the mismatch quickly, and the hero must not widen to retain them. Breadth is expensive in three currencies: specificity (which Intents 2 and 3 need), sales time downstream, and the positioning the whole site rests on. *Clean disqualification is a courtesy — it saves the visitor time too.*

**Ui-3 — No adaptation by source.** The hero does not vary by referrer, campaign, geography, or detected attribute. *A dedicated campaign landing page is a different page, governed separately. Genuine localisation is an internationalisation question, not adaptation.*

**Ui-4 — Serve the second viewer.** The hero is designed to be forwarded — self-sufficient, context-free, unembarrassing to send. The second viewer is most likely to hold budget authority and least likely to have context.

---

## 5. WHAT THE SOURCE DOES NOT TELL US

- **No demographic personas exist.** None are invented here.
- **No traffic-mix data exists.** The relative proportion of the five intents is unknown. Ui-1's ordering is reasoned from *requirement severity*, not volume — it holds even if cold visitors are a minority, because they are the constraint.
- **No qualification criteria exist.** What makes a business "established" enough is undefined, limiting how precisely Intent 5 can be disqualified.
- **The seven verticals are named but not prioritised.** Whether the qualifier should reference verticals is a copy decision (Ch. 18) constrained by the four-chunk budget.

---

## 6. DO / DON'T

**Do.** Write the qualifier so a business outside the engagement model can tell within one read, and let them leave. The same specificity that disqualifies Intent 5 makes Intent 3 recognise their referral and Intent 2 see a difference. One sentence, three jobs — and the alternative does the reverse three times over.

**Don't.** Personalise by referral source. It fails Ui-3, breaks the moment a link is forwarded, damages the consistency carrying institutional credibility, and introduces a defect class that is nearly impossible to review because no reviewer sees all variants. When a distinct message is genuinely needed, build a distinct page.

---

## 7. ANTI-PATTERNS

**Persona fiction.** Inventing named personas to settle arguments, then citing them as evidence. Detected when a review invokes a persona's preference no research supports. Fixed by returning to §11.2's question sequence — the actual inherited artefact.

**Breadth creep.** Widening the claim one review at a time so no visitor is excluded. Detected by re-running §16.2's specificity test at every release. Dangerous because each widening is defended with a true statement ("we could also help that kind of business"), and the aggregate addresses nobody.

**Optimising for the wrong column.** Tuning for the intent easiest to measure — usually the Comparison Shopper — at the expense of the Cold Skeptic, whose failures appear only as an undifferentiated bounce. Detected by checking whether a change improves any column other than the one it was made for.

---

## 8. ACCEPTANCE CRITERIA

- [ ] §3's matrix completed, all five columns. *(Ui-1)*
- [ ] No property fails any intent column. *(§3)*
- [ ] A non-fit visitor can self-disqualify within one read. *(Ui-2)*
- [ ] The hero does not vary by referrer, campaign, or detected attribute. *(Ui-3)*
- [ ] Tested as a cold forwarded link with no context. *(Ui-4)*
- [ ] The intro does not replay within a session and is interruptible at every beat. *(§3)*
- [ ] No persona invented to justify a decision. *(§7)*
- [ ] Claim specificity re-tested against §16.2 at this release. *(§7)*

---

## 9. CROSS REFERENCES

Ch. 5 (arrival states) · Ch. 6 (the returning-visitor variant) · Ch. 12 (the forwarded-hero requirement) · Ch. 14 · Ch. 17 · Ch. 18 · Ch. 32. Master Vision §2.3, §5.1, §9.5, §11.2, §16.2. UX Blueprint Ch. 56.

---

## 10. STATUS

The five intents are derived from Master Vision's buyer psychology, not observed traffic. A reasoned partition, almost certainly incomplete — the most likely missing one is the *procurement or technical evaluator* brought in later to assess the vendor. Not added because nothing in the source describes it, and a speculative sixth column would dilute the matrix's authority.

§5's gaps close only with real analytics and qualification criteria. When they exist, Ui-1's ordering should be re-examined — not because volume should override requirement severity, but because a large unmodelled intent is worth knowing about.

---

*End of Chapter 13. Chapter 14 converts the mission and these intents into a ranked goal stack — including the anti-goals, which most briefs omit.*
