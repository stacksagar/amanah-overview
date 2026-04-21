import SmoothScroll from "@/components/providers/SmoothScroll";
import MagneticCursor from "@/components/ui/MagneticCursor";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amanah — Autonomous Wealth Stewardship",
  description:
    "Your wealth, working while you sleep. AI-powered autonomous stewardship aligned with your principles.",
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
