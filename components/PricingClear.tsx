"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const INCLUDED = [
  "WpDev 75% Keyboard",
  "USB-C braided cable",
  "2.4GHz wireless dongle",
  "Switch puller & keycap puller",
  "Extra gaskets and stabilizers",
  "Carrying case",
  "1-year warranty",
];

export default function PricingClear() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" style={{ padding: "8rem clamp(2rem, 6vw, 6rem)", background: "#f5f2ed" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          style={{ textAlign: "center", marginBottom: "4rem" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.55rem", fontWeight: 500, letterSpacing: "0.4em", textTransform: "uppercase" as const, color: "#c9a96e", marginBottom: "1.25rem" }}>
            Pre-Order
          </div>
          <h2 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.2rem)", letterSpacing: "-0.03em", color: "#1a1816", margin: 0, textTransform: "uppercase" as const }}>
            Make It <span style={{ color: "#c9a96e" }}>Yours.</span>
          </h2>
        </motion.div>

        {/* Pricing card */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 150, damping: 25, delay: 0.1 }}
          style={{ maxWidth: "36rem", margin: "0 auto" }}
        >
          <div style={{ border: "1px solid rgba(10,10,10,0.08)", padding: "clamp(2.5rem, 5vw, 4rem)", background: "#ffffff" }}>
            {/* Price */}
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.55rem", fontWeight: 400, color: "#a09890", letterSpacing: "0.15em", textTransform: "uppercase" as const, marginBottom: "0.75rem" }}>
                WpDev Keyboard
              </div>
              <div style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 800, fontSize: "clamp(3rem, 8vw, 4.5rem)", color: "#1a1816", letterSpacing: "-0.03em", lineHeight: 1 }}>
                $299
              </div>
              <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", fontWeight: 300, color: "#a09890", marginTop: "0.5rem", letterSpacing: "0.05em" }}>
                Ships Q2 2026 &middot; Free worldwide shipping
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(10,10,10,0.06)", margin: "0 0 2.5rem" }} />

            {/* Included list */}
            <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.5rem", fontWeight: 500, letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "#a09890", marginBottom: "1.5rem" }}>
              What&apos;s included
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
              {INCLUDED.map((item, i) => (
                <motion.li
                  key={item}
                  style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l5 5L19 7" stroke="#c9a96e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.75rem", fontWeight: 300, color: "#1a1816" }}>
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            <motion.button
              style={{
                marginTop: "2.5rem",
                width: "100%",
                padding: "1rem",
                border: "none",
                background: "#c9a96e",
                color: "#ffffff",
                fontFamily: "var(--font-mono), monospace",
                fontSize: "0.65rem",
                fontWeight: 500,
                letterSpacing: "0.25em",
                textTransform: "uppercase" as const,
                cursor: "pointer",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Pre-Order Now
            </motion.button>

            <div style={{ textAlign: "center", fontFamily: "var(--font-mono), monospace", fontSize: "0.55rem", fontWeight: 300, color: "#a09890", marginTop: "1rem", letterSpacing: "0.05em" }}>
              Secure checkout &middot; 30-day return policy
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
