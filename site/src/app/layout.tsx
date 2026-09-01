import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Header } from "@/components/site/header";
import { JsonLd } from "@/components/site/jsonld";
import { localBusinessLd } from "@/lib/seo";
import { services, site } from "@/lib/site";
import { Instagram, Facebook, Mail, Phone } from "lucide-react";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });
const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Maczkó Fotó — esküvő, rendezvény és bulifotózás Szombathelyen",
    template: "%s",
  },
  description:
    "Maczkó Márk fotós Szombathelyen. Esküvő, rendezvény, buli és sport — Vas vármegyében és azon túl. Nézd meg a munkáimat, és kérj ajánlatot.",
  keywords: [
    "esküvői fotós Szombathely",
    "rendezvényfotós Szombathely",
    "bulifotós",
    "koncertfotós",
    "sportfotós Szombathely",
    "fotós Vas vármegye",
  ],
  authors: [{ name: site.person }],
  creator: site.person,
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    locale: "hu_HU",
    siteName: site.name,
    url: site.url,
  },
  robots: { index: true, follow: true },
};

const legalLinks = [
  { href: "/portfolio", label: "Munkáim" },
  { href: "/about", label: "Rólam" },
  { href: "/contact", label: "Kapcsolat" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear();

  return (
    <html lang="hu" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="bg-cream-100 text-ink-600 font-sans antialiased">
        <JsonLd data={localBusinessLd()} />
        <Header />

        {children}

        <footer className="bg-ink-950 text-cream-100">
          <div className="px-5 sm:px-8 lg:px-14 2xl:px-20 py-16 md:py-24">
            <div className="grid gap-12 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="flex items-baseline gap-1.5">
                  <span className="font-display text-3xl text-cream-100 tracking-tight">Maczkó</span>
                  <span className="font-display italic text-3xl text-copper-400 tracking-tight">Fotó</span>
                </p>
                <p className="mt-5 text-cream-100/60 leading-relaxed max-w-xs">
                  {site.tagline}
                </p>
                <div className="mt-8 flex gap-3">
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="h-10 w-10 rounded-full border border-cream-100/20 flex items-center justify-center text-cream-100/70 hover:text-cream-100 hover:border-cream-100/50 transition"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a
                    href={site.facebook}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="h-10 w-10 rounded-full border border-cream-100/20 flex items-center justify-center text-cream-100/70 hover:text-cream-100 hover:border-cream-100/50 transition"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="md:col-span-3">
                <p className="text-[0.7rem] uppercase tracking-[0.3em] text-cream-100/40 mb-5">
                  Szolgáltatások
                </p>
                <ul className="space-y-2.5">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/${s.slug}`} className="text-cream-100/70 hover:text-cream-100 transition">
                        {s.heading.split(" — ")[0].split(" Szombathelyen")[0]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-2">
                <p className="text-[0.7rem] uppercase tracking-[0.3em] text-cream-100/40 mb-5">Oldalak</p>
                <ul className="space-y-2.5">
                  <li>
                    <Link href="/" className="text-cream-100/70 hover:text-cream-100 transition">Főoldal</Link>
                  </li>
                  {legalLinks.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-cream-100/70 hover:text-cream-100 transition">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-3">
                <p className="text-[0.7rem] uppercase tracking-[0.3em] text-cream-100/40 mb-5">Elérhetőség</p>
                <ul className="space-y-3">
                  <li>
                    <a href={site.phoneHref} className="inline-flex items-center gap-3 text-cream-100/70 hover:text-cream-100 transition">
                      <Phone className="h-4 w-4 shrink-0" /> {site.phone}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 text-cream-100/70 hover:text-cream-100 transition break-all">
                      <Mail className="h-4 w-4 shrink-0" /> {site.email}
                    </a>
                  </li>
                  <li className="text-cream-100/50 pt-2">
                    {site.city}, {site.region}
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-cream-100/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-cream-100/40">
              <p>© {year} {site.name} · {site.person}. Minden jog fenntartva.</p>
              <p>
                weboldal:{" "}
                <a href="https://maczkoweb.hu" target="_blank" rel="noreferrer" className="hover:text-cream-100/80 transition">
                  Maczkó Web
                </a>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
