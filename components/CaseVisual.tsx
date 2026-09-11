/**
 * Abstract monochrome panel standing in for case-study photography.
 * Swap the whole component for an <Image> when real imagery is licensed —
 * keep the aspect ratio and radius so the editorial composition holds.
 */
export function CaseVisual({
  variant,
  className = "",
}: {
  variant: "arcs" | "lines";
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[4/3] w-full overflow-hidden rounded-card border border-border bg-[linear-gradient(145deg,#2c313b_0%,#171a20_55%,#0d0f13_100%)] ${className}`}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 26% 22%, rgba(255,255,255,0.16), transparent 58%)",
        }}
      />

      {variant === "arcs" ? (
        <svg
          aria-hidden
          viewBox="0 0 400 300"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          {[44, 88, 132, 176, 220, 264, 308].map((r) => (
            <circle
              key={r}
              cx="128"
              cy="244"
              r={r}
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
            />
          ))}
          <circle cx="128" cy="244" r="7" fill="rgba(45,94,245,0.95)" />
        </svg>
      ) : (
        <svg
          aria-hidden
          viewBox="0 0 400 300"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          {Array.from({ length: 16 }, (_, i) => i * 34 - 140).map((x) => (
            <line
              key={x}
              x1={x}
              y1="320"
              x2={x + 220}
              y2="-20"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="1"
            />
          ))}
          <line
            x1={150}
            y1="320"
            x2={370}
            y2="-20"
            stroke="rgba(45,94,245,0.75)"
            strokeWidth="2"
          />
        </svg>
      )}

      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
