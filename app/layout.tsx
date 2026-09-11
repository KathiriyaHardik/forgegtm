import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const title = "ForgeGTM — Revenue growth engineered for the modern market";
const description =
  "ForgeGTM builds predictable revenue engines for ambitious B2B companies: GTM strategy, positioning, outbound execution and the sales systems that connect them.";

// Update metadataBase and the social handles once the production domain is live.
export const metadata: Metadata = {
  metadataBase: new URL("https://forgegtm.com"),
  title: {
    default: title,
    template: "%s | ForgeGTM",
  },
  description,
  applicationName: "ForgeGTM",
  keywords: [
    "go-to-market agency",
    "B2B outbound",
    "GTM strategy",
    "revenue operations",
    "sales systems",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
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
  robots: { index: true, follow: true },
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
