import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "accent" | "outline-dark" | "link";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "rounded-full bg-ink px-6 py-3.5 text-white hover:bg-ink-soft hover:shadow-[0_14px_30px_-14px_rgba(10,10,13,0.5)] hover:-translate-y-px",
  secondary:
    "rounded-full border border-border bg-white px-6 py-3.5 text-ink hover:border-ink/25 hover:shadow-[0_12px_26px_-16px_rgba(10,10,13,0.3)] hover:-translate-y-px",
  accent:
    "rounded-full bg-accent px-6 py-3.5 text-white hover:bg-accent-strong hover:shadow-[0_16px_34px_-14px_rgba(45,94,245,0.6)] hover:-translate-y-px",
  "outline-dark":
    "rounded-full border border-white/15 px-6 py-3.5 text-white hover:border-white/35 hover:bg-white/[0.06]",
  // Text-level CTA — keeps secondary actions from competing with the primary.
  link: "px-1 py-2 text-ink hover:text-accent",
};

export function Button({
  href,
  children,
  variant = "primary",
  icon = "arrow",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  /** "up-right" marks a CTA that goes somewhere else rather than continuing. */
  icon?: "arrow" | "up-right" | false;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 text-[13.5px] font-medium whitespace-nowrap transition-all duration-300 ease-premium ${VARIANTS[variant]} ${className}`}
    >
      {children}
      {icon === "arrow" && (
        <ArrowRight
          size={15}
          className="transition-transform duration-300 ease-premium group-hover:translate-x-1"
        />
      )}
      {icon === "up-right" && (
        <ArrowUpRight
          size={15}
          className="transition-transform duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </Link>
  );
}
