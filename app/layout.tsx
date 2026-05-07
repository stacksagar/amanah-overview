import SmoothScroll from "@/components/providers/SmoothScroll";
import MagneticCursor from "@/components/ui/MagneticCursor";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const title =
  "Nawah Wealth | Sharia-Compliant AI Trading Signals & Ethical Stock Research Platform";
const description =
  "Nawah Wealth delivers Sharia-compliant AI market intelligence, halal stock screening, and ethical trading signals. A council of autonomous researchers works while you sleep. Join the founding list.";

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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
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
