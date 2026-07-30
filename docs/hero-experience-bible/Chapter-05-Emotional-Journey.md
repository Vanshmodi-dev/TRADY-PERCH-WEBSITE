# CHAPTER 5 — EMOTIONAL JOURNEY

**Trady Perch Hero Experience Bible · Part I: Philosophy & Psychology**
*First-canonical-draft. Implementation-independent.*

**Inherited From:** Master Vision §4.3, §5.1, §9.2, §9.5, §16.3, Ch. 27. UX Blueprint Ch. 5 & 16 (peak-end), Ch. 8.
**Governs:** The state the visitor arrives in, the states the hero moves them through, the states forbidden.
**Does Not Govern:** The homepage's wider emotional arc or the post-conversion relationship.

---

## 1. THE POSITION

**The visitor does not arrive neutral. They arrive guarded.**

§5.1 describes a purchase "often requiring the buyer to convince a colleague or a partner before committing, with a genuine and reasonable fear of a bad outcome if they choose the wrong partner." That fear precedes the page load. They are not browsing — they are screening, looking for a reason to close the tab, because closing tabs is how a busy person manages a shortlist.

A hero designed for a neutral visitor tries to *raise* emotion. A hero for a guarded one must first *lower* it. Those designs look nothing alike, and building the first when the audience is the second is the most consequential emotional error available.

```
 AROUSAL
   ▲  ●  Guarded / screening      ← arrival (T+0)
   │   ╲
   │    ● Disarmed                ← the hero's first job (T+0.4–3s)
   │     ╲╱
   │      ●  Oriented             ← comprehension (T+3–6s)
   │       ╲
   │        ●── Recognised        ← "that's my problem" (T+6–10s)
   │             ╲
   │              ●── Confident   ← willing to continue (T+10–15s)
   │                  ╲▼ scroll, with intent
   └───────────────────────────────────────────► TIME
```

Note what is absent: any peak. Ch. 5 requires the arc to "deliberately name which moments are allowed to be peaks" — **the hero is not one.** Its signature is the *removal* of resistance, felt as relief rather than arousal, and relief is a more durable foundation for a large purchase than excitement.

**Relief is the hero's actual product.** A guarded evaluator arrives suspecting another vendor overselling, another site taking three minutes to say what it does. A hero that immediately and specifically says what the company does — without performing, overselling, or asking for anything first — produces a distinct internal event. Not excitement. Closer to *"oh, good."* That release is the strongest emotional asset available here, invisible in any engagement metric, and destroyed by a single eager gesture.

| Forbidden | Why | Typical cause |
|---|---|---|
| **Excitement** | Decays leaving nothing; signals being sold to, reactivating guardedness | Bold claims, energetic motion, superlatives |
| **Urgency** | Permanently prohibited (§5.5); correctly identified as manipulation | Countdowns, scarcity |
| **Awe** | Directs attention at the design; "impressive, not inevitable" | Spectacle, elaborate 3D, dramatic reveals |
| **Amusement** | §2.2 forbids playful/cute; humour signals a consumer product | Clever copy, characters, winking microcopy |
| **Anxiety** | The buyer has enough; adding drives them to a calmer competitor | Problem-agitation copy, warning colours |
| **Confusion** | The most expensive state (Cg-4); converts a screener into a leaver | Ambiguity, jargon, an unresolved abstract visual |
| **Obligation** | Reciprocity pressure is a dark pattern; produces compliance, not confidence | Gated content, "free" offers with implied debt |

Four of the seven are *positive* emotions. That is the least intuitive point here: a hero can fail by producing a good feeling of the wrong kind. Excitement is not partial credit on the way to confidence — it is a different road.

---

## 2. CORE PRINCIPLES

**Ej-1 — Assume guardedness, never neutrality.** Every decision is evaluated against a visitor who arrived skeptical and time-pressured. The guarded visitor is also the *valuable* one; designing for them serves both, designing for the curious case serves one. *Guarded is provisionally unconvinced, not hostile — treating the visitor as hostile produces defensive, over-explaining copy.*

**Ej-2 — Lower before raising.** The first obligation is reducing resistance; nothing may be built until it has. Any persuasive move made while guardedness is elevated is processed as a sales tactic and *increases* resistance. *Resistance is lowered by competence and directness, not softness.*

**Ej-3 — Relief over delight.** Where the two conflict, choose relief. Relief is the signature of a burden lifted — precisely what this company sells. A hero producing relief is *isomorphic to the product*; one producing delight talks about something not being sold. *Exception: the intro is permitted a single note of "a controlled, adult version of delight" (§9.2), because it happens once, is skippable, and ends before the evaluative window fully opens.*

**Ej-4 — No manufactured emotion.** The hero may not produce a feeling the underlying reality does not justify. Manufactured emotion is detectable — usually as a vague sense that something is off — and once detected it retroactively discredits every honest signal nearby, exactly as a fabricated loading delay does.

**Ej-5 — The hero owns its emotional handoff.** It is accountable for the state it delivers the visitor in, not the state at its own peak. A hero producing confidence at second eight and irritating at second fourteen — a scroll-hijack, an unexpected animation, a chat widget — hands off irritation, and the next section inherits it.

---

## 3. THE FIVE STATES

**1 — GUARDED** *(T+0)* — impatience with a defensive edge. Inherited, not produced by the hero. **Obligation:** do nothing that confirms the suspicion. **Failure:** any unearned delay. The intro is the sole sanctioned one, because it is once-per-session, interruptible, and brief.

**2 — DISARMED** *(T+0.4–3s)* — an unnoticed relaxation: *"okay — this isn't going to be that."* Produced by stillness before motion, absence of a popup, absence of a claim, a surface evidently made rather than assembled. **Obligation: withhold** — the only state produced almost entirely by *not doing things*. **Failure:** any eager gesture; a single exclamation mark can return the visitor to State 1.

**3 — ORIENTED** *(T+3–6s)* — *"Right — automation for established businesses. Got it."* **Obligation:** deliver the dominant idea unambiguously, in the buyer's vocabulary. **Failure:** jargon; abstraction; cleverness requiring a second read; a headline describing a category rather than an outcome.

**4 — RECOGNISED** *(T+6–10s)* — the shift from evaluating to relating: *"that's the thing that eats my Thursdays."* **Obligation:** be specific enough that the right visitor recognises themselves and the wrong one recognises they are not the audience. **Failure:** phrasing that could describe any business — recognition and specificity are the same variable.

**5 — CONFIDENT** *(T+10–15s)* — provisional willingness: *"these people might be worth twenty minutes."* **Obligation: do not spend it.** Confidence at second fifteen is permission to continue, not a conversion trigger. **Failure:** cashing in early with an aggressive ask, or losing it to a scroll-hijack or unsolicited widget.

---

## 4. EMOTIONAL PROGRESS MATRIX

| Observed behaviour | Stalled at | Probable cause | Owner |
|---|---|---|---|
| Immediate bounce (<3s) | 1 → 2 | Load failure; interstitial; instant eagerness | Ch. 29, 3 |
| Reads, then bounces (3–8s) | 2 → 3 | Claim not comprehensible in one read | Ch. 15, 18 |
| Comprehends, then bounces | 3 → 4 | Claim is generic; cannot locate themselves | Ch. 13, 18 |
| Scrolls fast, skimming | 4 → 5 | Recognition achieved, confidence not | Ch. 17, 2 |
| Scrolls back up to re-read | 3 incomplete | Ambiguity — comprehension failed, interest survived | Ch. 4, 15 |
| Hovers CTA, doesn't click, scrolls | 5 reached; ask premature | **Correct behaviour, not a failure** | Ch. 27 |
| Returns later, straight to CTA | Arc complete | Success condition | — |

On row 6: treating that as a conversion failure and responding with pressure is how a governed hero becomes ungoverned (Ms-1).

---

## 5. THE EMOTIONAL BUDGET OF SILENCE

§9.2 opens the intro on deliberate silence. Conventionally this is indefensible — it delays content, costs measurably in lab metrics (ADR-0008), and gives the visitor nothing.

Emotionally it does precise work. Silence at T+0 is the one signal a template cannot fake: a company demonstrating it will spend its most valuable moment on nothing at all. Every competitor fills that moment, because filling it is what an anxious surface does. The pause is a status signal in the same family as the gold bezel — value visible in what is *not* used.

It is bounded by three inherited constraints: **once per session**, **always interruptible**, and under `prefers-reduced-motion` **replaced by an instant static presentation** rather than shortened (§9.5, Mt-4). Silence that repeats is not composure but an obstacle, and the third viewing converts the whole signal into irritation (Hp-6).

---

## 6. DO / DON'T

**Do.** Design the first three seconds around what is *withheld* — no popup, no claim, no immediate ask, no motion until the sequence's own first beat. State 2 is the only state produced primarily by restraint, and it is load-bearing: the states above it cannot be reached from State 1 directly.

**Don't.** Open with problem-agitation ("Your team is drowning in manual data entry"). It is a State 1 amplifier: it raises anxiety in an already-anxious visitor, positions the company as pressing on a wound rather than removing a burden, and violates Ej-2 by building before lowering. §16.3 does place concrete pain language on the page — in *Problems We Solve*, after the hero has established composure. The sequencing is the design.

---

## 7. ANTI-PATTERNS

**Emotional front-loading.** Trying to produce the visit's peak in the hero because it has the most traffic. Detected by asking what feeling the hero is designed to produce; a high-arousal answer is this. Peak-end reasoning means a peak in the hero *lowers* the perceived quality of everything after — the remembered high point occurs before any evidence, and the rest reads as decline.

**Delight substitution.** Adding a charming micro-interaction to a hero failing at comprehension. Detected when reviewers remember an interactive detail and still cannot say what the company does.

**Skipping State 4.** Going from oriented straight to a CTA with no moment of recognition. Detected by asking whether a *specific* type of business would see themselves, or merely understand. Produces heroes that test well for clarity and convert poorly.

---

## 8. ACCEPTANCE CRITERIA

- [ ] The arc is written as five named states with the evidence producing each. *(§3)*
- [ ] No element is intended to produce a forbidden state. *(§1)*
- [ ] The first three seconds are describable in terms of what is withheld. *(Ej-2)*
- [ ] The hero is specific enough that a named target vertical recognises itself. *(State 4)*
- [ ] The final seconds and the scroll out contain nothing that could irritate. *(Ej-5)*
- [ ] The intro's silence is once-per-session, interruptible, static under reduced motion. *(§5)*
- [ ] No emotional claim exceeds what the page below substantiates. *(Ej-4, Ms-2)*
- [ ] Hover-without-click documented as expected, not a defect. *(§4)*

---

## 9. CROSS REFERENCES

Ch. 1 (the scroll as conversion event) · Ch. 2 (restraint as State 2's mechanism) · Ch. 3 (eagerness as State 2's destroyer) · Ch. 6 (these states on a clock) · Ch. 13 · Ch. 16 · Ch. 17 · Ch. 27. Master Vision §4.3, §5.1, §5.5, §9.2, §9.5, §16.3, Ch. 27. UX Blueprint Ch. 5, Ch. 8, Ch. 16. ADR-0008.

---

## 10. STATUS

The five-state ladder and its timings are a reasoned model — no session recordings, eye-tracking, or interview data exist. The *ordering* rests on solid ground (resistance must fall before persuasion lands; recognition requires specificity); the *timings* are inherited from Chapter 6 and carry its caveats. §4 maps behaviours to states by inference and should be validated against real analytics before justifying a significant change.

The arc assumes a first-time, cold or lightly-referred visitor. A strongly referred one may begin at State 3 or 4. Chapter 13 maps the variants; whether the hero should ever *adapt* is deliberately unresolved, since adaptive heroes introduce a consistency risk not yet weighed against the benefit.

---

*End of Part I. Part II places everything so far on a clock.*
