/**
 * Canonical origin for the site.
 *
 * Absolute URLs are needed in a handful of places that a relative path cannot
 * serve: `metadataBase`, the sitemap, robots.txt and JSON-LD `@id`s. Keeping
 * them on one constant means changing domain is a single edit (or a single
 * environment variable) rather than a grep.
 *
 * Set `NEXT_PUBLIC_SITE_URL` on preview deployments so canonical tags and the
 * sitemap point at the deployment being previewed instead of production.
 */
const FALLBACK_SITE_URL = "https://forgegtm.com";

/** No trailing slash, so `${SITE_URL}${path}` is always well-formed. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL
).replace(/\/+$/, "");

/** Turns a root-relative path ("/en/insights") into an absolute URL. */
export function absoluteUrl(path = "") {
  return `${SITE_URL}${path}`;
}

/**
 * Public contact address, shown in the footer and offered as the fallback
 * whenever the strategy-call form cannot go through.
 *
 * Kept here rather than inline so the address exists once. The dictionaries
 * reference it with an `{email}` placeholder instead of embedding a copy per
 * language — otherwise changing it means editing every translation.
 */
export const CONTACT_EMAIL = "connect.forgegtm@gmail.com";

/** Substitutes `{email}` in a dictionary string with the contact address. */
export function withContactEmail(text: string) {
  return text.replaceAll("{email}", CONTACT_EMAIL);
}
