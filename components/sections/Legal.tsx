"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Legal() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Label */
      gsap.from(".legal-label", {
        opacity: 0,
        y: 14,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });

      /* Headline */
      gsap.from(".legal-headline", {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      /* Content blocks */
      gsap.from(".legal-para", {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".legal-content", start: "top 78%" },
      });
    }, sectionRef.current ?? undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="legal"
      className="px-6 md:px-16 lg:px-24 py-20 md:py-32 border-t border-border"
    >
      <div className="max-w-4xl mx-auto">
        <p className="legal-label text-[10px] tracking-[0.42em] md:tracking-[0.5em] uppercase text-dim font-sans mb-10 md:mb-14">
          07 — Legal Disclaimers and Compliance
        </p>

        <h2 className="legal-headline font-serif font-black text-[clamp(1.8rem,4vw,3.2rem)] leading-tight tracking-tight text-paper mb-8 md:mb-12">
          Important Legal Information
        </h2>

        <div className="legal-content space-y-5 md:space-y-7">
          <p className="legal-para text-dim/70 font-sans font-light text-sm md:text-[0.92rem] leading-[1.8] break-words">
            Nawah Wealth is a technology and research platform. We are not a
            financial adviser. We are not authorised or regulated by the
            Financial Conduct Authority or any other financial regulator. We do
            not give financial advice. We do not provide investment
            recommendations. We do not execute trades. We do not hold client
            funds. We do not manage money. We do not arrange deals in
            investments.
          </p>

          <p className="legal-para text-dim/70 font-sans font-light text-sm md:text-[0.92rem] leading-[1.8] break-words">
            All content produced by Nawah Wealth including Signal Cards, Morning
            Briefings, research reports, chat responses, and all other outputs
            is for informational and educational purposes only. It does not
            constitute financial advice, investment advice, or a personal
            recommendation. It should not be relied upon as a basis for making
            investment decisions. Past performance does not indicate future
            results. Investments can go down as well as up. You may not get back
            the amount you invested. The value of investments is not guaranteed.
          </p>

          <p className="legal-para text-dim/70 font-sans font-light text-sm md:text-[0.92rem] leading-[1.8] break-words">
            Before making any investment decision, you must consult a licensed
            financial adviser who is authorised and regulated in your
            jurisdiction. You must conduct your own research and due diligence.
            You are solely responsible for your investment decisions and any
            gains or losses that result from them.
          </p>

          <p className="legal-para text-dim/70 font-sans font-light text-sm md:text-[0.92rem] leading-[1.8] break-words">
            Nawah Wealth accepts no liability for any loss or damage arising
            from your use of our platform, your reliance on any information we
            provide, or any investment decisions you make.
          </p>
        </div>
      </div>
    </section>
  );
}
