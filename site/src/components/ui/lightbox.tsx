"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Img = { src: string; alt: string; title?: string };

export const Lightbox = ({
  images,
  initialIndex,
  open,
  onClose,
}: {
  images: Img[];
  initialIndex: number;
  open: boolean;
  onClose: () => void;
}) => {
  const [i, setI] = useState(initialIndex);
  useEffect(() => setI(initialIndex), [initialIndex, open]);

  const prev = useCallback(() => setI((p) => (p - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setI((p) => (p + 1) % images.length), [images.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, prev, next, onClose]);

  // touch swipe
  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchX.current = null;
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={onClose}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            aria-label="Bezárás"
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-10 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center text-white"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 text-xs md:text-sm text-white/70 tabular-nums">
            {String(i + 1).padStart(2, "0")} <span className="text-white/30">/</span> {String(images.length).padStart(2, "0")}
          </div>

          <button
            aria-label="Előző"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="hidden md:flex absolute left-6 z-10 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur items-center justify-center text-white"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            aria-label="Következő"
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="hidden md:flex absolute right-6 z-10 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur items-center justify-center text-white"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <motion.div
            key={i}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className="relative max-h-[90vh] max-w-[92vw] aspect-[3/2]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[i].src}
              alt={images[i].alt}
              fill
              priority
              sizes="92vw"
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
