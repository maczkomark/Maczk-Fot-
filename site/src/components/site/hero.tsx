"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { heroSlides } from "@/lib/site";

/**
 * Teljes képernyős nyitókép. A képek lassan váltakoznak; a szöveg végig a helyén
 * marad, hogy ne ugráljon. Ha a látogató nem kér animációt (prefers-reduced-motion),
 * az első képen áll meg.
 */
export function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || heroSlides.length < 2) return;
    const t = setInterval(() => setI((p) => (p + 1) % heroSlides.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-ink-950">
      {heroSlides.map((s, n) => (
        <div
          key={s.src}
          aria-hidden={n !== i}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1400ms] ease-in-out",
            n === i ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={s.src}
            alt={n === 0 ? s.alt : ""}
            fill
            priority={n === 0}
            sizes="100vw"
            className="object-cover scale-105"
          />
        </div>
      ))}

      {/* Sötétítés, hogy a szöveg olvasható legyen */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/75 via-ink-950/20 to-ink-950/95" />

      <div className="relative h-full flex flex-col justify-end pb-16 md:pb-20 px-5 sm:px-8 lg:px-14 2xl:px-20">
        <div className="max-w-5xl min-w-0">
          <p className="on-image text-xs uppercase tracking-[0.35em] text-white/85 mb-6">
            Szombathely · Vas vármegye
          </p>
          <h1 className="on-image font-display text-white leading-[0.88] tracking-tight text-[clamp(2.1rem,8.2vw,7.5rem)]">
            Esküvő, rendezvény,
            <br />
            <span className="italic text-copper-400">buli és sport.</span>
          </h1>
          <p className="on-image mt-6 md:mt-8 text-base md:text-xl text-white/85 max-w-xl leading-relaxed">
            Maczkó Márk vagyok, fotós Szombathelyen. Ott vagyok, amikor történik
            valami — és megmarad belőle a kép.
          </p>

          <div className="mt-8 md:mt-10 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-white text-ink-900 px-7 py-3.5 text-sm font-medium hover:bg-white/90 transition-colors"
            >
              Ajánlatot kérek
            </Link>
            <Link
              href="/portfolio"
              className="rounded-full border border-white/40 text-white px-7 py-3.5 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              Munkáim megtekintése
            </Link>
          </div>
        </div>

        {/* Diaváltó pöttyök */}
        {heroSlides.length > 1 && (
          <div className="absolute bottom-6 right-5 sm:right-8 lg:right-14 2xl:right-20 flex items-center gap-3">
            {heroSlides.map((s, n) => (
              <button
                key={s.src}
                onClick={() => setI(n)}
                aria-label={`${s.label} kép mutatása`}
                className={cn(
                  "h-1 rounded-full transition-all duration-500",
                  n === i ? "w-10 bg-white" : "w-4 bg-white/40 hover:bg-white/70",
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
