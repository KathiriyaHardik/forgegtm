import { ImageResponse } from "next/og";

export const alt =
  "ForgeGTM — qualified pipeline, built on outbound systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card, generated at build time by next/og — no design asset to
 * keep in sync and no extra dependency. Mirrors the site's palette.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08080a",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        {/* Ambient glow, matching the site's dark sections */}
        <div
          style={{
            position: "absolute",
            top: -260,
            left: 300,
            width: 820,
            height: 620,
            background:
              "radial-gradient(closest-side, rgba(45,94,245,0.35), rgba(45,94,245,0))",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 5,
              width: 44,
              height: 44,
              background: "#ffffff",
              borderRadius: 12,
              padding: "0 10px",
            }}
          >
            <div style={{ width: 24, height: 5, background: "#08080a" }} />
            <div style={{ width: 16, height: 5, background: "#08080a" }} />
            <div style={{ width: 9, height: 5, background: "#2d5ef5" }} />
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: -0.5,
            }}
          >
            ForgeGTM
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 68,
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: -2.5,
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            <span>Qualified pipeline, built on&nbsp;</span>
            <span style={{ color: "#4f79ff" }}>outbound systems.</span>
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 27,
              color: "rgba(255,255,255,0.55)",
              maxWidth: 820,
              lineHeight: 1.4,
            }}
          >
            Targeting, email infrastructure, messaging and campaigns — built
            and run by one accountable team.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 28,
            fontSize: 21,
            color: "rgba(255,255,255,0.4)",
          }}
        >
          <div style={{ display: "flex" }}>B2B SaaS &amp; technology</div>
          <div style={{ display: "flex" }}>·</div>
          <div style={{ display: "flex" }}>Series A–C</div>
          <div style={{ display: "flex" }}>·</div>
          <div style={{ display: "flex" }}>DACH, UK &amp; Nordics</div>
        </div>
      </div>
    ),
    size
  );
}
