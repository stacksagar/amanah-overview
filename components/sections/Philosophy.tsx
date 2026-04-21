"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const ring3Ref = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Continuous geometry animations ── */
      gsap.to(ring1Ref.current, {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: "none",
      });
      gsap.to(ring2Ref.current, {
        rotation: -360,
        duration: 28,
        repeat: -1,
        ease: "none",
      });
      gsap.to(ring3Ref.current, {
        rotation: 180,
        duration: 60,
        repeat: -1,
        ease: "none",
      });
      gsap.to(floatRef.current, {
        y: -28,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      /* ── Dot grid cascade ── */
      gsap.from(".phil-dot", {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(2)",
        stagger: { each: 0.04, from: "random", grid: [6, 6] },
        scrollTrigger: { trigger: ".phil-dots", start: "top 80%" },
      });

      /* ── Label ── */
      gsap.from(".phil-label", {
        opacity: 0,
        y: 16,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });

      /* ── Headline: clip-path wipe left→right ── */
      gsap.fromTo(
        ".phil-headline-wrap",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.6,
          ease: "power4.inOut",
          scrollTrigger: { trigger: ".phil-headline-wrap", start: "top 82%" },
        },
      );

      /* ── Paragraphs stagger up ── */
      gsap.from(".phil-para", {
        opacity: 0,
        y: 36,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.15,
        scrollTrigger: { trigger: ".phil-paras", start: "top 80%" },
      });

      /* ── Pull quote clip ── */
      gsap.fromTo(
        ".phil-quote-inner",
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: { trigger: ".phil-quote-wrap", start: "top 82%" },
        },
      );
    }, sectionRef.current ?? undefined);

    return () => ctx.revert();
  }, []);

  /* 6×6 dot grid */
  const dots = Array.from({ length: 36 });

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="px-6 md:px-16 lg:px-24 py-36 border-t border-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <p className="phil-label text-[9px] tracking-[0.5em] uppercase text-dim font-sans mb-16">
          01 — Rethink the Relationship
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-20 lg:gap-32 mb-24">
          <div>
            <div
              className="phil-headline-wrap overflow-hidden mb-14"
              style={{ clipPath: "inset(0 100% 0 0)" }}
            >
              <h2
                className="font-serif font-black leading-[0.9] tracking-tight text-paper"
                aria-label="Rethink the Relationship Between You and Your Wealth."
              >
                <span className="block text-[clamp(2.6rem,7vw,7rem)]">
                  Rethink the Relationship
                </span>
                <span className="block text-[clamp(2.6rem,7vw,7rem)] text-paper/70">
                  Between You and
                </span>
                <span className="block text-[clamp(2.6rem,7vw,7rem)] italic text-paper/50">
                  Your Wealth.
                </span>
              </h2>
            </div>

            <div className="phil-paras space-y-7 max-w-2xl">
              <p className="phil-para text-dim font-sans font-light leading-loose text-[clamp(0.95rem,1.3vw,1.1rem)]">
                For generations, wealth demanded your time, your attention, your
                constant vigilance. Markets never sleep. Humans do.
              </p>
              <p className="phil-para text-dim font-sans font-light leading-loose text-[clamp(0.95rem,1.3vw,1.1rem)]">
                In that gap — opportunity disappears. Emotion interferes.
                Potential quietly erodes.
              </p>
              <p className="phil-para text-dim font-sans font-light leading-loose text-[clamp(0.95rem,1.3vw,1.1rem)]">
                So we asked a different question: What if your wealth
                didn&rsquo;t depend on your presence… but was cared for with the
                same discipline, consistency, and integrity you bring to your
                family, your faith, your craft?
              </p>
              <p className="phil-para text-dim font-sans font-light leading-loose text-[clamp(0.95rem,1.3vw,1.1rem)]">
                Not occasionally. Continuously. Not emotionally. Intelligently.
                Not blindly. Transparently.
              </p>
              <p className="phil-para text-paper/50 font-sans font-light leading-loose text-[clamp(0.95rem,1.3vw,1.1rem)] italic">
                That question didn&rsquo;t lead to a feature. It led to a
                complete rethinking of trust.
              </p>
            </div>
          </div>

          <div
            ref={floatRef}
            className="relative flex items-center justify-center min-h-[380px] will-transform"
          >
            <div
              ref={ring1Ref}
              className="absolute w-[340px] h-[340px] rounded-full border border-border/50 will-transform"
            />
            <div
              ref={ring2Ref}
              className="absolute w-[240px] h-[240px] rounded-full will-transform"
              style={{ border: "1px dashed rgba(0,102,255,0.3)" }}
            />
            <div
              ref={ring3Ref}
              className="absolute w-[140px] h-[140px] rounded-full will-transform"
              style={{ border: "1px solid rgba(0,102,255,0.6)" }}
            />
            <div className="w-3 h-3 rounded-full bg-accent/80" />
            {[0, 90, 180, 270].map((deg) => (
              <div
                key={deg}
                className="absolute w-1 h-4 bg-border"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${deg}deg) translateX(-50%) translateY(-170px)`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Dot grid */}
        <div
          className="phil-dots grid gap-4 mb-24"
          style={{ gridTemplateColumns: "repeat(6, 1fr)", maxWidth: "280px" }}
        >
          {dots.map((_, i) => (
            <div
              key={i}
              className="phil-dot w-1.5 h-1.5 rounded-full bg-dim/25 will-transform"
            />
          ))}
        </div>

        {/* Pull quote — client content */}
        <div
          className="phil-quote-wrap border-l-2 border-accent/50 pl-8 md:pl-12 max-w-4xl"
          style={{ overflow: "hidden" }}
        >
          <div
            className="phil-quote-inner"
            style={{ clipPath: "inset(100% 0 0 0)" }}
          >
            <blockquote
              className="font-serif text-[clamp(1.4rem,2.8vw,2.6rem)] font-medium italic
                                   leading-snug text-paper/80"
            >
              &ldquo;What if your wealth could be tended with the same care you
              give your family, your faith, your craft — continuously,
              ethically, and without your presence?&rdquo;
            </blockquote>
            <p className="mt-6 text-[9px] tracking-[0.5em] uppercase text-dim/50 font-sans">
              The Founding Question
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
