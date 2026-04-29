"use client";

import { motion } from "framer-motion";
import type { CaseSection as Section } from "@/data/cases";
import { fadeUp } from "@/lib/motion";

export function CaseSection({ section }: { section: Section }) {
  if (section.type === "two-column") {
    return (
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15%" }}
        className="mx-auto grid w-full max-w-[1060px] grid-cols-1 gap-10 px-6 py-16 md:grid-cols-2"
      >
        {[section.left, section.right].map((col, i) => (
          <div key={i}>
            <h3 className="text-[24px] font-semibold leading-[1.2] text-white">
              {col.title}
            </h3>
            <p className="mt-4 text-[18px] leading-[1.45] text-muted">{col.body}</p>
          </div>
        ))}
      </motion.div>
    );
  }

  if (section.type === "text") {
    return (
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15%" }}
        className="mx-auto w-full max-w-[1060px] px-6 py-12"
      >
        {section.title && (
          <h3 className="text-[24px] font-semibold leading-[1.2] text-white">
            {section.title}
          </h3>
        )}
        <div className="mt-4 space-y-3 text-[18px] leading-[1.5] text-white/85">
          {section.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </motion.div>
    );
  }

  // image
  return (
    <motion.figure
      initial={{ opacity: 0, clipPath: "inset(8% 0 8% 0)" }}
      whileInView={{ opacity: 1, clipPath: "inset(0% 0 0% 0)" }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto w-full max-w-[1060px] px-6 py-8"
    >
      <div className="overflow-hidden rounded-[24px] bg-surface-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={section.src}
          alt={section.alt}
          className="block h-auto w-full"
        />
      </div>
      {section.caption && (
        <figcaption className="mt-4 text-center text-[14px] text-muted">
          {section.caption}
        </figcaption>
      )}
    </motion.figure>
  );
}
