"use client";

import { motion } from "framer-motion";
import { AuroraCanvas } from "@/components/home/AuroraCanvas";
import { PillButton } from "@/components/ui/PillButton";
import { fadeUp, stagger } from "@/lib/motion";

export function Hero() {
  return (
    <section className="relative flex h-screen min-h-[720px] w-full flex-col overflow-hidden bg-background">
      {/* WebGL aurora background */}
      <AuroraCanvas />

      {/* Vignette to fade edges into page background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_50%,transparent_30%,rgba(26,26,26,0.85)_85%,rgba(26,26,26,1)_100%)]"
      />

      {/* Bottom fade — kills the seam between aurora and next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-[linear-gradient(to_bottom,transparent_0%,rgba(26,26,26,0.7)_55%,#1a1a1a_100%)]"
      />

      {/* Top fade — same trick for the header area */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[25%] bg-[linear-gradient(to_top,transparent_0%,rgba(26,26,26,0.7)_60%,#1a1a1a_100%)]"
      />

      {/* Title + buttons (vertically centered, stays clear of header + scroll cue) */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-[1060px] flex-1 flex-col items-center justify-center px-6 pt-[120px] pb-24 text-center md:pt-[140px]"
      >
        <motion.h1
          variants={fadeUp}
          className="font-display text-[64px] font-bold leading-[1.05] tracking-[-0.02em] text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.55)] md:text-[96px]"
        >
          Semyon
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="font-display mt-2 text-[28px] font-semibold leading-[1.2] tracking-[-0.01em] text-muted md:text-[40px]"
        >
          Product Designer
        </motion.p>
        <motion.p
          variants={fadeUp}
          className="mt-8 max-w-[720px] text-balance text-[18px] leading-[1.45] text-white/85 md:text-[22px]"
        >
          Целеустремлённый профессионал, который знает как достичь результат,
          способен выстроить дизайн процессы и разработать продукт с нуля
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <PillButton href="#" external withIcon>
            CV
          </PillButton>
          <PillButton href="https://t.me/saymonsayzzz" external withIcon>
            Telegram
          </PillButton>
          <PillButton href="#" external withIcon>
            HH.RU
          </PillButton>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-white/60 md:bottom-10"
        aria-hidden
      >
        <span>Скролл?</span>
        <span className="relative flex h-9 w-[22px] justify-center rounded-full border border-white/35">
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
            className="mt-[6px] block h-[6px] w-[2px] rounded-full bg-white/80"
          />
        </span>
      </motion.div>
    </section>
  );
}
