"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Access() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Pulsing background orb */
      gsap.to(orbRef.current, {
        scale: 1.3,
        opacity: 0.12,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      /* Content reveal */
      gsap.from(".access-el", {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef.current ?? undefined);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    gsap.fromTo(
      ".confirm-el",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.1 },
    );
  };

  return (
    <section
      ref={sectionRef}
      id="access"
      className="relative min-h-screen px-6 md:px-16 lg:px-24 py-36 flex flex-col
                 justify-center border-t border-border overflow-hidden"
    >
      {/* Animated accent orb */}
      <div
        ref={orbRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[600px] h-[600px] rounded-full pointer-events-none will-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(0,102,255,0.15) 0%, transparent 70%)",
          opacity: 0.08,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {submitted ? (
          /* ── Confirmed state ── */
          <div className="text-center">
            <p className="confirm-el text-[9px] tracking-[0.5em] uppercase text-accent font-sans mb-10">
              You&rsquo;re In
            </p>
            <h2
              className="confirm-el font-serif font-black italic
                           text-[clamp(3rem,8vw,8rem)] leading-[0.9] tracking-tight text-paper mb-8"
            >
              Welcome to the list.
            </h2>
            <p className="confirm-el text-dim font-sans font-light text-base max-w-md mx-auto leading-relaxed">
              We will reach out personally when your access is ready.
              You&rsquo;re among the first to shape what this becomes.
            </p>
          </div>
        ) : (
          /* ── Default state ── */
          <>
            <p className="access-el text-[9px] tracking-[0.5em] uppercase text-dim font-sans mb-16">
              06 — The Invitation
            </p>

            {/* Headline */}
            <div className="overflow-hidden mb-3">
              <h2
                className="access-el font-serif font-black leading-[0.9] tracking-tight text-paper
                             text-[clamp(3rem,9vw,9rem)]"
              >
                Early
              </h2>
            </div>
            <div className="overflow-hidden mb-16">
              <h2
                className="access-el font-serif font-black italic leading-[0.9] tracking-tight
                             text-paper/40 text-[clamp(3rem,9vw,9rem)]"
              >
                Access.
              </h2>
            </div>

            {/* 2-col: body + form */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-16 lg:gap-24">
              {/* Body — exact client content */}
              <div className="space-y-6">
                <p
                  className="access-el text-dim font-sans font-light leading-loose
                               text-[clamp(0.95rem,1.3vw,1.1rem)]"
                >
                  We are currently accepting a limited cohort of founding
                  members. These individuals will shape our evolution,
                  stress-test our systems, and establish the foundation for a
                  new standard in autonomous stewardship.
                </p>
                <p
                  className="access-el text-dim font-sans font-light leading-loose
                               text-[clamp(0.95rem,1.3vw,1.1rem)]"
                >
                  Priority is given to those who align with our founding
                  principles: transparency, ethical rigor, and the courage to
                  demand better from those who manage wealth.
                </p>

                {/* 3 bullet principles */}
                <div className="access-el pt-4 space-y-3">
                  {[
                    "Transparency first",
                    "Ethical rigor",
                    "Demanding excellence",
                  ].map((p) => (
                    <div key={p} className="flex items-center gap-4">
                      <div className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                      <span className="text-[10px] tracking-[0.3em] uppercase text-dim/70 font-sans">
                        {p}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="access-el">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <label className="text-[9px] tracking-[0.4em] uppercase text-dim/60 font-sans mb-2">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border border-border px-8 py-5
                               font-sans text-sm text-paper placeholder:text-dim/30
                               outline-none focus:border-paper/30 transition-colors duration-300"
                  />

                  {/* Sliding fill button */}
                  <button
                    type="submit"
                    className="group relative overflow-hidden border border-paper/25
                               px-10 py-5 font-sans text-[10px] tracking-[0.35em] uppercase
                               text-paper will-transform mt-2"
                  >
                    <span
                      className="absolute inset-0 bg-paper translate-y-full
                                     group-hover:translate-y-0 transition-transform duration-500
                                     ease-[cubic-bezier(0.76,0,0.24,1)]"
                    />
                    <span className="relative mix-blend-difference">
                      Request Invitation
                    </span>
                  </button>

                  <p className="text-[9px] text-dim/40 font-sans font-light leading-relaxed mt-2">
                    No spam. No selling. Just one email when your spot opens.
                  </p>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
