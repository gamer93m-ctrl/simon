"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PillButton } from "@/components/ui/PillButton";
import { fadeUp, stagger } from "@/lib/motion";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-background">
      <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-[1080px] w-[1520px] -translate-x-1/2 -translate-y-[10%]">
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          priority
          className="object-cover opacity-90"
          sizes="1520px"
        />
        <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_45%,transparent_0%,#1a1a1a_85%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-b from-transparent to-background" />
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-[1060px] flex-col items-center px-6 pt-[180px] pb-16 text-center md:pt-[260px] md:pb-24"
      >
        <motion.h1
          variants={fadeUp}
          className="font-display text-[64px] font-bold leading-[1.05] tracking-[-0.02em] text-white md:text-[90px]"
        >
          Semyon
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="font-display mt-1 text-[28px] font-bold leading-[1.2] tracking-[-0.01em] text-white md:text-[40px]"
        >
          Product Designer
        </motion.p>
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-[760px] text-balance text-[18px] leading-[1.4] text-white md:text-[24px]"
        >
          Целеустремлённый профессионал, который знает как достичь результат,
          способен выстроить дизайн процессы и разработать продукт с нуля
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center justify-center gap-5"
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
    </section>
  );
}
