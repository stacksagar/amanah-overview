"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

const ITEMS = [
  "Clear",
  "—",
  "Ethical",
  "—",
  "Simple",
  "—",
  "Transparent",
  "—",
  "Aligned",
  "—",
  "Always Working",
  "—",
];

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    /* Seamless infinite loop — GSAP horizontal tween */
    const anim = gsap.to(track, {
      xPercent: -50,
      ease: "none",
      duration: 28,
      repeat: -1,
    });

    /* Slow on hover */
    const wrap = track.parentElement;
    const slowDown = () => gsap.to(anim, { timeScale: 0.25, duration: 0.6 });
    const resume = () => gsap.to(anim, { timeScale: 1, duration: 0.6 });

    wrap?.addEventListener("mouseenter", slowDown);
    wrap?.addEventListener("mouseleave", resume);

    return () => {
      anim.kill();
      wrap?.removeEventListener("mouseenter", slowDown);
      wrap?.removeEventListener("mouseleave", resume);
    };
  }, []);

  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div
      className="border-y border-border py-6 md:py-7 overflow-hidden"
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className="flex items-center gap-0 whitespace-nowrap will-transform"
        style={{ width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`font-sans text-[10px] tracking-[0.36em] uppercase px-10 md:px-12
              ${
                item === "—"
                  ? "text-accent/60"
                  : "text-dim/60 hover:text-paper transition-colors duration-300"
              }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
