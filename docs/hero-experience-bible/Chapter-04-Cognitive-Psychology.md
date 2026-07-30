# CHAPTER 4 — COGNITIVE PSYCHOLOGY

**Trady Perch Hero Experience Bible · Part I: Philosophy & Psychology**
*First-canonical-draft. Implementation-independent.*

**Inherited From:** UX Blueprint Ch. 4 (Cognitive Load Doctrine), Ch. 23. Master Vision §6.2, Ch. 27.
**Governs:** The processing limits every hero must respect; the load budget and how it is spent.
**Does Not Govern:** What the hero says (Ch. 18), its order (Ch. 15), or how it looks.

---

## 1. THE POSITION

Earlier chapters argued restraint strategically. This chapter supplies the harder floor: **restraint is a physical requirement, because the visitor's processing capacity is small, fixed, and already partly spent before they arrive.** A visitor reaching the hero carries an unfinished thought, an open tab count, and often low-grade irritation at having clicked. The hero gets what is left of their working memory.

**Two systems.** Judgment runs on a fast, automatic mode producing impressions and a slow, effortful mode producing reasoned conclusions. The hero's first eight seconds address the fast system almost entirely: it does not read arguments, it reads surfaces, pattern-matching against every website it has seen. It produces Q3 and Q4 without either being consciously formulated.

The consequence most briefs get backwards: **the hero cannot win an argument, because at the moment it is judged, no argument is being processed.** Arguments are for the sections below. The hero's job is to hand a clean, low-effort impression to the fast system so the slow one is willing to engage at all.

**Fluency as a truth heuristic.** The fast system uses ease-of-processing as a proxy for truth, misattributing the ease to the content. Legibility is therefore a persuasion instrument; a hard-to-parse hero is judged as a *less credible company*, not merely a worse-designed one; and effortful cleverness spends slow-system fuel the visitor never agreed to spend.

**But fluency is not the only goal.** A hero so frictionless it says nothing specific is fluent and worthless. §16.2's specificity test is deliberately in tension with pure fluency, because specificity costs a little effort and buys credibility. The target is **maximum fluency at a fixed level of specificity** — never buy fluency by removing specificity; buy it by removing everything else.

---

## 2. CORE PRINCIPLES

**Cg-1 — The hero has a load budget, and it is small.** No more than four distinct chunks held simultaneously; target three. Working memory admits roughly four independent items under favourable conditions and fewer under distraction — which describes a skeptical buyer evaluating a vendor. §6.2 applies this ceiling to type; this applies it to *meaning*. *A four-idea limit, not a four-element limit: a nine-word headline is one chunk if it expresses one idea.*

**Cg-2 — Chunking beats reduction.** Where information cannot be removed, group it so several items process as one. Three short lines set tight together cost one chunk; the same three scattered cost three. This is why a dense hero can feel calm and a sparse one scattered. *Grouping raises what fits within the budget; it does not raise the budget.*

**Cg-3 — No decision before comprehension is complete.** A decision presented too early is not made — it is deferred, and the unresolved choice occupies memory for the rest of the visit. Two CTAs above the fold is the canonical case. §5.2's single-CTA doctrine has a strategic justification (Bp-6) and this independent cognitive one. *Exception: a single, unmistakably secondary affordance whose ignoring costs nothing — the intro's skip control.*

**Cg-4 — Ambiguity is the most expensive thing in the hero.** An unnecessary but comprehensible element is dismissed in one cheap operation; an ambiguous one cannot be dismissed — the fast system flags it and the slow system is recruited. **An ambiguous element is worse than a useless one.** *The fix is often removal, not annotation.*

**Cg-5 — The hero pays for everything above it.** Load consumed by a cookie banner, promo bar, intro, or nav is subtracted from the hero's budget. Budget is per-visitor, not per-component. The hero must be evaluated *as encountered* — and the composite is the hero's problem, because the hero is what the composite is judged as.

**Cg-6 — Progressive disclosure begins in the hero.** The hero delivers surface-level clarity only; every depth signal is an *invitation*, never a *payload*. Any technical detail or nuance competes with the one thing it must deliver, and eleven sections below exist to carry that material. *Surface-level clarity is clarity: specific about one thing rather than shallow about several.*

---

## 3. THE HERO LOAD BUDGET

**Budget: 4 chunks maximum. Target: 3. Ambient elements uncounted, subject to the test below.**

| Slot | Typical occupant | Cost | Notes |
|---|---|---|---|
| 1 | The primary claim | 1 | Mandatory. If absent or ambiguous, nothing else matters. |
| 2 | The qualifier (for whom / how) | 1 | Strongly recommended — this answers Q2. |
| 3 | The next action | 1 | Mandatory. One only (Cg-3). |
| 4 | *Reserve* | 1 | **Left empty by default.** Spending it requires a written justification. |

**Ambient (uncounted) elements must satisfy all three:** carries no independent proposition; cannot be mistaken for a control; removing it changes the hero's *feel* but not its *meaning*.

*Typically qualify:* background material, structural negative space, the nav mark, grain.
*Typically do not, despite being argued as ambient:* a technology logo strip, an animated statistic, a scroll-hint indicator, a badge, an abstract visual resembling a diagram.

```
 AT BUDGET                         OVER BUDGET (the common failure)
 1  Primary claim                  1  Primary claim
 2  Qualifier                      2  Qualifier
 3  Single primary action          3  Primary CTA
 4  [reserve, unspent]             4  Secondary CTA        ← Cg-3
 — uncounted —                     5  "Trusted by" strip   ← over
 material · space · mark · grain   6  Animated stat        ← over
                   TOTAL: 3/4 ✓    7  Scroll indicator     ← Cg-4
                                   — above the hero —
                                   8  Cookie banner        ← Cg-5
                                                 TOTAL: 8/4 ✗
```

Every element in the failing column is individually defensible. That is the point: load failures are never caused by one bad decision, but by six good ones.

---

## 4. GROUPING TOOLKIT AND COST TABLE

| Mechanism | Does | Failure when misused |
|---|---|---|
| **Proximity** | Nearby items read as one unit | Uniform spacing — nothing groups |
| **Common region** | Items in an enclosed area read as one | Boxes around everything; enclosure becomes noise |
| **Similarity** | Shared properties read as related | Too many shared properties — hierarchy collapses |
| **Alignment** | Items on a shared axis read as a sequence | Competing axes — reads as unresolved |
| **Figure/ground** | Establishes content vs surface | Ambiguous ground — the background competes (Cg-4) |

Every grouping decision must be legible *pre-attentively*. Grouping that only appears on inspection has not grouped, it has arranged.

**What spends budget**, most expensive first:

| Rank | Driver | Why | Typical instance |
|---|---|---|---|
| 1 | Unresolvable ambiguity | Recruits the slow system with no resolution | An abstract visual that might be a diagram |
| 2 | A required decision | Occupies memory until resolved; often never freed | Two CTAs; a toggle above the fold |
| 3 | **Layout shift after first paint** | Invalidates work already done — spends the budget twice | Late font or image reflowing the headline |
| 4 | A competing motion | Involuntary capture; cannot be ignored | Two animations; a looping ambient effect |
| 5 | An unfamiliar interaction model | No existing schema to match | Custom scroll; non-standard cursor |
| 6 | An additional independent idea | Direct chunk consumption | Stat row; logo strip; second value proposition |
| 7 | A long or complex sentence | Parsing cost, recoverable | A headline needing two reads |
| 8 | Low contrast or small type | Fluency cost; degrades credibility silently | Secondary text below comfortable contrast |

Rank 3 is a defect, not a trade-off: the only item spending the budget twice, and it simultaneously destroys the Precise trait.

---

## 5. DO / DON'T

**Do.** Set the headline and supporting line as a single tight block so the visitor processes one proposition, and reserve the fourth chunk for nothing. Headroom is what keeps a governed hero governable — for a slow connection, a distracted reader, a cookie banner, or a genuinely necessary future addition.

**Don't.** Add an animated metric ("2.4M tasks automated," counting up on load). It looks like proof and behaves like a tax: consumes a chunk, captures attention involuntarily during the window the headline needs, competes with the hero's single permitted motion, and — since no real metrics exist in the source material — risks presenting an illustrative number as fact, which Ch. 27 item 7 forbids.

---

## 6. ANTI-PATTERNS

**Budget-blind addition.** Adding an element without re-counting composite load, including everything above the hero. Detected by auditing the whole surface as encountered. Fixed by treating §3 as a required artefact at every change.

**Fluency purchased with vagueness.** Simplifying until the hero is effortless and generic. Detected by §16.2's specificity test — if a competitor could use it unchanged, fluency was bought with the wrong currency.

**Ambient laundering.** Reclassifying a chunk-consuming element as "ambient" without applying the three conditions. Detected by asking a reviewer who has not seen the classification to describe what the element communicates; if they can state a proposition, it is not ambient. Dangerous because it preserves the appearance of governance while defeating it.

---

## 7. ACCEPTANCE CRITERIA

- [ ] §3's budget table completed, every element classified. *(Cg-1)*
- [ ] Total chunks ≤ 4; if 4, the fourth has a written justification. *(Cg-1)*
- [ ] Every ambient element satisfies all three conditions. *(§3)*
- [ ] Composite load counted, including banners, nav, and intro. *(Cg-5)*
- [ ] The hero requests exactly one decision. *(Cg-3)*
- [ ] No element is ambiguous to a first-time reviewer. *(Cg-4)*
- [ ] Grouping legible pre-attentively, verified by squint test. *(Cg-2)*
- [ ] No layout shift after first paint under any tested condition. *(§4, rank 3)*

---

## 8. CROSS REFERENCES

Ch. 3 (fluency as credibility) · Ch. 6 (when each system engages) · Ch. 7 (involuntary capture) · Ch. 15 (the order chunks arrive in) · Ch. 19 (the four-size ceiling) · Ch. 20 (grouping through space) · Ch. 29 (layout shift). UX Blueprint Ch. 4, Ch. 23. Master Vision §5.2, §6.2, §16.2, Ch. 27. Design System Bible Ch. 20 (Nv-1), Ch. 40 (Ag-2).

---

## 9. STATUS

The four-chunk ceiling is this Bible's first-canonical translation of a general working-memory limit into a hero-specific rule. The general limit is well established; the mapping of "chunk" onto "hero element" is a modelling decision made here. What matters more than the number is that a fixed budget exists and is counted the same way each time.

This chapter does not address cognitive accessibility as a discipline — reading-level ceilings, memory and processing differences, jargon governance. UX Blueprint Ch. 87 and Ch. 89 are planned for that work and unwritten; when they land, this chapter and Chapter 28 both inherit from them.

---

*End of Chapter 4. Chapter 5 asks what the visitor is permitted to feel, and in what order.*
