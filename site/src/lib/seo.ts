import type { Metadata } from "next";
import { site } from "./site";

/**
 * Egységes metaadat-építő. Minden oldal ezt hívja, így a title, a leírás, a
 * canonical és az OpenGraph-kép mindenhol egy helyről jön.
 */
export function pageMeta({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  /** Az oldal útvonala perjelekkel, pl. "/eskuvoi-fotozas". */
  path: string;
  /** Abszolút vagy gyökértől induló kép. */
  image?: string;
}): Metadata {
  const url = `${site.url}${path}`;
  const img = image ?? "/portfolio/szentivanej/18.webp";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "hu_HU",
      siteName: site.name,
      title,
      description,
      url,
      images: [{ url: `${site.url}${img}`, width: 1920, height: 1280, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${site.url}${img}`],
    },
  };
}

/** A vállalkozás alapadatai — ez megy ki minden oldalon. */
export function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#business`,
    name: site.name,
    image: `${site.url}/brand/mark-square.webp`,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    priceRange: "$$",
    founder: { "@type": "Person", name: site.person },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: "HU",
    },
    areaServed: [
      { "@type": "City", name: "Szombathely" },
      { "@type": "AdministrativeArea", name: "Vas vármegye" },
      { "@type": "Country", name: "Magyarország" },
    ],
    sameAs: [site.instagram, site.facebook],
    knowsAbout: [
      "esküvői fotózás",
      "rendezvényfotózás",
      "bulifotózás",
      "koncertfotózás",
      "sportfotózás",
      "portréfotózás",
    ],
  };
}

/** Egy szolgáltatás leírása a keresőnek. */
export function serviceLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${site.url}${path}`,
    serviceType: name,
    provider: { "@id": `${site.url}/#business` },
    areaServed: { "@type": "AdministrativeArea", name: site.region },
  };
}

/** Gyakori kérdések — ettől jelenhet meg kinyitható blokk a Google találatban. */
export function faqLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Egy album mint képgaléria. */
export function galleryLd({
  name,
  description,
  path,
  images,
  date,
}: {
  name: string;
  description?: string;
  path: string;
  images: string[];
  date?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name,
    description,
    url: `${site.url}${path}`,
    ...(date ? { datePublished: date.replace(/\./g, "-").replace(/-$/, "") } : {}),
    author: { "@type": "Person", name: site.person },
    associatedMedia: images.slice(0, 30).map((src) => ({
      "@type": "ImageObject",
      contentUrl: `${site.url}${src}`,
    })),
  };
}

/** Morzsamenü a találati listához. */
export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}
