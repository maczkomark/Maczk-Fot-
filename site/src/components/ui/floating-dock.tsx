"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, MotionValue, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

type Item = { title: string; icon: React.ReactNode; href: string };

export const FloatingDock = ({ items, className }: { items: Item[]; className?: string }) => (
  <>
    <FloatingDockDesktop items={items} className={cn("hidden md:flex", className)} />
    <FloatingDockMobile items={items} className={cn("md:hidden", className)} />
  </>
);

const FloatingDockDesktop = ({ items, className }: { items: Item[]; className?: string }) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex h-16 items-end gap-3 rounded-full bg-cream-50/85 backdrop-blur-xl border border-cream-300 shadow-sm px-4 pb-3",
        className,
      )}
    >
      {items.map((item) => <IconContainer mouseX={mouseX} key={item.title} {...item} />)}
    </motion.div>
  );
};

function IconContainer({ mouseX, title, icon, href }: { mouseX: MotionValue<number> } & Item) {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });
  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });
  const heightSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const height = useSpring(heightSync, { mass: 0.1, stiffness: 150, damping: 12 });
  const widthIcon = useSpring(useTransform(distance, [-150, 0, 150], [20, 40, 20]), { mass: 0.1, stiffness: 150, damping: 12 });
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-cream-200 hover:bg-cream-300/60 transition-colors"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-9 left-1/2 whitespace-pre rounded-md border border-cream-300 bg-ink-800 px-2 py-0.5 text-xs text-cream-50"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div style={{ width: widthIcon, height: widthIcon }} className="flex items-center justify-center text-ink-800">
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}

const FloatingDockMobile = ({ items, className }: { items: Item[]; className?: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-16 right-0 flex flex-col gap-2"
          >
            {items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: i * 0.04 } }}
                exit={{ opacity: 0, y: 10 }}
              >
                <Link href={item.href} className="flex h-12 w-12 items-center justify-center rounded-full bg-cream-50/85 backdrop-blur-xl border border-cream-300 text-ink-800 shadow-sm">
                  {item.icon}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        aria-label="Menü"
        onClick={() => setOpen(!open)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-cream-50/85 backdrop-blur-xl border border-cream-300 text-ink-800 shadow-sm"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
    </div>
  );
};
