import { cn } from "@/lib/utils";
import React from "react";

const SECTION_X = "px-6 md:px-12";
const SECTION_Y = "py-24 md:py-32";
const PAGE_HERO_Y = "pt-32 md:pt-40 pb-16 md:pb-24";
const CONTAINER = "max-w-7xl mx-auto";

export const Section = ({
  id,
  className,
  containerClassName,
  bare = false,
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  bare?: boolean;
  children: React.ReactNode;
}) => (
  <section id={id} className={cn(SECTION_Y, className)}>
    {bare ? children : <div className={cn(SECTION_X, CONTAINER, containerClassName)}>{children}</div>}
  </section>
);

export const PageHero = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <section className={cn(PAGE_HERO_Y, SECTION_X, className)}>
    <div className={CONTAINER}>{children}</div>
  </section>
);

export const Eyebrow = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <p className={cn("eyebrow", className)}>{children}</p>
);

export const SectionHeader = ({
  kicker,
  title,
  description,
  align = "split",
  titleClassName,
  className,
}: {
  kicker?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "split" | "stacked" | "center";
  titleClassName?: string;
  className?: string;
}) => {
  const titleEl = (
    <h2
      className={cn(
        "h-section",
        kicker ? "mt-4" : undefined,
        titleClassName,
      )}
    >
      {title}
    </h2>
  );

  if (align === "center") {
    return (
      <div className={cn("text-center max-w-3xl mx-auto mb-12 md:mb-16", className)}>
        {kicker && <Eyebrow>{kicker}</Eyebrow>}
        {titleEl}
        {description && <p className="lead mt-6">{description}</p>}
      </div>
    );
  }

  if (align === "stacked") {
    return (
      <div className={cn("mb-12 md:mb-16", className)}>
        {kicker && <Eyebrow>{kicker}</Eyebrow>}
        {titleEl}
        {description && <p className="lead mt-6 max-w-xl">{description}</p>}
      </div>
    );
  }

  return (
    <div className={cn("mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6", className)}>
      <div>
        {kicker && <Eyebrow>{kicker}</Eyebrow>}
        {titleEl}
      </div>
      {description && <p className="md:max-w-md lead">{description}</p>}
    </div>
  );
};
