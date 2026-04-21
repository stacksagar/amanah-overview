"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const AGENTS = [
  {
    id: "01",
    name: "Mara Cole",
    sub: "Macro Agent",
    desc: "Watches rates, markets, and big world changes.",
    role: "Sees the big picture",
    bio: "Calm, wide view, early signals.",
    palette: "from-[#0f172a] via-[#1d4ed8] to-[#60a5fa]",
  },
  {
    id: "02",
    name: "Omar Hale",
    sub: "Fundamental Agent",
    desc: "Checks if a business is strong, healthy, and worth owning.",
    role: "Checks business quality",
    bio: "Looks past hype and into the numbers.",
    palette: "from-[#111827] via-[#0f766e] to-[#5eead4]",
  },
  {
    id: "03",
    name: "Lina Voss",
    sub: "Technical Agent",
    desc: "Finds timing, trend, and price patterns.",
    role: "Finds entry timing",
    bio: "Focused on structure and clean entries.",
    palette: "from-[#1f2937] via-[#7c3aed] to-[#c4b5fd]",
  },
  {
    id: "04",
    name: "Ava Noor",
    sub: "Sentiment Agent",
    desc: "Tracks market mood, headlines, and crowd behaviour.",
    role: "Reads market mood",
    bio: "Knows when noise starts moving price.",
    palette: "from-[#172554] via-[#2563eb] to-[#93c5fd]",
  },
  {
    id: "05",
    name: "Yusuf Ward",
    sub: "Risk Agent",
    desc: "Looks for danger before small loss becomes big loss.",
    role: "Protects capital",
    bio: "Careful, strict, never relaxed.",
    palette: "from-[#111827] via-[#7f1d1d] to-[#f87171]",
  },
  {
    id: "06",
    name: "Rey Mercer",
    sub: "Execution Agent",
    desc: "Places trades with speed, care, and less slippage.",
    role: "Executes the trade",
    bio: "Built for clean and careful action.",
    palette: "from-[#0f172a] via-[#334155] to-[#cbd5e1]",
  },
  {
    id: "07",
    name: "Sami Rahn",
    sub: "Ethics Agent",
    desc: "Checks that every decision stays inside your ethical rules.",
    role: "Protects the rules",
    bio: "Nothing moves without approval here.",
    palette: "from-[#052e16] via-[#15803d] to-[#86efac]",
  },
  {
    id: "08",
    name: "Nadia Pike",
    sub: "Quant Agent",
    desc: "Tests patterns, models, and repeat signals.",
    role: "Tests the data",
    bio: "Finds what repeats and what breaks.",
    palette: "from-[#13151a] via-[#4338ca] to-[#818cf8]",
  },
  {
    id: "09",
    name: "Elias Stone",
    sub: "Allocation Agent",
    desc: "Decides size, balance, and where capital should go.",
    role: "Builds the portfolio",
    bio: "Keeps the whole system balanced.",
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
      className="agent-card bg-card border border-border px-11 py-12 md:px-14 md:py-16 flex flex-col gap-11 md:gap-12
                 group will-transform hover:border-accent/30 transition-colors duration-500"
      style={{ transformStyle: "preserve-3d" }}
      data-index={index}
    >
      <div className="flex items-start justify-between gap-8 md:gap-9">
        <div className="flex items-center gap-7 md:gap-8">
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
            <p className="text-[9px] tracking-[0.4em] uppercase text-dim/40 font-sans mb-5">
              {agent.id}
            </p>
            <h3 className="font-serif font-black text-[1.55rem] text-paper leading-none group-hover:italic transition-all duration-400">
              {agent.name}
            </h3>
            <p className="font-sans text-[11px] tracking-[0.28em] uppercase text-accent/65 mt-6">
              {agent.sub}
            </p>
          </div>
        </div>

        <span className="text-[8px] tracking-[0.28em] uppercase text-dim/40 font-sans text-right max-w-[12ch] leading-relaxed">
          {agent.role}
        </span>
      </div>

      <div
        style={{ transform: "translateZ(18px)" }}
        className="space-y-7 md:space-y-8"
      >
        <p className="text-paper/70 font-sans font-light text-sm md:text-[0.96rem] leading-relaxed">
          {agent.bio}
        </p>

        <div className="h-px bg-border group-hover:bg-accent/30 transition-colors duration-500" />

        <p className="text-dim/72 font-sans font-light text-sm md:text-[0.98rem] leading-[1.85] flex-1">
          {agent.desc}
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
      className="px-6 md:px-16 lg:px-24 py-44 md:py-52 border-t border-border"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-36 md:mb-40">
          <p className="intel-label text-[9px] tracking-[0.5em] uppercase text-dim font-sans mb-20 md:mb-22">
            03 — A Council That Never Sleeps
          </p>

          <div className="mb-18 md:mb-20">
            <div
              className="intel-headline overflow-hidden"
              aria-label="Meet the Nine Agents."
            >
              <h2 className="font-serif font-black leading-[0.84] tracking-tight text-paper">
                {["Meet the", "Nine Agents."].map((line, li) => (
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
          </div>

          <p className="intel-sub text-dim font-sans font-light max-w-2xl leading-[1.95] text-sm md:text-base will-opacity">
            Each agent has one job. Together, they help Nawah make clear and
            disciplined decisions.
          </p>
        </div>

        {/* 9-agent grid with 3D tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 xl:grid-cols-3">
          {AGENTS.map((agent, i) => (
            <AgentCard key={agent.id} agent={agent} index={i} />
          ))}
        </div>

        {/* Bottom quote — client content */}
        <div
          className="mt-28 pt-16 md:pt-18 border-t border-border flex flex-col md:flex-row
                        items-start md:items-end justify-between gap-12"
        >
          <p className="font-serif italic text-[clamp(1.1rem,2vw,1.8rem)] text-paper/60 max-w-2xl leading-snug">
            &ldquo;Nine agents. One system. One goal: manage wealth with
            care.&rdquo;
          </p>
          <p className="text-[9px] tracking-[0.4em] uppercase text-dim/40 font-sans shrink-0">
            Nawah — Council Protocol
          </p>
        </div>
      </div>
    </section>
  );
}
