"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import type { Case } from "@/data/cases";
import { ArrowCta } from "@/components/ui/ArrowCta";
import { PillButton } from "@/components/ui/PillButton";
import { fadeUp } from "@/lib/motion";

export function CaseCard({ data }: { data: Case }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15%" }}
      className={clsx(
        "group relative h-[700px] w-full overflow-hidden rounded-[32px] bg-surface backdrop-blur-sm",
      )}
    >
      <Link
        href={`/cases/${data.slug}`}
        className="absolute inset-0 z-20"
        aria-label={`Открыть кейс ${data.title}`}
        data-cursor="link"
      />
      <div className="relative z-10 flex flex-col items-center gap-4 px-6 pt-8 text-center md:px-8">
        <h3 className="font-display text-[36px] leading-[1.2] tracking-[0.01em] text-white">
          {data.title}
        </h3>
        <div className="flex flex-wrap items-start justify-center gap-3">
          {data.preview.tags.map((tag) => (
            <PillButton key={tag} variant="outline">
              {tag}
            </PillButton>
          ))}
        </div>
        <p className="text-[16px] font-semibold leading-6 text-muted">
          {data.preview.description}
        </p>
      </div>
      <CardMedia data={data} />
      <ArrowCta className="absolute bottom-6 right-6 z-10 md:bottom-8 md:right-8" />
    </motion.div>
  );
}

function CardMedia({ data }: { data: Case }) {
  const { media, variant } = data.preview;

  if (media.kind === "placeholder") {
    return (
      <div className="absolute inset-x-2 bottom-2 top-[226px] overflow-hidden rounded-[24px] bg-surface-2">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_100%,rgba(84,150,249,0.18),transparent_70%)]" />
      </div>
    );
  }

  if (media.kind === "phones-trio") {
    return (
      <div className="pointer-events-none absolute inset-x-0 -bottom-12 z-0 flex h-[600px] items-end justify-center overflow-hidden">
        <div className="absolute bottom-[-80px] left-1/2 h-[423px] w-[318px] -translate-x-1/2 rounded-[100px] bg-[radial-gradient(circle_at_50%_60%,rgba(84,150,249,0.6),rgba(255,255,255,0.12)_60%,transparent_70%)] blur-[80px]" />
        <div className="relative h-[560px] w-[560px] origin-bottom scale-[0.7] sm:scale-100">
          {/* eslint-disable @next/next/no-img-element */}
          <img
            src="/cases/aff-phone-1.png"
            alt=""
            className="absolute left-0 top-[33px] h-[502px] w-[278px] -rotate-[5.5deg] object-contain"
          />
          <img
            src="/cases/aff-phone-2.png"
            alt=""
            className="absolute right-0 top-[30px] h-[505px] w-[286px] rotate-[6deg] object-contain"
          />
          <img
            src="/cases/aff-phone-3.png"
            alt=""
            className="absolute left-1/2 top-[14px] h-[482px] w-[233px] -translate-x-1/2 object-contain"
          />
          {/* eslint-enable @next/next/no-img-element */}
        </div>
      </div>
    );
  }

  if (media.kind === "phone-single") {
    return (
      <div className="pointer-events-none absolute inset-x-0 -bottom-10 z-0 flex h-[480px] items-end justify-center">
        <div className="absolute bottom-0 left-1/2 h-[423px] w-[318px] -translate-x-1/2 rounded-[100px] bg-[radial-gradient(circle_at_50%_60%,rgba(84,150,249,0.6),rgba(255,255,255,0.12)_60%,transparent_70%)] blur-[80px]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.src}
          alt=""
          className="relative h-[480px] w-[280px] object-contain object-bottom"
        />
      </div>
    );
  }

  // laptop
  return (
    <div className="pointer-events-none absolute inset-x-0 -bottom-8 z-0">
      <div className="absolute bottom-[-100px] left-1/2 h-[686px] w-[516px] -translate-x-1/2 rounded-[100px] bg-[radial-gradient(circle_at_50%_60%,rgba(84,150,249,0.6),rgba(255,255,255,0.12)_60%,transparent_70%)] blur-[100px]" />
      <div className={clsx("relative w-full", variant === "wide" ? "h-[520px]" : "h-[440px]")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.src}
          alt=""
          className="absolute inset-0 h-full w-full object-contain object-bottom"
        />
      </div>
    </div>
  );
}
