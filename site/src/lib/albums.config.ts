/**
 * Album-meta override map.
 *
 * - A `public/portfolio/<slug>/` mappákból automatikusan felfedezett albumokhoz
 *   ad címet, kategóriát, dátumot, helyszínt, leírást és borítóképet.
 * - Új albumot nem kötelező ide felvenni — ha hiányzik a slug, a cím a mappanévből
 *   képződik, a kategória pedig "Egyéb" lesz. Érdemes viszont felvenni, mert a
 *   mappanévből generált cím ritkán jó.
 * - Slug = a `public/portfolio/` alatti mappanév, ezt a sync szkript állítja elő.
 *
 * Címek és leírások: rövid, tényszerű magyar mondat. Mi történt és hol. Nem kell
 * hangulatfestés, és nem kell vesszővel felsorolt jelzőhalmaz.
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
  // ───── Esküvő, portré ─────
  eskuvo: {
    title: "Esküvő Jákon",
    category: "Esküvő",
    date: "2025.11.21",
    location: "Ják, bencés bazilika",
    description:
      "Egész napos esküvő a jáki bazilikában, a készülődéstől az esti mulatságig.",
    featured: 13,
  },
  "eszter-milan": {
    title: "Eszter és Milán esküvője",
    category: "Esküvő",
    date: "2026.07.26",
    location: "Szombathely",
    description:
      "Nyári esküvő Szombathelyen, a délelőtti találkozástól a szertartásig. Válogatás a nap képeiből.",
    featured: 1,
  },
  koszeg: {
    title: "Páros fotózás Kőszegen",
    category: "Portré",
    date: "2026.07.15",
    location: "Kőszegi-hegység",
    description: "Rövid páros fotózás a kőszegi erdőben, néhány légi felvétellel.",
    featured: 4,
  },

  // ───── Sport ─────
  "falco-kc": {
    title: "Falco KC – Bilbao Basket",
    category: "Sport",
    date: "2026.04.02",
    location: "Aréna Savaria, Szombathely",
    description: "Európa-kupa kosárlabda-mérkőzés az Aréna Savariában.",
    featured: 13,
  },
  "falco-donto": {
    title: "Falco KC, bajnoki döntő",
    category: "Sport",
    date: "2026.05.20",
    location: "Aréna Savaria, Szombathely",
    description:
      "A magyar kosárlabda-bajnokság döntője, a mérkőzéssel és a lelátói hangulattal.",
  },
  "a-300-meccs-haladas-vs-us-lecce": {
    title: "Haladás – US Lecce",
    category: "Sport",
    date: "2026.07.20",
    location: "Haladás Sportkomplexum, Szombathely",
    description:
      "Felkészülési mérkőzés az olasz US Lecce ellen, a stadion 300. meccse.",
    featured: 23,
  },
  "haladas-vs-balatonalmadi": {
    title: "Haladás – Balatonalmádi",
    category: "Sport",
    location: "Haladás Sportkomplexum, Szombathely",
    description: "Bajnoki labdarúgó-mérkőzés, játékosportrékkal.",
    featured: 18,
  },
  "haladas-sajtotajekoztato": {
    title: "Haladás, évadzáró",
    category: "Sport",
    date: "2026.05.21",
    location: "Haladás Sportkomplexum, Szombathely",
    description:
      "A Szombathelyi Haladás szezonzáró sajtótájékoztatója és az azt követő mérkőzés.",
  },
  "haladas-szurkoloi-anket": {
    title: "Haladás, szurkolói ankét",
    category: "Sport",
    date: "2026.07.24",
    location: "Szombathely",
    description: "Szurkolói fórum a klub vezetőivel, szezon előtt.",
    featured: 6,
  },
  "vas-varmegyei-kupadonto": {
    title: "Vas vármegyei kupadöntő",
    category: "Sport",
    date: "2026.05.28",
    location: "Haladás Sportkomplexum, Szombathely",
    description: "A vármegyei labdarúgókupa döntője.",
  },
  "szkka-budaors-kezilabda": {
    title: "SZKKA – Budaörs",
    category: "Sport",
    date: "2026.04.26",
    location: "Szombathely",
    description: "Női kézilabda-mérkőzés a szombathelyi csarnokban.",
    featured: 5,
  },
  "sportliget-focidonto": {
    title: "Sportligeti focidöntő",
    category: "Sport",
    date: "2026.06.04",
    location: "Sportliget, Szombathely",
    description: "Diákfoci-döntő salakos pályán, a Sportligetben.",
    featured: 13,
  },
  streetball: {
    title: "Streetball-torna",
    category: "Sport",
    date: "2026.06.13",
    location: "Fő tér, Szombathely",
    description: "Háromfős utcai kosárlabdatorna a Fő téren.",
    featured: 27,
  },
  kosartabor: {
    title: "Kosárlabdatábor",
    category: "Sport",
    date: "2026.07.06",
    location: "Szombathely",
    description: "Nyári kosárlabdatábor gyerekeknek, két nap edzései.",
    featured: 54,
  },

  // ───── Koncert, buli ─────
  vegallomas: {
    title: "Végállomás, punkkoncert",
    category: "Koncert",
    date: "2026.05.17",
    location: "Végállomás klub, Szombathely",
    description: "Kő-Core-Szaki és a társulat koncertje a Végállomásban.",
  },
  "majalis-ejszaka": {
    title: "Majális, esti koncertek",
    category: "Koncert",
    date: "2026.05.02",
    location: "Szombathely",
    description: "A szombathelyi majális esti koncertjei a nagyszínpadon.",
    featured: 9,
  },
  "anima-koncert": {
    title: "Anima Sound System és a Savaria Szimfonikus Zenekar",
    category: "Koncert",
    date: "2026.08.13",
    location: "Fő tér, Szombathely",
    description: "Közös szabadtéri koncert a karneváli héten.",
    featured: 4,
  },
  "karneval-beton-hofi": {
    title: "Beton.Hofi a Savaria Karneválon",
    category: "Koncert",
    date: "2026.08.13",
    location: "Szombathely",
    description: "Esti koncert a Történelmi Karnevál nagyszínpadán.",
    featured: 15,
  },
  szentivanej: {
    title: "Szentivánéj",
    category: "Koncert",
    date: "2026.06.21",
    location: "Szombathely",
    description: "Szentivánéji fesztivál koncertekkel, vásárral és tűzijátékkal.",
    featured: 26,
  },
  "karneval-all-night-maxxx": {
    title: "Karnevál All Night",
    category: "Koncert",
    date: "2026.08.14",
    location: "Maxxx Club, Szombathely",
    description: "Karneváli éjszakai buli a Maxxx Clubban.",
    featured: 84,
  },
  "maxxx-club-buli": {
    title: "Maxxx Club",
    category: "Koncert",
    date: "2026.07.31",
    location: "Maxxx Club, Szombathely",
    description: "Szombat esti buli a Maxxx Clubban.",
  },

  // ───── Esemény ─────
  "xxv-felvonulas": {
    title: "XXV. Savaria Történelmi Karnevál, felvonulás",
    category: "Esemény",
    date: "2026.08.14",
    location: "Szombathely belváros",
    description: "A jubileumi karnevál felvonulása a belvárosi utcákon.",
    featured: 63,
  },
  "karneval-zaszloforgatas": {
    title: "Zászlóforgatók a Savaria Karneválon",
    category: "Esemény",
    date: "2026.08.14",
    location: "Fő tér, Szombathely",
    description: "Zászlóforgató bemutató a Történelmi Karneválon.",
    featured: 10,
  },
  "tuzes-jatekok": {
    title: "Tüzes játékok",
    category: "Esemény",
    date: "2026.08.13",
    location: "Szombathely",
    description: "Esti tűzzsonglőr-bemutató a Savaria Történelmi Karneválon.",
    featured: 23,
  },
  "petofi-telep-utcabal": {
    title: "Petőfi-telepi utcabál",
    category: "Esemény",
    date: "2026.08.18",
    location: "Petőfi-telep, Szombathely",
    description:
      "Egész napos utcabál a Petőfi-telepen, közös főzéssel és hosszú asztalokkal.",
    featured: 31,
  },
  "joskarola-napok-szombat": {
    title: "Jóskarola Napok",
    category: "Esemény",
    date: "2026.08.08",
    location: "Szombathely",
    description:
      "A fesztivál szombati napja: utcai tánc a nagyszínpadon, vurstli a téren.",
    featured: 20,
  },
  "balogunyom-majalis": {
    title: "Balogunyomi majális",
    category: "Esemény",
    date: "2026.05.02",
    location: "Balogunyom",
    description:
      "Falusi majális májusfaállítással, veterán teherautókkal és motorokkal.",
    featured: 14,
  },
  "majalis-szombathely": {
    title: "Majális, Szombathely",
    category: "Esemény",
    date: "2026.05.02",
    location: "Szombathely",
    description: "A nappali majális vidámparkkal, körhintával, családokkal.",
    featured: 10,
  },
  "herenyi-viragut": {
    title: "Herényi Virágút",
    category: "Esemény",
    date: "2026.04.26",
    location: "Herény, Szombathely",
    description: "Az évente megrendezett herényi virágvásár.",
    featured: 5,
  },
  "bohoc-fesztival": {
    title: "Bohócfesztivál",
    category: "Esemény",
    date: "2026.06.07",
    location: "Fő tér, Szombathely",
    description: "Utcai bohócfesztivál, a téren ülő gyerekközönséggel.",
    featured: 15,
  },
  "kresz-park-gyereknap": {
    title: "Gyereknap a KRESZ-parkban",
    category: "Esemény",
    date: "2026.06.01",
    location: "KRESZ-park, Szombathely",
    description:
      "Gyereknapi programok: kézműves asztalok, szappandoboz-autók, foci.",
    featured: 20,
  },
  "japan-kert-atadas": {
    title: "A Japánkert átadása",
    category: "Esemény",
    date: "2026.07.05",
    location: "Szombathely",
    description: "A megújult Japánkert ünnepélyes átadása, taikó dobosokkal.",
    featured: 1,
  },
  "levendula-fesztival": {
    title: "Levendulafesztivál",
    category: "Esemény",
    date: "2026.05.31",
    description: "Levendulaszedés és utcai programok a fesztivál napján.",
    featured: 11,
  },
  "szenvedelyes-nok-kertmozi": {
    title: "Kertmozi",
    category: "Esemény",
    date: "2026.07.31",
    location: "Szombathely",
    description: "Szabadtéri filmvetítés, tele gyeppel és pokrócokkal.",
  },
  "urban-p-ar-ty": {
    title: "URBAN pARTy",
    category: "Esemény",
    date: "2026.07.25",
    location: "Szombathely belváros",
    description: "Utcai kézműves vásár és élőzene a belvárosban.",
    featured: 7,
  },
  bolyaiballagas: {
    title: "Ballagás a Bolyaiban",
    category: "Esemény",
    date: "2026.04.30",
    location: "Bolyai János Gimnázium, Szombathely",
    description: "Ballagási ünnepség a gimnázium udvarán.",
    featured: 10,
  },
  "dok-valasztas": {
    title: "Megyei diákpolgármester-választás",
    category: "Esemény",
    date: "2026.05.12",
    location: "Városháza, Szombathely",
    description:
      "A megyei diákpolgármester-választás eredményhirdetése és díjátadója.",
  },
  "orszagos-tanulmanyi-verseny": {
    title: "Országos tanulmányi verseny, díjátadó",
    category: "Esemény",
    date: "2026.06.12",
    location: "Szombathely",
    description: "Az országos tanulmányi verseny díjátadó ünnepsége.",
    featured: 18,
  },
  "korhaz-dijatado": {
    title: "Kórházi díjátadó",
    category: "Esemény",
    date: "2026.07.01",
    location: "Szombathely",
    description: "Díjátadó ünnepség a megyei kórházban.",
    featured: 11,
  },
  "rendor-fokapitany-kinevezes": {
    title: "Rendőrfőkapitányi kinevezés",
    category: "Esemény",
    date: "2026.07.16",
    location: "Szombathely",
    description: "Az új vármegyei rendőrfőkapitány kinevezési ünnepsége.",
    featured: 11,
  },
  "vep-david-kornel-divatbemunto": {
    title: "Dávid Kornél divatbemutatója",
    category: "Esemény",
    date: "2026.05.17",
    location: "Vép",
    description: "Divatbemutató Vépen, kifutóval és színpadi világítással.",
  },
  kekseta: {
    title: "Kék séta",
    category: "Esemény",
    date: "2026.04.01",
    location: "Szombathely",
    description: "Autizmus-figyelemfelhívó séta kék lufikkal, a belvárosban.",
  },

  // ───── Riport ─────
  "anyak-napja-temeto": {
    title: "Anyák napi virágpiac",
    category: "Riport",
    date: "2026.05.04",
    location: "Szombathely",
    description: "Virágvásár anyák napja előtt, a piaci sátrak között.",
    featured: 8,
  },
  "szanto-istvan-festmeny": {
    title: "Szántó István falfestménye",
    category: "Riport",
    date: "2026.06.06",
    location: "Szombathely",
    description:
      "Szántó István tűzfalfestményének készítése, az állványtól a kész műig.",
    featured: 9,
  },
  "jatszoter-szemetszedes": {
    title: "Szemétszedés a játszótéren",
    category: "Riport",
    date: "2026.06.10",
    location: "Szombathely",
    description: "Önkéntes szemétszedés egy játszótéren és a környékén.",
    featured: 11,
  },

  // ───── Architektúra, város ─────
  viztorony: {
    title: "Víztorony",
    category: "Architektúra",
    date: "2026.04.23",
    location: "Szombathely",
    description:
      "Naplemente a felújított víztorony tetejéről, kilátással a városra.",
    featured: 8,
  },
  "szombathely-regi-epuletei": {
    title: "Szombathelyi régi épületek",
    category: "Architektúra",
    date: "2026.05.20",
    location: "Szombathely belváros",
    description: "Szecessziós és barokk homlokzatok a belvárosban.",
  },
  pozsony: {
    title: "Pozsony",
    category: "Architektúra",
    date: "2026.07.27",
    location: "Pozsony, Szlovákia",
    description:
      "Kétnapos városnézés: a vár, a koronázási ékszerek másolatai és a belváros.",
  },

  // ───── Természet ─────
  tihany: {
    title: "Tihany",
    category: "Természet",
    date: "2026.05.10",
    location: "Tihany",
    description: "Az apátság, a kikötő és a félsziget ürgéi.",
    featured: 13,
  },
  "japankert-galeria": {
    title: "Japánkert",
    category: "Természet",
    date: "2026.07.08",
    location: "Szombathely",
    description: "Séta a Japánkertben, néhány nappal az átadás után.",
    featured: 23,
  },
  szhely: {
    title: "Csónakázó-tó",
    category: "Természet",
    date: "2026.03.30",
    location: "Szombathely",
    description: "Borongós tavaszi délután a tó körül.",
    featured: 7,
  },
  "pozsony-allatkert": {
    title: "Pozsonyi állatkert",
    category: "Természet",
    date: "2026.07.28",
    location: "Pozsony, Szlovákia",
    description: "Egy délelőtt az állatkertben: flamingók, őzek, háziállatok.",
    featured: 8,
  },

  // ───── Gasztronómia ─────
  "palacsinta-kepek": {
    title: "Palacsinta, termékfotó",
    category: "Gasztronómia",
    date: "2026.04.18",
    location: "Stúdió",
    description: "Termékfotó-sorozat egy palacsintázónak, kerámia tányérokkal.",
    featured: 5,
  },
};

/** Kiemelt slug-sorrend. Aki itt szerepel, a megjelenítési listák elejére kerül. */
export const manualOrder: string[] = [
  "eskuvo",
  "eszter-milan",
  "falco-donto",
  "xxv-felvonulas",
  "vep-david-kornel-divatbemunto",
  "szentivanej",
  "karneval-beton-hofi",
  "petofi-telep-utcabal",
  "streetball",
  "a-300-meccs-haladas-vs-us-lecce",
  "tuzes-jatekok",
  "japankert-galeria",
  "tihany",
  "viztorony",
  "falco-kc",
  "balogunyom-majalis",
  "majalis-ejszaka",
  "vas-varmegyei-kupadonto",
  "vegallomas",
  "kosartabor",
  "pozsony",
  "palacsinta-kepek",
  "koszeg",
  "joskarola-napok-szombat",
  "karneval-zaszloforgatas",
  "anima-koncert",
  "herenyi-viragut",
  "szombathely-regi-epuletei",
  "haladas-sajtotajekoztato",
  "szanto-istvan-festmeny",
  "bohoc-fesztival",
  "kresz-park-gyereknap",
  "japan-kert-atadas",
  "pozsony-allatkert",
  "majalis-szombathely",
  "anyak-napja-temeto",
  "szhely",
  "kekseta",
  "bolyaiballagas",
  "dok-valasztas",
];

/** Kategória → ikon-kulcs map. */
export const categoryIcon: Record<string, string> = {
  Esküvő: "heart",
  Portré: "camera",
  Sport: "trophy",
  Esemény: "calendar",
  Koncert: "music",
  Riport: "camera",
  Architektúra: "building",
  Természet: "bird",
  Gasztronómia: "utensils",
  Egyéb: "image",
};

/** Default ha egy slug nincs definiálva fent: a slugból csinál olvasható címet. */
export function humanize(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
