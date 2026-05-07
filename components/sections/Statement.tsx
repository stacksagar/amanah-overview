"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Rotating diamond shape */
      gsap.to(shapeRef.current, {
        rotation: 360,
        duration: 25,
        repeat: -1,
        ease: "none",
      });

      /* Scale shape on scroll entry */
      gsap.fromTo(
        shapeRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      );

      /* Line 1: clip-path wipe right */
      gsap.fromTo(
        line1Ref.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        },
      );

      /* Line 2: clip-path wipe left */
      gsap.fromTo(
        line2Ref.current,
        { clipPath: "inset(0 0 0 100%)" },
        {
          clipPath: "inset(0 0 0 0%)",
          duration: 1.4,
          ease: "power4.inOut",
          delay: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        },
      );

      /* Attribution */
      gsap.from(".stmt-attr", {
        opacity: 0,
        y: 12,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });
    }, sectionRef.current ?? undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="founders"
      className="relative min-h-auto md:min-h-[70vh] flex flex-col items-center justify-center
                 px-6 md:px-16 lg:px-24 py-28 md:py-44 border-t border-border overflow-hidden"
    >
      {/* Decorative diamond shape */}
      <div
        ref={shapeRef}
        className="absolute right-[8%] top-1/2 -translate-y-1/2 w-48 h-48 hidden md:block
                   border border-accent/20 will-transform opacity-0"
        style={{ transform: "translateY(-50%) rotate(45deg)" }}
        aria-hidden="true"
      >
        <div className="absolute inset-4 border border-border/40" />
        <div
          className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2
                        rounded-full bg-accent/40"
        />
      </div>

      {/* Second smaller diamond */}
      <div
        className="absolute left-[6%] bottom-[15%] w-20 h-20 border border-border/20 hidden md:block
                   pointer-events-none"
        style={{ transform: "rotate(45deg)" }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto text-center">
        <p className="stmt-attr mb-10 md:mb-16 text-[10px] tracking-[0.42em] md:tracking-[0.5em] uppercase text-dim/50 font-sans">
          11 — The Founders
        </p>
        <div
          ref={line1Ref}
          className="overflow-hidden mb-4 md:mb-6"
          style={{ clipPath: "inset(0 100% 0 0)" }}
        >
          <p
            className="font-serif font-black text-[clamp(2.5rem,7vw,7rem)] leading-[1.2]
                        tracking-tight text-paper"
          >
            The
          </p>
        </div>
        <div
          ref={line2Ref}
          className="overflow-hidden mb-10 md:mb-14"
          style={{ clipPath: "inset(0 0 0 100%)" }}
        >
          <p
            className="font-serif font-black italic text-[clamp(2.5rem,7vw,7rem)] leading-[1.2]
                        tracking-tight text-accent"
          >
            Founders.
          </p>
        </div>
        <div
          className="overflow-hidden"
          style={{ clipPath: "inset(0 100% 0 0)" }}
          ref={(el) => {
            if (!el) return;
            gsap.fromTo(
              el,
              { clipPath: "inset(0 100% 0 0)" },
              {
                clipPath: "inset(0 0% 0 0)",
                duration: 1.4,
                ease: "power4.inOut",
                delay: 0.3,
                scrollTrigger: { trigger: el, start: "top 80%" },
              },
            );
          }}
        >
          <p
            className="font-serif text-[clamp(2rem,5vw,5rem)] leading-[0.95]
                        tracking-tight text-paper/40"
          >
            Nawah Wealth was founded by Aziz Ahmed and Barry Lee in London,
            2026.
          </p>
        </div>

        <div className="stmt-attr mt-12 md:mt-16 max-w-3xl mx-auto space-y-6 text-center">
          <p className="text-dim/90 font-sans font-light text-base md:text-lg leading-relaxed">
            We built Nawah because we believe wealth stewardship should be
            transparent, ethical, and truly aligned with those it serves. We are
            building the tool we wish existed when we began our own investing
            journeys. We are building it for you.
          </p>
        </div>
      </div>
    </section>
  );
}
