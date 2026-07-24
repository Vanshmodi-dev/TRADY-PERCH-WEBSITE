# CHAPTER 8 — RESPONSIVE & BREAKPOINT SYSTEM

**Trady Perch Design System Bible · Volume I: Foundations**
*First-canonical-draft.*

**Inherited From:** Master Vision Chapter 21 (Mobile & Responsive Philosophy). Design System Bible Chapter 1 (P2, P4, P7), Chapter 2, §9 (token resolution across breakpoints), Chapter 4, §9 (type step resolution), Chapter 5, §9 (spacing role resolution), Chapter 6 (grid), Chapter 7 (layout patterns and their per-breakpoint collapse behavior).

---

## 1. INTRODUCTION

Every Foundations chapter so far has deferred one specific question to this chapter: what are the actual breakpoints, and what changes at each one? Master Vision Chapter 21 states the governing philosophy — mobile-first, not retrofitted; density adapts, not just size — without naming a single pixel value. This chapter names them, and specifies the resolution mechanism every earlier chapter's Section 9 has been pointing toward.

This chapter depends on every preceding Foundations chapter. It is depended on, in turn, by Chapters 49–51 (Mobile, Tablet, Desktop Standards), which take this chapter's breakpoint definitions and specify the full per-platform experience within them.

---

## 2. PHILOSOPHY

The rejected alternative is treating responsiveness as a size problem alone — the same layout, scaled down, with nothing about its density or content actually reconsidered. Master Vision §21 rejects this directly: "mobile-first... not merely 'responsive' as an afterthought retrofit." A breakpoint system that only asks "how big is the screen" misses the more important question this chapter is built to answer: "how much can a person actually attend to at once, at this screen's scale, and in what physical context are they most likely holding it?" A phone is not a small desktop; it is a different attention and context regime, typically held closer, used in shorter sessions, and navigated with a thumb rather than a cursor with pixel-level precision. This chapter's four ranges are drawn at the points where that regime most clearly shifts, not at arbitrary round numbers.

---

## 3. CORE PRINCIPLES

### Re-1 — Four Named Ranges, Not a Continuous Scale

**Purpose.** The system recognizes exactly four breakpoint ranges — Mobile, Tablet, Desktop, Wide — each with a fixed lower bound (Section 4).

**Reasoning.** Descends from Principle 7: a continuous, infinitely-adjustable responsive system offers no more real design control than no system at all, since every value becomes a one-off decision. Four ranges, matched to Chapter 7's layout-pattern collapse points, is disciplined enough to reason about and broad enough to cover the real device landscape.

**Examples.** A phone in portrait (390px wide) and a small phone in landscape (700px wide) fall into different ranges (Mobile and Tablet respectively) — the system responds to available width, not device category.

**When it applies.** To every layout, type, and spacing resolution decision.

**When it does not apply.** To print and email (Chapter 60), which are not breakpoint-driven at all and are governed by fixed-medium rules instead.

**Common misunderstandings.** Assuming "four ranges" means four fixed device targets (phone, tablet, laptop, monitor). It means four *width* ranges — a resized browser window on a desktop monitor can fall into the Mobile range, and the system must respond to that correctly, not assume desktop width from device category.

### Re-2 — The Smallest Viewport Is Satisfied First, Not Compressed Into

**Purpose.** Every component and layout is designed to work completely at the Mobile range first; Tablet, Desktop, and Wide are additions of room, never corrections of a broken smaller layout.

**Reasoning.** Direct restatement of Master Vision §21's mobile-first mandate, and Principle 4 applied to process rather than presentation: designing desktop-first and compressing down under pressure is the more "assertive," habit-driven default; designing mobile-first and expanding deliberately is the quieter, more disciplined default this system requires throughout.

**Examples.** Chapter 4's type scale specifies a Mobile value for every step *before* its Desktop value is treated as the "main" one — both are equally canonical, and Mobile is not a fallback.

**When it applies.** To the design *process* for any new component or section, not only its final resolved appearance.

**When it does not apply.** To content that is genuinely desktop-exclusive by informed decision (Chapter 51's cursor-dependent patterns, for instance) — mobile-first does not mean every feature must have a mobile equivalent, only that what does appear on mobile must have been designed for it directly, not inherited by compression.

**Common misunderstandings.** Treating "mobile-first" as a purely technical development-order instruction (write mobile CSS first). It is a design-priority instruction: the mobile experience must be verified complete and satisfying on its own terms, independent of whether it was coded first or last.

### Re-3 — A Token Never Forks by Breakpoint Name

**Purpose.** Formalizes, as this chapter's specific responsibility, the resolution mechanism Chapter 2 (§9), Chapter 4 (§9), and Chapter 5 (§9) all deferred here: a token's name is constant across all four ranges; only its resolved value changes, via this chapter's defined breakpoint table.

**Reasoning.** Direct extension of Chapter 2's T-3 and Principle 7 — forking a token's name per breakpoint (`space.md.mobile` versus `space.md.desktop`) would multiply the total token count by four for no gain in expressive power, since the *relationship* the token represents does not actually change across breakpoints, only its resolved size.

**Examples.** `semantic.space.padding.section-lg` resolves to `core.space.16` (64px) at Mobile and `core.space.24` (96px) at Desktop — one name, two resolutions, exactly as Chapter 5's own table already specifies.

**When it applies.** To every token defined in Chapters 2 through 7.

**When it does not apply.** No exception — this is the same closed rule stated three times already; this chapter is where it is finally implemented rather than merely promised.

**Common misunderstandings.** Believing this rule is only about spacing. It applies identically to type steps (Chapter 4), grid spans (Chapter 6), and any other breakpoint-sensitive value this Bible will ever define.

### Re-4 — Foldables and Ultra-Wide Are Ranges, Not Exceptions

**Purpose.** A foldable device's unfolded width, or an ultra-wide monitor's full extent, is handled by the same four-range system — falling naturally into Tablet/Desktop or Wide respectively — rather than requiring a fifth, device-specific breakpoint or a special-case override.

**Reasoning.** Descends from Re-1: a system that needs a new named range for every new physical device category would never stabilize, since device form factors will keep proliferating indefinitely. Defining ranges by *width*, not by device identity, is what makes this chapter durable against hardware trends it cannot currently anticipate.

**Examples.** A foldable device unfolded to 850px falls into the Tablet range and receives the Tablet experience — no separate "foldable" design pass is required, though Chapter 50 should specifically verify the Tablet experience holds up at that exact width as part of its own testing discipline.

**When it applies.** To any device category not explicitly named in Section 4's four ranges.

**When it does not apply.** To a genuinely novel interaction mode a new device introduces beyond width alone (a foldable's hinge, or a device with two physically separate displays) — those are Chapter 8's responsibility to flag as an open question, not to solve by inventing a new breakpoint that doesn't actually address the real difference.

**Common misunderstandings.** Assuming "ultra-wide" needs its own bespoke layout. The Wide range's job (Section 4) is primarily to cap content width and manage excess space gracefully, not to redesign the layout — Chapter 6's Content container max-width (1280px) already prevents most ultra-wide problems by construction.

---

## 4. COMPLETE DESIGN SPECIFICATION

| Range | Lower bound | Typical context |
|---|---|---|
| Mobile | 0px | Phones, portrait and landscape; thumb-driven, closest viewing distance. |
| Tablet | 600px | Tablets, unfolded foldables, small laptop windows; mixed touch/pointer. |
| Desktop | 1024px | Laptops and standard monitors; pointer-driven, cursor precision available (Chapter 44). |
| Wide | 1440px | Large and ultra-wide monitors; Content container caps at 1280px (Chapter 6) regardless of further width beyond this point. |

**What changes at each boundary**, consistent with Master Vision §21's "adapts density, not just size":
- **Mobile → Tablet:** Chapter 6 grid spans may recombine (a stacked Split Narrative regains its two-column arrangement); Chapter 7 Structured Grid increases column count where content allows.
- **Tablet → Desktop:** Chapter 4 type steps resolve to their Desktop values; cursor-dependent interaction (Chapter 44) becomes available; Chapter 5 spacing resolves to Desktop values.
- **Desktop → Wide:** Content container width caps (Chapter 6, Gr-4); no further type or spacing scale-up occurs beyond this point — Wide adds surrounding space, not a larger version of the Desktop experience.

---

## 5. MEASUREMENTS

- **Named ranges:** 4. **Lower bounds:** 0px, 600px, 1024px, 1440px.
- **Content container max-width beyond Wide's lower bound:** fixed at 1280px (Chapter 6) — i.e., the Wide range's *content* does not continue growing past 1440px; only ambient surrounding space does.

---

## 6. BEHAVIORAL RULES

**Before designing any new component.** Verify the Mobile-range resolution first and independently, per Re-2, before resolving Tablet, Desktop, or Wide.

**Under a new device category.** Apply Re-4: resolve its width into one of the four existing ranges; do not create a fifth range unless a genuinely new *interaction mode*, not merely a new width, is discovered.

---

## 7. MOTION SPECIFICATION

Transitions between breakpoints during an active browser resize (rare in practice, but possible) should settle rather than snap, using Chapter 15's Standard tier, consistent with Chapter 5 §7 and Chapter 6 §7's identical treatment of the same underlying concern.

---

## 8. ACCESSIBILITY

Touch target minimums (Chapter 43) apply at Mobile and Tablet ranges specifically, where touch is the primary or likely input; Desktop and Wide ranges assume pointer precision is available but must never assume a mouse is the *only* input, since keyboard navigation (Chapter 42) remains fully required at every range without exception.

---

## 9. RESPONSIVE BEHAVIOUR

This chapter *is* the responsive behavior specification other chapters defer to — there is no further chapter beneath it in the dependency chain for this concern.

---

## 10. AI & FUTURE INTERFACES

A voice interface has no width to range against, but Chapter 72 will need an analogous "context range" concept — a quick, in-passing interaction versus a longer, seated conversation — that this chapter's width-based-not-device-based reasoning (Re-4) should directly inform: context ranges should be defined by actual usage signals, not by assumed device category, exactly as this chapter defines ranges by width rather than by phone-versus-tablet identity.

---

## 11. DO

Verifying a new pricing component's Mobile-range layout completely — legible, usable, correctly stacked — before ever opening a Desktop-width preview, per Re-2's process discipline.

## 12. DON'T

Designing a component exclusively at a 1440px canvas and then "checking how it looks" at narrower widths afterward, patching whatever breaks. This is the exact retrofit process Master Vision §21 and Re-2 both reject, and it reliably produces mobile experiences that function without ever having been genuinely designed.

---

## 13. ANTI-PATTERNS

**Desktop-first retrofitting.** Building and approving a component at Desktop width, then adapting it downward under time pressure once mobile issues surface late. This is dangerous because problems discovered late are more expensive to fix and more likely to be patched superficially rather than genuinely redesigned. It is detected by checking a component's design history — if Mobile was verified after Desktop rather than before or alongside it, the process itself was already at risk regardless of the outcome. It is fixed, going forward, by making Mobile-range approval a required gate before Desktop-range work begins, not an afterthought at the end.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Has the Mobile range been verified complete and satisfying on its own terms, independent of Desktop? *(Re-2)*
- [ ] Does every token resolve under one constant name across all four ranges, with no breakpoint-forked token name in use? *(Re-3)*
- [ ] Does a genuinely new device category resolve into one of the four existing ranges by width, rather than triggering a bespoke fifth range? *(Re-4)*
- [ ] Are touch targets (Chapter 43) verified at Mobile and Tablet specifically, with keyboard navigation verified at every range?

---

## 15. CROSS REFERENCES

Chapters 2, 4, 5, 6, 7 (each of which defers its own §9 to this chapter). Chapters 49–51 (Mobile, Tablet, Desktop Standards, built directly on these four ranges). Chapter 43 (touch targets). Chapter 44 (cursor precision, Desktop-and-above). Master Vision Chapter 21.

---

## 16. FUTURE EXPANSION

**Documented limitations.** The Wide range's "add space, don't add scale" rule (Section 4) has not yet been tested against a genuinely enormous display (a wall-mounted presentation screen, for instance) where even 1280px of content may read as small — flagged as an open question for whichever future chapter first needs to address presentation-display contexts directly (possibly Chapter 60's future companion for live presentations).

---

*End of Chapter 8. This closes the responsive question for every chapter written so far; the remaining Foundations chapters — Elevation, Materials, Iconography, and Motion & Timing — can now proceed with a stable breakpoint system to resolve against.*
