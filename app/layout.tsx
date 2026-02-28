import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "WpDev Keyboard — Engineered Clarity",
  description:
    "A premium mechanical keyboard, deconstructed. Scroll to explore every layer of precision engineering. Pre-order now for $299.",
  keywords: ["mechanical keyboard", "premium keyboard", "hot-swappable", "gasket mount", "WpDev"],
  openGraph: {
    title: "WpDev Keyboard — Engineered Clarity",
    description: "A premium mechanical keyboard, deconstructed. Scroll to explore every layer of precision engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorantGaramond.variable} ${outfit.variable} ${syne.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#08080a] text-[#ede8e0]`}>
        {children}
      </body>
    </html>
  );
}
