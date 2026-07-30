# CHAPTER 25 — INTERACTION PHILOSOPHY

**Trady Perch Hero Experience Bible · Part VII: Behaviour & Response**
*First-canonical-draft. Implementation-independent.*

**Inherited From:** Design System Bible Ch. 15 (tier job assignments), Ch. 39 (the complete state model), Ch. 20 (Nv states). Master Vision §2.2, Ch. 21 (accessibility as a launch condition). UX Blueprint Ch. 6, Ch. 9.
**Governs:** What the hero does when the visitor reaches out.
**Does Not Govern:** Self-initiated motion (Ch. 21), the cursor itself (Ch. 26), or the CTA (Ch. 27).

---

## 1. THE POSITION

Everything before this chapter concerns what the hero *presents*. This concerns what it does when the visitor reaches out — the first two-way exchange between visitor and company, carrying a disproportionate amount of information.

Presentation can be assembled from a template. Response cannot. A surface's behaviour under input reveals whether anyone thought about the states, whether timings were considered, whether edges were tested. Chapter 11 identified this as rung 5 of the capability-proof ladder, and hero interaction is where that rung is most directly demonstrated.

**The governing claim: response latency is read as competence, and response character is read as personality.** Both are decided in under 150 milliseconds.

**Two clocks, running opposite ways.** Px-2: the hero is "generous where it is deciding and immediate where it is responding." Conflating them produces both available failures.

| | **Self-initiated motion** | **Response to input** |
|---|---|---|
| Who started it | The surface | The visitor |
| Correct character | Generous deceleration; settles | Immediate; acknowledges |
| Correct tier | Ceremonial (intro only) | Instant (80ms) / Quick (150ms) |
| Too slow reads as | — | Broken, laggy, incompetent |
| Too fast reads as | Twitchy, anxious | — |
| Governs | Chapter 21 | This chapter |

A hero applying ceremonial pacing to a hover state is not composed; it is unresponsive. One applying input-response speed to its entrance is not efficient; it is anxious. The Design System Bible names the first directly: "a hover state assigned anything slower than Quick is immediately suspect."

**Response is an acknowledgement, not an event.** A well-made response confirms the input was received — that is its entire job, and every attempt to make it an opportunity for expression produces a worse interaction. A hover that *transforms* rather than acknowledges draws attention to itself and costs the composure signal. A response with a delay before it begins reads as the system thinking, which for an element requiring no thinking is a fabricated impression (Ac-3). A response that overshoots or bounces reads as playful, forbidden outright. The correct model is a well-machined physical control: immediate, proportionate, obviously present, entirely unremarkable — Lx-2's seen-more-than-noticed.

**Only meaningful things respond.** A surface responding to everything teaches nothing. A surface where response indicates *actionability* teaches the interaction model in one gesture. This is Cg-4's interaction analogue: an element that responds to hover but does nothing when clicked is ambiguous, and ambiguity is the most expensive element type available. **In the hero, response is reserved for things that can be operated. Everything else is inert, and its inertness is information.**

---

## 2. CORE PRINCIPLES

**Ix-1 — Immediate acknowledgement, always.** Every operable element acknowledges input within the Instant or Quick tier, without delay. Latency in response is the clearest available signal of a poorly built surface, charged directly against technical credibility. *The acknowledgement is instant; the resulting navigation or action takes as long as it takes.*

**Ix-2 — Only operable things respond.** No decorative or ambient element reacts to pointer, hover, or scroll position. This also protects Mo-2 — a background tracking the cursor is continuous motion with a different trigger, holding Rung-1 saliency for as long as the visitor moves the mouse, which is continuously. *Navigation, the skip control, and any genuinely operable element all respond correctly — the rule is about what does not.*

**Ix-3 — Response character is uniform.** Every operable element responds in the same way, at the same tier, with the same character. Varied response characters across a single viewport read as a surface assembled from parts — precisely the freelancer-portfolio signal. *Response magnitude may scale with prominence; character and tier may not. A nav link and a CTA need not look alike when hovered; they must feel alike in timing and directness.*

**Ix-4 — Every state exists and is designed.** Every operable element has a designed default, hover, focus, active, and where applicable disabled and loading state. The states most often left undesigned are focus (invisible to mouse users, decisive for keyboard users) and active (visible for 80ms, and its absence is felt as unresponsiveness even when nothing is technically wrong). The cheap-experience taxonomy is largely a list of undesigned states. *States that are not applicable are declared not applicable, in writing — DSB Ch. 20 does exactly this for nav items, which are never disabled. Several states may share a treatment; what is required is that each has been decided.*

**Ix-5 — The visitor owns scroll and pointer.** The hero never modifies, intercepts, or interprets scroll or pointer input — no scroll hijacking, snapping, momentum modification, pointer-lock effects, custom scroll physics, or gesture interception. Scroll and pointer are the visitor's most direct expressions of intent; intercepting either removes control at the exact moment the hero's work is being banked. *Stricter than Mo-6: a hero may not alter how far or how fast a scroll goes even if nothing animates.*

**Ix-6 — Nothing appears uninvited.** No element appears, opens, expands, or intrudes without a visitor action that requested it — chat widgets opening unprompted, exit-intent overlays, timed tooltips, delayed promotional bars, cookie banners appearing after a delay rather than immediately. Each is an eagerness signal delivered at the moment the visitor is forming their judgment. *Exception: a consent notice required by law, which must appear immediately, must not cover the claim, and counts against Cg-5's composite load. This covers anything that changes without being asked, including an element that animates in at T+6s.*

---

## 3. THE HERO'S RESPONSE CONTRACT

| State | Obligation | Tier | Notes |
|---|---|---|---|
| **Default** | Legibly operable | — | Affordance without decoration |
| **Hover** | Immediate acknowledgement | Quick (150ms) | Pointer devices only; must never move the element off its resting position |
| **Focus** | Clearly visible ring, unmistakable, never suppressed | Quick | The keyboard visitor's only orientation signal |
| **Active / press** | Immediate, brief compression or equivalent | Instant (80ms) | Confirms the press was received before the outcome arrives |
| **Disabled** | Declared not applicable, or designed | — | Nav items are never disabled — the item is removed instead |
| **Loading** | If the action takes time, the state is honest about it | — | Never fabricate delay |

**On focus.** The state most often left to a browser default or suppressed for aesthetic reasons. Both are failures: the default is inconsistent with the brand's material language, and suppression makes the hero unusable for keyboard visitors while being invisible to everyone reviewing with a mouse. Master Vision requires visible focus states as a launch condition, not a refinement.

---

## 4. WHAT INTERACTION COMMUNICATES

| Behaviour | Reads as | Verdict |
|---|---|---|
| Response within 80–150ms | Well built, alive, competent | Required (Ix-1) |
| Response after 300ms+ | Laggy; something is wrong | Defect |
| No response on an operable element | Broken, or not a control | Defect |
| Response on a decorative element | Confusing; false affordance | Forbidden (Ix-2) |
| Element moves off its resting position on hover | Imprecise; the target shifts under the pointer | Forbidden (Bp-3) |
| Bounce or overshoot | Playful | Forbidden (§2.2) |
| Different response characters across elements | Assembled from parts | Forbidden (Ix-3) |
| Focus ring visible and consistent | Considered; built for everyone | Required (Ix-4) |
| Focus ring suppressed | Untested; excludes keyboard visitors | Defect |
| Scroll modified in any way | Prioritises effect over the visitor | Forbidden (Ix-5) |
| Widget opens unprompted | Eager; confirms the visitor's suspicion | Forbidden (Ix-6) |
| Cursor-following background effect | Novelty; permanent attention capture | Forbidden (Ix-2, At-2) |

---

## 5. DO / DON'T

**Do.** Design the focus state before the hover state. Hover is the state everyone sees during review and therefore the state that gets attention; focus is the state that decides whether the hero is usable for an entire class of visitor, and it is invisible to the people reviewing it. Reversing the usual order costs nothing and closes the most common interaction defect in otherwise well-made heroes.

**Don't.** Add a subtle material response that follows the cursor — a highlight that tracks the pointer, a background that shifts with mouse position. It is the most requested hero interaction and it fails four ways: it is a decorative element responding (Ix-2), it is continuous motion holding Rung 1 for as long as the mouse moves (At-2, Mo-2), it creates a false affordance the visitor may test by clicking (Cg-4), and it does not exist at all for touch, keyboard, or screen-reader visitors — so whatever personality it transmits is transmitted to a subset, and Fs-3 forbids a variant carrying less.

---

## 6. ANTI-PATTERNS

**The undesigned state.** Focus, active, or loading left to a framework default. Detected by tabbing through the hero and by pressing and holding each control. Fixed by Ix-4's requirement that each state be decided, not necessarily distinct.

**Response inflation.** A hover response growing across releases — first a colour change, then a lift, then a shadow, then a scale — because each addition individually makes the element feel "more alive." Detected by comparing releases. Each addition also increases the chance the element moves off its resting position, which is a precision failure.

**Interaction as personality.** Treating hover and press as expressive surface rather than acknowledgement. Detected by asking what a response communicates beyond "received"; any additional answer is the anti-pattern. It produces the memorable-but-unconvincing hero of Hp-1's inversion.

**Delayed intrusion.** Something appearing at T+5s or T+10s — a widget, a banner, a prompt — on the reasoning that the visitor has "settled in." They have not; they are at Phase 4 or 5, and the intrusion lands precisely where the emotional handoff is decided (Ej-5).

---

## 7. ACCEPTANCE CRITERIA

- [ ] Every operable element acknowledges input within Instant or Quick. *(Ix-1)*
- [ ] No decorative or ambient element responds to pointer, hover, or scroll. *(Ix-2)*
- [ ] Response character and tier are uniform across all operable elements. *(Ix-3)*
- [ ] Every state in §3 is designed or explicitly declared not applicable, in writing. *(Ix-4)*
- [ ] Focus is visible, consistent, and never suppressed. *(Ix-4, §3)*
- [ ] No hover moves an element off its resting position. *(Bp-3, §4)*
- [ ] Scroll and pointer are entirely unmodified. *(Ix-5)*
- [ ] Nothing appears, opens, or expands without a visitor action. *(Ix-6)*
- [ ] The hero has been operated by keyboard and by touch, not only by mouse. *(§5)*

---

## 8. CROSS REFERENCES

Ch. 3 (Bp-2, Bp-3) · Ch. 4 (Cg-4) · Ch. 5 (Ej-5) · Ch. 6 (Fs-5) · Ch. 7 (At-2) · Ch. 9 (Px-2) · Ch. 11 (rung 5) · Ch. 12 (Pa-5) · Ch. 21 (Mo-2, Mo-6) · Ch. 26 · Ch. 27 · Ch. 28. Master Vision §2.2, Ch. 21. Design System Bible Ch. 15, Ch. 20, Ch. 39. UX Blueprint Ch. 6, Ch. 9.

---

## 9. STATUS

The tier assignments are fully inherited; this chapter invents no timings. What it adds is the *ordering* argument in §1 (two clocks) and the response contract in §3, both of which consolidate rules distributed across several inherited chapters rather than introducing new ones.

**Deliberate gap.** Touch-specific interaction — target sizing, gesture handling, the absence of hover — is named here only where it intersects with the hero's obligations. Chapter 31 carries the mobile treatment, and DSB Ch. 43 (Touch & Gesture Standards) governs the underlying rules.

---

*End of Chapter 25. Chapter 26 addresses the visitor's proxy body on the surface.*
