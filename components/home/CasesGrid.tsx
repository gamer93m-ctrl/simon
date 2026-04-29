import { cases } from "@/data/cases";
import { CaseCard } from "./CaseCard";

export function CasesGrid() {
  return (
    <section className="mx-auto w-full max-w-[1060px] pb-16">
      <div className="grid grid-cols-1 gap-8 px-4 md:grid-cols-2 md:px-0">
        {cases.map((c) => (
          <div
            key={c.slug}
            className={c.preview.variant === "wide" ? "md:col-span-2" : ""}
          >
            <CaseCard data={c} />
          </div>
        ))}
      </div>
    </section>
  );
}
