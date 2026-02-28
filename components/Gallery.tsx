"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const GALLERY_FRAMES = [
  { src: "/ezgif-split/frame_010_delay-0.043s.png", label: "Top View" },
  { src: "/ezgif-split/frame_045_delay-0.043s.png", label: "Exploded Layers" },
  { src: "/ezgif-split/frame_075_delay-0.043s.png", label: "PCB Detail" },
  { src: "/ezgif-split/frame_110_delay-0.043s.png", label: "Switch Plate" },
  { src: "/ezgif-split/frame_140_delay-0.043s.png", label: "Assembly" },
  { src: "/ezgif-split/frame_175_delay-0.043s.png", label: "Complete Build" },
];

export default function Gallery() {
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
      className="relative"
      style={{ paddingTop: "10rem", paddingBottom: "10rem", overflow: "hidden" }}
    >
      {/* Section header */}
      <div style={{ padding: "0 clamp(2rem, 6vw, 6rem)", marginBottom: "4rem" }}>
        <div style={{ maxWidth: "80rem", marginLeft: "auto", marginRight: "auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          >
            <p
              className="text-[#c9a96e] text-sm font-medium tracking-[0.2em] uppercase mb-4"
              style={{ fontFamily: "var(--font-body), 'Outfit', sans-serif" }}
            >
              Gallery
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#ede8e0]"
              style={{
                fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              Every Angle
            </h2>
            <p
              className="mt-4 text-lg text-[#8a8580] max-w-xl font-light"
              style={{ fontFamily: "var(--font-body), 'Outfit', sans-serif" }}
            >
              Explore the WpDev keyboard from every perspective. Drag or scroll to browse.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Horizontal scrolling gallery */}
      <motion.div
        style={{ x, display: "flex", gap: "2rem", paddingLeft: "clamp(2rem, 6vw, 6rem)" }}
      >
        {GALLERY_FRAMES.map((frame, i) => (
          <motion.div
            key={frame.label}
            className="group relative flex-none w-[340px] md:w-[460px] lg:w-[540px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <div className="relative rounded-2xl overflow-hidden bg-[#12110f] border border-[rgba(201,169,110,0.12)] group-hover:border-[#c9a96e]/20 transition-colors duration-500">
              <motion.div
                className="overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <img
                  src={frame.src}
                  alt={frame.label}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  draggable={false}
                />
              </motion.div>

              {/* Overlay gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Label on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p
                  className="text-xs text-[#c9a96e] font-medium tracking-[0.15em] uppercase mb-1"
                  style={{ fontFamily: "var(--font-body), 'Outfit', sans-serif" }}
                >
                  View {String(i + 1).padStart(2, "0")}
                </p>
                <p
                  className="text-lg text-[#ede8e0] tracking-tight"
                  style={{
                    fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
                    fontStyle: "italic",
                    fontWeight: 500,
                  }}
                >
                  {frame.label}
                </p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Spacer at end */}
        <div className="flex-none w-16" />
      </motion.div>

      {/* Scroll hint */}
      <div style={{ padding: "0 clamp(2rem, 6vw, 6rem)", marginTop: "3rem" }}>
        <div style={{ maxWidth: "80rem", marginLeft: "auto", marginRight: "auto" }}>
          <motion.div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#5a5550" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="h-[1px] w-8 bg-[#5a5550]" />
            <span
              className="text-xs tracking-wider uppercase font-light"
              style={{ fontFamily: "var(--font-body), 'Outfit', sans-serif" }}
            >
              Scroll to explore
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
