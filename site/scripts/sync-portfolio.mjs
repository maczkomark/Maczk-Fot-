// Mirrors the source `portfolio/` folder into `site/public/portfolio/`.
// - Slugifies folder names (Hungarian accents → ASCII).
// - Preserves image files with cleaned, naturally-sorted, sequential names (01.jpg, 02.jpg, ...).
// - Removes destination subfolders that no longer have a source.
// - Removes destination images that no longer have a source.
// Runs on `predev` and `prebuild`. Safe to re-run.

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");          // .../fotosoldal
const SRC = path.join(ROOT, "portfolio");                  // source
const DST = path.join(__dirname, "..", "public", "portfolio"); // mirror

const HUN_MAP = {
  á: "a", é: "e", í: "i", ó: "o", ö: "o", ő: "o", ú: "u", ü: "u", ű: "u",
  Á: "A", É: "E", Í: "I", Ó: "O", Ö: "O", Ő: "O", Ú: "U", Ü: "U", Ű: "U",
};

function slugify(name) {
  const ascii = name
    .split("")
    .map((ch) => HUN_MAP[ch] ?? ch)
    .join("");
  return ascii
    // Insert dash between lowercase-uppercase boundary: "BalogunyomMajális" → "Balogunyom-Majalis"
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    // Insert dash between consecutive uppercase + lowercase: "SZKKAFinal" → "SZKKA-Final"
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function leadingNum(name) {
  // Extract first integer in filename, fallback to large number.
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

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function copyIfChanged(srcFile, dstFile) {
  const sStat = await fs.stat(srcFile);
  try {
    const dStat = await fs.stat(dstFile);
    if (dStat.size === sStat.size && dStat.mtimeMs >= sStat.mtimeMs) return false;
  } catch {
    // dst missing — copy
  }
  await fs.copyFile(srcFile, dstFile);
  return true;
}

async function syncAlbum(srcDir, dstDir) {
  await ensureDir(dstDir);

  const srcImages = (await readDirSafe(srcDir))
    .filter((e) => e.isFile() && /\.(jpe?g|png|webp|avif)$/i.test(e.name))
    .sort((a, b) => {
      const an = leadingNum(a.name);
      const bn = leadingNum(b.name);
      if (an !== bn) return an - bn;
      return a.name.localeCompare(b.name, "hu");
    });

  let copied = 0;
  const expectedNames = new Set();
  for (let i = 0; i < srcImages.length; i++) {
    const ext = path.extname(srcImages[i].name).toLowerCase().replace(/^\.jpeg$/, ".jpg");
    const dstName = `${String(i + 1).padStart(2, "0")}${ext}`;
    expectedNames.add(dstName);
    const changed = await copyIfChanged(
      path.join(srcDir, srcImages[i].name),
      path.join(dstDir, dstName),
    );
    if (changed) copied++;
  }

  // Remove stale files in dst that aren't in the expected set.
  const dstFiles = await readDirSafe(dstDir);
  let removed = 0;
  for (const f of dstFiles) {
    if (!f.isFile()) continue;
    if (!expectedNames.has(f.name)) {
      await fs.unlink(path.join(dstDir, f.name));
      removed++;
    }
  }

  return { count: srcImages.length, copied, removed };
}

async function main() {
  const srcEntries = await readDirSafe(SRC);
  const srcFolders = srcEntries.filter((e) => e.isDirectory());

  await ensureDir(DST);
  const dstEntries = await readDirSafe(DST);
  const dstFolderNames = dstEntries.filter((e) => e.isDirectory()).map((e) => e.name);

  // Build map of slug → source folder name.
  const slugToSrc = new Map();
  for (const f of srcFolders) {
    const slug = slugify(f.name);
    if (!slug) continue;
    slugToSrc.set(slug, f.name);
  }

  // Sync each source folder.
  const results = [];
  for (const [slug, srcName] of slugToSrc) {
    const r = await syncAlbum(path.join(SRC, srcName), path.join(DST, slug));
    results.push({ slug, srcName, ...r });
  }

  // Remove destination folders that no longer have a source.
  for (const dstName of dstFolderNames) {
    if (!slugToSrc.has(dstName)) {
      await fs.rm(path.join(DST, dstName), { recursive: true, force: true });
      results.push({ slug: dstName, srcName: "(removed)", count: 0, copied: 0, removed: 1, dropped: true });
    }
  }

  const total = results.reduce((s, r) => s + r.count, 0);
  const totalCopied = results.reduce((s, r) => s + r.copied, 0);
  const totalRemoved = results.reduce((s, r) => s + r.removed, 0);

  console.log(`[sync-portfolio] ${results.length} albums · ${total} images · +${totalCopied} copied · -${totalRemoved} stale removed`);
  for (const r of results) {
    if (r.dropped) {
      console.log(`  − ${r.slug}  (source folder gone — dropped)`);
    } else if (r.copied > 0 || r.removed > 0) {
      console.log(`  · ${r.slug.padEnd(28)} ${String(r.count).padStart(3)} img  (+${r.copied} / -${r.removed})  ← ${r.srcName}`);
    }
  }
}

main().catch((err) => {
  console.error("[sync-portfolio] failed:", err);
  process.exit(1);
});
