# CHAPTER 43 — APPLICATION SECURITY STANDARD

**Trady Perch Product Implementation Constitution · Part IX: Security Implementation**

**Inherited From:** Master Vision Document §22 (Accessibility Standards, cited as the structural parallel for a non-negotiable floor). Chapter 42 (Security Implementation Philosophy) is this chapter's direct premise.

*Scope note: this chapter governs application-layer security only. Infrastructure and network security (hosting-platform configuration, network segmentation) are explicitly out of scope, owned by whatever hosting platform's own documentation and configuration apply — cited by reference in a Chapter 62 ADR when a specific platform is chosen, never duplicated here.*

---

## 1. INTRODUCTION

Chapter 42 established security as a default, constructed-in posture. This chapter is where that posture becomes specific, checkable requirements, mapped to the OWASP Top 10 category each addresses, so that Chapter 42's philosophy resolves into an actual rule set a SAST tool can enforce — this chapter's own stated success criterion.

---

## 2. INJECTION PREVENTION

Every value crossing from user input or an external source (Chapter 23's Class B/C integrations) into a database query, a shell command, or a rendered HTML string is parameterized or escaped by the framework's own safe-by-default mechanism — never concatenated into a raw query or command string. Chapter 24's schema validation, run at every integration boundary, is the first line of defense; this chapter's requirement is the second, independent one: even validated input is never trusted to be safe for direct interpolation into a query, command, or markup context, because validation confirms shape, not safety in every possible downstream context.

---

## 3. BROKEN ACCESS CONTROL

Per Chapter 2 §5's trust boundary, every Client Portal route checks authentication and authorization on the server side, on every request — never relying on a client-side route guard alone, which prevents only a UI from *displaying* protected content but does nothing to prevent a direct API request from retrieving it. Authorization is checked at the specific resource level, not only at the route level: a request for a specific client's invoice verifies the requesting session actually has rights to that specific invoice, not merely that the session is authenticated at all — the direct prevention of an insecure direct object reference, one of the most common real-world instances of this OWASP category.

---

## 4. CRYPTOGRAPHIC FAILURES

Any data classified as sensitive per Chapter 44's data-privacy standard is encrypted in transit (enforced transport-layer encryption, no plain-text fallback permitted) and at rest, using the hosting platform's own current, non-deprecated cryptographic primitives rather than a custom implementation — per Chapter 1's IP3, cryptography is a case where "don't build your own" is the restraint-correct default, not an exception to it. A credential is never logged, even at debug verbosity, and never included in an error message per Chapter 27's typed error object, whose message-template function (Chapter 27 §6) is checked to guarantee this.

---

## 5. INSECURE DESIGN

This category is substantially Chapter 42's own territory — a design-time failure, not an implementation-time one — and this chapter's contribution is the specific check that operationalizes it: every feature's design review (Chapter 42 §6) explicitly considers what happens if its stated access model is bypassed, not only whether the intended path is itself secure. A feature designed only for its happy path, with no consideration of a plausible misuse path, fails this check regardless of how correctly its intended path is implemented.

---

## 6. SECURITY MISCONFIGURATION

Chapter 10's configuration standard — mandatory startup validation, no silent fallback for a required secret — is this category's primary defense, cited here rather than restated. This chapter adds one further requirement: every environment's configuration is diffed against a known-secure baseline (no debug mode enabled in production, no verbose error output exposing stack traces to a client) as part of Chapter 56's CI pipeline, catching a misconfiguration before deployment rather than after.

---

## 7. VULNERABLE AND OUTDATED COMPONENTS

Governed in full by Chapter 45 (Dependency & Supply Chain Security), cited here as this OWASP category's owner rather than duplicated.

---

## 8. IDENTIFICATION AND AUTHENTICATION FAILURES

Session tokens are generated using the platform's own secure random-generation primitive, never a custom or predictable scheme. Session expiration is enforced server-side, with no client-side-only session-length control. Any authentication failure returns an identical, generic response regardless of whether the failure was due to an unknown identifier or an incorrect credential, preventing user enumeration through response-timing or response-content differences.

---

## 9. SOFTWARE AND DATA INTEGRITY FAILURES

Every dependency, per Chapter 45, is installed from a locked, verified source with an integrity hash checked at install time — no dependency is fetched and used without this verification, in CI or in any deployment. Chapter 17's component-library versioning and Chapter 24's contract versioning both provide the integrity guarantee for this product's own internal artifacts: a consuming app's pinned version, per Chapter 17 §3, cannot silently resolve to a different, unverified artifact.

---

## 10. SECURITY LOGGING AND MONITORING FAILURES

Every authentication event, authorization failure, and Section 3-relevant access-control decision is logged with enough detail to reconstruct what happened, per Chapter 59's incident-response protocol, which depends directly on this logging existing before an incident occurs, not added retroactively during one. Logs never contain the credential or sensitive-data values themselves, per Section 4 — the event and its context are logged, never the secret.

---

## 11. SERVER-SIDE REQUEST FORGERY

Any server-side code that makes a request to a URL influenced, even indirectly, by user input validates that URL against an explicit allowlist before the request is made — never trusting user-influenced input to only ever point somewhere safe. This is a direct, specific application of Chapter 42 §2's default-deny posture to outbound requests specifically, since this category's real-world exploitation nearly always involves a server making a request the developer never anticipated it could be tricked into making.

---

## 12. ENFORCEMENT & MEASUREMENT

A SAST (static application security testing) tool, wired into Chapter 56's CI pipeline, checks Sections 2, 3, 4, 6, and 11's patterns automatically — the categories most amenable to static detection. Sections 5, 7 (via Chapter 45), 8, 9, and 10 are checked through a combination of the design-review requirement (Section 5, Chapter 42 §6), dependency automation (Chapter 45), and a security-focused code review pass per Chapter 54's checklist, for the categories requiring more contextual judgment than static analysis alone can provide. This is the direct mechanism behind this chapter's own success criterion — a pull request introducing a mapped, statically-detectable vulnerability is blocked automatically; a pull request introducing a more contextual vulnerability is caught at the specifically-scoped review step rather than left uncaught entirely.

---

## 13. BEHAVIORAL RULES

**When handling any external input.** Section 2's parameterization and escaping rules are applied by default, using the framework's safe mechanism — never a manual string-concatenation approach, even for a case that seems too simple to warrant it.

**When implementing any Client Portal route.** Section 3's server-side, resource-level authorization check is implemented before the route is considered functional — a route that renders correctly for an authorized user but has not been tested against an unauthorized one is not yet complete.

**When a SAST finding is flagged.** It is fixed, not suppressed, per Chapter 31's G2 guardrail applied to security tooling specifically — an AI agent encountering a SAST failure never disables the specific rule to unblock a merge.

---

## 14. DO / DON'T

**Do** parameterize or safely escape every value crossing from external input into a query, command, or markup context.

**Do** check authorization at the specific resource level on every Client Portal request, server-side, on every request.

**Don't** rely on a client-side route guard as a security boundary — it is a UX convenience, never a control.

**Don't** make an outbound server-side request to a user-influenced URL without validating it against an explicit allowlist, per Section 11.

---

## 15. QUALITY ASSURANCE CHECKLIST

- [ ] Is every external input parameterized or safely escaped before reaching a query, command, or markup context? *(Section 2)*
- [ ] Is authorization checked server-side, at the specific resource level, on every Client Portal request? *(Section 3)*
- [ ] Is sensitive data encrypted in transit and at rest, with zero credentials logged or included in error messages? *(Section 4)*
- [ ] Does the feature's design review consider a plausible misuse path, not only its intended path? *(Section 5)*
- [ ] Does every authentication and authorization-failure event get logged with sufficient, non-sensitive detail? *(Section 10)*
- [ ] Does every outbound, user-influenced server-side request validate against an explicit allowlist? *(Section 11)*

---

## 16. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (IP3, IP6). Chapter 2 §5 (the trust boundary Section 3 enforces). Chapter 10 (configuration standard, Section 6's primary defense). Chapter 17 §3, Chapter 24 (integrity guarantees behind Section 9). Chapter 27 §6 (message templates checked per Section 4). Chapter 31 (G2, applied to Section 13). Chapter 42 (the philosophy this chapter operationalizes). Chapter 44 (data classification behind Section 4). Chapter 45 (Section 7's full owner). Chapter 54 (review checklist incorporating Section 12's contextual checks). Chapter 56 (CI pipeline running Section 12's SAST). Chapter 59 (incident response, dependent on Section 10's logging).

**Within the five documents above this Constitution:** Master Vision §22.

---

## 17. FUTURE EXPANSION

**Documented limitations.** This chapter's OWASP Top 10 mapping reflects the category list as broadly and durably understood; a future revision to that industry list is incorporated through Chapter 64's governance process rather than assumed to update this chapter automatically.

---

*End of Chapter 43. The next chapter, Data Privacy & Compliance Implementation, specifies how personal data is collected, stored, and disclosed in code — the data classification this chapter's Section 4 already depends on.*
