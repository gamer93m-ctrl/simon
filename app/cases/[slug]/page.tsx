import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cases, getCase } from "@/data/cases";
import { CaseHeader } from "@/components/case/CaseHeader";
import { CaseSection } from "@/components/case/CaseSection";
import { Footer } from "@/components/layout/Footer";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getCase(slug);
  if (!data) return { title: "Кейс — Semyon" };
  return {
    title: `${data.title} — Semyon`,
    description: data.tagline,
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getCase(slug);
  if (!data) notFound();

  return (
    <main>
      <Link
        href="/"
        data-cursor="link"
        className="fixed left-6 top-6 z-30 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-[14px] text-white backdrop-blur-md transition hover:bg-background"
      >
        <span aria-hidden>←</span>
        <span>Назад</span>
      </Link>
      <CaseHeader data={data} />
      <div className="mx-auto h-px w-full max-w-[1060px] bg-border" />
      {data.sections.map((s, i) => (
        <CaseSection key={i} section={s} />
      ))}
      <Footer />
    </main>
  );
}
