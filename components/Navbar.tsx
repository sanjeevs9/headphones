"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Specs", href: "#specs" },
  { label: "Gallery", href: "#gallery" },
  { label: "Pre-order", href: "#pricing", isAccent: true },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > 100 && latest > previous) {
      setHidden(true);
      setMobileOpen(false);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "bg-[#08080a]/80 backdrop-blur-xl border-b border-[rgba(201,169,110,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div style={{ maxWidth: "80rem", marginLeft: "auto", marginRight: "auto", padding: "0 clamp(2rem, 6vw, 6rem)" }}>
          <div style={{ display: "flex", height: "4rem", alignItems: "center", justifyContent: "space-between" }}>
            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              className="flex items-center gap-0.5 text-xl tracking-tight"
              style={{
                fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 600,
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-[#c9a96e]">Wp</span>
              <span className="text-[#ede8e0]">Dev</span>
            </motion.a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    link.isAccent
                      ? "text-[#c9a96e] border border-[#c9a96e]/40 px-5 py-2 rounded-full hover:bg-[#c9a96e]/10 hover:border-[#dfc493]/60"
                      : "text-[#ede8e0]/50 hover:text-[#ede8e0]"
                  }`}
                  style={{
                    fontFamily: "var(--font-body), 'Outfit', sans-serif",
                    letterSpacing: link.isAccent ? "0.06em" : "0.02em",
                    textTransform: link.isAccent ? "uppercase" : "none",
                    fontSize: link.isAccent ? "0.75rem" : "0.875rem",
                  }}
                  whileHover={{ y: link.isAccent ? 0 : -1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Mobile hamburger */}
            <motion.button
              className="md:hidden flex flex-col gap-[5px] p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <motion.span
                className="block w-5 h-[1.5px] bg-[#ede8e0]"
                animate={{
                  rotate: mobileOpen ? 45 : 0,
                  y: mobileOpen ? 6.5 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-5 h-[1.5px] bg-[#ede8e0]"
                animate={{ opacity: mobileOpen ? 0 : 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="block w-5 h-[1.5px] bg-[#ede8e0]"
                animate={{
                  rotate: mobileOpen ? -45 : 0,
                  y: mobileOpen ? -6.5 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-[#12110f] border-l border-[rgba(201,169,110,0.08)] p-8 pt-24"
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
                    className={`text-xl font-medium ${
                      link.isAccent ? "text-[#c9a96e]" : "text-[#ede8e0]/80"
                    }`}
                    style={{
                      fontFamily: link.isAccent
                        ? "var(--font-display), 'Cormorant Garamond', serif"
                        : "var(--font-body), 'Outfit', sans-serif",
                      fontStyle: link.isAccent ? "italic" : "normal",
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
