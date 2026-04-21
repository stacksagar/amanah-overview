"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  {
    value: "100%",
    label: "Decision traceability",
    body: "Every move, fully auditable.",
  },
  {
    value: "AAOIFI",
    label: "Aligned review structure",
    body: "Frameworks are being developed for AAOIFI-aligned review.",
  },
  {
    value: "0",
    label: "Unclaimed certifications",
    body: "We do not claim certification we have not earned.",
  },
  {
    value: "OPEN",
    label: "Scrutiny invited",
    body: "The journey is documented openly and welcomes examination.",
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
      className="px-6 md:px-16 lg:px-24 py-36 border-t border-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex items-start justify-between mb-16">
          <p className="arch-label text-[9px] tracking-[0.5em] uppercase text-dim font-sans">
            05 — Built for Scrutiny
          </p>
          <div
            ref={crossRef}
            className="w-10 h-10 will-transform opacity-20 flex-shrink-0"
            aria-hidden="true"
          >
            <svg viewBox="0 0 40 40" fill="none">
              <rect x="18" y="0" width="4" height="40" fill="#EAEAEA" />
              <rect x="0" y="18" width="40" height="4" fill="#EAEAEA" />
            </svg>
          </div>
        </div>

        <div
          className="arch-headline-wrap overflow-hidden mb-20"
          style={{ clipPath: "inset(0 100% 0 0)" }}
          aria-label="Built to Withstand Scrutiny"
        >
          <h2 className="font-serif font-black leading-[0.9] tracking-tight text-paper">
            <span className="block text-[clamp(3rem,8vw,8rem)]">
              Built to Withstand
            </span>
            <span className="block text-[clamp(3rem,8vw,8rem)] italic text-paper/50">
              Scrutiny.
            </span>
          </h2>
        </div>

        <div className="arch-body-wrap grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 mb-24">
          <div className="space-y-6">
            <p className="arch-body text-dim font-sans font-light leading-loose text-[clamp(0.95rem,1.3vw,1.1rem)]">
              Opacity is where trust breaks. So we removed it. Every decision
              leaves a trail. Every action carries justification. Every system
              component is designed to be examined.
            </p>
            <p className="arch-body text-dim font-sans font-light leading-loose text-[clamp(0.95rem,1.3vw,1.1rem)]">
              Not hidden. Not simplified. Not masked. Because trust isn’t
              claimed. It’s engineered — then tested.
            </p>
          </div>
          <div className="border-l border-border pl-8 md:pl-12">
            <p className="arch-body text-dim font-sans font-light leading-loose text-[clamp(0.95rem,1.2vw,1.05rem)]">
              Our ethical boundary frameworks are being developed in
              consultation with Islamic finance scholars and structured for
              AAOIFI-aligned review.
            </p>
            <p className="arch-body mt-6 text-dim font-sans font-light leading-loose text-[clamp(0.95rem,1.2vw,1.05rem)]">
              We do not claim certification we have not earned. We document the
              journey openly — and invite scrutiny at every stage.
            </p>
            <p className="arch-body mt-8 font-serif italic text-[clamp(1.2rem,2vw,1.7rem)] leading-snug text-paper/70">
              &ldquo;Trust is not requested. It is constructed — decision by
              decision, until it becomes undeniable.&rdquo;
            </p>
          </div>
        </div>

        <div className="arch-stats grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="arch-stat group relative overflow-hidden border border-border
                         px-8 py-10 flex flex-col gap-4 will-transform
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
                <p className="text-[9px] tracking-[0.4em] uppercase text-dim font-sans mb-2">
                  {s.label}
                </p>
                <p
                  className="text-dim/60 font-sans font-light text-xs leading-relaxed opacity-0
                               group-hover:opacity-100 transition-opacity duration-500"
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
