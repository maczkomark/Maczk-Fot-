import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { AppleCardsCarousel } from "@/components/ui/apple-cards-carousel";
import { InfiniteMovingImages } from "@/components/ui/infinite-moving-images";
import { Section, Eyebrow } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Frame } from "@/components/ui/frame";
import { albums, getMarqueePhotos } from "@/lib/albums";
import { categoryIcon } from "@/lib/albums.config";
import Image from "next/image";
import Link from "next/link";
import {
  Camera, Trophy, Building2, Music, Heart, UtensilsCrossed, Bird, Calendar, Image as ImageIcon,
} from "lucide-react";
import fs from "node:fs";
import path from "node:path";

function iconFor(cat: string) {
  const k = categoryIcon[cat] ?? "image";
  const cls = "h-3.5 w-3.5";
  switch (k) {
    case "heart": return <Heart className={cls} />;
    case "trophy": return <Trophy className={cls} />;
    case "calendar": return <Calendar className={cls} />;
    case "music": return <Music className={cls} />;
    case "camera": return <Camera className={cls} />;
    case "building": return <Building2 className={cls} />;
    case "bird": return <Bird className={cls} />;
    case "utensils": return <UtensilsCrossed className={cls} />;
    default: return <ImageIcon className={cls} />;
  }
}

const hasLogo = fs.existsSync(path.join(process.cwd(), "public", "brand", "logo.png"));
const hasCover = fs.existsSync(path.join(process.cwd(), "public", "brand", "cover.png"));

const services = [
  { n: "01", title: "Esküvő", desc: "Teljes nap dokumentálása" },
  { n: "02", title: "Portré", desc: "Egyéni, párkapcsolati, családi" },
  { n: "03", title: "Esemény", desc: "Rendezvény, ballagás, céges" },
  { n: "04", title: "Videó", desc: "Mozgókép, reels, kisfilm" },
];

export default function Home() {
  const featured = albums.slice(0, 7);
  const carousel = albums.map((a) => ({
    category: a.category,
    title: a.title,
    src: a.cover,
    href: `/portfolio/${a.slug}`,
  }));
  const marquee = getMarqueePhotos();
  const totalImages = albums.reduce((s, a) => s + a.count, 0);

  return (
    <main className="overflow-x-hidden">
      {/* ───── HERO — poster-style ───── */}
      <section className="relative pt-28 md:pt-32 pb-20 md:pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <Frame className="px-6 md:px-12 lg:px-20 py-12 md:py-20">
            {/* Top meta row */}
            <div className="flex items-center justify-between mb-12 md:mb-20">
              <span className="brand-chip">Maczkó Fotó · EST · 2026</span>
              <span className="brand-chip hidden sm:inline">F/2.8 — ISO 400</span>
            </div>

            {/* Sub-eyebrow with em-dash */}
            <p className="brand-chip mb-6 md:mb-8">— maczkofoto.hu / a pillanat</p>

            {/* Small italic intro */}
            <p className="font-display italic text-xl md:text-2xl text-copper-600 mb-4 md:mb-6">
              a pillanat,
            </p>

            {/* Hero wordmark / logo */}
            {hasLogo ? (
              <div className="my-2 md:my-4">
                <Image
                  src="/brand/logo.png"
                  alt="Maczkó Fotó"
                  width={900}
                  height={300}
                  priority
                  className="w-full max-w-3xl h-auto"
                />
              </div>
            ) : (
              <h1 className="font-display text-ink-800 leading-[0.85] tracking-tight">
                <span className="block text-[clamp(4rem,16vw,11rem)]">Maczkó</span>
                <span className="block italic text-copper-600 text-[clamp(4rem,16vw,11rem)] -mt-2 md:-mt-4">Fotó</span>
              </h1>
            )}

            {/* Tagline */}
            <p className="lead mt-10 md:mt-12 max-w-xl">
              Új weboldal készül. Esküvő, portré, esemény, családi pillanatok —
              egy fotós, sok történet.
            </p>

            {/* Services list */}
            <div className="mt-12 md:mt-16">
              <div className="flex items-center gap-4 mb-6">
                <span className="hr-dash flex-1" />
                <span className="brand-chip">Szolgáltatások</span>
                <span className="hr-dash flex-1" />
              </div>
              <ul className="divide-y divide-cream-300 border-y border-cream-300">
                {services.map((s) => (
                  <li key={s.n} className="flex items-center justify-between py-4 md:py-5">
                    <div className="flex items-baseline gap-4 md:gap-6">
                      <span className="stamp w-10 shrink-0">{s.n}</span>
                      <span className="font-display text-2xl md:text-3xl text-ink-800 tracking-tight">{s.title}</span>
                    </div>
                    <span className="brand-chip text-right">{s.desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pull quote */}
            <div className="mt-16 md:mt-20 text-center max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="hr-dash w-12" />
                <span className="text-copper-600">◆</span>
                <span className="hr-dash w-12" />
              </div>
              <p className="font-display italic text-xl md:text-2xl text-ink-800 leading-relaxed">
                „Egy fotó nem csak <span className="text-copper-600">kép</span> —
                <br className="hidden md:block" /> egy emlék, amit örökre megtarthatsz."
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-12 md:mt-16 flex flex-wrap justify-center gap-3">
              <Button href="/portfolio">Munkáim megtekintése →</Button>
              <Button href="/contact" variant="secondary">Felkérés</Button>
            </div>
          </Frame>
        </div>
      </section>

      {/* ───── COVER BAND — Facebook cover if present ───── */}
      {hasCover && (
        <section className="px-6 md:px-12 mb-20 md:mb-24">
          <div className="max-w-6xl mx-auto">
            <Image
              src="/brand/cover.png"
              alt="Maczkó Fotó — boríték"
              width={2400}
              height={900}
              className="w-full h-auto rounded-sm"
            />
          </div>
        </section>
      )}

      {/* ───── MARQUEE — recent works ───── */}
      <section className="py-10 md:py-14 border-y border-cream-300 bg-cream-50/70">
        <div className="px-6 md:px-12 max-w-7xl mx-auto mb-6">
          <div className="flex items-center justify-center gap-4">
            <span className="hr-dash w-16" />
            <span className="brand-chip">Legutóbbi munkák</span>
            <span className="hr-dash w-16" />
          </div>
        </div>
        <InfiniteMovingImages images={marquee} speed="slow" direction="left" />
      </section>

      {/* ───── BENTO — kiemelt albumok ───── */}
      <Section id="munkaim">
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <Eyebrow>— Munkáim</Eyebrow>
            <h2 className="h-section mt-4">
              Kiemelt <span className="italic text-copper-600">albumok.</span>
            </h2>
          </div>
          <p className="md:max-w-md lead">
            Egy szelet a friss munkákból — esküvő, sport, esemény és portré. Kattints
            bármelyikre az album megnyitásához.
          </p>
        </div>

        <BentoGrid>
          <BentoGridItem
            className="md:col-span-2 md:row-span-2 h-[28rem] md:h-auto"
            title={featured[0].title}
            description={featured[0].category}
            icon={iconFor(featured[0].category)}
            href={`/portfolio/${featured[0].slug}`}
            header={
              <Image src={featured[0].cover} alt={featured[0].title} fill sizes="(max-width: 768px) 100vw, 66vw" className="object-cover transition duration-700 group-hover:scale-105" />
            }
          />
          {featured.slice(1, 4).map((a, i) => (
            <BentoGridItem
              key={a.slug}
              className="h-72 md:h-auto"
              title={a.title}
              description={a.category}
              icon={iconFor(a.category)}
              href={`/portfolio/${a.slug}`}
              header={
                <Image src={a.cover} alt={a.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
              }
            />
          ))}
          {featured.slice(4, 6).map((a) => (
            <BentoGridItem
              key={a.slug}
              className="md:col-span-2 h-72 md:h-auto"
              title={a.title}
              description={a.category}
              icon={iconFor(a.category)}
              href={`/portfolio/${a.slug}`}
              header={
                <Image src={a.cover} alt={a.title} fill sizes="(max-width: 768px) 100vw, 66vw" className="object-cover transition duration-700 group-hover:scale-105" />
              }
            />
          ))}
          {featured[6] && (
            <BentoGridItem
              className="h-72 md:h-auto"
              title={featured[6].title}
              description={featured[6].category}
              icon={iconFor(featured[6].category)}
              href={`/portfolio/${featured[6].slug}`}
              header={
                <Image src={featured[6].cover} alt={featured[6].title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
              }
            />
          )}
        </BentoGrid>
      </Section>

      {/* ───── CAROUSEL — minden album ───── */}
      <Section bare className="border-t border-cream-300">
        <div className="px-6 md:px-12 max-w-7xl mx-auto mb-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <Eyebrow>— A teljes archívum</Eyebrow>
              <h2 className="h-section mt-4">Minden <span className="italic text-copper-600">albumom.</span></h2>
            </div>
            <p className="md:max-w-md lead">
              {albums.length} sorozat · {totalImages} kép. Görgess oldalra a felfedezéshez.
            </p>
          </div>
        </div>
        <AppleCardsCarousel cards={carousel} />
      </Section>

      {/* ───── CTA ───── */}
      <Section className="border-t border-cream-300">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="hr-dash w-16" />
            <span className="text-copper-600">◆</span>
            <span className="hr-dash w-16" />
          </div>
          <Eyebrow>— Felkérés</Eyebrow>
          <h2 className="h-section mt-4">
            Van egy pillanat,<br />
            <span className="italic text-copper-600">amit megőriznél?</span>
          </h2>
          <p className="lead mt-6 max-w-xl mx-auto">
            Esküvő, portré, esemény vagy videó — szólj, és beszélgessünk arról, hogyan kelthetjük életre.
          </p>
          <div className="mt-10 flex justify-center gap-3 flex-wrap">
            <Button href="/contact">Kapcsolat felvétele →</Button>
            <Button href="/about" variant="secondary">Rólam</Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
