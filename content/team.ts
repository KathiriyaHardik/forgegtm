import type { Locale } from "@/lib/i18n/config";

/**
 * Founder / team content.
 *
 * ⚠️ PLACEHOLDER CONTENT — every `role` and `bio` below is filler, and the
 * `placeholder: true` flag makes the page say so on screen. Nothing here is a
 * claim about a real person's background.
 *
 * To make this real:
 *   1. Replace `role` and `bio` for each locale with true information.
 *   2. Add a photo to /public and set `photo` (e.g. "/team/hardik.jpg").
 *      Leave it null and an initials avatar is drawn instead — that is a
 *      deliberate design, not a broken image.
 *   3. Set `linkedin` to a real profile URL, or leave it null to hide the link.
 *   4. Set `placeholder: false`. That removes the on-page notice.
 *
 * Step 4 is the important one: while it is true, the page tells visitors the
 * bio is not yet written, so an unfinished profile can never read as a real
 * claim about someone's experience.
 */

export type TeamMember = {
  /** Stable key for React lists. */
  id: string;
  name: string;
  /** Localised, because job titles do not translate mechanically. */
  role: Record<Locale, string>;
  bio: Record<Locale, string>;
  /** Path under /public, or null for an initials avatar. */
  photo: string | null;
  linkedin: string | null;
  /** True while `role`/`bio` are still filler. Drives the on-page notice. */
  placeholder: boolean;
};

export const TEAM: TeamMember[] = [
  {
    id: "founder",
    // Taken from the repository's git identity — replace if it should differ.
    name: "Hardik Kathiriya",
    role: {
      en: "Founder",
      de: "Gründer",
    },
    bio: {
      en: "This paragraph is placeholder text. Replace it with a real background — where the outbound experience comes from, the kind of companies worked with, and why ForgeGTM exists. Two to four sentences is the right length: enough to establish credibility, short enough to be read.",
      de: "Dieser Absatz ist ein Platzhalter. Ersetzen Sie ihn durch einen echten Werdegang — woher die Outbound-Erfahrung stammt, mit welchen Unternehmen gearbeitet wurde und warum es ForgeGTM gibt. Zwei bis vier Sätze sind die richtige Länge: genug für Glaubwürdigkeit, kurz genug, um gelesen zu werden.",
    },
    photo: null,
    linkedin: null,
    placeholder: true,
  },
];

/** Initials for the avatar fallback, e.g. "Hardik Kathiriya" -> "HK". */
export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
