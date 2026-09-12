"use server";

import { headers } from "next/headers";
import { DatabaseNotConfiguredError, insertStrategyCall } from "@/lib/db";
import { sendLeadNotification } from "@/lib/email";
import { getDictionary } from "@/lib/i18n";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n/config";
import {
  normaliseWebsite,
  readStrategyCallFields,
  type StrategyCallState,
  validateStrategyCall,
} from "@/lib/strategy-call";

/** Which page the request came from, taken from the referer for attribution. */
async function readSourcePath() {
  const referer = (await headers()).get("referer");
  if (!referer) return null;
  try {
    return new URL(referer).pathname.slice(0, 200);
  } catch {
    return null;
  }
}

/**
 * Handles a strategy-call request.
 *
 * Server Actions are reachable by direct POST, so this re-runs the full
 * validation regardless of what the browser already checked, and never
 * reports success unless a row was actually written. The lead alert is sent
 * after storage and cannot fail the submission.
 */
export async function submitStrategyCall(
  _previous: StrategyCallState,
  formData: FormData
): Promise<StrategyCallState> {
  // Honeypot: a field hidden from humans. Anything that fills it is a bot, so
  // return the success shape without storing, rather than revealing the check.
  if ((formData.get("company_website_confirm") as string)?.trim()) {
    return { status: "success" };
  }

  const rawLocale = (formData.get("locale") as string) || DEFAULT_LOCALE;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const t = getDictionary(locale);

  const fields = readStrategyCallFields(formData);
  const errors = validateStrategyCall(fields, {
    budgetOptions: t.contact.form.budgetOptions,
    goalOptions: t.contact.form.goalOptions,
  });

  if (Object.keys(errors).length > 0) {
    return { status: "error", messageKey: "summary", errors };
  }

  const record = {
    name: fields.name.trim(),
    email: fields.email.trim().toLowerCase(),
    company: fields.company.trim(),
    website: fields.website.trim() ? normaliseWebsite(fields.website) : null,
    jobTitle: fields.jobTitle.trim() || null,
    budget: fields.budget || null,
    goal: fields.goal,
    message: fields.message.trim() || null,
    sourcePath: await readSourcePath(),
    locale,
  };

  try {
    await insertStrategyCall(record);
  } catch (error) {
    if (error instanceof DatabaseNotConfiguredError) {
      console.error(
        "[strategy-call] DATABASE_URL is not set — the submission was NOT stored. " +
          "See README.md for setup."
      );
      return { status: "error", messageKey: "notConfigured" };
    }

    // Log server-side for diagnosis; never surface driver internals to the browser.
    console.error("[strategy-call] failed to store submission:", error);
    return { status: "error", messageKey: "unexpected" };
  }

  // The lead is safely stored by this point. A failed notification is logged
  // and swallowed — we do not ask the visitor to submit again over it.
  await sendLeadNotification({ ...record, submittedAt: new Date() });

  return { status: "success" };
}
