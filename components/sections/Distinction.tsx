"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    num: "01",
    title: "If You Don’t Grow",
    body: "We do not earn. Nawah only wins when you win.",
  },
  {
    num: "02",
    title: "If You Set a Boundary",
    body: "The system stays inside it. Your rules come first.",
  },
  {
    num: "03",
    title: "If a Decision Is Made",
    body: "It should be clear. You should know what happened and why.",
  },
];

export default function Distinction() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Label */
      gsap.from(".dist-label", {
        opacity: 0,
        y: 14,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });

      /* Headline */
      gsap.from(".dist-char", {
        y: "110%",
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.022,
        scrollTrigger: { trigger: ".dist-headline", start: "top 82%" },
      });

      /* Pillars: stagger in from bottom */
      gsap.from(".dist-pillar", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power4.out",
        stagger: 0.15,
        scrollTrigger: { trigger: ".dist-pillars", start: "top 80%" },
      });

      /* Horizontal lines animate width */
      gsap.from(".dist-pillar-line", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: ".dist-pillars", start: "top 80%" },
      });

      /* Pull-quote clip reveal */
      gsap.from(".dist-quote-inner", {
        y: "100%",
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: ".dist-quote-wrap", start: "top 82%" },
      });
    }, sectionRef.current ?? undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="distinction"
      className="px-6 md:px-16 lg:px-24 py-40 md:py-44 border-t border-border"
    >
      <div className="max-w-7xl mx-auto">
        <p className="dist-label text-[9px] tracking-[0.5em] uppercase text-dim font-sans mb-18 md:mb-20">
          02 — Aligned by Design
        </p>

        <div
          className="dist-headline overflow-hidden mb-22"
          aria-label="Built to stay aligned."
        >
          <h2 className="font-serif font-black leading-tight tracking-tight">
            {["Built to Stay", "Aligned."].map((line, li) => (
              <div key={line} className="block overflow-hidden">
                <span
                  className={`block text-[clamp(2.8rem,6.8vw,6.6rem)] will-transform text-paper ${li === 1 ? "italic text-paper/52" : ""}`}
                >
                  {line.split("").map((char, ci) => (
                    <span
                      key={ci}
                      className="overflow-hidden inline-block align-bottom"
                    >
                      <span className="dist-char inline-block will-transform">
                        {char === " " ? "\u00a0" : char}
                      </span>
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </h2>
        </div>

        <div className="dist-pillars grid grid-cols-1 md:grid-cols-3 gap-6 mb-28">
          {PILLARS.map((p) => (
            <div
              key={p.num}
              className="dist-pillar group relative overflow-hidden border border-border
                         px-10 py-14 md:px-12 md:py-16 flex flex-col gap-7 will-opacity
                         hover:border-accent/25 transition-colors duration-500 cursor-default"
            >
              {/* Hover fill */}
              <div
                className="absolute inset-0 bg-card translate-y-full group-hover:translate-y-0
                              transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
              />
              {/* Content */}
              <div className="relative">
                <div
                  className="dist-pillar-line h-px bg-paper/10 w-full group-hover:bg-accent/40
                                transition-colors duration-500 mb-6"
                />
                <span className="text-[9px] tracking-[0.4em] uppercase text-accent/50 font-sans">
                  {p.num}
                </span>
              </div>
              <h3
                className="relative font-serif font-bold text-[1.85rem] text-paper leading-snug
                             group-hover:italic transition-all duration-300"
              >
                {p.title}
              </h3>
              <p className="relative text-dim/70 font-sans font-light text-sm md:text-base leading-[1.9] flex-1 max-w-[28ch]">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <div className="dist-quote-wrap overflow-hidden border-l-2 border-accent/40 pl-12 md:pl-14">
          <blockquote className="dist-quote-inner font-serif text-[clamp(1.3rem,2.5vw,2.2rem)] font-medium italic leading-snug text-paper/80 max-w-3xl">
            &ldquo;Nawah is built to follow your rules, not work around
            them.&rdquo;
          </blockquote>
          <p className="mt-6 text-[9px] tracking-[0.4em] uppercase text-dim/50 font-sans">
            Nawah — The Founding Principle
          </p>
        </div>
      </div>
    </section>
  );
}
