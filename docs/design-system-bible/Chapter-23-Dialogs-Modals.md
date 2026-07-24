# CHAPTER 23 — DIALOGS & MODALS

**Trady Perch Design System Bible · Volume II: Components**
*First-canonical-draft.*

**Inherited From:** Master Vision §5.5 (Why Urgency Is Forbidden), §18.3 (Pricing interaction philosophy, the "never gamified" restraint this chapter generalizes). Design System Bible Chapter 1 (P4, P5, P7), Chapter 9 (elevation, Lifted), Chapter 10 (glass backdrop, Ma-2), Chapter 15 (motion), Chapter 17 (anatomy standard), Chapter 18 (button emphasis rules), Chapter 39 (state model).

---

## 1. INTRODUCTION

A modal dialog is, by its nature, an interruption — it demands attention and blocks interaction with everything behind it. That is in direct tension with Master Vision §5.5's prohibition on manufactured urgency, and this chapter's entire job is resolving that tension explicitly rather than leaving each future dialog's justification to individual judgment: a dialog earns its interruption through genuine necessity, never through a marketing team's desire for more attention on a message.

This chapter depends on Chapter 10 directly for its Pronounced-blur backdrop treatment (Ma-2's specific assigned job) and Chapter 9 for its Lifted elevation. It is depended on by Chapter 24 (Drawers, the softer sibling pattern reserved for content that doesn't warrant this chapter's full interruption) and Chapter 46 (Trust, Privacy & Security Patterns, where consent and data-handling disclosures frequently surface via this exact component).

---

## 2. PHILOSOPHY

The rejected alternative is treating a dialog as a general-purpose "get the user's attention" tool, available whenever a stakeholder wants a message to be noticed with certainty. This is rejected directly by Master Vision §5.5's reasoning: interrupting a visitor to force attention produces resentment in a considered-purchase context, not compliance, and a dialog used this way spends the component's one legitimate justification — genuine necessity — on marketing convenience instead. This chapter accordingly treats "is this dialog actually necessary" as the first and hardest gate a proposed dialog must clear, before any visual specification is even relevant.

---

## 3. CORE PRINCIPLES

### Dl-1 — A Dialog Requires Genuine Necessity, Never Marketing Intent

**Purpose.** A dialog may only interrupt the user for one of two reasons: the user's own explicit request for a focused task (opening a settings panel, confirming a destructive action they initiated), or a genuinely blocking system requirement (a session about to expire). It may never be used to promote content, capture an email address unprompted, or otherwise interrupt for the product's benefit rather than the user's own immediate need.

**Reasoning.** Direct application of Principle 4 and Master Vision §5.5: the Restraint Paradox holds specifically because this brand does not ask for attention it hasn't earned — a promotional interstitial dialog is the single most direct possible violation of that paradox, interrupting a visitor's own chosen path through the page for the site's convenience rather than theirs.

**Examples.** Legitimate: a "Delete this case study?" confirmation, triggered by the user's own delete action. Illegitimate: a "Sign up for our newsletter" dialog appearing unprompted after thirty seconds on the page.

**When it applies.** To every proposed use of this component.

**When it does not apply.** No exception — this is one of the few component-level rules in this Bible with zero permitted deviation, mirroring Master Vision Chapter 27's own zero-tolerance treatment of urgency tactics generally.

**Common misunderstandings.** Assuming a dialog triggered by a *system* event (rather than a direct user click) automatically fails this test. A session-expiration warning is system-triggered and still legitimate, because it serves the user's own need to avoid losing work — the test is whose benefit the interruption serves, not literally who or what triggered it.

### Dl-2 — Every Dialog Has Exactly One Primary Action

**Purpose.** A dialog's footer contains at most one Primary-emphasis button (Chapter 18); any additional action (typically "Cancel") uses Secondary or Ghost emphasis.

**Reasoning.** Direct extension of Chapter 18's Bt-1 and Chapter 19's Cd-3 to this component: a dialog offering two equally weighted options provides no guidance at the exact moment — often a consequential, sometimes destructive decision — where clear guidance matters most.

**Examples.** "Delete this case study?" with a Secondary "Cancel" and a Primary-emphasis, Error-colored (Chapter 18, Bt-4) "Delete" button — one clear default path, correctly colored to signal its consequence.

**When it applies.** To every dialog with action buttons.

**When it does not apply.** No exception.

**Common misunderstandings.** Assuming the destructive action should never be the Primary-emphasis button, on the theory that "Cancel" should always be encouraged instead. Master Vision §5.4 permits — often prefers — the destructive action to carry the clearer visual weight specifically because ambiguity about which button does what is more dangerous in a destructive context than a single, clearly-labeled, correctly-colored Primary action.

### Dl-3 — Three Dismissal Paths, Unless the Decision Must Be Explicit

**Purpose.** A dialog is dismissible via the Escape key, a visible close control, and a click on the backdrop outside the dialog — all three, by default — unless the dialog represents a decision genuinely requiring an explicit choice, in which case the backdrop-click and Escape-key paths are deliberately disabled and only the two labeled buttons remain.

**Reasoning.** Descends from Principle 4: most dialogs should be as easy to leave as they were to enter, consistent with this brand's low-pressure interaction philosophy; the narrow exception exists because some decisions (an unrecoverable, irreversible action) genuinely benefit from preventing an accidental dismissal that might be misread as either confirmation or cancellation.

**Examples.** An informational dialog (viewing details) offers all three dismissal paths. A "Delete this case study?" confirmation, where an accidental Escape-key dismissal should not be mistaken for a decision either way, may reasonably restrict dismissal to its two explicit buttons only — even here, though, Escape is conventionally still mapped to the equivalent of "Cancel" rather than disabled entirely, since accidental dismissal defaulting to safety (not deleting) is preferable to defaulting to danger.

**When it applies.** To every dialog's dismissal behavior.

**When it does not apply.** To the narrow confirmation-dialog case described above, where Escape maps to Cancel rather than being fully disabled.

**Common misunderstandings.** Assuming "requiring an explicit choice" justifies removing the close (×) control as well as backdrop-click. The visible close control conventionally remains available (mapped to Cancel, matching Escape's behavior) even in the restricted case — only backdrop-click, which offers no labeled signal of what dismissing means, is the one path genuinely worth restricting.

### Dl-4 — A Dialog Never Opens Another Dialog

**Purpose.** While a dialog is open, no second dialog may open above it. A workflow requiring a sequence of confirmations uses a single dialog whose content changes between steps, never a stack of nested dialogs.

**Reasoning.** Descends from Principle 2: a dialog already represents the system's one legitimate interruption of the underlying page; a second dialog stacked above the first is an interruption of an interruption, and the resulting nested-backdrop visual (Chapter 10's Pronounced blur, doubled) reads as confused rather than considered.

**Examples.** A two-step confirmation ("Are you sure?" followed by "Type DELETE to confirm") is built as one dialog whose Body content transitions between the two steps, not as a first dialog opening a second.

**When it applies.** To every dialog in the system.

**When it does not apply.** No exception.

**Common misunderstandings.** Assuming a dropdown or tooltip opened from within a dialog counts as a "second dialog" violating this rule. It does not — Chapter 26 (Dropdowns) and Chapter 30 (Tooltips) are distinct, lighter-weight overlay components that may legitimately layer above an open dialog; this principle specifically forbids a second full Dialog/Modal, not any overlay whatsoever.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Anatomy** (per An-1): Backdrop (Chapter 10, `glass-backdrop`) → Dialog Container (Chapter 9, `elevation.overlay`/Lifted) → Header (Title, optional close control) → Body → Footer (up to two actions, per Dl-2).

**Variant axes** (per An-2): **Purpose** — `informational` (all three dismissal paths, per Dl-3), `confirmation` (restricted dismissal, per Dl-3's exception). **Size** — `sm` (short confirmations), `md` (standard content), `lg` (rare, content-heavy dialogs, used sparingly since a genuinely large dialog often indicates the content belongs in a full page instead).

**Token consumption:** `semantic.surface.glass-backdrop`, `core.blur.pronounced` (Chapter 10), `semantic.elevation.overlay` (Chapter 9), `core.radius.lg` (Chapter 19's population, reused here), Chapter 18's full button token set for Footer actions.

---

## 5. MEASUREMENTS

- **Maximum Primary-emphasis actions in Footer: 1.** *(Dl-2)*
- **Dismissal paths, default: 3** (Escape, close control, backdrop-click); **restricted case: 2** (close control and Escape, both mapped to Cancel; backdrop-click disabled). *(Dl-3)*
- **Maximum simultaneously open dialogs: 1.** *(Dl-4)*

---

## 6. STATE COVERAGE (per An-3)

| State | Treatment |
|---|---|
| **Hover** | Applies only to interior elements (buttons, close control), per their own component chapters — the dialog container itself has no hover state. |
| **Focus** | On open, focus moves into the dialog automatically (typically to the first focusable element or the dialog container itself) and is trapped within it until closed, per Chapter 42's future keyboard-trap specification. |
| **Active** | Applies only to interior interactive elements. |
| **Disabled** | A dialog's Primary action may be Disabled (Chapter 39 default) pending a required input (a confirmation checkbox, a typed confirmation string) before it becomes available. |
| **Loading** | A dialog's Primary action enters Loading + Disabled together (Chapter 39, St-4) while its triggered action resolves; the dialog itself remains open until that resolution completes. |
| **Error** | An action that fails within the dialog shows an inline Error message (Chapter 3, C-4) within the Body, without closing the dialog — the user should not lose their context on failure. |
| **Success** | A successful action typically closes the dialog and confirms via a Toast (Chapter 25) rather than showing a Success state within the dialog itself, per Chapter 19's parallel reasoning for cards. |
| **Empty** | Not applicable — a dialog is never rendered with no content; an empty dialog is a build error, not a valid state. |

---

## 7. MOTION SPECIFICATION

Opening: backdrop blur/opacity fade in using Standard tier (300ms, per Chapter 10, §7), dialog container itself entering with a slightly delayed, subtle scale-and-fade (Standard tier, Entrance curve) so the backdrop's recession registers a beat before the dialog itself arrives — consistent with Chapter 15's animation-hierarchy guidance that only one element should be the primary subject of motion at a time. Closing: Quick tier (150ms), Exit curve, both backdrop and dialog fading out together, faster and without the entrance's staged sequencing, per Master Vision §10.4's asymmetry.

---

## 8. ACCESSIBILITY

Focus is trapped within the open dialog (Section 6, Focus row) and returns to the element that triggered the dialog upon close. The dialog is announced to assistive technology as a dialog with its title read immediately on open. Background content behind the backdrop is marked inert to assistive technology navigation while the dialog is open, preventing a screen-reader user from accidentally navigating into content that is visually and functionally unavailable.

---

## 9. RESPONSIVE BEHAVIOUR

At Mobile range (Chapter 8), a dialog may reasonably expand to occupy the full viewport height (rather than a centered, smaller card) while retaining its Header/Body/Footer anatomy unchanged — this is a sizing adaptation, not a different component, and should not be confused with Chapter 24's Drawer, which is anatomically and behaviorally distinct even though both may occupy significant mobile screen space.

---

## 10. AI & FUTURE INTERFACES

A voice interface's direct equivalent to a confirmation dialog is an explicit spoken confirmation request ("Should I go ahead and delete this? Say yes to confirm.") — Dl-2's one-clear-path logic and Dl-3's explicit-choice exception both translate directly, since a voice interaction has no backdrop to click away from and must rely entirely on the equivalent of labeled, explicit responses.

---

## 11. DO

A "Delete this case study?" dialog with Secondary "Cancel" and Primary, Error-colored "Delete" buttons, backdrop-click and Escape both mapped to Cancel (never fully disabled), triggered only by the user's own delete action — every principle in this chapter satisfied in the system's single most common real dialog use case.

## 12. DON'T

Building a "Complete your profile to unlock full features" dialog that appears automatically on a user's third dashboard visit, with no direct user action triggering it. This is a textbook Dl-1 violation — an interruption serving the product's engagement goals rather than a need the user expressed, dressed in the visual language of a legitimate dialog.

---

## 13. ANTI-PATTERNS

**Interruption for engagement.** Using a dialog to promote a feature, request feedback, or capture information the user did not ask to provide, because a dialog reliably guarantees attention in a way passive page content does not. This is dangerous because it directly trades the brand's calm, low-pressure register (Master Vision §2.2) for a short-term attention win, and it is exactly the kind of decision that looks locally reasonable to whoever proposes it ("it's just one dialog, and the feature really is useful") while cumulatively training visitors to distrust every future dialog they encounter, including the legitimate ones. It is detected by asking, for any proposed dialog, whose need it actually serves — the user's immediate task, or the product's engagement metrics. It is fixed by converting the content into a passive, dismissible surface (a Toast, or an inline banner) that does not block interaction with the rest of the page.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Was this dialog triggered by the user's own request or a genuine blocking system need, never by marketing or engagement intent? *(Dl-1)*
- [ ] Does the Footer contain at most one Primary-emphasis action? *(Dl-2)*
- [ ] Are all three dismissal paths available, or is the restricted two-path case specifically justified by an irreversible decision? *(Dl-3)*
- [ ] Is exactly one dialog open at any time, with no nested second dialog? *(Dl-4)*
- [ ] Is focus correctly trapped within the dialog and returned to the trigger element on close?

---

## 15. CROSS REFERENCES

Chapter 1 (P4, P5, P7). Chapter 9 (elevation). Chapter 10 (backdrop, Ma-2). Chapter 15 (motion, staged entrance). Chapter 17 (anatomy standard). Chapter 18 (button rules, Bt-1, Bt-4). Chapter 19 (Cd-3 parallel). Chapter 24 (Drawers, softer sibling). Chapter 25 (Toasts, success confirmation destination). Chapter 26, Chapter 30 (permitted layered overlays under Dl-4's exception). Chapter 39 (state model). Chapter 42 (keyboard focus trap, full specification). Chapter 46 (Trust, Privacy & Security Patterns, frequent consumer). Master Vision §5.4–§5.5, §18.3, Chapter 27.

---

## 16. FUTURE EXPANSION

**Documented limitations.** Dl-4's single-dialog rule has not yet been tested against a genuinely complex multi-step wizard that might, in a lesser system, be built as a chain of dialogs — this chapter asserts that such a wizard belongs in one dialog with internal step transitions, but this assertion should be revisited against a real, complex wizard use case once one is designed.

---

*End of Chapter 23. The next chapter, per the authoring sequence, is Drawers & Sheets — the lighter-weight sibling pattern this chapter's Dl-4 note already anticipates.*
