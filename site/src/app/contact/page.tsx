import Link from "next/link";
import { Mail, Instagram, MapPin, Phone, Facebook, Clock } from "lucide-react";
import { ContactForm } from "@/components/ui/contact-form";
import { JsonLd } from "@/components/site/jsonld";
import { GUTTER } from "@/components/ui/section";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import { services, site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Kapcsolat — ajánlatkérés | Maczkó Fotó Szombathely",
  description:
    "Kérj ajánlatot esküvői, rendezvény-, buli- vagy sportfotózásra Szombathelyen és Vas vármegyében. 24 órán belül válaszolok.",
  path: "/contact",
});

const rows = [
  { icon: Phone, kicker: "Telefon", value: site.phone, href: site.phoneHref },
  { icon: Mail, kicker: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: Instagram, kicker: "Instagram", value: site.instagramHandle, href: site.instagram },
  { icon: Facebook, kicker: "Facebook", value: "Maczkó Fotó", href: site.facebook },
  { icon: MapPin, kicker: "Bázis", value: `${site.city}, ${site.region}`, href: undefined },
  { icon: Clock, kicker: "Válaszidő", value: site.responseTime, href: undefined },
];

export default function ContactPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbLd([
          { name: "Főoldal", path: "/" },
          { name: "Kapcsolat", path: "/contact" },
        ])}
      />

      <section className={`${GUTTER} max-w-[120rem] mx-auto pt-28 md:pt-40 pb-16 md:pb-24`}>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16 items-start">
          <div className="lg:col-span-6 xl:col-span-5">
            <p className="eyebrow">— Kapcsolat</p>
            <h1 className="font-display text-ink-800 leading-[0.9] tracking-tight text-[clamp(2.1rem,6.5vw,6rem)] mt-5">
              Beszéljünk
              <br />
              <span className="italic text-copper-600">a dátumodról.</span>
            </h1>
            <p className="lead mt-8 max-w-lg">
              Írd meg, mikor és hol lesz az esemény, és mit szeretnél. {site.responseTime}{" "}
              válaszolok, konkrét ajánlattal — nem sablonlevéllel.
            </p>

            <dl className="mt-12 border-y border-cream-300 divide-y divide-cream-300">
              {rows.map((row) => {
                const Icon = row.icon;
                const inner = (
                  <div className="flex items-center gap-5 py-5 group">
                    <span className="h-11 w-11 rounded-full border border-cream-300 flex items-center justify-center text-ink-600 group-hover:bg-cream-200 group-hover:text-copper-600 transition">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="flex-1">
                      <dt className="eyebrow">{row.kicker}</dt>
                      <dd className="text-ink-800 mt-1">{row.value}</dd>
                    </span>
                    {row.href && <span className="text-copper-600">→</span>}
                  </div>
                );
                return row.href ? (
                  <a
                    key={row.kicker}
                    href={row.href}
                    target={row.href.startsWith("http") ? "_blank" : undefined}
                    rel={row.href.startsWith("http") ? "noreferrer" : undefined}
                    className="block"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={row.kicker}>{inner}</div>
                );
              })}
            </dl>

            <div className="mt-12">
              <p className="eyebrow mb-4">— Szolgáltatások</p>
              <div className="flex flex-wrap gap-2">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/${s.slug}`}
                    className="rounded-full border border-cream-300 px-5 py-2.5 text-sm text-ink-600 hover:border-ink-800/40 hover:text-ink-800 transition"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 xl:col-span-7">
            <div className="lg:sticky lg:top-28">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
