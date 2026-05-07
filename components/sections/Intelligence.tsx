"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const AGENTS = [
  {
    id: "01",
    title: "Economic Landscape",
    desc: "Reads the economic landscape — interest rates, currencies, geopolitical shifts before they move markets.",
    palette: "from-[#0f172a] via-[#1d4ed8] to-[#60a5fa]",
  },
  {
    id: "02",
    title: "Company Fundamentals",
    desc: "Excavates company fundamentals — financials, earnings, competitive position finding value before the crowd.",
    palette: "from-[#111827] via-[#0f766e] to-[#5eead4]",
  },
  {
    id: "03",
    title: "Momentum and Structure",
    desc: "Identifies momentum and structure across timeframes — patterns, breakouts, volume confirmation spotting opportunity before it breaks.",
    palette: "from-[#1f2937] via-[#7c3aed] to-[#c4b5fd]",
  },
  {
    id: "04",
    title: "Market Mood",
    desc: "Monitors the mood of markets — news velocity, crowd positioning, sentiment extremes seeing fear and greed without feeling them.",
    palette: "from-[#172554] via-[#2563eb] to-[#93c5fd]",
  },
  {
    id: "05",
    title: "Safety Guard",
    desc: "Guards your safety — drawdown limits, tail risk, correlation traps — never assuming safety, never sleeping.",
    palette: "from-[#111827] via-[#7f1d1d] to-[#f87171]",
  },
  {
    id: "06",
    title: "Timing and Precision",
    desc: "Analyses timing and precision — entry windows, liquidity, impact estimates when precision matters.",
    palette: "from-[#0f172a] via-[#334155] to-[#cbd5e1]",
  },
  {
    id: "07",
    title: "Highest Standard",
    desc: "Holds the highest standard — screening every opportunity against AAOIFI-informed ethical frameworks. Debt ratios below 33 percent. Interest income below 5 percent. Business activity verification. Your principles, hard-coded. No exceptions. No overrides. No excuses.",
    palette: "from-[#052e16] via-[#15803d] to-[#86efac]",
  },
  {
    id: "08",
    title: "Mathematical Edge",
    desc: "Applies mathematical edge — statistical modeling, factor extraction, quantitative analysis the edge institutions pay millions for.",
    palette: "from-[#13151a] via-[#4338ca] to-[#818cf8]",
  },
  {
    id: "09",
    title: "Optimal Structure",
    desc: "Engineers optimal structure — allocation, sizing, rebalancing — systematic discipline, never emotional.",
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
      className="agent-card h-full bg-card border border-border px-7 py-8 md:px-8 md:py-9 flex flex-col gap-6
                 group will-transform hover:border-accent/30 transition-colors duration-500"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
        <div
          className={`relative w-18 h-22 rounded-[1.6rem] bg-linear-to-b ${agent.palette} overflow-hidden border border-paper/10 shrink-0`}
          style={{ transform: "translateZ(22px)" }}
          aria-hidden="true"
        >
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-paper/80" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-10 rounded-t-[999px] bg-paper/75" />
          <div className="absolute inset-x-3 top-2 h-px bg-paper/30" />
        </div>

        <div style={{ transform: "translateZ(16px)" }} className="min-w-0">
          <p className="text-[9px] tracking-[0.4em] uppercase text-dim/40 font-sans mb-2">
            Agent {agent.id}
          </p>
          <h3 className="font-serif font-black text-[1.45rem] md:text-[1.55rem] text-paper leading-tight group-hover:italic transition-all duration-400">
            {agent.title}
          </h3>
        </div>
      </div>

      <div
        style={{ transform: "translateZ(18px)" }}
        className="space-y-4 flex-1"
      >
        <p className="text-dim/80 font-sans font-light text-sm md:text-[0.98rem] leading-[1.85]">
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
      className="px-6 md:px-16 lg:px-24 py-28 md:py-44 border-t border-border"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <p className="intel-label text-[10px] tracking-[0.42em] md:tracking-[0.5em] uppercase text-dim font-sans mb-10 md:mb-14">
            03 — The Proof
          </p>

          <div
            className="intel-headline overflow-hidden mb-8"
            aria-label="How the Council Deliberates For You"
          >
            <h2 className="font-serif font-black leading-tight tracking-tight text-paper">
              {["How the Council", "Deliberates For You"].map((line, li) => (
                <div key={line} className="block overflow-hidden">
                  <span
                    className={`block text-[clamp(2.8rem,6.4vw,6.8rem)] will-transform ${li === 1 ? "italic text-accent" : ""}`}
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

          <p className="intel-sub text-dim/85 font-sans font-light max-w-2xl leading-[1.8] text-sm md:text-base will-opacity">
            Behind every Signal Card sits a council of autonomous specialists.
            Each devoted to a distinct domain. Each operating in concert. Each
            accountable.
          </p>
        </div>

        {/* 9-agent grid with 3D tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7 xl:grid-cols-3">
          {AGENTS.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>

        {/* Bottom quote — client content */}
        <div
          className="mt-14 md:mt-20 pt-8 md:pt-12 border-t border-border flex flex-col md:flex-row
                        items-start md:items-end justify-between gap-6 md:gap-8"
        >
          <p className="font-serif italic text-[clamp(1.1rem,2vw,1.8rem)] text-paper/60 max-w-2xl leading-snug">
            &ldquo;A council of minds. One unified mandate. Zero compromise.
            Your research, delivered every morning before you check your
            phone.&rdquo;
          </p>
          <p className="text-[10px] tracking-[0.32em] uppercase text-dim/40 font-sans shrink-0">
            Nawah — Council Deliberation
          </p>
        </div>
      </div>
    </section>
  );
}
