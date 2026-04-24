"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

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
  const [email, setEmail] = useState("");
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

  const handleEarlyAccess = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = email.trim();
    if (typeof globalThis.window !== "undefined" && value) {
      globalThis.window.sessionStorage.setItem("nawah_waitlist_email", value);
    }
    document
      .getElementById("access")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    /* Immediately set initial hidden states — before any useEffect delay */
    const heroLines = gsap.utils.toArray<HTMLElement>(".hero-line");
    if (heroLines.length) {
      gsap.set(heroLines, { y: "115%" });
    }
    if (eyebrowRef.current) {
      gsap.set(eyebrowRef.current, { opacity: 0 });
    }
    if (subRef.current) {
      gsap.set(subRef.current, { opacity: 0, y: 32 });
    }
    if (ctaRef.current) {
      gsap.set(ctaRef.current, { opacity: 0, y: 20 });
    }
    if (scrollRef.current) {
      gsap.set(scrollRef.current, { opacity: 0 });
    }

    const ctx = gsap.context(() => {
      /* ── Continuous shape animations ── */
      if (outerRingRef.current) {
        gsap.to(outerRingRef.current, {
          rotation: 360,
          duration: 55,
          repeat: -1,
          ease: "none",
        });
      }
      if (midRingRef.current) {
        gsap.to(midRingRef.current, {
          rotation: -360,
          duration: 38,
          repeat: -1,
          ease: "none",
        });
      }
      if (innerRingRef.current) {
        gsap.to(innerRingRef.current, {
          rotation: 360,
          duration: 22,
          repeat: -1,
          ease: "none",
        });
      }
      if (orbitalRef.current) {
        gsap.to(orbitalRef.current, {
          rotation: 360,
          duration: 16,
          repeat: -1,
          ease: "none",
        });
      }
      if (squareRef.current) {
        gsap.to(squareRef.current, {
          rotation: -360,
          duration: 30,
          repeat: -1,
          ease: "none",
        });
      }

      /* Floating wrappers */
      if (squareWrapRef.current) {
        gsap.to(squareWrapRef.current, {
          y: -22,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }
      if (dot1Ref.current) {
        gsap.to(dot1Ref.current, {
          y: -14,
          x: 6,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }
      if (dot2Ref.current) {
        gsap.to(dot2Ref.current, {
          y: 18,
          x: -8,
          duration: 4.8,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }
      if (dot3Ref.current) {
        gsap.to(dot3Ref.current, {
          y: -10,
          x: 12,
          duration: 6.2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }

      /* SVG diagonal line draw on load */
      if (svgLineRef.current) {
        gsap.to(svgLineRef.current, {
          attr: { strokeDashoffset: 0 },
          duration: 2.4,
          delay: 0.6,
          ease: "power3.inOut",
        });
      }

      /* Shapes fade in */
      const ringTargets = [
        outerRingRef.current,
        midRingRef.current,
        innerRingRef.current,
      ].filter((el): el is HTMLDivElement => el !== null);
      if (ringTargets.length) {
        gsap.from(ringTargets, {
          opacity: 0,
          scale: 0.7,
          duration: 2,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.2,
        });
      }

      const shapeTargets = [squareWrapRef.current, orbitalRef.current].filter(
        (el): el is HTMLDivElement => el !== null,
      );
      if (shapeTargets.length) {
        gsap.from(shapeTargets, {
          opacity: 0,
          duration: 1.5,
          ease: "power3.out",
          delay: 0.8,
        });
      }

      const dotTargets = [
        dot1Ref.current,
        dot2Ref.current,
        dot3Ref.current,
      ].filter((el): el is HTMLDivElement => el !== null);
      if (dotTargets.length) {
        gsap.from(dotTargets, {
          opacity: 0,
          scale: 0,
          duration: 0.8,
          ease: "back.out(2)",
          stagger: 0.15,
          delay: 1.2,
        });
      }

      /* ── Scramble eyebrow on load ── */
      if (eyebrowRef.current) {
        scramble(eyebrowRef.current, "NAWAH WEALTH", 1.4, 0.3);
      }

      const tl = gsap.timeline({ delay: 0.1 });

      /* Eyebrow fade-in (initially hidden via gsap.set outside context) */
      if (eyebrowRef.current) {
        tl.to(
          eyebrowRef.current,
          { opacity: 1, duration: 0.6, ease: "power2.out" },
          0.2,
        );
      }

      tl.to(
        ".hero-line",
        {
          y: "0%",
          duration: 1.5,
          ease: "expo.out",
          stagger: 0.14,
        },
        0.4,
      );

      if (subRef.current) {
        tl.to(
          subRef.current,
          { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" },
          "-=1.0",
        );
      }
      if (ctaRef.current) {
        tl.to(
          ctaRef.current,
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          "-=0.8",
        );
      }
      if (scrollRef.current) {
        tl.to(scrollRef.current, { opacity: 1, duration: 0.5 }, "-=0.4");
      }

      /* ── Scroll velocity skew ── */
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
        },
      });
    }, sectionRef.current ?? undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-svh flex flex-col items-center justify-center px-5 sm:px-6 md:px-16 lg:px-24 pt-20 sm:pt-24 pb-16 sm:pb-20 md:pt-40 md:pb-28 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="hero-glow absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Orbital ring system — top-right (responsive) ── */}
      <div
        className="absolute -top-6 -right-16 sm:-top-28 sm:-right-40 pointer-events-none opacity-55 sm:opacity-75 scale-[0.72] sm:scale-100 origin-top-right"
        aria-hidden="true"
      >
        <div
          ref={outerRingRef}
          className="w-[260px] h-[260px] sm:w-[560px] sm:h-[560px] rounded-full border border-border/35 will-transform"
        />
        <div
          ref={midRingRef}
          className="absolute top-[37px] left-[37px] w-[186px] h-[186px]
                     sm:top-[80px] sm:left-[80px] sm:w-[400px] sm:h-[400px] rounded-full will-transform"
          style={{ border: "1px dashed rgba(0,102,255,0.25)" }}
        />
        <div
          ref={innerRingRef}
          className="absolute top-[74px] left-[74px] w-[112px] h-[112px]
                     sm:top-[160px] sm:left-[160px] sm:w-[240px] sm:h-[240px] rounded-full will-transform"
          style={{ border: "1px solid rgba(234,234,234,0.12)" }}
        />
        {[0, 90, 180, 270].map((deg) => (
          <div
            key={deg}
            className="absolute w-px h-3 sm:h-5 bg-border/60"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${deg}deg) translateX(-50%) translateY(-130px)`,
            }}
          />
        ))}
        <div className="absolute top-[115px] left-[115px] sm:top-[248px] sm:left-[248px] w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent/50" />
      </div>

      {/* ── Floating wireframe square — left ── */}
      <div
        ref={squareWrapRef}
        className="absolute left-[7%] top-[40%] pointer-events-none will-transform hidden lg:block opacity-70"
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
                      pointer-events-none will-transform hidden lg:block opacity-70"
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
        className="absolute top-[22%] left-[14%] w-2 h-2 rounded-full hidden md:block
                                    bg-accent/40 pointer-events-none will-transform"
        aria-hidden="true"
      />
      <div
        ref={dot2Ref}
        className="absolute top-[60%] right-[12%] w-1.5 h-1.5 rounded-full hidden md:block
                                    bg-paper/15 pointer-events-none will-transform"
        aria-hidden="true"
      />
      <div
        ref={dot3Ref}
        className="absolute top-[75%] left-[22%] w-1 h-1 rounded-full hidden md:block
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

      <div className="relative z-10 text-center max-w-7xl mx-auto w-full hero-skew-target will-transform">
        <p
          ref={eyebrowRef}
          className="text-[10px] tracking-[0.42em] sm:tracking-[0.5em] uppercase text-dim/80 font-sans mb-10 sm:mb-14 md:mb-16 will-opacity"
        >
          Nawah Wealth
        </p>

        <h1
          className="font-serif font-black leading-[0.9] tracking-tight text-paper mx-auto"
          aria-label="Sharia-Compliant Investing That Grows While You Sleep"
        >
          <span className="hidden md:block">
            {[
              "SHARIA-COMPLIANT",
              "INVESTING THAT GROWS",
              "WHILE YOU SLEEP",
            ].map((line, index) => (
              <span key={line} className="block overflow-hidden">
                <span
                  className={`hero-line block text-[clamp(3.4rem,7vw,7.6rem)] will-transform leading-[0.9] ${index === 2 ? "italic" : ""}`}
                >
                  {line}
                </span>
              </span>
            ))}
          </span>

          <span className="block md:hidden">
            {[
              "SHARIA-COMPLIANT",
              "INVESTING THAT",
              "GROWS",
              "WHILE YOU SLEEP",
            ].map((line, index) => (
              <span key={line} className="block overflow-hidden">
                <span
                  className={`hero-line block text-[clamp(2rem,10vw,4.1rem)] will-transform leading-[0.96] ${index === 3 ? "italic" : ""}`}
                >
                  {line}
                </span>
              </span>
            ))}
          </span>
        </h1>

        <p
          ref={subRef}
          className="mt-6 sm:mt-8 md:mt-12 text-dim/90 font-sans font-light
                     text-[clamp(1rem,1.2vw,1.12rem)]
                     leading-[1.85] max-w-md md:max-w-3xl mx-auto tracking-[0.01em] will-opacity"
        >
          Autonomous AI agents trade ethically on your behalf. You set the
          boundaries. They do the work. You wake to results. We only eat when
          you feast.
        </p>

        <div
          ref={ctaRef}
          className="mt-8 sm:mt-10 md:mt-20 flex flex-col items-center gap-5 sm:gap-6 will-opacity"
        >
          <form
            onSubmit={handleEarlyAccess}
            className="w-full max-w-4xl border border-border/80 bg-card/80 px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 flex flex-col gap-4 sm:gap-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
          >
            <div className="flex flex-col lg:flex-row items-stretch justify-center gap-3 sm:gap-4 md:gap-5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                aria-label="Enter your email"
                className="flex-1 min-w-0 bg-transparent border border-border px-6 py-5 md:px-10 md:py-7 font-sans text-[15px] md:text-lg text-paper placeholder:text-dim/35 outline-none focus:border-paper/30 transition-colors duration-300"
              />
              <button
                type="submit"
                className="group relative overflow-hidden border border-paper/25 px-8 py-5 md:px-12 md:py-7 font-sans text-[10px] sm:text-[11px] tracking-[0.24em] sm:tracking-[0.3em] uppercase text-paper will-transform lg:min-w-65"
              >
                <span className="absolute inset-0 bg-paper translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                <span className="relative mix-blend-difference">
                  Join the Waitlist
                </span>
              </button>
            </div>
          </form>
          <p className="text-[10px] tracking-[0.24em] sm:tracking-[0.32em] uppercase text-dim/65 font-sans text-center">
            Private list. Limited places. No noise.
          </p>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 will-opacity px-6"
      >
        <p className="max-w-sm text-center text-[8px] md:text-[9px] tracking-[0.24em] uppercase text-dim/45 font-sans leading-relaxed">
          See how nine agents deliberate, decide, and deliver — every night.
        </p>
        <div className="w-px h-16 bg-dim/15 relative overflow-hidden">
          <div className="absolute inset-0 bg-paper/50 animate-scroll-line" />
        </div>
      </div>
    </section>
  );
}
