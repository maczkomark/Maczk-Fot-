import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/site/jsonld";
import { Section, GUTTER } from "@/components/ui/section";
import { albums } from "@/lib/albums";
import { gear, services, site } from "@/lib/site";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Rólam — Maczkó Márk fotós, Szombathely | Maczkó Fotó",
  description:
    "Maczkó Márk vagyok, fotós Szombathelyen. Esküvő, rendezvény, buli és sport. Sony A7 V és 24-70mm G Master. Ismerd meg, hogyan dolgozom.",
  path: "/about",
  image: "/brand/mark-square.webp",
});

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.person,
  jobTitle: "Fotós",
  image: `${site.url}/brand/mark-square.webp`,
  url: `${site.url}/about`,
  worksFor: { "@id": `${site.url}/#business` },
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressRegion: site.region,
    addressCountry: "HU",
  },
  sameAs: [site.instagram, site.facebook],
};

const principles = [
  {
    n: "01",
    title: "Nem rendezem át a napodat",
    body: "Riportszerűen dolgozom. A beállított képek is elkészülnek, de a nap nagy részében nem én mondom meg, mi történjen — csak ott vagyok, ahol történik.",
  },
  {
    n: "02",
    title: "Nehéz fényben is megy",
    body: "Sötét klub, esti szertartás, füstös színpad. Ezekhez világos objektív, full frame váz és a vaku ismerete kell. Nem próbálkozás kérdése.",
  },
  {
    n: "03",
    title: "Amit ígérek, tartom",
    body: "Az átfutási időt előre megbeszéljük, és azt tartom. Ha valami csúszik, szólok, mielőtt te kérdeznél rá.",
  },
  {
    n: "04",
    title: "Nincs elveszett kép",
    body: "Két memóriakártyára írok egyszerre, tartalék vázzal megyek. Egy meghibásodás nem viheti el a napodat.",
  },
];

export default function AboutPage() {
  const totalImages = albums.reduce((s, a) => s + a.count, 0);

  return (
    <main>
      <JsonLd
        data={[
          personLd,
          breadcrumbLd([
            { name: "Főoldal", path: "/" },
            { name: "Rólam", path: "/about" },
          ]),
        ]}
      />

      {/* ───── Fejléc ───── */}
      <section className={`${GUTTER} max-w-[120rem] mx-auto pt-28 md:pt-40 pb-16 md:pb-24`}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">— Rólam</p>
            <h1 className="font-display text-ink-800 leading-[0.9] tracking-tight text-[clamp(2.1rem,6.5vw,6rem)] mt-5">
              Maczkó Márk,
              <br />
              <span className="italic text-copper-600">fotós Szombathelyen.</span>
            </h1>
            <p className="lead mt-8 max-w-xl">
              Esküvőket, rendezvényeket, bulikat és sportot fotózok Vas vármegyében.
              Olyan eseményeket, amik egyszer történnek meg.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[3/4] w-full max-w-sm lg:ml-auto">
              <Image
                src="/brand/mark-portrait.webp"
                alt="Maczkó Márk fotós portré"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───── Történet ───── */}
      <section className="border-y border-cream-300 bg-cream-50">
        <div className={`${GUTTER} max-w-[120rem] mx-auto py-20 md:py-28`}>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="eyebrow">— A munkám</p>
              <h2 className="h-sub mt-4">
                Ott lenni, amikor <span className="italic text-copper-600">történik.</span>
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-6">
              <p className="text-xl md:text-2xl text-ink-800 leading-relaxed">
                Egy esküvőn, egy koncerten vagy egy meccsen nincs újrafelvétel. Vagy ott
                vagyok a jó helyen a jó pillanatban, vagy nincs kép. Ez a munkám lényege,
                és emiatt készülök előre minden alkalomra.
              </p>
              <p className="lead">
                Végigbeszéljük, mi lesz a program, kik a fontos szereplők, hol lesz sötét
                és hol lesz tömeg. Egy szertartáson tudni kell, mikor nem szabad mozogni.
                Egy klubban tudni kell, hogy a fény két másodpercenként vált színt. Egy
                meccsen tudni kell, merre fog menni a játék. Ezek nem a gépen múlnak.
              </p>
              <p className="lead">
                Az elmúlt hónapokban {albums.length} galéria és több mint{" "}
                {totalImages.toLocaleString("hu-HU")} kiadott kép gyűlt össze — esküvőktől
                a Savaria Történelmi Karneválon át a bajnoki döntőkig. Ezek mind itt vannak
                az oldalon, nem válogatott vitrinképek: egész sorozatok, ahogy a megrendelő
                is megkapta őket.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Alapelvek ───── */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="eyebrow">— Ahogy dolgozom</p>
            <h2 className="h-sub mt-4">
              Négy dolog, amiben <span className="italic text-copper-600">számíthatsz rám.</span>
            </h2>
          </div>
          <div className="lg:col-span-8">
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
              {principles.map((p) => (
                <div key={p.n}>
                  <span className="stamp">{p.n}</span>
                  <h3 className="font-display text-2xl text-ink-800 mt-3 tracking-tight">{p.title}</h3>
                  <p className="body mt-3">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ───── Felszerelés ───── */}
      <section className="bg-ink-950 text-cream-100">
        <div className={`${GUTTER} max-w-[120rem] mx-auto py-20 md:py-28`}>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <div className="relative aspect-square w-full max-w-md">
                <Image
                  src="/brand/mark-square.webp"
                  alt="Maczkó Márk fotós, Szombathely"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-7">
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-cream-100/40">— Felszerelés</p>
              <h2 className="font-display text-cream-100 leading-[0.95] tracking-tight text-[clamp(2rem,4vw,3.5rem)] mt-5">
                Amivel <span className="italic text-copper-400">dolgozom.</span>
              </h2>
              <p className="mt-6 text-lg text-cream-100/70 leading-relaxed max-w-xl">
                A felszerelés önmagában nem csinál jó képet, de rossz felszereléssel
                bizonyos képek egyszerűen nem készíthetők el. Ez az a szint, ami alatt nem
                érdemes elindulni egy esküvőre vagy egy sötét klubba.
              </p>

              <dl className="mt-10 divide-y divide-cream-100/10 border-y border-cream-100/10">
                {gear.map((g) => (
                  <div key={g.name} className="py-5 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8">
                    <dt className="font-display text-xl md:text-2xl text-cream-100 tracking-tight sm:w-72 shrink-0">
                      {g.name}
                    </dt>
                    <dd className="text-cream-100/60">{g.note}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Szolgáltatások ───── */}
      <Section>
        <p className="eyebrow">— Miben tudok segíteni</p>
        <h2 className="h-sub mt-4 mb-10">
          Válaszd ki, ami <span className="italic text-copper-600">téged érdekel.</span>
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="group border border-cream-300 bg-cream-50 p-7 hover:border-ink-800/30 transition"
            >
              <h3 className="font-display text-2xl text-ink-800 tracking-tight">{s.name}</h3>
              <p className="body mt-2">{s.short}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm text-copper-600">
                Megnézem
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* ───── CTA ───── */}
      <section className="border-t border-cream-300">
        <div className={`${GUTTER} max-w-[120rem] mx-auto py-20 md:py-28 text-center`}>
          <h2 className="h-section">
            Beszéljünk arról,
            <br />
            <span className="italic text-copper-600">amit meg szeretnél örökíteni.</span>
          </h2>
          <div className="mt-10 flex justify-center gap-3 flex-wrap">
            <Link
              href="/contact"
              className="rounded-full bg-ink-800 text-cream-50 px-7 py-3.5 text-sm font-medium hover:bg-ink-900 transition"
            >
              Ajánlatot kérek
            </Link>
            <Link
              href="/portfolio"
              className="rounded-full border border-ink-800/25 px-7 py-3.5 text-sm font-medium text-ink-800 hover:bg-ink-800/5 transition"
            >
              Munkáim
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
