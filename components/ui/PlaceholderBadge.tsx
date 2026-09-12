/**
 * Marks demo content as illustrative on the page itself, not just in a code
 * comment. Case studies and testimonials on this site use fictional companies
 * and figures; this badge is what keeps that honest for a reader.
 *
 * Delete the badge only when the content it labels is real and approved.
 */
export function PlaceholderBadge({
  tone = "light",
  children = "Illustrative example",
}: {
  tone?: "light" | "dark";
  children?: string;
}) {
  return (
    <span
      className={`text-eyebrow inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${
        tone === "dark"
          ? "border-white/15 text-white/45"
          : "border-border text-muted-soft"
      }`}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {children}
    </span>
  );
}
