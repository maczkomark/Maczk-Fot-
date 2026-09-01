import { albums } from "./albums";

/**
 * A nyitóoldal és a szolgáltatás-oldalak nem az album-borítókat ismételgetik,
 * hanem ebből a közös készletből válogatnak. A készletbe albumonként néhány
 * kézzel kiválasztott kép kerül (lásd `highlights` az albums.config.ts-ben).
 *
 * A sorrend buildenként változik, de egy buildben stabil — így minden deploy
 * után más képek fogadják a látogatót, de egy adott oldalon nem ugrálnak.
 */

export type Pick = {
  src: string;
  alt: string;
  href: string;
  albumTitle: string;
  category: string;
  slug: string;
};

export const highlightPool: Pick[] = albums.flatMap((a) =>
  a.highlights.map((src) => ({
    src,
    alt: `${a.title} — ${a.category.toLowerCase()} fotózás, Maczkó Fotó`,
    href: `/portfolio/${a.slug}`,
    albumTitle: a.title,
    category: a.category,
    slug: a.slug,
  })),
);

/**
 * Napra pontos alapérték: ugyanaz az egész buildben (több worker esetén is),
 * de két különböző napon indított deploy más válogatást ad.
 * Kézzel felülírható: PICK_SEED=123 npm run build
 */
const BUILD_SEED = Number(
  process.env.PICK_SEED ?? new Date().toISOString().slice(0, 10).replace(/-/g, ""),
);

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(input: T[], seed: number): T[] {
  const arr = [...input];
  const rnd = mulberry32(seed);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function pickHighlights({
  count,
  categories,
  exclude = [],
  onePerAlbum = true,
  seedKey = "",
}: {
  count: number;
  /** Ha meg van adva, csak ezekből a kategóriákból válogat. */
  categories?: string[];
  /** Ezek a képek már máshol szerepelnek az oldalon. */
  exclude?: string[];
  /** Albumonként legfeljebb egy kép, hogy vegyes legyen a válogatás. */
  onePerAlbum?: boolean;
  /** Szekciónként más sorrend. */
  seedKey?: string;
}): Pick[] {
  const skip = new Set(exclude);
  const base = categories
    ? highlightPool.filter((p) => categories.includes(p.category))
    : highlightPool;

  const shuffled = shuffle(base, BUILD_SEED ^ hashString(seedKey));

  const out: Pick[] = [];
  const usedAlbums = new Set<string>();

  for (const pass of [true, false]) {
    for (const p of shuffled) {
      if (out.length >= count) break;
      if (skip.has(p.src) || out.some((o) => o.src === p.src)) continue;
      // Első kör: albumonként csak egy. Második kör: ha még kell, jöhet több is.
      if (pass && onePerAlbum && usedAlbums.has(p.slug)) continue;
      out.push(p);
      usedAlbums.add(p.slug);
    }
    if (out.length >= count || !onePerAlbum) break;
  }

  return out;
}
