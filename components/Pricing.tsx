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

const checkVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        delay: 0.3 + i * 0.08,
        duration: 0.4,
        ease: "easeInOut" as const,
      },
      opacity: { delay: 0.3 + i * 0.08, duration: 0.2 },
    },
  }),
};

function AnimatedCheck({ index }: { index: number }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="flex-none"
    >
      <motion.path
        d="M5 12l5 5L19 7"
        stroke="#c9a96e"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={checkVariants}
        custom={index}
      />
    </svg>
  );
}

export default function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="relative" style={{ padding: "10rem clamp(2rem, 6vw, 6rem)" }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c9a96e]/[0.04] rounded-full blur-[150px]" />
      </div>

      <div style={{ maxWidth: "80rem", marginLeft: "auto", marginRight: "auto", position: "relative" }}>
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        >
          <p
            className="text-[#c9a96e] text-sm font-medium tracking-[0.2em] uppercase mb-4"
            style={{ fontFamily: "var(--font-body), 'Outfit', sans-serif" }}
          >
            Pre-Order
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#ede8e0]"
            style={{
              fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            Make It Yours
          </h2>
        </motion.div>

        {/* Pricing card */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 25,
            delay: 0.1,
          }}
          className="mx-auto max-w-2xl"
        >
          <div className="relative rounded-3xl overflow-hidden">
            {/* Animated gradient border */}
            <div
              className="absolute inset-0 rounded-3xl p-[1px]"
              style={{
                background: `conic-gradient(from var(--angle, 0deg), #c9a96e, #08080a, #c9a96e, #08080a, #c9a96e)`,
                animation: "gradient-border-spin 6s linear infinite",
              }}
            >
              <div className="w-full h-full rounded-3xl bg-[#12110f]" />
            </div>

            {/* Card content */}
            <div className="relative p-10 md:p-14">
              {/* Product name */}
              <div className="text-center mb-8">
                <p
                  className="text-sm text-[#8a8580] font-light tracking-wider uppercase mb-2"
                  style={{ fontFamily: "var(--font-body), 'Outfit', sans-serif" }}
                >
                  WpDev Keyboard
                </p>
                <div className="flex items-baseline justify-center gap-2">
                  <span
                    className="text-6xl md:text-7xl text-[#ede8e0] tracking-tight"
                    style={{
                      fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
                      fontWeight: 600,
                    }}
                  >
                    $299
                  </span>
                </div>
                <p
                  className="text-sm text-[#5a5550] mt-2 font-light"
                  style={{ fontFamily: "var(--font-body), 'Outfit', sans-serif" }}
                >
                  Ships Q2 2026 &middot; Free worldwide shipping
                </p>
              </div>

              {/* Divider */}
              <div className="h-[1px] bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.15)] to-transparent my-8" />

              {/* What is included */}
              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <p
                  className="text-xs text-[#8a8580] font-medium tracking-[0.2em] uppercase mb-6"
                  style={{ fontFamily: "var(--font-body), 'Outfit', sans-serif" }}
                >
                  What is included
                </p>
                <ul className="space-y-4">
                  {INCLUDED.map((item, i) => (
                    <motion.li
                      key={item}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
                    >
                      <AnimatedCheck index={i} />
                      <span
                        className="text-sm text-[#ede8e0]/70 font-light"
                        style={{ fontFamily: "var(--font-body), 'Outfit', sans-serif" }}
                      >
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* CTA button — gold border/text, not solid fill */}
              <motion.button
                className="mt-10 w-full py-4 rounded-xl border-2 border-[#c9a96e] text-[#c9a96e] font-semibold text-base tracking-wide cursor-pointer relative overflow-hidden group hover:bg-[#c9a96e]/10 transition-colors duration-300"
                style={{ fontFamily: "var(--font-body), 'Outfit', sans-serif" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <span className="relative z-10">Pre-Order Now</span>
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c9a96e]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </motion.button>

              <p
                className="text-center text-xs text-[#5a5550] mt-4 font-light"
                style={{ fontFamily: "var(--font-body), 'Outfit', sans-serif" }}
              >
                Secure checkout &middot; 30-day return policy
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
