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
        {section.paragraphs && section.paragraphs.length > 0 && (
          <div className="mt-4 space-y-3 text-[18px] leading-[1.5] text-white/85">
            {section.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
        {section.bullets && section.bullets.length > 0 && (
          <ul className="mt-4 space-y-2 text-[18px] leading-[1.5] text-white/85">
            {section.bullets.map((b, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-[10px] h-[6px] w-[6px] flex-none rounded-full bg-accent" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    );
  }

  if (section.type === "stats") {
    return (
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15%" }}
        className="mx-auto grid w-full max-w-[1060px] grid-cols-1 gap-6 px-6 py-16 md:grid-cols-3"
      >
        {section.items.map((s, i) => (
          <div
            key={i}
            className="rounded-[24px] border border-border bg-surface px-6 py-8"
          >
            <div className="font-display text-[64px] leading-none text-white md:text-[80px]">
              {s.value}
            </div>
            <div className="mt-4 text-[16px] leading-[1.4] text-muted">
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>
    );
  }

  if (section.type === "steps") {
    return (
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15%" }}
        className="mx-auto w-full max-w-[1060px] px-6 py-16"
      >
        {section.title && (
          <h3 className="mb-8 text-[24px] font-semibold leading-[1.2] text-white">
            {section.title}
          </h3>
        )}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {section.items.map((s, i) => (
            <div
              key={i}
              className="rounded-[24px] border border-border bg-surface p-6"
            >
              <div className="font-display text-[28px] leading-none text-accent">
                {s.num}
              </div>
              <div className="mt-4 text-[20px] font-semibold leading-[1.25] text-white">
                {s.title}
              </div>
              <p className="mt-3 text-[15px] leading-[1.45] text-muted">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (section.type === "quote") {
    return (
      <motion.figure
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15%" }}
        className="mx-auto w-full max-w-[1060px] px-6 py-16 md:py-20"
      >
        <blockquote className="text-balance text-[28px] font-semibold leading-[1.25] text-white md:text-[40px]">
          “{section.text}”
        </blockquote>
        {section.author && (
          <figcaption className="mt-4 text-[16px] text-muted">
            — {section.author}
          </figcaption>
        )}
      </motion.figure>
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
