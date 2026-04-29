"use client";

import { motion } from "framer-motion";
import type { Case } from "@/data/cases";
import { fadeUp, stagger } from "@/lib/motion";

export function CaseHeader({ data }: { data: Case }) {
  return (
    <motion.header
      variants={stagger}
      initial="hidden"
      animate="show"
      className="mx-auto w-full max-w-[1060px] px-6 pb-12 pt-[160px] md:pb-16 md:pt-[190px]"
    >
      <motion.div variants={fadeUp} className="flex flex-col gap-3">
        <h1 className="font-display text-[40px] leading-[1.05] tracking-[0.01em] text-white md:text-[48px]">
          {data.title}
        </h1>
        <p className="text-[16px] leading-6 text-muted">{data.tagline}</p>
      </motion.div>
      <motion.p
        variants={fadeUp}
        className="mt-12 max-w-[1060px] text-[22px] leading-[1.4] text-white md:text-[28px]"
      >
        {data.intro}
      </motion.p>
    </motion.header>
  );
}
