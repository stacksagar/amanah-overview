"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const LETTERS = ["A", "M", "A", "N", "A", "H"];

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

      /* ── Continuous letter float wave ── */
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
      className="min-h-screen px-6 md:px-16 lg:px-24 pt-24 pb-12 flex flex-col
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

      {/* Massive brand name — shimmer + letter float */}
      <div
        ref={brandRef}
        className="flex-1 flex items-center justify-center will-transform"
      >
        <h2
          className="font-serif font-black tracking-tighter leading-none select-none
                     flex items-end gap-0"
          style={{ fontSize: "clamp(5rem, 20vw, 22rem)" }}
          aria-label="AMANAH"
        >
          {LETTERS.map((letter, i) => (
            <span
              key={i}
              className={`brand-letter-${i} brand-shimmer inline-block will-transform`}
            >
              {letter}
            </span>
          ))}
        </h2>
      </div>

      {/* Meta row */}
      <div className="footer-meta-wrap border-t border-border/60 pt-10 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="footer-meta">
            <p className="text-[9px] tracking-[0.4em] uppercase text-dim/70 font-sans mb-3">
              Location
            </p>
            <p className="text-dim/90 font-sans font-light text-sm leading-relaxed">
              Designed in London.
              <br />
              Growing globally.
            </p>
          </div>

          <div className="footer-meta">
            <p className="text-[9px] tracking-[0.4em] uppercase text-dim/70 font-sans mb-3">
              Contact
            </p>
            <a
              href="mailto:hello@amanah.wealth"
              className="text-dim/90 font-sans font-light text-sm hover:text-accent transition-colors duration-300"
            >
              hello@amanah.wealth
            </a>
          </div>

          <div className="footer-meta">
            <p className="text-[9px] tracking-[0.4em] uppercase text-dim/70 font-sans mb-3">
              Commitment
            </p>
            <p className="text-dim/90 font-sans font-light text-sm leading-relaxed">
              Transparent · Ethical · Autonomous
            </p>
          </div>
        </div>

        <div
          className="footer-meta flex flex-col md:flex-row items-start md:items-center
                        justify-between gap-4"
        >
          <p className="text-[9px] tracking-[0.3em] uppercase text-dim/60 font-sans">
            © 2026 Amanah Wealth. All rights reserved.
          </p>
          <div className="flex gap-8">
            {["Privacy", "Terms"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[9px] tracking-[0.3em] uppercase text-dim/60 font-sans
                           hover:text-dim transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
