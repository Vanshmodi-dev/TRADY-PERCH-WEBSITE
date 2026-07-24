# CHAPTER 34 — AVATARS & IDENTITY ELEMENTS

**Trady Perch Design System Bible · Volume II: Components**
*First-canonical-draft.*

**Inherited From:** Master Vision §6.4 (no mascots/characters), Chapter 19 (AI Personality Constitution). Design System Bible Chapter 1 (P1, P7), Chapter 3 (color), Chapter 9 (elevation), Chapter 12 (photography), Chapter 13, Il-1 (no character/mascot rule, extended here), Chapter 17 (anatomy standard).

---

## 1. INTRODUCTION

Avatars represent people, organizations, and — uniquely among this system's identity needs — the AI itself in any conversational surface (Chapter 45). This is a small component with a disproportionately visible detail cost: a generic circular-crop-with-drop-shadow avatar is one of the fastest tells of an unconsidered system, and an anthropomorphized AI avatar would directly contradict Master Vision §6.4's mascot prohibition at the exact moment a visitor first meets the brand's AI.

This chapter depends on Chapter 12 for photographic treatment and Chapter 13's Il-1 for the AI-identity boundary. It is depended on by Chapter 45 (Conversational & Voice Interaction Patterns), which needs this chapter's AI-identity marker resolved before it can be written.

---

## 2. PHILOSOPHY

The rejected alternative for human avatars is the near-universal circular crop with a generic drop shadow — technically simple, and a direct contradiction of Chapter 12's carefully-reasoned photography rules the moment it's applied without adaptation. The rejected alternative for the AI's identity marker is a friendly robot icon or a stylized face — directly forbidden by Master Vision §6.4 and Chapter 13's Il-1, extended here to a component category neither chapter anticipated when written.

---

## 3. CORE PRINCIPLES

### Av-1 — Human Avatars Follow Chapter 12's Photography Rules, Adapted to a Small Crop

**Purpose.** A photographic avatar is cropped from an image shot under Chapter 12's lighting and composition rules — never a generic headshot with even, flat lighting or direct camera-eye-contact "corporate" posing that Chapter 12, §8.2 already excludes.

**Reasoning.** Descends from Principle 7: avatars are photography, at a small size, and should not be exempted from the same rules governing every other photographic asset merely because the crop is circular and small.

**When it applies.** To every photographic human avatar. **When it does not apply.** No exception.

### Av-2 — The Fallback Is Initials, Never a Generic Silhouette

**Purpose.** Where no photograph is available, an avatar falls back to the person's initials on a solid `surface.card` background — never a generic person-silhouette icon.

**Reasoning.** Descends from Principle 1: a silhouette icon represents "no photo available" ambiguously across every unrelated product that also uses it; initials are specific to the actual person and carry real information even in the fallback case.

**When it applies.** To every avatar with no available photograph. **When it does not apply.** No exception.

### Av-3 — The AI's Identity Marker Is Abstract and Never Anthropomorphized

**Purpose.** Any visual marker representing the AI in a conversational interface (Chapter 45) is an abstract mark — the TP monogram at small scale, or a simple geometric glyph consistent with Chapter 11's iconography — never a face, character, or any human-like representation.

**Reasoning.** Direct extension of Master Vision §6.4's mascot prohibition and Chapter 13's Il-1 to this specific, previously unaddressed component: an AI chat bubble is exactly the kind of interface moment a generic product would default to a friendly cartoon avatar for, and this brand's entire premise (Master Vision §3.3, §19.1) depends on that default never being reached.

**When it applies.** To every visual representation of the AI across every conversational surface. **When it does not apply.** No exception.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Anatomy** (per An-1): Container (circular or rounded-square, per context) → Photographic image, Initials fallback, or AI Mark (mutually exclusive content per avatar type).

**Variant axes** (per An-2): **Type** — `photo`, `initials` (Av-2), `ai-mark` (Av-3). **Size** — matching Chapter 11's icon size steps (16/20/24/32/48px) for visual family consistency at every scale an avatar might appear.

**Token consumption:** `semantic.color.surface.card` (initials/AI-mark background), `semantic.color.text.primary` (initials text), `semantic.color.accent.primary` (AI mark, sparingly, per Chapter 3's scarcity rules).

---

## 5. MEASUREMENTS

Sizes: matches Chapter 11's five icon steps exactly, no independent avatar-specific scale. Initials: maximum two characters.

---

## 6. STATE COVERAGE (per An-3)

Hover/Focus/Active apply only where an avatar is independently clickable (linking to a team member's profile, once Chapter 14.2's About page exists) — Chapter 39 defaults. Disabled/Loading/Error/Success/Empty: Loading applies during initial photo fetch (Chapter 31 skeleton, circular); the rest are not typically applicable to a static identity element.

---

## 7. MOTION SPECIFICATION

An avatar's appearance (in a newly-arrived chat message, for instance) uses Chapter 15's Quick tier — brief, since an avatar's arrival is a minor, frequent event within a larger conversation rather than a significant standalone moment.

---

## 8. ACCESSIBILITY

Every avatar carries an accessible name identifying who or what it represents (a person's name, or "Trady Perch Assistant" for the AI mark) — an image-only avatar with no accessible name is invisible information to a screen-reader user.

---

## 9. RESPONSIVE BEHAVIOUR

Size steps remain constant across breakpoints; avatars generally use smaller steps (16–24px) in dense contexts and larger steps (32–48px) in spacious ones (a testimonial card, Chapter 19), regardless of viewport.

---

## 10. AI & FUTURE INTERFACES

Av-3 is itself this chapter's direct answer to the AI & Future Interfaces question — the AI mark defined here is the exact visual identity Chapter 45's conversational surfaces and Chapter 72's future voice interface (as a visual companion, where one exists) must reuse without modification, per Principle 7.

---

## 11. DO / 12. DON'T

**Do:** A testimonial card showing a client's photographic avatar, correctly lit and cropped per Chapter 12, beside their name and company. **Don't:** A chat interface representing the AI with a small smiling robot face icon — direct Av-3 and Master Vision §6.4 violation, regardless of how subtle or tastefully drawn the icon is.

---

## 13. ANTI-PATTERNS

**Default anthropomorphization.** Reaching for a friendly character or face icon to represent the AI because that is the near-universal convention across chat products. This is detected by checking any AI-representing visual element for human or character features, and fixed by replacing it with the abstract mark per Av-3.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Does a photographic avatar follow Chapter 12's lighting and composition rules? *(Av-1)*
- [ ] Does the no-photo fallback show initials rather than a generic silhouette? *(Av-2)*
- [ ] Is the AI's identity marker abstract, with no face, character, or human-like feature? *(Av-3)*
- [ ] Does every avatar carry an accessible name?

---

## 15. CROSS REFERENCES

Chapter 1 (P1, P7). Chapter 3 (color). Chapter 9 (elevation). Chapter 11 (icon size steps). Chapter 12 (photography rules). Chapter 13 (Il-1, extended). Chapter 15 (motion). Chapter 17 (anatomy standard). Chapter 31 (loading skeleton). Chapter 39 (state model). Chapter 45 (Conversational Patterns, direct dependent). Master Vision §6.4, Chapter 19.

---

## 16. FUTURE EXPANSION

No open questions currently identified beyond those already flagged for Chapter 45's fuller treatment.

---

*End of Chapter 34. The next chapter, per the authoring sequence, is Empty States & Zero-Data Design.*
