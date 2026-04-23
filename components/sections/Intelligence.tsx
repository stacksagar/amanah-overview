"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const AGENTS = [
  {
    id: "01",
    title: "Global View",
    desc: "Reads global economic shifts, interest rate cycles, and geopolitical signals before they price into the market.",
    palette: "from-[#0f172a] via-[#1d4ed8] to-[#60a5fa]",
  },
  {
    id: "02",
    title: "Intrinsic Value",
    desc: "Excavates company financials, sector dynamics, earnings quality, and long-term value creation potential.",
    palette: "from-[#111827] via-[#0f766e] to-[#5eead4]",
  },
  {
    id: "03",
    title: "Entry and Exit",
    desc: "Identifies momentum, structure, and pattern across multiple timeframes with machine-grade consistency.",
    palette: "from-[#1f2937] via-[#7c3aed] to-[#c4b5fd]",
  },
  {
    id: "04",
    title: "Crowd Psychology",
    desc: "Monitors news velocity, crowd positioning, and market mood in real time — without emotional bias.",
    palette: "from-[#172554] via-[#2563eb] to-[#93c5fd]",
  },
  {
    id: "05",
    title: "Capital Protection",
    desc: "Guards against drawdown, tail risk, and correlation failures. Never sleeps. Never assumes safety.",
    palette: "from-[#111827] via-[#7f1d1d] to-[#f87171]",
  },
  {
    id: "06",
    title: "Trade Quality",
    desc: "Times every trade with optimal precision to minimise slippage, market impact, and missed opportunity.",
    palette: "from-[#0f172a] via-[#334155] to-[#cbd5e1]",
  },
  {
    id: "07",
    title: "Ethical Boundary",
    desc: "Screens every position against Sharia-informed ethical frameworks before execution. Debt ratios. Business activity. Interest exposure. Your principles, hard-coded. No exceptions. No overrides.",
    palette: "from-[#052e16] via-[#15803d] to-[#86efac]",
  },
  {
    id: "08",
    title: "Quantitative Edge",
    desc: "Mathematical modeling, statistical pattern extraction, and factor analysis at scale no human can match.",
    palette: "from-[#13151a] via-[#4338ca] to-[#818cf8]",
  },
  {
    id: "09",
    title: "Portfolio Design",
    desc: "Dynamic portfolio construction, position sizing, and rebalancing. Always optimal. Always systematic. Never emotional.",
    palette: "from-[#1a1a1a] via-[#0f766e] to-[#67e8f9]",
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
}: Readonly<{
  agent: (typeof AGENTS)[0];
}>) {
  const cardRef = useRef<HTMLDivElement>(null);
  useTilt(cardRef);

  return (
    <div
      ref={cardRef}
      className="agent-card bg-card border border-border px-7 py-8 md:px-8 md:py-9 flex flex-col gap-6
                 group will-transform hover:border-accent/30 transition-colors duration-500"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="flex items-start gap-5">
        <div className="flex items-center gap-4">
          <div
            className={`relative w-18 h-22 rounded-[1.6rem] bg-linear-to-b ${agent.palette} overflow-hidden border border-paper/10 shrink-0`}
            style={{ transform: "translateZ(22px)" }}
            aria-hidden="true"
          >
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-paper/80" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-10 rounded-t-[999px] bg-paper/75" />
            <div className="absolute inset-x-3 top-2 h-px bg-paper/30" />
          </div>

          <div style={{ transform: "translateZ(16px)" }}>
            <p className="text-[9px] tracking-[0.4em] uppercase text-dim/40 font-sans mb-2">
              Agent {agent.id}
            </p>
            <h3 className="font-serif font-black text-[1.55rem] text-paper leading-none group-hover:italic transition-all duration-400">
              {agent.title}
            </h3>
          </div>
        </div>
      </div>

      <div style={{ transform: "translateZ(18px)" }} className="space-y-4">
        <p className="text-dim/72 font-sans font-light text-sm md:text-[0.98rem] leading-[1.85] flex-1">
          {agent.desc}
        </p>
        <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-accent/65">
          AI Persona — Not Human
        </p>
      </div>
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
      className="px-6 md:px-16 lg:px-24 py-40 md:py-44 border-t border-border"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-24">
          <p className="intel-label text-[9px] tracking-[0.5em] uppercase text-dim font-sans mb-14">
            03 — A Council That Never Sleeps
          </p>

          <div
            className="intel-headline overflow-hidden mb-8"
            aria-label="A Council That Never Sleeps"
          >
            <h2 className="font-serif font-black leading-tight tracking-tight text-paper">
              {["A Council That", "Never Sleeps."].map((line, li) => (
                <div key={line} className="block overflow-hidden">
                  <span
                    className={`block text-[clamp(2.8rem,6.4vw,6.8rem)] will-transform ${li === 1 ? "italic text-paper/52" : ""}`}
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

          <p className="intel-sub text-dim font-sans font-light max-w-2xl leading-[1.9] text-sm md:text-base will-opacity">
            Nine specialised intelligences — each devoted to a distinct domain
            of analysis, each operating in concert, each accountable. They
            deliberate. They disagree. They consensus. You wake to transparency.
          </p>
        </div>

        {/* 9-agent grid with 3D tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 xl:grid-cols-3">
          {AGENTS.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
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
            Nawah — Council Protocol
          </p>
        </div>
      </div>
    </section>
  );
}
