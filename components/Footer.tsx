"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const FOOTER_LINKS = {
  Product: ["Features", "Specifications", "Gallery", "Pre-Order"],
  Support: ["Contact", "Shipping", "Returns", "FAQ"],
  Company: ["About", "Blog", "Careers", "Press"],
};

const SOCIAL_ICONS = [
  {
    name: "Twitter",
    path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
  },
  {
    name: "Instagram",
    path: "M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 11a3 3 0 110-6 3 3 0 010 6zm4.5-7.5a1 1 0 110-2 1 1 0 010 2z",
  },
  {
    name: "Discord",
    path: "M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 00-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 00-5.487 0 12.36 12.36 0 00-.617-1.23A.077.077 0 008.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 00-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 00.031.055 20.03 20.03 0 005.993 2.98.078.078 0 00.084-.026c.462-.62.874-1.275 1.226-1.963a.074.074 0 00-.041-.104 13.201 13.201 0 01-1.872-.878.075.075 0 01-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 01.078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 01.079.009c.12.098.245.195.372.288a.075.075 0 01-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 00-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 00.084.028 19.963 19.963 0 006.002-2.981.076.076 0 00.032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 00-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z",
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <motion.footer
      className="relative"
      style={{ borderTop: "1px solid rgba(201,169,110,0.08)", padding: "5rem clamp(2rem, 6vw, 6rem) 2.5rem" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
    >
      <div style={{ maxWidth: "80rem", marginLeft: "auto", marginRight: "auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "4rem" }}>
          {/* Brand & newsletter */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="text-2xl tracking-tight mb-4"
                style={{
                  fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 600,
                }}
              >
                <span className="text-[#c9a96e]">Wp</span>
                <span className="text-[#ede8e0]">Dev</span>
              </div>
              <p
                className="text-sm text-[#8a8580] font-light leading-relaxed max-w-sm mb-8"
                style={{ fontFamily: "var(--font-body), 'Outfit', sans-serif" }}
              >
                Premium mechanical keyboards engineered for those who demand
                excellence in every keystroke. Built with obsessive attention to
                detail.
              </p>

              {/* Newsletter */}
              <div>
                <p
                  className="text-xs text-[#8a8580] font-medium tracking-[0.15em] uppercase mb-3"
                  style={{ fontFamily: "var(--font-body), 'Outfit', sans-serif" }}
                >
                  Stay in the loop
                </p>
                {subscribed ? (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-[#c9a96e] font-light"
                    style={{ fontFamily: "var(--font-body), 'Outfit', sans-serif" }}
                  >
                    Thank you for subscribing.
                  </motion.p>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="flex-1 bg-[#ede8e0]/[0.04] border border-[rgba(201,169,110,0.15)] rounded-lg px-4 py-2.5 text-sm text-[#ede8e0] placeholder:text-[#5a5550] outline-none focus:border-[#c9a96e]/50 transition-colors font-light"
                      style={{ fontFamily: "var(--font-body), 'Outfit', sans-serif" }}
                    />
                    <motion.button
                      type="submit"
                      className="border border-[#c9a96e]/60 text-[#c9a96e] px-5 py-2.5 rounded-lg text-sm font-medium cursor-pointer hover:bg-[#c9a96e]/10 transition-colors duration-300"
                      style={{ fontFamily: "var(--font-body), 'Outfit', sans-serif" }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Subscribe
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links], ci) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + ci * 0.08, duration: 0.5 }}
            >
              <p
                className="text-xs text-[#5a5550] font-medium tracking-[0.15em] uppercase mb-4"
                style={{ fontFamily: "var(--font-body), 'Outfit', sans-serif" }}
              >
                {category}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#8a8580] hover:text-[#ede8e0] transition-colors duration-200 font-light"
                      style={{ fontFamily: "var(--font-body), 'Outfit', sans-serif" }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: "2rem", borderTop: "1px solid rgba(201,169,110,0.06)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>
          {/* Copyright */}
          <p
            className="text-xs text-[#5a5550] font-light"
            style={{ fontFamily: "var(--font-body), 'Outfit', sans-serif" }}
          >
            &copy; 2026 WpDev. All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {SOCIAL_ICONS.map((social) => (
              <motion.a
                key={social.name}
                href="#"
                className="w-9 h-9 rounded-full bg-[#ede8e0]/[0.04] flex items-center justify-center text-[#5a5550] hover:text-[#c9a96e] hover:bg-[#c9a96e]/10 transition-colors duration-200"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.name}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d={social.path} />
                </svg>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
