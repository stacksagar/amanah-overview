"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

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

      /* Body blocks */
      gsap.from(".dist-body", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power4.out",
        stagger: 0.15,
        scrollTrigger: { trigger: ".dist-body-wrap", start: "top 80%" },
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
      className="px-6 md:px-16 lg:px-24 py-28 md:py-44 border-t border-border"
    >
      <div className="max-w-7xl mx-auto">
        <p className="dist-label text-[10px] tracking-[0.42em] md:tracking-[0.5em] uppercase text-dim font-sans mb-12 md:mb-20">
          02 — Aligned by Design, Not by Accident
        </p>

        <div
          className="dist-headline overflow-hidden mb-14 md:mb-22"
          aria-label="Aligned by Design, Not by Accident"
        >
          <h2 className="font-serif font-black leading-tight tracking-tight">
            {["Aligned by Design,", "Not by Accident."].map((line, li) => (
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

        <div className="dist-body-wrap grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 mb-20 md:mb-28">
          <div className="space-y-6 md:space-y-8 max-w-2xl">
            <p className="dist-body text-dim/80 font-sans font-light text-[clamp(0.98rem,1.15vw,1.08rem)] leading-[1.95]">
              Traditional stewardship extracts value regardless of outcome. We
              considered this fundamentally misaligned.
            </p>
            <p className="dist-body text-dim/80 font-sans font-light text-[clamp(0.98rem,1.15vw,1.08rem)] leading-[1.95]">
              Our structure inverts the model. We participate only in success.
              No management fees. No administrative charges. No performance, no
              compensation.
            </p>
          </div>
          <div className="border-t md:border-t-0 md:border-l border-border pt-8 md:pt-0 pl-0 md:pl-12">
            <p className="dist-body text-dim/80 font-sans font-light text-[clamp(0.98rem,1.15vw,1.08rem)] leading-[1.95]">
              This is not generosity. It is geometry. When our success requires
              yours, every decision, every algorithm, every waking moment of our
              system optimizes for a single outcome: your growth.
            </p>
          </div>
        </div>

        <div className="dist-quote-wrap overflow-hidden border-l-2 border-accent/40 pl-6 sm:pl-12 md:pl-14">
          <blockquote className="dist-quote-inner font-serif text-[clamp(1.3rem,2.5vw,2.2rem)] font-medium italic leading-snug text-paper/80 max-w-3xl">
            &ldquo;When our success requires yours — every algorithm serves you
            first.&rdquo;
          </blockquote>
          <p className="mt-6 text-[9px] tracking-[0.4em] uppercase text-dim/50 font-sans">
            Nawah — The Founding Principle
          </p>
        </div>
      </div>
    </section>
  );
}
