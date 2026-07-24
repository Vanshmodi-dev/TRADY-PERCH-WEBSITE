# CHAPTER 46 — TRUST, PRIVACY & SECURITY VISUAL PATTERNS

**Trady Perch Design System Bible · Volume III: Interaction & Behavior**
*Genuinely novel territory beyond normal design-system scope, with the least direct Master Vision precedent of any chapter in Volume III.*

**Inherited From:** Master Vision §2.3 (The Trust Equation), §5.4 (Why Trust Must Precede Price), §11.3 (Trust Architecture). Design System Bible Chapter 1 (P1), Chapter 3 (color), Chapter 21 (Forms), Chapter 23 (Dialogs).

---

## 1. INTRODUCTION

An AI automation company is asking prospects and clients for exactly the kind of access — operational data, system integrations, customer information — that makes security communication load-bearing rather than decorative. The Master Vision addresses this strategically, through the Trust Equation, but never at the level of an actual permission dialog or data-handling disclosure. This chapter closes that gap.

This chapter depends on Chapter 21 (where consent language most often appears) and Chapter 23 (where security disclosures frequently surface via a dialog). It is depended on by Chapter 60 (Print & Physical Collateral, for physical data-handling disclosures in proposals).

---

## 2. PHILOSOPHY

The rejected alternative is treating trust and security communication as a legal/compliance afterthought — generic checkbox language, a boilerplate privacy-policy link, a stock "🔒 Secure" badge borrowed from a template. This was rejected because Master Vision §2.3 already ranks evidence of process rigor above aesthetic polish in the Trust Equation, and a generic security treatment is a direct failure of exactly that rigor, at the precise moment a prospect is deciding whether to extend trust.

---

## 3. CORE PRINCIPLES

### Tr-1 — Disclosures Appear at the Moment of Relevance, Never Buried in Terms

**Purpose.** Any data-handling or security-relevant fact is disclosed directly at the point in the interface where the user is making the related decision — never deferred entirely to a Terms of Service document the user is unlikely to read at that moment.

**Reasoning.** Descends from Principle 1: a disclosure technically present somewhere in a lengthy document is not meaningfully traceable to the specific decision a user is making right now — Master Vision §11.3's "distributed, not concentrated" trust-architecture logic applies here directly.

**Examples.** A form field requesting a client's CRM API credentials includes a brief, specific inline note — "Used only to sync case status; never shared with third parties" — directly beneath the field, not solely covered by a general privacy policy link in the footer.

**When it applies.** To every data-collection point involving genuinely sensitive information. **When it does not apply.** To routine, low-stakes fields (a name field on a contact form) where a specific inline disclosure would be disproportionate noise relative to the actual stakes involved.

### Tr-2 — A Permission Request States Exactly What and Why, Never a Generic Grant

**Purpose.** Any permission or access request names the specific data or system access being requested and the specific reason it's needed — never a generic "This integration would like to access your data."

**Reasoning.** Direct extension of Master Vision §16.1's specificity doctrine to permission language: vague permission requests are exactly the pattern that trains users to click through without reading, which is the opposite of the informed trust this brand is built to earn.

**Examples.** "Trady Perch's automation needs read access to your CRM's contact records, so it can identify leads to qualify automatically. It will never write to or delete your existing records." Never: "This app would like to access your CRM."

**When it applies.** To every permission or access-grant request. **When it does not apply.** No exception.

### Tr-3 — Trust Signals Are Evidence-Based, Never Decorative Badges

**Purpose.** Any visual trust signal (a security certification mention, a data-handling commitment) is either a real, verifiable certification actually held, or a specific, checkable process fact — never a generic "bank-level security" or padlock-icon badge asserting security with no verifiable backing.

**Reasoning.** Direct restatement of Chapter 1's Principle 1 and Master Vision §11.3/§16.1's "no claim without evidence nearby" standard, applied to the specific temptation this component category invites: security badges are one of the most common places a legitimate business borrows an unverifiable-sounding claim because competitors do it too.

**Examples.** "SOC 2 Type II certified" (if genuinely true and verifiable) or "Data encrypted in transit and at rest using industry-standard TLS 1.3" (a specific, checkable fact): permitted. A generic shield icon with the text "Bank-Level Security" and no further detail: forbidden.

**When it applies.** To every trust-signaling visual element. **When it does not apply.** No exception.

---

## 4. COMPLETE DESIGN SPECIFICATION

**Anatomy** (inline disclosure): Chapter 21's Helper Text region, repurposed for a specific data-handling note rather than a validation message, sharing the same visual position and `text.secondary` treatment so the two don't visually compete. **Anatomy** (permission dialog): Chapter 23's Dialog anatomy, with Body content following Tr-2's exact-scope-and-reason structure.

**Token consumption:** `semantic.color.text.secondary` (inline disclosures, matching Chapter 21's helper text exactly, since a security note and a validation helper occupy the same structural role at different moments), Chapter 23's full Dialog token set for permission requests.

---

## 5. MEASUREMENTS

Not independently specified beyond existing Chapter 21/23 values — this chapter governs content and placement rules, not new visual measurements.

---

## 6. BEHAVIORAL RULES

**Before requesting any sensitive data or permission.** Draft the specific what-and-why statement per Tr-2 before any visual design work begins. **Before adding any trust badge or security claim.** Verify it is either a real, currently-held certification or a specific, checkable fact — reject any claim that cannot be verified on request.

---

## 7. MOTION SPECIFICATION

A permission dialog uses Chapter 23's standard entrance/exit treatment exactly — no distinct, more dramatic motion is warranted for this category of dialog; treating it identically to any other Dialog is itself consistent with this brand's calm, non-alarming register even at a moment involving real stakes.

---

## 8. ACCESSIBILITY

Inline disclosures are programmatically associated with their relevant field exactly as Chapter 21 already requires for helper text, ensuring a screen-reader user receives the same data-handling context a sighted user reads visually.

---

## 9. RESPONSIVE BEHAVIOUR

No distinct responsive behavior beyond Chapter 21 and Chapter 23's existing rules — trust and security content follows its host component's responsive treatment directly.

---

## 10. AI & FUTURE INTERFACES

A voice interface's equivalent, per Master Vision §19.9's Trust & Safety behavior, is the AI stating data-handling facts plainly when relevant to the conversation ("I'll only use this to check your account status — I won't make any changes") — Tr-2's exact-scope-and-reason structure applies directly to spoken disclosure as much as written.

---

## 11. DO / 12. DON'T

**Do:** A CRM-integration permission screen stating exactly which data is read, why, and what will never happen to it, with a specific, verifiable encryption fact nearby rather than a generic badge. **Don't:** A generic "We take your privacy seriously 🔒" checkbox with no further detail, linking only to a lengthy, separate privacy policy — fails Tr-1 and Tr-2 simultaneously.

---

## 13. ANTI-PATTERNS

**Trust theater.** Adding generic security badges, shield icons, or vague reassurance language because competitors display similar elements and their absence might read as a gap, rather than because a specific, verifiable fact is being communicated. This is dangerous because a sophisticated buyer — precisely the buyer this brand targets, per Master Vision §5.1 — recognizes unverifiable trust theater immediately and discounts it, and may discount the surrounding genuine claims along with it. It is detected by asking, for any trust-signaling element, "can this specific claim actually be verified on request?" It is fixed by replacing any claim that fails this test with either a genuinely verifiable fact or nothing at all — nothing is safer than an unverifiable claim.

---

## 14. QUALITY ASSURANCE CHECKLIST

- [ ] Is every sensitive data-collection point accompanied by a specific, contextual disclosure rather than relying solely on a general terms document? *(Tr-1)*
- [ ] Does every permission request state exactly what is being accessed and why? *(Tr-2)*
- [ ] Is every trust signal either a real, verifiable certification or a specific, checkable fact? *(Tr-3)*

---

## 15. CROSS REFERENCES

Chapter 1 (P1). Chapter 3 (color). Chapter 21 (inline disclosure placement). Chapter 23 (permission dialog anatomy). Chapter 60 (physical disclosure extension). Master Vision §2.3, §5.1, §5.4, §11.3, §16.1, §19.9.

---

## 16. FUTURE EXPANSION

This chapter should be revisited jointly with actual legal/compliance review once real data-handling practices are finalized, since its examples are illustrative rather than binding legal language.

---

*End of Chapter 46. The next chapter, per the authoring sequence, is Error Handling & Recovery Design.*
