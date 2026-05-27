import { ContactForm } from "@/components/ui/contact-form";
import { Eyebrow } from "@/components/ui/section";
import { Frame } from "@/components/ui/frame";
import Image from "next/image";
import { Mail, Instagram, MapPin, Phone, Facebook } from "lucide-react";
import { albums } from "@/lib/albums";

export const metadata = { title: "Kapcsolat — Maczkó Fotó" };

const contactRows = [
  { icon: Phone, kicker: "Telefon", value: "+36 20 408 7765", href: "tel:+36204087765" },
  { icon: Mail, kicker: "Email", value: "maczkomark08@gmail.com", href: "mailto:maczkomark08@gmail.com" },
  { icon: Instagram, kicker: "Instagram", value: "@maczko_foto", href: "https://instagram.com/maczko_foto" },
  { icon: Facebook, kicker: "Facebook", value: "Maczkó Fotó", href: "https://www.facebook.com/profile.php?id=61590258863710" },
  { icon: MapPin, kicker: "Bázis", value: "Szombathely, Vas vármegye", href: undefined as string | undefined },
];

export default function ContactPage() {
  const sideImage = albums.find((a) => a.slug === "viztorony-nyugat")?.cover ?? albums[0]?.cover ?? "";

  return (
    <main className="min-h-screen">
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <span className="brand-chip">— Maczkó Fotó / Kapcsolat</span>
            <span className="brand-chip hidden sm:inline">F/2.8 — ISO 400</span>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            <div>
              <Eyebrow>— Kapcsolat</Eyebrow>
              <h1 className="h-page mt-4">
                Beszéljünk.<br />
                <span className="italic text-copper-600">Egyszerűen.</span>
              </h1>
              <p className="lead mt-6 max-w-md">
                Akár esküvő, sport, esemény vagy valami egészen más. Írj, és 24 órán
                belül válaszolok.
              </p>

              <div className="mt-10 space-y-3 border-y border-cream-300 divide-y divide-cream-300">
                {contactRows.map((row) => {
                  const Icon = row.icon;
                  const inner = (
                    <div className="flex items-center gap-4 py-4 group">
                      <span className="h-10 w-10 rounded-full border border-cream-300 flex items-center justify-center text-ink-600 group-hover:bg-cream-200 transition">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="flex-1">
                        <p className="brand-chip">{row.kicker}</p>
                        <p className="text-ink-800 mt-0.5">{row.value}</p>
                      </span>
                      {row.href && <span className="text-copper-600">→</span>}
                    </div>
                  );
                  return row.href ? (
                    <a key={row.kicker} href={row.href} className="block">{inner}</a>
                  ) : (
                    <div key={row.kicker}>{inner}</div>
                  );
                })}
              </div>

              {sideImage && (
                <div className="mt-12 hidden md:block">
                  <Frame className="aspect-[4/3] w-full p-2">
                    <div className="absolute inset-2 overflow-hidden">
                      <Image src={sideImage} alt="Szombathely" fill sizes="40vw" className="object-cover" />
                    </div>
                  </Frame>
                </div>
              )}
            </div>

            <div className="md:sticky md:top-32">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
