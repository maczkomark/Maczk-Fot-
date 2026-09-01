import { albums } from "@/lib/albums";
import { AlbumGrid } from "@/components/site/album-grid";
import { JsonLd } from "@/components/site/jsonld";
import { GUTTER } from "@/components/ui/section";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Munkáim — esküvő, rendezvény, buli és sport | Maczkó Fotó",
  description:
    "Teljes galériák esküvőkről, rendezvényekről, koncertekről és mérkőzésekről Szombathelyen és Vas vármegyében. Nézd meg, hogyan dolgozom.",
  path: "/portfolio",
});

export default function PortfolioIndex() {
  const total = albums.reduce((s, a) => s + a.count, 0);
  const items = albums.map((a) => ({
    slug: a.slug,
    title: a.title,
    category: a.category,
    date: a.date,
    count: a.count,
    cover: a.cover,
  }));

  return (
    <main>
      <JsonLd
        data={breadcrumbLd([
          { name: "Főoldal", path: "/" },
          { name: "Munkáim", path: "/portfolio" },
        ])}
      />

      <section className={`${GUTTER} max-w-[120rem] mx-auto pt-28 md:pt-40 pb-12 md:pb-16`}>
        <p className="eyebrow">— Archívum</p>
        <h1 className="font-display text-ink-800 leading-[0.9] tracking-tight text-[clamp(2.1rem,6.5vw,6rem)] mt-5">
          Minden <span className="italic text-copper-600">galéria.</span>
        </h1>
        <p className="lead mt-8 max-w-2xl">
          {albums.length} teljes sorozat, {total.toLocaleString("hu-HU")} kép. Nem
          válogatott vitrinképek — ezek az anyagok, ahogy a megrendelő is megkapta őket.
        </p>
      </section>

      <div className={`${GUTTER} max-w-[120rem] mx-auto pb-24 md:pb-32`}>
        <AlbumGrid items={items} />
      </div>
    </main>
  );
}
