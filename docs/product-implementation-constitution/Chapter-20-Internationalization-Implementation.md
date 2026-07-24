# CHAPTER 20 — INTERNATIONALIZATION IMPLEMENTATION

**Trady Perch Product Implementation Constitution · Part IV: Accessibility & Inclusive Engineering**

**Inherited From:** Design System Bible Chapter 54 (Internationalization & Localization Standards); Brand Identity Manual Chapter 18 (multilingual identity doctrine). Chapter 12 (Component Implementation Standard) is this chapter's direct premise.

---

## 1. INTRODUCTION

Trady Perch currently operates in a single market and language. This chapter exists anyway, ahead of that changing, because retrofitting internationalization into a codebase built without it is measurably more expensive than building the scaffolding in from the start — the same IP7 reversibility-bias logic Chapter 2 already applies to its own surface architecture. This chapter specifies only the technical scaffolding; no translation content exists yet, and none is invented here.

---

## 2. STRING EXTERNALIZATION

No user-facing string is hardcoded inline in component or route code. Every string is declared in a locale resource file, referenced by key, per the same naming discipline Chapter 9 establishes generally. A component's copy is never embedded directly in its markup — it is passed through a translation-lookup function, even where only one locale currently exists, so that the mechanical pattern is already correct by the time a second locale is ever needed.

---

## 3. LOCALE ROUTING

Each app's routing layer, per Chapter 38's rendering strategy, is structured to accept a locale segment even before a second locale is actually offered — the routing mechanism resolves a default locale identically today, but the structural seam for a second locale already exists, consistent with Section 1's reversibility reasoning. This is a routing-layer concern only; it does not imply any content, translation, or market-entry decision, which remain business decisions outside this Constitution's scope entirely.

---

## 4. RTL READINESS

Per Design System Bible Chapter 54, layout code uses logical, direction-agnostic properties (start/end rather than left/right) throughout `packages/ui/`, so that a future right-to-left locale does not require retrofitting every component's layout — this is a near-zero-cost discipline to build in from the start and a substantial one to add retroactively, per the same IP7 logic as Section 1.

---

## 5. ENFORCEMENT & MEASUREMENT

A lint rule flags any hardcoded, non-externalized user-facing string in component or route code, mirroring Chapter 13 §6's token-literal check exactly. A second lint rule flags any physical (left/right) layout property in `packages/ui/` where a logical (start/end) equivalent exists, enforcing Section 4. This chapter's own success criterion — a new locale addable via a single translation file with zero further source changes — is verified by an automated check that adds a synthetic test locale and confirms every app renders correctly against it with no code change beyond the new resource file.

---

## 6. BEHAVIORAL RULES

**When writing any new user-facing string.** It is externalized per Section 2 from the moment it's written, never added inline "for now" with a plan to externalize it later — which per Chapter 5's F2 rarely happens once the inline version already works.

**When implementing layout in `packages/ui/`.** Logical properties are used by default per Section 4, with a physical property used only where a genuine, justified, direction-independent need exists (an icon that must always point the same physical direction regardless of text direction, for instance).

---

## 7. DO / DON'T

**Do** externalize every user-facing string through the translation-lookup function, even while only one locale exists.

**Do** use logical layout properties throughout `packages/ui/` by default.

**Don't** hardcode a string inline "temporarily" — the temporary version has no natural trigger to become permanent-correct later.

**Don't** treat this chapter's scaffolding as a commitment to an actual multilingual launch timeline — that decision remains Master Vision Chapter 26's roadmap territory, outside this Constitution's authority.

---

## 8. QUALITY ASSURANCE CHECKLIST

- [ ] Does every user-facing string route through the translation-lookup function, with zero hardcoded inline text?
- [ ] Does `packages/ui/` use logical (start/end) layout properties by default?
- [ ] Does the synthetic-locale test pass, confirming a new locale requires only a new resource file?

---

## 9. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP7). Chapter 9 (naming discipline extended to translation keys). Chapter 12 (component template Section 2 and 4 apply to). Chapter 38 (routing layer Section 3 extends).

**Within the five documents above this Constitution:** Design System Bible Chapter 54; Brand Identity Manual Chapter 18.

---

## 10. FUTURE EXPANSION

**Documented assumptions.** This chapter assumes a left-to-right, single-language product for the foreseeable operating horizon; its scaffolding is deliberately minimal and inexpensive to maintain against that assumption, per Chapter 1's IP3, rather than a fuller multilingual system built ahead of an actual committed need.

---

*End of Chapter 20, and of Part IV. Part V, State, Data & API Architecture, is where this Constitution turns from how the product looks and behaves to how information actually moves through it.*
