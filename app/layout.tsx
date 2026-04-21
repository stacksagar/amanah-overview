import SmoothScroll from "@/components/providers/SmoothScroll";
import MagneticCursor from "@/components/ui/MagneticCursor";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const title =
  "Nawah Wealth — Sharia-Compliant Wealth. Compounding While You Sleep.";
const description =
  "A council of autonomous AI agents trades ethically on your behalf — within your principles, without your presence. Every decision logged. Every action explainable.";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "block",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title,
  description,
  applicationName: "Nawah Wealth",
  keywords: [
    "Nawah Wealth",
    "Sharia-compliant wealth",
    "ethical investing",
    "autonomous AI agents",
    "Islamic finance",
    "AAOIFI-aligned",
  ],
  openGraph: {
    title,
    description,
    siteName: "Nawah Wealth",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <SmoothScroll>
          <div className="film-grain" aria-hidden="true" />
          <MagneticCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
