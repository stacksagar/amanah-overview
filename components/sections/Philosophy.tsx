"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  {
    value: "$4.5 trillion",
    label:
      "In ethical wealth managed by teams who work while you sleep. Until now, you did not have a team.",
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
      className="px-6 md:px-16 lg:px-24 py-28 md:py-44 border-t border-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <p className="phil-label text-[10px] tracking-[0.42em] md:tracking-[0.5em] uppercase text-dim font-sans mb-12 md:mb-20">
          01 — The Pain
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-14 lg:gap-36 mb-20 md:mb-28">
          <div>
            <div
              className="phil-headline-wrap overflow-hidden mb-10 md:mb-18"
              style={{ clipPath: "inset(0 100% 0 0)" }}
            >
              <h2
                className="font-serif font-black leading-[0.9] tracking-tight text-paper"
                aria-label="You Are Missing Sharia-Compliant Opportunities Every Single Night"
              >
                <span className="block text-[clamp(2.4rem,6vw,6.5rem)]">
                  You Are Missing
                </span>
                <span className="block text-[clamp(2.4rem,6vw,6.5rem)] text-paper/72">
                  Sharia-Compliant Opportunities
                </span>
                <span className="block text-[clamp(2.4rem,6vw,6.5rem)] italic">
                  Every Single Night
                </span>
              </h2>
            </div>

            <div className="phil-paras space-y-6 sm:space-y-8 max-w-xl md:max-w-2xl">
              <p className="phil-para text-dim font-sans font-light leading-loose text-[clamp(0.95rem,1.3vw,1.1rem)]">
                You go to bed. Markets move. A stock breaks out. A sector
                rotates. A Sharia-compliant company reports earnings that change
                everything. You wake up. You check your phone. You see what
                happened. You missed it. Again.
              </p>
              <p className="phil-para text-dim font-sans font-light leading-loose text-[clamp(0.95rem,1.3vw,1.1rem)]">
                This is not your fault. You have a job. A family. Prayers to
                keep. Sleep you need. You cannot stare at charts until 2 AM. You
                cannot read 40,000 securities before Fajr.
              </p>
              <p className="phil-para text-dim font-sans font-light leading-loose text-[clamp(0.95rem,1.3vw,1.1rem)]">
                But here is what hurts: every missed opportunity is wealth your
                family never sees. Every emotional trade you make because you
                are tired and rushing is money you lose. Every stock you
                accidentally hold because you did not have time to check the
                debt ratio or interest income is a burden on your conscience
                that you could have avoided.
              </p>
              <p className="phil-para text-dim font-sans font-light leading-loose text-[clamp(0.95rem,1.3vw,1.1rem)]">
                You deserve better than this. Your faith deserves better than
                this.
              </p>
            </div>
          </div>

          <div
            ref={floatRef}
            className="relative flex items-center justify-center min-h-[280px] sm:min-h-[340px] md:min-h-[400px] will-transform opacity-85 scale-[0.78] sm:scale-90 md:scale-100"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-20 md:mb-28">
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
          className="phil-dots grid gap-4 sm:gap-5 mb-20 md:mb-28"
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
          className="phil-quote-wrap border-l-2 border-accent/50 pl-6 sm:pl-10 md:pl-14 max-w-4xl"
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
              &ldquo;4.5 trillion dollars in ethical wealth is managed by people
              who have teams of analysts working while they sleep. You do not
              have a team. Until now.&rdquo;
            </blockquote>
            <p className="mt-6 text-[9px] tracking-[0.5em] uppercase text-dim/50 font-sans">
              The Opportunity Gap
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
