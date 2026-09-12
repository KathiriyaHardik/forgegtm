"use server";

import { headers } from "next/headers";
import {
  DatabaseNotConfiguredError,
  insertStrategyCall,
} from "@/lib/db";
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
 * reports success unless a row was actually written.
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

  const fields = readStrategyCallFields(formData);
  const errors = validateStrategyCall(fields);

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      errors,
    };
  }

  try {
    await insertStrategyCall({
      name: fields.name.trim(),
      email: fields.email.trim().toLowerCase(),
      company: fields.company.trim(),
      website: fields.website.trim() ? normaliseWebsite(fields.website) : null,
      jobTitle: fields.jobTitle.trim() || null,
      budget: fields.budget || null,
      goal: fields.goal,
      message: fields.message.trim() || null,
      sourcePath: await readSourcePath(),
    });
  } catch (error) {
    if (error instanceof DatabaseNotConfiguredError) {
      console.error(
        "[strategy-call] DATABASE_URL is not set — the submission was NOT stored. " +
          "See README.md for setup."
      );
      return {
        status: "error",
        message:
          "We couldn't submit the form right now. Please email hello@forgegtm.com and we'll pick it up straight away.",
      };
    }

    // Log server-side for diagnosis; never surface driver internals to the browser.
    console.error("[strategy-call] failed to store submission:", error);
    return {
      status: "error",
      message:
        "Something went wrong on our end. Please try again, or email hello@forgegtm.com.",
    };
  }

  return { status: "success" };
}
