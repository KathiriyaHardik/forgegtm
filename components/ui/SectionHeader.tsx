import { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * Editorial section header: eyebrow + headline on the left, optional
 * supporting copy set against it on the right. Keeps every section opening
 * on the same grid instead of stacking centred blocks everywhere.
 */
export function SectionHeader({
  eyebrow,
  title,
  aside,
  tone = "light",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  aside?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const isDark = tone === "dark";

  return (
    <div
      className={`grid items-end gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-16 ${className}`}
    >
      <div>
        <Reveal>
          <span className="text-eyebrow inline-flex items-center gap-2 text-accent">
            <span className="h-1 w-1 rounded-full bg-current" />
            {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={70}>
          <h2
            className={`text-h2 mt-5 text-balance ${
              isDark ? "text-white" : "text-ink"
            }`}
          >
            {title}
          </h2>
        </Reveal>
      </div>

      {aside && (
        <Reveal delay={140}>
          <p
            className={`text-body max-w-md lg:pb-1.5 ${
              isDark ? "text-white/55" : "text-muted"
            }`}
          >
            {aside}
          </p>
        </Reveal>
      )}
    </div>
  );
}
