# CHAPTER 15 — INFORMATION HIERARCHY

**Trady Perch Hero Experience Bible · Part IV: Intent, Goals & Hierarchy**
*First-canonical-draft. Implementation-independent.*

**Inherited From:** Master Vision §11.2, §6.2, §16.3. UX Blueprint Ch. 20, Ch. 23.
**Governs:** The order meaning must be delivered in, why it is fixed, and how it is verified.
**Does Not Govern:** Which elements are most *noticeable* (Ch. 7 — a different system) or what they say (Ch. 18).

---

## 1. THE POSITION

Hierarchy is not about size. It is about **dependency**.

A hero has an information hierarchy when each piece of meaning arrives only after the piece it depends on. The qualifier is meaningless before the claim it qualifies; the action is unevaluable before the offering it acts upon. These are logical orderings, and getting them wrong produces a hero that must be read twice — a credibility cost, not merely an inconvenience.

Chapter 7 governs what the visitor *notices* first; this chapter governs what they must *understand* first. At-5 requires the two to match; this fixes the order they must both match to.

```
  "What is this, in one sentence?"
        │
        ├─► RUNG 1 — WHAT CHANGES     the transformation delivered
        │                              depends on: nothing (the root)
        ├─► RUNG 2 — FOR WHOM          the audience and conditions
        │                              depends on: Rung 1
        └─► RUNG 3 — WHAT NOW          the single available action
                                       depends on: Rungs 1 and 2
```

Every rung depends on those above and nothing below. That is what makes the order fixed rather than conventional: **reversing any pair produces a moment where the visitor holds information they cannot yet interpret** — Cg-4 generated structurally rather than accidentally.

**Why the transformation, not the service, is the root.** §16.3 requires the hero to state "the transformation delivered, not a service list"; §16.2 gives the comparison: *"Get quotes to customers in minutes, not days"* beats *"AI-powered quoting engine."* A service list is not a weaker root — it is a *different tree*. A visitor given "AI-powered quoting engine" must work out what a quoting engine does, then whether they have that problem, then what would change: three dependencies resolved in the wrong order before the hero has said anything. A transformation statement collapses all three, because a business owner already knows whether quotes take too long. **The root must be the thing the visitor already understands** — the only rung with no dependencies available.

**Shallowness is a discipline.** Three rungs is a ceiling, not a target; two is legitimate and sometimes stronger. A fourth is not. Every proposal for one is a request to relocate a section into the hero, which Chapter 8's test catches, and to spend the reserve chunk, which Cg-1 caps. Two independent constraints agreeing is a useful check that the model is coherent.

---

## 2. CORE PRINCIPLES

**Ih-1 — Three rungs, fixed order, no fourth.** *What changes* → *for whom* → *what now*. The order derives from dependency, not convention, so it does not vary by composition, breakpoint, or campaign. *Rung 2 may be omitted where the claim is genuinely self-qualifying; Rungs 1 and 3 are mandatory. A rung may be carried by several elements and one element may carry several — what is fixed is the sequence meaning arrives in.*

**Ih-2 — Hierarchy is dependency, not emphasis.** Position is determined by what an element depends on, never by how important someone considers it. "The CTA is our most important element" is a statement about business value; acting on it produces Chapter 7's failure — a decision requested before the information required to make it. *The CTA is Rung 3 because it depends on Rungs 1 and 2, and would be Rung 3 even if it were the most commercially valuable element on the site.*

**Ih-3 — Identical in every reading path.** Visual order, DOM order, and screen-reader order deliver the same three rungs in the same sequence. A hero whose composition delivers claim-first while its DOM delivers a decorative element first has two hierarchies, and the second belongs to a visitor who cannot see the first. *Visual composition has latitude; what must match is the order meaning is encountered in.*

**Ih-4 — One read, no regressions.** A visitor traverses all three rungs in a single pass without returning to an earlier rung to interpret a later one. Regression is the observable signature of a broken dependency — measurable without instrumentation: a reviewer's eyes visibly return, or they say "wait, what does this mean." *Returning to a claim because they liked it is not a regression; returning because they could not resolve it is.*

**Ih-5 — Depth belongs below.** Anything that does not fit the three rungs belongs to a section below, not a fourth rung or a disclosure control. A "learn more" expander, tooltip, or hover-revealed detail is a fourth rung in disguise: it adds a dependency, adds an affordance risking Cg-4 ambiguity, and duplicates an existing section. **The scroll is the hero's disclosure mechanism.** *Implication of depth is Vs-5 and is required; delivering the depth in place is not.*

---

## 3. THE SPECIFICATION

| Rung | Delivers | Answers | Depends on | Mandatory | Carried by |
|---|---|---|---|---|---|
| **1** | The transformation | "What is this?" | Nothing | **Yes** | The primary claim |
| **2** | Audience and conditions | "Is this for me?" | Rung 1 | No (omit if self-qualifying) | The qualifier |
| **3** | The single available action | "What now?" | Rungs 1, 2 | **Yes** | The CTA |

**Supporting elements sit outside the hierarchy.** Navigation, the brand mark, the skip control, and legal or utility affordances are wayfinding and system affordances, not hero content. They must be available and must not occupy a rung.

**The four-size ceiling.** §6.2 caps distinct type sizes at four per viewport. Three rungs plus one supporting scale consumes the budget exactly — a second constraint reaching the same answer, meaning any fourth rung necessarily breaks the typographic discipline as well as the informational one.

---

## 4. FAILURE MODES

| Failure | What happens | Signature | Fix |
|---|---|---|---|
| **Inversion** | A lower rung encountered first — usually the CTA, via saliency | Eye lands on the button, then searches upward | At-5; reduce CTA saliency, don't raise the claim's |
| **Missing root** | Rung 1 is abstract or a service list | Reviewer paraphrases the words but not the meaning | Rewrite to a transformation |
| **Flattening** | All three rungs equal weight; no entry point | Eye oscillates; "where do I start" | Restore contrast by *reducing* two, not raising one |
| **Fourth rung** | Extra information at hierarchy level | Load budget exceeded; type ceiling broken | Relocate to its owning section |
| **Split hierarchy** | Visual and DOM orders differ | Screen-reader path delivers a different sequence | Align source order with reading order |

**On flattening** — the most common failure in restrained heroes, and the instinct it produces (make the headline bigger) is usually wrong. Flattening is a *relative* problem. The fix that preserves restraint is to quieten Rungs 2 and 3, which costs nothing and increases the claim's saliency by subtraction.

---

## 5. VERIFICATION

1. **Paraphrase test (Rung 1).** Show five seconds, hide, ask what the company does. Pass: accurate paraphrase in their own words.
2. **Self-location test (Rung 2).** Ask a reviewer matching a target vertical whether this is for a business like theirs, and one clearly outside it the same question. Pass: both answer correctly and quickly. *Over-broad phrasing fails both halves at once.*
3. **Action test (Rung 3).** Ask what would happen if they clicked. Pass: an accurate expectation of the step and its cost.
4. **Regression watch (Ih-4).** Observe a first-time reader's eyes, or ask them to think aloud. Any backward movement to interpret a later element is a dependency break.
5. **Linear read (Ih-3).** Read the DOM order aloud, ignoring visual arrangement. It must deliver 1 → 2 → 3. A thirty-second check that catches most split hierarchies before an assistive-technology pass is required.

---

## 6. DO / DON'T

**Do.** Fix a weak hierarchy by quietening the lower rungs rather than amplifying the top one. It preserves the restraint everything rests on, costs nothing from the gold or motion budgets, and strengthens the claim through isolation — the one channel that compounds as everything else gets quieter.

**Don't.** Add a hover-revealed detail or "learn more" expander to satisfy a stakeholder who wants more information above the fold. It creates a fourth rung, adds an affordance whose purpose is ambiguous until used, duplicates a section that owns the content, and — because most visitors never trigger it — satisfies nobody: the information is present but unseen, and the hero has paid the full cost of carrying it.

---

## 7. ANTI-PATTERNS

**Hierarchy by importance.** Ordering by what the business values most rather than what depends on what. Detected when a review argument cites importance rather than dependency. Fixed by re-deriving from the dependency chain, which is not a matter of opinion.

**The self-qualifying illusion.** Omitting Rung 2 because the claim *sounds* specific. Detected by the self-location test's second half — if a clearly non-fit reviewer cannot tell they are out of scope, the claim did not self-qualify. Dangerous because it reads cleanly to insiders, who already know the audience.

**Silent rung drift.** The claim acquiring qualifying clauses until it carries two rungs, or the qualifier acquiring outcome language until it competes with the claim. Detected by asking which rung each sentence delivers; if either answer is "both," they have merged.

---

## 8. ACCEPTANCE CRITERIA

- [ ] The three rungs are named in writing with the element carrying each. *(Ih-1)*
- [ ] No fourth rung in any form, including disclosure controls. *(Ih-1, Ih-5)*
- [ ] Rung 1 states a transformation, not a service or category. *(§16.3)*
- [ ] DOM, visual, and screen-reader orders deliver the same sequence. *(Ih-3)*
- [ ] All five checks in §5 run with people who did not build the hero. *(§5)*
- [ ] No regressions observed in a first-time read. *(Ih-4)*
- [ ] Distinct type sizes in the hero viewport ≤ 4. *(§6.2)*
- [ ] Every hierarchy dispute resolved by dependency, not importance. *(Ih-2)*

---

## 9. CROSS REFERENCES

Ch. 4 (the chunk budget) · Ch. 7 (At-5; saliency vs hierarchy) · Ch. 8 (Vs-1) · Ch. 14 (G1's mechanism) · Ch. 18 (what each rung says) · Ch. 19 (the four-size ceiling) · Ch. 27 (Rung 3) · Ch. 28 (Ih-3 in full). Master Vision §6.2, §11.2, §16.2, §16.3. UX Blueprint Ch. 20, Ch. 23.

---

## 10. STATUS

The three-rung model is this Bible's own decomposition of §11.2's first question. Well supported by the dependency argument and by convergence with two independent inherited constraints (the four-chunk load budget and the four-size type ceiling), but not tested against a real hero with real readers. The convergence is encouraging evidence, not proof.

**Open question.** Whether Rung 2 may ever precede Rung 1 — an audience-first hero ("For real estate teams:" followed by the transformation) — is unresolved. It appears to violate the dependency chain; but a very short prefix may function as a scoping cue that resolves *before* Rung 1 rather than depending on it. No such construction is proposed here. If one is, evaluate it against the regression watch rather than arguing it theoretically — that test would settle it directly.

---

*End of Part IV. Part V turns to persuasion.*
