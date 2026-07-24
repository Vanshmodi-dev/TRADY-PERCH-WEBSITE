# CHAPTER 12 — COMPONENT IMPLEMENTATION STANDARD

**Trady Perch Product Implementation Constitution · Part III: Component Architecture & Design System Implementation**

**Inherited From:** Design System Bible Chapter 17 (Component Philosophy & Anatomy Standard) and Chapter 39 (Complete State Model — the eight canonical states: hover, focus, active, disabled, loading, error, success, empty). Chapter 11 (Component Architecture Philosophy) is this chapter's direct premise; this chapter fixes its philosophy into a literal, mandatory template.

---

## 1. INTRODUCTION

Chapter 11 established that a component's anatomy, variants, and states must map into code in a specific way. This chapter is the literal template that mapping produces — the fixed file layout, props typing pattern, and state-wiring convention every component in `packages/ui/` (and any feature-local component per Chapter 8) follows without exception. A component that deviates from this template is not "styled differently" — per this chapter's own success criterion, it fails an automated structural check before it ever reaches human review.

---

## 2. THE FILE LAYOUT

Every component, per Chapter 8 §5's colocation convention, is a folder — not a single file — containing:

```
component-name/
├── component-name.tsx        (implementation)
├── component-name.types.ts   (props and variant types)
├── component-name.test.tsx   (structural + behavioral tests)
├── component-name.stories.*  (documentation, per Chapter 61)
└── index.ts                  (the sole public export)
```

`index.ts` is the only file another component or feature is permitted to import from; every other file inside the folder is an internal implementation detail, per Chapter 1's IP4 — a consumer never reaches past `index.ts` into `component-name.tsx` directly, because doing so would make the folder's actual public surface ambiguous.

---

## 3. THE PROPS TYPE TEMPLATE

`component-name.types.ts` declares, in this fixed order, mirroring Chapter 11 §4's anatomy-to-structure and variant-axis mappings:

1. **Variant props** — one closed-union type per Design System Bible variant axis, named exactly as that axis is named upstream.
2. **State props** — the explicit, typed representation of all eight canonical states, per Section 4 below.
3. **Content props** — the anatomy-derived slots (label, icon, children) a consumer actually fills in.
4. **Behavioral props** — event handlers and callbacks, typed with the specific event shape, never a bare untyped function.

A props type with an untyped `[key: string]: any` escape hatch is not permitted — per Chapter 1's IP6, type safety is treated as a floor this template does not allow convenience to erode, and an escape hatch here defeats Section 7's automated structural check entirely.

---

## 4. THE EIGHT-STATE WIRING STANDARD

Each of Design System Bible Chapter 39's eight canonical states — hover, focus, active, disabled, loading, error, success, empty — is wired into the component template as follows:

- **Hover, focus, active** are handled through the styling layer's native pseudo-state mechanism (Chapter 13's token-driven CSS), never simulated through JavaScript state, because native pseudo-states are both more performant and structurally guaranteed to be mutually exclusive in the way a manually tracked boolean set is not.
- **Disabled** is a single, explicit boolean prop that, per Design System Bible St-3, suppresses every interaction state simultaneously — the component's implementation must make hover, focus, and active handlers structurally unreachable when `disabled` is true, not merely visually muted.
- **Loading** is a single, explicit boolean or enum prop that, per Design System Bible St-4, implies disabled for any element it triggers — the component's implementation sets the disabled behavior automatically when loading is true, never requiring a consumer to pass both props redundantly.
- **Error, success, empty** are content states, wired as a discriminated union prop (`status: "idle" | "error" | "success" | "empty"`) rather than as independent booleans, because — per Design System Bible St-2's distinction between interaction states and content states — these three are mutually exclusive content conditions, and a discriminated union makes an invalid simultaneous combination structurally unrepresentable, which independent booleans would not.

A component whose Chapter 11 §5 assessment determined a given state does not apply still declares that explicitly — a comment citing the specific Design System Bible chapter's stated exemption, per An-3 — rather than simply omitting the prop with no explanation.

---

## 5. THE IMPLEMENTATION FILE

`component-name.tsx` contains only the render logic — no data fetching (Chapter 25's territory, kept in the feature's `api/` folder per Chapter 8), no business logic beyond what's needed to derive presentational state from props. A component that needs data fetches it through a hook passed in or composed at the feature level, never inside the component itself, keeping `packages/ui/` components usable by any app regardless of that app's specific data layer.

---

## 6. THE TEST FILE

`component-name.test.tsx` is required, at minimum, to assert:

1. Every variant renders without error, for every value in every documented axis.
2. Every one of the eight canonical states, where applicable per Section 4, renders its documented treatment.
3. `disabled` suppresses every interaction handler, per Design System Bible St-3 — asserted directly, not merely visually implied.
4. Every content prop (label, icon, children) actually appears in the rendered output.

This is the literal minimum Chapter 47's testing pyramid requires per component; Chapter 47 may require additional coverage for components with more complex internal logic, but never less than this floor.

---

## 7. ENFORCEMENT & MEASUREMENT

A structural test, generated directly from this chapter's template and run against every component in `packages/ui/`, checks: the five-file folder shape from Section 2 is present; every declared variant axis has a corresponding closed-union type per Section 3; all eight states are either wired per Section 4 or explicitly, citably exempted; and no untyped escape hatch exists in the props type. This is the direct mechanism behind this chapter's own success criterion — a shipped component either passes this generated check or it does not, with no manual judgment call required to determine compliance.

---

## 8. BEHAVIORAL RULES

**When starting a new component.** The types file (Section 3) is drafted first, directly from the Design System Bible chapter's anatomy and variant documentation, before any render logic is written — types-first, matching Chapter 11's own anatomy-before-variants sequencing.

**When a component's data needs grow.** A data-fetching hook is added to the feature's `api/` folder, never inlined into the component itself, preserving the component's app-agnostic reusability per Section 5.

**When an existing component is found violating this template.** It is not rewritten silently as part of an unrelated feature change — a dedicated, tracked pull request brings it into compliance, logged against Chapter 66's debt register if it can't be addressed immediately.

---

## 9. DO / DON'T

**Do** wire hover, focus, and active through native pseudo-states, never through manually tracked JavaScript booleans.

**Do** use a discriminated union for the three mutually exclusive content states (error, success, empty), never independent booleans that could be combined invalidly.

**Don't** add an untyped `[key: string]: any` prop to work around a type-checking friction point — resolve the actual typing need instead.

**Don't** fetch data directly inside a `packages/ui/` component — pass it in through props or a composed hook, keeping the component reusable across every app per Chapter 2's surface boundaries.

---

## 10. ANTI-PATTERNS

**Simulated pseudo-states.** Tracking `isHovered` as a JavaScript boolean via `onMouseEnter`/`onMouseLeave` instead of using native CSS pseudo-classes wired through Chapter 13's token pipeline. This is dangerous because it silently diverges from the platform's own guarantees about state exclusivity and timing, producing subtle bugs (a hover state that sticks after a fast pointer movement) that a native pseudo-state simply cannot exhibit. It is detected by Section 7's structural check flagging manual state tracking for a state Section 4 requires to be native. It is fixed by removing the JavaScript state and wiring the same visual treatment through CSS.

**The boolean explosion for content states.** Adding `hasError`, `isSuccess`, and `isEmpty` as three independent booleans instead of one discriminated `status` union, allowing an invalid combination like `hasError={true} isSuccess={true}` to compile without error. This is dangerous for the same reason Chapter 11's "configuration creep" anti-pattern is dangerous — it looks like an incremental, reasonable addition each time, and the invalid-combination risk is invisible until it actually occurs in production. It is detected by Section 7's check flagging independent booleans where Section 4 specifies a discriminated union. It is fixed by consolidating the three booleans into one typed `status` prop and updating every consumer.

---

## 11. QUALITY ASSURANCE CHECKLIST

- [ ] Does the component follow the exact five-file folder layout from Section 2, with `index.ts` as its sole public export?
- [ ] Does every variant axis map to a closed-union type, per Chapter 11 §4?
- [ ] Are hover, focus, and active wired through native pseudo-states, never simulated in JavaScript?
- [ ] Does `disabled` structurally suppress every interaction handler, and does `loading` imply it automatically?
- [ ] Are error, success, and empty wired as a single discriminated union, not independent booleans?
- [ ] Does the props type contain zero untyped escape hatches?
- [ ] Does the test file cover all four minimum assertions from Section 6?

---

## 12. CROSS REFERENCES

**Within this Constitution:** Chapter 11 (the philosophy this chapter fixes into a template). Chapter 8 §5 (component colocation, mirrored in Section 2's file layout). Chapter 13 (Design Token Implementation, the source of Section 4's native pseudo-state styling). Chapter 25 (Data Fetching, the boundary Section 5 defers to). Chapter 47 (Testing Strategy, which builds on Section 6's floor). Chapter 61 (Code-Level Documentation, governing the `.stories` file). Chapter 66 (Engineering Debt Register, for non-compliant legacy components).

**Within the five documents above this Constitution:** Design System Bible Chapter 17 (in full), Chapter 39 (in full — St-1 through St-4 specifically).

---

## 13. FUTURE EXPANSION

**Documented limitations.** This template assumes a component-based UI framework broadly consistent with the props/composition model described here; Chapter 10's specific framework pin may require minor mechanical adaptation (how a "closed-union type" is literally expressed) without changing this chapter's underlying requirements.

---

*End of Chapter 12. The next chapter, Design Token Implementation, is where the Design System Bible's token tiers become the actual values this chapter's styling layer consumes.*
