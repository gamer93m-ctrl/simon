"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { PillButton } from "@/components/ui/PillButton";
import { fadeUp, stagger } from "@/lib/motion";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  // Мышь → плавный transform (spring сглаживает движение)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 14, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 14, mass: 0.6 });

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      mx.set(px);
      my.set(py);
    };
    el.addEventListener("mousemove", onMove, { passive: true });
    return () => el.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  // Параллакс: разные слои движутся с разной амплитудой
  const blobX = useMotionValueMul(sx, 80);
  const blobY = useMotionValueMul(sy, 60);
  const figureX = useMotionValueMul(sx, -30);
  const figureY = useMotionValueMul(sy, -20);

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden bg-background pt-[120px] pb-16 md:pt-[140px] md:pb-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto mb-12 w-full max-w-[1060px] px-4 md:mb-20"
      >
        <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-[32px] bg-[#0e0e10] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] md:aspect-[21/9]">
          {/* Анимированные градиент-блобы */}
          <motion.div
            style={{ x: blobX, y: blobY }}
            className="absolute inset-0 will-change-transform"
          >
            <div className="absolute -left-[10%] top-[-20%] h-[80%] w-[60%] rounded-full bg-[radial-gradient(circle,rgba(255,87,87,0.85),transparent_60%)] blur-3xl [animation:blob-1_18s_ease-in-out_infinite]" />
            <div className="absolute right-[-10%] top-[-10%] h-[70%] w-[55%] rounded-full bg-[radial-gradient(circle,rgba(84,150,249,0.85),transparent_60%)] blur-3xl [animation:blob-2_22s_ease-in-out_infinite]" />
            <div className="absolute left-[20%] bottom-[-30%] h-[80%] w-[60%] rounded-full bg-[radial-gradient(circle,rgba(199,87,255,0.8),transparent_60%)] blur-3xl [animation:blob-3_20s_ease-in-out_infinite]" />
            <div className="absolute right-[10%] bottom-[-20%] h-[60%] w-[50%] rounded-full bg-[radial-gradient(circle,rgba(255,180,80,0.6),transparent_60%)] blur-3xl [animation:blob-4_26s_ease-in-out_infinite]" />
          </motion.div>

          {/* Зернистая текстура для «фильмового» ощущения */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay [background-image:url('data:image/svg+xml;utf8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22200%22%20height=%22200%22%3E%3Cfilter%20id=%22n%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%222%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />

          {/* Силуэт-человечек поверх с мышь-параллаксом */}
          <motion.div
            style={{ x: figureX, y: figureY }}
            className="absolute inset-0 will-change-transform"
          >
            <Image
              src="/hero-bg.png"
              alt=""
              fill
              priority
              className="object-cover mix-blend-multiply"
              sizes="(min-width: 768px) 1060px, 100vw"
            />
          </motion.div>

          {/* Виньетка по краям */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_50%,transparent_55%,rgba(14,14,16,0.6)_100%)]" />
        </div>

        {/* Свечение под блоком */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-12 -bottom-8 h-32 rounded-full bg-[radial-gradient(circle,rgba(84,150,249,0.35),transparent_70%)] blur-3xl"
        />
      </motion.div>

      {/* Title + buttons */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-[1060px] flex-col items-center px-6 text-center"
      >
        <motion.h1
          variants={fadeUp}
          className="font-display text-[64px] font-bold leading-[1.05] tracking-[-0.02em] text-white md:text-[96px]"
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
    </section>
  );
}

// Маленький helper: умножает MotionValue на коэффициент
function useMotionValueMul(
  source: ReturnType<typeof useSpring>,
  factor: number,
) {
  const out = useMotionValue(0);
  useEffect(() => {
    return source.on("change", (v) => out.set(v * factor));
  }, [source, factor, out]);
  return out;
}
