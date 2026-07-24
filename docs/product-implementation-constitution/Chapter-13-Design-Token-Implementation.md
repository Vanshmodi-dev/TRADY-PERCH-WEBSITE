# CHAPTER 13 — DESIGN TOKEN IMPLEMENTATION

**Trady Perch Product Implementation Constitution · Part III: Component Architecture & Design System Implementation**

**Inherited From:** Design System Bible Chapter 2 (Design Tokens Architecture, in full — T-1 "The Three-Tier Resolution Model," T-2 "One Raw Value, Many References," T-3 "Semantic Names Describe Role, Never Appearance," T-4 "Component Tokens Are a Last Resort," T-5 "Tokens Are Deprecated, Never Silently Deleted"), Chapter 3 (Color), Chapter 4 (Typography), Chapter 5 (Spacing). Chapter 3 of this Constitution (The Translation Doctrine) and Chapter 11 are this chapter's direct premises.

---

## 1. INTRODUCTION

Design System Bible Chapter 2 defines three tiers of token — core, semantic, component — and the rules governing how a value moves between them. This chapter is the mechanical bridge from that model to an actual, single-source-of-truth build artifact: the literal pipeline that takes a token definition and produces every CSS custom property, every typed constant, and every value a component in `packages/ui/` actually consumes. This chapter does not re-derive a single color, size, or spacing value — those belong entirely to Design System Bible Chapters 3 through 5, cited and never repeated here.

---

## 2. THE SINGLE SOURCE OF TRUTH

Every token — core, semantic, or component-tier — is defined exactly once, in `packages/tokens/`, as structured data (not hand-written CSS or hand-written TypeScript constants maintained in parallel). This single definition is the input to a build step that generates every consuming format: CSS custom properties for runtime styling, typed TypeScript constants for any value consumed in logic rather than styles, and, where relevant, a Chapter 61-documented reference table.

This single-source model is the direct mechanical guarantee behind Chapter 3's translation ledger for tokens specifically: because every consuming format is *generated* from one definition rather than independently authored, a translation ledger entry for a token cites the one source definition, and Chapter 3's orphan/duplicate detection applies to that one definition rather than needing to separately check three hand-maintained copies for drift.

---

## 3. THE THREE-TIER PIPELINE

T-1's three tiers become three literal layers in the build:

**Core tokens** — raw values (a hex code, a pixel number) with no semantic meaning attached, generated as the innermost layer of CSS custom properties, never consumed directly by a component per T-2 and T-3.

**Semantic tokens** — named by role, not appearance, per T-3, generated as a second layer of CSS custom properties that reference core tokens by value, never redeclaring the raw value. `semantic.color.text.error` resolves to a core color value through a reference, not a duplicate literal — enforced by the build step rejecting any semantic token definition containing a raw value instead of a core-token reference.

**Component tokens** — the last resort per T-4, generated only for the specific, named cases Design System Bible has documented as requiring a value semantic tokens cannot serve. The build step flags a component-tier token with no corresponding Design System Bible citation as a Chapter 3 orphan.

A component in `packages/ui/`, per Chapter 12's template, consumes semantic or component tokens exclusively — never a core token directly, which is exactly what T-2 and T-3 forbid, mechanically enforced by generating core tokens into a namespace the component-authoring lint rule (Section 6) flags if referenced outside the token pipeline itself.

---

## 4. TOKEN DEPRECATION

T-5 forbids silent deletion. The build pipeline enforces this directly: removing a token definition from the source data without first marking it deprecated (a status field, carrying a deprecation date and, where known, its replacement) fails the build. A deprecated token continues to resolve to its value — consumers are not broken — but its generated CSS custom property and TypeScript constant carry a marker (a code comment, a lint-rule trigger) surfacing the deprecation to any component still referencing it, driving that component toward Chapter 66's debt register if the migration isn't immediate.

---

## 5. PLATFORM & FORMAT OUTPUT

The single source in Section 2 generates CSS custom properties as the primary runtime format, and TypeScript constants for any value a component's logic (not its styling) needs to read directly — an animation duration threshold used in a `setTimeout`-equivalent, for instance, rather than only in CSS. Both outputs are generated artifacts, never hand-edited; a hand-edit to a generated file is itself an orphan the moment the pipeline is re-run and overwrites it, which is the intended, self-correcting behavior, not a bug to work around.

---

## 6. ENFORCEMENT & MEASUREMENT

This chapter's success criterion — a single source-value change propagating correctly with zero manual find-and-replace — is verified directly by Chapter 48's visual regression suite: changing one core token and re-running the suite should produce exactly the diff expected from every component that consumes it downstream, and no diff anywhere else. A lint rule flags any component file containing a raw color, size, or duration literal instead of a generated token reference — the mechanical enforcement of T-2 and T-3 at the point of component authorship, not only at the pipeline's own output. A second lint rule flags any component referencing a core-tier token directly, enforcing T-4's "last resort" constraint on component tokens by the contrapositive: nothing skips the semantic layer in the other direction either.

---

## 7. BEHAVIORAL RULES

**When a new value is needed.** Chapter 3's translation procedure runs first — check whether an existing semantic token serves, per T-2's "one raw value, many references" and Chapter 1's IP3, before defining a new one.

**When a token's value changes.** The change is made once, at its source definition, and the full pipeline is re-run — never patched in a specific generated output file to save a rebuild.

**When a token is no longer needed.** It is marked deprecated per Section 4, with a stated migration path, never deleted outright in the same change that removes its last consumer — the deprecation and the removal are two separate, sequenced changes, giving Chapter 66's debt register visibility into the gap between them.

---

## 8. DO / DON'T

**Do** define every new value once, in `packages/tokens/`'s source data, letting the build generate every consuming format.

**Do** reference a semantic token from component code, never a core token directly.

**Don't** hand-edit a generated CSS or TypeScript token file — the edit will be silently overwritten the next time the pipeline runs, and per Section 5 this is treated as expected, self-correcting behavior.

**Don't** delete a token definition outright the moment its visible use count reaches zero — deprecate it first per T-5 and Section 4.

---

## 9. ANTI-PATTERNS

**The parallel hand-maintained token file.** A developer, needing a token value in a context the generated output doesn't yet cleanly support, hand-writes a duplicate constant instead of extending the pipeline to generate it. This is dangerous because it is Chapter 3's duplicate-translation failure applied to the single most foundational artifact type in the system — the hand-written copy inevitably drifts from the source the moment the source value changes, and the drift is invisible until a visual inconsistency is noticed by chance. It is detected by Section 6's lint rule flagging any raw literal that matches a known token value, a strong signal of exactly this pattern. It is fixed by removing the hand-written constant and extending the pipeline's output format to cover the genuinely missing case.

---

## 10. QUALITY ASSURANCE CHECKLIST

- [ ] Is every new value defined once, in the token source data, rather than hand-written in a consuming file?
- [ ] Does every semantic token reference a core token by value, never redeclaring a raw literal? *(T-2, T-3)*
- [ ] Does every component-tier token cite a specific Design System Bible justification, per T-4?
- [ ] Is a token marked deprecated, with a migration path, before it is ever deleted outright? *(T-5)*
- [ ] Does the component-authoring lint rule pass with zero raw literals and zero direct core-token references?

---

## 11. CROSS REFERENCES

**Within this Constitution:** Chapter 3 (the translation ledger and orphan/duplicate model this chapter applies to tokens specifically). Chapter 11 §3–4 (anatomy and variant mappings that consume this chapter's output). Chapter 12 §3 (the props template referencing semantic/component tokens). Chapter 48 (Accessibility & Performance Test Automation, the visual regression suite verifying Section 6). Chapter 66 (Engineering Debt Register, for deprecated tokens pending migration).

**Within the five documents above this Constitution:** Design System Bible Chapter 2 (in full), Chapter 3 (Color), Chapter 4 (Typography), Chapter 5 (Spacing).

---

## 12. FUTURE EXPANSION

**Documented limitations.** This chapter's pipeline currently targets CSS custom properties and TypeScript constants; a future native-mobile surface (per Chapter 2's Future Roadmap Surfaces) would require an additional generated output format, added to Section 5 only once that surface is actually commissioned, per Chapter 1's IP3.

---

*End of Chapter 13. The next chapter, Motion Implementation Strategy, applies this same single-source discipline to the Motion Bible's duration and easing tokens.*
