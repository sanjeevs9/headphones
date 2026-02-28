"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Alex Chen",
    role: "Software Engineer",
    quote:
      "The gasket mount makes this board feel completely different from anything else I have typed on. The sound profile is deep, thocky, and incredibly satisfying. Worth every penny.",
    rating: 5,
  },
  {
    name: "Sarah Mitchell",
    role: "Content Creator",
    quote:
      "I have been through dozens of keyboards, and this is the one that finally made me stop looking. The build quality is on another level, and the hot-swap feature means I can experiment endlessly.",
    rating: 5,
  },
  {
    name: "James Park",
    role: "Product Designer",
    quote:
      "From the CNC aluminum case to the PBT keycaps, everything about this board screams premium. The typing experience is soft yet precise. This is endgame material.",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < rating ? "#c9a96e" : "none"}
          stroke={i < rating ? "#c9a96e" : "#5a5550"}
          strokeWidth="1.5"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
};

export default function Testimonials() {
  const [[current, direction], setCurrent] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const paginate = useCallback(
    (dir: number) => {
      setCurrent(([prev]) => {
        const next = (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length;
        return [next, dir];
      });
    },
    []
  );

  // Auto-rotate
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => paginate(1), 5000);
    return () => clearInterval(interval);
  }, [isPaused, paginate]);

  const testimonial = TESTIMONIALS[current];

  return (
    <section className="relative" style={{ padding: "10rem clamp(2rem, 6vw, 6rem)" }}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.1)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.1)] to-transparent" />
      </div>

      <div style={{ maxWidth: "56rem", marginLeft: "auto", marginRight: "auto", position: "relative" }}>
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
            Testimonials
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#ede8e0]"
            style={{
              fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            What They Say
          </h2>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative min-h-[280px] md:min-h-[240px]"
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
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
              }}
              className="text-center"
            >
              {/* Stars */}
              <div className="flex justify-center mb-8">
                <StarRating rating={testimonial.rating} />
              </div>

              {/* Quote — serif italic for elegance */}
              <blockquote
                className="text-xl md:text-2xl text-[#ede8e0]/80 leading-relaxed mb-8 max-w-2xl mx-auto"
                style={{
                  fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 300,
                }}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div>
                <p
                  className="text-[#ede8e0] font-semibold"
                  style={{ fontFamily: "var(--font-body), 'Outfit', sans-serif" }}
                >
                  {testimonial.name}
                </p>
                <p
                  className="text-[#8a8580] text-sm font-light"
                  style={{ fontFamily: "var(--font-body), 'Outfit', sans-serif" }}
                >
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-12">
          {/* Previous */}
          <motion.button
            onClick={() => paginate(-1)}
            className="w-10 h-10 rounded-full border border-[rgba(201,169,110,0.15)] flex items-center justify-center text-[#8a8580] hover:text-[#ede8e0] hover:border-[#c9a96e]/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous testimonial"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </motion.button>

          {/* Dots */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent([i, i > current ? 1 : -1])}
                className="p-1"
                aria-label={`Go to testimonial ${i + 1}`}
              >
                <motion.div
                  className="rounded-full"
                  animate={{
                    width: i === current ? 24 : 6,
                    height: 6,
                    backgroundColor: i === current ? "#c9a96e" : "rgba(201,169,110,0.15)",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            ))}
          </div>

          {/* Next */}
          <motion.button
            onClick={() => paginate(1)}
            className="w-10 h-10 rounded-full border border-[rgba(201,169,110,0.15)] flex items-center justify-center text-[#8a8580] hover:text-[#ede8e0] hover:border-[#c9a96e]/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next testimonial"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
