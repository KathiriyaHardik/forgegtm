import { ReactNode } from "react";
import { Container } from "./Container";

type Tone = "light" | "off" | "dark";
type Size = "band" | "default";

const TONES: Record<Tone, string> = {
  light: "bg-surface text-ink",
  off: "bg-surface-2 text-ink",
  dark: "bg-dark text-white",
};

const SIZES: Record<Size, string> = {
  band: "py-16 md:py-20",
  default: "py-24 md:py-32",
};

/**
 * Every major section renders through this wrapper so vertical rhythm,
 * background tone and the optional grid texture stay consistent site-wide.
 */
export function Section({
  id,
  tone = "light",
  size = "default",
  grid = false,
  className = "",
  children,
}: {
  id?: string;
  tone?: Tone;
  size?: Size;
  grid?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden ${TONES[tone]} ${SIZES[size]} ${className}`}
    >
      {grid && (
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 ${
            tone === "dark" ? "grid-lines-dark" : "grid-lines"
          }`}
        />
      )}
      <Container className="relative">{children}</Container>
    </section>
  );
}
