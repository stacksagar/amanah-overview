import SmoothScroll from "@/components/providers/SmoothScroll";
import MagneticCursor from "@/components/ui/MagneticCursor";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const title =
  "Nawah Wealth — Sharia-Compliant Investing That Grows While You Sleep";
const description =
  "Autonomous AI agents trade ethically on your behalf. You set the boundaries. They do the work. You wake to results. We only eat when you feast.";

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
