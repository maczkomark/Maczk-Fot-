"use client";

import { cn } from "@/lib/utils";
import { motion, MotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

type Photo = { title: string; src: string; href: string };

export const HeroParallax = ({ photos }: { photos: Photo[] }) => {
  const firstRow = photos.slice(0, 5);
  const secondRow = photos.slice(5, 10);
  const thirdRow = photos.slice(10, 15);

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sp = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), sp);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), sp);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), sp);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), sp);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), sp);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 200]), sp);

  return (
    <section
      ref={ref}
      className="h-[280vh] py-32 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div style={{ rotateX, rotateZ, translateY, opacity }} className="">
        <motion.div className="flex flex-row-reverse gap-6 mb-6">
          {firstRow.map((p) => <Card key={p.src} photo={p} translate={translateX} />)}
        </motion.div>
        <motion.div className="flex flex-row gap-6 mb-6">
          {secondRow.map((p) => <Card key={p.src} photo={p} translate={translateXReverse} />)}
        </motion.div>
        <motion.div className="flex flex-row-reverse gap-6">
          {thirdRow.map((p) => <Card key={p.src} photo={p} translate={translateX} />)}
        </motion.div>
      </motion.div>
    </section>
  );
};

const Header = () => (
  <div className="max-w-7xl relative mx-auto pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-12 w-full left-0 top-0">
    <p className="text-xs uppercase tracking-[0.3em] text-ink-400">Maczkó Márk · Fotográfia · 2026</p>
    <h1 className={cn("font-display font-light text-5xl md:text-7xl text-ink-50 leading-[0.95] tracking-tight mt-4")}>
      Pillanatok, <span className="italic text-ink-400">amik</span><br />nem ismétlődnek.
    </h1>
    <p className="lead mt-6 max-w-xl">
      Esemény, sport és utca. Szombathelyen és környékén dolgozom — a fény, a mozgás és a szín
      csendes őszinteségére építek.
    </p>
  </div>
);

const Card = ({ photo, translate }: { photo: Photo; translate: MotionValue<number> }) => (
  <motion.div
    style={{ x: translate }}
    whileHover={{ y: -10 }}
    className="group/photo h-72 w-[20rem] md:h-96 md:w-[28rem] relative shrink-0 overflow-hidden rounded-xl"
  >
    <Link href={photo.href} className="block h-full w-full">
      <Image
        src={photo.src}
        alt={photo.title}
        fill
        sizes="(max-width: 768px) 320px, 448px"
        className="object-cover absolute h-full w-full inset-0 transition duration-500 group-hover/photo:scale-105"
      />
    </Link>
    <div className="absolute inset-0 h-full w-full opacity-0 group-hover/photo:opacity-80 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none transition duration-500" />
    <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/photo:opacity-100 text-white font-medium text-lg transition duration-500">
      {photo.title}
    </h2>
  </motion.div>
);
