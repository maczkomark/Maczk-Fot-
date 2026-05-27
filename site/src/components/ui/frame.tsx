import { cn } from "@/lib/utils";

/**
 * Decorative corner-bracket frame matching the brand poster.
 * Four 24px brackets in the corners; usable around any block content.
 */
export function Frame({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("frame relative", className)}>
      <span className="frame-tl" aria-hidden />
      <span className="frame-tr" aria-hidden />
      <span className="frame-bl" aria-hidden />
      <span className="frame-br" aria-hidden />
      {children}
    </div>
  );
}
