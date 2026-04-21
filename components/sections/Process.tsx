"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    heading: "You Define the Boundaries",
    body: "Set your ethical constraints, risk appetite, and financial goals. Amanah never operates outside the limits you establish. Your principles are hard-coded — not guidelines.",
    accent: "Define",
  },
  {
    num: "02",
    heading: "Six Minds Deliberate",
    body: "Macro, Fundamental, Technical, Sentiment, Risk, and Execution agents analyse continuously. They disagree. They debate. They reach consensus. No single point of failure.",
    accent: "Deliberate",
  },
  {
    num: "03",
    heading: "You Wake to Results",
    body: "Every action logged. Every decision explained. Full transparency on what happened, why it happened, and what was considered. You review. You approve. You own.",
    accent: "Transparency",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const hexRef = useRef<SVGSVGElement>(null);
  const triFloatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Spinning hexagon */
      gsap.to(hexRef.current, {
        rotation: 360,
        duration: 35,
        repeat: -1,
        ease: "none",
      });
      gsap.from(hexRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      /* Floating triangle */
      gsap.to(triFloatRef.current, {
        y: -18,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      /* Label */
      gsap.from(".proc-label", {
        opacity: 0,
        y: 14,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });

      /* Heading */
      gsap.from(".proc-head-char", {
        y: "110%",
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.025,
        scrollTrigger: { trigger: ".proc-headline", start: "top 82%" },
      });

      /* Vertical connector line grows */
      gsap.from(".proc-connector", {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.6,
        ease: "power3.inOut",
        scrollTrigger: { trigger: ".proc-steps", start: "top 75%" },
      });

      /* Each step slides in from the right */
      gsap.from(".proc-step", {
        opacity: 0,
        x: 40,
        duration: 1,
        ease: "power4.out",
        stagger: 0.18,
        scrollTrigger: { trigger: ".proc-steps", start: "top 78%" },
      });

      /* Step accent words cycle color */
      gsap.from(".proc-accent", {
        color: "#333",
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.25,
        scrollTrigger: { trigger: ".proc-steps", start: "top 70%" },
      });
    }, sectionRef.current ?? undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="px-6 md:px-16 lg:px-24 py-36 border-t border-border"
    >
      <div className="max-w-7xl mx-auto">
        {/* Label row with spinning hexagon */}
        <div className="flex items-start justify-between mb-20">
          <p className="proc-label text-[9px] tracking-[0.5em] uppercase text-dim font-sans">
            How It Works
          </p>
          <div className="flex items-center gap-8">
            {/* Floating triangle */}
            <div
              ref={triFloatRef}
              className="will-transform opacity-25"
              aria-hidden="true"
            >
              <svg width="32" height="28" viewBox="0 0 32 28" fill="none">
                <path
                  d="M16 2L30 26H2L16 2Z"
                  stroke="rgba(0,102,255,0.8)"
                  strokeWidth="1"
                />
              </svg>
            </div>
            {/* Spinning hexagon */}
            <svg
              ref={hexRef}
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              className="will-transform opacity-20"
              aria-hidden="true"
            >
              <polygon
                points="20,2 36,11 36,29 20,38 4,29 4,11"
                stroke="rgba(234,234,234,0.8)"
                strokeWidth="1"
                fill="none"
              />
              <polygon
                points="20,10 28,15 28,25 20,30 12,25 12,15"
                stroke="rgba(0,102,255,0.6)"
                strokeWidth="0.8"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* Headline */}
        <div
          className="proc-headline overflow-hidden mb-24"
          aria-label="Simple by design. Powerful by nature."
        >
          <h2 className="font-serif font-black leading-tight tracking-tight text-paper">
            {["Simple by Design.", "Powerful by Nature."].map((line, li) => (
              <div key={line} className="block overflow-hidden">
                <span
                  className={`block text-[clamp(2rem,5.5vw,5.5rem)] will-transform ${li === 1 ? "italic text-paper/40" : ""}`}
                >
                  {line.split("").map((char, ci) => (
                    <span
                      key={ci}
                      className="overflow-hidden inline-block align-bottom"
                    >
                      <span className="proc-head-char inline-block will-transform">
                        {char === " " ? "\u00a0" : char}
                      </span>
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </h2>
        </div>

        {/* Steps */}
        <div className="proc-steps relative grid grid-cols-1 md:grid-cols-[1px_1fr] gap-0">
          {/* Vertical connector */}
          <div className="hidden md:block">
            <div className="proc-connector w-px h-full bg-gradient-to-b from-accent/60 via-border to-transparent mx-auto" />
          </div>

          {/* Step list */}
          <div className="md:pl-16 space-y-0 divide-y divide-border">
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="proc-step py-14 flex flex-col md:flex-row gap-8 md:gap-16 will-transform"
              >
                {/* Number + accent */}
                <div className="flex-shrink-0 flex flex-col gap-2">
                  <span className="text-[9px] tracking-[0.5em] uppercase text-dim/50 font-sans">
                    {step.num}
                  </span>
                  <span className="proc-accent font-serif italic text-accent text-lg leading-none font-bold">
                    {step.accent}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-4 max-w-xl">
                  <h3 className="font-serif font-bold text-[clamp(1.4rem,2.5vw,2rem)] text-paper leading-snug">
                    {step.heading}
                  </h3>
                  <p className="text-dim/70 font-sans font-light text-[clamp(0.9rem,1.1vw,1rem)] leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
