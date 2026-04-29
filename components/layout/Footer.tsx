"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <footer
      ref={ref}
      className="relative w-full overflow-hidden bg-footer px-6 py-12 md:px-[60px] md:py-[60px]"
    >
      <motion.h2
        style={{ x }}
        className="font-display whitespace-nowrap text-[clamp(80px,18vw,241px)] font-black uppercase leading-none tracking-[-0.02em] text-footer-text"
      >
        GET IN TOUCH
      </motion.h2>
      <div className="mt-12 flex flex-col items-start justify-between gap-6 md:mt-16 md:flex-row md:items-center">
        <div className="grid w-full max-w-[398px] grid-cols-2 gap-y-1 text-[16px] leading-6 text-white">
          <span>SPB. Russia</span>
          <a
            href="tel:+79625800080"
            className="text-right hover:text-accent"
            data-cursor="link"
          >
            +7 (962) 580-00-80
          </a>
          <a
            href="mailto:sem.shev2002@gmail.com"
            className="hover:text-accent"
            data-cursor="link"
          >
            sem.shev2002@gmail.com
          </a>
          <a
            href="https://t.me/saymonsayzzz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-right hover:text-accent"
            data-cursor="link"
          >
            t.me/saymonsayzzz
          </a>
        </div>
        <p className="text-[18px] text-muted-2 md:text-[24px]">
          Спасибо за просмотр, увидимся!
        </p>
      </div>
    </footer>
  );
}
