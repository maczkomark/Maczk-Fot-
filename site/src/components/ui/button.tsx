import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

const base =
  "inline-flex items-center gap-2 rounded-full font-medium transition-colors duration-200 whitespace-nowrap";

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  sm: "px-4 py-2 text-xs",
};

const variants: Record<Variant, string> = {
  primary: "bg-ink-800 text-cream-50 hover:bg-ink-900",
  secondary: "border border-ink-800/20 text-ink-800 hover:bg-ink-800/5",
  ghost: "text-ink-600 hover:text-ink-800",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type AsLink = CommonProps & { href: string } & Omit<React.ComponentProps<typeof Link>, "className" | "children" | "href">;
type AsButton = CommonProps & { href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", className, children } = props;
  const cls = cn(base, sizes[size], variants[variant], className);

  if ("href" in props && props.href) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props as AsLink;
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } = props as AsButton;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
