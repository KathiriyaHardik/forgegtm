import { Fragment, ReactNode } from "react";

/**
 * Seamless horizontal marquee. Each track sizes to its content and is repeated
 * enough times to overflow the viewport, then two identical tracks translate a
 * full track width — so the loop has no visible gap or seam. Pauses on hover
 * and is disabled under prefers-reduced-motion (see globals.css).
 */
export function Marquee({
  children,
  durationSeconds = 45,
  repeat = 4,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  durationSeconds?: number;
  /** Times the children are repeated within a single track. */
  repeat?: number;
  reverse?: boolean;
  className?: string;
}) {
  const trackStyle = {
    animationDuration: `${durationSeconds}s`,
    animationDirection: reverse ? "reverse" : "normal",
  } as const;

  const trackClass =
    "animate-marquee flex w-max shrink-0 items-center gap-3 pr-3 group-hover:[animation-play-state:paused]";

  const track = Array.from({ length: repeat }, (_, i) => (
    <Fragment key={i}>{children}</Fragment>
  ));

  return (
    <div
      className={`group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)] ${className}`}
    >
      <div className={trackClass} style={trackStyle}>
        {track}
      </div>
      <div className={trackClass} style={trackStyle} aria-hidden>
        {track}
      </div>
    </div>
  );
}
