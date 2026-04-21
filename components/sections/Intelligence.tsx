"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const AGENTS = [
  {
    id: "01",
    name: "Macro",
    sub: "Perspective",
    desc: "Reads global economic shifts, interest rate cycles, and geopolitical signals before they price into the market.",
    role: "Global View",
  },
  {
    id: "02",
    name: "Fundamental",
    sub: "Depth",
    desc: "Excavates company financials, sector dynamics, earnings quality, and long-term value creation potential.",
    role: "Intrinsic Value",
  },
  {
    id: "03",
    name: "Technical",
    sub: "Precision",
    desc: "Identifies momentum, structure, and pattern across multiple timeframes with machine-grade consistency.",
    role: "Entry & Exit",
  },
  {
    id: "04",
    name: "Sentiment",
    sub: "Awareness",
    desc: "Monitors news velocity, crowd positioning, and market mood in real time — without emotional bias.",
    role: "Crowd Psychology",
  },
  {
    id: "05",
    name: "Risk",
    sub: "Vigilance",
    desc: "Guards against drawdown, tail risk, and correlation failures. Never sleeps. Never assumes safety.",
    role: "Capital Protection",
  },
  {
    id: "06",
    name: "Execution",
    sub: "Excellence",
    desc: "Times every trade with optimal precision to minimise slippage, market impact, and missed opportunity.",
    role: "Trade Quality",
  },
  {
    id: "07",
    name: "Compliance",
    sub: "Integrity",
    desc: "Monitors Shariah constraints, regulatory boundaries, and ethical rules. Every position validated before execution.",
    role: "Ethical Boundary",
  },
  {
    id: "08",
    name: "Quantitative",
    sub: "Modelling",
    desc: "Factor analysis, mathematical modeling, and statistical pattern extraction at a scale no human analyst can match.",
    role: "Factor Science",
  },
  {
    id: "09",
    name: "Allocation",
    sub: "Construction",
    desc: "Dynamic portfolio construction, position sizing, and rebalancing. Always optimal. Always systematic. Never emotional.",
    role: "Portfolio Design",
  },
];

/* Per-card 3D tilt on mouse move */
function useTilt(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(el, {
        rotateY: x * 14,
        rotateX: -y * 14,
        transformPerspective: 800,
        duration: 0.5,
        ease: "power2.out",
      });
    };
    const onLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.4)",
      });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [ref]);
}

function AgentCard({
  agent,
  index,
}: {
  agent: (typeof AGENTS)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  useTilt(cardRef);

  return (
    <div
      ref={cardRef}
      className="agent-card bg-card border border-border p-8 flex flex-col gap-5
                 group will-transform hover:border-accent/30 transition-colors duration-500"
      style={{ transformStyle: "preserve-3d" }}
      data-index={index}
    >
      <div className="flex items-center justify-between">
        <span className="text-[9px] tracking-[0.5em] uppercase text-dim/40 font-sans">
          {agent.id}
        </span>
        <span className="text-[8px] tracking-[0.3em] uppercase text-accent/50 font-sans">
          {agent.role}
        </span>
      </div>

      <div style={{ transform: "translateZ(20px)" }}>
        <h3 className="font-serif font-black text-2xl text-paper leading-none group-hover:italic transition-all duration-400">
          {agent.name}
        </h3>
        <p className="font-serif italic text-paper/30 text-sm mt-1">
          {agent.sub}
        </p>
      </div>

      <div className="h-px bg-border group-hover:bg-accent/30 transition-colors duration-500" />

      <p className="text-dim/65 font-sans font-light text-sm leading-relaxed flex-1">
        {agent.desc}
      </p>
    </div>
  );
}

export default function Intelligence() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Label */
      gsap.from(".intel-label", {
        opacity: 0,
        y: 16,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });

      /* Headline chars */
      gsap.from(".intel-char", {
        y: "110%",
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.022,
        scrollTrigger: { trigger: ".intel-headline", start: "top 82%" },
      });

      /* Sub */
      gsap.from(".intel-sub", {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".intel-headline", start: "top 75%" },
      });

      /* Cards — staggered reveal with scale + clip */
      ScrollTrigger.batch(".agent-card", {
        onEnter: (els) => {
          gsap.fromTo(
            els,
            { opacity: 0, y: 60, scale: 0.94 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: "power4.out",
              stagger: 0.1,
            },
          );
        },
        start: "top 88%",
      });
    }, sectionRef.current ?? undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="intelligence"
      className="px-6 md:px-16 lg:px-24 py-36 border-t border-border"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-20">
          <p className="intel-label text-[9px] tracking-[0.5em] uppercase text-dim font-sans mb-12">
            03 — A Council That Never Sleeps
          </p>

          <div
            className="intel-headline overflow-hidden mb-6"
            aria-label="NINE MINDS. ONE MANDATE."
          >
            <h2 className="font-serif font-black leading-tight tracking-tight text-paper">
              {["NINE MINDS.", "ONE MANDATE."].map((line, li) => (
                <div key={line} className="block overflow-hidden">
                  <span
                    className={`block text-[clamp(2.6rem,6.5vw,7rem)] will-transform ${li === 1 ? "italic text-paper/50" : ""}`}
                  >
                    {line.split("").map((char, ci) => (
                      <span
                        key={ci}
                        className="overflow-hidden inline-block align-bottom"
                      >
                        <span className="intel-char inline-block will-transform">
                          {char === " " ? "\u00a0" : char}
                        </span>
                      </span>
                    ))}
                  </span>
                </div>
              ))}
            </h2>
          </div>

          <p className="intel-sub text-dim font-sans font-light max-w-md leading-loose text-sm will-opacity">
            Nine specialised intelligences — each devoted to a distinct domain
            of analysis, each operating in concert, each accountable. They
            deliberate. They disagree. They consensus. You wake to transparency.
          </p>
        </div>

        {/* 9-agent grid with 3D tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:grid-cols-3">
          {AGENTS.map((agent, i) => (
            <AgentCard key={agent.id} agent={agent} index={i} />
          ))}
        </div>

        {/* Bottom quote — client content */}
        <div
          className="mt-20 pt-12 border-t border-border flex flex-col md:flex-row
                        items-start md:items-end justify-between gap-8"
        >
          <p className="font-serif italic text-[clamp(1.1rem,2vw,1.8rem)] text-paper/60 max-w-2xl leading-snug">
            &ldquo;Nine minds. One mandate. Zero compromise. Your wealth, tended
            around the clock.&rdquo;
          </p>
          <p className="text-[9px] tracking-[0.4em] uppercase text-dim/40 font-sans shrink-0">
            Amanah — Council Protocol
          </p>
        </div>
      </div>
    </section>
  );
}
