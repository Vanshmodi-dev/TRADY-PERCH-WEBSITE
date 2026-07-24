# CHAPTER 2 — PRODUCT ARCHITECTURE PHILOSOPHY

**Trady Perch Product Implementation Constitution · Part I: Implementation Philosophy**

**Inherited From:** Master Vision Document Chapter 25 (Full Brand Ecosystem, §25.1–§25.10, specifically §25.2's named client dashboard) and Chapter 26 (Future Expansion Roadmap); Design System Bible Chapter 22 (Tables & Data Grids, as dashboard precedent); UX / Experience Blueprint Chapter 78 (Data-Dense Experience Doctrine) and Chapter 82 (Client Portal Experience Standard). Chapter 1 (Implementation Principles) governs every decision made below it in this chapter; where a specific choice in this chapter appears to trade away IP6's non-negotiable floors for architectural convenience, Chapter 1 is correct and this chapter must be revised.

---

## 1. INTRODUCTION

Chapter 1 established seven principles an engineer or an AI agent holds in mind mid-decision. This chapter makes the first actual decision governed by them: the shape of the system those decisions will be made inside of. Before a folder exists, before a framework is pinned, before a single component is coded, this Constitution must answer a smaller set of much larger questions — how many distinct product surfaces does Trady Perch actually have, what does each one render like, and how do they relate to one another as a single, coherent codebase rather than a loose federation of unrelated projects.

This chapter's job is deliberately narrow. It decides macro-architecture — the shape visible from outside any single file — and nothing more specific than that. It does not name a folder (Chapter 7's job), pin a framework version (Chapter 10's job), or specify a component's internal structure (Chapter 12's job). What it produces is a diagram and a decision record stable enough that every later, more specific chapter can build against it without having to re-derive it, and general enough that a genuinely new product surface — one Master Vision Chapter 26's roadmap hasn't named yet — can be located inside it without redrawing the diagram itself.

This chapter depends on Chapter 1 alone. Its descendants span most of the rest of this Constitution: Chapter 6 (Repository Structure Philosophy) takes the surface boundaries drawn here as its starting premise. Chapter 21 (State Management Philosophy) and Chapter 38 (Rendering Strategy Standard) both assume the rendering-model decision made in Section 4 below rather than re-litigating it per route. Part IX's security chapters treat the trust boundaries drawn in Section 5 as already settled fact. Any future chapter written for a product surface this document does not yet name — the mobile app or the client dashboard UX Blueprint Chapter 62 and Chapter 82 already anticipate, or a reseller-facing surface implied by Master Vision Chapter 26's channel-partner roadmap — is required to first locate itself on this chapter's diagram before its own, more specific standard is written.

---

## 2. PHILOSOPHY

A product's macro-architecture is usually decided implicitly, one route at a time, by whoever happens to be building the next feature under whatever time pressure that week brings. Each individual decision looks reasonable in isolation. The result, assembled after the fact, is rarely a system anyone would have deliberately chosen — it is an accumulation of locally sensible choices that collectively contradict one another. This chapter exists to make the decision once, deliberately, before that accumulation has a chance to start.

Three alternative approaches to this chapter's own existence were considered and rejected.

The first alternative was to skip macro-architecture entirely and let it emerge from Part II's repository-structure chapters — treat "where does everything live" as sufficient without first answering "what kinds of things are there to place." This was rejected because a folder structure is a projection of an architecture, not a substitute for deciding one. Chapter 7 needs an answer to "how many distinct rendering contexts exist" before it can draw a defensible directory tree; asking it to invent that answer itself would quietly relocate an architecture decision into a chapter whose actual job, per its own Purpose, is naming folders.

The second alternative was to defer this decision until Master Vision Chapter 26's roadmap items — the client dashboard, a mobile app, a reseller-facing surface — actually exist as committed projects, rather than architecting for surfaces that are not yet built. This was rejected on IP7 grounds: the cost of architecting a system that assumes exactly one surface, and later discovering it must support several, is significantly higher than the cost of architecting for several surfaces from the outset and building only one of them first. Reversibility bias favors the option that remains correct even if the roadmap accelerates, not the option that is simplest under the assumption it won't.

The third alternative was to treat every current and future Trady Perch surface as a single, undifferentiated application — one rendering strategy, one deployment, one trust boundary, applied uniformly regardless of whether a given route is a public marketing page or an authenticated client's financial dashboard. This was rejected because it violates IP6 by construction: a marketing page's performance and SEO obligations (Part VII, Part VIII) and a client dashboard's data-density and security obligations (UX Blueprint Chapter 78, this Constitution's Part IX) are different enough in kind that forcing them through one undifferentiated architecture would require weakening one surface's standard to satisfy the other's constraints.

What remains, and what this chapter commits to, is a small number of named, explicitly bounded product surfaces, each with its own rendering model suited to what it actually is, unified under a single repository and a single set of engineering standards rather than fragmented into separate codebases that would each have to reinvent Parts III through XIV independently.

---

## 3. THE SURFACES

Before a rendering model or a repository posture can be decided, the actual things being architected must be named. Four product surfaces are recognized by this Constitution as of this writing, drawn directly from Master Vision Chapters 25–26 and the UX / Experience Blueprint's own anticipation of them. Naming a surface here does not commit Trady Perch to building it on any particular timeline — Section 4's rendering-model decisions apply the moment a surface is actually built, not before.

**Surface 1 — The Marketing Site.** The public, unauthenticated website: home, services, case studies, pricing, contact, and every page a prospective client encounters before any relationship exists. This is the surface Master Vision Chapters 1–24 were written for directly, and the one this Constitution's own docs currently govern first.

**Surface 2 — The Client Portal.** The authenticated, data-dense dashboard named explicitly in Master Vision §25.2, where an existing client views project status, deliverables, and account information — the surface UX / Experience Blueprint Chapter 78 (Data-Dense Experience Doctrine) and Chapter 82 (Client Portal Experience Standard) are written to govern.

**Surface 3 — The AI-Native Conversational Layer.** Any surface where a visitor or client interacts with an AI agent acting on Trady Perch's behalf — a conversational interface embedded in the Marketing Site or Client Portal, or, per Master Vision Chapter 19's AI Personality Constitution, a standalone conversational entry point. This is treated as a distinct surface, not a widget bolted onto the other two, because its trust-boundary and data-handling obligations (Chapter 23's API Integration Philosophy) differ enough from a conventional page render to require its own explicit architectural treatment.

**Surface 4 — Future Roadmap Surfaces.** A mobile app and a reseller/channel-partner surface, both anticipated by UX / Experience Blueprint Chapter 62 and Master Vision Chapter 26's roadmap respectively, but not yet committed to a build timeline. This Constitution does not architect these in detail ahead of need — per Chapter 1's IP3, that would be construction without a demonstrated current requirement — but Section 6 specifies exactly how a future surface of this kind is correctly located onto this chapter's diagram once it is actually commissioned.

---

## 4. THE RENDERING MODEL DECISION

Each surface is assigned a rendering posture suited to what it structurally is, not a single posture applied uniformly for the sake of an easier decision. The specific framework satisfying each posture is Chapter 10's decision, not this chapter's; what follows is the category of rendering strategy each surface commits to, and the reasoning Chapter 38 (Rendering Strategy Standard) will later operationalize per individual route.

**The Marketing Site renders static-first, with server rendering as the explicit exception, not the default.** Nearly every page on this surface is the same for every visitor and changes infrequently — the precise profile that static generation serves best, and the profile Part VII's performance budgets and Part VIII's SEO standards are calibrated against. A route on this surface earns server-side rendering only when it demonstrably requires per-request personalization that static generation cannot provide; Chapter 38 fixes the specific decision procedure, but the default this chapter sets is static, and the exception must be justified, per IP3, not assumed.

**The Client Portal renders as an authenticated, client-heavy application, server-rendered or statically shelled only at its outermost frame.** Once a client is authenticated, the dominant cost this surface optimizes for is interaction responsiveness within a session, not first-byte time to an anonymous visitor — the opposite profile from the Marketing Site, and the reason this Constitution refuses to force both surfaces through one rendering strategy. Data on this surface is fetched and cached per Chapter 25's data-fetching standard, not baked in at build time, because the entire premise of a client dashboard is that its content is current, per-account, and private.

**The AI-Native Conversational Layer renders as a thin client against a server-mediated conversational endpoint.** No conversational state, model credential, or trust-sensitive logic is permitted to live purely client-side; every exchange is mediated by a server boundary this Constitution treats, per Chapter 23, as equivalent in sensitivity to an authentication boundary, regardless of which surface embeds the conversational layer's visible interface. This is stated here, at the macro-architecture level, because it is a structural property of the surface itself — not a per-feature security decision Part IX should have to re-derive every time a new conversational entry point is added.

**Future Roadmap Surfaces inherit whichever posture their eventual purpose most resembles** — a mobile app consuming the same authenticated data as the Client Portal inherits that surface's client-heavy, session-optimized posture rather than requiring an invented third category; a reseller-facing surface serving largely static, low-personalization content inherits the Marketing Site's posture. This chapter deliberately does not invent a fifth rendering category in advance of a fifth kind of surface actually existing, per IP3.

---

## 5. THE REPOSITORY & TRUST BOUNDARY DECISION

**This Constitution adopts a single-repository (monorepo) posture across all current and near-term-roadmap surfaces**, rather than a separate repository per surface. Three reasons, each independently sufficient, converge on this choice. First, IP4 (Explicit Over Implicit): a monorepo makes every cross-surface convention — the naming standard of Chapter 9, the component library of Part III, the CI gates of Part X — trivially shareable and impossible to silently fork, where a polyrepo posture would require every convention to be either duplicated by hand or distributed through a separate publishing pipeline, itself a dependency this Constitution would then have to govern. Second, IP2 (Machine-Checkable Truth): a single CI configuration can enforce this Constitution's standards across every surface uniformly, where a polyrepo posture would require Chapter 56's pipeline to be independently correct in as many places as there are repositories. Third, IP5 (Self-Contained Context): an AI agent working across surfaces — building a Client Portal feature that consumes a component originally built for the Marketing Site — can see the entire relevant system in one checkout, without needing separately granted access to a second repository and a second, possibly drifted, copy of this Constitution.

This decision is not permanent in the absolute sense — Chapter 62's Architecture Decision Record standard applies to it precisely because it is exactly the kind of foundational, hard-to-reverse choice Chapter 1's IP3 carves out for more anticipatory scrutiny than routine decisions receive. It is revisited if and when a specific surface's deployment, scaling, or ownership requirements genuinely diverge enough that shared tooling becomes a net cost rather than a net benefit — not on a fixed schedule, and not preemptively.

**The trust boundary between surfaces is explicit and enforced, not incidental to the monorepo's shared code.** A single repository does not imply a single trust domain. The Marketing Site is unauthenticated by default; the Client Portal requires an authenticated session for every route inside it; the AI-Native Conversational Layer requires the server-mediation boundary Section 4 already establishes, regardless of which surface embeds it. Shared code — the component library, the design-token pipeline, the state-management patterns — crosses these boundaries freely, because Part III's implementation of the Design System Bible is, correctly, surface-agnostic. Application data, session state, and credentials do not cross these boundaries at all, and Chapter 43's Application Security Standard treats any code that would cause them to as a defect regardless of which surface it originates in.

---

## 6. HOW A NEW SURFACE IS LOCATED

This section exists specifically to satisfy this chapter's own success criterion: a proposed new product surface must be locatable here without requiring this chapter's diagram to change. The procedure:

1. **Classify the surface's audience.** Public and unauthenticated locates it nearest the Marketing Site's posture. Authenticated and account-specific locates it nearest the Client Portal's posture. Conversational and AI-mediated locates it as an instance of the AI-Native Conversational Layer, regardless of which other surface visually embeds it.
2. **Classify the surface's content volatility.** Largely static, shared across visitors, favors the Marketing Site's static-first rendering posture. Per-account, frequently changing, favors the Client Portal's client-heavy posture.
3. **Confirm no fifth category is actually required.** Per IP3, a genuinely novel rendering posture is adopted only after the three existing postures in Section 4 are specifically shown insufficient — not because a new surface feels different in a way that hasn't yet been tested against the existing categories.
4. **Record the classification as an Architecture Decision Record** per Chapter 62, citing this section's procedure, so the next surface after it inherits a documented precedent rather than requiring the same reasoning to be redone from scratch.

A surface that cannot be classified by this procedure without inventing a genuinely new rendering or trust category is the one legitimate trigger for revisiting this chapter itself, per Chapter 64's Quality Governance Model — not a reason to bypass this chapter's diagram informally for the sake of shipping faster.

---

## 7. ENFORCEMENT & MEASUREMENT

Per IP2, this section states what is and is not yet mechanically checkable about this chapter's decisions.

- **The rendering-model assignment per surface** becomes mechanical once Chapter 38's rendering-strategy decision tree exists — a route's actual rendering configuration can be linted against its surface's declared posture, and a mismatch (a Marketing Site route accidentally requiring a live authenticated session) is a checkable build-time error, not merely a design intention.
- **The monorepo trust boundary** is partially mechanical today and fully mechanical once Part IX's dependency-graph tooling exists: an automated check can, in principle, flag any import that would cause Client Portal session data to be reachable from Marketing Site code, and the absence of that specific check is tracked as a Chapter 66 debt-register entry until it exists.
- **The surface-classification procedure (Section 6)** is a gate condition, not a numeric threshold, in the same sense several of Chapter 1's principles are: a proposed surface either has, or does not yet have, a filed Architecture Decision Record classifying it before implementation begins.

---

## 8. AI AGENT APPLICATION

An AI agent proposing a new route, page, or feature is required to state, as part of its own self-review per Chapter 32, which of the four named surfaces the work belongs to and which rendering posture from Section 4 it inherits — before writing implementation code, not as a retrospective justification. This is a direct application of Chapter 1's IP1 and IP5: a surface classification stated up front is both traceable and immediately checkable by a human or AI reviewer with no additional context, where a classification inferred only from the code itself requires the reviewer to reverse-engineer a decision that should have been explicit from the start.

An agent that cannot classify its own work against Section 6's procedure has surfaced one of two things: either the work does not yet have a clear home in this architecture and requires human input before proceeding, or this chapter's diagram has a genuine gap worth raising through Chapter 64's governance path. Neither case is resolved by proceeding with an unstated assumption about which surface the code belongs to.

---

## 9. DO

**Building the Client Portal's authentication check as a structural property of the surface, not a per-page decision.** Every route inside the Client Portal boundary requires an authenticated session by default, per Section 5 — a new page inside that boundary inherits the requirement automatically rather than needing it separately added and separately capable of being forgotten.

**Routing a new conversational feature through the same server-mediation boundary regardless of which surface's UI embeds it.** A conversational widget added to the Marketing Site and a conversational feature inside the Client Portal both terminate at the same trust boundary Section 4 establishes for Surface 3 — the boundary is a property of the conversation, not of whichever page happens to display it.

**Filing an Architecture Decision Record the first time a genuinely new kind of surface is proposed**, using Section 6's classification procedure explicitly, so the reasoning is available to the next proposal rather than re-derived from memory.

---

## 10. DON'T

**Building a marketing page that requires a live server round-trip for content that never changes per visitor.** This contradicts Section 4's static-first default for the Marketing Site without the specific justification Chapter 38 requires for the server-rendering exception, and it costs Part VII's performance budget and Part VIII's SEO standard for no offsetting benefit.

**Sharing session or account state between the Marketing Site and the Client Portal "for convenience," even inside a shared monorepo.** A monorepo shares code, per Section 5, not trust — treating the two as equivalent because they happen to live in the same repository is exactly the confusion this chapter's trust-boundary language exists to prevent.

**Inventing a new rendering category for a new surface before Section 6's procedure has confirmed the three existing postures are actually insufficient.** This is IP3 applied directly to this chapter's own subject matter — a fourth rendering posture is a permanent addition to every later chapter that has to account for it, and should be treated with the same scrutiny as any other unjustified new abstraction.

---

## 11. ANTI-PATTERNS

**Surface drift.** A feature quietly begins as a Marketing Site page and, over several incremental pull requests, accumulates authenticated, per-account behavior without ever being reclassified as Client Portal territory. This is dangerous because no single pull request looks like an architectural violation — each one is a small, locally reasonable addition — and the surface only becomes structurally wrong in aggregate, by which point its rendering posture, trust boundary, and performance budget are all mismatched to what it actually does. It is detected by periodically re-running Section 6's classification procedure against existing routes, not only against new ones. It is fixed by formally reclassifying the feature — including its rendering posture and trust boundary — rather than patching around the mismatch in place.

**Trust-boundary erosion through shared convenience code.** A utility function written for the Client Portal, which happens to have access to session data, gets imported into a Marketing Site route because it solves a similar-looking problem faster than writing a new function would. This is dangerous for the same structural reason Chapter 1's "silent floor erosion" anti-pattern is dangerous — it looks like ordinary code reuse, which this Constitution otherwise actively encourages per IP3, and only reveals itself as a trust-boundary violation when the specific function's dependencies are traced. It is detected by Part IX's dependency-boundary tooling once it exists, and in the interim, by treating any cross-surface import touching session or account data as requiring explicit review regardless of how small it looks. It is fixed by extracting the surface-agnostic portion of the utility into shared, trust-neutral code, and leaving the session-dependent portion where it structurally belongs.

**Architecting a fifth surface no one has committed to building.** A well-intentioned attempt to "future-proof" this chapter's diagram by adding speculative rendering postures or trust boundaries for a surface Master Vision Chapter 26's roadmap has not actually committed to. This is dangerous because it is IP3's violation dressed in architectural language, which makes it harder to catch than an ordinary premature dependency — it looks like diligence rather than speculation. It is detected by asking, for any proposed addition to this chapter, whether a specific, currently committed surface requires it; if the honest answer is "not yet," the addition waits. It is fixed by deferring the addition to the moment Section 6's procedure is actually invoked by a real, commissioned surface.

---

## 12. QUALITY ASSURANCE CHECKLIST

- [ ] Has the work been classified against exactly one of the four named surfaces, using Section 6's procedure, before implementation began? *(IP1, IP5)*
- [ ] Does the work's actual rendering behavior match its surface's declared posture from Section 4 — and if it diverges, is the divergence justified per Chapter 38, not merely convenient?
- [ ] Does any cross-surface code sharing stay within shared, trust-neutral code, per Section 5, without carrying session or account data across a trust boundary?
- [ ] If a genuinely new rendering or trust category seems necessary, has Section 6 step 3 (confirming the three existing postures are insufficient) actually been run, or only assumed? *(IP3)*
- [ ] Is there a filed Architecture Decision Record for this classification, per Chapter 62, that the next proposal can cite as precedent? *(IP1)*

---

## 13. CROSS REFERENCES

**Within this Constitution:** Chapter 1 (Implementation Principles) governs every decision in this chapter, specifically IP3, IP5, IP6, and IP7. Chapter 6 (Repository Structure Philosophy) takes Section 5's monorepo decision as its starting premise. Chapter 10 (Configuration & Environment Management) will fix the specific framework satisfying each surface's rendering posture. Chapter 21 (State Management Philosophy) and Chapter 38 (Rendering Strategy Standard) both build directly on Section 4. Chapter 23 (API Integration Philosophy) formalizes Section 4's AI-Native Conversational Layer trust boundary. Chapter 43 (Application Security Standard) and Chapter 45 (Dependency & Supply Chain Security) enforce Section 5's trust boundary at the code level. Chapter 62 (Architecture Decision Record Standard) is the required record-keeping mechanism for Section 6. Chapter 64 (Quality Governance Model) is the escalation path for a surface Section 6 cannot classify.

**Within the five documents above this Constitution:** Master Vision Chapter 19 (AI Personality Constitution), Chapter 25 (Full Brand Ecosystem, §25.1–§25.10), Chapter 26 (Future Expansion Roadmap); Design System Bible Chapter 22 (Tables & Data Grids); UX / Experience Blueprint Chapter 62 (Mobile App Experience Standard), Chapter 78 (Data-Dense Experience Doctrine), Chapter 82 (Client Portal Experience Standard).

---

## 14. FUTURE EXPANSION

**Possible future additions.** A fifth named surface is added to Section 3 only once Master Vision Chapter 26's roadmap converts a specific item — the reseller/channel surface, most plausibly — from an anticipated possibility into a commissioned project, following Section 6's classification procedure in full.

**Documented assumptions.** This chapter assumes all current and near-term-roadmap surfaces are owned and operated by Trady Perch directly. If a future partnership model (per Brand Identity Manual's partner-facing chapters) requires a surface that is co-branded or partially operated by a third party, this chapter's trust-boundary model — currently binary between "inside Trady Perch's trust domain" and "not" — would need explicit extension to a third category, which is flagged here as a known gap rather than pre-solved speculatively.

**Documented limitations.** The monorepo decision in Section 5 is calibrated for the current and near-term-roadmap scale of engineering activity, substantially AI-agent-driven per Chapter 4. Should engineering headcount or surface count grow enough that shared CI runtime or cross-team ownership friction becomes a measurable cost, this decision should be revisited via Chapter 62's ADR process using real, measured data — not reversed preemptively on the suspicion that it might eventually become a problem.

**Future research areas.** Whether the AI-Native Conversational Layer, as adoption grows, eventually warrants its own dedicated deployment and scaling profile distinct from whichever surface currently embeds it — a question this chapter leaves open, to be answered empirically by Chapter 65's continuous-improvement cadence rather than anticipated here without evidence.

---

*End of Chapter 2. The next chapter, The Translation Doctrine, is where IP1's traceability requirement becomes a checkable mechanism.*
