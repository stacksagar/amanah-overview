"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    title: "Sharia-Compliant Signal Cards",
    desc: "Every opportunity arrives as a complete research brief: opportunity score out of 10, council consensus level, full Sharia screening with debt ratios and business activity breakdown, technical summary, fundamental summary, risk assessment, timing guidance, and confidence interval.",
  },
  {
    title: "Morning Briefing",
    desc: "A narrative report delivered daily at your chosen time. Clear English. No jargon. No hype. Just what the council found, why they found it, and what they considered before reaching consensus.",
  },
  {
    title: "Watch Mode",
    desc: "Activate before sleep. The council monitors through the night. New intelligence waiting when you wake.",
  },
  {
    title: "Interactive AI Chat",
    desc: "Ask anything. What does the council think about Tesla? Why was Apple rejected? Your pocket research assistant, always available.",
  },
  {
    title: "WhatsApp Alerts",
    desc: "Signal Cards and briefings delivered straight to your WhatsApp.",
  },
  {
    title: "Portfolio Tracking",
    desc: "Log your trades from any broker or track your learning journey if you are not yet trading.",
  },
  {
    title: "On-Demand Research Reports",
    desc: "Request deep-dives on any stock, sector, or theme. Full council analysis in 60 seconds.",
  },
  {
    title: "Zakat and Purification Dashboard",
    desc: "Automatic zakat liability calculation. Nisab threshold tracking. Purification amounts from screened opportunities. One-click export for charitable records.",
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Label */
      gsap.from(".feat-label", {
        opacity: 0,
        y: 14,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });

      /* Headline */
      gsap.from(".feat-char", {
        y: "110%",
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.022,
        scrollTrigger: { trigger: ".feat-headline", start: "top 82%" },
      });

      /* Feature cards stagger */
      gsap.from(".feat-card", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".feat-grid", start: "top 80%" },
      });
    }, sectionRef.current ?? undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="px-6 md:px-16 lg:px-24 py-28 md:py-44 border-t border-border"
    >
      <div className="max-w-7xl mx-auto">
        <p className="feat-label text-[10px] tracking-[0.42em] md:tracking-[0.5em] uppercase text-dim font-sans mb-12 md:mb-20">
          05 — What You Receive
        </p>

        <div
          className="feat-headline overflow-hidden mb-14 md:mb-22"
          aria-label="What You Receive"
        >
          <h2 className="font-serif font-black leading-tight tracking-tight text-paper">
            {["What You", "Receive"].map((line, li) => (
              <div key={line} className="block overflow-hidden">
                <span
                  className={`block text-[clamp(2.8rem,6.8vw,6.6rem)] will-transform ${li === 1 ? "italic text-accent" : ""}`}
                >
                  {line.split("").map((char, ci) => (
                    <span
                      key={ci}
                      className="overflow-hidden inline-block align-bottom"
                    >
                      <span className="feat-char inline-block will-transform">
                        {char === " " ? "\u00a0" : char}
                      </span>
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </h2>
        </div>

        <div className="feat-grid grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {FEATURES.map((feature, index) => (
            <div
              key={feature.title}
              className="feat-card bg-card border border-border px-8 py-8 md:px-10 md:py-10 hover:border-accent/30 transition-colors duration-500"
            >
              <h3 className="font-serif font-bold text-[clamp(1.35rem,2vw,1.8rem)] text-paper leading-snug mb-4">
                Feature 0{index + 1} — {feature.title}
              </h3>
              <p className="text-dim/80 font-sans font-light text-sm md:text-[0.98rem] leading-[1.85]">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
