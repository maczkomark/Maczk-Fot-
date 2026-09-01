import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, MapPin, Images } from "lucide-react";
import { albums, getAlbum } from "@/lib/albums";
import { MasonryGallery } from "@/components/ui/masonry-gallery";
import { JsonLd } from "@/components/site/jsonld";
import { GUTTER } from "@/components/ui/section";
import { breadcrumbLd, galleryLd, pageMeta } from "@/lib/seo";
import { services, site } from "@/lib/site";

export function generateStaticParams() {
  return albums.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const album = getAlbum(params.slug);
  if (!album) return {};
  const what = album.category.toLowerCase();
  return pageMeta({
    title: `${album.title} — ${album.category} fotózás | Maczkó Fotó`,
    description:
      album.description ??
      `${album.title} — ${what} fotózás ${album.location ?? site.city} környékén, ${album.count} képpel.`,
    path: `/portfolio/${album.slug}`,
    image: album.cover,
  });
}

export default function AlbumPage({ params }: { params: { slug: string } }) {
  const album = getAlbum(params.slug);
  if (!album) return notFound();

  const idx = albums.findIndex((a) => a.slug === album.slug);
  const prev = albums[(idx - 1 + albums.length) % albums.length];
  const next = albums[(idx + 1) % albums.length];
  const service = services.find((s) => s.categories.includes(album.category));

  return (
    <main>
      <JsonLd
        data={[
          galleryLd({
            name: album.title,
            description: album.description,
            path: `/portfolio/${album.slug}`,
            images: album.images,
          }),
          breadcrumbLd([
            { name: "Főoldal", path: "/" },
            { name: "Munkáim", path: "/portfolio" },
            { name: album.title, path: `/portfolio/${album.slug}` },
          ]),
        ]}
      />

      {/* ───── Fejléckép ───── */}
      <section className="relative h-[78svh] min-h-[480px] w-full overflow-hidden bg-ink-950">
        <Image src={album.cover} alt={album.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/75 via-ink-950/25 to-ink-950/95" />
        <div className={`absolute inset-x-0 bottom-0 ${GUTTER} max-w-[120rem] mx-auto pb-14 md:pb-20`}>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/70 hover:text-white transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Minden galéria
          </Link>
          <p className="on-image text-xs uppercase tracking-[0.35em] text-white/85 mt-8">{album.category}</p>
          <h1 className="on-image font-display text-white leading-[0.92] tracking-tight text-[clamp(1.9rem,6vw,5.5rem)] mt-4 max-w-5xl">
            {album.title}
          </h1>
          <div className="on-image mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/85">
            {album.date && (
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4" /> {album.date}
              </span>
            )}
            {album.location && (
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" /> {album.location}
              </span>
            )}
            <span className="inline-flex items-center gap-2">
              <Images className="h-4 w-4" /> {album.count} kép
            </span>
          </div>
        </div>
      </section>

      {/* ───── Leírás ───── */}
      {album.description && (
        <section className={`${GUTTER} max-w-[120rem] mx-auto py-16 md:py-24`}>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="text-xl md:text-3xl text-ink-800 leading-relaxed max-w-4xl">
                {album.description}
              </p>
            </div>
            {service && (
              <div className="lg:col-span-4 lg:text-right">
                <p className="eyebrow">— Hasonlót keresel?</p>
                <Link
                  href={`/${service.slug}`}
                  className="mt-4 inline-flex items-center gap-2 font-display text-2xl text-ink-800 hover:text-copper-600 transition"
                >
                  {service.name} fotózás
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ───── Galéria ───── */}
      <div className={`${GUTTER} max-w-[120rem] mx-auto ${album.description ? "" : "pt-16 md:pt-24"} pb-20 md:pb-28`}>
        <MasonryGallery images={album.images} title={album.title} />
      </div>

      {/* ───── Előző / következő ───── */}
      <section className="border-t border-cream-300">
        <div className="grid md:grid-cols-2">
          <Link href={`/portfolio/${prev.slug}`} className="group relative h-56 md:h-72 overflow-hidden bg-ink-950">
            <Image
              src={prev.cover}
              alt={prev.title}
              fill
              sizes="50vw"
              className="object-cover opacity-50 group-hover:opacity-80 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 to-transparent" />
            <div className={`absolute inset-0 flex flex-col justify-center px-8 lg:px-14`}>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/60">
                <ArrowLeft className="h-3.5 w-3.5" /> Előző
              </span>
              <p className="font-display text-2xl md:text-3xl text-white mt-3">{prev.title}</p>
            </div>
          </Link>
          <Link href={`/portfolio/${next.slug}`} className="group relative h-56 md:h-72 overflow-hidden bg-ink-950">
            <Image
              src={next.cover}
              alt={next.title}
              fill
              sizes="50vw"
              className="object-cover opacity-50 group-hover:opacity-80 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-ink-950/90 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center items-end text-right px-8 lg:px-14">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/60">
                Következő <ArrowRight className="h-3.5 w-3.5" />
              </span>
              <p className="font-display text-2xl md:text-3xl text-white mt-3">{next.title}</p>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
