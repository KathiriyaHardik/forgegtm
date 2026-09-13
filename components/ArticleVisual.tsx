import type { CategoryKey } from "@/content/insights";

/**
 * Abstract editorial panel for Insights articles.
 *
 * Deliberately geometric rather than photographic: stock imagery of people at
 * laptops dates badly and says nothing, and the alternative most B2B sites
 * reach for — abstract AI/robot art — says less. Each motif is a literal
 * diagram of what its category is about, so the visual carries some meaning
 * even at thumbnail size.
 *
 * The motif is derived from the article's category, so every article gets a
 * visual automatically and articles in one category read as a set. Swap this
 * for <Image> if commissioned illustration ever replaces it — keep the radius
 * and the dark ground so the page composition holds.
 */

type Motif = "funnel" | "signal" | "matrix" | "bars";

/** Each category maps to the motif that actually depicts it. */
const MOTIF_BY_CATEGORY: Record<CategoryKey, Motif> = {
  "go-to-market": "bars",
  outbound: "funnel",
  "lead-generation": "funnel",
  "cold-email": "signal",
  deliverability: "signal",
  "icp-targeting": "matrix",
  "sales-strategy": "bars",
  "buying-signals": "signal",
};

const ACCENT = "rgba(45,94,245,0.9)";
const HAIRLINE = "rgba(255,255,255,0.14)";

function Motif({ motif }: { motif: Motif }) {
  if (motif === "funnel") {
    // Wide top, narrow bottom: a list being qualified down to what matters.
    return (
      <>
        {[0, 1, 2, 3, 4].map((i) => {
          const inset = i * 34;
          return (
            <path
              key={i}
              d={`M${40 + inset} 40 L${360 - inset} 40 L${300 - inset * 0.55} 260 L${100 + inset * 0.55} 260 Z`}
              fill="none"
              stroke={i === 4 ? ACCENT : HAIRLINE}
              strokeWidth={i === 4 ? 2 : 1}
            />
          );
        })}
      </>
    );
  }

  if (motif === "signal") {
    // A flat baseline broken by one spike — the moment worth acting on.
    return (
      <>
        {[80, 130, 180, 230].map((y) => (
          <line key={y} x1="30" y1={y} x2="370" y2={y} stroke={HAIRLINE} strokeWidth="1" />
        ))}
        <path
          d="M30 205 L110 205 L138 205 L160 96 L182 205 L240 205 L268 168 L292 205 L370 205"
          fill="none"
          stroke={ACCENT}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <circle cx="160" cy="96" r="5" fill={ACCENT} />
      </>
    );
  }

  if (motif === "matrix") {
    // A grid of accounts with one cluster selected: segmentation, not volume.
    const cols = 11;
    const rows = 7;
    const picked = new Set(["4-2", "5-2", "4-3", "5-3", "6-3", "5-4"]);
    return (
      <>
        {Array.from({ length: rows }, (_, r) =>
          Array.from({ length: cols }, (_, c) => {
            const key = `${c}-${r}`;
            const on = picked.has(key);
            return (
              <circle
                key={key}
                cx={46 + c * 31}
                cy={58 + r * 31}
                r={on ? 5.5 : 2.5}
                fill={on ? ACCENT : "rgba(255,255,255,0.22)"}
              />
            );
          })
        )}
      </>
    );
  }

  // bars — a trend built from a low base, the last column carrying the accent.
  const heights = [46, 62, 58, 88, 104, 96, 132, 168];
  return (
    <>
      <line x1="34" y1="252" x2="366" y2="252" stroke={HAIRLINE} strokeWidth="1" />
      {heights.map((h, i) => (
        <rect
          key={i}
          x={48 + i * 40}
          y={252 - h}
          width="22"
          height={h}
          rx="3"
          fill={i === heights.length - 1 ? ACCENT : "rgba(255,255,255,0.17)"}
        />
      ))}
    </>
  );
}

export function ArticleVisual({
  category,
  className = "",
}: {
  category: CategoryKey;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-card border border-border bg-[linear-gradient(145deg,#2c313b_0%,#171a20_55%,#0d0f13_100%)] ${className}`}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 26% 22%, rgba(255,255,255,0.16), transparent 58%)",
        }}
      />

      <svg
        aria-hidden
        viewBox="0 0 400 300"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <Motif motif={MOTIF_BY_CATEGORY[category]} />
      </svg>

      {/* Same grain as CaseVisual, so the two read as one family. */}
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
