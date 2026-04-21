"use client";

import MagneticButton from "@/components/ui/MagneticButton";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

function scramble(el: HTMLElement, final: string, duration = 1.1, delay = 0) {
  const len = final.length;
  const obj = { p: 0 };
  gsap.to(obj, {
    p: 1,
    duration,
    delay,
    ease: "power2.out",
    onUpdate() {
      const revealed = Math.floor(obj.p * len);
      let out = "";
      for (let i = 0; i < len; i++) {
        if (i < revealed || final[i] === " ") {
          out += final[i];
        } else {
          out +=
            SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
      }
      el.textContent = out;
    },
    onComplete() {
      el.textContent = final;
    },
  });
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLSpanElement>(null);
  /* Shapes */
  const outerRingRef = useRef<HTMLDivElement>(null);
  const midRingRef = useRef<HTMLDivElement>(null);
  const innerRingRef = useRef<HTMLDivElement>(null);
  const squareWrapRef = useRef<HTMLDivElement>(null);
  const squareRef = useRef<HTMLDivElement>(null);
  const orbitalRef = useRef<HTMLDivElement>(null);
  const svgLineRef = useRef<SVGLineElement>(null);
  const dot1Ref = useRef<HTMLDivElement>(null);
  const dot2Ref = useRef<HTMLDivElement>(null);
  const dot3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* Immediately set initial hidden states — before any useEffect delay */
    gsap.set(".hero-char", { y: "115%" });
    gsap.set(eyebrowRef.current, { opacity: 0 });
    gsap.set(subRef.current, { opacity: 0, y: 32 });
    gsap.set(ctaRef.current, { opacity: 0, y: 20 });
    gsap.set(yearRef.current, { opacity: 0 });
    gsap.set(scrollRef.current, { opacity: 0 });

    const ctx = gsap.context(() => {
      /* ── Continuous shape animations ── */
      gsap.to(outerRingRef.current, {
        rotation: 360,
        duration: 55,
        repeat: -1,
        ease: "none",
      });
      gsap.to(midRingRef.current, {
        rotation: -360,
        duration: 38,
        repeat: -1,
        ease: "none",
      });
      gsap.to(innerRingRef.current, {
        rotation: 360,
        duration: 22,
        repeat: -1,
        ease: "none",
      });
      gsap.to(orbitalRef.current, {
        rotation: 360,
        duration: 16,
        repeat: -1,
        ease: "none",
      });
      gsap.to(squareRef.current, {
        rotation: -360,
        duration: 30,
        repeat: -1,
        ease: "none",
      });

      /* Floating wrappers */
      gsap.to(squareWrapRef.current, {
        y: -22,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
      gsap.to(dot1Ref.current, {
        y: -14,
        x: 6,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
      gsap.to(dot2Ref.current, {
        y: 18,
        x: -8,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
      gsap.to(dot3Ref.current, {
        y: -10,
        x: 12,
        duration: 6.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      /* SVG diagonal line draw on load */
      gsap.to(svgLineRef.current, {
        attr: { strokeDashoffset: 0 },
        duration: 2.4,
        delay: 0.6,
        ease: "power3.inOut",
      });

      /* Shapes fade in */
      gsap.from(
        [outerRingRef.current, midRingRef.current, innerRingRef.current],
        {
          opacity: 0,
          scale: 0.7,
          duration: 2,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.2,
        },
      );
      gsap.from([squareWrapRef.current, orbitalRef.current], {
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.8,
      });
      gsap.from([dot1Ref.current, dot2Ref.current, dot3Ref.current], {
        opacity: 0,
        scale: 0,
        duration: 0.8,
        ease: "back.out(2)",
        stagger: 0.15,
        delay: 1.2,
      });

      /* ── Scramble eyebrow on load ── */
      if (eyebrowRef.current) {
        scramble(eyebrowRef.current, "Autonomous Wealth Stewardship", 1.4, 0.3);
      }

      const tl = gsap.timeline({ delay: 0.1 });

      /* Eyebrow fade-in (initially hidden via gsap.set outside context) */
      tl.to(
        eyebrowRef.current,
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        0.2,
      );

      tl.to(
        ".hero-char",
        {
          y: "0%",
          duration: 1.8,
          ease: "expo.out",
          stagger: { each: 0.022, from: "start" },
        },
        0.4,
      );

      tl.to(
        subRef.current,
        { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" },
        "-=1.0",
      );
      tl.to(
        ctaRef.current,
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        "-=0.8",
      );
      tl.to(yearRef.current, { opacity: 1, duration: 0.6 }, "-=0.5");
      tl.to(scrollRef.current, { opacity: 1, duration: 0.5 }, "-=0.4");

      /* ── Scroll velocity skew ── */
      let lastScrollY = 0;
      const skewSetter = gsap.quickSetter(".hero-skew-target", "skewY", "deg");
      const clamp = gsap.utils.clamp(-8, 8);

      ScrollTrigger.create({
        onUpdate(self) {
          const velocity = clamp(self.getVelocity() / 300);
          skewSetter(velocity);
          gsap.to(".hero-skew-target", {
            skewY: 0,
            duration: 0.8,
            ease: "power3",
            overwrite: "auto",
          });
          lastScrollY = self.scroll();
        },
      });
      void lastScrollY;
    }, sectionRef.current ?? undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="hero-glow absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Orbital ring system — top-right ── */}
      <div
        className="absolute -top-32 -right-48 pointer-events-none"
        aria-hidden="true"
      >
        <div
          ref={outerRingRef}
          className="w-[560px] h-[560px] rounded-full border border-border/35 will-transform"
        />
        <div
          ref={midRingRef}
          className="absolute top-[80px] left-[80px] w-[400px] h-[400px] rounded-full will-transform"
          style={{ border: "1px dashed rgba(0,102,255,0.25)" }}
        />
        <div
          ref={innerRingRef}
          className="absolute top-[160px] left-[160px] w-[240px] h-[240px] rounded-full will-transform"
          style={{ border: "1px solid rgba(234,234,234,0.12)" }}
        />
        {/* Cardinal tick marks */}
        {[0, 90, 180, 270].map((deg) => (
          <div
            key={deg}
            className="absolute w-px h-5 bg-border/60"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${deg}deg) translateX(-50%) translateY(-280px)`,
            }}
          />
        ))}
        <div className="absolute top-[248px] left-[248px] w-2 h-2 rounded-full bg-accent/50" />
      </div>

      {/* ── Floating wireframe square — left ── */}
      <div
        ref={squareWrapRef}
        className="absolute left-[6%] top-[38%] pointer-events-none will-transform"
        aria-hidden="true"
      >
        <div
          ref={squareRef}
          className="w-[72px] h-[72px] border border-accent/20 will-transform"
        />
        <div className="absolute inset-[12px] border border-border/30" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-1.5 h-1.5 rounded-full bg-accent/30"
        />
      </div>

      {/* ── Dot orbital cluster — bottom-left ── */}
      <div
        ref={orbitalRef}
        className="absolute bottom-[18%] left-[4%] w-[100px] h-[100px]
                      pointer-events-none will-transform"
        aria-hidden="true"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-1 h-1 rounded-full bg-dim/30"
        />
        {[0, 120, 240].map((deg) => (
          <div
            key={deg}
            className="absolute w-1 h-1 rounded-full bg-accent/50"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${deg}deg) translateX(42px) translateY(-50%)`,
            }}
          />
        ))}
        <div className="absolute inset-4 rounded-full border border-border/20" />
      </div>

      {/* ── Floating accent dots ── */}
      <div
        ref={dot1Ref}
        className="absolute top-[22%] left-[14%] w-2 h-2 rounded-full
                                    bg-accent/40 pointer-events-none will-transform"
        aria-hidden="true"
      />
      <div
        ref={dot2Ref}
        className="absolute top-[60%] right-[12%] w-1.5 h-1.5 rounded-full
                                    bg-paper/15 pointer-events-none will-transform"
        aria-hidden="true"
      />
      <div
        ref={dot3Ref}
        className="absolute top-[75%] left-[22%] w-1 h-1 rounded-full
                                    bg-accent/25 pointer-events-none will-transform"
        aria-hidden="true"
      />

      {/* ── SVG diagonal line ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <line
          ref={svgLineRef}
          x1="0%"
          y1="92%"
          x2="100%"
          y2="8%"
          stroke="rgba(234,234,234,0.04)"
          strokeWidth="1"
          strokeDasharray="2000"
          strokeDashoffset="2000"
        />
      </svg>

      {/* Top year badge */}
      <span
        ref={yearRef}
        className="absolute top-8 right-8 md:right-16 text-[9px] tracking-[0.4em]
                       uppercase text-dim/40 font-sans will-opacity"
      >
        Est. 2026
      </span>

      <div className="relative z-10 text-center max-w-6xl mx-auto w-full hero-skew-target will-transform">
        {/* Scramble eyebrow */}
        <p
          ref={eyebrowRef}
          className="text-[10px] tracking-[0.55em] uppercase text-dim font-sans mb-12 will-opacity"
        >
          Autonomous Wealth Stewardship
        </p>

        {/* Headline — client content */}
        <h1
          className="font-serif font-black leading-[0.9] tracking-tight text-paper"
          aria-label="THE FUTURE OF WEALTH GROWS WHILE YOU REST."
        >
          {[
            { text: "THE FUTURE OF", italic: false },
            { text: "WEALTH GROWS", italic: false },
            { text: "WHILE YOU REST.", italic: true },
          ].map(({ text, italic }) => (
            <div key={text} className="block overflow-hidden">
              <span
                className={`block text-[clamp(3rem,9.5vw,9.5rem)] will-transform whitespace-nowrap
                            ${italic ? "italic" : ""}`}
              >
                {text.split("").map((char, ci) => (
                  <span
                    key={ci}
                    className="overflow-hidden inline-block align-bottom leading-none"
                  >
                    <span className="hero-char inline-block will-transform leading-none">
                      {char === " " ? "\u00a0" : char}
                    </span>
                  </span>
                ))}
              </span>
            </div>
          ))}
        </h1>

        {/* Sub — client content */}
        <p
          ref={subRef}
          className="mt-10 text-dim font-sans font-light
                     text-[clamp(0.9rem,1.2vw,1.05rem)]
                     leading-relaxed max-w-lg mx-auto tracking-wide will-opacity"
        >
          Autonomous stewardship for those who refuse to choose
          <br className="hidden md:block" />
          between principle and performance.
        </p>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="mt-14 flex items-center justify-center gap-6 will-opacity"
        >
          <MagneticButton href="#access" arrow>
            Enter the Waitlist
          </MagneticButton>
          <a
            href="#philosophy"
            className="text-[9px] tracking-[0.4em] uppercase text-dim/50 font-sans
                       hover:text-dim transition-colors duration-300 hidden md:block"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 will-opacity"
      >
        <span className="text-[8px] tracking-[0.6em] uppercase text-dim/40 font-sans">
          Scroll
        </span>
        <div className="w-px h-16 bg-dim/15 relative overflow-hidden">
          <div className="absolute inset-0 bg-paper/50 animate-scroll-line" />
        </div>
      </div>
    </section>
  );
}
