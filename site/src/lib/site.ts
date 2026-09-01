/**
 * Az oldal központi adatai. Ami itt van, azt egy helyen lehet átírni, és az
 * egész oldalon átmegy: elérhetőség, szolgáltatások, SEO-alapok, hero képek.
 */

export const site = {
  name: "Maczkó Fotó",
  person: "Maczkó Márk",
  url: "https://maczkofoto.hu",
  city: "Szombathely",
  region: "Vas vármegye",
  tagline: "Esküvő, rendezvény, buli és sport — Szombathelyen és Vas vármegyében.",
  email: "maczkomark08@gmail.com",
  phone: "+36 20 408 7765",
  phoneHref: "tel:+36204087765",
  instagram: "https://instagram.com/maczko_foto",
  instagramHandle: "@maczko_foto",
  facebook: "https://www.facebook.com/profile.php?id=61590258863710",
  /** Válaszidő, amit az oldalon ígérünk. */
  responseTime: "24 órán belül",
} as const;

/** A használt géppark. Az „Rólam” oldalon és a szolgáltatásoknál is megjelenik. */
export const gear = [
  { name: "Sony A7 V", note: "Full frame váz" },
  { name: "Sony 24-70mm f/2.8 GM", note: "Az alapobjektív — riport, portré, csoportkép" },
  { name: "Külső vakuk", note: "Terembe, sötét klubba, esti szertartáshoz" },
  { name: "Tartalék váz és kártyák", note: "Minden fontos pillanat két helyre íródik" },
];

export type Service = {
  slug: string;
  /** Menüben és kártyán ez a rövid név. */
  name: string;
  /** A H1 az aloldalon — ebben van a kulcsszó. */
  heading: string;
  /** SEO title tag. */
  title: string;
  /** SEO meta description, 150–160 karakter körül. */
  description: string;
  /** Egymondatos felvezetés a kártyákon. */
  short: string;
  /** Bevezető bekezdések az aloldalon. */
  intro: string[];
  /** Mit tartalmaz — pontokban. */
  includes: string[];
  /** Mely album-kategóriákból húzza a képeket. */
  categories: string[];
  /** Kiemelt album slugja a fejlécképhez. */
  heroAlbum: string;
  faq: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "eskuvoi-fotozas",
    name: "Esküvő",
    heading: "Esküvői fotózás Szombathelyen és Vas vármegyében",
    title: "Esküvői fotós Szombathely — Maczkó Fotó",
    description:
      "Esküvői fotós Szombathelyen és Vas vármegyében. Végigkísérem a napot a készülődéstől a mulatságig, riportszerűen. Nézd meg a munkáimat és kérj ajánlatot.",
    short: "Végigkísérem a napot a készülődéstől a mulatságig.",
    intro: [
      "Az esküvő egy nap, ami nem ismételhető meg. Nem lehet visszakérni a szertartást, ahogy az édesanyád arcát sem abban a pillanatban. Ezért dolgozom riportszerűen: nagyrészt hagyom, hogy a nap menjen a maga útján, és azt fotózom, ami tényleg történik.",
      "Csoportképet és páros fotózást természetesen csinálunk, de nem ez viszi el az időt. Egy esküvőn a legjobb képek általában nem azok, ahol mindenki a kamerába néz.",
      "Szombathelyen és környékén dolgozom leggyakrabban, de Vas vármegyén belül bárhová megyek, és a vármegyén kívülre is.",
    ],
    includes: [
      "Előzetes egyeztetés: helyszínek, időrend, kikkel kell mindenképp kép",
      "Készülődés, szertartás, csoportképek, páros fotózás, buli",
      "Válogatott, egyenként szerkesztett képek online galériában",
      "A képek letölthetők, nyomtatásra is alkalmas felbontásban",
    ],
    categories: ["Esküvő"],
    heroAlbum: "eszter-milan",
    faq: [
      {
        q: "Mennyi kép készül egy esküvőn?",
        a: "Egy egész napos esküvőn általában 400–700 kép között mozog a végleges anyag. A pontos szám a nap hosszától és a program sűrűségétől függ.",
      },
      {
        q: "Mikor kapom meg a képeket?",
        a: "A teljes anyagot négy héten belül küldöm. Néhány válogatott képet pár nappal az esküvő után kapsz, hogy legyen mit megmutatni.",
      },
      {
        q: "Mennyivel előre kell szólni?",
        a: "A főszezonban (május–szeptember) érdemes fél évvel előbb egyeztetni. Ha közelebbi dátumod van, akkor is írj — előfordul, hogy van szabad hétvégém.",
      },
      {
        q: "Vas vármegyén kívülre is elmész?",
        a: "Igen. Szombathely a bázisom, de az ország bármely pontjára megyek, ilyenkor útiköltséggel számolunk.",
      },
    ],
  },
  {
    slug: "rendezvenyfotozas",
    name: "Rendezvény",
    heading: "Rendezvényfotózás — fesztivál, céges esemény, ünnepség",
    title: "Rendezvényfotós Szombathely — Maczkó Fotó",
    description:
      "Rendezvényfotós Szombathelyen: fesztivál, céges esemény, díjátadó, ballagás, ünnepség. Gyors átfutás, sajtóba és közösségi médiába kész képek.",
    short: "Fesztivál, céges esemény, díjátadó, ballagás.",
    intro: [
      "Rendezvényen az a dolgom, hogy ne vegyél észre. Végigjárom a helyszínt, dokumentálom a programot, a szereplőket és a közönséget — utána megkapod azt az anyagot, amivel dolgozni tudsz.",
      "Sok fesztivált, városi rendezvényt, díjátadót és iskolai ünnepséget fotóztam Szombathelyen és a vármegyében. Tudom, mikor kell elöl lenni, és mikor kell hátralépni.",
      "Ha a képek másnap kellenek a sajtónak vagy a közösségi médiába, azt előre megbeszéljük, és a válogatás még aznap éjjel elindul.",
    ],
    includes: [
      "A teljes program végigfotózása, a megnyitótól a zárásig",
      "Szereplők, díszvendégek, közönség, hangulatképek",
      "Igény szerint gyorsválogatás még aznap vagy másnap",
      "Szabadon felhasználható képek a saját kommunikációtokhoz",
    ],
    categories: ["Esemény", "Riport"],
    heroAlbum: "xxv-felvonulas",
    faq: [
      {
        q: "Céges rendezvényre is jössz?",
        a: "Igen. Konferencia, évzáró, csapatépítő, díjátadó, sajtótájékoztató — mindegyikben van gyakorlatom.",
      },
      {
        q: "Milyen gyorsan kapjuk meg a képeket?",
        a: "Alapesetben egy héten belül. Ha sajtóanyag kell, egy szűk gyorsválogatást a rendezvény napján vagy másnap reggel küldök.",
      },
      {
        q: "Fel lehet használni a képeket hirdetésben?",
        a: "Igen, a felhasználás módját előre tisztázzuk, és a szerződésben rögzítjük. Alapból szabad kezet adok a saját kommunikációtokhoz.",
      },
    ],
  },
  {
    slug: "buli-fotozas",
    name: "Buli",
    heading: "Buli- és klubfotózás, koncertfotózás",
    title: "Bulifotós Szombathely — klub, koncert, party | Maczkó Fotó",
    description:
      "Bulifotós Szombathelyen: klubest, koncert, fesztiválszínpad, party. Sötétben is éles, hangulatos képek, gyors átfutással a közösségi médiába.",
    short: "Klubest, koncert, fesztiválszínpad.",
    intro: [
      "A buli a legnehezebb műfaj technikailag: sötét van, minden mozog, a fény percenként vált színt. Ehhez kell a világos objektív és a vakuzás ismerete — enélkül csak zajos, elmosódott képek lesznek.",
      "Klubestéken, koncerteken és fesztiválszínpadokon is dolgoztam. Tudom, hol kell állni ahhoz, hogy a színpadi fény ne kiégjen, és a tömeg is látszódjon.",
      "A klubok általában másnap reggelre kérik a képeket. Ez működik: az anyag válogatva, szerkesztve érkezik, közösségi médiára kész méretben.",
    ],
    includes: [
      "Az egész este végigfotózása: közönség, DJ vagy fellépő, hangulat",
      "Sötét térhez igazított beállítás, külső vakuval",
      "Másnapi átfutás, közösségi médiára kész méretben",
      "Igény szerint arculatba illő szerkesztés",
    ],
    categories: ["Koncert"],
    heroAlbum: "karneval-beton-hofi",
    faq: [
      {
        q: "Mikor kapjuk meg a képeket egy klubest után?",
        a: "Másnap. A legtöbb helyen ez az elvárás, és ehhez igazodom.",
      },
      {
        q: "Sötét klubban is lesznek használható képek?",
        a: "Igen. Full frame vázzal és f/2.8-as objektívvel dolgozom, plusz külső vakuval — pont az ilyen helyzetekre.",
      },
      {
        q: "Koncerten a színpadot is fotózod?",
        a: "Igen, fellépőt és közönséget egyaránt. Ha a szervező akkreditációt kér az árokba, azt előre intézzük.",
      },
    ],
  },
  {
    slug: "sportfotozas",
    name: "Sport",
    heading: "Sportfotózás — mérkőzés, torna, csapatfotó",
    title: "Sportfotós Szombathely — meccs, torna | Maczkó Fotó",
    description:
      "Sportfotós Szombathelyen: labdarúgás, kosárlabda, kézilabda, utcai sport. Éles akciófotók mérkőzésekről, tornákról, edzőtáborokból.",
    short: "Mérkőzés, torna, edzőtábor, csapatfotó.",
    intro: [
      "Sportban a pillanaton múlik minden: a mozdulat, ami eldönti a meccset, fél másodpercig tart. Ehhez ismerni kell a játékot, nem csak a gépet — tudni kell, hova fog kerülni a labda.",
      "Kosárlabdát, labdarúgást, kézilabdát és utcai sportot is fotóztam, bajnoki döntőtől a gyerektáborig.",
      "A klubok általában a meccs utáni órákban akarják kitenni a képeket. Ez belefér.",
    ],
    includes: [
      "Akciófotók a mérkőzésről, a pálya több pontjáról",
      "Lelátó, szurkolók, ünneplés",
      "Csapat- és játékosportré igény szerint",
      "Gyors átfutás, hogy még aznap kimehessen az anyag",
    ],
    categories: ["Sport"],
    heroAlbum: "falco-donto",
    faq: [
      {
        q: "Egész meccset végigfotózol?",
        a: "Igen, az bevonulástól a lefújásig és az ünneplésig. Tornán a teljes napot.",
      },
      {
        q: "Csapatfotót is vállalsz?",
        a: "Igen, szezon eleji csapatképet és egyéni játékosportrét is.",
      },
    ],
  },
  {
    slug: "portre-fotozas",
    name: "Portré",
    heading: "Portré- és páros fotózás",
    title: "Portréfotós Szombathely — páros és üzleti portré | Maczkó Fotó",
    description:
      "Portréfotózás Szombathelyen: páros fotózás, üzleti portré, profilkép. Természetes fény, nyugodt tempó, használható végeredmény.",
    short: "Páros fotózás, üzleti portré, profilkép.",
    intro: [
      "A portrénál a legfontosabb, hogy oldott legyél. Ha görcsölsz, az meglátszik a képen, és semmilyen utómunka nem javítja meg. Ezért nem sietünk, és nem is kell pózolni tudnod — elmondom, mit csinálj.",
      "Páros fotózáshoz általában külső helyszínt választunk: erdő, város, egy hely, ami mond valamit rólatok.",
      "Üzleti portréhoz és profilképhez sötét vagy semleges háttérrel dolgozom, hogy bárhol fel tudd használni.",
    ],
    includes: [
      "Előzetes egyeztetés a helyszínről és a hangulatról",
      "Nyugodt tempójú fotózás, konkrét instrukciókkal",
      "Válogatott, szerkesztett képek online galériában",
      "Web- és nyomdakész méretek",
    ],
    categories: ["Portré"],
    heroAlbum: "koszeg",
    faq: [
      {
        q: "Mennyi ideig tart egy portréfotózás?",
        a: "Egy portré- vagy páros fotózás jellemzően másfél-két óra, helyszíntől függően.",
      },
      {
        q: "Nem tudok pózolni, ez baj?",
        a: "Nem. A fotózás nagy részében mondom, mit csinálj, és a legjobb képek úgyis a két beállítás közötti pillanatokban születnek.",
      },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/** A nyitóoldal teljes képernyős fejlécének képei. */
export const heroSlides = [
  {
    src: "/portfolio/szentivanej/18.webp",
    alt: "Több ezres tömeg a szentivánéji fesztivál nagyszínpada előtt Szombathelyen",
    label: "Rendezvény",
  },
  {
    src: "/portfolio/eszter-milan/01.webp",
    alt: "Menyasszony és vőlegény első találkozása az esküvő reggelén",
    label: "Esküvő",
  },
  {
    src: "/portfolio/karneval-beton-hofi/15.webp",
    alt: "Első sor egy szombathelyi szabadtéri koncerten, telefonokkal a magasban",
    label: "Buli",
  },
];
