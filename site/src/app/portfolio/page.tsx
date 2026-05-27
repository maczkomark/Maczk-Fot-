import { albums } from "@/lib/albums";
import { Section, Eyebrow } from "@/components/ui/section";
import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "Munkáim — Maczkó Fotó" };

export default function PortfolioIndex() {
  const total = albums.reduce((s, a) => s + a.count, 0);

  // Group by category for the index
  const byCategory = albums.reduce<Record<string, typeof albums>>((acc, a) => {
    (acc[a.category] ??= []).push(a);
    return acc;
  }, {});
  const categories = Object.keys(byCategory);

  return (
    <main className="min-h-screen">
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <span className="brand-chip">— Maczkó Fotó / Archívum</span>
            <span className="brand-chip hidden sm:inline">F/2.8 — ISO 400</span>
          </div>
          <Eyebrow>— Archívum</Eyebrow>
          <h1 className="h-page mt-4">Minden <span className="italic text-copper-600">album.</span></h1>
          <p className="lead mt-6 max-w-xl">
            {albums.length} sorozat · {total} kép. Kategóriák szerint csoportosítva — kattints
            bármelyikre az album megnyitásához.
          </p>
        </div>
      </section>

      {categories.map((cat) => (
        <Section key={cat} className="!py-12 md:!py-16 border-t border-cream-300">
          <div className="flex items-baseline justify-between mb-8">
            <div className="flex items-baseline gap-4">
              <span className="stamp">{String(categories.indexOf(cat) + 1).padStart(2, "0")}</span>
              <h2 className="font-display text-3xl md:text-4xl text-ink-800 tracking-tight">{cat}</h2>
            </div>
            <p className="caption">{byCategory[cat].length} album</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {byCategory[cat].map((a) => (
              <Link
                key={a.slug}
                href={`/portfolio/${a.slug}`}
                className="group relative aspect-[4/5] rounded-sm overflow-hidden border border-cream-300"
              >
                <Image src={a.cover} alt={a.title} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="on-image-eyebrow">{a.category}</p>
                  <h2 className="on-image-title mt-2">{a.title}</h2>
                  <div className="mt-3 flex justify-between items-center text-xs text-white/60 brand-chip">
                    {a.date && <span>{a.date}</span>}
                    <span>{a.count} kép</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      ))}
    </main>
  );
}
