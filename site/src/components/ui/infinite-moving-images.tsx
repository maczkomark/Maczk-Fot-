"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

export const InfiniteMovingImages = ({
  images,
  speed = "normal",
  direction = "left",
  pauseOnHover = true,
  className,
}: {
  images: { src: string; caption?: string }[];
  speed?: "slow" | "normal" | "fast";
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const duration = speed === "slow" ? "80s" : speed === "fast" ? "25s" : "50s";
  return (
    <div className={cn("marquee-mask overflow-hidden", className)}>
      <ul
        className={cn(
          "flex w-max gap-4 py-2",
          direction === "left" ? "animate-scroll" : "animate-scroll-reverse",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
        style={{ ["--duration" as any]: duration }}
      >
        {[...images, ...images].map((img, i) => (
          <li key={i} className="relative h-[200px] w-[300px] shrink-0 overflow-hidden rounded-xl border border-white/5">
            <Image
              src={img.src}
              alt={img.caption ?? "Kép"}
              fill
              sizes="300px"
              className="object-cover"
            />
            {img.caption && (
              <div className="absolute inset-x-0 bottom-0 p-3 text-xs text-white bg-gradient-to-t from-black/70 to-transparent">
                {img.caption}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
