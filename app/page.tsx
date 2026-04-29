import { Hero } from "@/components/home/Hero";
import { CasesGrid } from "@/components/home/CasesGrid";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <CasesGrid />
      <Footer />
    </main>
  );
}
