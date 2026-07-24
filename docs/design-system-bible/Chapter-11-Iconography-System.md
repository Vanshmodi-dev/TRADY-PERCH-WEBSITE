# CHAPTER 11 — ICONOGRAPHY SYSTEM

**Trady Perch Design System Bible · Volume I: Foundations**
*First-canonical-draft.*

**Inherited From:** Master Vision §6.4 (Iconography & Imagery), §20.10 (Icon Sizing Logic philosophy). Design System Bible Chapter 1 (P2, P3, P7), Chapter 2 (required Core category), Chapter 3 (icon color roles), Chapter 4 (the typographic stroke-weight alignment this chapter's stroke ratio is tuned against).

---

## 1. INTRODUCTION

Master Vision §6.4 sets the icon system's character in a sentence: thin-stroke, geometric, monoline, reading as "an extension of the typography, not a separate illustrative layer." This chapter turns that character into an actual grid, stroke ratio, and color-assignment rule.

This chapter depends on Chapter 4 directly — §20.10's claim that icons should read as typography's extension only holds if the icon stroke weight is tuned to visually agree with the type system's own stroke contrast, which this chapter verifies rather than assumes. It depends on Chapter 3 for every color assignment. Nearly every component chapter in Volume II consumes this chapter's sizing scale.

---

## 2. PHILOSOPHY

The rejected alternative is treating iconography as its own independent illustrative discipline, with its own visual logic disconnected from the type system beside it. This is how most icon sets are built — optimized for legibility at a glance, without checking whether their stroke weight, corner treatment, or optical density actually agrees with the typeface they'll sit next to. Master Vision §20.10 rejects this specifically, and this chapter's actual design work is mostly the discipline of checking every icon decision against the type system already defined in Chapter 4, rather than inventing icon-specific conventions independently.

---

## 3. CORE PRINCIPLES

### Ic-1 — One Grid, Five Sizes, One Stroke Ratio

**Purpose.** All icons are drawn on a single 24×24px base grid (20×20px live area, 2px inset on each side), and scale to exactly five defined sizes (Section 4), with stroke weight scaling proportionally rather than remaining fixed.

**Reasoning.** Descends from Principle 7: one grid and one stroke-to-size ratio, applied consistently, produces an icon set that reads as one coherent family at any size, rather than a set of individually-drawn icons that happen to share a general style.

**Examples.** A 24px icon uses a 1.5px stroke (ratio 1:16); a 48px icon scales to a 3px stroke, maintaining the identical 1:16 ratio rather than reusing the 1.5px stroke at double the size, which would look comparatively thin and disconnected from the smaller version.

**When it applies.** To every icon in the system, at every size it's used at.

**When it does not apply.** No exception.

**Common misunderstandings.** Assuming a fixed stroke weight (always 1.5px regardless of size) is simpler and therefore preferable. It is simpler to specify and produces a visibly inconsistent family — thin and delicate at large sizes, clogged and illegible at small ones — which is precisely what the proportional ratio in this principle prevents.

### Ic-2 — Rounded Caps and Joins, Never Sharp Miters

**Purpose.** Every icon's line caps and corner joins use a consistent, soft rounding — never a sharp, mitered corner.

**Reasoning.** Direct extension of the brief's "sharp edges mixed with soft rounded corners where appropriate" (Master Vision, Design Philosophy) applied specifically to icons: a monoline icon set with sharp miters reads as technical/engineering-diagram in character, which pulls toward a colder register than this brand's precision-instrument-but-still-warm positioning (§3.3) intends. Rounded caps keep the icon set feeling considered and soft-edged without sacrificing the geometric, monoline discipline §6.4 requires.

**Examples.** A checkmark icon's two strokes meet in a rounded join, not a sharp point; a line's terminating end is a rounded cap, not a squared-off one.

**When it applies.** To every icon's caps and joins.

**When it does not apply.** No exception.

**Common misunderstandings.** Assuming "rounded" means the icon's overall silhouette must be circular or soft-shaped. It refers specifically to line caps and joins — an icon's overall geometry (a square, an arrow) can and should remain geometrically precise; only the stroke's own terminations are rounded.

### Ic-3 — Color Follows Text Hierarchy by Default; Gold Is Earned, Not Assigned

**Purpose.** An icon's default color matches the text hierarchy it sits beside — `text.primary` or `text.secondary` (Chapter 3) — and is rendered in `accent.primary` gold only for a genuinely active, selected, or highlighted state, never as a default or decorative choice.

**Reasoning.** Direct restatement of Master Vision §6.4: icons "should almost always render in white or cool gray, with gold reserved for the rare 'active' or 'highlighted' icon state," directly extending Principle 3 (The Scarce Signal) into iconography specifically.

**Examples.** A default navigation icon: `text.secondary`. The same icon in its active, currently-selected state: `accent.primary`.

**When it applies.** To every icon's default color assignment.

**When it does not apply.** To icons specifically representing a state color already established elsewhere (a success checkmark in `text.success`, an error icon in `border.error`, per Chapter 3's C-4) — these are not gold-scarcity violations, they are a different, already-governed color category entirely.

**Common misunderstandings.** Treating "this icon is important" as sufficient justification for gold. Importance alone is not the test — genuine active/selected state is, per §6.4's specific wording.

### Ic-4 — No Filled Icons, No Duotone, No Mascots

**Purpose.** Every icon in the system is monoline (stroke-only, no filled shapes), single-color (no duotone or gradient fills), and never illustrative or character-based.

**Reasoning.** Direct, explicit restatement of Master Vision §6.4's ban, made checkable: "no filled/glyph-style icons, no illustrated mascots, no emoji."

**Examples.** A settings icon: an outlined gear, stroke-only. Never a solid, filled gear glyph; never a cartoon character holding a wrench.

**When it applies.** To every icon in the system, without exception.

**When it does not apply.** No exception.

**Common misunderstandings.** Assuming a "selected" state icon may legitimately switch to a filled variant to signal selection more strongly. Selection is signaled by Ic-3's color rule (gold), never by switching construction method — a filled icon appearing anywhere in the set, even only in a selected state, breaks Ic-4's system-wide monoline consistency.

---

## 4. COMPLETE DESIGN SPECIFICATION

- **Base grid:** 24×24px, 20×20px live area (2px inset per side).
- **Size scale (five steps):** 16px, 20px, 24px, 32px, 48px.
- **Stroke ratio:** 1:16 of icon size — 1px at 16px, 1.25px at 20px, 1.5px at 24px, 2px at 32px, 3px at 48px.
- **Corner treatment:** rounded caps and joins throughout (Ic-2).
- **Default colors:** `semantic.color.text.primary` (paired with primary text), `semantic.color.text.secondary` (paired with secondary text/metadata) — matching whichever text color the icon sits directly beside.
- **Active/highlighted color:** `semantic.color.accent.primary`.
- **State colors:** `semantic.color.text.success`, `semantic.color.border.error` where an icon represents a state rather than a navigational or descriptive function.

---

## 5. MEASUREMENTS

- **Grid:** 24×24px. **Live area:** 20×20px. **Sizes:** 5 (16, 20, 24, 32, 48px). **Stroke ratio:** 1:16, held constant across all five sizes.
- **Inset:** 2px per side at base grid, scaling proportionally at other sizes (e.g., ~1.33px at 16px, ~4px at 48px) to preserve the same relative live-area proportion.

---

## 6. BEHAVIORAL RULES

**Before drawing a new icon.** Confirm it fits within the 20×20 live area at the 24px base grid, using the 1.5px stroke at that size, per Ic-1.

**Before assigning a color.** Default to matching adjacent text color; apply gold only where a genuine active/selected state, per Ic-3, is present.

**Under a proposal for a filled or duotone treatment.** Rejected outright per Ic-4 — no exception process exists for this rule, unlike most others in this Bible.

---

## 7. MOTION SPECIFICATION

An icon's color transition into its active gold state (Ic-3) animates using Chapter 15's Quick tier, matching the general hover/focus timing established for other Quick-tier interface feedback (Chapter 9, §7) — an icon lighting up gold should feel like an immediate response to selection, not a deliberate, slow reveal.

---

## 8. ACCESSIBILITY

Every icon used without accompanying visible text must carry a text-equivalent label for assistive technology — this chapter's monoline, non-illustrative style (Ic-4) makes icons harder, not easier, to interpret out of context compared to a detailed illustrative icon, which makes this labeling requirement more important here than in a more literal icon system, not less. Icon color alone must never carry meaning (an error icon must also differ in shape or be paired with text, not rely on `border.error`'s color alone), consistent with Chapter 3 §8's color-and-icon pairing requirement.

---

## 9. RESPONSIVE BEHAVIOUR

The 16px and 20px steps are the primary sizes at Mobile/Tablet ranges (Chapter 8), where a smaller interface generally calls for smaller supporting icons; 24px and 32px are primary at Desktop and above. The 48px step is reserved for rare, deliberately large icon moments (an empty-state illustration substitute, Chapter 38) at any breakpoint.

---

## 10. AI & FUTURE INTERFACES

A spatial environment (Chapter 73) will need icons re-considered as genuinely three-dimensional or billboard-facing objects rather than flat glyphs — Ic-1's stroke-ratio discipline should still govern the relationship between an icon's apparent size and its line weight at any real-world scale, even though the flat 24px grid itself has no direct spatial equivalent.

---

## 11. DO

Using a 24px, `text.secondary`-colored, monoline arrow icon beside a "View case study" link, switching to `accent.primary` only if that link becomes the keyboard-focused or hovered active item on the page.

## 12. DON'T

Introducing a filled, solid-color "star" icon for a "featured" badge because a stroke-only star felt too subtle for the intended emphasis. This violates Ic-4 directly; the correct way to add emphasis is Chapter 3's `accent.primary` color applied to the existing stroke-only icon, or a Chapter 33 badge treatment — never a change in construction method.

---

## 13. ANTI-PATTERNS

**Icon library grab.** Pulling icons from a general-purpose third-party icon library without redrawing them to this chapter's exact stroke ratio, corner treatment, and grid. This is dangerous because most third-party icon sets use their own internally consistent but different stroke ratios and corner logic — mixing sources produces a set that looks coherent individually but visibly inconsistent in aggregate, the icon-level equivalent of the casing-drift anti-pattern in Chapter 63. It is detected by checking any newly added icon's stroke weight and corner treatment against Section 4's exact values, not merely its general "look." It is fixed by redrawing the icon to spec rather than importing it unmodified.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does the icon sit within the 20×20 live area at the 24px base grid, or the correctly scaled equivalent at another defined size? *(Ic-1)*
- [ ] Does the stroke weight match the 1:16 ratio at whichever size the icon is rendered? *(Ic-1)*
- [ ] Do all caps and joins use consistent rounding, with no sharp miters? *(Ic-2)*
- [ ] Does the icon's default color match its adjacent text hierarchy, with gold reserved strictly for active/selected states? *(Ic-3)*
- [ ] Is the icon monoline, single-color, and non-illustrative, with no filled, duotone, or mascot-style treatment anywhere in the set? *(Ic-4)*
- [ ] Does every icon used without visible text carry an assistive-technology label?

---

## 15. CROSS REFERENCES

Chapter 1 (P2, P3, P7). Chapter 2 (Core category). Chapter 3 (color roles, state-color pairing rule). Chapter 4 (stroke-weight agreement with typography). Chapter 9 (Quick-tier transition timing). Chapter 38 (Empty States, primary consumer of the 48px step). Master Vision §6.4, §20.10.

---

## 16. FUTURE EXPANSION

**Documented limitations.** The 1:16 stroke ratio has been reasoned from Chapter 4's type-stroke-agreement goal but not yet visually verified against an actual rendered General Sans glyph at matching sizes — this verification should occur once real type and icon assets exist side by side.

---

*End of Chapter 11. The next chapter written, per the authoring sequence, is Motion & Timing System — the last major Foundations chapter before Volume II can begin.*
