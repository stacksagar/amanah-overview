'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null)
  const brandRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Brand name scales from 50% → 100% as footer scrolls into view */
      gsap.fromTo(
        brandRef.current,
        { scale: 0.48, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'center center',
            scrub: 1,
          },
        }
      )

      /* Meta items */
      gsap.from('.footer-meta', {
        opacity: 0, y: 20, duration: 0.9, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: '.footer-meta-wrap', start: 'top 85%' },
      })
    }, sectionRef.current ?? undefined)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={sectionRef}
      id="footer"
      className="min-h-screen px-6 md:px-16 lg:px-24 pt-24 pb-12 flex flex-col
                 justify-between border-t border-border overflow-hidden"
    >
      {/* Massive brand name */}
      <div
        ref={brandRef}
        className="flex-1 flex items-center justify-center will-transform"
      >
        <h2
          className="font-serif font-black tracking-tighter text-paper leading-none select-none"
          style={{ fontSize: 'clamp(5rem, 20vw, 22rem)' }}
        >
          AMANAH
        </h2>
      </div>

      {/* Meta row */}
      <div className="footer-meta-wrap border-t border-border pt-10 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="footer-meta">
            <p className="text-[9px] tracking-[0.4em] uppercase text-dim/50 font-sans mb-2">
              Location
            </p>
            <p className="text-dim font-sans font-light text-sm">
              Designed in London.
              <br />Growing globally.
            </p>
          </div>

          <div className="footer-meta">
            <p className="text-[9px] tracking-[0.4em] uppercase text-dim/50 font-sans mb-2">
              Contact
            </p>
            <a
              href="mailto:hello@amanah.wealth"
              className="text-dim font-sans font-light text-sm hover:text-accent transition-colors"
            >
              hello@amanah.wealth
            </a>
          </div>

          <div className="footer-meta">
            <p className="text-[9px] tracking-[0.4em] uppercase text-dim/50 font-sans mb-2">
              Commitment
            </p>
            <p className="text-dim font-sans font-light text-sm">
              Transparent · Ethical · Autonomous
            </p>
          </div>
        </div>

        <div className="footer-meta flex flex-col md:flex-row items-start md:items-center
                        justify-between gap-4">
          <p className="text-[9px] tracking-[0.25em] uppercase text-dim/30 font-sans">
            © 2026 Amanah Wealth. All rights reserved.
          </p>
          <div className="flex gap-8">
            {['Privacy', 'Terms'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[9px] tracking-[0.25em] uppercase text-dim/30 font-sans
                           hover:text-dim/70 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
