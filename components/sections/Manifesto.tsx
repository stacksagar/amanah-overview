"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const lines = [
  "The old model was designed",
  "for the manager — not you.",
  "We inverted it.",
];

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Section label */
      gsap.from(".manifesto-label", {
        opacity: 0,
        y: 16,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      /* Big lines stagger */
      gsap.from(".manifesto-line-inner", {
        y: "105%",
        opacity: 0,
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".manifesto-lines", start: "top 75%" },
      });

      /* Body copy columns */
      gsap.from(".manifesto-body", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".manifesto-body-wrap", start: "top 80%" },
      });

      /* Quote */
      gsap.from(".manifesto-quote", {
        opacity: 0,
        x: -20,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".manifesto-quote", start: "top 80%" },
      });
    }, sectionRef.current ?? undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="min-h-screen px-6 md:px-16 lg:px-24 py-36 flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Label */}
        <p className="manifesto-label text-[9px] tracking-[0.5em] uppercase text-dim font-sans mb-16">
          01 — Philosophy
        </p>

        {/* Big headline lines */}
        <div className="manifesto-lines mb-20 overflow-hidden">
          {lines.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <p
                className={`manifesto-line-inner font-serif font-bold leading-tight
                            text-[clamp(2.4rem,5.5vw,5.5rem)] tracking-tight will-transform
                            ${i === 1 ? "italic" : ""}
                            ${i === 2 ? "text-accent" : "text-paper"}`}
              >
                {line}
              </p>
            </div>
          ))}
        </div>

        {/* Body copy */}
        <div className="manifesto-body-wrap grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
          <div className="space-y-5">
            <p className="manifesto-body text-dim font-sans font-light leading-relaxed text-[clamp(0.9rem,1.2vw,1.05rem)]">
              For generations, wealth demanded constant vigilance. Emotions
              clouded decisions. Opportunity costs compounded silently. The
              system profited from your distraction.
            </p>
            <p className="manifesto-body text-dim font-sans font-light leading-relaxed text-[clamp(0.9rem,1.2vw,1.05rem)]">
              We built Nawah on one foundational belief: your wealth deserves
              the same relentless care you give everything you love — without
              requiring your constant presence.
            </p>
          </div>

          <div className="border-l border-border pl-10">
            <blockquote
              className="manifesto-quote font-serif text-[clamp(1.2rem,2.2vw,2rem)]
                                   font-medium italic leading-snug text-paper/90"
            >
              &ldquo;No management fees. No administrative charges. We
              participate only in success. No performance, no
              compensation.&rdquo;
            </blockquote>
            <p className="manifesto-quote mt-6 text-[9px] tracking-[0.4em] uppercase text-dim font-sans">
              The Nawah Alignment Model
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
