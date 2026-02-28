"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FEATURES = [
  {
    title: "Hot-Swappable Switches",
    description: "Swap switches without soldering. Supports 3-pin and 5-pin mechanical switches for infinite customization.",
  },
  {
    title: "Gasket Mount Design",
    description: "Silicone gaskets isolate the PCB from the case, delivering a softer, more consistent typing feel across every key.",
  },
  {
    title: "PBT Double-Shot Keycaps",
    description: "Premium PBT plastic with double-shot legends that never fade. Textured surface resists shine and fingerprints.",
  },
  {
    title: "Per-Key RGB Backlight",
    description: "16.8 million colors with per-key control. South-facing LEDs prevent interference with Cherry-profile keycaps.",
  },
];

export default function FeaturesClear() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="features"
      style={{ padding: "8rem clamp(2rem, 6vw, 6rem)", background: "#f5f2ed" }}
    >
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
        {/* Header — left-aligned, editorial */}
        <motion.div
          style={{ marginBottom: "5rem", maxWidth: "32em" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        >
          <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.55rem", fontWeight: 500, letterSpacing: "0.4em", textTransform: "uppercase" as const, color: "#c9a96e", marginBottom: "1.25rem" }}>
            Crafted with Purpose
          </div>
          <h2 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.2rem)", letterSpacing: "-0.03em", color: "#1a1816", margin: 0, lineHeight: 1.1, textTransform: "uppercase" as const }}>
            Every Detail
            <br />
            <span style={{ color: "#c9a96e" }}>Matters.</span>
          </h2>
          <div style={{ width: 40, height: 2, background: "#c9a96e", marginTop: "1.5rem" }} />
        </motion.div>

        {/* Feature rows */}
        <div ref={ref}>
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "clamp(1.5rem, 4vw, 4rem)",
                alignItems: "start",
                padding: "2.5rem 0",
                borderBottom: "1px solid rgba(10,10,10,0.06)",
              }}
            >
              {/* Number */}
              <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.5rem", fontWeight: 400, letterSpacing: "0.2em", color: "#c9a96e", paddingTop: "0.25rem" }}>
                0{i + 1}
              </div>

              {/* Content */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "1rem 3rem", alignItems: "start" }}>
                <h3 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 600, fontSize: "1.1rem", letterSpacing: "-0.01em", color: "#1a1816", margin: 0 }}>
                  {feature.title}
                </h3>
                <p style={{ fontFamily: "var(--font-mono), monospace", fontWeight: 300, fontSize: "0.75rem", lineHeight: 1.8, color: "#6b6560", margin: 0 }}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
