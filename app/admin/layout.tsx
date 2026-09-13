import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Leads · ForgeGTM",
  // Internal tooling: keep it out of search results even if the URL leaks.
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Root layout for the admin area.
 *
 * Separate from the localised site's layout because the dashboard is internal,
 * English-only, and must not inherit the marketing chrome (nav, footer, locale
 * switching) or the marketing metadata.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-surface-2 text-ink">{children}</body>
    </html>
  );
}
