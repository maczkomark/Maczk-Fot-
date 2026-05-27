import fs from "node:fs";
import path from "node:path";
import { albumMeta, manualOrder, humanize, type AlbumMeta } from "./albums.config";

export type Album = {
  slug: string;
  title: string;
  category: string;
  date?: string;
  location?: string;
  description?: string;
  count: number;
  cover: string;
  featured: number;
  images: string[];
  hidden?: boolean;
};

const PUBLIC_DIR = path.join(process.cwd(), "public", "portfolio");

function readAlbums(): Album[] {
  if (!fs.existsSync(PUBLIC_DIR)) return [];

  const slugs = fs
    .readdirSync(PUBLIC_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const albums: Album[] = [];

  for (const slug of slugs) {
    const dir = path.join(PUBLIC_DIR, slug);
    const files = fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
      .sort((a, b) => {
        const am = a.match(/\d+/);
        const bm = b.match(/\d+/);
        const an = am ? parseInt(am[0], 10) : 0;
        const bn = bm ? parseInt(bm[0], 10) : 0;
        if (an !== bn) return an - bn;
        return a.localeCompare(b, "hu");
      });

    if (files.length === 0) continue;

    const meta: AlbumMeta = albumMeta[slug] ?? {
      title: humanize(slug),
      category: "Egyéb",
    };

    if (meta.hidden) continue;

    const featuredIdx = Math.min(Math.max(1, meta.featured ?? 1), files.length);
    const cover = `/portfolio/${slug}/${files[featuredIdx - 1]}`;
    const images = files.map((f) => `/portfolio/${slug}/${f}`);

    albums.push({
      slug,
      title: meta.title,
      category: meta.category,
      date: meta.date,
      location: meta.location,
      description: meta.description,
      count: files.length,
      cover,
      featured: featuredIdx,
      images,
    });
  }

  // Sort: explicit manualOrder first (in given order), then the rest alphabetically.
  const orderIdx = new Map(manualOrder.map((s, i) => [s, i]));
  albums.sort((a, b) => {
    const ai = orderIdx.get(a.slug) ?? Number.MAX_SAFE_INTEGER;
    const bi = orderIdx.get(b.slug) ?? Number.MAX_SAFE_INTEGER;
    if (ai !== bi) return ai - bi;
    return a.title.localeCompare(b.title, "hu");
  });

  return albums;
}

/** Cached at module level — Next builds will execute once per server start. */
export const albums: Album[] = readAlbums();

export const getAlbum = (slug: string): Album | undefined =>
  albums.find((a) => a.slug === slug);

export const getAlbumsByCategory = (category: string): Album[] =>
  albums.filter((a) => a.category === category);

/**
 * Hero parallax pictures — automatikusan választ vegyes képeket a felfedezett
 * albumokból. Minden albumból a borító + 1-2 másik kép.
 */
export function getHeroPhotos(): { title: string; src: string; href: string }[] {
  const result: { title: string; src: string; href: string }[] = [];
  // Először minden album borítójából.
  for (const a of albums) {
    result.push({ title: a.title, src: a.cover, href: `/portfolio/${a.slug}` });
    if (result.length >= 18) break;
  }
  return result;
}

/** Marquee picks — 12 erős, vegyes album-borító. */
export function getMarqueePhotos(): { src: string; caption: string }[] {
  return albums.slice(0, 12).map((a) => ({ src: a.cover, caption: a.title }));
}
