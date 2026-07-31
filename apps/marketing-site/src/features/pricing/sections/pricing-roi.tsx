"use client";

import { useMemo, useState } from "react";
import { ROI_COPY, ROI_INPUTS, type RoiInputId } from "../pricing-config";
import {
  calculateRoi,
  formatCount,
  formatDecimal,
  formatRupees,
  type RoiInputs,
} from "../pricing-format";
import { AnimatedNumber } from "../components/animated-number";
import styles from "./pricing-roi.module.css";

/**
 * `Object.fromEntries` over ROI_INPUTS would produce a `{[k: string]: number}`
 * that only an unchecked cast could turn into RoiInputs — which would then
 * silently accept a config missing a slider. Reading each field by name keeps
 * the two shapes provably in step: dropping a slider from ROI_INPUTS becomes a
 * loud error here instead of an `undefined` reaching the arithmetic.
 */
function readDefault(id: RoiInputId): number {
  const config = ROI_INPUTS.find((input) => input.id === id);
  if (!config) throw new Error(`ROI_INPUTS has no config for "${id}"`);
  return config.defaultValue;
}

const DEFAULTS: RoiInputs = {
  employees: readDefault("employees"),
  hoursPerWeek: readDefault("hoursPerWeek"),
  hourlyCost: readDefault("hourlyCost"),
  repetitiveShare: readDefault("repetitiveShare"),
  automationShare: readDefault("automationShare"),
};

interface Tile {
  id: string;
  label: string;
  value: number;
  format: (value: number) => string;
  /** The featured tile — one per group, per Ch.7's single-emphasis rule. */
  emphasis?: boolean;
  caption: string;
}

/**
 * Entirely client-side: no request is made, nothing is persisted, and no value
 * leaves the page. That is stated in the visible copy rather than left implied,
 * because a calculator asking for headcount and salary reads as lead capture
 * unless it says otherwise.
 *
 * This is the only client component on the route. Every other section is a
 * server component, so the interactive JavaScript this page ships is bounded
 * by this file and `AnimatedNumber`.
 */
export function PricingRoi() {
  const [inputs, setInputs] = useState<RoiInputs>(DEFAULTS);

  const result = useMemo(() => calculateRoi(inputs), [inputs]);

  const setInput = (id: RoiInputId, value: number) =>
    setInputs((current) => ({ ...current, [id]: value }));

  const tiles: Tile[] = [
    {
      id: "hours",
      label: "Hours saved each week",
      value: result.hoursSavedPerWeek,
      format: (v) => formatCount(v),
      caption: "Across the whole team.",
    },
    {
      id: "monthly",
      label: "Monthly saving",
      value: result.monthlySavings,
      format: formatRupees,
      caption: "At the hourly cost you entered.",
    },
    {
      id: "yearly",
      label: "Yearly saving",
      value: result.yearlySavings,
      format: formatRupees,
      emphasis: true,
      caption: "Recovered cost over twelve months.",
    },
    {
      id: "fte",
      label: "Capacity reclaimed",
      value: result.fullTimeEquivalents,
      format: (v) => `${formatDecimal(v)} FTE`,
      caption: "Full-time people freed for higher-value work.",
    },
  ];

  return (
    <section className={styles.section} aria-labelledby="pricing-roi-heading">
      <div className={styles.container}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>{ROI_COPY.eyebrow}</p>
          <h2 id="pricing-roi-heading" className={styles.heading}>
            {ROI_COPY.heading}
          </h2>
          <p className={styles.description}>{ROI_COPY.description}</p>
        </div>

        <div className={styles.panel}>
          <div className={styles.controls}>
            {ROI_INPUTS.map((input) => {
              const value = inputs[input.id];
              const readout = input.currency
                ? `${formatRupees(value)} ${input.unit}`
                : `${formatCount(value)}${input.unit === "%" ? "%" : ` ${input.unit}`}`;

              return (
                <div key={input.id} className={styles.control}>
                  <div className={styles.controlHead}>
                    <label className={styles.controlLabel} htmlFor={`roi-${input.id}`}>
                      {input.label}
                    </label>
                    <output className={styles.controlValue} htmlFor={`roi-${input.id}`}>
                      {readout}
                    </output>
                  </div>
                  <input
                    id={`roi-${input.id}`}
                    className={styles.slider}
                    /* The track's filled portion. A native range gives no
                       pseudo-class for "left of the thumb", so the proportion
                       is handed to CSS as a custom property and painted as a
                       hard-stop gradient. */
                    style={
                      {
                        "--fill": `${((value - input.min) / (input.max - input.min)) * 100}%`,
                      } as React.CSSProperties
                    }
                    type="range"
                    min={input.min}
                    max={input.max}
                    step={input.step}
                    value={value}
                    aria-describedby={`roi-${input.id}-hint`}
                    /* The visible <output> shows a formatted string; the raw
                       number a slider announces by default ("600") would be
                       ambiguous between rupees, hours, and percent. */
                    aria-valuetext={readout}
                    onChange={(event) => setInput(input.id, Number(event.target.value))}
                  />
                  <p id={`roi-${input.id}-hint`} className={styles.controlHint}>
                    {input.hint}
                  </p>
                </div>
              );
            })}
          </div>

          <div className={styles.results}>
            {/*
              Deliberately NOT a live region. Each tile's number is animated by
              AnimatedNumber, which re-renders it on every frame of a 300ms
              count-up — an aria-live wrapper here would queue dozens of
              announcements per slider nudge and make the calculator unusable
              with a screen reader.

              The settled result is announced once instead, from the sr-only
              status region below, which reads the un-animated values and
              therefore updates exactly once per input change.
            */}
            <ul className={styles.tiles}>
              {tiles.map((tile) => (
                <li
                  key={tile.id}
                  className={`${styles.tile} ${tile.emphasis ? styles.tileEmphasis : ""}`}
                >
                  <p className={styles.tileLabel}>{tile.label}</p>
                  <p className={styles.tileValue}>
                    <AnimatedNumber value={tile.value} format={tile.format} />
                  </p>
                  <p className={styles.tileCaption}>{tile.caption}</p>
                </li>
              ))}
            </ul>

            <p className={styles.srOnly} role="status">
              {`${formatCount(result.hoursSavedPerWeek)} hours saved each week, ` +
                `${formatRupees(result.monthlySavings)} per month, ` +
                `${formatRupees(result.yearlySavings)} per year, ` +
                `${formatDecimal(result.fullTimeEquivalents)} full-time equivalents reclaimed.`}
            </p>

            <p className={styles.disclaimer}>{ROI_COPY.disclaimer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
