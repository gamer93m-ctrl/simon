"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine);
    if (!fine) return;

    let dx = -100,
      dy = -100,
      rx = -100,
      ry = -100,
      mx = -100,
      my = -100;
    let raf = 0;
    let lastTarget: Element | null = null;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      // Only re-evaluate hover when target element actually changes
      const t = e.target as Element | null;
      if (t !== lastTarget) {
        lastTarget = t;
        hoverRef.current = !!t?.closest('a, button, [data-cursor="link"]');
      }
    };

    const tick = () => {
      // Position dot fast (almost instant)
      dx += (mx - dx) * 0.6;
      dy += (my - dy) * 0.6;
      // Ring trails with spring
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      const scale = hoverRef.current ? 1.6 : 1;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed top-0 left-0 z-[100] h-9 w-9 rounded-full border border-white/40 will-change-transform"
        style={{ transform: "translate3d(-100px,-100px,0)" }}
      />
      <div
        ref={dot}
        className="pointer-events-none fixed top-0 left-0 z-[100] h-1.5 w-1.5 rounded-full bg-white will-change-transform"
        style={{ transform: "translate3d(-100px,-100px,0)" }}
      />
    </>
  );
}
