import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const title = "ForgeGTM — Qualified pipeline, built on outbound systems";
const description =
  "ForgeGTM is a B2B go-to-market and outbound agency. We build and run targeting, email infrastructure, messaging and campaigns that generate qualified pipeline.";

// Point metadataBase at the production domain before launch — Open Graph and
// canonical URLs are resolved against it.
export const metadata: Metadata = {
  metadataBase: new URL("https://forgegtm.com"),
  title: {
    default: title,
    template: "%s | ForgeGTM",
  },
  description,
  applicationName: "ForgeGTM",
  keywords: [
    "B2B outbound agency",
    "go-to-market agency",
    "lead generation",
    "email deliverability",
    "pipeline generation",
    "ICP targeting",
    "cold email infrastructure",
  ],
  authors: [{ name: "ForgeGTM" }],
  creator: "ForgeGTM",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "ForgeGTM",
    url: "/",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-surface text-ink">
        <a
          href="#main"
          className="sr-only rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-white focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
