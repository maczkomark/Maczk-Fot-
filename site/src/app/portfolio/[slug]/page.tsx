import { albums, getAlbum } from "@/lib/albums";
import { MasonryGallery } from "@/components/ui/masonry-gallery";
import { Section, Eyebrow } from "@/components/ui/section";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, MapPin } from "lucide-react";

export function generateStaticParams() {
  return albums.map((a) => ({ slug: a.slug }));
}

export default function AlbumPage({ params }: { params: { slug: string } }) {
  const album = getAlbum(params.slug);
  if (!album) return notFound();

  const idx = albums.findIndex((a) => a.slug === album.slug);
  const prev = albums[(idx - 1 + albums.length) % albums.length];
  const next = albums[(idx + 1) % albums.length];

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
        <Image src={album.cover} alt={album.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream-100 via-cream-100/30 to-cream-100/30" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="px-6 md:px-12 max-w-7xl mx-auto pb-16 md:pb-20">
            <Link href="/portfolio" className="inline-flex items-center gap-2 brand-chip text-white/80 hover:text-white transition">
              <ArrowLeft className="h-3.5 w-3.5" /> Vissza a munkáimhoz
            </Link>
            <p className="on-image-eyebrow mt-8">— {album.category}</p>
            <h1 className="font-display text-5xl md:text-7xl text-white leading-[0.9] tracking-tight mt-4">
              {album.title}
            </h1>
            {(album.date || album.location) && (
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/80">
                {album.date && (
                  <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" /> {album.date}</span>
                )}
                {album.location && (
                  <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> {album.location}</span>
                )}
                <span>{album.count} kép</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Description */}
      {album.description && (
        <Section className="!py-20 md:!py-24">
          <div className="max-w-3xl">
            <Eyebrow>— Az album</Eyebrow>
            <p className="font-display text-2xl md:text-3xl text-ink-800 leading-relaxed mt-6">
              {album.description}
            </p>
          </div>
        </Section>
      )}

      {/* Gallery */}
      <Section className="!pt-0">
        <MasonryGallery images={album.images} title={album.title} />
      </Section>

      {/* Prev / Next */}
      <Section className="border-t border-cream-300 !py-16 md:!py-20">
        <div className="grid md:grid-cols-2 gap-4">
          <Link href={`/portfolio/${prev.slug}`} className="group relative h-56 md:h-64 rounded-sm overflow-hidden border border-cream-300">
            <Image src={prev.cover} alt={prev.title} fill sizes="50vw" className="object-cover opacity-60 group-hover:opacity-90 transition duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 to-transparent" />
            <div className="absolute inset-0 p-8 flex flex-col justify-center">
              <span className="on-image-eyebrow inline-flex items-center gap-2">
                <ArrowLeft className="h-3.5 w-3.5" /> Előző
              </span>
              <p className="font-display text-2xl md:text-3xl text-white mt-3">{prev.title}</p>
            </div>
          </Link>
          <Link href={`/portfolio/${next.slug}`} className="group relative h-56 md:h-64 rounded-sm overflow-hidden border border-cream-300">
            <Image src={next.cover} alt={next.title} fill sizes="50vw" className="object-cover opacity-60 group-hover:opacity-90 transition duration-500" />
            <div className="absolute inset-0 bg-gradient-to-l from-black/85 to-transparent" />
            <div className="absolute inset-0 p-8 flex flex-col justify-center items-end text-right">
              <span className="on-image-eyebrow inline-flex items-center gap-2">
                Következő <ArrowRight className="h-3.5 w-3.5" />
              </span>
              <p className="font-display text-2xl md:text-3xl text-white mt-3">{next.title}</p>
            </div>
          </Link>
        </div>
      </Section>
    </main>
  );
}
