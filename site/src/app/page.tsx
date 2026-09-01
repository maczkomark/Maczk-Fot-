import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, Clock, MapPin } from "lucide-react";
import { Hero } from "@/components/site/hero";
import { JsonLd } from "@/components/site/jsonld";
import { Section, SectionHeader, GUTTER } from "@/components/ui/section";
import { albums, getAlbum } from "@/lib/albums";
import { services, site, gear } from "@/lib/site";
import { breadcrumbLd } from "@/lib/seo";
import { pickHighlights } from "@/lib/picks";

export default function Home() {
  const totalImages = albums.reduce((s, a) => s + a.count, 0);

  // Minden műfajhoz egy jó kép a közös készletből — nem mindig ugyanaz.
  const serviceCards = services.map((s) => {
    const pick = pickHighlights({
      count: 1,
      categories: s.categories,
      seedKey: `home-service-${s.slug}`,
    })[0];
    return { ...s, cover: pick?.src ?? getAlbum(s.heroAlbum)?.cover ?? "" };
  });

  // Vegyes válogatás a teljes készletből, a fentiek nélkül.
  const featured = pickHighlights({
    count: 8,
    exclude: serviceCards.map((s) => s.cover),
    seedKey: "home-featured",
  });

  return (
    <main>
      <JsonLd data={breadcrumbLd([{ name: "Főoldal", path: "/" }])} />

      <Hero />

      {/* ───────── Szolgáltatások ───────── */}
      <Section id="szolgaltatasok" className="pt-20 md:pt-28 pb-0">
        <SectionHeader
          kicker="— Amit csinálok"
          title={
            <>
              Négy műfaj, egy <span className="italic text-copper-600">fotós.</span>
            </>
          }
          description="Mindegyikhez más kell: máshogy kell mozogni egy szertartáson, mint egy koncerten. Válaszd ki, ami téged érdekel."
        />
      </Section>

      <div className={`${GUTTER} max-w-[120rem] mx-auto pb-20 md:pb-28`}>
        <div className="grid gap-3 sm:grid-cols-2">
          {serviceCards.map((s, i) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="group relative overflow-hidden bg-ink-950 aspect-[4/3]"
            >
              <Image
                src={s.cover}
                alt={`${s.name} fotózás — Maczkó Fotó`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover opacity-85 transition duration-700 group-hover:opacity-100 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <h3 className="font-display text-white tracking-tight text-3xl md:text-5xl">
                  {s.name}
                </h3>
                <p className="mt-2 text-white/70 text-sm md:text-base max-w-sm">{s.short}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm text-copper-400">
                  Részletek
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ───────── Rólam sáv ───────── */}
      <section id="rolam" className="bg-ink-950 text-cream-100">
        <div className={`${GUTTER} max-w-[120rem] mx-auto py-20 md:py-28`}>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="relative aspect-[3/4] max-w-md">
                <Image
                  src="/brand/mark-portrait.webp"
                  alt="Maczkó Márk fotós, Szombathely"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 xl:col-span-8">
              <p className="text-[0.7rem] uppercase tracking-[0.3em] text-cream-100/40">— Rólam</p>
              <h2 className="font-display text-cream-100 leading-[0.95] tracking-tight text-[clamp(2rem,4.5vw,3.75rem)] mt-5">
                Maczkó Márk vagyok,
                <br />
                <span className="italic text-copper-400">fotós Szombathelyen.</span>
              </h2>
              <div className="mt-8 space-y-5 text-lg text-cream-100/70 leading-relaxed max-w-2xl">
                <p>
                  Esküvőket, rendezvényeket, bulikat és sportot fotózok. Ami közös bennük:
                  egyszer történnek meg. Nincs újrafelvétel, nincs második kísérlet — vagy
                  ott vagyok a jó helyen, vagy elment a pillanat.
                </p>
                <p>
                  Sony A7 V vázzal és 24-70mm f/2.8 G Master objektívvel dolgozom, külső
                  vakukkal. Ez az a felszerelés, amivel egy sötét klubban és egy déli
                  napsütésben is használható kép készül. Minden fontos pillanat két
                  memóriakártyára íródik egyszerre.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
                <div>
                  <p className="font-display text-3xl md:text-4xl text-copper-400">{albums.length}</p>
                  <p className="text-sm text-cream-100/50 mt-1">galéria</p>
                </div>
                <div>
                  <p className="font-display text-3xl md:text-4xl text-copper-400">
                    {totalImages.toLocaleString("hu-HU")}
                  </p>
                  <p className="text-sm text-cream-100/50 mt-1">kiadott kép</p>
                </div>
                <div>
                  <p className="font-display text-3xl md:text-4xl text-copper-400">24ó</p>
                  <p className="text-sm text-cream-100/50 mt-1">válaszidő</p>
                </div>
                <div>
                  <p className="font-display text-3xl md:text-4xl text-copper-400">2</p>
                  <p className="text-sm text-cream-100/50 mt-1">váz a helyszínen</p>
                </div>
              </div>

              <Link
                href="/about"
                className="mt-10 inline-flex items-center gap-2 rounded-full border border-cream-100/25 px-7 py-3.5 text-sm font-medium text-cream-100 hover:bg-cream-100/10 transition"
              >
                Bővebben rólam
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Kiemelt munkák ───────── */}
      <Section id="munkaim" className="pb-0">
        <SectionHeader
          kicker="— Munkáim"
          title={
            <>
              Friss <span className="italic text-copper-600">galériák.</span>
            </>
          }
          description={`${albums.length} sorozat, ${totalImages.toLocaleString("hu-HU")} kép az elmúlt hónapokból.`}
        />
      </Section>

      <div className={`${GUTTER} max-w-[120rem] mx-auto pb-20 md:pb-28`}>
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          {featured.map((pic, i) => (
            <Link
              key={pic.src}
              href={pic.href}
              className={`group relative overflow-hidden bg-ink-950 ${
                i === 0 || i === 5 ? "col-span-2 aspect-[4/3]" : "aspect-[3/4]"
              }`}
            >
              <Image
                src={pic.src}
                alt={pic.alt}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-transparent opacity-90" />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                <p className="text-[0.65rem] uppercase tracking-[0.25em] text-white/60">{pic.category}</p>
                <h3 className="font-display text-lg md:text-2xl text-white mt-1.5 leading-tight">
                  {pic.albumTitle}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-full border border-ink-800/25 px-7 py-3.5 text-sm font-medium text-ink-800 hover:bg-ink-800/5 transition"
          >
            Mind az {albums.length} galéria
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* ───────── Hogyan dolgozom ───────── */}
      <section id="hogyan" className="border-y border-cream-300 bg-cream-50">
        <div className={`${GUTTER} max-w-[120rem] mx-auto py-20 md:py-28`}>
          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                icon: MapPin,
                title: "Szombathely és a vármegye",
                body: "Itt élek, ismerem a helyszíneket. Vas vármegyén belül nincs kiszállási díj, azon kívül megegyezés szerint.",
              },
              {
                icon: Clock,
                title: "Kiszámítható átfutás",
                body: `Írásra ${site.responseTime} válaszolok. Rendezvény után egy hét, esküvő után négy hét a teljes anyag — ha gyorsabb kell, azt előre megbeszéljük.`,
              },
              {
                icon: Camera,
                title: "Profi felszerelés",
                body: gear.map((g) => g.name).slice(0, 3).join(", ") + ". Tartalék vázzal és kettőzött kártyaírással.",
              },
            ].map((f) => (
              <div key={f.title}>
                <span className="h-11 w-11 rounded-full border border-cream-300 flex items-center justify-center text-copper-600">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="font-display text-2xl text-ink-800 mt-5 tracking-tight">{f.title}</h3>
                <p className="body mt-3">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <Section id="ajanlat" width="text" className="text-center">
        <p className="eyebrow">— Felkérés</p>
        <h2 className="h-section mt-4">
          Van egy dátumod,
          <br />
          <span className="italic text-copper-600">ami nem ismételhető?</span>
        </h2>
        <p className="lead mt-6">
          Írd meg, mikor és hol lesz, és mit szeretnél. {site.responseTime} válaszolok,
          konkrét ajánlattal.
        </p>
        <div className="mt-10 flex justify-center gap-3 flex-wrap">
          <Link
            href="/contact"
            className="rounded-full bg-ink-800 text-cream-50 px-7 py-3.5 text-sm font-medium hover:bg-ink-900 transition"
          >
            Ajánlatot kérek
          </Link>
          <a
            href={site.phoneHref}
            className="rounded-full border border-ink-800/25 px-7 py-3.5 text-sm font-medium text-ink-800 hover:bg-ink-800/5 transition"
          >
            {site.phone}
          </a>
        </div>
      </Section>
    </main>
  );
}
