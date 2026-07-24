# CHAPTER 23 — API INTEGRATION PHILOSOPHY

**Trady Perch Product Implementation Constitution · Part V: State, Data & API Architecture**

**Inherited From:** Master Vision Document Chapter 19 (AI Personality Constitution, the source of this chapter's AI-API trust boundary); Design System Bible Chapter 46 (Trust, Privacy & Security Visual Patterns). Chapter 2 (Product Architecture Philosophy) and Chapter 21 (State Management Philosophy) are this chapter's direct premises.

---

## 1. INTRODUCTION

Chapter 2 drew a trust boundary between this product's surfaces. This chapter draws the equivalent boundary between this product and everything outside it — a backend service Trady Perch operates, a third-party API it depends on, and, the case demanding the most careful treatment, an AI model API mediating the conversational layer Chapter 2 already named as its own surface. Every external integration is classified against this chapter's model before a line of client code touches it, per this chapter's own success criterion.

---

## 2. THE POSTURE: SERVER-MEDIATED BY DEFAULT

No client-side code — code that runs in a visitor's or client's browser — calls an external API directly, with credentials of any kind, as a default posture. Every external call is mediated through a server-side boundary this product controls, which holds any required credential, applies Chapter 24's contract validation, and returns only the data the client actually needs. This is not a REST-versus-GraphQL choice — that is a narrower, later decision Chapter 24 makes — it is a trust-boundary decision: a credential or an unfiltered third-party response never reaches client-side code directly, regardless of which query protocol eventually carries the mediated request.

The rare exception — a client-side call to a public, credential-free, read-only third-party endpoint — is permitted only where Chapter 43's security review has explicitly classified it as safe, and is treated as an exception requiring citation per Chapter 1's IP1, never as an unremarkable default.

---

## 3. THE THREE INTEGRATION CLASSES

Every external dependency is classified into exactly one class before any client code is written:

**Class A — Trady Perch-operated backend services.** Full trust, full data access as needed, still server-mediated per Section 2, still contract-validated per Chapter 24. The Client Portal's own backend is Class A.

**Class B — Third-party business services.** A payment processor, an email-delivery service, an analytics platform. Server-mediated without exception; credentials for these services never exist anywhere client-side code could reach them, and the specific data shared with a Class B service is minimized per Chapter 44's data-privacy standard to only what that integration genuinely requires.

**Class C — AI model APIs.** The highest-scrutiny class, specified fully in Section 4, because an AI model API's behavior is probabilistic and its output is, per Master Vision Chapter 19's AI Personality Constitution, directly representative of the brand's own voice the moment it reaches a visitor or client.

---

## 4. THE AI-API TRUST BOUNDARY

Class C integrations — any call to an AI model API powering Chapter 2's AI-Native Conversational Layer — are held to obligations beyond Section 2's general server-mediation posture:

**No model credential, prompt template, or system instruction is ever present in client-side code.** This is Section 2's general rule, stated again here because a conversational feature is precisely the case where a well-intentioned but rushed implementation is most tempted to call a model API directly from the browser for latency reasons — a temptation this chapter forecloses without exception.

**Every model response is treated as untrusted input before it reaches a user.** Per Master Vision Chapter 19's brand-voice consistency requirement, a model's raw output is not assumed to already comply with the brand's tone, factual accuracy, or Chapter 44's data-handling rules — it passes through whatever validation and moderation layer Chapter 19's operational chapters (once written, in the AI's own personality specification) require, server-side, before reaching a client.

**Conversational state itself is treated as sensitive by default**, per Design System Bible Chapter 46's trust-pattern standard, regardless of whether a specific conversation happens to contain data that would independently qualify as sensitive under Chapter 44 — the classification is conservative by design, because a conversational transcript is exactly the kind of artifact most likely to accumulate genuinely sensitive content incrementally, in a way no single message would trigger stricter handling on its own.

---

## 5. DATA MINIMIZATION AT THE BOUNDARY

For every integration class, the server-side mediation layer from Section 2 returns to the client only the fields the client actually needs to render — never a third-party service's full raw response passed through unfiltered. This is a direct application of Chapter 1's IP3 to data exposure specifically: an unused field passed through "in case it's needed later" is a liability under Chapter 44's data-privacy standard the moment it contains anything sensitive, with no offsetting benefit until an actual, demonstrated need for it exists.

---

## 6. ENFORCEMENT & MEASUREMENT

Section 3's classification is recorded explicitly for every integration, in an integration registry maintained per Chapter 62's ADR discipline — a new dependency on an external API with no recorded classification fails a repository-structure check extending Chapter 7 §8's linter. Section 2's server-mediation rule is enforced by a dependency-boundary check, extending Chapter 45's supply-chain tooling, that flags any client-side bundle containing a credential-shaped string or a direct import of a known third-party API client library not already wrapped by the server-mediation layer.

---

## 7. BEHAVIORAL RULES

**Before integrating any new external service.** Section 3's classification is determined and recorded first — Class A, B, or C — before any client-facing code is written, per this chapter's own success criterion.

**Before adding any Class C (AI model API) capability.** Section 4's full obligation set is satisfied — no client-side credential, response validation in place, conversational state classified as sensitive — before the feature is considered ready for even an internal preview.

**When latency pressure tempts a direct client-side call.** The pressure is resolved by optimizing the server-mediation layer itself (caching, streaming responses) per Chapter 25, never by bypassing Section 2's boundary — IP6 grants no performance-driven exception to a trust-boundary rule.

---

## 8. DO / DON'T

**Do** classify every new external integration into Class A, B, or C before writing any client-facing code.

**Do** treat every AI model response as untrusted input requiring validation before it reaches a user, regardless of how reliable the model has seemed in practice.

**Don't** call any external API directly from client-side code with an embedded credential, for any class of integration.

**Don't** pass a third-party service's full raw response through to the client unfiltered — return only the fields actually needed.

---

## 9. ANTI-PATTERNS

**The latency-driven direct call.** A conversational feature's initial prototype calls the AI model API directly from the client for speed, with a stated intention to "add the server layer before launch." This is dangerous because, per Chapter 5's F2, a working prototype under time pressure has a strong tendency to ship as-is, and a client-exposed model credential is a severe, high-blast-radius security failure the moment it does — not merely a stylistic irregularity. It is detected by Section 6's dependency-boundary check flagging the direct client-side API call immediately, in the prototype itself, not only at a pre-launch audit. It is fixed by building the server-mediation layer from the start, treating the latency question as one to be solved within that boundary, per Chapter 25's caching and streaming techniques, not by removing the boundary.

---

## 10. QUALITY ASSURANCE CHECKLIST

- [ ] Has every external integration been classified as Class A, B, or C, recorded per Chapter 62?
- [ ] Does zero client-side code hold a credential or call an external API directly, absent an explicitly reviewed exception? *(Section 2)*
- [ ] Does every Class C integration validate model responses server-side before they reach a client? *(Section 4)*
- [ ] Does the server-mediation layer return only the fields the client actually needs, per Section 5?

---

## 11. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP1, IP3, IP6). Chapter 2 (the AI-Native Conversational Layer trust boundary this chapter formalizes). Chapter 7 §8 and Chapter 45 (the extended checks in Section 6). Chapter 24 (API Contract & Schema Standards, the validation layer Section 2 relies on). Chapter 25 (Data Fetching & Caching Strategy, where Section 7's latency pressure is correctly resolved). Chapter 44 (Data Privacy & Compliance Implementation, governing Section 4 and Section 5's minimization rule). Chapter 62 (Architecture Decision Record Standard, recording Section 3's classifications).

**Within the five documents above this Constitution:** Master Vision Chapter 19; Design System Bible Chapter 46.

---

## 12. FUTURE EXPANSION

**Documented limitations.** Section 4's model-response validation layer depends on Master Vision Chapter 19's own operational AI Personality Constitution content, which specifies tone and factual-accuracy rules this chapter defers to rather than duplicates; until that content is fully operationalized, validation is necessarily narrower than this chapter's eventual full intent, tracked in Chapter 66's debt register.

---

*End of Chapter 23. The next chapter, API Contract & Schema Standards, specifies exactly how the request and response shapes crossing this chapter's trust boundary are defined and validated.*
