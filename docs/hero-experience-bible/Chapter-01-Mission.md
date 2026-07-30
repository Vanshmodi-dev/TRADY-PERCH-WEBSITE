# CHAPTER 1 — MISSION

**Trady Perch Hero Experience Bible · Part Zero: Front Matter**
*First-canonical-draft. Implementation-independent.*

**Inherited From:** Master Vision §1, §2.2, §2.3, §5.1, §5.4, §11.2, §13, Ch. 27.
**Governs:** Why the hero exists, what it is accountable for, who may change it.
**Does Not Govern:** Layout, components, copy, colour, code. This Bible never issues a pixel.

---

## 1. THE POSITION

Every other section of the homepage is read by someone who has already decided to keep reading. The hero is the only section read by someone who has not. Every downstream section inherits an audience the hero either earned or lost.

The Design System Bible says what gold is. The Motion Bible says how long a transition lasts. The UX Blueprint says where a section sits in a sequence. None says what the first fifteen seconds of a stranger's judgment should feel like. That is this Bible's jurisdiction.

> **The hero exists to convert a stranger's reflex judgment into a considered decision to keep reading — by demonstrating, in the first fifteen seconds and without any claim being believed, that this company is competent, composed, and worth a skeptical person's time.**

Four load-bearing clauses. **"Convert a stranger's reflex judgment"** — the first judgment is involuntary and has already happened before a word is read; the hero cannot prevent a snap judgment, only win one. **"Into a considered decision to keep reading"** — the conversion event is the scroll, not the click. **"Without any claim being believed"** — at second three nothing *asserted* is trusted; only what is *demonstrated* counts as evidence. **"Competent, composed, worth a skeptical person's time"** — in that order. Credibility is the currency, not delight.

---

## 2. CORE PRINCIPLES

**Ms-1 — The hero is accountable for a judgment, not a metric.** Success is the conclusion a visitor reaches, not any measurable interaction. Nobody signs an automation contract because a headline was clever; optimising a proximate metric reliably damages the judgment while improving the number. *Metrics are instruments, not the goal.*

**Ms-2 — The hero promises; the site pays.** It may only set an expectation the rest of the site satisfies. §2.3 ranks aesthetic polish last — "a hygiene factor, not a decision factor" — so a hero more sophisticated than the case studies beneath it reads as marketing outrunning substance. *A floor on everything else, not a ceiling on the hero.*

**Ms-3 — The hero has one idea.** Every other element supports it or is removed. Ch. 27 forbids more than one dominant idea per screen; working memory admits ~4 chunks, so three competing ideas deliver none. *One idea, not one element.*

**Ms-4 — The hero is evidence of how the company works.** Restraint, timing, typography, keyboard behaviour, behaviour on a bad connection — all read as a sample of how this company builds software. A visitor cannot audit competence in five minutes, so they substitute "does this behave like it was built by people who are careful." *The evidence is correctness under stress, not sophistication under ideal conditions.*

**Ms-5 — The hero is governed, not owned.** No individual has unilateral authority over its governing ideas; changes route through Chapter 32. The hero attracts more opinions per pixel than anything else, nearly all pushing the same way. *Exception: emergency correction of a factual, accessibility, or legal error ships immediately and is documented after.*

---

## 3. THE FIVE QUESTIONS THE HERO MUST SURVIVE

§11.2 lists the visitor's monologue across the homepage; only Q1 belongs to the hero. The other four are never articulated — and are answered first, so they weigh more.

| # | Question | Asked | Answered by | Failure signal |
|---|---|---|---|---|
| Q1 | *"What is this, in one sentence?"* | Consciously, ~T+3s | Claim + supporting line (Ch. 15, 18) | Scrolls, then scrolls back to re-read |
| Q2 | *"Is it for me?"* | Semi-consciously, ~T+5s | Specificity (Ch. 13) | Cannot tell if they are the audience |
| Q3 | *"Are these people serious?"* | Pre-consciously, ~T+0.4s | Restraint, craft, timing, material (Ch. 9, 10, 21, 24) | Reads as template, or as trying too hard |
| Q4 | *"Will this waste my time?"* | Pre-consciously, continuously | Density, absence of friction (Ch. 4, 29) | Skimming accelerates; cursor drifts to the tab bar |
| Q5 | *"What if I engage?"* | Consciously, ~T+10s | CTA label and implied cost (Ch. 27) | Hesitation on hover; CTA read twice, unclicked |

A hero that answers Q1 brilliantly and fails Q3 has failed.

---

## 4. JURISDICTION

```
              MASTER VISION DOCUMENT
            (authority of last resort)
                       │
 ┌──────────┬──────────┴────────┬─────────────┐
 DESIGN    MOTION        UX / EXPERIENCE    BRAND
 SYSTEM    BIBLE            BLUEPRINT      IDENTITY
 BIBLE   (how things     (where things      MANUAL
(what things  move)      sit in sequence)
 are made of)
 └──────────┴──────────┬────────┴─────────────┘
                       │
           HERO EXPERIENCE BIBLE  ◄── this document
          (why the first 15 seconds
           must feel a specific way)
                       │
        PRODUCT IMPLEMENTATION CONSTITUTION
               (how it gets built)
                       │
        Hero implementations, present and future
```

**Conflict order:** (1) Master Vision wins without exception. (2) Design System / Motion Bible win on *what a thing is* and *how long it takes*. (3) This Bible wins on *why*, *in what order*, *how it should feel*. (4) The Constitution wins on *how it is built and shipped*. If this Bible appears to require something the Design System Bible forbids, this Bible is wrong and must be amended.

**What this Bible is not.** Not a hero design — no layout, composition, or mock. Not a Figma file, component spec, or token list. Not a copy deck; every copy example is illustrative. Not optional — Chapter 34 is the acceptance standard. Not permanent — Chapter 32 defines how it changes.

---

## 5. ACCEPTANCE CRITERIA

- [ ] One written sentence names the hero's dominant idea; every element traces to it. *(Ms-3)*
- [ ] Every expectation the hero sets is paid off by a section below. *(Ms-2)*
- [ ] All five questions in §3 have a named answer. *(§3)*
- [ ] No decision is justified solely by a proximate metric. *(Ms-1)*
- [ ] Adverse-condition evaluation is recorded, not assumed. *(Ms-4)*
- [ ] Governing-idea changes have an amendment record. *(Ms-5)*

---

## 6. CROSS REFERENCES

Ch. 2 (the reasoning behind this mission) · Ch. 6 (the mission as time) · Ch. 14 (as a goal stack) · Ch. 32 (amendment) · Ch. 34 (enforcement). Master Vision §1, §2.2, §2.3, §5.1, §5.4, §11.2, §13, Ch. 27.

---

## 7. STATUS

Q3 and Q4 extend §11.2's monologue with pre-conscious questions the Master Vision does not name — this Bible's own inference, not validated against session data. No mission statement exists for the *company* anywhere in the source material; this chapter defines the mission of the *hero*, which is answerable, and no future chapter should attempt to supply the company's.

---

*End of Chapter 1. Chapter 2 argues the position this mission assumes: that in a category built on noise, the most persuasive move is to be quieter than everyone else.*
