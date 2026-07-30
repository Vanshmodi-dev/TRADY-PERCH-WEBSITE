# CHAPTER 34 — THE 100-POINT QUALITY CHECKLIST

**Trady Perch Hero Experience Bible · Part X: Governance & Endurance**
*First-canonical-draft. Implementation-independent.*

**Inherited From:** Every preceding chapter of this Bible. Master Vision Ch. 27 (the Twelve Non-Negotiables). Design System Bible Chapter 61 (Design QA Standards & Checklists). Product Implementation Constitution Ch. 49 (Quality Gates Standard), Ch. 50 (Definition of Done), Ch. 54 (Review Checklist & Rubric).

**Governs:** The acceptance standard. A hero implementation is not finished until this checklist has been run and its result recorded.

**Does Not Govern:** How the hero is built. Every check here is verifiable against a running implementation without reference to how it was made.

---

## 1. HOW TO USE THIS CHECKLIST

**It is run against a live implementation, never against a mock.** Roughly forty of the hundred checks are unverifiable in a static image (Chapter 9, §2.3), and they are disproportionately the ones that distinguish a premium hero from an attractive one.

**Twenty-three checks are gates**, marked **`[GATE]`**. A gate that fails means the hero is not shippable, regardless of the other seventy-seven. Gates correspond to Master Vision's Twelve Non-Negotiables and to this Bible's Tier One anti-patterns (Chapter 33, Section 2).

**Each check names its source.** A check whose reasoning is unclear is answered by reading the cited principle, not by interpretation. If a check appears wrong, that is a Chapter 32 amendment question, not a judgment call at review time.

**Verification, not assertion.** Checks phrased "has been verified," "has been measured," or "has been recorded" require an artefact. A check answered from memory has not been run.

**Scoring.**

| Result | Meaning |
|---|---|
| Any gate failed | **Not shippable.** Fix and re-run. |
| All gates pass, ≥ 95 of 100 | **Shippable.** Log the exceptions in the debt register with a named owner. |
| All gates pass, 85–94 | **Not shippable without a recorded decision** at the governance level (Chapter 32). |
| All gates pass, < 85 | **Not shippable.** The hero is not finished. |

**Cadence.** Full run before any launch and quarterly thereafter; affected sections on every change; complete re-run after any constitutional amendment (Chapter 32, step 6) or any Tier One anti-pattern finding.

---

## 2. GROUP A — COMPREHENSION & HIERARCHY (Q1–Q10)

| # | Check | Source |
|---|---|---|
| **Q1** | **`[GATE]`** A first-time reader can accurately paraphrase what the company does after five seconds of exposure. | Ch. 14 G1; Ch. 15 §6 |
| Q2 | Comprehension is achieved on one read, with no observed regression to an earlier element. | Ch. 15 Ih-4 |
| Q3 | The hero's three rungs — what changes, for whom, what now — are each named in writing with the element carrying them. | Ch. 15 Ih-1 |
| Q4 | **`[GATE]`** No fourth hierarchy rung exists, in any form, including expanders, tooltips, and hover-revealed detail. | Ch. 15 Ih-1, Ih-5 |
| Q5 | Rung 1 states a transformation, not a service, category, or capability. | MV §16.3; Ch. 15 §2.2 |
| Q6 | Visual order, DOM order, and screen-reader order deliver the same sequence. | Ch. 15 Ih-3 |
| Q7 | The hero's single dominant idea is named in one written sentence. | Ch. 1 Ms-3; Ch. 2 Hp-4 |
| Q8 | The completed load-budget table shows four chunks or fewer, with every element classified. | Ch. 4 Cg-1 §4 |
| Q9 | Composite load — including cookie banner, promo bar, and navigation — has been counted, not just the hero in isolation. | Ch. 4 Cg-5 |
| Q10 | Every element classified as ambient satisfies all three qualifying conditions. | Ch. 4 §4 |

---

## 3. GROUP B — FIRST IMPRESSION & CREDIBILITY (Q11–Q20)

| # | Check | Source |
|---|---|---|
| **Q11** | **`[GATE]`** Nothing shifts position after first paint, under any tested condition. | Ch. 6 Fs-1; Ch. 29 Pf-2 |
| Q12 | The 400ms blur test returns "serious / composed / considered" from a reviewer who has not seen the hero. | Ch. 6 Test 1 |
| Q13 | The blurred hero shows the intended Rung-1 element as the strongest form present. | Ch. 7 §9 |
| **Q14** | **`[GATE]`** The primary claim exists in the initial server response, gated by no font, image, script, or hydration step. | Ch. 6 Fs-4; Ch. 29 Pf-1 |
| Q15 | Time-to-claim has been measured for every variant and is tracked across releases. | Ch. 6 Fs-2; Ch. 33 AP-15 |
| Q16 | All six verification tests in Chapter 6 §6 have been run and recorded. | Ch. 6 §6 |
| Q17 | The returning-visitor hero is emotionally complete without the intro sequence. | Ch. 6 §4.1; Ch. 13 Intent 4 |
| Q18 | The hero has been evaluated as a cold forwarded link with no accompanying context. | Ch. 12 §4; Ch. 13 Ui-4 |
| Q19 | The hero has been evaluated as it appears screen-shared or projected to a second person. | Ch. 30 Dk-5 |
| Q20 | Every row of the operator-credibility checklist has a named piece of hero evidence. | Ch. 12 §4 |

---

## 4. GROUP C — BRAND PERSONALITY (Q21–Q30)

| # | Check | Source |
|---|---|---|
| Q21 | Every hero element has been placed in the trait matrix, and none sits in a "Destroyed by" cell. | Ch. 3 §4 |
| **Q22** | **`[GATE]`** No element from the forbidden-register table appears — playful, meme-driven, jargon-stacked, hype-driven, cluttered, neon, gradient-heavy, or eager. | MV §2.2; Ch. 3 §6 |
| Q23 | **`[GATE]`** No urgency, scarcity, countdown, limited-availability claim, or exit-intent behaviour exists. | MV §5.5, Ch. 27 item 6; Ch. 16 Cp-3 |
| Q24 | No exclamation mark or emoji appears anywhere in the hero. | MV Ch. 19; Ch. 18 §5 |
| Q25 | The hero has been checked against the composure/coldness boundary by someone who did not build it. | Ch. 3 §5 |
| Q26 | The hero has been checked against **both** anti-model columns — freelancer portfolio and enterprise SaaS. | Ch. 12 Pa-2; Ch. 33 §6 |
| Q27 | The emotional arc is written down as five named states with the evidence producing each. | Ch. 5 §4 |
| Q28 | The hero's first three seconds are describable in terms of what is withheld. | Ch. 5 Ej-2 |
| Q29 | Nothing appears, opens, or expands without a visitor action. | Ch. 25 Ix-6 |
| Q30 | Hover-without-click on the CTA is documented as expected behaviour, not treated as a defect. | Ch. 5 §5; Ch. 16 Cp-1 |

---

## 5. GROUP D — COPY (Q31–Q40)

| # | Check | Source |
|---|---|---|
| **Q31** | **`[GATE]`** The claim fails the "generic competitor could use this unchanged" test — checked mechanically, not by impression. | MV §16.2; Ch. 18 Cw-1 |
| Q32 | Every line passes the three headline tests in the fixed order: specificity, benefit, economy. | MV §16.2; Ch. 18 §3 |
| Q33 | **`[GATE]`** No self-descriptive adjective about the company appears. | MV Ch. 28; Ch. 3 Bp-1; Ch. 18 Cw-3 |
| Q34 | No word from the forbidden-vocabulary table appears. | Ch. 18 §5 |
| Q35 | No model, vendor, platform, or tool is named. | MV §13.5; Ch. 11 Ac-2 |
| Q36 | All hero copy — including the CTA label — sits in one register, verified by reading it aloud as a unit. | Ch. 3 Bp-5; Ch. 18 Cw-2 |
| Q37 | No idea appears twice across the tagline, claim, qualifier, and CTA. | MV §16.3; Ch. 18 Cw-6 |
| Q38 | The deletion test has been run on every sentence at this review, not inherited from a previous one. | MV §16.1; Ch. 18 Cw-5 |
| Q39 | Copy passes a plain-language check with a non-technical reader, unaided. | Ch. 11 Ac-4 |
| Q40 | Where candidates were compared, the five gates were applied before rhythm or brevity. | Ch. 18 §6 |

---

## 6. GROUP E — ATTENTION, SPACE & TYPOGRAPHY (Q41–Q50)

| # | Check | Source |
|---|---|---|
| Q41 | The saliency ladder is declared, with a named element on each occupied rung. | Ch. 7 §4 |
| Q42 | Exactly one element holds Rung 1; at most one holds Rung 2. | Ch. 7 At-1 |
| Q43 | The saliency order and the meaning order are identical, and both are written down. | Ch. 7 At-5 |
| Q44 | Every attention-capturing element has a named repayment. | Ch. 7 At-4 |
| Q45 | The space-allocation table is completed; every region has a named job and owner. | Ch. 20 Ns-1 §4 |
| Q46 | The claim/qualifier gap is visibly smaller than the gaps surrounding the block, at every breakpoint. | Ch. 20 Ns-3 |
| Q47 | Grouping has been verified by squint test at three or more widths, including the widest supported. | Ch. 4 Cg-2; Ch. 20 §9 |
| Q48 | **`[GATE]`** Measure stays within 60–75 characters at every width, including the widest — measured, not assumed. | MV §6.2; Ch. 19 Ty-3 |
| Q49 | Four or fewer distinct type sizes appear in the hero viewport, at every breakpoint. | MV §6.2; Ch. 19 Ty-2 |
| Q50 | No type exceeds the inherited light-to-regular weight range. | MV §6.2; Ch. 19 Ty-1 |

---

## 7. GROUP F — MATERIAL, LIGHT & FORM (Q51–Q60)

| # | Check | Source |
|---|---|---|
| Q51 | Every surface is drawn from the closed vocabulary: metal, dark glass, matte black, light grain. | MV §8.5; Ch. 24 Mr-1 |
| Q52 | Exactly one dominant material is declared; any second is logged as secondary. | DSB Rd-2; Ch. 24 Mr-2 |
| Q53 | Every treatment passes the four-question effect-versus-material test. | Ch. 24 §5 |
| Q54 | The four-decision lighting plan is declared in writing. | Ch. 23 §4 |
| Q55 | Exactly one dominant light source, with at most one subtle fill. | MV §8.1; Ch. 23 Li-1 |
| Q56 | The brightest region coincides with the element holding primary saliency. | MV §8.1; Ch. 23 Li-2 |
| Q57 | **`[GATE]`** Every appearance of gold traces to a real in-scene source or to an interface token; gold's share of hero surface is measured and well under 10%. | MV §6.1, §8.2; Ch. 10 §9; Ch. 23 Li-4 |
| Q58 | The ground is a near-black with tonal structure — not pure black, not a flat fill; deep shadow is retained. | MV §6.1; Ch. 23 Li-3, Li-6 |
| Q59 | **`[GATE]`** No forbidden imagery appears — no robot or humanoid AI imagery, no stock business photography, no lightbulbs, no neon, no gradient mesh. | MV §6.4, Ch. 27 item 4; Ch. 8 §6 |
| Q60 | If 3D is present, the ten-gate decision matrix was completed and recorded; if absent, the decision not to use it was recorded. | Ch. 22 §4 Td-1 |

---

## 8. GROUP G — MOTION & INTERACTION (Q61–Q70)

| # | Check | Source |
|---|---|---|
| **Q61** | **`[GATE]`** Every hero animation has a written diegetic justification recorded before implementation. | MV Ch. 9, Ch. 27 item 3; DSB Ag-4; Ch. 21 Mo-1 |
| Q62 | **`[GATE]`** Nothing in the hero moves continuously, loops, pulses, or follows the pointer. | Ch. 7 At-2; Ch. 21 Mo-2; Ch. 26 Cu-3 |
| Q63 | Every duration and curve is one of the five tiers and three curves; no intermediate value exists. | DSB Mt-1; Ch. 21 Mo-3 |
| Q64 | **`[GATE]`** The intro sequence runs once per session, is interruptible at every beat, and does not replay. | MV §9.5, Ch. 27 item 10; Ch. 6 §6 |
| Q65 | All hero motion holds frame rate under CPU throttling, or has been removed. | MV Ch. 23; Ch. 21 Mo-5; Ch. 29 Pf-3 |
| Q66 | **`[GATE]`** Scroll is unmodified at all speeds, verified against native behaviour; the hero does not animate its exit. | Ch. 6 Fs-5; Ch. 21 Mo-6; Ch. 25 Ix-5 |
| Q67 | Every operable element acknowledges input within the Instant or Quick tier; response character is uniform. | Ch. 25 Ix-1, Ix-3 |
| Q68 | No decorative or ambient element responds to pointer, hover, or scroll position. | Ch. 25 Ix-2 |
| Q69 | Every state — default, hover, focus, active, disabled, loading — is designed or explicitly declared not applicable. | DSB Ch. 39; Ch. 25 Ix-4 |
| Q70 | The system cursor is unmodified; it changes exactly at operable boundaries; text selection is available. | Ch. 26 Cu-1, Cu-2 §4 |

---

## 9. GROUP H — TRUST, CONVERSION & CTA (Q71–Q80)

| # | Check | Source |
|---|---|---|
| **Q71** | **`[GATE]`** Exactly one call to action exists in the hero, in any form. | MV §5.2; Ch. 27 Ct-1 |
| Q72 | The CTA label passes all five gates of the label matrix and accurately describes what happens on click, verified against the actual flow. | Ch. 27 Ct-2 §4 |
| Q73 | The CTA holds Rung 2 saliency — found second, without searching — never Rung 1. | Ch. 7; Ch. 27 Ct-3 |
| Q74 | The CTA is present and reachable at every breakpoint, including 200% zoom and small landscape, and does not move between states. | DSB Nv-3; Ch. 27 Ct-6 |
| **Q75** | **`[GATE]`** No proof device appears in the hero — no client logo, metric, testimonial, rating, certification, or funding note. | Ch. 10 Lx-3; Ch. 17 Tb-3 |
| **Q76** | **`[GATE]`** No element requires content the company does not actually have; no illustrative figure appears as a factual claim. | MV Ch. 27 item 5 & 7; Ch. 17 Tb-5 |
| Q77 | Every hero claim is either descriptive or substantiated by a named section below. | MV Ch. 27 item 7; Ch. 1 Ms-2; Ch. 17 Tb-2 |
| Q78 | The counter-signal sweep has been run and every finding is resolved or logged. | Ch. 17 §5 Tb-4 |
| Q79 | No explicit reassurance copy appears ("no risk," "no obligation," "free"). | Ch. 16 §5 |
| Q80 | The hero asks only for rung 1 of the commitment ladder — the scroll. | Ch. 16 §4 Cp-1 |

---

## 10. GROUP I — ACCESSIBILITY & PERFORMANCE (Q81–Q90)

| # | Check | Source |
|---|---|---|
| **Q81** | **`[GATE]`** All five accessibility paths — visual, keyboard, screen reader, touch, reduced motion — have been verified independently and recorded, not inferred. | Ch. 28 Ax-2 §4 |
| **Q82** | **`[GATE]`** Contrast meets WCAG AA minimum at every breakpoint against every background state; body copy targets AAA. | MV accessibility requirements; Ch. 28 Ax-3 |
| Q83 | No contrast issue was resolved by lowering text contrast or adding a scrim. | Ch. 23 §6; Ch. 28 Ax-3 |
| Q84 | **`[GATE]`** Focus is visible on every operable element, follows hierarchy order, and is never trapped — including during the intro. | MV accessibility requirements; Ch. 28 Ax-5 |
| Q85 | Under `prefers-reduced-motion`, the hero presents fully statically and completely, with personality carried by static means. | DSB Mt-4; MV §9.5; Ch. 28 Ax-6 |
| Q86 | **`[GATE]`** No information exists only in an animation. | DSB Ch. 15 §8; Ch. 21 Mo-4; Ch. 28 Ax-4 |
| Q87 | The hero is complete and usable at 200% zoom, and with JavaScript disabled. | Ch. 9 §5; Ch. 29 §8 |
| Q88 | Accessibility was evaluated while the composition was still changeable, not at audit time. | Ch. 28 §2.2 §6 |
| Q89 | All twelve rows of the premium stress matrix have been executed and recorded. | Ch. 9 §5 |
| Q90 | Any accepted performance budget violation names its scope, is in the debt register, and states its revisit condition. | Ch. 29 Pf-6; ADR-0008 |

---

## 11. GROUP J — CONTEXT, GOVERNANCE & ENDURANCE (Q91–Q100)

| # | Check | Source |
|---|---|---|
| Q91 | The mobile composition was designed first and is the authoritative one. | MV Ch. 21; Ch. 31 Mb-1 |
| Q92 | **`[GATE]`** The claim is fully visible in the first mobile viewport at every supported height, portrait and landscape. | Ch. 31 Mb-3 |
| Q93 | Content inventory is identical across mobile and desktop; only composition differs. | Ch. 30 Dk-1; Ch. 31 Mb-2 |
| Q94 | The hero has been verified on a real, several-year-old mid-range device on a throttled connection. | UXB Ch. 91; Ch. 31 Mb-6 |
| Q95 | Nothing depends on hover, cursor, or pointer precision. | Ch. 26 Cu-4; Ch. 31 Mb-5 |
| Q96 | The hero has been verified by continuous resizing across the full desktop range, not at named breakpoints only. | Ch. 9 Px-5; Ch. 30 Dk-4 |
| Q97 | Every element is assigned to a named goal; none serves an anti-goal; all conflicts followed the resolution procedure with trades recorded. | Ch. 14 Hg-3 §4 |
| Q98 | Every element survived all four standing tests, recorded rather than assumed; rejected proposals are recorded with reasoning. | Ch. 2 §4; Ch. 32 Fx-3 |
| Q99 | Comparative checks — gold share, element-to-space ratio, time-to-claim, emphasis history — have been run against previous releases. | Ch. 33 §5 |
| Q100 | Every trend-derived element has a written ten-year answer; exception count across all principles is zero or one. | Ch. 32 Fx-4; Ch. 33 AP-22 |

---

## 12. THE TWENTY-THREE GATES, CONSOLIDATED

For a fast pre-review pass. Any failure stops the review.

| Gate | Check |
|---|---|
| Q1 | A stranger can paraphrase what the company does after five seconds |
| Q4 | No fourth hierarchy rung |
| Q11 | Zero layout shift after first paint |
| Q14 | Claim in the initial server response, ungated |
| Q22 | No forbidden register present |
| Q23 | No urgency or scarcity, in any form |
| Q31 | The claim is not usable by a generic competitor |
| Q33 | No self-descriptive adjective about the company |
| Q48 | Measure within 60–75 characters at every width |
| Q57 | Gold sourced, and under its budget |
| Q59 | No forbidden imagery |
| Q61 | Every animation has a recorded diegetic justification |
| Q62 | Nothing moves continuously |
| Q64 | Intro runs once per session and is interruptible |
| Q66 | Scroll unmodified; no animated exit |
| Q71 | Exactly one CTA |
| Q75 | No proof device in the hero |
| Q76 | No fabricated or placeholder content |
| Q81 | Five accessibility paths verified independently |
| Q82 | Contrast meets AA at every breakpoint |
| Q84 | Focus visible, ordered, never trapped |
| Q86 | No information carried by motion alone |
| Q92 | Claim fully visible in the first mobile viewport |

---

## 13. WHAT THIS CHECKLIST CANNOT DO

Stated plainly, because a hundred checkboxes invite the belief that passing them is sufficient.

**It cannot tell you the hero is good.** It can tell you it is not obviously wrong. A hero can pass all one hundred checks and still fail — most likely by being technically compliant and saying nothing (Chapter 33, AP-21). Nothing here substitutes for the judgment Chapter 2 describes.

**It cannot detect drift on its own.** Six anti-patterns are visible only in the difference between releases (Chapter 33, §5). Q99 covers them, and it is one check standing in for a practice.

**It cannot verify the claim is true.** Q77 checks that claims are substantiated by a section below; it cannot check that the section below is honest. That is a business obligation, not a design one.

**It is not calibrated.** No hero has been run through it. The 95/85 thresholds in Section 1 are this Bible's first-canonical proposal and should be revisited after the first several real runs — if every hero scores 97, the checklist is too easy; if none clears 85, either the checklist or the process producing heroes needs attention, and the first few runs will not tell you which.

---

## 14. CROSS REFERENCES

Every chapter of this Bible. Master Vision Ch. 27. Design System Bible Ch. 61. Product Implementation Constitution Ch. 49, Ch. 50, Ch. 54. Appendix A (full principle registry and source index).

---

## 15. FUTURE EXPANSION

**Documented limitations.** Beyond the calibration gap in Section 13: several checks require artefacts that do not yet have a defined home — the load-budget table, the space-allocation table, the lighting plan, the saliency ladder, the trade records. Where those artefacts live and who maintains them is a governance question (Chapter 32) that becomes urgent the first time this checklist is run in earnest.

**Expected evolution.** Checks that never fail across many runs are candidates for removal, not for retention — a check that has never caught anything is costing review time and finding nothing. Conversely, every Tier One or Tier Two anti-pattern that occurs despite a passing run indicates a missing check, and the gap should be closed by adding one.

---

*End of Chapter 34, and of the Hero Experience Bible's chapters. Appendix A follows: the principle registry, the source cross-reference index, and the map of what remains unwritten.*
