"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export type GridCard = {
  id: number;
  className?: string;
  thumbnail: string;
  title: string;
  description: string;
  href: string;
};

export const LayoutGrid = ({ cards }: { cards: GridCard[] }) => {
  const [selected, setSelected] = useState<GridCard | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 max-w-7xl mx-auto md:h-[80vh]">
      {cards.map((card) => (
        <button
          key={card.id}
          onClick={() => setSelected(card)}
          className={cn("relative overflow-hidden rounded-xl text-left group h-64 md:h-full", card.className)}
        >
          <motion.div layoutId={`card-${card.id}`} className="absolute inset-0">
            <Image src={card.thumbnail} alt={card.title} fill sizes="50vw" className="object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="on-image-eyebrow">Album</p>
              <h3 className="on-image-title mt-2">{card.title}</h3>
            </div>
          </motion.div>
        </button>
      ))}

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              layoutId={`card-${selected.id}`}
              className="relative w-full max-w-4xl h-[70vh] rounded-2xl overflow-hidden bg-ink-900"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={selected.thumbnail} alt={selected.title} fill sizes="80vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-8 md:p-10">
                <p className="on-image-eyebrow">Album</p>
                <h3 className="font-display font-light text-3xl md:text-5xl text-white leading-[0.95] tracking-tight mt-3">
                  {selected.title}
                </h3>
                <p className="mt-4 max-w-xl text-base text-white/70 leading-relaxed">{selected.description}</p>
                <Link
                  href={selected.href}
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-ink-50 text-ink-950 text-sm font-medium hover:bg-ink-100 transition-colors duration-200"
                >
                  Album megnyitása →
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
