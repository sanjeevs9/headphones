"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const GALLERY_FRAMES = [
  { src: "/ezgif-split%20(1)/frame_010_delay-0.042s.png", label: "Top View" },
  { src: "/ezgif-split%20(1)/frame_040_delay-0.042s.png", label: "Exploded Layers" },
  { src: "/ezgif-split%20(1)/frame_070_delay-0.042s.png", label: "PCB Detail" },
  { src: "/ezgif-split%20(1)/frame_100_delay-0.042s.png", label: "Switch Plate" },
  { src: "/ezgif-split%20(1)/frame_130_delay-0.042s.png", label: "Assembly" },
  { src: "/ezgif-split%20(1)/frame_170_delay-0.042s.png", label: "Complete Build" },
];

export default function GalleryClear() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-25%"]);

  return (
    <section
      id="gallery"
      ref={containerRef}
      style={{ paddingTop: "8rem", paddingBottom: "8rem", overflow: "hidden", background: "#f5f2ed" }}
    >
      {/* Header */}
      <div style={{ padding: "0 clamp(2rem, 6vw, 6rem)", marginBottom: "4rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.55rem", fontWeight: 500, letterSpacing: "0.4em", textTransform: "uppercase" as const, color: "#c9a96e", marginBottom: "1.25rem" }}>
              Gallery
            </div>
            <h2 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.2rem)", letterSpacing: "-0.03em", color: "#1a1816", margin: 0, lineHeight: 1.1, textTransform: "uppercase" as const }}>
              Every <span style={{ color: "#c9a96e" }}>Angle.</span>
            </h2>
            <p style={{ fontFamily: "var(--font-mono), monospace", fontWeight: 300, fontSize: "0.75rem", color: "#6b6560", marginTop: "1rem", lineHeight: 1.8 }}>
              Explore the WpDev keyboard from every perspective.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Horizontal scroll strip */}
      <motion.div style={{ x, display: "flex", gap: "1.5rem", paddingLeft: "clamp(2rem, 6vw, 6rem)" }}>
        {GALLERY_FRAMES.map((frame, i) => (
          <motion.div
            key={frame.label}
            className="group"
            style={{ flexShrink: 0, width: "clamp(300px, 40vw, 500px)" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <div style={{ position: "relative", overflow: "hidden", border: "1px solid rgba(10,10,10,0.06)" }}>
              <img
                src={frame.src}
                alt={frame.label}
                style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block", transition: "transform 0.6s ease" }}
                className="group-hover:scale-105"
                loading="lazy"
                draggable={false}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.75rem" }}>
              <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.55rem", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#6b6560" }}>
                {frame.label}
              </span>
              <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.45rem", fontWeight: 300, letterSpacing: "0.2em", color: "#c9a96e" }}>
                0{i + 1}
              </span>
            </div>
          </motion.div>
        ))}
        <div style={{ flexShrink: 0, width: "4rem" }} />
      </motion.div>
    </section>
  );
}
