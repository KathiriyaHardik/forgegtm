"use server";

import { headers } from "next/headers";
import {
  DatabaseNotConfiguredError,
  insertStrategyCall,
  markLeadEmailsSent,
} from "@/lib/db";
import { sendLeadNotification, sendProspectConfirmation } from "@/lib/email";
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

  let leadId: string;
  try {
    leadId = await insertStrategyCall(record);
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

  // The lead is safely stored by this point, so the visitor sees success
  // regardless of what the email provider does next.
  const lead = { ...record, submittedAt: new Date() };

  // Both emails are sent, and neither can take down the other: allSettled means
  // a thrown error in one is still isolated from the other's result. They are
  // independent deliveries to different recipients, so they run concurrently
  // rather than making the visitor wait for two round trips in series.
  const [notifiedResult, confirmedResult] = await Promise.allSettled([
    sendLeadNotification(lead),
    sendProspectConfirmation(lead),
  ]);

  const notified = notifiedResult.status === "fulfilled" && notifiedResult.value;
  const confirmed =
    confirmedResult.status === "fulfilled" && confirmedResult.value;

  // Recorded per-email, so a partial failure is visible in the dashboard and
  // recoverable by query rather than lost in the logs.
  await markLeadEmailsSent(leadId, { notified, confirmed });

  if (!notified) {
    console.warn(
      `[strategy-call] lead ${leadId} stored but internal alert NOT sent. ` +
        "Recover with: select * from strategy_call_requests where notified_at is null;"
    );
  }
  if (!confirmed) {
    console.warn(
      `[strategy-call] lead ${leadId} stored but prospect confirmation NOT sent ` +
        `to ${record.email}. The success panel will not claim one was sent.`
    );
  }

  // Reported back so the confirmation panel can tell the truth about whether
  // an email is actually on its way. Never claim a delivery that did not happen.
  return { status: "success", confirmationSent: confirmed };
}
