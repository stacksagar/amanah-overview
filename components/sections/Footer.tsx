"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const LETTERS = [
  { id: "n-1", value: "N" },
  { id: "a-1", value: "A" },
  { id: "w-1", value: "W" },
  { id: "a-2", value: "A" },
  { id: "h-1", value: "H" },
];

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Brand scale-in on scroll ── */
      gsap.fromTo(
        brandRef.current,
        { scale: 0.52, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 1.2,
          },
        },
      );

      LETTERS.forEach((_, i) => {
        gsap.to(`.brand-letter-${i}`, {
          y: -18,
          duration: 0.55,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.12,
          repeatDelay: (LETTERS.length - 1) * 0.12 + 0.4,
        });
      });

      /* ── SVG decorative line draws on scroll entry ── */
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { attr: { strokeDashoffset: 1200 } },
          {
            attr: { strokeDashoffset: 0 },
            duration: 2,
            ease: "power3.inOut",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          },
        );
      }

      /* ── Meta items stagger in ── */
      gsap.from(".footer-meta", {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".footer-meta-wrap", start: "top 88%" },
      });
    }, sectionRef.current ?? undefined);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      id="footer"
      className="min-h-[85vh] md:min-h-screen px-5 sm:px-6 md:px-16 lg:px-24 pt-20 sm:pt-24 pb-10 md:pb-12 flex flex-col
                 justify-between border-t border-border overflow-hidden relative"
    >
      {/* Decorative SVG line */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <line
          ref={lineRef}
          x1="0%"
          y1="10%"
          x2="100%"
          y2="90%"
          stroke="rgba(0,102,255,0.08)"
          strokeWidth="1"
          strokeDasharray="1200"
          strokeDashoffset="1200"
        />
      </svg>

      <div className="footer-meta max-w-4xl">
        <p className="text-[10px] tracking-[0.42em] md:tracking-[0.5em] uppercase text-dim/70 font-sans mb-6 md:mb-8">
          08 — Investor Inquiries
        </p>
        <h2 className="font-serif font-black text-[clamp(2.8rem,6vw,6rem)] leading-[0.95] tracking-tight text-paper mb-8">
          Investor Inquiries.
        </h2>
        <div className="space-y-5 max-w-3xl">
          <p className="text-dim/90 font-sans font-light text-base md:text-lg leading-relaxed">
            We are currently raising pre-seed funding to complete our MVP,
            secure Sharia advisory board formation, and prepare for Q3 2026
            launch.
          </p>
          <p className="text-dim/90 font-sans font-light text-base md:text-lg leading-relaxed">
            For investment discussions: founder@nawahwealth.com
          </p>
        </div>
      </div>

      {/* Massive brand text */}
      <div
        ref={brandRef}
        className="flex-1 flex items-center justify-center py-14 md:py-0 will-transform"
      >
        <div className="flex flex-col items-center justify-center select-none">
          <h2
            className="font-serif font-black tracking-tighter leading-none flex items-end gap-0 text-paper"
            style={{ fontSize: "clamp(4rem, 22vw, 22rem)" }}
            aria-label="NAWAH"
          >
            {LETTERS.map(({ id, value }, i) => (
              <span
                key={id}
                className={`brand-letter-${i} inline-block will-transform`}
              >
                {value}
              </span>
            ))}
          </h2>
          <p className="mt-3 md:mt-4 font-sans text-[clamp(1rem,2vw,2.2rem)] tracking-[0.4em] sm:tracking-[0.55em] uppercase text-paper/60 pl-[0.4em] sm:pl-[0.55em]">
            Wealth
          </p>
        </div>
      </div>

      {/* Meta row */}
      <div className="footer-meta-wrap border-t border-border/60 pt-8 md:pt-12 mt-8 md:mt-12">
        <div
          className="footer-meta flex flex-col md:flex-row items-start md:items-center
                        justify-between gap-6 md:gap-4"
        >
          <div className="space-y-3">
            <p className="text-[10px] tracking-[0.24em] sm:tracking-[0.3em] uppercase text-dim/60 font-sans">
              Nawah Wealth
            </p>
            <p className="text-dim/90 font-sans font-light text-sm leading-relaxed">
              Designed in London. Growing Globally.
            </p>
            <p className="text-[10px] tracking-[0.24em] sm:tracking-[0.3em] uppercase text-dim/60 font-sans">
              Pre-seed stage. MVP in development.
            </p>
          </div>
          <div className="flex gap-8 items-center flex-wrap">
            <p className="text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-dim/60 font-sans">
              Copyright 2026 Nawah Wealth. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
