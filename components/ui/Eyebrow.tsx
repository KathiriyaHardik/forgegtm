import { Sparkles } from "lucide-react";

type EyebrowVariant = "dot" | "pill" | "plain";

/**
 * Section kicker.
 *
 * `dot` is the site-wide default — a small accent dot and uppercase tracking,
 * used by every section heading. `pill` is the hero treatment: a bordered
 * chip in sentence case, which reads as a statement rather than a label and
 * gives the fold something to sit against. `plain` drops the dot, for
 * sections whose headline carries the weight on its own.
 */
export function Eyebrow({
  children,
  className = "",
  variant = "dot",
}: {
  children: string;
  className?: string;
  variant?: EyebrowVariant;
}) {
  if (variant === "pill") {
    return (
      <span
        className={`inline-flex items-center gap-2 rounded-full border border-border bg-white/70 py-2 pr-5 pl-4 text-[13px] font-medium text-ink-soft shadow-[0_1px_2px_rgba(10,10,13,0.04)] backdrop-blur-sm ${className}`}
      >
        <Sparkles size={15} className="text-accent" aria-hidden />
        {children}
      </span>
    );
  }

  if (variant === "plain") {
    return (
      <span className={`text-eyebrow text-accent ${className}`}>{children}</span>
    );
  }

  return (
    <span
      className={`text-eyebrow inline-flex items-center gap-2 text-accent ${className}`}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {children}
    </span>
  );
}
