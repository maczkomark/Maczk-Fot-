import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { JsonLd } from "@/components/site/jsonld";
import { Section, SectionHeader, GUTTER } from "@/components/ui/section";
import { albums, getAlbum } from "@/lib/albums";
import { services, site, type Service } from "@/lib/site";
import { breadcrumbLd, faqLd, serviceLd } from "@/lib/seo";

export function ServicePage({ service }: { service: Service }) {
  const heroAlbum = getAlbum(service.heroAlbum);
  const related = albums.filter((a) => service.categories.includes(a.category));
  const heroSrc = heroAlbum?.cover ?? related[0]?.cover ?? albums[0]?.cover ?? "";

  // Vegyes válogatás a kapcsolódó albumok képeiből, hogy legyen mit nézni.
  const strip: { src: string; alt: string; href: string }[] = [];
  for (const a of related) {
    for (const src of a.images.slice(0, 3)) {
      strip.push({ src, alt: `${a.title} — ${service.name.toLowerCase()} fotózás`, href: `/portfolio/${a.slug}` });
    }
    if (strip.length >= 12) break;
  }

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <main>
      <JsonLd
        data={[
          serviceLd({
            name: service.heading,
            description: service.description,
            path: `/${service.slug}`,
          }),
          faqLd(service.faq),
          breadcrumbLd([
            { name: "Főoldal", path: "/" },
            { name: service.name, path: `/${service.slug}` },
          ]),
        ]}
      />

      {/* ───── Fejléckép ───── */}
      <section className="relative h-[72svh] min-h-[460px] w-full overflow-hidden bg-ink-950">
        {heroSrc && (
          <Image src={heroSrc} alt={service.heading} fill priority sizes="100vw" className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/75 via-ink-950/25 to-ink-950/95" />
        <div className={`absolute inset-x-0 bottom-0 ${GUTTER} max-w-[120rem] mx-auto pb-14 md:pb-20`}>
          <p className="on-image text-xs uppercase tracking-[0.35em] text-white/85 mb-5">
            {site.city} · {site.region}
          </p>
          <h1 className="on-image font-display text-white leading-[0.92] tracking-tight text-[clamp(1.9rem,6vw,5.5rem)] max-w-5xl">
            {service.heading}
          </h1>
        </div>
      </section>

      {/* ───── Bevezető + mit tartalmaz ───── */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="space-y-6">
              {service.intro.map((p, i) => (
                <p key={i} className={i === 0 ? "text-xl md:text-2xl text-ink-800 leading-relaxed" : "lead"}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="border border-cream-300 bg-cream-50 p-8 md:p-10">
              <p className="eyebrow">— Amit kapsz</p>
              <ul className="mt-6 space-y-4">
                {service.includes.map((it) => (
                  <li key={it} className="flex gap-3">
                    <Check className="h-5 w-5 text-copper-600 shrink-0 mt-0.5" />
                    <span className="body">{it}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink-800 text-cream-50 px-6 py-3.5 text-sm font-medium hover:bg-ink-900 transition"
              >
                Ajánlatot kérek
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="caption mt-4 text-center">
                Vagy hívj: <a href={site.phoneHref} className="text-ink-800 hover:text-copper-600">{site.phone}</a>
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ───── Képsáv ───── */}
      {strip.length > 0 && (
        <>
          <Section className="pt-0 pb-0">
            <SectionHeader
              kicker="— Munkáim"
              title={
                <>
                  Így néz ki <span className="italic text-copper-600">a gyakorlatban.</span>
                </>
              }
            />
          </Section>
          <div className={`${GUTTER} max-w-[120rem] mx-auto pb-20 md:pb-28`}>
            <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {strip.slice(0, 12).map((img, i) => (
                <Link
                  key={img.src}
                  href={img.href}
                  className={`group relative overflow-hidden bg-ink-950 ${
                    i % 7 === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-[3/4]"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                </Link>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ───── Kapcsolódó galériák ───── */}
      {related.length > 0 && (
        <section className="border-y border-cream-300 bg-cream-50">
          <div className={`${GUTTER} max-w-[120rem] mx-auto py-20 md:py-28`}>
            <SectionHeader
              kicker="— Galériák"
              title={
                <>
                  Teljes <span className="italic text-copper-600">sorozatok.</span>
                </>
              }
              description={`${related.length} galéria ebben a műfajban.`}
            />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {related.slice(0, 8).map((a) => (
                <Link
                  key={a.slug}
                  href={`/portfolio/${a.slug}`}
                  className="group relative aspect-[4/5] overflow-hidden bg-ink-950"
                >
                  <Image
                    src={a.cover}
                    alt={a.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-display text-xl md:text-2xl text-white leading-tight">{a.title}</h3>
                    <p className="text-xs text-white/60 mt-1.5">
                      {a.date} · {a.count} kép
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───── GYIK ───── */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="eyebrow">— Gyakori kérdések</p>
            <h2 className="h-sub mt-4">
              Amit a legtöbben <span className="italic text-copper-600">kérdeznek.</span>
            </h2>
            <p className="body mt-5">
              Ha valamire nem találsz itt választ, írj — {site.responseTime} válaszolok.
            </p>
          </div>
          <div className="lg:col-span-8">
            <dl className="divide-y divide-cream-300 border-y border-cream-300">
              {service.faq.map((f) => (
                <div key={f.q} className="py-7">
                  <dt className="font-display text-xl md:text-2xl text-ink-800 tracking-tight">{f.q}</dt>
                  <dd className="body mt-3 max-w-2xl">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* ───── Többi szolgáltatás ───── */}
      <section className="bg-ink-950 text-cream-100">
        <div className={`${GUTTER} max-w-[120rem] mx-auto py-16 md:py-20`}>
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-cream-100/40 mb-8">
            — Mást keresel?
          </p>
          <div className="flex flex-wrap gap-3">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="rounded-full border border-cream-100/25 px-6 py-3 text-sm hover:bg-cream-100/10 transition"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
