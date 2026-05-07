"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Access() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "",
    phone: "",
    primaryInterest: "",
    currentExperience: "",
    primaryBroker: "",
    portfolioSize: "",
    preferredChannel: "",
    consent1: false,
    consent2: false,
  });
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
    if (!formData.email.trim()) return;
    setSubmitted(true);
    gsap.fromTo(
      ".confirm-el",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.1 },
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="access"
      className="relative min-h-svh px-6 md:px-16 lg:px-24 py-28 md:py-44 flex flex-col
                 justify-center border-t border-border overflow-hidden"
    >
      {/* Animated accent orb */}
      <div
        ref={orbRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-110 h-110 sm:w-170 sm:h-170 rounded-full pointer-events-none will-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(0,102,255,0.15) 0%, transparent 70%)",
          opacity: 0.08,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {submitted ? (
          <div className="text-center">
            <p className="confirm-el text-[10px] tracking-[0.42em] md:tracking-[0.5em] uppercase text-accent font-sans mb-8 md:mb-10">
              Request Received
            </p>
            <h2
              className="confirm-el font-serif font-black italic
                           text-[clamp(3rem,8vw,8rem)] leading-[0.9] tracking-tight text-paper mb-10"
            >
              Invitation pending.
            </h2>
            <p className="confirm-el text-dim font-sans font-light text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              We will contact you when access opens. You are now on the private
              list.
            </p>
          </div>
        ) : (
          <>
            <p className="access-el text-[10px] tracking-[0.42em] md:tracking-[0.5em] uppercase text-dim font-sans mb-12 md:mb-18 text-center">
              09 — The Invitation
            </p>

            <div className="overflow-hidden mb-4 text-center">
              <h2
                className="access-el font-serif font-black leading-[0.9] tracking-tight text-paper
                             text-[clamp(3rem,9vw,9rem)]"
              >
                100 Founding Places.
              </h2>
              <p className="access-el text-dim/60 font-sans font-light text-lg md:text-xl mt-4">
                247 Already Reserved.
              </p>
            </div>

            <div className="access-el max-w-4xl mx-auto border border-border/80 bg-card/85 px-5 py-6 md:px-10 md:py-10 lg:px-12 lg:py-12">
              <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10 space-y-4">
                <p className="text-dim/90 font-sans font-light text-base md:text-lg leading-relaxed">
                  We are accepting a single cohort of founding members. Priority
                  is given to those who align with our principles: transparency,
                  ethical rigor, and the courage to demand better from financial
                  tools.
                </p>
                <p className="text-paper/55 font-sans font-light text-sm md:text-base leading-relaxed">
                  Target launch: Q3 2026.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <label
                  htmlFor="access-email"
                  className="text-[10px] tracking-[0.38em] uppercase text-dim/65 font-sans text-center"
                >
                  Claim Your Free Founding Place
                </label>
                <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-5">
                  <input
                    id="access-email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full flex-1 bg-transparent border border-border px-6 md:px-10 py-5 md:py-7 font-sans text-base md:text-lg text-paper placeholder:text-dim/30 outline-none focus:border-paper/30 transition-colors duration-300"
                  />

                  <button
                    type="submit"
                    className="group relative overflow-hidden border border-paper/25 px-6 md:px-10 py-4 md:py-6 font-sans text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.2em] sm:tracking-[0.24em] md:tracking-[0.3em] uppercase text-paper will-transform lg:min-w-65 whitespace-nowrap"
                  >
                    <span
                      className="absolute inset-0 bg-paper translate-y-full
                                    group-hover:translate-y-0 transition-transform duration-500
                                    ease-[cubic-bezier(0.76,0,0.24,1)]"
                    />
                    <span className="relative mix-blend-difference">
                      Claim My Free Founding Place
                    </span>
                  </button>
                </div>

                <p className="pt-3 text-[10px] tracking-[0.24em] sm:tracking-[0.3em] uppercase text-dim/70 font-sans text-center">
                  Private list. No noise. Only important updates.
                </p>
              </form>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
