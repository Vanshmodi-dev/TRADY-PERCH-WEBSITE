# CHAPTER 16 — SOUND & HAPTICS SYSTEM

**Trady Perch Design System Bible · Volume I: Foundations**
*First-canonical-draft. Unlike every other Foundations chapter, this one has no direct Master Vision precedent to extend — the Master Vision was written for a website, which has no native sound or haptic channel. What follows is this Bible's own reasoned extension of established brand principles into two senses the brand has not yet had to design for, offered with the same decisiveness as every other chapter, but flagged honestly as the chapter most likely to need real revision once it meets an actual sound or haptic use case.*

**Inherited From:** Master Vision §2.2 (Composed, Precise, Quietly Powerful), §5.5 (Why Urgency Is Forbidden), Chapter 19 (AI Personality Constitution). Design System Bible Chapter 1 (P3, P4, P7), Chapter 15 (the motion-timing scale this chapter maps haptics onto rather than duplicating).

---

## 1. INTRODUCTION

A website has no sound or touch channel of its own, which is why the Master Vision never had to address either. But this Bible's own Chapter 25 (Full Brand Ecosystem) already commits the brand to a mobile companion app and an AI chat surface — both of which have real sound and haptic channels a platform will fill with its own default behavior the moment this chapter fails to specify anything better. This chapter exists to make sure that default is never reached.

This chapter depends on Chapter 15 directly and deliberately: rather than inventing an independent haptic timing scale, it maps haptic feedback onto the five motion tiers already defined there, per Principle 7. It is consumed by Chapter 43 (Touch & Gesture Standards) and Chapter 72 (Voice Interface Design Standards), both of which need this chapter's reasoning before they can specify their own platform-specific behavior.

---

## 2. PHILOSOPHY

The rejected alternative is silence on the question entirely — leaving sound and haptics to whatever a mobile operating system or chat framework defaults to, on the theory that the Master Vision never addressed them and therefore has nothing to say. This was rejected because "the Master Vision never addressed X" has never, anywhere else in this Bible, been treated as license to skip reasoning about X — Chapter 1's own principles are explicitly designed to generalize into gaps the Master Vision didn't anticipate, and sound and haptics are exactly that kind of gap. A brand this deliberate about restraint in every visual channel cannot credibly inherit a chirpy default notification sound or an aggressive default vibration pattern simply because no one designed an alternative.

---

## 3. CORE PRINCIPLES

### So-1 — Silence Is the Default; Sound Is Opt-In Confirmation, Never Ambient

**Purpose.** No surface the brand controls plays sound automatically, ambiently, or without a direct, immediate connection to an action the user just took. Where sound exists at all, it confirms something specific and is never decorative.

**Reasoning.** Direct extension of Principle 4 (Restraint as Default) and Master Vision §5.5's anti-urgency doctrine into audio: unsolicited sound is one of the most intrusive things an interface can do, and a brand built on never pressuring or interrupting a visitor (§5.5) cannot credibly introduce sound as its one channel where that restraint suddenly relaxes.

**Examples.** A mobile app may play a brief confirmation tone when a form successfully submits, triggered directly by that action. No surface plays background music, ambient tones, or an autoplaying video's native audio without explicit user-initiated unmuting.

**When it applies.** To every surface the brand controls.

**When it does not apply.** To a case study video's own embedded audio, which a visitor explicitly opts into by pressing play — this is user-initiated, not ambient, and is governed by ordinary video-player conventions rather than this principle's restriction.

**Common misunderstandings.** Assuming this principle forbids sound entirely. It does not — it forbids *ambient or unsolicited* sound specifically, while still permitting sound as a direct, opt-in confirmation of an action the user just took.

### So-2 — Haptic Intensity Maps to Motion Tiers, Never Its Own Scale

**Purpose.** Wherever haptic feedback (a phone's vibration motor) is used, its intensity and duration are chosen by mapping directly onto Chapter 15's five motion tiers — Instant, Quick, Standard, Deliberate, Ceremonial — never by inventing an independent haptic intensity scale.

**Reasoning.** Direct application of Principle 7: a haptic system built independently of the motion-timing system this Bible already carefully calibrated (Chapter 15) would duplicate work already done and risk disagreeing with it — a "strong" haptic pulse paired with a "Quick" visual transition would feel mismatched in exactly the way Chapter 1's Principle 2 (Singular Focus) would flag if it occurred visually.

**Examples.** A button press's haptic feedback: a light, brief pulse, corresponding to Instant. A destructive-action confirmation's haptic feedback: a more pronounced, deliberate pulse, corresponding to Deliberate — never the reverse assignment.

**When it applies.** To every haptic feedback event on any platform the brand controls.

**When it does not apply.** To haptic patterns dictated entirely by an operating system's own accessibility or system-level conventions (a standard OS keyboard-tap haptic, for instance), which the brand does not control and should not attempt to override.

**Common misunderstandings.** Assuming Ceremonial-tier haptics exist at all. Per Chapter 15's Mt-3, Ceremonial is reserved exclusively for the intro sequence, which has no haptic component in a typical web context — in a native app context where an equivalent ceremonial moment might exist, this exclusivity rule still applies identically, and any haptic use should default to Deliberate as the practical ceiling, mirroring Chapter 15's own guidance to other stakeholders tempted to reach for Ceremonial.

### So-3 — One Sonic Signature, Reserved for Rare Brand Moments

**Purpose.** If the brand ever adopts a distinct sonic signature (a short, recognizable tone or chime associated specifically with Trady Perch, parallel to a visual logo), it is exactly one signature, used only at genuinely rare, significant moments — never as a general notification sound reused for routine events.

**Reasoning.** Direct extension of Principle 3 (The Scarce Signal) into sound: gold means something specific because it is rare (Chapter 3, C-5); a sonic signature used for every notification would suffer the identical fate a gold-everywhere interface would — it would stop being noticed the moment it became routine.

**Examples.** A hypothetical future sonic signature might play once, when a client's automation is first successfully deployed live — a genuinely rare, significant moment — never for routine notifications like "your report is ready."

**When it applies.** To any future sonic brand signature the company adopts.

**When it does not apply.** To ordinary, non-branded confirmation tones (a generic, quiet "success" tone distinct from any branded signature) permitted under So-1 for routine action confirmation — the scarcity rule governs the *branded signature* specifically, not every sound the product ever makes.

**Common misunderstandings.** Assuming a sonic signature is required at all. This chapter does not mandate one — it specifies the discipline that must govern one *if* the brand ever adopts it, consistent with how Chapter 3 governs gold's use without mandating that every screen contain gold.

### So-4 — Haptic Feedback Is Always Supplementary, Never the Sole Signal

**Purpose.** Haptic feedback accompanies a visual or auditory signal; it never carries meaning entirely on its own.

**Reasoning.** Direct extension of Master Vision §22's "never rely on a color or icon alone" principle (already generalized to motion in Chapter 15, §8) into the haptic channel: a user who cannot feel a specific haptic pattern (or is using the device in a context where they can't, such as resting on a surface) must not miss information as a result.

**Examples.** A destructive-action confirmation's haptic pulse accompanies a visible confirmation dialog and its own text — the haptic reinforces the moment; it does not replace the dialog's other signals.

**When it applies.** To every haptic event.

**When it does not apply.** No exception.

**Common misunderstandings.** Assuming a strong, distinctive haptic pattern is inherently more accessible than a subtle one. Distinctiveness helps only the subset of users who can perceive it in their current context — it is never a substitute for the visual or textual signal this principle requires alongside it.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Sound permitted contexts (So-1):** direct action confirmation (form submission, successful payment) in a native app context; user-initiated media playback (case study videos). **Sound forbidden contexts:** any autoplay, any ambient/background audio, any notification sound not directly triggered by the user's own immediately preceding action.

**Haptic-to-motion-tier mapping (So-2):**

| Motion tier (Chapter 15) | Haptic equivalent |
|---|---|
| Instant | Light, brief single pulse. |
| Quick | Light pulse, slightly longer duration. |
| Standard | Medium pulse. |
| Deliberate | Medium-strong pulse, most textured/distinct pattern available. |
| Ceremonial | Not used outside the intro-equivalent context; defaults to Deliberate if a true ceremonial-equivalent moment exists in a native app. |

**Sonic signature governance (So-3):** none currently defined; any future proposal is subject to Chapter 2's proposal-and-approval process (Section 4 of that chapter) exactly as a new Core color value would be.

---

## 5. MEASUREMENTS

- **Motion-tier-to-haptic mapping: 5 tiers, direct 1:1 correspondence** — no independent haptic scale exists, per So-2.
- **Sonic signatures currently in the system: 0.** This chapter specifies governance for one, should it ever be adopted; it does not create one.

---

## 6. BEHAVIORAL RULES

**Before adding any sound.** Confirm it is triggered directly by an immediately preceding user action (So-1); reject any proposal for ambient or automatically-triggered audio outright.

**Before adding any haptic feedback.** Map it to the correct motion tier per Section 4's table (So-2); never assign an intensity independently of that mapping.

**Under a proposal for a branded sonic signature.** Route through Chapter 2's token-proposal process, treating the proposal with the same Principle 3 scrutiny gold itself receives.

---

## 7. MOTION SPECIFICATION

This chapter's entire haptic model *is* a motion specification, translated into a different sensory channel — Section 4's mapping table is this chapter's direct equivalent of Chapter 15's Section 4, and it should be read as an extension of that chapter rather than an independent one.

---

## 8. ACCESSIBILITY

So-4 is itself an accessibility principle, not merely a design consistency rule: a haptic-only signal is categorically inaccessible to any user who cannot perceive haptic feedback in their current context, and this chapter treats that inaccessibility as disqualifying, not as an acceptable edge case. Sound-based confirmation must similarly never be the sole signal for a hearing-impaired user, consistent with the same reasoning applied to a different channel.

---

## 9. RESPONSIVE BEHAVIOUR

Haptic feedback exists only on platforms with a haptic motor (primarily mobile); Desktop and Wide-range web contexts (Chapter 8) have no haptic equivalent, and no attempt should be made to simulate one through a workaround (a vibrating on-screen element, for instance) — the correct response to a haptic gap on a non-haptic platform is simply the visual/auditory signal alone, per So-4's own logic that those signals must always be sufficient on their own regardless.

---

## 10. AI & FUTURE INTERFACES

Chapter 72 (Voice Interface Design Standards) depends on this chapter's So-1 reasoning directly: a voice interface's equivalent of "no ambient sound" is "the AI does not speak unprompted," which is a direct restatement of this principle in a different medium, not a new rule Chapter 72 needs to derive independently. Chapter 73 (Spatial Computing) will need to consider spatial audio (sound with a perceived location in three-dimensional space) as a genuinely new category this chapter does not yet address — flagged honestly in Section 16 as a gap for that future chapter to close, not something this chapter's current principles already resolve.

---

## 11. DO

A native app's successful-deployment confirmation combining a visible success toast (Chapter 25, once written), a brief Deliberate-tier haptic pulse, and — if a sonic signature is ever adopted — that signature's one rare use, all three signals reinforcing the same genuinely significant moment together.

## 12. DON'T

Adding a cheerful default notification chime to every routine push notification a mobile app sends, because the mobile framework offers one by default and no one overrode it. This is a direct So-1 and So-3 violation — exactly the kind of inherited, undesigned default this chapter exists to prevent, and precisely the failure mode Chapter 1's Section 2 already names as the risk of leaving any sensory channel unaddressed.

---

## 13. ANTI-PATTERNS

**Default inheritance.** Shipping a native app or voice surface with whatever sound and haptic behavior its underlying platform or framework provides by default, on the assumption that "no one designed this, so it doesn't count as a brand decision." This is dangerous because a visitor experiences the platform default exactly as if it were a deliberate brand choice — indifference at the design stage does not produce neutral results, it produces whatever a generic framework author decided was reasonable for an unrelated product. It is detected by auditing every sound and haptic event a shipped surface actually produces, not by checking whether anyone explicitly requested them. It is fixed by overriding every default explicitly against this chapter's principles, treating an unreviewed platform default as equivalent to an unreviewed design decision anywhere else in the system.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Is every sound triggered directly by an immediately preceding user action, with no ambient or automatic audio present? *(So-1)*
- [ ] Does every haptic event map to one of Chapter 15's five motion tiers, per Section 4's table, rather than an independently chosen intensity? *(So-2)*
- [ ] If a branded sonic signature is used, is it reserved for a genuinely rare, significant moment, not a routine notification? *(So-3)*
- [ ] Does every haptic event have an accompanying visual or auditory signal it supplements rather than replaces? *(So-4)*
- [ ] Has every platform default (notification sound, vibration pattern) been explicitly reviewed rather than left unreviewed?

---

## 15. CROSS REFERENCES

Chapter 1 (P3, P4, P7). Chapter 2 (proposal process for any future sonic signature). Chapter 15 (the motion-tier mapping this entire chapter is built on). Chapter 25 (Full Brand Ecosystem, which first commits the brand to platforms this chapter addresses). Chapter 43 (Touch & Gesture Standards). Chapter 72 (Voice Interface Design Standards, direct dependent). Chapter 73 (spatial audio, an acknowledged open gap). Master Vision §2.2, §5.5, Chapter 19.

---

## 16. FUTURE EXPANSION

**Documented assumptions.** This chapter assumes the brand's near-term sound and haptic needs are confined to confirmation feedback and, eventually, voice interaction pacing — it does not yet address music, ambient scoring for video content beyond what Chapter 12's photography-adjacent video guidance might eventually cover, or spatial audio.

**Documented limitations.** As stated at this chapter's opening, none of these principles have yet been tested against a real, shipped native app or voice surface. This chapter should be revisited with real priority once such a surface is actually built, since sound and haptics are unusually difficult to reason about correctly in the abstract compared to the visual chapters that precede this one.

**Future research areas.** Spatial audio (Chapter 73) and whether a haptic equivalent of Chapter 3's Gold Budget — a maximum "haptic density" per session, preventing overuse the way the 10% ceiling prevents visual overuse — is eventually warranted once real usage data exists to evaluate it against.

---

*End of Chapter 16. This closes Volume I in full. Chapter 17, Component Philosophy & Anatomy Standard, is the bridge into Volume II — the template every component chapter that follows will be built from.*
