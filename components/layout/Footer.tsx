"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TICKER = [
  "AVAILABLE FOR WORK",
  "BASED IN SPB",
  "OPEN TO RELOCATION",
  "WRITE ME ANYTIME",
  "✦ 2026 ✦",
];

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Each huge line drifts at its own speed/direction → парallax effect
  const xLine1 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const xLine2 = useTransform(scrollYProgress, [0, 1], ["-12%", "8%"]);
  const xLine3 = useTransform(scrollYProgress, [0, 1], ["6%", "-14%"]);
  const xLine4 = useTransform(scrollYProgress, [0, 1], ["-8%", "12%"]);

  return (
    <footer
      ref={ref}
      className="relative w-full overflow-hidden bg-footer text-white"
    >
      {/* Top tag row */}
      <div className="flex items-center justify-between border-b border-white/15 px-6 py-4 text-[12px] uppercase tracking-[0.2em] text-muted-2 md:px-[60px]">
        <span className="flex items-center gap-3">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          [01] FOOTER · END OF SCROLL
        </span>
        <span>Saint-Petersburg / 59.93°N 30.31°E</span>
      </div>

      {/* Infinite marquee */}
      <div className="overflow-hidden border-b border-white/15 py-5">
        <motion.div
          className="flex shrink-0 gap-12 whitespace-nowrap text-[18px] font-semibold uppercase tracking-[0.18em] text-white/55 md:text-[22px]"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        >
          {[...Array(2)].flatMap((_, i) =>
            TICKER.map((t, j) => (
              <span key={`${i}-${j}`} className="flex items-center gap-12">
                <span>{t}</span>
                <span className="text-accent">★</span>
              </span>
            )),
          )}
        </motion.div>
      </div>

      {/* Brutalist headline */}
      <div className="relative px-6 py-16 md:px-[60px] md:py-24">
        <div className="font-display select-none uppercase leading-[0.85] tracking-[-0.04em]">
          <motion.div
            style={{ x: xLine1 }}
            className="whitespace-nowrap text-[clamp(72px,18vw,260px)] font-black text-white"
          >
            СКАЖИ
          </motion.div>
          <motion.div
            style={{ x: xLine2 }}
            className="-mt-2 whitespace-nowrap text-[clamp(72px,18vw,260px)] font-black text-transparent md:-mt-4"
            data-stroke="привет"
          >
            <span className="[-webkit-text-stroke:2px_white] md:[-webkit-text-stroke:3px_white]">
              ПРИВЕТ →
            </span>
          </motion.div>
          <motion.div
            style={{ x: xLine3 }}
            className="-mt-2 whitespace-nowrap text-[clamp(72px,18vw,260px)] font-black text-white md:-mt-4"
          >
            ПОКА КОФЕ
          </motion.div>
          <motion.div
            style={{ x: xLine4 }}
            className="-mt-2 whitespace-nowrap text-[clamp(72px,18vw,260px)] font-black text-accent md:-mt-4"
          >
            НЕ ОСТЫЛ.
          </motion.div>
        </div>
      </div>

      {/* Massive email CTA */}
      <a
        href="mailto:sem.shev2002@gmail.com"
        className="group block border-y border-white/15 px-6 py-10 transition-colors hover:bg-white hover:text-footer md:px-[60px] md:py-14"
        data-cursor="link"
      >
        <div className="flex items-baseline justify-between gap-6">
          <span className="font-display block flex-1 truncate text-[clamp(36px,9vw,140px)] font-black uppercase leading-none tracking-[-0.03em]">
            sem.shev2002@gmail.com
          </span>
          <span className="font-display shrink-0 text-[clamp(36px,9vw,140px)] font-black leading-none transition-transform group-hover:rotate-45">
            ↗
          </span>
        </div>
      </a>

      {/* Bottom grid */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 px-6 py-12 text-[14px] uppercase tracking-[0.16em] md:grid-cols-4 md:px-[60px]">
        <FooterCol num="[02]" title="Telegram">
          <a
            href="https://t.me/saymonsayzzz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
            data-cursor="link"
          >
            @saymonsayzzz
          </a>
        </FooterCol>

        <FooterCol num="[03]" title="Phone">
          <a
            href="tel:+79625800080"
            className="hover:text-accent"
            data-cursor="link"
          >
            +7 (962) 580-00-80
          </a>
        </FooterCol>

        <FooterCol num="[04]" title="Resume">
          <a href="#" className="hover:text-accent" data-cursor="link">
            Скачать CV ↗
          </a>
        </FooterCol>

        <FooterCol num="[05]" title="HH.ru">
          <a href="#" className="hover:text-accent" data-cursor="link">
            Открыть профиль ↗
          </a>
        </FooterCol>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col items-start justify-between gap-3 border-t border-white/15 px-6 py-5 text-[12px] uppercase tracking-[0.2em] text-muted-2 md:flex-row md:items-center md:px-[60px]">
        <span>© 2026 Semyon Shevtsov · No rights reserved · Use freely</span>
        <span className="flex items-center gap-3">
          <span>Built with 🖤 in 2026</span>
          <span className="hidden md:inline">·</span>
          <span className="hidden md:inline">v 4.0.0</span>
        </span>
      </div>
    </footer>
  );
}

function FooterCol({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] text-muted-2">{num}</span>
      <span className="text-muted-2">{title}</span>
      <span className="text-[16px] normal-case tracking-normal text-white">
        {children}
      </span>
    </div>
  );
}
