import Link from "next/link";
import { albums } from "@/lib/albums";
import { GUTTER } from "@/components/ui/section";
import { pageMeta } from "@/lib/seo";
import { services } from "@/lib/site";

export const metadata = pageMeta({
  title: "Oldaltérkép — Maczkó Fotó",
  description: "Az oldal összes elérhető oldala és galériája egy helyen.",
  path: "/sitemap",
});

const mainPages = [
  { href: "/", label: "Főoldal" },
  { href: "/portfolio", label: "Munkáim" },
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
  const categories = Array.from(byCategory.entries()).sort(([a], [b]) => a.localeCompare(b, "hu"));

  return (
    <main className={`${GUTTER} max-w-[120rem] mx-auto pt-28 md:pt-40 pb-24`}>
      <p className="eyebrow">— Oldaltérkép</p>
      <h1 className="font-display text-ink-800 leading-[0.9] tracking-tight text-[clamp(2.25rem,6vw,4.5rem)] mt-5">
        Minden oldal <span className="italic text-copper-600">egy helyen.</span>
      </h1>

      <div className="mt-16 grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="eyebrow mb-5">Oldalak</h2>
          <ul className="space-y-2">
            {mainPages.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="body hover:text-ink-800 transition">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="eyebrow mb-5">Szolgáltatások</h2>
          <ul className="space-y-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} className="body hover:text-ink-800 transition">
                  {s.heading}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="eyebrow mb-8">Galériák ({albums.length})</h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(([cat, list]) => (
            <div key={cat}>
              <h3 className="font-display text-2xl text-ink-800 tracking-tight mb-4">{cat}</h3>
              <ul className="space-y-2">
                {list.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/portfolio/${a.slug}`} className="body hover:text-ink-800 transition">
                      {a.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
