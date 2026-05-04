"use client";

import { useEffect, useRef } from "react";

const SPACING = 26;
const RADIUS = 200;
const FORCE = 1.4;
const SPRING = 0.022;
const DAMP = 0.93;
const DOT_BASE = 2.6;
const DOT_VAR = 1.8;

export function DotField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    type Dot = {
      rx: number;
      ry: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
    };
    let dots: Dot[] = [];
    let w = 0;
    let h = 0;
    const mouse = { x: -9999, y: -9999, active: false };

    function build() {
      const rect = container!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];
      const cols = Math.floor(w / SPACING);
      const rows = Math.floor(h / SPACING);
      const offX = (w - (cols - 1) * SPACING) / 2;
      const offY = (h - (rows - 1) * SPACING) / 2;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const rx = offX + i * SPACING;
          const ry = offY + j * SPACING;
          const r = DOT_BASE + Math.random() * DOT_VAR;
          dots.push({ rx, ry, x: rx, y: ry, vx: 0, vy: 0, r });
        }
      }
    }

    const onMove = (e: MouseEvent) => {
      const r = container!.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = true;
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const r = container!.getBoundingClientRect();
      mouse.x = t.clientX - r.left;
      mouse.y = t.clientY - r.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    let raf = 0;
    const R2 = RADIUS * RADIUS;

    function frame() {
      ctx!.clearRect(0, 0, w, h);
      ctx!.fillStyle = "rgba(255,255,255,0.7)";
      ctx!.beginPath();
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        if (mouse.active) {
          const dx = d.x - mouse.x;
          const dy = d.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R2 && d2 > 0.5) {
            const dist = Math.sqrt(d2);
            const f = ((RADIUS - dist) / RADIUS) * FORCE;
            d.vx += (dx / dist) * f;
            d.vy += (dy / dist) * f;
          }
        }
        d.vx += (d.rx - d.x) * SPRING;
        d.vy += (d.ry - d.y) * SPRING;
        d.vx *= DAMP;
        d.vy *= DAMP;
        d.x += d.vx;
        d.y += d.vy;
        ctx!.moveTo(d.x + d.r, d.y);
        ctx!.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      }
      ctx!.fill();
      raf = requestAnimationFrame(frame);
    }

    function staticRender() {
      ctx!.clearRect(0, 0, w, h);
      ctx!.fillStyle = "rgba(255,255,255,0.55)";
      ctx!.beginPath();
      for (const d of dots) {
        ctx!.moveTo(d.rx + d.r, d.ry);
        ctx!.arc(d.rx, d.ry, d.r, 0, Math.PI * 2);
      }
      ctx!.fill();
    }

    build();
    if (reduced) {
      staticRender();
    } else {
      raf = requestAnimationFrame(frame);
      window.addEventListener("mousemove", onMove);
      window.addEventListener("touchmove", onTouch, { passive: true });
      container.addEventListener("mouseleave", onLeave);
    }

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      build();
      if (reduced) staticRender();
      else raf = requestAnimationFrame(frame);
    });
    ro.observe(container);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      container.removeEventListener("mouseleave", onLeave);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    const STRENGTH = 0.32;
    const RANGE = 240;

    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      const bx = r.left + r.width / 2;
      const by = r.top + r.height / 2;
      const dx = e.clientX - bx;
      const dy = e.clientY - by;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < RANGE) {
        const falloff = 1 - d / RANGE;
        tx = dx * STRENGTH * falloff;
        ty = dy * STRENGTH * falloff;
      } else {
        tx = 0;
        ty = 0;
      }
    };

    const tick = () => {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      btn.style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      btn.style.transform = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <a
          ref={buttonRef}
          href="mailto:sem.shev2002@gmail.com"
          className="font-display group pointer-events-auto inline-flex items-center gap-4 rounded-full border-2 border-white bg-footer px-10 py-6 text-[clamp(28px,4vw,52px)] font-black uppercase leading-none tracking-[-0.02em] text-white transition-colors duration-300 hover:bg-white hover:text-footer md:gap-5 md:px-14 md:py-8"
          data-cursor="link"
        >
          <span>Связаться</span>
          <span
            aria-hidden
            className="inline-block transition-transform duration-300 group-hover:rotate-45"
          >
            ↗
          </span>
        </a>
      </div>
    </div>
  );
}
