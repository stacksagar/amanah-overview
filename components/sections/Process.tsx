"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    heading: "Define",
    body: "Set your ethical constraints, risk appetite, and financial goals in under 3 minutes. Nawah never operates outside the boundaries you establish. Your principles are hard-coded not suggestions.",
    accent: "Define",
  },
  {
    num: "02",
    heading: "Activate",
    body: "Toggle Watch Mode before you sleep. Your council begins its monitoring cycle. They evaluate. They screen. They debate. They reach consensus.",
    accent: "Activate",
  },
  {
    num: "03",
    heading: "Wake to Intelligence",
    body: "Your Morning Briefing arrives at your chosen time. As-salamu alaykum. While you were away, your council evaluated hundreds of opportunities, screened dozens for Sharia compliance, and produced Signal Cards for those that passed. Every analysis explained. Every decision transparent. You review. You decide. You trade through your own broker with full confidence or you learn until you are ready to begin.",
    accent: "Briefing",
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
      className="px-6 md:px-16 lg:px-24 py-28 md:py-44 border-t border-border"
    >
      <div className="max-w-7xl mx-auto">
        {/* Label row with spinning hexagon */}
        <div className="flex items-start justify-between mb-14 md:mb-24">
          <p className="proc-label text-[10px] tracking-[0.42em] md:tracking-[0.5em] uppercase text-dim font-sans">
            04 — How It Works
          </p>
          <div className="hidden sm:flex items-center gap-8">
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
          className="proc-headline overflow-hidden mb-14 md:mb-24"
          aria-label="How It Works."
        >
          <h2 className="font-serif font-black leading-tight tracking-tight text-paper">
            {["How It", "Works."].map((line, li) => (
              <div key={line} className="block overflow-hidden">
                <span
                  className={`block text-[clamp(2.4rem,6vw,5.8rem)] will-transform ${li === 1 ? "italic text-paper/40" : ""}`}
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
            <div className="proc-connector w-px h-full bg-linear-to-b from-accent/60 via-border to-transparent mx-auto" />
          </div>

          {/* Step list */}
          <div className="md:pl-20 space-y-0 divide-y divide-border">
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="proc-step py-12 md:py-18 flex flex-col md:flex-row gap-6 md:gap-18 will-transform"
              >
                {/* Number + accent */}
                <div className="shrink-0 flex flex-col gap-3">
                  <span className="text-[10px] tracking-[0.42em] md:tracking-[0.5em] uppercase text-dim/50 font-sans">
                    {step.num}
                  </span>
                  <span className="proc-accent font-serif italic text-accent text-lg leading-none font-bold">
                    {step.accent}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-5 max-w-2xl">
                  <h3 className="font-serif font-bold text-[clamp(1.55rem,2.5vw,2.1rem)] text-paper leading-snug">
                    {step.heading}
                  </h3>
                  <p className="text-dim/80 font-sans font-light text-[clamp(0.98rem,1.1vw,1.04rem)] leading-[1.9] max-w-[34ch]">
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
