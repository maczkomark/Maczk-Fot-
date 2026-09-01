"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export type AlbumCard = {
  slug: string;
  title: string;
  category: string;
  date?: string;
  count: number;
  cover: string;
};

/** Galériarács kategóriaszűrővel. Széltől szélig tölti a helyet. */
export function AlbumGrid({ items }: { items: AlbumCard[] }) {
  const [active, setActive] = useState<string>("Mind");

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const a of items) counts.set(a.category, (counts.get(a.category) ?? 0) + 1);
    return [
      { name: "Mind", count: items.length },
      ...[...counts.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([name, count]) => ({ name, count })),
    ];
  }, [items]);

  const shown = active === "Mind" ? items : items.filter((a) => a.category === active);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((c) => (
          <button
            key={c.name}
            onClick={() => setActive(c.name)}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm transition-colors border",
              active === c.name
                ? "bg-ink-800 text-cream-50 border-ink-800"
                : "border-cream-300 text-ink-600 hover:border-ink-800/40 hover:text-ink-800",
            )}
          >
            {c.name}
            <span className={cn("ml-2 tabular-nums", active === c.name ? "text-cream-50/50" : "text-ink-400")}>
              {c.count}
            </span>
          </button>
        ))}
      </div>

      <div className="grid gap-3 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {shown.map((a) => (
          <Link
            key={a.slug}
            href={`/portfolio/${a.slug}`}
            className="group relative aspect-[4/5] overflow-hidden bg-ink-950"
          >
            <Image
              src={a.cover}
              alt={`${a.title} — ${a.category.toLowerCase()} fotózás, Maczkó Fotó`}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
              <p className="text-[0.65rem] uppercase tracking-[0.25em] text-white/60">{a.category}</p>
              <h2 className="font-display text-lg md:text-2xl text-white mt-1.5 leading-tight">{a.title}</h2>
              <p className="text-xs text-white/50 mt-2 tabular-nums">
                {a.date ? `${a.date} · ` : ""}
                {a.count} kép
              </p>
            </div>
          </Link>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="body py-16 text-center">Ebben a kategóriában még nincs galéria.</p>
      )}
    </>
  );
}
