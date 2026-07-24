# CHAPTER 45 — CONVERSATIONAL & VOICE INTERACTION PATTERNS

**Trady Perch Design System Bible · Volume III: Interaction & Behavior**

**Inherited From:** Master Vision Chapter 19 (AI Personality Constitution, in full), §18.7 (Interactive Demo). Design System Bible Chapter 1 (P3, P4), Chapter 3 (color), Chapter 31 (skeleton "thinking" treatment), Chapter 34, Av-3 (AI identity marker), Chapter 39 (state model).

---

## 1. INTRODUCTION

Master Vision Chapter 19 defines the AI's voice completely — composed, precise, no exclamation marks, no emoji, brief answers, honest uncertainty. It does not define what the chat window this voice lives inside actually looks like. A visitor could encounter a perfectly-worded, perfectly-composed response rendered inside a visually generic chat-widget shell — rounded speech bubbles, a cheerful typing-dots animation, a placeholder reading "Ask me anything! 😊" — and the entire personality investment would be undercut the moment they saw it, before reading a single word.

This chapter depends on Chapter 19's full voice specification and Chapter 34's Av-3 identity marker directly. It is depended on by Chapter 72 (Voice Interface Design Standards), which extends this chapter's reasoning into a non-visual medium.

---

## 2. PHILosophy

The rejected alternative is adopting the near-universal consumer chat-widget visual convention — right-aligned user bubbles, left-aligned assistant bubbles in a contrasting color, animated typing dots, a friendly placeholder — because it is instantly familiar and requires no new design work. This was rejected because that entire visual convention was developed for casual, consumer messaging contexts and carries exactly the register Master Vision §3.3 excludes: warm, playful, consumer-SaaS. A voice this composed deserves a visual frame that doesn't fight it.

---

## 3. CORE PRINCIPLES

### Cp-1 — The AI's Messages Are Never Styled as a Casual Chat Bubble

**Purpose.** The AI's responses render as calm, full-width text blocks with Chapter 34's abstract identity mark beside them — never as a rounded, colored "speech bubble" contrasted against a differently-colored user bubble, which is the near-universal but tonally mismatched consumer-chat convention.

**Reasoning.** Descends from Master Vision §3.3's precision-instrument register: a speech-bubble metaphor visually says "casual conversation," which contradicts the composed, considered register Chapter 19 establishes in every word the AI actually says.

**Examples.** The AI's response appears as ordinary Body-text (Chapter 4), left-aligned, with the AI mark (Chapter 34, Av-3) positioned beside it — visually closer to a considered written statement than a cartoon speech bubble.

**When it applies.** To every AI response in every conversational surface. **When it does not apply.** No exception.

### Cp-2 — The "Thinking" State Uses Chapter 31's Pulse, Never Animated Dots

**Purpose.** While the AI is generating a response, the interface shows Chapter 31's branded skeleton pulse treatment — never the ubiquitous three-bouncing-dots typing indicator most chat products default to.

**Reasoning.** Direct restatement of Master Vision §17.5's "never a generic spinner divorced from brand," extended to this component's specific, near-universal generic equivalent: the bouncing-dots pattern is exactly as brand-less and exactly as replaceable as a spinner, and Chapter 31 already exists specifically to prevent this category of default from being reached for.

**Examples.** A quiet, slow pulse (Chapter 31, matching Chapter 15's Standard-tier loop) beside the AI mark while a response generates.

**When it applies.** To every AI "thinking" or generating state. **When it does not apply.** No exception.

### Cp-3 — Message Density Matches the Brevity Doctrine Visually, Not Only Verbally

**Purpose.** Individual AI messages render as short, visually scannable blocks — Master Vision §19.3's brevity doctrine enforced not only in what the AI is instructed to write, but in how the interface itself is designed to encourage and display short responses rather than accommodating long ones comfortably.

**Reasoning.** Descends from Chapter 1's Principle 5 (Sequence-Aware Correctness) applied reflexively to this chapter's own relationship with Chapter 19: an interface designed with generous width and no visual encouragement toward brevity subtly works against the voice Chapter 19 specifies, even if every individual response is well-written — the container should reinforce the voice, not merely tolerate it.

**Examples.** The message column's maximum width matches Chapter 4's 68ch reading measure, deliberately narrower than the surrounding page might otherwise allow, so a long response visually looks long (many short lines stacking) rather than being accommodated comfortably by a wide column that makes verbosity look normal.

**When it applies.** To every conversational surface's message layout. **When it does not apply.** No exception.

### Cp-4 — The Input Field Never Performs a Personality It Doesn't Have

**Purpose.** The message input's placeholder text is plain and functional ("Ask a question") — never falsely enthusiastic, never using an exclamation mark or emoji, consistent with every rule Chapter 19 already applies to the AI's own generated text, now applied to the surrounding interface copy as well.

**Reasoning.** Direct extension of Chapter 19's §19.2 tone rules to interface microcopy specifically: an over-eager placeholder written by a different author than the AI's own responses would create exactly the inconsistency Master Vision §25.3 forbids — a visitor should never be able to tell, by tone alone, which part of the surface was "written by marketing" and which was "generated by the AI."

**Examples.** Placeholder: "Ask a question about your automation." Never: "Ask me anything! 😊"

**When it applies.** To every piece of interface copy surrounding the AI's own generated responses. **When it does not apply.** No exception.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Anatomy** (per An-1): AI Mark (Chapter 34, Av-3) → Message Text (Chapter 4, Body step, `text.primary`) → Input Field (Chapter 21 anatomy, `text` type, plain functional placeholder per Cp-4) → Send control (Chapter 18, Icon Button variant).

**Layout:** message column max-width matches Chapter 4's 68ch measure (Cp-3); no user/assistant color differentiation via bubble background — both render as plain text, differentiated only by the AI mark's presence versus the user's own (Chapter 34) avatar or lack thereof.

**Token consumption:** `semantic.color.text.primary` (all message text), Chapter 34's AI mark tokens, Chapter 31's pulse treatment, Chapter 21's input anatomy.

---

## 5. MEASUREMENTS

Message column max-width: 68ch (Chapter 4). Thinking-state pulse: Chapter 31's existing Standard-tier loop, no independent timing.

---

## 6. STATE COVERAGE (per An-3)

Loading ("thinking"): Chapter 31's pulse (Cp-2). Error: the AI's own honest admission of failure, rendered as ordinary message text in `text.error` (Chapter 3, C-4), per Master Vision §19.7's error/apology behavior — never a generic system error message replacing the AI's voice. Empty: an unstarted conversation shows Chapter 38's Empty State with a plain, functional prompt, consistent with Cp-4. Success: not a distinct visual state — a successful response is simply a rendered message. Hover/Focus/Active/Disabled apply to the Input Field and Send control per Chapter 21 and Chapter 18 respectively.

---

## 7. MOTION SPECIFICATION

A new message appears using Chapter 15's Quick tier (150ms), a brief fade — never a bouncy, playful entrance, consistent with Master Vision §9.1's diegetic requirement (a message becoming available is a real event; a bounce added to it represents nothing).

---

## 8. ACCESSIBILITY

New messages are announced to assistive technology via a live region as they arrive, and the "thinking" state is similarly announced so a screen-reader user knows a response is being generated rather than assuming the interface has stalled.

---

## 9. RESPONSIVE BEHAVIOUR

The 68ch message-width constraint (Cp-3) naturally resolves to full available width at narrow Mobile viewports, where the constraint is already looser than the viewport itself — no separate mobile-specific behavior is needed beyond Chapter 8's ordinary breakpoint resolution.

---

## 10. AI & FUTURE INTERFACES

This entire chapter is the direct visual precondition for Chapter 72's voice interface work — a voice interaction has no message bubbles to style, but Cp-3's brevity-reinforcement principle and Cp-4's no-false-personality principle both translate directly into pacing and word-choice constraints Chapter 72 must specify for a medium with no visual container to reinforce them instead.

---

## 11. DO / 12. DON'T

**Do:** A demo interaction rendering the AI's response as plain, composed body text beside its abstract mark, with a quiet pulse while generating and a plain "Ask a question" placeholder throughout. **Don't:** The same interaction built with a colorful rounded speech bubble, bouncing typing dots, and a placeholder reading "Hey there! What can I help you with today? 😄" — every principle in this chapter violated simultaneously, and a direct contradiction of Chapter 19's entire voice specification despite technically "having an AI chat feature."

---

## 13. ANTI-PATTERNS

**Off-the-shelf chat widget adoption.** Integrating a third-party chat-widget component with its own default bubble styling, typing indicator, and placeholder copy, because building a fully custom conversational interface felt like unnecessary extra work for what seems like a commodity UI pattern. This is dangerous for the same reason Chapter 16's "default inheritance" anti-pattern is dangerous, applied to the single surface where the AI Personality Constitution's credibility is most directly on the line — a visitor's first encounter with the brand's AI, rendered in a visibly generic shell, undermines months of careful voice-writing in the first half-second of visual contact. It is detected by checking any chat interface's visual styling against Cp-1 through Cp-4 directly. It is fixed by re-theming or rebuilding the interface to this chapter's specification before it ships.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Do AI responses render as calm text blocks rather than colored speech bubbles? *(Cp-1)*
- [ ] Does the "thinking" state use Chapter 31's pulse rather than animated dots or a generic spinner? *(Cp-2)*
- [ ] Does the message layout's width reinforce brevity rather than comfortably accommodating long responses? *(Cp-3)*
- [ ] Is every piece of surrounding interface copy as plain and composed as the AI's own generated text? *(Cp-4)*

---

## 15. CROSS REFERENCES

Chapter 1 (P3, P4). Chapter 3 (color). Chapter 4 (measure). Chapter 15 (motion). Chapter 18 (send control). Chapter 21 (input anatomy). Chapter 31 (thinking-state pulse). Chapter 34 (Av-3, AI mark). Chapter 38 (empty conversation). Chapter 39 (state model). Chapter 72 (Voice Interface Design Standards, direct dependent). Master Vision Chapter 19 in full, §18.7, §25.3.

---

## 16. FUTURE EXPANSION

**Documented limitations.** This chapter has been reasoned in advance of any real chat surface being built and tested with actual users — the 68ch brevity-reinforcement measure in particular should be validated against real usage once the Interactive AI Demo exists in production.

---

*End of Chapter 45. The next chapter, per the authoring sequence, is Trust, Privacy & Security Visual Patterns.*
