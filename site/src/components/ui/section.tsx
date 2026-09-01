import { cn } from "@/lib/utils";
import React from "react";

/**
 * Vízszintes margó. Nagy képernyőn is csak ennyit hagyunk a szélén — a tartalom
 * kihasználja a képernyőt, nem szorul egy keskeny sávba középre.
 */
export const GUTTER = "px-5 sm:px-8 lg:px-14 2xl:px-20";

/** Szövegblokkokhoz: olvasható sorhossz, de nem a teljes oldal szélessége. */
export const PROSE = "max-w-3xl";

type Width = "full" | "wide" | "text";

const widths: Record<Width, string> = {
  /** Széltől szélig, csak a gutter marad. Képrácsokhoz. */
  full: "",
  /** Nagyon széles, de nagyon nagy monitoron sem lesz végtelen. */
  wide: "max-w-[120rem] mx-auto",
  /** Olvasható szövegoszlop. */
  text: "max-w-3xl",
};

export const Section = ({
  id,
  className,
  containerClassName,
  width = "wide",
  bare = false,
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  width?: Width;
  /** Ha true, nincs gutter és nincs konténer — a gyerek intézi a szélességet. */
  bare?: boolean;
  children: React.ReactNode;
}) => (
  <section id={id} className={cn("py-20 md:py-28", className)}>
    {bare ? (
      children
    ) : (
      <div className={cn(GUTTER, widths[width], containerClassName)}>{children}</div>
    )}
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
    <h2 className={cn("h-section", kicker ? "mt-4" : undefined, titleClassName)}>{title}</h2>
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
    <div
      className={cn(
        "mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6",
        className,
      )}
    >
      <div className="max-w-2xl">
        {kicker && <Eyebrow>{kicker}</Eyebrow>}
        {titleEl}
      </div>
      {description && <p className="md:max-w-sm lead">{description}</p>}
    </div>
  );
};
