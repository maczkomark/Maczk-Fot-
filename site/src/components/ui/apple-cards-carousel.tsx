"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type CarouselCard = {
  category: string;
  title: string;
  src: string;
  href: string;
};

export const AppleCardsCarousel = ({ cards }: { cards: CarouselCard[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = () => {
    const el = ref.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    update();
    const el = ref.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("[data-card]") as HTMLElement | null;
    const w = card ? card.offsetWidth + 16 : 320;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        className="no-scrollbar flex w-full overflow-x-scroll scroll-smooth snap-x snap-mandatory gap-4 py-6 px-6 md:px-12"
      >
        {cards.map((c) => <Card key={c.title} card={c} />)}
        <div aria-hidden className="shrink-0 w-2" />
      </div>

      <div className="flex justify-end gap-2 px-6 md:px-12 mt-2">
        <button
          aria-label="Előző"
          disabled={!canPrev}
          onClick={() => scrollBy(-1)}
          className={cn(
            "h-10 w-10 rounded-full flex items-center justify-center border border-cream-300 bg-cream-50 hover:bg-cream-200 transition",
            !canPrev && "opacity-30 pointer-events-none",
          )}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Következő"
          disabled={!canNext}
          onClick={() => scrollBy(1)}
          className={cn(
            "h-10 w-10 rounded-full flex items-center justify-center border border-cream-300 bg-cream-50 hover:bg-cream-200 transition",
            !canNext && "opacity-30 pointer-events-none",
          )}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

const Card = ({ card }: { card: CarouselCard }) => (
  <Link
    data-card
    href={card.href}
    className="group relative shrink-0 snap-center w-[280px] md:w-[420px] h-[400px] md:h-[560px] rounded-sm overflow-hidden bg-cream-200 border border-cream-300"
  >
    <Image
      src={card.src}
      alt={card.title}
      fill
      sizes="(max-width: 768px) 280px, 420px"
      className="object-cover transition duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
    <div className="absolute top-6 left-6 right-6 on-image-eyebrow">
      {card.category}
    </div>
    <div className="absolute bottom-6 left-6 right-6">
      <h3 className="font-display font-light text-3xl md:text-4xl text-white leading-[0.95] tracking-tight max-w-xs">
        {card.title}
      </h3>
      <p className="mt-4 text-sm text-white/70 group-hover:text-white transition">
        Megnyitás <span className="inline-block transition group-hover:translate-x-1">→</span>
      </p>
    </div>
  </Link>
);
