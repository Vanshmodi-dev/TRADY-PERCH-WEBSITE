"use client";

import { useRef, useState } from "react";
import { Badge, Button } from "@trady-perch/ui";
import { ChatIcon } from "@/shared/components/icons";
import { SectionHeading } from "@/shared/components/section-heading";
import styles from "./interactive-ai-demo.module.css";

interface Choice {
  id: string;
  label: string;
}

interface MessageContent {
  from: "ai" | "user";
  text: string;
}

interface Message extends MessageContent {
  /** A monotonic id, not the message's index — the transcript only ever
   * grows, but relying on array position as a React key is still fragile
   * against a future edit (e.g. a "delete message" feature) that the
   * component's own logic can't rule out (Milestone 3 review). */
  id: number;
}

const INITIAL_MESSAGE: MessageContent = {
  from: "ai",
  text: "Hi — I'm the assistant that qualifies leads for this brokerage, day or night. What brings you here today?",
};

const INITIAL_CHOICES: Choice[] = [
  { id: "sell", label: "I'm looking to sell" },
  { id: "buy", label: "I'm looking to buy" },
  { id: "browse", label: "Just researching" },
];

const FOLLOW_UP: Record<string, { text: string; choices: Choice[] }> = {
  sell: {
    text: "Great — when are you hoping to have it listed?",
    choices: [
      { id: "soon", label: "Within 30 days" },
      { id: "later", label: "1–3 months" },
      { id: "exploring", label: "Just exploring value" },
    ],
  },
  buy: {
    text: "Got it — do you have a target area and budget in mind yet?",
    choices: [
      { id: "soon", label: "Yes, ready to look now" },
      { id: "later", label: "Getting close, not quite yet" },
      { id: "exploring", label: "Still figuring it out" },
    ],
  },
  browse: {
    text: "No problem — is there a specific area or price range you're keeping an eye on?",
    choices: [
      { id: "soon", label: "Yes, actively watching" },
      { id: "later", label: "Casually, for now" },
      { id: "exploring", label: "Not yet, just starting" },
    ],
  },
};

const CLOSING_MESSAGE: MessageContent = {
  from: "ai",
  text: "Perfect — based on that, I'm connecting you with an agent who specializes in exactly this. You'll hear from someone within the hour, not by end of week.",
};

/**
 * Master Vision Ch.13 item 10. This is a scripted, client-side simulation
 * — not a live backend AI integration. Building a real, safe, cost-bounded
 * production AI endpoint for anonymous website visitors is a real backend
 * undertaking outside a frontend homepage milestone's scope, and most
 * agency sites showing an "interactive demo" use exactly this kind of
 * illustrative simulation for cost/safety/reliability reasons. Labeled
 * honestly (the "Simulated demo" badge) rather than implied to be live,
 * per the AI Constitution's transparency requirement — Q8 ("can I
 * experience this before committing to a call") is answered truthfully,
 * not by pretending a scripted flow is a production system.
 */
export function InteractiveAiDemo() {
  const nextMessageId = useRef(0);
  function toMessage(content: MessageContent): Message {
    nextMessageId.current += 1;
    return { ...content, id: nextMessageId.current };
  }

  // Seeded directly with id 0 rather than via toMessage(): reading a ref's
  // .current inside a useState lazy initializer runs during render, which
  // react-hooks' `refs` rule correctly flags as unsafe — toMessage() is
  // only ever called from event handlers below, where ref access is safe.
  const [messages, setMessages] = useState<Message[]>(() => [{ ...INITIAL_MESSAGE, id: 0 }]);
  const [choices, setChoices] = useState<Choice[] | null>(INITIAL_CHOICES);
  const [step, setStep] = useState<0 | 1 | 2>(0);

  function handleChoice(choice: Choice) {
    const userMessage = toMessage({ from: "user", text: choice.label });

    if (step === 0) {
      const followUp = FOLLOW_UP[choice.id] ?? FOLLOW_UP.browse!;
      setMessages((prev) => [...prev, userMessage, toMessage({ from: "ai", text: followUp.text })]);
      setChoices(followUp.choices);
      setStep(1);
      return;
    }

    setMessages((prev) => [...prev, userMessage, toMessage(CLOSING_MESSAGE)]);
    setChoices(null);
    setStep(2);
  }

  function handleReset() {
    setMessages([toMessage(INITIAL_MESSAGE)]);
    setChoices(INITIAL_CHOICES);
    setStep(0);
  }

  return (
    <section className={styles.section} aria-labelledby="ai-demo-heading">
      <div className={styles.container}>
        <SectionHeading
          eyebrow="See it work"
          heading="Try the exact kind of agent we build."
          description="A simulated lead-qualification conversation, so you can see the logic before you ever book a call."
          headingId="ai-demo-heading"
          align="center"
        />
        <div className={styles.frame}>
          <div className={styles.frameHeader}>
            <ChatIcon className={styles.frameHeaderIcon} aria-hidden="true" />
            <span className={styles.frameHeaderLabel}>Lead-qualification agent</span>
            <Badge size="sm">Simulated demo</Badge>
          </div>
          <div className={styles.transcript} role="log" aria-live="polite" aria-label="Demo conversation">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.bubbleRow} ${message.from === "user" ? styles.user : styles.ai}`}
              >
                <p className={styles.bubble}>{message.text}</p>
              </div>
            ))}
          </div>
          {choices ? (
            <div className={styles.choices}>
              {choices.map((choice) => (
                <Button
                  key={choice.id}
                  emphasis="secondary"
                  size="sm"
                  onClick={() => handleChoice(choice)}
                >
                  {choice.label}
                </Button>
              ))}
            </div>
          ) : (
            <>
              <p className={styles.closingNote}>
                This is what happens automatically, day or night, for every lead — no one waiting for a
                free moment.
              </p>
              <div className={styles.resetRow}>
                <Button emphasis="ghost" size="sm" onClick={handleReset}>
                  Restart demo
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
