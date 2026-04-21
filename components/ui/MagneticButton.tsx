"use client";

import { gsap } from "gsap";
import { useRef, type ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  arrow?: boolean;
}

export default function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  arrow = false,
}: MagneticButtonProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  /* ── Magnetic pull ── */
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = innerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    gsap.to(el, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.5,
      ease: "power2.out",
    });
  };
  const onLeave = () => {
    gsap.to(innerRef.current, {
      x: 0,
      y: 0,
      duration: 1,
      ease: "elastic.out(1, 0.35)",
    });
    gsap.to(fillRef.current, {
      yPercent: 100,
      duration: 0.4,
      ease: "power2.in",
    });
  };
  const onEnter = () => {
    gsap.fromTo(
      fillRef.current,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.5, ease: "power3.out" },
    );
  };

  const sharedClass = `
    relative inline-flex items-center gap-3 px-10 py-5 overflow-hidden
    border border-paper/25 font-sans text-[10px] tracking-[0.35em] uppercase
    will-transform ${className}
  `.trim();

  const inner = (
    <>
      {/* Sliding fill */}
      <span
        ref={fillRef}
        className="absolute inset-0 bg-paper translate-y-full pointer-events-none"
        style={{ transform: "translateY(100%)" }}
        aria-hidden="true"
      />
      {/* Text — always readable via mix-blend */}
      <span className="relative z-10 mix-blend-difference text-paper">
        {children}
      </span>
      {arrow && (
        <span className="relative z-10 mix-blend-difference text-paper text-base leading-none">
          ↗
        </span>
      )}
    </>
  );

  return (
    <div
      ref={wrapRef}
      className="inline-block p-10 -m-10"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={onEnter}
    >
      {href ? (
        <a
          ref={innerRef as React.Ref<HTMLAnchorElement>}
          href={href}
          className={sharedClass}
        >
          {inner}
        </a>
      ) : (
        <button
          ref={innerRef as React.Ref<HTMLButtonElement>}
          onClick={onClick}
          className={sharedClass}
        >
          {inner}
        </button>
      )}
    </div>
  );
}
