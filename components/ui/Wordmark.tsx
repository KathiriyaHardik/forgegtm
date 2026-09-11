/**
 * ForgeGTM logomark + wordmark. Single source of truth for the brand lockup —
 * swap the <svg> here when a final logo asset exists.
 */
export function Wordmark({ tone = "light" }: { tone?: "light" | "dark" }) {
  const isDark = tone === "dark";

  return (
    <span className="inline-flex items-center gap-2.5">
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <rect
          width="22"
          height="22"
          rx="6"
          fill={isDark ? "#ffffff" : "#0a0a0c"}
        />
        <path
          d="M6.5 6.25h9.25v2.4H6.5z"
          fill={isDark ? "#0a0a0c" : "#ffffff"}
        />
        <path
          d="M6.5 10.3h6.1v2.4H6.5z"
          fill={isDark ? "#0a0a0c" : "#ffffff"}
        />
        <path d="M6.5 14.35h3.6v2.4H6.5z" fill="#2d5ef5" />
      </svg>
      <span
        className={`text-[15px] font-semibold tracking-[-0.02em] ${
          isDark ? "text-white" : "text-ink"
        }`}
      >
        ForgeGTM
      </span>
    </span>
  );
}
