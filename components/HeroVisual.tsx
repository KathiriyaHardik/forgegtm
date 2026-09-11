/**
 * Art-directed abstract composition used as the hero's focal point: a primary
 * mass with orbiting elements, echoing a system rather than a decoration.
 * Drawn as one SVG so the composition holds at every aspect ratio.
 * Replace this component with an <Image> when brand artwork exists.
 */
export function HeroVisual({ className = "" }: { className?: string }) {
  return (
    <figure
      className={`relative aspect-[3/2] w-full overflow-hidden rounded-panel border border-border bg-[linear-gradient(140deg,#f5f6f8_0%,#e7e9ee_50%,#cdd2db_100%)] shadow-[0_50px_100px_-50px_rgba(10,10,13,0.45)] sm:aspect-[16/9] lg:aspect-[16/7.5] ${className}`}
    >
      <svg
        aria-hidden
        viewBox="0 0 1200 560"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <radialGradient id="hv-main" cx="34%" cy="26%" r="78%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#f4f6f8" />
            <stop offset="62%" stopColor="#d6dae2" />
            <stop offset="86%" stopColor="#a9b0bc" />
            <stop offset="100%" stopColor="#8b93a1" />
          </radialGradient>

          <radialGradient id="hv-blue" cx="34%" cy="26%" r="80%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="34%" stopColor="#eef2fe" />
            <stop offset="72%" stopColor="#bccbf5" />
            <stop offset="100%" stopColor="#8fa2e4" />
          </radialGradient>

          <radialGradient id="hv-small" cx="32%" cy="26%" r="80%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="46%" stopColor="#e9ebef" />
            <stop offset="100%" stopColor="#b4bac5" />
          </radialGradient>

          <radialGradient id="hv-warm" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(238,214,196,0.85)" />
            <stop offset="100%" stopColor="rgba(238,214,196,0)" />
          </radialGradient>

          <radialGradient id="hv-shadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(10,10,13,0.35)" />
            <stop offset="100%" stopColor="rgba(10,10,13,0)" />
          </radialGradient>
        </defs>

        {/* Warm wash — the single warm note against a cool palette */}
        <ellipse cx="880" cy="170" rx="330" ry="240" fill="url(#hv-warm)" />

        {/* Orbit rings */}
        <g transform="rotate(-14 430 300)">
          <ellipse
            cx="430"
            cy="300"
            rx="545"
            ry="192"
            fill="none"
            stroke="rgba(10,10,13,0.13)"
            strokeWidth="1.25"
          />
          <ellipse
            cx="430"
            cy="300"
            rx="390"
            ry="134"
            fill="none"
            stroke="rgba(10,10,13,0.09)"
            strokeWidth="1.25"
          />
        </g>

        {/* Contact shadow beneath the primary mass */}
        <ellipse cx="420" cy="492" rx="250" ry="42" fill="url(#hv-shadow)" />

        <circle cx="400" cy="278" r="190" fill="url(#hv-main)" />
        <circle cx="836" cy="196" r="86" fill="url(#hv-blue)" />
        <circle cx="902" cy="404" r="52" fill="url(#hv-small)" />
      </svg>

      {/* Fine grain keeps the gradients from reading as flat digital fills */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Scrim so the caption stays legible over the artwork */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-black/40 to-transparent"
      />

      <figcaption className="text-meta absolute bottom-6 left-6 font-medium tracking-tight text-white/90 md:bottom-8 md:left-8">
        Strategy &rarr; Systems &rarr; Compounding revenue
      </figcaption>

      {/* Replace with a verified headline result before launch. */}
      <div className="rounded-card absolute right-6 bottom-6 border border-white/60 bg-white/90 px-5 py-3.5 shadow-[0_20px_40px_-22px_rgba(10,10,13,0.4)] backdrop-blur-sm md:right-8 md:bottom-8">
        <div className="flex items-baseline gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="text-numeric text-[19px] font-semibold text-ink">
            +214%
          </span>
        </div>
        <div className="text-meta mt-1 text-muted">Pipeline growth</div>
      </div>
    </figure>
  );
}
