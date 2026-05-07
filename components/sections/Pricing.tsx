"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const TIERS = [
  {
    name: "Nawah Seed",
    price: "£9.99",
    period: "per month",
    features: [
      "3 Signal Cards per week",
      "Basic AI chat",
      "Morning briefing",
      "Sharia screening tool",
    ],
  },
  {
    name: "Nawah Growth",
    price: "£29.99",
    period: "per month",
    features: [
      "Unlimited Signal Cards",
      "Full AI chat",
      "WhatsApp alerts",
      "Portfolio tracking",
      "Weekly sector reports",
    ],
  },
  {
    name: "Nawah Harvest",
    price: "£79.99",
    period: "per month",
    features: [
      "Everything in Growth",
      "Unlimited research reports",
      "Priority signal access (15 min advantage)",
      "Full zakat dashboard",
    ],
  },
  {
    name: "Nawah Founding",
    price: "£199.99",
    period: "per month",
    badge: "Limited to 100 members only",
    features: [
      "Everything in Harvest",
      "Lifetime rate lock",
      "Early feature access",
      "Direct founder channel",
      "Co-creation input",
    ],
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Label */
      gsap.from(".pricing-label", {
        opacity: 0,
        y: 14,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });

      /* Headline */
      gsap.from(".pricing-headline", {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      /* Tier cards stagger */
      gsap.from(".pricing-tier", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power4.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".pricing-grid", start: "top 78%" },
      });
    }, sectionRef.current ?? undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="px-6 md:px-16 lg:px-24 py-28 md:py-44 border-t border-border"
    >
      <div className="max-w-7xl mx-auto">
        <p className="pricing-label text-[10px] tracking-[0.42em] md:tracking-[0.5em] uppercase text-dim font-sans mb-12 md:mb-20">
          08 — Membership Tiers
        </p>

        <h2 className="pricing-headline font-serif font-black text-[clamp(2.8rem,6.8vw,6.6rem)] leading-tight tracking-tight text-paper mb-14 md:mb-22">
          Choose Your Council
        </h2>

        <div className="pricing-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {TIERS.map((tier, index) => (
            <div
              key={tier.name}
              className={`pricing-tier bg-card border border-border px-5 md:px-7 py-6 md:py-8 hover:border-accent/30 transition-colors duration-500 flex flex-col ${
                index === 3 ? "border-accent/50" : ""
              }`}
            >
              {tier.badge && (
                <p className="text-[8px] tracking-[0.25em] uppercase text-paper/70 font-sans mb-3 leading-tight">
                  {tier.badge}
                </p>
              )}
              <h3 className="font-serif font-black text-[clamp(1.3rem,2.3vw,1.8rem)] text-paper leading-tight mb-2">
                {tier.name}
              </h3>
              <div className="mb-5">
                <span className="font-serif font-black text-[clamp(2.2rem,4.5vw,3.5rem)] leading-none text-paper">
                  {tier.price}
                </span>
                <span className="text-dim/60 font-sans font-light text-xs md:text-sm ml-1.5">
                  {tier.period}
                </span>
              </div>
              <ul className="space-y-2.5 flex-1">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-dim/80 font-sans font-light text-xs md:text-sm leading-relaxed flex items-start gap-2 break-words"
                  >
                    <span className="text-paper/60 mt-0.5 shrink-0">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
