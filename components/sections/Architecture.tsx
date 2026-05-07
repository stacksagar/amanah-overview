"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  {
    value: "OPEN",
    label: "Open council",
    body: "We are not a black box. We are an open council.",
  },
  {
    value: "TRANSPARENT",
    label: "Full visibility",
    body: "You see every screen. You read every reason. You verify every claim.",
  },
  {
    value: "NO HIDDEN",
    label: "Nothing hidden",
    body: "Nothing is hidden because nothing needs to be.",
  },
  {
    value: "AAOIFI",
    label: "Aligned scrutiny",
    body: "Designed for AAOIFI-aligned scrutiny with Islamic finance scholars.",
  },
];

export default function Architecture() {
  const sectionRef = useRef<HTMLElement>(null);
  const crossRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Rotating cross decoration */
      gsap.to(crossRef.current, {
        rotation: 90,
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      /* Label */
      gsap.from(".arch-label", {
        opacity: 0,
        y: 16,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });

      /* Headline clip-path wipe */
      gsap.fromTo(
        ".arch-headline-wrap",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.6,
          ease: "power4.inOut",
          scrollTrigger: { trigger: ".arch-headline-wrap", start: "top 82%" },
        },
      );

      /* Body text */
      gsap.from(".arch-body", {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".arch-body-wrap", start: "top 80%" },
      });

      /* Stat cards slide up stagger */
      gsap.from(".arch-stat", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".arch-stats", start: "top 82%" },
      });
    }, sectionRef.current ?? undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="architecture"
      className="px-6 md:px-16 lg:px-24 py-28 md:py-44 border-t border-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex items-start justify-between mb-12 md:mb-20">
          <p className="arch-label text-[10px] tracking-[0.42em] md:tracking-[0.5em] uppercase text-dim font-sans">
            06 — Built For Trust
          </p>
          <div
            ref={crossRef}
            className="hidden sm:block w-10 h-10 shrink-0 will-transform opacity-20"
            aria-hidden="true"
          >
            <svg viewBox="0 0 40 40" fill="none">
              <rect x="18" y="0" width="4" height="40" fill="#EAEAEA" />
              <rect x="0" y="18" width="40" height="4" fill="#EAEAEA" />
            </svg>
          </div>
        </div>

        <div
          className="arch-headline-wrap overflow-hidden mb-14 md:mb-22"
          style={{ clipPath: "inset(0 100% 0 0)" }}
          aria-label="Built For Trust"
        >
          <h2 className="font-serif font-black leading-[0.9] tracking-tight text-paper">
            <span className="block text-[clamp(3rem,8vw,8rem)]">Built For</span>
            <span className="block text-[clamp(3rem,8vw,8rem)] italic text-accent">
              Trust.
            </span>
          </h2>
        </div>

        <div className="arch-body-wrap grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 mb-20 md:mb-28">
          <div className="space-y-5 md:space-y-6">
            <p className="arch-body text-dim/85 font-sans font-light leading-loose text-[clamp(0.95rem,1.3vw,1.1rem)]">
              Every decision leaves a trail. Every analysis carries explanation.
              Nothing is hidden because nothing needs to be.
            </p>
            <p className="arch-body text-dim/85 font-sans font-light leading-loose text-[clamp(0.95rem,1.3vw,1.1rem)]">
              Our ethical frameworks are being developed in consultation with
              Islamic finance scholars and designed for AAOIFI-aligned scrutiny.
              We do not claim certification we have not earned. We commit to
              transparency in that journey.
            </p>
          </div>
          <div className="border-t md:border-t-0 md:border-l border-border pt-8 md:pt-0 pl-0 md:pl-12">
            <p className="arch-body text-dim/85 font-sans font-light leading-loose text-[clamp(0.95rem,1.2vw,1.05rem)]">
              We are not a black box. We are an open council. You see every
              screen. You read every reason. You verify every claim.
            </p>
          </div>
        </div>

        <div className="arch-stats grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="arch-stat group relative overflow-hidden border border-border
                         px-6 md:px-8 py-8 md:py-12 flex flex-col gap-5 will-transform
                         hover:border-accent/30 transition-colors duration-500 cursor-default"
            >
              {/* Hover fill */}
              <div
                className="absolute inset-0 bg-card translate-y-full group-hover:translate-y-0
                              transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
              />

              <span
                className="relative font-serif font-black text-[clamp(2.8rem,5vw,4.5rem)]
                               leading-none text-paper group-hover:text-accent transition-colors duration-300"
              >
                {s.value}
              </span>
              <div className="relative">
                <p className="text-[10px] tracking-[0.28em] uppercase text-dim font-sans mb-3">
                  {s.label}
                </p>
                <p
                  className="text-dim/70 font-sans font-light text-sm leading-relaxed
                               transition-colors duration-300 group-hover:text-dim/90"
                >
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
