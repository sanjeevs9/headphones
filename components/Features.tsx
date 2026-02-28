"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Hot-Swappable Switches",
    description:
      "Swap switches without soldering. Supports 3-pin and 5-pin mechanical switches for infinite customization.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M3 15h18" />
        <path d="M9 3v18" />
        <path d="M15 3v18" />
      </svg>
    ),
    title: "Gasket Mount Design",
    description:
      "Silicone gaskets isolate the PCB from the case, delivering a softer, more consistent typing feel across every key.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "PBT Double-Shot Keycaps",
    description:
      "Premium PBT plastic with double-shot legends that never fade. Textured surface resists shine and fingerprints.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
    title: "Per-Key RGB Backlight",
    description:
      "16.8 million colors with per-key control. South-facing LEDs prevent interference with Cherry-profile keycaps.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 25,
    },
  },
};

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="features"
      className="relative"
      style={{ padding: "10rem clamp(2rem, 6vw, 6rem)" }}
    >
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            height: 800,
            background: "rgba(201,169,110,0.03)",
            borderRadius: "50%",
            filter: "blur(120px)",
          }}
        />
      </div>

      <div style={{ maxWidth: "80rem", marginLeft: "auto", marginRight: "auto", position: "relative" }}>
        {/* Section header */}
        <motion.div
          className="text-center"
          style={{ marginBottom: "5rem" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        >
          <motion.p
            className="text-[#c9a96e] text-sm font-medium tracking-[0.2em] uppercase mb-4"
            style={{ fontFamily: "var(--font-body), 'Outfit', sans-serif" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Crafted with Purpose
          </motion.p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#ede8e0]"
            style={{
              fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            Every Detail Matters
          </h2>
          <p
            className="mt-4 text-lg text-[#8a8580] max-w-xl mx-auto font-light"
            style={{ fontFamily: "var(--font-body), 'Outfit', sans-serif" }}
          >
            Four pillars of engineering that define the WpDev typing experience.
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}
        >
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 25 },
              }}
              className="group relative p-8 rounded-2xl bg-[#1a1816] border border-[rgba(201,169,110,0.12)] hover:border-[#c9a96e]/30 transition-colors duration-500"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#c9a96e]/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative">
                <div className="text-[#c9a96e] mb-6 transition-transform duration-300 group-hover:scale-110 inline-block">
                  {feature.icon}
                </div>
                <h3
                  className="text-lg font-semibold text-[#ede8e0] mb-3 tracking-tight"
                  style={{ fontFamily: "var(--font-body), 'Outfit', sans-serif" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm text-[#8a8580] leading-relaxed font-light"
                  style={{ fontFamily: "var(--font-body), 'Outfit', sans-serif" }}
                >
                  {feature.description}
                </p>
              </div>

              {/* Subtle index number — serif italic */}
              <div
                className="absolute top-6 right-6 text-[#ede8e0]/10"
                style={{
                  fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "1rem",
                  fontWeight: 400,
                }}
              >
                0{i + 1}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
