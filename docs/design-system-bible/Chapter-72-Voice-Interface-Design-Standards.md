# CHAPTER 72 — VOICE INTERFACE DESIGN STANDARDS

**Trady Perch Design System Bible · Volume VII: The Horizon**

**Inherited From:** Master Vision Chapter 19 (AI Personality Constitution, in full — especially §19.3, Response Length & Pacing). Design System Bible Chapter 1 (P6, P8), Chapter 15 (motion-timing tiers, this chapter's pacing parallel), Chapter 16 (Sound & Haptics System, So-1), Chapter 45 (Conversational & Voice Interaction Patterns), Chapter 71 (AI-Native Interfaces, Ai-2/Ai-3).

---

## 1. INTRODUCTION

Master Vision Chapter 19 was written for a text-based conversational surface. Voice removes the visual register entirely and adds pacing, tone-of-voice, and silence as design materials with no direct text equivalent. This chapter exists to make sure the brand's composure survives that translation deliberately, rather than being decided ad hoc by whichever text-to-speech default is easiest to implement.

This chapter depends on Chapter 45 and Chapter 71 directly, translating their visual/textual principles into a medium with no screen. It has no further dependents within this Bible.

---

## 2. PHILOSOPHY

The rejected alternative is treating voice as a simple text-to-speech rendering of the same responses Chapter 45 already specifies for a chat surface — technically straightforward, and a direct failure to recognize that spoken and written language are genuinely different registers even when conveying identical information. A written response can be scanned, re-read, and skipped past; a spoken response is experienced in real time with no equivalent scanning ability, which changes what "brief" and "clear" actually require.

---

## 3. CORE PRINCIPLES

### Vo-1 — Silence Carries Meaning; It Is Never Filled With Filler Sound

**Purpose.** A pause before a considered response is genuine silence — never filled with a filler utterance ("Um, let me see...") or an ambient processing tone, unless that pause would otherwise exceed a threshold long enough to risk the user believing the system has failed (Chapter 31's Sk-3 escalation logic, translated to voice).

**Reasoning.** Direct extension of Chapter 16's So-1 (silence is the default, sound is opt-in confirmation only) to conversational pacing specifically: a brand this composed does not need to perform the appearance of thinking through filler speech — genuine, brief silence before a considered answer is itself a composure signal, exactly as a held pause is used in the intro sequence (Chapter 9, §9.2, step 1).

**Examples.** A half-second genuine pause before answering a considered question. Never "Umm, that's a great question, let me think about that for a second..." padding used to fill the same half-second.

**When it applies.** To every voice interaction pause under Chapter 31's escalation threshold. **When it does not apply.** Past that threshold, where a brief, honest acknowledgment ("Still working on that") is warranted, per Chapter 31's Sk-3 translated directly.

### Vo-2 — Confidence and Reversibility Are Always Stated Aloud

**Purpose.** Where Chapter 71's Ai-2 (confidence) and Ai-3 (undo path) would show a visual indicator, the voice interface states the equivalent information explicitly in speech — "I'm moderately confident about this" or "Say 'undo' if that's not what you wanted" — never omitted because no screen is available to display it.

**Reasoning.** Direct translation of Chapter 71's reasoning into a medium with no visual channel: the underlying trust requirement (Master Vision §19.9) doesn't change because the modality changed, only the expression does.

**Examples.** "I've updated three lead scores based on their recent activity — I'm moderately confident in this batch. Say 'undo' if you'd like me to revert it."

**When it applies.** To every voice-mediated action carrying the same stakes Chapter 71 already flags for its visual equivalent. **When it does not apply.** To low-stakes, easily-reversible voice interactions where the equivalent visual indicator would also be omitted per Chapter 71's own exception.

### Vo-3 — A Spoken Response Never Exceeds Three Sentences Before Checking In

**Purpose.** Any single spoken response longer than three sentences pauses to check whether the user wants to continue ("Would you like me to keep going, or does that answer it?") rather than continuing uninterrupted.

**Reasoning.** Direct numeric resolution of Master Vision §19.3's brevity doctrine, specifically calibrated for voice: a written response's length is self-evident at a glance, letting a reader choose whether to keep reading; a spoken response offers no equivalent preview, so the interface itself must build in the checkpoint a written response's visual scannability would otherwise provide for free.

**Examples.** A three-sentence explanation followed by "Want me to go deeper on any part of that?" rather than continuing into a fourth, fifth, and sixth sentence uninterrupted.

**When it applies.** To every spoken response. **When it does not apply.** To a direct, single-fact answer naturally shorter than three sentences, which needs no checkpoint since it was already brief.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Pause thresholds (Vo-1):** genuine silence up to Chapter 31's 8-second escalation threshold; a brief honest acknowledgment beyond that. **Stated-aloud requirements (Vo-2):** confidence level and undo instruction, spoken explicitly for any consequential action, mirroring Chapter 71's Section 4 exactly. **Response length ceiling (Vo-3):** three sentences before a check-in prompt.

---

## 5. MEASUREMENTS

Pause escalation threshold: 8 seconds (Chapter 31, reused directly). Response length ceiling: 3 sentences.

---

## 6. BEHAVIORAL RULES

**Before any voice response exceeding three sentences.** Insert a check-in prompt per Vo-3. **Before any consequential voice-mediated action.** State confidence and undo instruction explicitly per Vo-2.

---

## 7. MOTION SPECIFICATION

Not applicable in the visual sense; this chapter's pacing rules (Vo-1, Vo-3) are voice's direct structural equivalent of Chapter 15's motion tiers — a brief pause corresponds to Quick tier's responsiveness, a considered silence to Standard or Deliberate tier's weightier pacing, translated from visual duration into spoken silence duration.

---

## 8. ACCESSIBILITY

A voice interface is, by its nature, an accessibility feature for users who cannot or prefer not to use a visual interface — this chapter's own rigor is itself an accessibility contribution, ensuring voice is a fully-considered first-class surface rather than an afterthought translation of a visual one.

---

## 9. RESPONSIVE BEHAVIOUR

Not applicable — voice has no viewport or breakpoint; Chapter 8's responsive model does not extend to this medium.

---

## 10. AI & FUTURE INTERFACES

This chapter is itself the AI & Future Interfaces extension of Chapters 45 and 71; its own further extension is Chapter 73, where a spatial environment might pair voice with a visual companion, requiring this chapter's pacing rules to coordinate with Chapter 73's own spatial timing rather than operate in isolation.

---

## 11. DO / 12. DON'T

**Do:** "I found three case studies matching that. The Northwind one is probably most relevant — want me to walk through it, or see the other two first?" — three sentences, then a checkpoint. **Don't:** A single uninterrupted six-sentence response covering all three case studies in full detail with no pause for the user to redirect.

---

## 13. ANTI-PATTERNS

**Filler-speech padding.** Adding conversational filler ("Umm," "Let's see," "Great question!") to mask ordinary processing pauses, because it's a common convention in consumer voice assistants. This directly violates Vo-1 and Master Vision Chapter 19's composed register simultaneously; it is detected by reviewing any voice-response script for filler phrases with no informational content, and fixed by replacing them with genuine, brief silence.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Is silence used honestly, with no filler speech masking ordinary processing time? *(Vo-1)*
- [ ] Is confidence and reversibility stated explicitly aloud for every consequential action? *(Vo-2)*
- [ ] Does every response over three sentences include a check-in prompt? *(Vo-3)*

---

## 15. CROSS REFERENCES

Chapter 1 (P6, P8). Chapter 9 (§9.2, pause precedent). Chapter 15 (motion-tier pacing parallel). Chapter 16 (So-1). Chapter 31 (Sk-3, escalation threshold reused). Chapter 45 (conversational patterns, direct parent). Chapter 71 (Ai-2, Ai-3, direct translation source). Chapter 73 (spatial pairing, direct dependent). Master Vision Chapter 19, in full, especially §19.3.

---

## 16. FUTURE EXPANSION

**Documented limitations.** This entire chapter is reasoned in advance of any real voice interface being built or tested with actual users — every threshold here should be validated against genuine spoken interaction once one exists, consistent with this Bible's recurring honesty about untested Horizon-volume proposals.

---

*End of Chapter 72. The next chapter, per the authoring sequence, is Augmented Reality & Spatial Design Standards.*
