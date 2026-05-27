/**
 * Album-meta override map.
 *
 * - A `public/portfolio/<slug>/` mappákból AUTOMATIKUSAN felfedezett albumokhoz
 *   adunk emberi cím + kategória + dátum + leírás + opcionális kiemelt sorszámot.
 * - Új albumot NEM kell ide felvenni — ha hiányzik a slug, az alábbi alapértékek
 *   használódnak (cím = slug humanizálva, kategória = "Egyéb").
 * - Slug = `public/portfolio/` alatti mappanév (a sync szkript generálja).
 *
 * Az itt definiált sorrend (manualOrder) szabja meg a főoldalon a megjelenés
 * priorítását. A felsorolásban előrébb lévők előbb kerülnek a rácsra.
 */

export type AlbumMeta = {
  title: string;
  category: string;
  date?: string;
  location?: string;
  description?: string;
  /** 1-alapú sorszám: melyik kép legyen a borító. Ha nincs, az 1. képet használja. */
  featured?: number;
  /** Ha true, az album rejtve marad a listákon (de a /portfolio/<slug> oldal él). */
  hidden?: boolean;
};

export const albumMeta: Record<string, AlbumMeta> = {
  // ───── Esküvő ─────
  eskuvo: {
    title: "Ják — Esküvő",
    category: "Esküvő",
    date: "2025.11.21",
    location: "Ják, Bencés bazilika",
    description:
      "Egész napos esküvő a 13. századi Ják bazilikában. Készülődés, gyűrűcsere, családi pillanatok, ünneplés.",
    featured: 13,
  },

  // ───── Sport ─────
  "falco-kc": {
    title: "Falco KC — Európa-kupa",
    category: "Sport",
    date: "2026.04.02",
    location: "Arena Savaria, Szombathely",
    description:
      "Falco KC vs Bilbao Basket európai kupa kosárlabda mérkőzés. Palánk alatti küzdelmek, gyorstámadások, döntő pillanatok.",
    featured: 13,
  },
  "falco-donto": {
    title: "Falco KC — Bajnoki Döntő",
    category: "Sport",
    date: "2026.05.20",
    location: "Arena Savaria, Szombathely",
    description:
      "Magyar kosárlabda bajnoki döntő mérkőzései — döntő percek, közönség, ünneplés és gyerek-program a hazai oldalon.",
  },
  "szkka-budaors-kezilabda": {
    title: "SZKKA — Budaörs",
    category: "Sport",
    date: "2026.04.26",
    location: "Szombathely",
    description: "SZKKA vs Budaörs női kézilabda mérkőzés. Mozgás, koncentráció, csapatjáték.",
    featured: 5,
  },
  "vas-varmegyei-kupadonto": {
    title: "Vas vármegyei labdarúgó kupadöntő",
    category: "Sport",
    date: "2026.05.28",
    location: "Haladás Sportkomplexum, Szombathely",
    description: "A Vas vármegyei labdarúgó kupadöntő — feszültség, taktika, ünneplés.",
  },
  "haladas-sajtotajekoztato": {
    title: "Szombathelyi Haladás — Évadzáró",
    category: "Sport",
    date: "2026.05.21",
    location: "Haladás Sportkomplexum",
    description:
      "Szezonzáró Haladás sajtótájékoztató + záró mérkőzés. Portrék, csapatkép, focis akciók az új stadionban.",
  },

  // ───── Esemény ─────
  "balogunyom-majalis": {
    title: "Balogunyom — Majális",
    category: "Esemény",
    date: "2026.05.02",
    location: "Balogunyom",
    description:
      "Falusi majális szalagos májusfával, veterán katonai teherautókkal és motorokkal. Színek, fa, fém, fény.",
    featured: 14,
  },
  "majalis-ejszaka": {
    title: "Majális — Éjszakai koncertek",
    category: "Koncert",
    date: "2026.05.02",
    location: "Szombathely",
    description: "Tömeg, neonok, fény és mozgás. Az éjszakai koncert pillanatai a színpad előtt.",
    featured: 9,
  },
  "majalis-szombathely": {
    title: "Majális — Szombathely",
    category: "Esemény",
    date: "2026.05.02",
    location: "Szombathely",
    description: "Vidámpark, körhinta, gyerekek — a nappali majális derűs pillanatai.",
    featured: 10,
  },
  "herenyi-viragut": {
    title: "Herényi Virágút",
    category: "Esemény",
    date: "2026.04.26",
    location: "Herény, Szombathely",
    description: "Évente megrendezett virágvásár Herényben — színek, virágok, sokaság.",
    featured: 5,
  },
  "bolyai-ballagas": {
    title: "Bolyai — Ballagás",
    category: "Esemény",
    date: "2026.04.30",
    location: "Bolyai János Gimnázium, Szombathely",
    description: "Ballagás a Bolyaiban — tömeg, virágcsokrok, búcsú-pillanatok.",
    featured: 10,
  },
  "dok-valasztas": {
    title: "DÖK — Megyei Diákpolgármester Választás",
    category: "Esemény",
    date: "2026.05.12",
    location: "Szombathely Megyei Jogú Város",
    description:
      "A megyei diákpolgármester választás díjátadója. Jelöltek, virágok, díjazás a város dísztermében.",
  },
  vegallomas: {
    title: "Végállomás — Punk koncert",
    category: "Koncert",
    date: "2026.05.17",
    location: "Szombathely",
    description: "Kő-Core-Szaki és társulat — füst, fény, gitár, közönség. Underground koncert a Végállomás klubban.",
  },
  kekseta: {
    title: "Kék Séta",
    category: "Esemény",
    date: "2026.04.01",
    location: "Szombathely",
    description: "Autizmus-figyelemfelkeltő séta — kék lufik, mosolyok, közösség.",
  },
  "vep-david-kornel-divatbemunto": {
    title: "Dávid Kornél — Divatbemutató",
    category: "Esemény",
    date: "2026.05.17",
    location: "Vép",
    description:
      "Dávid Kornél divatbemutatója Vépen — kifutó, kék-fehér fény, viselet, sziluettek.",
  },

  // ───── Riport / utca ─────
  "anyak-napja-temeto": {
    title: "Anyák Napja — Virágpiac",
    category: "Riport",
    date: "2026.05.04",
    location: "Szombathely",
    description: "Vásári pillanatok az anyák napi virágpiacon — sátor, virág, vásárlók.",
    featured: 8,
  },

  // ───── Architektúra / város ─────
  "viztorony": {
    title: "Víztorony",
    category: "Architektúra",
    date: "2026.04.23",
    location: "Szombathely",
    description: "Naplemente a felújított víztorony tetejéről. A város a kék órában.",
    featured: 8,
  },
  "szombathely-regi-epuletei": {
    title: "Szombathely — Szecessziós paloták",
    category: "Architektúra",
    date: "2026.05.20",
    location: "Szombathely belváros",
    description: "A város patinás szecessziós és barokk épületei — kőfaragás, vakolat, kupolák, idő.",
  },

  // ───── Természet ─────
  szhely: {
    title: "Csónakázó-tó",
    category: "Természet",
    date: "2026.03.30",
    location: "Szombathely",
    description: "Borongós tavaszi délután a városi tó körül. Galambok, híd, csendes víz.",
    featured: 7,
  },
  balaton: {
    title: "Balaton — Vitorláskikötő",
    category: "Természet",
    date: "2026.05.02",
    location: "Balaton",
    description: "Hajók a kikötőben — csendes nap, tükröződő víz, vitorlák a kék ég előtt.",
  },
  tihany: {
    title: "Tihany",
    category: "Természet",
    date: "2026.05.02",
    location: "Tihany",
    description: "A félsziget — levendula, panorámák, apátság.",
  },

  // ───── Gasztronómia ─────
  "palacsinta-kepek": {
    title: "Palacsinta — Termékfotó",
    category: "Gasztronómia",
    date: "2026.04.18",
    location: "Stúdió",
    description:
      "Termékfotó-sorozat egy palacsintázónak — rusztikus kerámia tányérok, márvány felület, természetes fény.",
    featured: 5,
  },
};

/** Kiemelt slug-sorrend. Aki itt szerepel, a megjelenítési listák elejére kerül. */
export const manualOrder: string[] = [
  "eskuvo",
  "falco-donto",
  "vep-david-kornel-divatbemunto",
  "balogunyom-majalis",
  "majalis-ejszaka",
  "falco-kc",
  "vas-varmegyei-kupadonto",
  "vegallomas",
  "szkka-budaors-kezilabda",
  "haladas-sajtotajekoztato",
  "viztorony",
  "palacsinta-kepek",
  "herenyi-viragut",
  "szombathely-regi-epuletei",
  "majalis-szombathely",
  "anyak-napja-temeto",
  "balaton",
  "tihany",
  "szhely",
  "kekseta",
  "bolyai-ballagas",
  "dok-valasztas",
];

/** Kategória → ikon-kulcs map. */
export const categoryIcon: Record<string, string> = {
  Esküvő: "heart",
  Sport: "trophy",
  Esemény: "calendar",
  Koncert: "music",
  Riport: "camera",
  Architektúra: "building",
  Természet: "bird",
  Gasztronómia: "utensils",
  Egyéb: "image",
};

/** Default ha egy slug nincs definiálva fent: humanize the slug. */
export function humanize(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
