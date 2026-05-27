import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Section, Eyebrow } from "@/components/ui/section";
import { Frame } from "@/components/ui/frame";
import { albums } from "@/lib/albums";

export const metadata = { title: "Rólam — Maczkó Fotó" };

const stats = [
  { value: "Vas vm.", label: "fő munkaterület" },
  { value: "2026", label: "az év, amikor indult" },
  { value: "Sony", label: "α7 + 24-70 / 70-200" },
  { value: "∞", label: "kávé az úton" },
];

export default function AboutPage() {
  const albumCount = albums.length;
  const imageCount = albums.reduce((s, a) => s + a.count, 0);

  // Choose a strong portrait image for the hero
  const heroImage = albums.find((a) => a.slug === "eskuvo")?.cover
    ?? albums[0]?.cover
    ?? "/portfolio/eskuvo/13.jpg";

  // Show one cover per category as gallery
  const seen = new Set<string>();
  const genreCards = albums.filter((a) => {
    if (seen.has(a.category)) return false;
    seen.add(a.category);
    return true;
  }).slice(0, 8);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <span className="brand-chip">— Maczkó Fotó / Rólam</span>
            <span className="brand-chip hidden sm:inline">F/2.8 — ISO 400</span>
          </div>

          <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="md:col-span-7">
              <Eyebrow>— Rólam</Eyebrow>
              <h1 className="h-page mt-4">
                Maczkó Márk vagyok.<br />
                <span className="italic text-copper-600">Megőrzöm a pillanatot.</span>
              </h1>

              <div className="mt-10 space-y-5 max-w-xl">
                <p className="body">
                  Szombathelyen élek, és a város mindennapjait, eseményeit, sportját, esküvőit
                  fotózom — onnan, ahol a többiek néznek. Akkor ér el a kép, ha nem pózolják be:
                  amikor egy kosárlabdázó elveszti a labdát, amikor egy gyerek hangosan nevet a
                  hintán, vagy amikor a víztorony tetejéről épp megfogja a fény a templom tornyát.
                </p>
                <p className="body">
                  Riport-stílusban dolgozom — keveset szólok bele, sokat figyelek. A lassú, türelmes
                  megfigyelés többet ad, mint a tucatnyi blicc. Egy korrekt, természetes hangulatú
                  sorozat fontosabb, mint egy „beállított" borító.
                </p>
                <p className="body">
                  Felszerelés: Sony α7-széria + 24-70 / 70-200 / 35 1.4. Természetes fény, ha lehet;
                  vaku csak akkor, ha tényleg muszáj.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 max-w-md">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-2xl md:text-3xl text-ink-800 leading-none tracking-tight">{s.value}</p>
                    <p className="caption mt-2">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 flex flex-wrap gap-3">
                <Button href="/contact">Kapcsolat →</Button>
                <Button href="/portfolio" variant="secondary">Munkáim</Button>
              </div>
            </div>

            <div className="md:col-span-5">
              <Frame className="aspect-[3/4] w-full p-2">
                <div className="absolute inset-2 overflow-hidden">
                  <Image
                    src={heroImage}
                    alt="Maczkó Fotó"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </Frame>
              <p className="caption mt-4 text-right italic">{albumCount} album · {imageCount} kép</p>
            </div>
          </div>
        </div>
      </section>

      {/* Műfajok */}
      <Section className="border-t border-cream-300">
        <div className="mb-12 md:mb-16">
          <Eyebrow>— Műfajok</Eyebrow>
          <h2 className="h-section mt-4">Mit <span className="italic text-copper-600">fotózok.</span></h2>
          <p className="lead mt-6 max-w-xl">
            Több kategóriában is otthonosan mozgok. A műfajok gyakran átfedik egymást —
            egy esemény tud sport és riport is lenni egyszerre.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {genreCards.map((a) => (
            <div key={a.slug} className="group relative aspect-[3/4] rounded-sm overflow-hidden border border-cream-300">
              <Image src={a.cover} alt={a.category} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="on-image-eyebrow">{a.category}</p>
                <p className="font-display text-xl text-white mt-1 leading-tight">{a.title}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
