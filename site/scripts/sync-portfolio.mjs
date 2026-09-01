// A `portfolio/` mappát tükrözi a `site/public/portfolio/` alá, webre kész formában.
//
// - A mappaneveket slug-gá alakítja (magyar ékezetek → ASCII).
// - Minden képet WebP-be konvertál, a hosszabbik oldalt max 2000 px-re húzza le.
//   Az eredeti fájlokhoz nem nyúl — a `portfolio/` marad az archívum.
// - A kimeneti nevek sorszámozottak: 01.webp, 02.webp, …
// - Kitakarítja azokat a célfájlokat és mappákat, amikhez már nincs forrás.
// - Helyben inkrementális (manifest alapján), CI-ben egy teljes kör fut le.
//
// A `predev` és a `prebuild` futtatja. Bármikor újrafuttatható.

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");
const SRC = path.join(ROOT, "portfolio");
const DST = path.join(__dirname, "..", "public", "portfolio");
const MANIFEST = path.join(DST, ".sync-manifest.json");

/** A hosszabbik oldal maximuma pixelben. */
const MAX_EDGE = 2000;
/** WebP minőség. 80 körül a különbség szabad szemmel nem látszik. */
const QUALITY = 80;
/** Egyszerre ennyi képet dolgoz fel. */
const CONCURRENCY = 8;

const HUN_MAP = {
  á: "a", é: "e", í: "i", ó: "o", ö: "o", ő: "o", ú: "u", ü: "u", ű: "u",
  Á: "A", É: "E", Í: "I", Ó: "O", Ö: "O", Ű: "U", Ú: "U", Ü: "U", Ő: "O",
};

function slugify(name) {
  const ascii = name
    .split("")
    .map((ch) => HUN_MAP[ch] ?? ch)
    .join("");
  return ascii
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function leadingNum(name) {
  const m = name.match(/\d+/);
  return m ? parseInt(m[0], 10) : Number.MAX_SAFE_INTEGER;
}

async function readDirSafe(p) {
  try {
    return await fs.readdir(p, { withFileTypes: true });
  } catch {
    return [];
  }
}

async function loadManifest() {
  try {
    return JSON.parse(await fs.readFile(MANIFEST, "utf8"));
  } catch {
    return {};
  }
}

/** Egyszerű futószalag: legfeljebb CONCURRENCY feladat fut egyszerre. */
async function pool(items, worker) {
  let i = 0;
  const runners = Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++;
      await worker(items[idx]);
    }
  });
  await Promise.all(runners);
}

/**
 * Egy képet átméretez és WebP-be ment. Kihagyja, ha a manifest szerint a forrás
 * nem változott és a célfájl megvan.
 */
async function convert(srcFile, dstFile, manifest, nextManifest) {
  const key = path.relative(ROOT, srcFile).split(path.sep).join("/");
  const st = await fs.stat(srcFile);
  const prev = manifest[key];
  const stamp = { size: st.size, mtimeMs: Math.round(st.mtimeMs), out: path.basename(dstFile) };

  if (prev && prev.size === stamp.size && prev.mtimeMs === stamp.mtimeMs && prev.out === stamp.out) {
    try {
      await fs.stat(dstFile);
      nextManifest[key] = stamp;
      return false;
    } catch {
      // a célfájl eltűnt — újra kell csinálni
    }
  }

  await sharp(srcFile, { failOn: "none" })
    .rotate() // EXIF szerinti forgatás beégetése
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 4 })
    .toFile(dstFile);

  nextManifest[key] = stamp;
  return true;
}

async function syncAlbum(srcDir, dstDir, manifest, nextManifest) {
  await fs.mkdir(dstDir, { recursive: true });

  const srcImages = (await readDirSafe(srcDir))
    .filter((e) => e.isFile() && /\.(jpe?g|png|webp|avif|tiff?)$/i.test(e.name))
    .sort((a, b) => {
      const an = leadingNum(a.name);
      const bn = leadingNum(b.name);
      if (an !== bn) return an - bn;
      return a.name.localeCompare(b.name, "hu");
    });

  const jobs = srcImages.map((e, i) => ({
    src: path.join(srcDir, e.name),
    dst: path.join(dstDir, `${String(i + 1).padStart(2, "0")}.webp`),
  }));

  let converted = 0;
  await pool(jobs, async (j) => {
    if (await convert(j.src, j.dst, manifest, nextManifest)) converted++;
  });

  // Ami nem szerepel a várt nevek között, az elavult — törölhető.
  const expected = new Set(jobs.map((j) => path.basename(j.dst)));
  let removed = 0;
  for (const f of await readDirSafe(dstDir)) {
    if (!f.isFile() || !expected.has(f.name)) {
      if (f.isFile()) {
        await fs.unlink(path.join(dstDir, f.name));
        removed++;
      }
    }
  }

  return { count: jobs.length, converted, removed };
}

async function dirSize(dir) {
  let total = 0;
  for (const e of await readDirSafe(dir)) {
    const p = path.join(dir, e.name);
    total += e.isDirectory() ? await dirSize(p) : (await fs.stat(p)).size;
  }
  return total;
}

async function main() {
  const t0 = Date.now();
  // Az alulvonással kezdődő mappák nem kerülnek ki az oldalra. Így lehet egy
  // galériát ideiglenesen levenni anélkül, hogy a képeket törölni kellene.
  const srcFolders = (await readDirSafe(SRC)).filter(
    (e) => e.isDirectory() && !e.name.startsWith("_"),
  );

  await fs.mkdir(DST, { recursive: true });
  const dstFolderNames = (await readDirSafe(DST)).filter((e) => e.isDirectory()).map((e) => e.name);

  const slugToSrc = new Map();
  for (const f of srcFolders) {
    const slug = slugify(f.name);
    if (slug) slugToSrc.set(slug, f.name);
  }

  const manifest = await loadManifest();
  const nextManifest = {};
  const results = [];

  for (const [slug, srcName] of slugToSrc) {
    const r = await syncAlbum(path.join(SRC, srcName), path.join(DST, slug), manifest, nextManifest);
    results.push({ slug, srcName, ...r });
  }

  for (const dstName of dstFolderNames) {
    if (!slugToSrc.has(dstName)) {
      await fs.rm(path.join(DST, dstName), { recursive: true, force: true });
      results.push({ slug: dstName, srcName: "(nincs forrás)", count: 0, converted: 0, removed: 1, dropped: true });
    }
  }

  await fs.writeFile(MANIFEST, JSON.stringify(nextManifest), "utf8");

  const total = results.reduce((s, r) => s + r.count, 0);
  const totalConverted = results.reduce((s, r) => s + r.converted, 0);
  const totalRemoved = results.reduce((s, r) => s + r.removed, 0);
  const mb = ((await dirSize(DST)) / 1048576).toFixed(0);
  const secs = ((Date.now() - t0) / 1000).toFixed(1);

  console.log(
    `[sync-portfolio] ${results.length} album · ${total} kép · ${totalConverted} konvertálva · ` +
      `${totalRemoved} elavult törölve · ${mb} MB · ${secs}s`,
  );
  for (const r of results) {
    if (r.dropped) {
      console.log(`  − ${r.slug}  (nincs hozzá forrásmappa — törölve)`);
    } else if (r.converted > 0 || r.removed > 0) {
      console.log(
        `  · ${r.slug.padEnd(30)} ${String(r.count).padStart(3)} kép  (+${r.converted} / -${r.removed})  ← ${r.srcName}`,
      );
    }
  }
}

main().catch((err) => {
  console.error("[sync-portfolio] hiba:", err);
  process.exit(1);
});
