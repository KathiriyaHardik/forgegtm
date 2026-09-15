/**
 * Shape and validation for the "Book a Strategy Call" form.
 *
 * Free of server-only imports so the exact same rules run in the browser
 * (instant feedback) and on the server (the boundary that actually matters —
 * a Server Action is reachable by direct POST, so client validation is a
 * convenience, never a guarantee).
 *
 * Validation returns error *keys*, not sentences, so the same result can be
 * rendered in any locale.
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

export type ErrorKey =
  | "name"
  | "nameLong"
  | "emailRequired"
  | "emailInvalid"
  | "emailLong"
  | "company"
  | "companyLong"
  | "websiteInvalid"
  | "websiteDomain"
  | "websiteLong"
  | "jobTitleLong"
  | "optionInvalid"
  | "goalRequired"
  | "goalLong"
  | "messageLong";

export type FieldErrors = Partial<Record<keyof StrategyCallFields, ErrorKey>>;

/** Length caps mirror the column widths in db/schema.sql. */
const MAX = {
  name: 120,
  email: 200,
  company: 160,
  website: 200,
  jobTitle: 120,
  goal: 4000,
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

export function validateStrategyCall(
  fields: StrategyCallFields,
  options: { budgetOptions: readonly string[] }
): FieldErrors {
  const errors: FieldErrors = {};

  const name = fields.name.trim();
  if (!name) errors.name = "name";
  else if (name.length > MAX.name) errors.name = "nameLong";

  const email = fields.email.trim();
  if (!email) errors.email = "emailRequired";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "emailInvalid";
  else if (email.length > MAX.email) errors.email = "emailLong";

  // Optional on the modal form. Still length-checked, because a direct POST
  // can send anything and the column is varchar(160).
  const company = fields.company.trim();
  if (company.length > MAX.company) errors.company = "companyLong";

  const website = fields.website.trim();
  if (website) {
    if (website.length > MAX.website) {
      errors.website = "websiteLong";
    } else {
      try {
        const url = new URL(normaliseWebsite(website));
        if (!url.hostname.includes(".")) errors.website = "websiteDomain";
      } catch {
        errors.website = "websiteInvalid";
      }
    }
  }

  if (fields.jobTitle.trim().length > MAX.jobTitle) {
    errors.jobTitle = "jobTitleLong";
  }

  if (fields.budget && !options.budgetOptions.includes(fields.budget)) {
    errors.budget = "optionInvalid";
  }

  // Free prose now, not one of a fixed set: the form asks what the visitor is
  // trying to grow, and the useful answers do not fit a dropdown.
  const goal = fields.goal.trim();
  if (!goal) errors.goal = "goalRequired";
  else if (goal.length > MAX.goal) errors.goal = "goalLong";

  if (fields.message.trim().length > MAX.message) errors.message = "messageLong";

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
  /** Key into the dictionary's contact.form.errors, for a locale-safe message. */
  messageKey?: "summary" | "notConfigured" | "unexpected";
  /**
   * Whether the prospect's confirmation email was actually accepted by the
   * provider. Undefined until a submission succeeds. The success panel uses
   * it so it never promises an email that failed to send.
   */
  confirmationSent?: boolean;
  errors?: FieldErrors;
};

export const initialStrategyCallState: StrategyCallState = { status: "idle" };
