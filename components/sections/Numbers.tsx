"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  {
    prefix: "$",
    value: 24,
    suffix: "T+",
    label: "Global Islamic Finance Market",
    decimals: 0,
  },
  {
    prefix: "",
    value: 100,
    suffix: "%",
    label: "Decision audit trail — every action logged",
    decimals: 0,
  },
  {
    prefix: "",
    value: 0,
    suffix: "%",
    label: "Management fees. We earn only when you do.",
    decimals: 0,
  },
  {
    prefix: "",
    value: 9,
    suffix: "",
    label: "Specialised AI agents deliberating 24/7",
    decimals: 0,
  },
];

export default function Numbers() {
  const sectionRef = useRef<HTMLElement>(null);
  const arcRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* SVG arc draw */
      if (arcRef.current) {
        const circ = 2 * Math.PI * 90;
        gsap.fromTo(
          arcRef.current,
          { attr: { strokeDashoffset: circ } },
          {
            attr: { strokeDashoffset: circ * 0.25 },
            duration: 2.2,
            ease: "power3.inOut",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          },
        );
      }

      /* Label */
      gsap.from(".nums-label", {
        opacity: 0,
        y: 14,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });

      /* Each stat: line draw + counter + label */
      const cards =
        sectionRef.current?.querySelectorAll<HTMLElement>(".stat-card");
      cards?.forEach((card, i) => {
        /* Line draw */
        gsap.from(card.querySelector(".stat-line"), {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.8,
          delay: i * 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        });

        /* Number count-up */
        const numEl = card.querySelector<HTMLElement>(".stat-num");
        const stat = STATS[i];
        const counter = { val: 0 };

        gsap.to(counter, {
          val: stat.value,
          duration: 2.2,
          delay: i * 0.14,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
          onUpdate() {
            if (numEl) {
              numEl.textContent =
                stat.prefix +
                (stat.decimals > 0
                  ? counter.val.toFixed(stat.decimals)
                  : Math.round(counter.val).toString()) +
                stat.suffix;
            }
          },
          onComplete() {
            if (numEl)
              numEl.textContent = stat.prefix + stat.value + stat.suffix;
          },
        });

        /* Label fade */
        gsap.from(card.querySelector(".stat-label"), {
          opacity: 0,
          y: 12,
          duration: 0.8,
          delay: 0.3 + i * 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        });
      });
    }, sectionRef.current ?? undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="numbers"
      className="px-6 md:px-16 lg:px-24 py-36 border-t border-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top row with SVG arc decoration */}
        <div className="flex items-start justify-between mb-20">
          <p className="nums-label text-[9px] tracking-[0.5em] uppercase text-dim font-sans">
            By the Numbers
          </p>
          {/* Animated arc */}
          <div
            className="relative w-28 h-28 opacity-30 shrink-0"
            aria-hidden="true"
          >
            <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="rgba(234,234,234,0.1)"
                strokeWidth="1"
              />
              <circle
                ref={arcRef}
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="rgba(0,102,255,0.6)"
                strokeWidth="1.5"
                strokeDasharray={`${2 * Math.PI * 90}`}
                strokeDashoffset={`${2 * Math.PI * 90}`}
                strokeLinecap="round"
              />
              <circle cx="100" cy="100" r="4" fill="rgba(0,102,255,0.8)" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="stat-card flex flex-col gap-4">
              <div
                className="stat-line h-px bg-accent/40 w-full"
                style={{ transformOrigin: "left center" }}
              />
              <div className="stat-num font-serif font-black text-[clamp(3.5rem,6vw,5.5rem)] leading-none text-paper will-transform">
                {stat.prefix}
                {stat.value}
                {stat.suffix}
              </div>
              <p className="stat-label text-dim/70 font-sans font-light text-sm leading-relaxed max-w-[18ch]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
