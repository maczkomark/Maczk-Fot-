import Link from "next/link";
import { Eyebrow, PageHero, Section } from "@/components/ui/section";
import { albums } from "@/lib/albums";

export const metadata = {
  title: "Oldaltérkép — Maczkó Fotó",
  description: "Az oldal összes elérhető oldala egy helyen.",
};

const mainPages = [
  { href: "/", label: "Kezdőlap" },
  { href: "/portfolio", label: "Portfólió" },
  { href: "/about", label: "Rólam" },
  { href: "/contact", label: "Kapcsolat" },
];

export default function SitemapPage() {
  const byCategory = new Map<string, typeof albums>();
  for (const a of albums) {
    const list = byCategory.get(a.category) ?? [];
    list.push(a);
    byCategory.set(a.category, list);
  }
  const categories = Array.from(byCategory.entries()).sort(([a], [b]) =>
    a.localeCompare(b, "hu")
  );

  return (
    <main className="min-h-screen">
      <PageHero>
        <div className="flex items-center justify-between mb-10">
          <span className="brand-chip">— Maczkó Fotó / Oldaltérkép</span>
          <span className="brand-chip hidden sm:inline">{albums.length} album</span>
        </div>
        <Eyebrow>— Oldaltérkép</Eyebrow>
        <h1 className="h-page mt-4">
          Minden, ami <span className="italic text-copper-600">megtalálható.</span>
        </h1>
        <p className="lead mt-6 max-w-xl">
          Az oldal összes nyilvános oldala egy helyen, kategória szerint csoportosítva.
        </p>
      </PageHero>

      <Section className="border-t border-cream-300 pt-16 md:pt-20">
        <Eyebrow>— Főbb oldalak</Eyebrow>
        <h2 className="h-section mt-4">Navigáció.</h2>
        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {mainPages.map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                className="block px-5 py-4 border border-cream-300 hover:border-copper-600 hover:text-copper-600 transition-colors font-display text-lg"
              >
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="border-t border-cream-300">
        <Eyebrow>— Albumok</Eyebrow>
        <h2 className="h-section mt-4">
          Portfólió <span className="italic text-copper-600">kategóriánként.</span>
        </h2>
        <p className="lead mt-6 max-w-xl">
          Összesen {albums.length} album · {albums.reduce((s, a) => s + a.count, 0)} kép.
        </p>

        <div className="mt-12 space-y-12">
          {categories.map(([cat, list]) => (
            <div key={cat}>
              <p className="on-image-eyebrow text-ink-800">{cat}</p>
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2 border-t border-cream-300 pt-4">
                {list.map((a) => (
                  <li key={a.slug} className="flex items-baseline justify-between gap-4">
                    <Link
                      href={`/portfolio/${a.slug}`}
                      className="font-display text-base hover:text-copper-600 transition-colors"
                    >
                      {a.title}
                    </Link>
                    <span className="caption shrink-0">{a.count} kép</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-cream-300">
        <Eyebrow>— Gépeknek</Eyebrow>
        <h2 className="h-section mt-4">XML sitemap.</h2>
        <p className="lead mt-6 max-w-xl">
          A keresőknek szóló sitemap itt érhető el:{" "}
          <a href="/sitemap.xml" className="underline hover:text-copper-600">
            /sitemap.xml
          </a>
        </p>
      </Section>
    </main>
  );
}
