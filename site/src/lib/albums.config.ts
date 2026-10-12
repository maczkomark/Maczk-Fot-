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
  /**
   * A galéria legjobb képeinek 1-alapú sorszámai. Ebből a közös készletből
   * válogat a nyitóoldal és a szolgáltatás-oldalak, hogy ne mindig ugyanaz a
   * pár kép ismétlődjön.
   */
  highlights?: number[];
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
    highlights: [12, 16, 20],
  },
  "eszter-milan": {
    title: "Eszter és Milán esküvője",
    category: "Esküvő",
    date: "2026.07.26",
    location: "Szombathely",
    description:
      "Nyári esküvő Szombathelyen, a délelőtti találkozástól a szertartásig. Válogatás a nap képeiből.",
    featured: 13,
    highlights: [13, 9, 11, 6],
  },
  "evelin-attila": {
    title: "Evelin és Attila esküvője",
    category: "Esküvő",
    date: "2026.10.03",
    description:
      "Polgári szertartás gyűrűcserével és homokceremóniával, utána koccintás és családi képek a teraszon.",
    featured: 43,
    highlights: [43, 19, 25, 18],
  },
  // A kőszegi páros fotózás egyelőre nincs kint az oldalon. A képek megvannak
  // a portfolio/kőszeg mappában — a hidden törlésével bármikor visszakerül.
  koszeg: {
    title: "Páros fotózás Kőszegen",
    category: "Portré",
    date: "2026.07.15",
    location: "Kőszegi-hegység",
    description: "Rövid páros fotózás a kőszegi erdőben, néhány légi felvétellel.",
    featured: 4,
    hidden: true,
  },

  // ───── Sport ─────
  "falco-kc": {
    title: "Falco KC – Bilbao Basket",
    category: "Sport",
    date: "2026.04.02",
    location: "Aréna Savaria, Szombathely",
    description: "Európa-kupa kosárlabda-mérkőzés az Aréna Savariában.",
    featured: 13,
    highlights: [12, 20, 5],
  },
  "falco-donto": {
    title: "Falco KC, bajnoki döntő",
    category: "Sport",
    date: "2026.05.20",
    location: "Aréna Savaria, Szombathely",
    description:
      "A magyar kosárlabda-bajnokság döntője, a mérkőzéssel és a lelátói hangulattal.",
    featured: 13,
    highlights: [19, 25, 13],
  },
  "a-300-meccs-haladas-vs-us-lecce": {
    title: "Haladás – US Lecce",
    category: "Sport",
    date: "2026.07.20",
    location: "Haladás Sportkomplexum, Szombathely",
    description:
      "Felkészülési mérkőzés az olasz US Lecce ellen, a stadion 300. meccse.",
    featured: 23,
    highlights: [12, 23, 1],
  },
  "haladas-vs-balatonalmadi": {
    title: "Haladás – Balatonalmádi",
    category: "Sport",
    location: "Haladás Sportkomplexum, Szombathely",
    description: "Bajnoki labdarúgó-mérkőzés, játékosportrékkal.",
    featured: 18,
    highlights: [18, 24, 13],
  },
  "haladas-sajtotajekoztato": {
    title: "Haladás, évadzáró",
    category: "Sport",
    date: "2026.05.21",
    location: "Haladás Sportkomplexum, Szombathely",
    description:
      "A Szombathelyi Haladás szezonzáró sajtótájékoztatója és az azt követő mérkőzés.",
    highlights: [8, 31],
  },
  "haladas-szurkoloi-anket": {
    title: "Haladás, szurkolói ankét",
    category: "Sport",
    date: "2026.07.24",
    location: "Szombathely",
    description: "Szurkolói fórum a klub vezetőivel, szezon előtt.",
    featured: 6,
    highlights: [6],
  },
  "vas-varmegyei-kupadonto": {
    title: "Vas vármegyei kupadöntő",
    category: "Sport",
    date: "2026.05.28",
    location: "Haladás Sportkomplexum, Szombathely",
    description: "A vármegyei labdarúgókupa döntője.",
    highlights: [15, 19, 24],
  },
  "szkka-budaors-kezilabda": {
    title: "SZKKA – Budaörs",
    category: "Sport",
    date: "2026.04.26",
    location: "Szombathely",
    description: "Női kézilabda-mérkőzés a szombathelyi csarnokban.",
    featured: 5,
    highlights: [10, 16, 13],
  },
  "sportliget-focidonto": {
    title: "Sportligeti focidöntő",
    category: "Sport",
    date: "2026.06.04",
    location: "Sportliget, Szombathely",
    description: "Diákfoci-döntő salakos pályán, a Sportligetben.",
    featured: 13,
    highlights: [10, 13, 4],
  },
  streetball: {
    title: "Streetball-torna",
    category: "Sport",
    date: "2026.06.13",
    location: "Fő tér, Szombathely",
    description: "Háromfős utcai kosárlabdatorna a Fő téren.",
    featured: 27,
    highlights: [21, 34, 14],
  },
  kosartabor: {
    title: "Kosárlabdatábor",
    category: "Sport",
    date: "2026.07.06",
    location: "Szombathely",
    description: "Nyári kosárlabdatábor gyerekeknek, két nap edzései.",
    featured: 54,
    highlights: [54, 89, 36],
  },

  // ───── Koncert, buli ─────
  vegallomas: {
    title: "Végállomás, punkkoncert",
    category: "Koncert",
    date: "2026.05.17",
    location: "Végállomás klub, Szombathely",
    description: "Kő-Core-Szaki és a társulat koncertje a Végállomásban.",
    highlights: [10, 36, 45],
  },
  "majalis-ejszaka": {
    title: "Majális, esti koncertek",
    category: "Koncert",
    date: "2026.05.02",
    location: "Szombathely",
    description: "A szombathelyi majális esti koncertjei a nagyszínpadon.",
    featured: 9,
    highlights: [22, 18, 9],
  },
  "anima-koncert": {
    title: "Anima Sound System és a Savaria Szimfonikus Zenekar",
    category: "Koncert",
    date: "2026.08.13",
    location: "Fő tér, Szombathely",
    description: "Közös szabadtéri koncert a karneváli héten.",
    featured: 4,
    highlights: [7, 11, 14],
  },
  "karneval-beton-hofi": {
    title: "Beton.Hofi a Savaria Karneválon",
    category: "Koncert",
    date: "2026.08.13",
    location: "Szombathely",
    description: "Esti koncert a Történelmi Karnevál nagyszínpadán.",
    featured: 15,
    highlights: [20, 25, 15, 1],
  },
  szentivanej: {
    title: "Szentivánéj",
    category: "Koncert",
    date: "2026.06.21",
    location: "Szombathely",
    description: "Szentivánéji fesztivál koncertekkel, vásárral és tűzijátékkal.",
    featured: 26,
    highlights: [18, 35, 26, 43],
  },
  "karneval-all-night-maxxx": {
    title: "Karnevál All Night",
    category: "Koncert",
    date: "2026.08.14",
    location: "Maxxx Club, Szombathely",
    description: "Karneváli éjszakai buli a Maxxx Clubban.",
    featured: 84,
    highlights: [111, 56, 139],
  },
  "maxxx-club-buli": {
    title: "Maxxx Club",
    category: "Koncert",
    date: "2026.07.31",
    location: "Maxxx Club, Szombathely",
    description: "Szombat esti buli a Maxxx Clubban.",
    highlights: [83, 28, 137],
  },
  "all-in-x-birthday": {
    title: "All In X Birthday",
    category: "Koncert",
    date: "2026.10.01",
    location: "Maxxx Club, Szombathely",
    description: "Születésnapi buli a Maxxx Clubban, a DJ-pult körül és a táncparketten.",
    featured: 12,
    highlights: [12, 74, 31],
  },

  // ───── Esemény ─────
  "xxv-felvonulas": {
    title: "XXV. Savaria Történelmi Karnevál, felvonulás",
    category: "Esemény",
    date: "2026.08.14",
    location: "Szombathely belváros",
    description: "A jubileumi karnevál felvonulása a belvárosi utcákon.",
    featured: 63,
    highlights: [79, 63, 48],
  },
  "karneval-zaszloforgatas": {
    title: "Zászlóforgatók a Savaria Karneválon",
    category: "Esemény",
    date: "2026.08.14",
    location: "Fő tér, Szombathely",
    description: "Zászlóforgató bemutató a Történelmi Karneválon.",
    featured: 10,
    highlights: [10, 23, 19],
  },
  "tuzes-jatekok": {
    title: "Tüzes játékok",
    category: "Esemény",
    date: "2026.08.13",
    location: "Szombathely",
    description: "Esti tűzzsonglőr-bemutató a Savaria Történelmi Karneválon.",
    featured: 23,
    highlights: [23, 17, 12],
  },
  "petofi-telep-utcabal": {
    title: "Petőfi-telepi utcabál",
    category: "Esemény",
    date: "2026.08.18",
    location: "Petőfi-telep, Szombathely",
    description:
      "Egész napos utcabál a Petőfi-telepen, közös főzéssel és hosszú asztalokkal.",
    featured: 31,
    highlights: [92, 152, 31],
  },
  "joskarola-napok-szombat": {
    title: "Jóskarola Napok",
    category: "Esemény",
    date: "2026.08.08",
    location: "Szombathely",
    description:
      "A fesztivál szombati napja: utcai tánc a nagyszínpadon, vurstli a téren.",
    featured: 20,
    highlights: [7, 26, 32],
  },
  "balogunyom-majalis": {
    title: "Balogunyomi majális",
    category: "Esemény",
    date: "2026.05.02",
    location: "Balogunyom",
    description:
      "Falusi majális májusfaállítással, veterán teherautókkal és motorokkal.",
    featured: 14,
    highlights: [4, 8, 11],
  },
  "majalis-szombathely": {
    title: "Majális, Szombathely",
    category: "Esemény",
    date: "2026.05.02",
    location: "Szombathely",
    description: "A nappali majális vidámparkkal, körhintával, családokkal.",
    featured: 10,
    highlights: [14, 11, 1],
  },
  "herenyi-viragut": {
    title: "Herényi Virágút",
    category: "Esemény",
    date: "2026.04.26",
    location: "Herény, Szombathely",
    description: "Az évente megrendezett herényi virágvásár.",
    featured: 5,
    highlights: [6, 20, 25],
  },
  "bohoc-fesztival": {
    title: "Bohócfesztivál",
    category: "Esemény",
    date: "2026.06.07",
    location: "Fő tér, Szombathely",
    description: "Utcai bohócfesztivál, a téren ülő gyerekközönséggel.",
    featured: 15,
    highlights: [8, 11],
  },
  "kresz-park-gyereknap": {
    title: "Gyereknap a KRESZ-parkban",
    category: "Esemény",
    date: "2026.06.01",
    location: "KRESZ-park, Szombathely",
    description:
      "Gyereknapi programok: kézműves asztalok, szappandoboz-autók, foci.",
    featured: 20,
    highlights: [7, 20, 26],
  },
  "japan-kert-atadas": {
    title: "A Japánkert átadása",
    category: "Esemény",
    date: "2026.07.05",
    location: "Szombathely",
    description: "A megújult Japánkert ünnepélyes átadása, taikó dobosokkal.",
    featured: 1,
    highlights: [1, 23, 12],
  },
  "levendula-fesztival": {
    title: "Levendulafesztivál",
    category: "Esemény",
    date: "2026.05.31",
    description: "Levendulaszedés és utcai programok a fesztivál napján.",
    featured: 11,
    highlights: [6, 9, 4],
  },
  "szenvedelyes-nok-kertmozi": {
    title: "Kertmozi",
    category: "Esemény",
    date: "2026.07.31",
    location: "Szombathely",
    description: "Szabadtéri filmvetítés, tele gyeppel és pokrócokkal.",
    highlights: [19, 1, 5],
  },
  "urban-p-ar-ty": {
    title: "URBAN pARTy",
    category: "Esemény",
    date: "2026.07.25",
    location: "Szombathely belváros",
    description: "Utcai kézműves vásár és élőzene a belvárosban.",
    featured: 7,
    highlights: [17, 7, 11],
  },
  bolyaiballagas: {
    title: "Ballagás a Bolyaiban",
    category: "Esemény",
    date: "2026.04.30",
    location: "Bolyai János Gimnázium, Szombathely",
    description: "Ballagási ünnepség a gimnázium udvarán.",
    featured: 10,
    highlights: [1, 6],
  },
  "dok-valasztas": {
    title: "Megyei diákpolgármester-választás",
    category: "Esemény",
    date: "2026.05.12",
    location: "Városháza, Szombathely",
    description:
      "A megyei diákpolgármester-választás eredményhirdetése és díjátadója.",
    highlights: [21, 26],
  },
  "orszagos-tanulmanyi-verseny": {
    title: "Országos tanulmányi verseny, díjátadó",
    category: "Esemény",
    date: "2026.06.12",
    location: "Szombathely",
    description: "Az országos tanulmányi verseny díjátadó ünnepsége.",
    featured: 18,
    highlights: [1],
  },
  "korhaz-dijatado": {
    title: "Kórházi díjátadó",
    category: "Esemény",
    date: "2026.07.01",
    location: "Szombathely",
    description: "Díjátadó ünnepség a megyei kórházban.",
    featured: 11,
    highlights: [21],
  },
  "rendor-fokapitany-kinevezes": {
    title: "Rendőrfőkapitányi kinevezés",
    category: "Esemény",
    date: "2026.07.16",
    location: "Szombathely",
    description: "Az új vármegyei rendőrfőkapitány kinevezési ünnepsége.",
    featured: 11,
    highlights: [22],
  },
  "vep-david-kornel-divatbemunto": {
    title: "Dávid Kornél divatbemutatója",
    category: "Esemény",
    date: "2026.05.17",
    location: "Vép",
    description: "Divatbemutató Vépen, kifutóval és színpadi világítással.",
    highlights: [35, 12, 47],
  },
  kekseta: {
    title: "Kék séta",
    category: "Esemény",
    date: "2026.04.01",
    location: "Szombathely",
    description: "Autizmus-figyelemfelhívó séta kék lufikkal, a belvárosban.",
    highlights: [8, 12, 5],
  },

  // ───── Riport ─────
  "anyak-napja-temeto": {
    title: "Anyák napi virágpiac",
    category: "Riport",
    date: "2026.05.04",
    location: "Szombathely",
    description: "Virágvásár anyák napja előtt, a piaci sátrak között.",
    featured: 8,
    highlights: [5, 8],
  },
  "szanto-istvan-festmeny": {
    title: "Szántó István falfestménye",
    category: "Riport",
    date: "2026.06.06",
    location: "Szombathely",
    description:
      "Szántó István tűzfalfestményének készítése, az állványtól a kész műig.",
    featured: 9,
    highlights: [4, 7, 12],
  },
  "jatszoter-szemetszedes": {
    title: "Szemétszedés a játszótéren",
    category: "Riport",
    date: "2026.06.10",
    location: "Szombathely",
    description: "Önkéntes szemétszedés egy játszótéren és a környékén.",
    featured: 11,
    highlights: [8],
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
    highlights: [10, 12, 8],
  },
  "szombathely-regi-epuletei": {
    title: "Szombathelyi régi épületek",
    category: "Architektúra",
    date: "2026.05.20",
    location: "Szombathely belváros",
    description: "Szecessziós és barokk homlokzatok a belvárosban.",
    highlights: [12, 7, 1],
  },
  pozsony: {
    title: "Pozsony",
    category: "Architektúra",
    date: "2026.07.27",
    location: "Pozsony, Szlovákia",
    description:
      "Kétnapos városnézés: a vár, a koronázási ékszerek másolatai és a belváros.",
    highlights: [20, 13, 7, 32],
  },

  // ───── Természet ─────
  tihany: {
    title: "Tihany",
    category: "Természet",
    date: "2026.05.10",
    location: "Tihany",
    description: "Az apátság, a kikötő és a félsziget ürgéi.",
    featured: 13,
    highlights: [13, 17, 1, 21],
  },
  "japankert-galeria": {
    title: "Japánkert",
    category: "Természet",
    date: "2026.07.08",
    location: "Szombathely",
    description: "Séta a Japánkertben, néhány nappal az átadás után.",
    featured: 23,
    highlights: [18, 29, 12],
  },
  szhely: {
    title: "Csónakázó-tó",
    category: "Természet",
    date: "2026.03.30",
    location: "Szombathely",
    description: "Borongós tavaszi délután a tó körül.",
    featured: 7,
    highlights: [1, 6, 10],
  },
  "pozsony-allatkert": {
    title: "Pozsonyi állatkert",
    category: "Természet",
    date: "2026.07.28",
    location: "Pozsony, Szlovákia",
    description: "Egy délelőtt az állatkertben: flamingók, őzek, háziállatok.",
    featured: 8,
    highlights: [8, 19, 15, 5],
  },

  // ───── Gasztronómia ─────
  "palacsinta-kepek": {
    title: "Palacsinta, termékfotó",
    category: "Gasztronómia",
    date: "2026.04.18",
    location: "Stúdió",
    description: "Termékfotó-sorozat egy palacsintázónak, kerámia tányérokkal.",
    featured: 5,
    highlights: [13, 16, 7],
  },
};

/** Kiemelt slug-sorrend. Aki itt szerepel, a megjelenítési listák elejére kerül. */
export const manualOrder: string[] = [
  "eskuvo",
  "eszter-milan",
  "evelin-attila",
  "falco-donto",
  "xxv-felvonulas",
  "vep-david-kornel-divatbemunto",
  "szentivanej",
  "karneval-beton-hofi",
  "all-in-x-birthday",
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
