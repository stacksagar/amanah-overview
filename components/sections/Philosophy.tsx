"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  {
    value: "4.5 trillion plus",
    label: "Ethical wealth market underserved by intelligence",
  },
  {
    value: "100 percent",
    label: "Decision audit trail — every action logged",
  },
  {
    value: "Performance-only partnership",
    label: "No hidden charges",
  },
  {
    value: "Nine specialists",
    label: "Six deliberating minds. One mandate.",
  },
];

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const ring3Ref = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Continuous geometry animations ── */
      gsap.to(ring1Ref.current, {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: "none",
      });
      gsap.to(ring2Ref.current, {
        rotation: -360,
        duration: 28,
        repeat: -1,
        ease: "none",
      });
      gsap.to(ring3Ref.current, {
        rotation: 180,
        duration: 60,
        repeat: -1,
        ease: "none",
      });
      gsap.to(floatRef.current, {
        y: -28,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      /* ── Dot grid cascade ── */
      gsap.from(".phil-dot", {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(2)",
        stagger: { each: 0.04, from: "random", grid: [6, 6] },
        scrollTrigger: { trigger: ".phil-dots", start: "top 80%" },
      });

      /* ── Label ── */
      gsap.from(".phil-label", {
        opacity: 0,
        y: 16,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });

      /* ── Headline: clip-path wipe left→right ── */
      gsap.fromTo(
        ".phil-headline-wrap",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.6,
          ease: "power4.inOut",
          scrollTrigger: { trigger: ".phil-headline-wrap", start: "top 82%" },
        },
      );

      /* ── Paragraphs stagger up ── */
      gsap.from(".phil-para", {
        opacity: 0,
        y: 36,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.15,
        scrollTrigger: { trigger: ".phil-paras", start: "top 80%" },
      });

      /* ── Pull quote clip ── */
      gsap.fromTo(
        ".phil-quote-inner",
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: { trigger: ".phil-quote-wrap", start: "top 82%" },
        },
      );
    }, sectionRef.current ?? undefined);

    return () => ctx.revert();
  }, []);

  /* 6×6 dot grid */
  const dots = Array.from({ length: 36 });

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="px-6 md:px-16 lg:px-24 py-40 md:py-44 border-t border-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <p className="phil-label text-[9px] tracking-[0.5em] uppercase text-dim font-sans mb-18 md:mb-20">
          01 — Rethink the Relationship
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-24 lg:gap-36 mb-28">
          <div>
            <div
              className="phil-headline-wrap overflow-hidden mb-16 md:mb-18"
              style={{ clipPath: "inset(0 100% 0 0)" }}
            >
              <h2
                className="font-serif font-black leading-[0.9] tracking-tight text-paper"
                aria-label="Rethink the Relationship"
              >
                <span className="block text-[clamp(2.7rem,7vw,7rem)]">
                  Rethink the
                </span>
                <span className="block text-[clamp(2.7rem,7vw,7rem)] text-paper/72">
                  Relationship.
                </span>
              </h2>
            </div>

            <div className="phil-paras space-y-8 max-w-xl md:max-w-2xl">
              <p className="phil-para text-dim font-sans font-light leading-loose text-[clamp(0.95rem,1.3vw,1.1rem)]">
                For generations, growing wealth demanded constant attention.
                Markets never sleep, yet humans must. The result? Missed
                opportunities, emotional decisions, and the slow erosion of
                potential.
              </p>
              <p className="phil-para text-dim font-sans font-light leading-loose text-[clamp(0.95rem,1.3vw,1.1rem)]">
                We asked a different question: What if your wealth could be
                tended with the same care you give your family, your faith, your
                craft — continuously, ethically, and without your presence?
              </p>
              <p className="phil-para text-dim font-sans font-light leading-loose text-[clamp(0.95rem,1.3vw,1.1rem)]">
                The answer required reimagining not just technology, but trust
                itself.
              </p>
            </div>
          </div>

          <div
            ref={floatRef}
            className="relative flex items-center justify-center min-h-[400px] will-transform opacity-85"
          >
            <div
              ref={ring1Ref}
              className="absolute w-[340px] h-[340px] rounded-full border border-border/50 will-transform"
            />
            <div
              ref={ring2Ref}
              className="absolute w-[240px] h-[240px] rounded-full will-transform"
              style={{ border: "1px dashed rgba(0,102,255,0.3)" }}
            />
            <div
              ref={ring3Ref}
              className="absolute w-[140px] h-[140px] rounded-full will-transform"
              style={{ border: "1px solid rgba(0,102,255,0.6)" }}
            />
            <div className="w-3 h-3 rounded-full bg-accent/80" />
            {[0, 90, 180, 270].map((deg) => (
              <div
                key={deg}
                className="absolute w-1 h-4 bg-border"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${deg}deg) translateX(-50%) translateY(-170px)`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-28">
          {STATS.map((stat) => (
            <div
              key={stat.value}
              className="border-t border-border pt-6 md:pt-7"
            >
              <p className="font-serif font-black text-[clamp(1.45rem,2.5vw,2.35rem)] leading-tight text-paper">
                {stat.value}
              </p>
              <p className="mt-4 text-dim/70 font-sans font-light text-sm leading-relaxed max-w-[24ch]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Dot grid */}
        <div
          className="phil-dots grid gap-5 mb-28"
          style={{ gridTemplateColumns: "repeat(6, 1fr)", maxWidth: "280px" }}
        >
          {dots.map((_, i) => (
            <div
              key={i}
              className="phil-dot w-1.5 h-1.5 rounded-full bg-dim/25 will-transform"
            />
          ))}
        </div>

        {/* Pull quote — client content */}
        <div
          className="phil-quote-wrap border-l-2 border-accent/50 pl-10 md:pl-14 max-w-4xl"
          style={{ overflow: "hidden" }}
        >
          <div
            className="phil-quote-inner"
            style={{ clipPath: "inset(100% 0 0 0)" }}
          >
            <blockquote
              className="font-serif text-[clamp(1.4rem,2.8vw,2.6rem)] font-medium italic
                                   leading-snug text-paper/80"
            >
              &ldquo;What if your wealth could be tended with the same care you
              give your family, your faith, your craft — continuously,
              ethically, and without your presence?&rdquo;
            </blockquote>
            <p className="mt-6 text-[9px] tracking-[0.5em] uppercase text-dim/50 font-sans">
              The Founding Question
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
