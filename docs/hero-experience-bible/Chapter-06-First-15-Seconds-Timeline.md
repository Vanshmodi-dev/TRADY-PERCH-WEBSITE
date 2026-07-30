# CHAPTER 6 — THE FIRST 15 SECONDS TIMELINE

**Trady Perch Hero Experience Bible · Part II: The First Fifteen Seconds**
*First-canonical-draft. Implementation-independent.*

**Inherited From:** Master Vision §9.2 (the intro's seven beats), §9.5, §11.2. Design System Bible Ch. 15 (Mt-3, Mt-4), Ch. 40 (Ag-2).
**Governs:** What must be true at every point in the first fifteen seconds, for every entry condition, and how it is verified.
**Does Not Govern:** Millisecond values. The structure below is a psychological schedule, not an animation spec.

---

## 1. TWO CAUTIONS

**The window is a budget, not a script.** Most visitors decide in three seconds. Fifteen is the outer edge of the hero's jurisdiction, not a duration to consume.

**The timings are psychological, not technical.** "T+3s" does not mean an animation fires at 3000ms. It means that by roughly three seconds, a specific thing must *already have happened* — frequently much earlier. **The timeline states deadlines, not cues.**

---

## 2. THE FIVE PHASES

```
 T+0      0.4s            3s            6s           10s          15s
  │────────│──────────────│─────────────│────────────│────────────│
  │PHASE 1 │   PHASE 2    │  PHASE 3    │  PHASE 4   │  PHASE 5   │
  │ PRE-   │ CEREMONIAL   │ORIENTATION  │COMPREHEN-  │DELIBERATION│
  │ATTENT. │              │             │   SION     │            │
  │Verdict │ Personality  │"What is     │"Is this    │"Do I keep  │
  │on      │ transmitted  │ this?"      │ for me?"   │ going?"    │
  │serious-│  System 1    │  System 1   │ System 1→2 │  System 2  │
  │ness    │              │             │            │            │
  │GUARDED │  DISARMED    │  ORIENTED   │ RECOGNISED │ CONFIDENT  │
  │Ch.7,29 │Ch.3,21,23,24 │Ch.15,18,19  │ Ch.13,17   │ Ch.16,27   │
  └────────┴──────────────┴─────────────┴────────────┴────────────┘
      ▲ failure here cannot be recovered later
```

**Phase 1 — PRE-ATTENTIVE (0 → 0.4s).** Nothing is read. A whole-field impression forms — luminance, clutter, whether anything moves, whether the page is stable — and a verdict on seriousness is returned. *By its end:* something has painted; nothing has shifted; nothing has demanded a decision; the field reads as composed even out of focus.

**Phase 2 — CEREMONIAL (0.4 → 3s).** Personality is transmitted, almost entirely non-verbally. On a first visit this is where §9.2's intro sits — silence, golden line ignition, metallic reflection sweep, wordmark, tagline, held pause, dissolve. *Throughout:* one thing happening at a time; every motion decelerating generously; interruptible at every moment and honoured immediately, not queued to the end of a beat; the hero content beneath already server-rendered. **The overlap rule:** Phases 2 and 3 must not be strictly sequential — the claim must be *available* in the DOM, in the accessibility tree, and behind at most one gesture, from the earliest possible moment.

**Phase 3 — ORIENTATION (3 → 6s).** The claim is read. *By its end:* the visitor can state what the company does, on **one** read, without jargon, with nothing competing for attention.

**Phase 4 — COMPREHENSION (6 → 10s).** The visitor locates themselves; the slow system engages. *By its end:* a visitor in a target vertical recognises their situation; one outside it recognises they are outside it — **a success, not a failure**; no claim has been made the page cannot substantiate.

**Phase 5 — DELIBERATION (10 → 15s).** The decision being made is **to scroll, not to click**. *By its end:* the next action's cost is honestly implied; nothing has appeared uninvited; the scroll out is unmodified.

---

## 3. THE SECOND-BY-SECOND TABLE

Read the deadline column as *"by this point, this must already be true."*

| Time | Visitor's state | Deadline | Failure if missed |
|---|---|---|---|
| **0.0** | Attention not committed | Server-rendered content in the response; no client-only gate on the claim | Content invisible on a skipped or reduced-motion path |
| **0.2** | Luminance and clutter assessed | Field dark, quiet, uncluttered; focal structure legible when blurred | Reads as busy, or as a template |
| **0.4** | **Verdict returned** | All the above; nothing shifted; no dialog intruded | **Unrecoverable** — later evidence is read through this verdict |
| **0.5** | First motion permitted | Motion single, decelerating, diegetic | Twitchiness reads as anxiety |
| **1.0** | Personality inferred | One thing moving; generous easing; nothing pulsing | Composure lost |
| **1.5** | Material and light assessed | Material legible; single dominant light source | Reads as generic dark mode |
| **2.0** | Attention available for language | Claim rendered and stable, or one gesture away | Ceremony overruns its welcome |
| **2.5** | Impatience threshold near | Any ceremony visibly resolving | Delay stops reading as composure, starts reading as obstruction |
| **3.0** | **Reading begins** | Claim legible, unobstructed, uncompeted-with | Comprehension deferred, compressing everything after |
| **4.0** | Parsing | Comprehensible in one read; no jargon; no cleverness tax | Second read — credibility cost |
| **5.0** | Claim resolved | Visitor could paraphrase it | **The most common total failure** |
| **6.0** | **Self-location begins** | Qualifier present and specific | Understands but does not care |
| **7.0** | Matching own situation | Buyer's vocabulary, not the vendor's | Reads as generic |
| **8.0** | Skepticism re-engages | Nothing overclaimed; no unsupported superlative | Active discounting; prior signals re-evaluated down |
| **9.0** | Scanning for the catch | No urgency, scarcity, gate, or price bait | Manipulation detected — near-total trust loss |
| **10.0** | **Next action assessed** | Single CTA, honestly labelled, cost implied | CTA read twice, unclicked |
| **11.0** | Weighing continuation | Depth below implied, not dumped in | "Nothing here" or "too much here" |
| **12.0** | Scroll intent forming | Nothing has appeared uninvited | Irritation at the handoff |
| **13.0** | Scroll begins | Native scroll — no hijack, snap, or forced pause | Loss of control |
| **14.0** | Hero leaving viewport | No farewell animation, no sticky remnant | Reads as reluctance to let go |
| **15.0** | **Jurisdiction ends** | Visitor in State 5, reading the next section | Bounce, or scroll without intent |

---

## 4. VARIANT TIMELINES

The table describes one visitor: first-visit, desktop, full motion, fast connection, mouse — a minority of real traffic. **Each variant is a first impression in its own right.**

**4.1 Returning visitor, same session.** The intro does not run (§9.5); Phase 2 is skipped and orientation completes ~2.5s earlier. *Obligation:* the hero must be **complete and correct** without the ceremony. A hero whose emotional weight is carried by the intro reads flat on the second visit — the visit where a decision is likelier.

**4.2 Reduced motion.** Mt-4 specifies the Ceremonial companion as **full static presentation, no animation** — not a shortened sequence; §9.5 requires the content still be delivered. *Obligation:* the personality Phase 2 transmits through motion must be carried by material, light, type, and space. A reduced-motion hero that is the animated hero with the animation deleted has transmitted nothing. (ADR-0009 records the related question of reduced motion as the sole degradation signal for weak hardware.)

**4.3 Mobile.** Phases hold; durations compress: Phase 2 to 0.4–2s (higher interruption risk), Phase 3 to 2–5s (less visible at once), Phase 4 to 5–9s (thumb-driven scroll momentum). Phases 1 and 5 are unchanged — pre-attentive processing and decision speed are not device-dependent.

**4.4 Slow connection.** Phases do not stretch — **patience does not scale with bandwidth.** *Obligation:* the claim is in the first meaningful paint, not behind a font, image, or hydration step. May arrive late, in order: ambient material, the ceremony, the CTA's visual treatment. May never arrive late: the claim, the CTA's presence, layout stability.

**4.5 Keyboard-first.** The first `Tab` is a first impression, typically at T+2–5s. *Obligation:* first focusable element predictable and visibly focused; focus never trapped by the intro; the sequence skippable from the keyboard with the same affordance a pointer user has.

**4.6 Screen reader.** The timeline is linguistic; ordering is set by the DOM. *Obligation:* reading order delivers claim → qualifier → action. A decorative element announced before the claim is the accessibility equivalent of a full-screen interstitial.

---

## 5. CORE PRINCIPLES

**Fs-1 — Phase 1 is unrecoverable.** Thin-slice judgments form fast and are then defended: later evidence is interpreted *through* the verdict, not weighed against it. A hero that shifts at T+0.2 and presents excellent content at T+4 reads as excellent content made by a careless team. *Not a pure performance rule — a stable, fast, cluttered hero fails Phase 1 just as completely.*

**Fs-2 — Ceremony is borrowed time and must be repaid.** Any moment withholding information must be repaid with personality that could not have been transmitted otherwise. ADR-0008 accepted a real, measured performance cost to preserve §9.2's pacing, explicitly because it is a deliberate brand moment rather than a fixable delay. That trade is defensible only while the moment delivers; a ceremony that has become decorative is no longer paying its debt, and the ADR's reasoning stops protecting it.

**Fs-3 — Every variant is a first impression.** Reduced motion, returning visits, keyboard, screen reader, and slow connections are each complete first impressions held to the full standard. A visitor with `prefers-reduced-motion` has not opted into a lesser brand; they have opted out of movement. Ch. 88's curb-cut reasoning adds that these paths serve far more people than their nominal audience. *They will differ; each must be complete.*

**Fs-4 — The claim is never gated.** It must be in the initial server response and reachable within one gesture at any moment. Gating it behind an animation phase, a client state machine, or a hydration boundary means every degraded path experiences an empty hero. ADR-0008 records a real instance where an element was kept out of the DOM until a client check resolved, at substantial measured cost. *The intro may cover the claim visually; it may not prevent the claim from existing.*

**Fs-5 — The exit belongs to the visitor.** Nothing may modify, delay, or interpret the scroll. Intercepting it — hijacking, snapping, pinning, resisting — converts confidence into irritation in under a second, at the moment the hero's work is being banked.

---

## 6. VERIFICATION PROTOCOL

1. **The 400ms blur test.** Capture at 400ms, blur heavily, show for one second. Pass: "serious / composed / considered." Fail: "busy," "generic," "blank," or naming a template.
2. **The five-second paraphrase.** Show for five seconds, hide, ask what the company does. Pass: accurate paraphrase in their own words. Fail: verbatim recitation without comprehension, or "I'd need longer."
3. **The skip test.** Interrupt at each beat. Pass: honoured immediately, hero complete underneath, no inconsistent state.
4. **The variant sweep.** Run 1–3 on every variant in §4, independently. Record results; do not infer them.
5. **The second-visit test.** Reload within session. Pass: emotionally complete without the intro; the intro does not replay.
6. **The exit test.** Scroll out slow, natural, fast. Pass: unmodified at all three; nothing appears uninvited; nothing pins.

---

## 7. DO / DON'T

**Do.** Render the claim, qualifier, and CTA in the initial server response, and let the ceremony sit *above* them as an overlay that dissolves — so skipping, reduced motion, a JS failure, a screen reader, and a slow connection all converge on a complete hero, immediately. One architectural decision satisfies Fs-3, Fs-4, and four of the six variants.

**Don't.** Treat the window as a duration to fill — adding a beat, a scroll-triggered reveal, or a delayed entrance at T+6 because there is "dead air." Each spends attention Phases 3 and 4 need. This is a deadline structure; finishing early is the intended outcome.

---

## 8. ANTI-PATTERNS

**The ceremony that grew.** Beats accumulating until the pre-comprehension delay exceeds what personality transmission repays. Detected by measuring total time-to-claim across releases, not by reviewing each addition. Fixed by re-deriving from §9.2's seven beats.

**Variant as afterthought.** Building the full-motion desktop path and deriving the rest by subtraction. Detected by asking what personality the reduced-motion hero transmits; "less" means it was derived. Fixed by designing the static path first — the constraint improves the animated version, and the reverse is not true.

**Timeline theatre.** Treating §3's markers as animation cues. Detected by finding a delay whose only justification is a table row. A hero finishing Phase 3 at T+1.5 has excelled, not failed.

---

## 9. ACCEPTANCE CRITERIA

- [ ] All six tests in §6 run and recorded, not assumed. *(§6)*
- [ ] The claim exists in the initial server response. *(Fs-4)*
- [ ] Nothing shifts after first paint under any tested condition. *(Fs-1)*
- [ ] The ceremony is interruptible at every beat, honoured immediately. *(Fs-2)*
- [ ] The reduced-motion path transmits personality statically. *(Fs-3)*
- [ ] The returning-visitor hero is emotionally complete without the intro. *(§4.1)*
- [ ] Scroll out is unmodified at all speeds. *(Fs-5)*
- [ ] Time-to-claim measured per variant and tracked across releases. *(Fs-2)*

---

## 10. CROSS REFERENCES

Ch. 3 (what Phase 2 transmits) · Ch. 4 (load per phase) · Ch. 5 (the states on these phases) · Ch. 7 (Phase 1's mechanism) · Ch. 15 · Ch. 21 · Ch. 28 (variants 4.5–4.6) · Ch. 29 · Ch. 31. Master Vision §9.2, §9.5, §11.2. Design System Bible Ch. 15, Ch. 40. ADR-0008, ADR-0009.

---

## 11. STATUS

**Stated bluntly:** §3's second markers are a reasoned schedule, not an instrumented one. No eye-tracking or comprehension-timing data exists. Well supported: the *phase structure* and its *ordering* — pre-attentive judgment precedes reading; orientation precedes self-location; skepticism re-engages after initial comprehension. This Bible's own construction: the boundaries at 0.4s, 3s, 6s, 10s, and 15s. Treat the ordering as canonical and the numbers as a proposal to validate. §4 and §6 hold regardless.

§9.2's seven beats have no published per-beat timing — Motion Bible Ch. 66 is unwritten. This chapter deliberately does not fill that gap; inventing values would create a conflict the moment that chapter is written.

---

*End of Chapter 6. Chapter 7 explains the mechanism that makes Phase 1 possible — and why the hero cannot choose what the visitor looks at, only what is worth looking at.*
