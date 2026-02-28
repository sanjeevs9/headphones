"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const FOOTER_LINKS = {
  Product: ["Features", "Specifications", "Gallery", "Pre-Order"],
  Support: ["Contact", "Shipping", "Returns", "FAQ"],
  Company: ["About", "Blog", "Careers", "Press"],
};

const SOCIAL_ICONS = [
  { name: "Twitter", path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
  { name: "Instagram", path: "M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 11a3 3 0 110-6 3 3 0 010 6zm4.5-7.5a1 1 0 110-2 1 1 0 010 2z" },
  { name: "Discord", path: "M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 00-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 00-5.487 0 12.36 12.36 0 00-.617-1.23A.077.077 0 008.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 00-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 00.031.055 20.03 20.03 0 005.993 2.98.078.078 0 00.084-.026c.462-.62.874-1.275 1.226-1.963a.074.074 0 00-.041-.104 13.201 13.201 0 01-1.872-.878.075.075 0 01-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 01.078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 01.079.009c.12.098.245.195.372.288a.075.075 0 01-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 00-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 00.084.028 19.963 19.963 0 006.002-2.981.076.076 0 00.032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 00-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" },
];

export default function FooterClear() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) { setSubscribed(true); setEmail(""); }
  };

  return (
    <footer style={{ borderTop: "1px solid rgba(10,10,10,0.06)", padding: "5rem clamp(2rem, 6vw, 6rem) 2.5rem", background: "#1a1816" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "4rem" }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.02em", textTransform: "uppercase" as const, marginBottom: "1rem" }}>
              <span style={{ color: "#c9a96e" }}>Wp</span>
              <span style={{ color: "#eae6df" }}>Dev</span>
            </div>
            <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.7rem", fontWeight: 300, lineHeight: 1.9, color: "rgba(234,230,223,0.4)", maxWidth: "20em", marginBottom: "2rem" }}>
              Premium mechanical keyboards engineered for those who demand excellence in every keystroke.
            </p>

            {/* Newsletter */}
            <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.45rem", fontWeight: 500, letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "rgba(234,230,223,0.25)", marginBottom: "0.75rem" }}>
              Stay in the loop
            </div>
            {subscribed ? (
              <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.7rem", color: "#c9a96e" }}>Thank you for subscribing.</p>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{
                    flex: 1,
                    background: "rgba(234,230,223,0.05)",
                    border: "1px solid rgba(234,230,223,0.1)",
                    padding: "0.6rem 1rem",
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "0.7rem",
                    color: "#eae6df",
                    outline: "none",
                  }}
                />
                <motion.button
                  type="submit"
                  style={{
                    border: "1px solid rgba(201,169,110,0.4)",
                    background: "transparent",
                    color: "#c9a96e",
                    padding: "0.6rem 1.25rem",
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "0.6rem",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase" as const,
                    cursor: "pointer",
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Subscribe
                </motion.button>
              </form>
            )}
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.45rem", fontWeight: 500, letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "rgba(234,230,223,0.25)", marginBottom: "1.25rem" }}>
                {category}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.7rem", fontWeight: 300, color: "rgba(234,230,223,0.4)", textDecoration: "none", transition: "color 0.2s" }} className="hover:!text-[#eae6df]">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: "2rem", borderTop: "1px solid rgba(234,230,223,0.06)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>
          <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.55rem", fontWeight: 300, color: "rgba(234,230,223,0.2)" }}>
            &copy; 2026 WpDev. All rights reserved.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {SOCIAL_ICONS.map((social) => (
              <motion.a
                key={social.name}
                href="#"
                style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(234,230,223,0.2)" }}
                className="hover:!text-[#c9a96e]"
                whileHover={{ y: -2 }}
                aria-label={social.name}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d={social.path} /></svg>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
