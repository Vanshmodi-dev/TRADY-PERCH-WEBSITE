# CHAPTER 22 — 3D PHILOSOPHY

**Trady Perch Hero Experience Bible · Part VI: The Sensory Language**
*First-canonical-draft. Implementation-independent.*

**Inherited From:** Master Vision §8.3–§8.5. Design System Bible Ch. 14 (Rd-1 material realism, Rd-2 one hero material, Rd-3 the fixed rig, Rd-4 the three-object ceiling).
**Governs:** Whether the hero should contain three-dimensional content at all, and what follows if it does.
**Does Not Govern:** Render specifications, rig values, or material presets — owned by DSB Ch. 14 and Ch. 10.

---

## 1. THE POSITION

**This chapter's first job is to establish that the answer may be *no*.**

Most treatments of 3D in a hero assume it is present and proceed to how it should look. That skips the only question that matters: a hero containing no three-dimensional content is fully compliant with every principle in this Bible — and, given the constraints already established, is frequently the stronger option.

The reason is arithmetic. 3D in a hero must simultaneously carry a diegetic justification (Mo-1, Vs-2), avoid depicting capability (Ac-1), avoid becoming a metaphor (Vs-4), avoid holding permanent saliency if animated (At-2), hold frame rate under throttling (Mo-5), degrade to a complete static presentation (Mt-4), not delay the claim (Fs-4), and render one material convincingly enough to justify the weight (Rd-1). Each is satisfiable; satisfying all at once on a first build is a substantial undertaking — and a hero that attempts it and falls short is worse than one that never attempted it, because an unconvincing render is a visible defect (Ch. 17's counter-signal catalogue).

**The governing posture: 3D in the hero is permitted, expensive, and must earn its place against a specific alternative — the same hero without it.**

**What 3D is for in this brand.** §8.3 rejects "a swirling abstract 3D scene with a dozen floating shapes" by name and states the replacement standard: **"a single, perfectly lit metallic surface with a believable gold reflection communicates more premium craft than a swirling abstract 3D scene with a dozen floating shapes."** The purpose is narrow: **to render a material convincingly.** Not to depict a concept, fill space, demonstrate ability, or create movement. Everyone else's 3D is geometry; this brand's is material.

**Why "fewer objects, more convincingly" is harder, not easier.** Rd-1 corrects the common misreading: rendering one material convincingly — "correct reflectance, correct micro-surface detail, correct light response" — is frequently *harder* than populating a scene with many simpler objects. The reason is scrutiny: a busy scene distributes attention across a dozen objects, none examined closely; a single object is examined closely by definition, and every shortcut in its material is visible. **A hero render is not a low-cost way to add visual interest.** If chosen, it must be resourced as the most demanding visual element on the page.

**The alternative that must always be compared.** Chapter 8's DO recommends a hero whose visual content is *nothing but surface*, with the story carried by type against material and light. Every 3D proposal is evaluated against that, not against a blank page. The question is never "does this render look good?" but **"what does this render do that a well-resolved flat material treatment would not?"** If the answer is "it moves," see Ch. 21. If "it looks more advanced," see Ac-1. If "it renders the brand mark with genuine physical presence," that is a real answer and the proposal proceeds.

---

## 2. CORE PRINCIPLES

**Td-1 — 3D must be chosen, never assumed.** A hero contains 3D only after an explicit decision recording what it delivers over a flat treatment. Absent that, 3D enters by default because it is available and impressive — Test 1's purest failure. *A presumption against unexamined 3D, not against 3D.*

**Td-2 — Material realism over geometric abundance.** A render's persuasive power comes from how convincingly it renders one material, never from object count. Stated here because the hero is where the pressure to add geometry is highest — a sparse render reads as unfinished to a reviewer who has not internalised the scrutiny argument. *A claim about where persuasion comes from, not a minimalism preference.*

**Td-3 — The render must not depict.** No concept, process, capability, or metaphor. It renders a material, a surface, or the brand mark. A three-dimensional depiction is more expensive than a flat one and no more legitimate — added realism makes the metaphor more prominent, not less ambiguous. *Not a ban on the brand mark in three dimensions: the mark is not a metaphor, and DSB Ch. 14 uses exactly that as its worked example.*

**Td-4 — An animated render is motion first.** Any animated 3D is governed by Chapter 21 before this chapter. Motion outranks form attentionally and in budget terms, so it must satisfy Mo-1, Mo-2, Mo-5, and Mt-4 before its visual qualities are discussed. DSB Ch. 14 confirms the routing: animated render motion runs at Deliberate at most — and the hero's Deliberate tier is not allocated. *Exception: the intro's reflection sweep, the system's single named property exception, already allocated.*

**Td-5 — A static frame must be fully sufficient.** Every render must work completely as a still image, because for a meaningful share of visitors that is what it will be. DSB Ch. 14 requires a fully static frame — "not merely a slowed version of its animation." *A design constraint on the original, not a deliverable added later.*

**Td-6 — The render never delays the claim.** No render may gate, obscure, or delay the primary claim. Renders are heavy; heavy assets arrive late on poor connections; a hero whose claim waits for a render is empty for exactly the visitors least likely to wait. ADR-0008 documents a real instance of this failure class in this codebase's own history.

---

## 3. THE 3D DECISION MATRIX

Run before any render work begins. A "no" at any gate ends the proposal; the alternative is a flat material treatment (Ch. 24).

| # | Gate | Pass condition | Fails to |
|---|---|---|---|
| 1 | **Diegetic justification** | One sentence states what it represents, accepted before production | Mo-1, Vs-2 |
| 2 | **Non-depiction** | Subject is a material, surface, or the brand mark — not a concept | Td-3, Ac-1 |
| 3 | **Alternative comparison** | A named capability the flat alternative lacks, recorded | Td-1 |
| 4 | **Resourcing** | Budgeted as the most demanding visual element on the page | Td-2 |
| 5 | **Static sufficiency** | The still frame carries the composition unaided | Td-5 |
| 6 | **Claim independence** | The claim is complete and visible without the render | Td-6, Fs-4 |
| 7 | **Motion budget** (if animated) | Passes Chapter 21's budget, which is already spent | Td-4 |
| 8 | **Frame rate** (if animated) | Holds under CPU throttling on target hardware | Mo-5 |
| 9 | **Object ceiling** | Three or fewer primary elements | Rd-4 |
| 10 | **Single hero material** | One dominant material declared; any second explicitly secondary | Rd-2 |

**Expected outcome.** Most proposals fail at gate 2 or 3, and both failures are informative: gate 2 catches the render that is secretly a diagram; gate 3 catches the render that is decoration with a justification attached.

---

## 4. WHAT A HERO RENDER MAY CONTAIN

All values inherited; none invented here.

| Constraint | Value | Source |
|---|---|---|
| Primary (attention-competing) objects | **3 maximum** | Rd-4 |
| Atmospheric elements (fog, gradient, dust) | Uncounted, if carrying no independent weight | Rd-4 exception |
| Hero materials available | metal, glass, matte-black | DSB Ch. 10 |
| Dominant material per scene | **Exactly one**, declared before modelling | Rd-2 |
| Lighting | One key, one subtle fill at roughly 1:4 — no additional lights | Rd-3 |
| Camera | Longer-lens character; flatter perspective; minimal distortion | §8.4 |
| Gold in the render | Must originate from a real in-scene reflective or emitting surface | Rd-1, Ma-4 |
| Grain | Light film grain throughout | §8.5 |
| Across viewports | Deliberately re-composed crop or angle per breakpoint — never a naive crop | DSB Ch. 14, Px-5 |

**On the last row** — the constraint most often discovered late. A three-object composition reading correctly at desktop width frequently loses its hierarchy when cropped to a phone, because the object relationships *were* the composition. A hero render is therefore not one asset but several, and that belongs in gate 4's estimate.

---

## 5. DO / DON'T

**Do.** Run the full ten-gate matrix *before* commissioning any render work, and record the result either way. A recorded "no" is as valuable as a recorded "yes": it prevents the same proposal returning quarterly with a new justification, and it documents that the flat alternative was chosen deliberately rather than by default — which distinguishes restraint from "restraint as an alibi."

**Don't.** Add a rendered abstract object because the composition feels sparse. DSB Ch. 14's own diagnosis: adding geometry because a scene felt sparse "is also a signal... that the actual problem — an under-resolved hero material not yet convincing enough to carry the scene on its own — was papered over with added geometry rather than solved directly." In a hero the same logic runs one level higher: sparseness is nearly always an under-resolved *claim*, and no amount of rendered geometry fixes a sentence.

---

## 6. ANTI-PATTERNS

**Complexity as a fix for weak execution.** Adding objects, materials, or lights to a render that is not yet working. Detected by asking, of any render approaching the ceiling, whether the addition solved a compositional gap or compensated for an unconvincing material.

**The 3D that became a diagram.** A render that began as a material study and acquired representational content — connected nodes, flowing forms, layered planes suggesting data. Detected at gate 2 and re-detected at every review, because this drift happens during production rather than at proposal. Dangerous because the render is by then expensive, and Mo-1's ordering exists precisely to prevent sunk cost from deciding the question.

**Render-gated heroes.** A composition incoherent until its render loads. Detected by disabling images entirely and looking at the result. A real, previously-observed failure class in this codebase (ADR-0008).

**Naive responsive cropping.** Shipping one render and cropping per breakpoint. Detected by comparing object hierarchy at the narrowest and widest supported widths.

---

## 7. ACCEPTANCE CRITERIA

- [ ] The ten-gate matrix completed and recorded, including for a decision *not* to use 3D. *(Td-1)*
- [ ] The render depicts no concept, process, or capability. *(Td-3)*
- [ ] Exactly one dominant material declared; any second logged as secondary. *(Rd-2)*
- [ ] Three or fewer primary objects; atmospheric elements verified as weightless. *(Rd-4)*
- [ ] The fixed key-plus-fill rig used, with no additional lights. *(Rd-3)*
- [ ] All gold traces to a real in-scene source. *(Rd-1, Ma-4)*
- [ ] The still frame carries the composition unaided. *(Td-5)*
- [ ] The claim is complete and visible with the render absent or unloaded. *(Td-6)*
- [ ] If animated: Chapter 21's budget consulted first; frame rate holds under throttling. *(Td-4, Mo-5)*
- [ ] The composition is re-composed per breakpoint, not cropped. *(§4)*

---

## 8. CROSS REFERENCES

Ch. 6 (Fs-4) · Ch. 8 (Vs-2, Vs-4; the flat alternative) · Ch. 9 (Px-5) · Ch. 10 (Lx-4) · Ch. 11 (Ac-1) · Ch. 21 (the budget Td-4 routes to) · Ch. 23 · Ch. 24 · Ch. 29. Master Vision §8.2–§8.5, §9.5. Design System Bible Ch. 10, Ch. 14, Ch. 15 (Mt-4), Ch. 40 (Ag-1). ADR-0008.

---

## 9. STATUS

**Inherited limitation.** DSB Ch. 14 states plainly that its three-object ceiling and 1:4 fill ratio are "first-canonical proposal, reasoned from Master Vision's qualitative instruction rather than tested against a completed render," to be validated once real render assets exist. This chapter inherits that unchanged and adds no confidence to it.

**Open question.** Whether hero 3D, if any, should be a real-time render or a pre-rendered still is not decided anywhere in the source material and is genuinely consequential: real-time is subject to Mo-5 and to every device-capability concern in ADR-0009; pre-rendered is subject to Td-6's loading constraint instead. The decision depends on implementation facts belonging to the Constitution's performance chapters.

---

*End of Chapter 22. Chapter 23 addresses the element that makes any material convincing — and the one channel where this brand's art direction is most specific.*
