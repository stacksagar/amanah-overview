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
          02 — The Promise
        </p>

        <div
          className="dist-headline overflow-hidden mb-14 md:mb-22"
          aria-label="Meet Your Personal Research Council"
        >
          <h2 className="font-serif font-black leading-[1.2] tracking-tight">
            {["Meet Your Personal", "Research Council"].map((line, li) => (
              <div key={line} className="block overflow-hidden mb-2">
                <span
                  className={`block text-[clamp(2.8rem,6.8vw,6.6rem)] will-transform text-paper ${li === 1 ? "italic text-accent" : ""}`}
                >
                  {line.split("").map((char, ci) => (
                    <span
                      key={ci}
                      className="overflow-hidden inline-block align-bottom"
                      style={{
                        display: "inline-block",
                        verticalAlign: "baseline",
                      }}
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
              Nawah Wealth is not an app. It is a council of specialised AI
              researchers who work exclusively for you. They never sleep. They
              never miss a screen. They never compromise on your ethical
              boundaries. While you rest, they evaluate. While you pray, they
              analyse. While you spend time with your family, they deliberate
              and reach consensus on every opportunity that crosses your
              criteria.
            </p>
            <p className="dist-body text-dim/80 font-sans font-light text-[clamp(0.98rem,1.15vw,1.08rem)] leading-[1.95]">
              You wake to a single narrative briefing. Clear. Transparent. Fully
              explained. Every opportunity scored. Every risk flagged. Every
              Sharia screen passed with reasoning you can verify.
            </p>
          </div>
          <div className="border-t md:border-t-0 md:border-l border-border pt-8 md:pt-0 pl-0 md:pl-12">
            <p className="dist-body text-dim/80 font-sans font-light text-[clamp(0.98rem,1.15vw,1.08rem)] leading-[1.95]">
              You do not guess. You do not rush. You do not compromise your
              principles for convenience. You trade with clarity. You trade with
              confidence. You trade with your faith intact.
            </p>
            <p className="dist-body text-dim/80 font-sans font-light text-[clamp(0.98rem,1.15vw,1.08rem)] leading-[1.95] mt-6">
              If you already have a broker, you execute through them with full
              confidence. If you are new to investing, our intelligence guides
              your first steps until you are ready.
            </p>
          </div>
        </div>

        <div className="dist-quote-wrap overflow-hidden border-l-2 border-accent/40 pl-6 sm:pl-12 md:pl-14">
          <blockquote className="dist-quote-inner font-serif text-[clamp(1.3rem,2.5vw,2.2rem)] font-medium italic leading-snug text-paper/80 max-w-3xl">
            &ldquo;While you rest, they evaluate. While you pray, they analyse.
            While you spend time with your family, they deliberate and reach
            consensus.&rdquo;
          </blockquote>
          <p className="mt-6 text-[9px] tracking-[0.4em] uppercase text-dim/50 font-sans">
            Nawah — The Council Promise
          </p>
        </div>
      </div>
    </section>
  );
}
