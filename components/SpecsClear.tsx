"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    let rafId: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 1500, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, target]);

  return <span ref={ref}>{current}{suffix}</span>;
}

const SPECS = [
  { label: "Layout", value: 75, suffix: "%", description: "Compact form factor" },
  { label: "Keys", value: 67, suffix: "", description: "Optimized key count" },
  { label: "Response", value: 1, suffix: "ms", description: "Polling rate" },
  { label: "Battery", value: 4000, suffix: "mAh", description: "Wireless endurance" },
];

const DETAIL_SPECS = [
  { label: "Switch Type", value: "Mechanical (Hot-swap)" },
  { label: "Keycap Material", value: "PBT Double-shot" },
  { label: "Mounting Style", value: "Gasket Mount" },
  { label: "Connection", value: "USB-C / Bluetooth 5.1 / 2.4GHz" },
  { label: "Backlight", value: "Per-key RGB, South-facing" },
  { label: "Case Material", value: "CNC Aluminum" },
  { label: "Weight", value: "980g" },
  { label: "Dimensions", value: "325 x 140 x 32mm" },
];

export default function SpecsClear() {
  return (
    <section id="specs" style={{ padding: "8rem clamp(2rem, 6vw, 6rem)", background: "#eae6df" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
        {/* Header — right-aligned to alternate with features */}
        <motion.div
          style={{ marginBottom: "5rem", textAlign: "right" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.55rem", fontWeight: 500, letterSpacing: "0.4em", textTransform: "uppercase" as const, color: "#c9a96e", marginBottom: "1.25rem" }}>
            Technical Specifications
          </div>
          <h2 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.2rem)", letterSpacing: "-0.03em", color: "#1a1816", margin: 0, lineHeight: 1.1, textTransform: "uppercase" as const }}>
            Numbers <span style={{ color: "#c9a96e" }}>Speak.</span>
          </h2>
          <div style={{ width: 40, height: 2, background: "#c9a96e", marginTop: "1.5rem", marginLeft: "auto" }} />
        </motion.div>

        {/* Stat counters */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "2rem", marginBottom: "5rem" }}>
          {SPECS.map((spec, i) => (
            <motion.div
              key={spec.label}
              style={{ textAlign: "center", padding: "2rem 1rem" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 3.5rem)", color: "#1a1816", letterSpacing: "-0.03em", lineHeight: 1 }}>
                <AnimatedNumber target={spec.value} suffix={spec.suffix} />
              </div>
              <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.5rem", fontWeight: 500, letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "#c9a96e", marginTop: "0.75rem" }}>
                {spec.label}
              </div>
              <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.6rem", fontWeight: 300, color: "#a09890", marginTop: "0.25rem" }}>
                {spec.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detail spec table */}
        <motion.div
          style={{ maxWidth: "48rem", margin: "0 auto" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          {DETAIL_SPECS.map((spec, i) => (
            <motion.div
              key={spec.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1.1rem 0",
                borderBottom: "1px solid rgba(10,10,10,0.06)",
              }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.7rem", fontWeight: 300, color: "#a09890", letterSpacing: "0.05em", textTransform: "uppercase" as const }}>
                {spec.label}
              </span>
              <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.7rem", fontWeight: 500, color: "#1a1816", textAlign: "right" }}>
                {spec.value}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
