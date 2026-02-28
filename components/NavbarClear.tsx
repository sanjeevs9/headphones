"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { useSequence, SEQUENCES } from "./SequenceContext";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Specs", href: "#specs" },
  { label: "Gallery", href: "#gallery" },
];

export default function NavbarClear() {
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [switchOpen, setSwitchOpen] = useState(false);
  const switchRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const { activeSequence, setActiveSequence } = useSequence();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > 100 && latest > previous) {
      setHidden(true);
      setMobileOpen(false);
      setSwitchOpen(false);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (switchRef.current && !switchRef.current.contains(e.target as Node)) {
        setSwitchOpen(false);
      }
    };
    if (switchOpen) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [switchOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "bg-[#f5f2ed]/80 backdrop-blur-xl border-b border-[rgba(10,10,10,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 clamp(2rem, 6vw, 6rem)" }}>
          <div style={{ display: "flex", height: "4rem", alignItems: "center", justifyContent: "space-between" }}>
            <motion.a
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.02em", textTransform: "uppercase" as const }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span style={{ color: "#c9a96e" }}>Wp</span>
              <span style={{ color: "#1a1816" }}>Dev</span>
            </motion.a>

            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                    fontSize: "0.75rem",
                    fontWeight: 400,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase" as const,
                    color: "#6b6560",
                    transition: "color 0.2s",
                  }}
                  className="hover:!text-[#1a1816]"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {link.label}
                </motion.a>
              ))}

              {/* Switch dropdown */}
              <div ref={switchRef} style={{ position: "relative" }}>
                <motion.button
                  onClick={() => setSwitchOpen(!switchOpen)}
                  style={{
                    fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase" as const,
                    color: "#1a1816",
                    background: "#c9a96e",
                    padding: "0.55rem 1.5rem",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  Switch
                  <motion.svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    animate={{ rotate: switchOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path d="M2 3.5L5 6.5L8 3.5" />
                  </motion.svg>
                </motion.button>

                <AnimatePresence>
                  {switchOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        position: "absolute",
                        top: "calc(100% + 0.5rem)",
                        right: 0,
                        background: "#1a1816",
                        border: "1px solid rgba(201,169,110,0.15)",
                        padding: "0.5rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.25rem",
                        minWidth: "10rem",
                        zIndex: 100,
                      }}
                    >
                      {SEQUENCES.map((seq) => (
                        <motion.button
                          key={seq.id}
                          onClick={() => {
                            setActiveSequence(seq);
                            setSwitchOpen(false);
                          }}
                          style={{
                            fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                            fontSize: "0.6rem",
                            fontWeight: activeSequence.id === seq.id ? 600 : 400,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase" as const,
                            color: activeSequence.id === seq.id ? "#c9a96e" : "rgba(234,230,223,0.5)",
                            background: activeSequence.id === seq.id ? "rgba(201,169,110,0.08)" : "transparent",
                            border: "none",
                            padding: "0.6rem 0.75rem",
                            cursor: "pointer",
                            textAlign: "left",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            transition: "color 0.15s, background 0.15s",
                          }}
                          whileHover={{
                            backgroundColor: "rgba(201,169,110,0.06)",
                            color: "#eae6df",
                          }}
                        >
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: activeSequence.id === seq.id ? "#c9a96e" : "rgba(234,230,223,0.15)",
                              flexShrink: 0,
                              transition: "background 0.15s",
                            }}
                          />
                          {seq.label}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <motion.button
              className="md:hidden flex flex-col gap-[5px] p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block w-5 h-[1.5px] bg-[#1a1816]"
                  animate={
                    i === 0 ? { rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6.5 : 0 } :
                    i === 1 ? { opacity: mobileOpen ? 0 : 1 } :
                    { rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6.5 : 0 }
                  }
                  transition={{ duration: 0.2 }}
                />
              ))}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-[#f5f2ed] border-l border-[rgba(10,10,10,0.06)] p-8 pt-24"
            >
              <div className="flex flex-col gap-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                    style={{
                      fontFamily: "var(--font-syne), 'Syne', sans-serif",
                      fontWeight: 600,
                      fontSize: "1.2rem",
                      color: "#1a1816",
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}

                {/* Mobile switch section */}
                <div style={{ borderTop: "1px solid rgba(10,10,10,0.08)", paddingTop: "1.5rem", marginTop: "0.5rem" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                      fontSize: "0.5rem",
                      fontWeight: 500,
                      letterSpacing: "0.3em",
                      textTransform: "uppercase" as const,
                      color: "#a09890",
                      marginBottom: "1rem",
                    }}
                  >
                    Switch Sequence
                  </div>
                  <div className="flex gap-2">
                    {SEQUENCES.map((seq) => (
                      <motion.button
                        key={seq.id}
                        onClick={() => {
                          setActiveSequence(seq);
                          setMobileOpen(false);
                        }}
                        style={{
                          fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                          fontSize: "0.7rem",
                          fontWeight: activeSequence.id === seq.id ? 600 : 400,
                          color: activeSequence.id === seq.id ? "#1a1816" : "#a09890",
                          background: activeSequence.id === seq.id ? "#c9a96e" : "transparent",
                          border: activeSequence.id === seq.id ? "none" : "1px solid rgba(10,10,10,0.1)",
                          padding: "0.5rem 0.85rem",
                          cursor: "pointer",
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {seq.id}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
