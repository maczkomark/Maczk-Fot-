"use client";

import Image from "next/image";
import { useState } from "react";
import { Lightbox } from "./lightbox";
import { cn } from "@/lib/utils";

export const MasonryGallery = ({ images, title }: { images: string[]; title?: string }) => {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => {
              setIdx(i);
              setOpen(true);
            }}
            className={cn(
              "block w-full break-inside-avoid mb-4 group relative overflow-hidden rounded-sm border border-cream-300",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-ink-800/30",
            )}
          >
            <Image
              src={src}
              alt={title ? `${title} — ${i + 1}` : `Kép ${i + 1}`}
              width={1200}
              height={800}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full h-auto object-cover transition duration-700 group-hover:scale-[1.02] group-hover:brightness-110"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 text-xs tabular-nums text-white/80 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-t from-black/70 to-transparent uppercase tracking-[0.2em]">
              {String(i + 1).padStart(2, "0")} <span className="text-white/40">/</span> {String(images.length).padStart(2, "0")}
            </div>
          </button>
        ))}
      </div>
      <Lightbox
        images={images.map((src, i) => ({ src, alt: title ? `${title} — ${i + 1}` : `Kép ${i + 1}` }))}
        initialIndex={idx}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
