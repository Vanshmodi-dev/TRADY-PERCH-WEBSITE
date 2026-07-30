# CHAPTER 11 — AI COMPANY IDENTITY

**Trady Perch Hero Experience Bible · Part III: Premium & Identity**
*First-canonical-draft. Implementation-independent.*

**Inherited From:** Master Vision's competitive framing (the axis is "operator credibility," not "AI capability" — the latter "noisy, jargon-flooded, and largely undifferentiated"), §6.4, §6.1, §13.5, Ch. 19. UX Blueprint Ch. 48.
**Governs:** How the hero signals genuine technical capability without the conventions that now signal the opposite.
**Does Not Govern:** The AI assistant's voice (Ch. 19) or the Interactive AI Demo's design.

---

## 1. THE POSITION

§11.2 places the question second in the visitor's own monologue: *"Do they actually have real technical capability, or is this marketing?"*

The difficulty is that every established visual convention for signalling AI capability now signals the reverse. The neural mesh, particle field, glowing orb, blue-to-purple gradient, humanoid robot, animated "thinking" indicator, sparkle icon — each was once informative and is now a template. Their presence today is weak evidence *against* technical depth, because they are the cheapest available signals and are used most heavily by companies with the least to show.

**The governing claim: the hero cannot signal AI capability visually at all. It must signal it structurally, or not at all.**

**The chosen axis.** Master Vision competes on **operator credibility**, tested by *"does this look like a company a CFO would sign a contract with?"* Not a retreat from the technology: where every competitor claims frontier capability, the claim carries no information and the buyer knows it. What differentiates is whether a company can be trusted to deploy something into a business's operations and be there afterwards.

**The AI tell** — a recognisable set marking a company as AI-adjacent rather than AI-competent, read fluently by a technically literate buyer:

| Signal | Why it reads as inexperience |
|---|---|
| Neural-network / node-graph visual | A diagram of a concept, not of anything the company built |
| Particle field, orb, "energy" effect | Decoration standing in for a demonstration |
| Blue-to-purple gradient | "The uniform of every generic SaaS competitor" (§6.1) |
| Humanoid robot or android imagery | Signals science fiction, not operational software (§6.4) |
| Sparkle / wand iconography | Borrowed from consumer AI; frames the work as a garnish |
| Model-name dropping | Tool-stack language where outcomes language belongs |
| "Powered by" technology badges | Credibility borrowed from a vendor the client could hire directly |
| Animated "thinking" indicator with no real inference | A simulation of intelligence — the dishonesty Ch. 19 forbids |
| Superlative capability claims | Unverifiable; §16.1 forbids empty superlatives outright |

The pattern: each *depicts* capability rather than demonstrating it — Vs-3 violated in nine visual dialects.

**What genuine capability looks like on a website.** If depiction is unavailable, only demonstration remains — and the hero's available demonstration is itself. A technically literate visitor reads, mostly unconsciously: does the page load correctly, quickly, stably? Does it behave correctly at the edges — odd viewport, keyboard, zoom, no-JS, screen reader? Is the language precise or vague? Is anything overclaimed? Is there restraint about the technology itself — practitioners rarely lead with their tools.

None is visual. All are available. **This is the whole strategy: the hero proves technical capability by being a well-engineered artefact, and says nothing about it.**

---

## 2. CORE PRINCIPLES

**Ac-1 — Capability is demonstrated structurally, never depicted.** No visual representation of AI, intelligence, data, or computation. Every available depiction is a category cliché with negative evidential value; the structural alternative is stronger and unavailable to a competitor who does not have it. *Not a prohibition on showing the product — Ch. 48 assigns demonstration to the Interactive AI Demo in section 10, where the visitor interacts rather than watches.*

**Ac-2 — Outcomes language, never tool-stack language.** §13.5 requires the offering be described "in outcomes language, not tool-stack language"; §16.2 agrees — *"Get quotes to customers in minutes, not days"* beats *"AI-powered quoting engine."* Tool-stack language also carries a commercial risk: naming the underlying models invites the buyer to wonder whether they could assemble it themselves. *No exception in the hero; the Technology Stack section exists one section below.*

**Ac-3 — Never simulate intelligence.** No element may imitate computation, inference, or thinking without real computation behind it. Ch. 19 forbids the AI from projecting false confidence; motion ethics forbid fabricated loading delays, because a user who realises one delay was fake "retroactively distrusts every prior loading state they saw." A fake thinking indicator or typewriter effect on static copy is the same dishonesty at the top of the page — the worst place, because it is the company's first statement about how it represents its own systems.

**Ac-4 — Precision of language is the technical signal.** §16.1's model — write "the way a competent senior engineer explains a solution to a smart but non-technical business owner" — is itself a capability demonstration: only someone who understands a system can describe it simply. The source's bad example, *"leverage cutting-edge AI-powered synergistic automation,"* is diagnostic: a technical buyer reads it as an absence of understanding. *An evidentiary claim, not a style preference — language precision correlates with competence more reliably than any visual signal available to a hero.*

**Ac-5 — The hero does not compete on AI.** No comparative or superlative claim about AI capability. Claims on this axis are undifferentiated, unverifiable, and immediately discounted. *Not downplaying the technology — it is the substance of the offering and fully present in Solutions, Technology, and Case Studies. The hero simply does not argue about it.*

---

## 3. THE CAPABILITY-PROOF LADDER

```
 STRONGEST
   ▲  1. A working system the visitor operates themselves
   │     → Interactive AI Demo (section 10)
   │  2. A named client, named problem, measured outcome
   │     → Case Studies (section 9)
   │  3. A described method the visitor can evaluate
   │     → How We Work (section 7)
   │  4. A precise, jargon-free explanation of what is built
   │     → Solutions (section 5)
   │  5. An artefact that is itself well engineered      ◄── HERO
   │     → correctness, speed, stability, edge behaviour
   ▼  6. Precise language                               ◄── HERO
   ✗  7. Depiction (mesh, particles, robots, badges)
 NEGATIVE  → actively reduces credibility with the target buyer
```

Rungs 5 and 6 are the only ones available in fifteen seconds, and the only two a competitor cannot copy from a screenshot. Rung 7 is the only rung reachable *quickly*, which is why so many heroes in this category end up there.

---

## 4. THE SUBSTITUTION TABLE

| Conventional signal | What it tries to say | Honest substitute |
|---|---|---|
| Neural-network mesh | "We work with advanced models" | A page that loads instantly and behaves correctly everywhere |
| Particle field | "Something sophisticated is happening" | A convincingly rendered material (Ch. 24) |
| Animated "thinking" dots | "Our system reasons" | Nothing in the hero; the real demo in section 10 |
| Model or vendor names | "We use serious tools" | A specific outcome in the buyer's vocabulary |
| "Powered by" badges | "Reputable technology underneath" | Precision of language (Ac-4) |
| Capability superlatives | "We're the most advanced" | A specific, checkable claim about what changes |
| Counter of tasks automated | "We operate at scale" | A real metric inside a real case study, section 9 |
| Sparkle iconography | "There's AI in here" | Silence — the offering is stated in words |

Several entries resolve to "nothing in the hero." That is the correct answer more often than it is comfortable.

---

## 5. DO / DON'T

**Do.** Make the hero itself the capability demonstration — server-rendered content appearing immediately, motion holding frame rate under CPU throttling, a layout that never shifts, keyboard and screen-reader paths working on the first try — and say nothing about any of it. A technically literate buyer registers all of it and correctly infers that a team capable of this care in a marketing page is capable of it in a production integration. That inference is unavailable to any competitor whose hero is a particle field.

**Don't.** Add a subtle animated node-graph background "to hint at the intelligence underneath." It fails Ac-1, At-2, Vs-4, and Rd-1's material-realism standard — and produces exactly the outcome the brand is positioned against: a visitor comparing three vendors sees the same background on all three, and the hero has spent its most valuable moment on the one signal guaranteed not to differentiate.

---

## 6. ANTI-PATTERNS

**Category mimicry.** Adopting AI-category conventions because the hero "needs to read as an AI company." Detected by asking whether a competitor could use the element unchanged. The request is reasonable — visitors do need to know this is an AI company — and the resolution is that *copy* tells them while the visuals demonstrate seriousness.

**Capability theatre.** Any element performing computation without doing any — a counter animating on load, a hard-coded "system status," a live-looking terminal that is a video. Detected by asking what real process drives it. If a visitor discovers it — and technical visitors inspect — the loss is not proportionate to the element; it calls every other claim into question.

**Jargon as authority.** Reaching for technical vocabulary to establish credibility with a technical reader. Especially common when hero copy is written by the engineers who built the systems — the people most likely to have the competence and least likely to state it simply on a first draft.

---

## 7. ACCEPTANCE CRITERIA

- [ ] No visual representation of AI, intelligence, data, or computation. *(Ac-1)*
- [ ] No element appears in §1's AI-tell table. *(§1)*
- [ ] Copy names no models, vendors, platforms, or tools. *(Ac-2)*
- [ ] No element simulates computation, inference, or thinking. *(Ac-3)*
- [ ] Copy passes a plain-language test with a non-technical reader, unaided. *(Ac-4)*
- [ ] No comparative or superlative claim about AI capability. *(Ac-5)*
- [ ] Capability evidence confined to rungs 5 and 6. *(§3)*
- [ ] Each conventional signal considered and rejected is recorded with its substitution. *(§4)*

---

## 8. CROSS REFERENCES

Ch. 2 (Hp-3) · Ch. 8 (Vs-3, Vs-4) · Ch. 10 (Lx-3) · Ch. 12 (the other half of identity) · Ch. 17 · Ch. 18 · Ch. 29. Master Vision §6.1, §6.4, §11.2, §13.3, §13.5, §16.1, §16.2, Ch. 15, Ch. 19, Ch. 27. UX Blueprint Ch. 48. Design System Bible Ch. 14 (Rd-1).

---

## 9. STATUS

§1's AI-tell table describes conventions as they stand at authoring. Visual conventions in this category move quickly: a cliché today may become neutral, and a currently-neutral treatment may become the next uniform. Re-derive rather than inherit whenever the hero is materially revised — the *method* (identify what every competitor is doing; do not do that) is durable; the list is not.

**Open question.** Whether the Interactive AI Demo should ever surface above the fold is genuinely unresolved. It is the strongest capability signal available and would resolve AI-capability doubt earliest; against that, it requires a decision before comprehension, introduces competing motion, and pre-empts section 10. If proposed, evaluate it as a change to §13's section ordering rather than as a hero addition — because that is what it is.

---

*End of Chapter 11. Chapter 12 addresses the other half: not "are they technically real," but "are they a real firm, or two people and a template."*
