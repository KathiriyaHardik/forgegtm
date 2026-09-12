/**
 * Shape and validation for the "Book a Strategy Call" form.
 *
 * Kept free of server-only imports so the exact same rules run in the browser
 * (instant feedback) and on the server (the boundary that actually matters —
 * a Server Action is reachable by direct POST, so client validation is a
 * convenience, never a guarantee).
 */

export type StrategyCallFields = {
  name: string;
  email: string;
  company: string;
  website: string;
  jobTitle: string;
  budget: string;
  goal: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof StrategyCallFields, string>>;

export const GOAL_OPTIONS = [
  "Build an outbound system from scratch",
  "Fix deliverability and email infrastructure",
  "Sharpen ICP and targeting",
  "Improve reply and conversion rates",
  "Scale an existing outbound motion",
  "Something else",
] as const;

export const BUDGET_OPTIONS = [
  "Under €5k / month",
  "€5k – €10k / month",
  "€10k – €25k / month",
  "€25k+ / month",
  "Not sure yet",
] as const;

/** Length caps mirror the column widths in db/schema.sql. */
const MAX = {
  name: 120,
  email: 200,
  company: 160,
  website: 200,
  jobTitle: 120,
  budget: 60,
  goal: 120,
  message: 4000,
} as const;

// Deliberately permissive: the only reliable proof an address works is a
// delivered email, so reject shapes that cannot be addresses and nothing more.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "gmx.de",
  "web.de",
]);

export function isFreeEmailDomain(email: string) {
  const domain = email.split("@")[1]?.toLowerCase().trim();
  return domain ? FREE_EMAIL_DOMAINS.has(domain) : false;
}

/**
 * Normalises a user-entered website into a URL with a scheme, since people
 * type "acme.com" far more often than "https://acme.com".
 */
export function normaliseWebsite(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function validateStrategyCall(fields: StrategyCallFields): FieldErrors {
  const errors: FieldErrors = {};

  const name = fields.name.trim();
  if (!name) errors.name = "Please tell us your name.";
  else if (name.length > MAX.name) errors.name = "That name is too long.";

  const email = fields.email.trim();
  if (!email) {
    errors.email = "A work email is required.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "That doesn't look like a valid email address.";
  } else if (email.length > MAX.email) {
    errors.email = "That email address is too long.";
  }

  const company = fields.company.trim();
  if (!company) errors.company = "Please add your company name.";
  else if (company.length > MAX.company) errors.company = "That name is too long.";

  const website = fields.website.trim();
  if (website) {
    if (website.length > MAX.website) {
      errors.website = "That URL is too long.";
    } else {
      try {
        const url = new URL(normaliseWebsite(website));
        if (!url.hostname.includes(".")) {
          errors.website = "Please enter a full domain, e.g. acme.com";
        }
      } catch {
        errors.website = "Please enter a valid URL, e.g. acme.com";
      }
    }
  }

  if (fields.jobTitle.trim().length > MAX.jobTitle) {
    errors.jobTitle = "That job title is too long.";
  }

  if (fields.budget && !BUDGET_OPTIONS.includes(fields.budget as never)) {
    errors.budget = "Please choose one of the listed options.";
  }

  if (!fields.goal.trim()) {
    errors.goal = "Let us know what you'd like to improve.";
  } else if (!GOAL_OPTIONS.includes(fields.goal as never)) {
    errors.goal = "Please choose one of the listed options.";
  }

  const message = fields.message.trim();
  if (message.length > MAX.message) {
    errors.message = "Please keep this under 4,000 characters.";
  }

  return errors;
}

export function readStrategyCallFields(formData: FormData): StrategyCallFields {
  const read = (key: keyof StrategyCallFields) => {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
  };

  return {
    name: read("name"),
    email: read("email"),
    company: read("company"),
    website: read("website"),
    jobTitle: read("jobTitle"),
    budget: read("budget"),
    goal: read("goal"),
    message: read("message"),
  };
}

/**
 * Result of a submission attempt. Lives here rather than in the Server Action
 * module because a "use server" file may only export async functions.
 */
export type StrategyCallState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: FieldErrors;
};

export const initialStrategyCallState: StrategyCallState = { status: "idle" };
