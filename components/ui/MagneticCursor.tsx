"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export default function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    /* Start off-screen so they don't flash at 0,0 */
    gsap.set([dot, ring], { x: -100, y: -100 });

    const xDot = gsap.quickSetter(dot, "x", "px");
    const yDot = gsap.quickSetter(dot, "y", "px");
    const xRing = gsap.quickSetter(ring, "x", "px");
    const yRing = gsap.quickSetter(ring, "y", "px");

    let mouseX = 0,
      mouseY = 0;
    let ringX = -100,
      ringY = -100;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      xDot(mouseX);
      yDot(mouseY);
    };

    const onTick = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      xRing(ringX);
      yRing(ringY);
    };

    gsap.ticker.add(onTick);
    window.addEventListener("mousemove", onMove);

    const onEnter = () => {
      gsap.to(ring, {
        scale: 2.2,
        opacity: 0.5,
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 0, duration: 0.25 });
    };
    const onLeave = () => {
      gsap.to(ring, {
        scale: 1,
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 1, duration: 0.25 });
    };

    const targets = document.querySelectorAll<Element>(
      "a, button, [data-cursor-hover]",
    );
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      gsap.ticker.remove(onTick);
      window.removeEventListener("mousemove", onMove);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 will-transform"
      >
        <div className="w-[5px] h-[5px] rounded-full bg-paper" />
      </div>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 will-transform"
      >
        <div className="w-9 h-9 rounded-full border border-paper/40 mix-blend-difference" />
      </div>
    </>
  );
}
