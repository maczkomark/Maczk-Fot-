import { cn } from "@/lib/utils";
import Link from "next/link";

export const BentoGrid = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div
    className={cn(
      "grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
      className,
    )}
  >
    {children}
  </div>
);

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  href,
}: {
  className?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  header: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
}) => {
  const Wrap = href ? Link : "div";
  const wrapProps: any = href ? { href } : {};
  return (
    <Wrap
      {...wrapProps}
      className={cn(
        "group relative row-span-1 rounded-sm overflow-hidden border border-cream-300 bg-cream-200 transition duration-500 hover:border-ink-800/30",
        className,
      )}
    >
      <div className="relative h-full w-full">{header}</div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 transition duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-6 transition duration-500 group-hover:translate-y-[-4px]">
        <div className="flex items-center gap-2 on-image-eyebrow">
          {icon}
          <span>{description}</span>
        </div>
        <h3 className="on-image-title mt-2">{title}</h3>
      </div>
    </Wrap>
  );
};
