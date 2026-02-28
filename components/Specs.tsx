"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Animated counter                                                   */
/* ------------------------------------------------------------------ */
function AnimatedNumber({
  target,
  suffix = "",
  prefix = "",
  duration = 1.5,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {current}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Spec items                                                         */
/* ------------------------------------------------------------------ */
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

export default function Specs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="specs"
      ref={sectionRef}
      className="relative"
      style={{ padding: "10rem clamp(2rem, 6vw, 6rem)" }}
    >
      <div style={{ maxWidth: "80rem", marginLeft: "auto", marginRight: "auto" }}>
        {/* Section header */}
        <motion.div
          className="text-center"
          style={{ marginBottom: "5rem" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        >
          <p
            className="text-[#c9a96e] text-sm font-medium tracking-[0.2em] uppercase mb-4"
            style={{ fontFamily: "var(--font-body), 'Outfit', sans-serif" }}
          >
            Technical Specifications
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#ede8e0]"
            style={{
              fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            Numbers Speak
          </h2>
        </motion.div>

        {/* Animated stat counters */}
        <motion.div
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", marginBottom: "6rem" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          {SPECS.map((spec, i) => (
            <motion.div
              key={spec.label}
              className="text-center p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div
                className="text-4xl md:text-5xl lg:text-6xl text-[#ede8e0] tracking-tight mb-2"
                style={{
                  fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
                  fontWeight: 600,
                }}
              >
                <AnimatedNumber target={spec.value} suffix={spec.suffix} />
              </div>
              <div
                className="text-sm text-[#c9a96e] font-medium tracking-wide uppercase"
                style={{ fontFamily: "var(--font-body), 'Outfit', sans-serif" }}
              >
                {spec.label}
              </div>
              <div
                className="text-xs text-[#5a5550] mt-1 font-light"
                style={{ fontFamily: "var(--font-body), 'Outfit', sans-serif" }}
              >
                {spec.description}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Split layout: Image + Specs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: "4rem", alignItems: "center" }}>
          {/* Left: Image with parallax */}
          <motion.div
            style={{ y: imageY }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden bg-[#12110f] border border-[rgba(201,169,110,0.12)]">
              <img
                src="/ezgif-split/frame_090_delay-0.043s.png"
                alt="WpDev Keyboard detail"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080a]/60 to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-6 -right-4 lg:-right-8 bg-[#c9a96e] text-[#08080a] px-6 py-3 rounded-xl shadow-2xl shadow-[#c9a96e]/20"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            >
              <div
                className="text-xs font-medium tracking-wide uppercase"
                style={{ fontFamily: "var(--font-body), 'Outfit', sans-serif" }}
              >
                CNC Aluminum
              </div>
              <div
                className="text-lg"
                style={{
                  fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
                  fontWeight: 700,
                }}
              >
                980g
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Spec details */}
          <motion.div style={{ y: textY }}>
            <motion.h3
              className="text-2xl md:text-3xl text-[#ede8e0] mb-8 tracking-tight"
              style={{
                fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 400,
              }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Built without compromise.
            </motion.h3>

            <div className="space-y-0">
              {DETAIL_SPECS.map((spec, i) => (
                <motion.div
                  key={spec.label}
                  className="flex justify-between items-center py-4 border-b border-[rgba(201,169,110,0.08)]"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <span
                    className="text-sm text-[#5a5550] font-light"
                    style={{ fontFamily: "var(--font-body), 'Outfit', sans-serif" }}
                  >
                    {spec.label}
                  </span>
                  <span
                    className="text-sm text-[#ede8e0] font-medium text-right"
                    style={{ fontFamily: "var(--font-body), 'Outfit', sans-serif" }}
                  >
                    {spec.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
