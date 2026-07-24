# APPENDIX B — ENGINEERING GLOSSARY

**Trady Perch Product Implementation Constitution · Appendices**

*A living reference. First compiled at the close of this Constitution's authoring; updated whenever a new term of art enters the system, per the same discipline Design System Bible Appendix B already follows.*

---

**Anti-Pattern (F1–F5)** — One of Chapter 5's five named failure modes (Implicit Convention, Undocumented Exception, Copy-Pasted Logic, Dependency Added "Just in Case," Rationalization After the Fact), each with specific, indexed real-world instances catalogued in Chapter 67.

**Architecture Decision Record (ADR)** — A written record of a significant, hard-to-reverse decision, required per Chapter 62 §2's threshold, stored chronologically in `docs/adr/`, never edited after filing — only superseded by a new one.

**AI-Native Conversational Layer** — Chapter 2's Surface 3: any point where a visitor or client interacts with an AI agent acting on Trady Perch's behalf, held to a server-mediated trust boundary regardless of which surface's UI embeds it.

**Anatomy-to-Structure Mapping** — Chapter 11 §3's requirement that a component's internal code structure visibly mirror the anatomy its Design System Bible chapter documents.

**Blast Radius** — How many downstream chapters, apps, or packages a decision would affect if it turned out wrong; the basis for Chapter 64's Gov-4 approval scaling and Chapter 66's debt-prioritization model.

**Class A / B / C Integration** — Chapter 23 §3's three-tier external-dependency classification: Trady Perch-operated backend (A), third-party business service (B), AI model API (C) — each with escalating trust-boundary obligations.

**Client Portal** — Chapter 2's Surface 2: the authenticated, data-dense dashboard named in Master Vision §25.2, client-heavy rendered per Chapter 2 §4.

**Debt Register (Engineering)** — Chapter 66's living, prioritized record of every known deviation from this Constitution, distinct from Design System Bible's own Design Debt Register but built on the identical Dd-1/Dd-2/Dd-3 model.

**Delegation Matrix** — Chapter 29 §3's three-category classification of any task — full AI delegation, AI-drafted/human-decided, human-initiated/AI-executed — determined by Chapter 29 §2's three factors.

**Derivation Test** — Chapter 1 §4's five-step procedure for resolving any implementation question not already answered by a more specific chapter, directly descended from Design System Bible Chapter 1's identical procedure.

**Eight Canonical States** — Design System Bible Chapter 39's complete state model (hover, focus, active, disabled, loading, error, success, empty), wired into every component per Chapter 12 §4.

**Failure Mode (F1–F5)** — See Anti-Pattern.

**Foundational Package** — Chapter 7 §4's tier of shared code with no dependency on any other package in the repository (`tokens`, `motion`, `api-contracts`, `config`), distinct from a Composed package.

**Gate Sequence** — Chapter 49 §2's six ordered, blocking checks (static, unit/integration, budget, end-to-end, visual regression, review) every change passes through before merge.

**Handoff Record** — Chapter 33 §4's mandatory written artifact produced on any task interruption or multi-session pause, checked against the same reproducibility test as an original briefing.

**Implementation Principle (IP1–IP7)** — Chapter 1's seven foundational, constitution-wide principles: Traceable Translation, Machine-Checkable Truth, Restraint in Construction, Explicit Over Implicit, Self-Contained Context, Non-Negotiable Floors Are Not Variables, Reversibility Bias.

**Marketing Site** — Chapter 2's Surface 1: the public, unauthenticated website, static-first rendered per Chapter 2 §4.

**Non-Negotiable Floor** — Any standard IP6 forbids trading against convenience, restraint, or urgency — accessibility, security, and performance foremost among them, per Chapter 1 §7 and its parallels in Chapters 18, 35, and 42.

**Quality Gate** — See Gate Sequence.

**Reconciliation (AI-Output)** — Chapter 53's process for human review of already-self-reviewed AI work: mechanical findings trusted, judgment-dependent territories independently re-verified.

**Reversibility Bias** — IP7: where two options accomplish a comparable goal but differ in how expensive they are to undo, the more reversible option is the default.

**Self-Containment (IP5)** — The requirement that any chapter, task, or briefing be executable correctly by a reader with zero memory of any prior conversation, per Chapter 4's founding doctrine.

**Self-Review Report** — Chapter 32 §2's mandatory artifact an AI agent produces before presenting any task as complete, stating what was and wasn't verified.

**Severity Triage** — Chapter 59 §3's three-tier incident classification (critical, major, minor), determining the rollback-versus-fix-forward response per Chapter 59 §4.

**Significance Threshold** — Chapter 62 §2's test for whether a decision requires an ADR: hard to reverse, pattern-establishing, or explicitly named by another chapter.

**Staleness Contract** — Chapter 25 §3's explicit, declared duration after which a cached value is treated as stale (eligible for background refresh) or hard-expired (must be refetched before display).

**Ten-Year Test (Implementation)** — Chapter 68's closing standard: would an engineer or AI agent, a decade from now, with no memory of this conversation, correctly build and maintain this product from this Constitution alone.

**Three-Factor Classification** — Chapter 29 §2's test for AI task delegation: checkable acceptance criterion, bounded decision space, reversible cost of being wrong.

**Translation Ledger** — Chapter 3 §3's per-chapter record of every translation unit — origin, artifact, verification method — the mechanism preventing orphaned or duplicated implementations of an upstream decision.

**Translation Unit** — Chapter 3 §2's basic unit of traceability: one upstream decision mapped to exactly one downstream code artifact, valid only with a named origin, a named artifact, and a stated verification method.

**Trust Boundary** — The explicit line, drawn in Chapter 2 §5 and enforced throughout Part IX, across which application data, session state, and credentials never cross, regardless of how freely shared code crosses it.

**Why-Versus-What Test** — Chapter 60 §2's criterion for whether documentation is worth writing: does it explain a non-obvious *why*, or merely restate an obvious *what* the code already communicates.

---

*End of Appendix B.*
