import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Home, Image as ImageIcon, User, Mail, Instagram, Facebook } from "lucide-react";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });
const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

export const metadata: Metadata = {
  title: "Maczkó Fotó — Esküvő · Portré · Esemény · Videó",
  description:
    "Esküvő, portré, esemény és videó. Szombathely és Vas vármegye. A pillanat, ami örökre megmarad.",
};

const navLinks = [
  { href: "/portfolio", label: "Munkáim" },
  { href: "/about", label: "Rólam" },
  { href: "/contact", label: "Kapcsolat" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hu" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="grain bg-cream-100 text-ink-600 font-sans antialiased">
        <header className="fixed top-0 inset-x-0 z-40 px-6 md:px-12 py-5">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <a href="/" className="flex items-baseline gap-2 group">
              <span className="font-display text-xl md:text-2xl text-ink-800 tracking-tight">Maczkó</span>
              <span className="font-display italic text-xl md:text-2xl text-copper-600 tracking-tight">Fotó</span>
            </a>
            <div className="hidden md:flex items-center gap-3">
              <span className="brand-chip">EST · 2026</span>
              <span className="text-ink-200">·</span>
              <span className="brand-chip">F/2.8 — ISO 400</span>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-sm">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} className="text-ink-600 hover:text-ink-800 transition">
                  {l.label}
                </a>
              ))}
            </nav>
            <a href="/contact" className="md:hidden eyebrow-accent">Kapcsolat →</a>
          </div>
        </header>

        {children}

        <FloatingDock
          items={[
            { title: "Főoldal", icon: <Home className="h-5 w-5" />, href: "/" },
            { title: "Munkáim", icon: <ImageIcon className="h-5 w-5" />, href: "/portfolio" },
            { title: "Rólam", icon: <User className="h-5 w-5" />, href: "/about" },
            { title: "Kapcsolat", icon: <Mail className="h-5 w-5" />, href: "/contact" },
            { title: "Instagram", icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com/maczko_foto" },
            { title: "Facebook", icon: <Facebook className="h-5 w-5" />, href: "https://www.facebook.com/profile.php?id=61590258863710" },
          ]}
        />

        <footer className="border-t border-cream-300 px-6 md:px-12 py-16 md:py-20 mt-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <span className="brand-chip">— maczkofoto.hu / 2026</span>
              <span className="brand-chip">F/2.8 — ISO 400</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div>
                <p className="flex items-baseline gap-2">
                  <span className="font-display text-3xl md:text-4xl text-ink-800 tracking-tight">Maczkó</span>
                  <span className="font-display italic text-3xl md:text-4xl text-copper-600 tracking-tight">Fotó</span>
                </p>
                <p className="lead mt-4 max-w-xs">
                  Esküvő, portré, esemény és videó. Szombathely &amp; Vas vármegye.
                </p>
              </div>
              <div>
                <p className="eyebrow mb-4">Menü</p>
                <ul className="space-y-2">
                  <li><a href="/" className="body hover:text-ink-800 transition">Főoldal</a></li>
                  {navLinks.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className="body hover:text-ink-800 transition">{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow mb-4">Elérhető</p>
                <ul className="space-y-2">
                  <li><a href="tel:+36204087765" className="body hover:text-ink-800 transition">+36 20 408 7765</a></li>
                  <li><a href="mailto:maczkomark08@gmail.com" className="body hover:text-ink-800 transition">maczkomark08@gmail.com</a></li>
                  <li><a href="https://instagram.com/maczko_foto" target="_blank" rel="noreferrer" className="body hover:text-ink-800 transition">@maczko_foto</a></li>
                  <li><a href="https://www.facebook.com/profile.php?id=61590258863710" target="_blank" rel="noreferrer" className="body hover:text-ink-800 transition">Facebook</a></li>
                </ul>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-cream-300 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-ink-400">
              <p>© {new Date().getFullYear()} Maczkó Fotó · Maczkó Márk. Minden jog fenntartva.</p>
              <p className="italic">a pillanat, ami örökre megmarad</p>
              <p>weboldal: <a href="https://maczkoweb.hu" target="_blank" rel="noreferrer" className="text-ink-600 hover:text-copper-600 transition">Maczkó Web</a></p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
