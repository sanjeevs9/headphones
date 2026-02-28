"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Alex Chen",
    role: "Software Engineer",
    quote: "The gasket mount makes this board feel completely different from anything else I have typed on. The sound profile is deep, thocky, and incredibly satisfying. Worth every penny.",
  },
  {
    name: "Sarah Mitchell",
    role: "Content Creator",
    quote: "I have been through dozens of keyboards, and this is the one that finally made me stop looking. The build quality is on another level, and the hot-swap feature means I can experiment endlessly.",
  },
  {
    name: "James Park",
    role: "Product Designer",
    quote: "From the CNC aluminum case to the PBT keycaps, everything about this board screams premium. The typing experience is soft yet precise. This is endgame material.",
  },
];

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 200 : -200, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction < 0 ? 200 : -200, opacity: 0 }),
};

export default function TestimonialsClear() {
  const [[current, direction], setCurrent] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const paginate = useCallback((dir: number) => {
    setCurrent(([prev]) => [(prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length, dir]);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => paginate(1), 5000);
    return () => clearInterval(interval);
  }, [isPaused, paginate]);

  const testimonial = TESTIMONIALS[current];

  return (
    <section style={{ padding: "8rem clamp(2rem, 6vw, 6rem)", background: "#eae6df" }}>
      <div style={{ maxWidth: "56rem", margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <motion.div
          style={{ textAlign: "center", marginBottom: "4rem" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.55rem", fontWeight: 500, letterSpacing: "0.4em", textTransform: "uppercase" as const, color: "#c9a96e", marginBottom: "1.25rem" }}>
            Testimonials
          </div>
          <h2 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.2rem)", letterSpacing: "-0.03em", color: "#1a1816", margin: 0, textTransform: "uppercase" as const }}>
            What They <span style={{ color: "#c9a96e" }}>Say.</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div
          style={{ position: "relative", minHeight: 240 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.3 } }}
              style={{ textAlign: "center" }}
            >
              {/* Large opening quote */}
              <div style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "4rem", color: "#c9a96e", lineHeight: 1, marginBottom: "1rem", opacity: 0.4 }}>
                &ldquo;
              </div>

              <blockquote style={{ fontFamily: "var(--font-mono), monospace", fontSize: "clamp(0.8rem, 1.3vw, 1rem)", fontWeight: 300, lineHeight: 2, color: "#1a1816", maxWidth: "36em", margin: "0 auto 2rem", padding: 0, border: "none" }}>
                {testimonial.quote}
              </blockquote>

              <div style={{ width: 24, height: 1, background: "#c9a96e", margin: "0 auto 1.5rem" }} />

              <p style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 600, fontSize: "0.85rem", color: "#1a1816", margin: 0 }}>
                {testimonial.name}
              </p>
              <p style={{ fontFamily: "var(--font-mono), monospace", fontWeight: 300, fontSize: "0.6rem", color: "#a09890", marginTop: "0.25rem", letterSpacing: "0.1em", textTransform: "uppercase" as const }}>
                {testimonial.role}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", marginTop: "3rem" }}>
          <motion.button
            onClick={() => paginate(-1)}
            style={{ width: 36, height: 36, border: "1px solid rgba(10,10,10,0.1)", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#6b6560" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
          </motion.button>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent([i, i > current ? 1 : -1])}
                style={{ padding: 2, background: "transparent", border: "none", cursor: "pointer" }}
                aria-label={`Go to testimonial ${i + 1}`}
              >
                <motion.div
                  animate={{ width: i === current ? 24 : 6, height: 4, backgroundColor: i === current ? "#c9a96e" : "rgba(10,10,10,0.12)" }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            ))}
          </div>

          <motion.button
            onClick={() => paginate(1)}
            style={{ width: 36, height: 36, border: "1px solid rgba(10,10,10,0.1)", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#6b6560" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6" /></svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
