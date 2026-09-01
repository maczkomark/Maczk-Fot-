"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { services, site } from "@/lib/site";

const mainLinks = [
  { href: "/portfolio", label: "Munkáim" },
  { href: "/about", label: "Rólam" },
  { href: "/contact", label: "Kapcsolat" },
];

/** Ezeken az oldalakon teljes képernyős kép van legfelül, oda átlátszó fejléc kell. */
function hasImageHero(pathname: string) {
  if (pathname === "/") return true;
  if (pathname.startsWith("/portfolio/") && pathname !== "/portfolio/") return true;
  return services.some((s) => pathname === `/${s.slug}` || pathname === `/${s.slug}/`);
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const overHero = hasImageHero(pathname ?? "/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Átlátszó, világos szövegű fejléc csak a hero tetején.
  const transparent = overHero && !scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-colors duration-300",
          transparent
            ? "bg-transparent"
            : "bg-cream-100/90 backdrop-blur-md border-b border-cream-300",
        )}
      >
        <div className="px-5 sm:px-8 lg:px-14 2xl:px-20">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-baseline gap-1.5 shrink-0">
              <span
                className={cn(
                  "font-display text-xl md:text-2xl tracking-tight transition-colors",
                  transparent ? "text-white" : "text-ink-800",
                )}
              >
                Maczkó
              </span>
              <span
                className={cn(
                  "font-display italic text-xl md:text-2xl tracking-tight transition-colors",
                  transparent ? "text-white/80" : "text-copper-600",
                )}
              >
                Fotó
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8 text-sm">
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className={cn(
                    "py-6 transition-colors",
                    transparent ? "text-white/90 hover:text-white" : "text-ink-600 hover:text-ink-800",
                  )}
                  aria-expanded={servicesOpen}
                >
                  Szolgáltatások
                </button>
                {servicesOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-64 bg-cream-50 border border-cream-300 shadow-xl rounded-sm py-2">
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/${s.slug}`}
                        className="block px-5 py-3 hover:bg-cream-200 transition-colors"
                      >
                        <span className="block text-ink-800">{s.name}</span>
                        <span className="block text-xs text-ink-400 mt-0.5">{s.short}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {mainLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "transition-colors",
                    transparent ? "text-white/90 hover:text-white" : "text-ink-600 hover:text-ink-800",
                  )}
                >
                  {l.label}
                </Link>
              ))}

              <Link
                href="/contact"
                className={cn(
                  "rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
                  transparent
                    ? "bg-white text-ink-900 hover:bg-white/90"
                    : "bg-ink-800 text-cream-50 hover:bg-ink-900",
                )}
              >
                Ajánlatot kérek
              </Link>
            </nav>

            <button
              onClick={() => setOpen(true)}
              aria-label="Menü megnyitása"
              className={cn(
                "lg:hidden h-10 w-10 -mr-2 flex items-center justify-center transition-colors",
                transparent ? "text-white" : "text-ink-800",
              )}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobil menü */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-cream-100 lg:hidden flex flex-col">
          <div className="flex items-center justify-between h-16 px-5 border-b border-cream-300">
            <span className="flex items-baseline gap-1.5">
              <span className="font-display text-xl text-ink-800 tracking-tight">Maczkó</span>
              <span className="font-display italic text-xl text-copper-600 tracking-tight">Fotó</span>
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Menü bezárása"
              className="h-10 w-10 -mr-2 flex items-center justify-center text-ink-800"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-8">
            <p className="eyebrow mb-4">Szolgáltatások</p>
            <ul className="space-y-1 mb-10">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${s.slug}`}
                    className="block py-3 border-b border-cream-300 font-display text-2xl text-ink-800"
                  >
                    {s.name}
                    <span className="block text-sm font-sans text-ink-400 mt-1">{s.short}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="space-y-1 mb-10">
              {mainLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block py-3 border-b border-cream-300 font-display text-2xl text-ink-800"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="block text-center rounded-full bg-ink-800 text-cream-50 py-4 font-medium"
            >
              Ajánlatot kérek
            </Link>

            <div className="mt-8 space-y-1 text-sm text-ink-400">
              <p>
                <a href={site.phoneHref} className="hover:text-ink-800">{site.phone}</a>
              </p>
              <p>
                <a href={`mailto:${site.email}`} className="hover:text-ink-800">{site.email}</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
