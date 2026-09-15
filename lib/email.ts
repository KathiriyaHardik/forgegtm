import "server-only";

import { CONTACT_EMAIL } from "@/lib/site";

/**
 * Lead notification email.
 *
 * Two transports, chosen by whichever credentials are present:
 *
 *   1. SMTP (`SMTP_USER` + `SMTP_PASSWORD`) — works with a plain Gmail account
 *      and an App Password, so it needs no domain of your own. This is the
 *      path in use today.
 *   2. Resend (`RESEND_API_KEY` + `LEADS_EMAIL_FROM`) — preferred once a
 *      domain is registered and verified, since a sender on your own domain
 *      authenticates properly and is far less likely to be spam-foldered.
 *
 * SMTP is tried first when configured, because a Gmail App Password is the
 * only one of the two that can work before a domain exists. Neither is
 * required: with no credentials at all the lead is still stored and only the
 * alert is skipped.
 *
 * Every function here is failure-tolerant by design: a notification that does
 * not send must never cost us a lead that was already stored.
 */

/**
 * Overridable so the notification path can be exercised locally against a mock
 * endpoint (and so the call can be routed through a proxy if ever needed).
 * Defaults to Resend; leave unset in production.
 */
const RESEND_ENDPOINT =
  process.env.RESEND_API_URL || "https://api.resend.com/emails";

export type LeadNotification = {
  name: string;
  email: string;
  company: string | null;
  website: string | null;
  jobTitle: string | null;
  budget: string | null;
  goal: string;
  message: string | null;
  submittedAt: Date;
  locale: string;
  sourcePath: string | null;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string | null, options?: { link?: string }) {
  if (!value) return "";
  const safe = escapeHtml(value);
  const content = options?.link
    ? `<a href="${escapeHtml(options.link)}" style="color:#2d5ef5;text-decoration:none">${safe}</a>`
    : safe;

  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e5e6ea;color:#62666e;font-size:13px;width:190px;vertical-align:top">${escapeHtml(label)}</td>
      <td style="padding:10px 0;border-bottom:1px solid #e5e6ea;color:#0a0a0c;font-size:14px;vertical-align:top">${content}</td>
    </tr>`;
}

function buildHtml(lead: LeadNotification) {
  const timestamp = lead.submittedAt.toLocaleString("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Berlin",
  });

  return `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f9f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">
    <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e6ea;border-radius:12px;overflow:hidden">
      <tr>
        <td style="padding:24px 28px;background:#08080a">
          <div style="color:#ffffff;font-size:16px;font-weight:600;letter-spacing:-0.3px">ForgeGTM</div>
          <div style="color:rgba(255,255,255,0.55);font-size:13px;margin-top:4px">New strategy call request</div>
        </td>
      </tr>
      <tr>
        <td style="padding:28px">
          <div style="font-size:19px;font-weight:600;color:#0a0a0c;letter-spacing:-0.3px">
            ${lead.company ? `${escapeHtml(lead.company)} &middot; ` : ""}${escapeHtml(lead.name)}
          </div>
          <div style="font-size:13px;color:#62666e;margin-top:6px">${escapeHtml(timestamp)}</div>

          <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin-top:22px;border-collapse:collapse">
            ${row("Name", lead.name)}
            ${row("Work email", lead.email, { link: `mailto:${lead.email}` })}
            ${row("Company", lead.company)}
            ${row("Website", lead.website, { link: lead.website ?? undefined })}
            ${row("Job title", lead.jobTitle)}
            ${row("Monthly budget", lead.budget)}
            ${row("Looking to improve", lead.goal)}
            ${row("Submitted", timestamp)}
            ${row("Language", lead.locale.toUpperCase())}
            ${row("Source page", lead.sourcePath)}
          </table>

          ${
            lead.message
              ? `<div style="margin-top:24px">
                   <div style="font-size:12px;text-transform:uppercase;letter-spacing:1.2px;color:#8d919a">Message</div>
                   <div style="margin-top:8px;padding:16px;background:#f9f9fa;border:1px solid #e5e6ea;border-radius:8px;font-size:14px;line-height:1.6;color:#1c1c20;white-space:pre-wrap">${escapeHtml(lead.message)}</div>
                 </div>`
              : ""
          }

          <div style="margin-top:28px">
            <a href="mailto:${escapeHtml(lead.email)}" style="display:inline-block;background:#0a0a0c;color:#ffffff;font-size:14px;font-weight:500;text-decoration:none;padding:12px 22px;border-radius:999px">Reply to ${escapeHtml(lead.name)}</a>
          </div>
        </td>
      </tr>
    </table>
    <div style="max-width:640px;margin:14px auto 0;color:#8d919a;font-size:12px;text-align:center">
      Sent automatically by the ForgeGTM website.
    </div>
  </body>
</html>`;
}

function buildText(lead: LeadNotification) {
  const lines = [
    `New ForgeGTM strategy call request`,
    ``,
    `Name:        ${lead.name}`,
    `Work email:  ${lead.email}`,
    `Company:     ${lead.company ?? "—"}`,
    `Website:     ${lead.website ?? "—"}`,
    `Job title:   ${lead.jobTitle ?? "—"}`,
    `Budget:      ${lead.budget ?? "—"}`,
    `Improve:     ${lead.goal}`,
    `Submitted:   ${lead.submittedAt.toISOString()}`,
    `Language:    ${lead.locale.toUpperCase()}`,
    `Source page: ${lead.sourcePath ?? "—"}`,
  ];

  if (lead.message) lines.push("", "Message:", lead.message);

  return lines.join("\n");
}

/**
 * Copy for the prospect-facing confirmation, in the language they used.
 *
 * Kept here rather than in `lib/i18n` on purpose: the site dictionaries are
 * serialised into the page payload for the browser, and email copy no visitor
 * will ever render on-page has no business being shipped there.
 */
const CONFIRMATION_COPY = {
  en: {
    subject: "We've received your strategy call request — ForgeGTM",
    preheader: "Thanks for getting in touch. Here's what happens next.",
    greeting: (name: string) => `Hi ${name},`,
    thanks:
      "Thanks for reaching out to ForgeGTM. Your strategy call request has been received.",
    next: "What happens next",
    nextBody:
      "A member of our team will review what you've told us and reply within one business day to arrange a time. We'll come to that call having already looked at your market — so it's a working session, not a pitch.",
    summaryTitle: "What you sent us",
    labels: {
      company: "Company",
      website: "Website",
      jobTitle: "Job title",
      budget: "Monthly budget",
      goal: "Looking to improve",
      message: "Your message",
    },
    questions: "If anything changes in the meantime, just reply to this email.",
    signoff: "— The ForgeGTM team",
    footer: "You're receiving this because you requested a strategy call at forgegtm.com.",
  },
  de: {
    subject: "Ihre Anfrage für ein Strategiegespräch ist eingegangen — ForgeGTM",
    preheader: "Vielen Dank für Ihre Nachricht. So geht es weiter.",
    greeting: (name: string) => `Guten Tag ${name},`,
    thanks:
      "vielen Dank für Ihre Anfrage bei ForgeGTM. Ihre Anfrage für ein Strategiegespräch ist bei uns eingegangen.",
    next: "Wie es weitergeht",
    nextBody:
      "Ein Mitglied unseres Teams sieht sich Ihre Angaben an und meldet sich innerhalb eines Werktags zur Terminabstimmung. Wir kommen vorbereitet in dieses Gespräch — es ist eine Arbeitssitzung, kein Verkaufstermin.",
    summaryTitle: "Ihre Angaben",
    labels: {
      company: "Unternehmen",
      website: "Website",
      jobTitle: "Position",
      budget: "Monatliches Budget",
      goal: "Gewünschte Verbesserung",
      message: "Ihre Nachricht",
    },
    questions:
      "Sollte sich zwischenzeitlich etwas ändern, antworten Sie einfach auf diese E-Mail.",
    signoff: "— Ihr ForgeGTM-Team",
    footer:
      "Sie erhalten diese E-Mail, weil Sie auf forgegtm.com ein Strategiegespräch angefragt haben.",
  },
} as const;

function buildConfirmationHtml(lead: LeadNotification) {
  const t =
    CONFIRMATION_COPY[lead.locale === "de" ? "de" : "en"];
  const L = t.labels;

  return `<!doctype html>
<html lang="${lead.locale === "de" ? "de" : "en"}">
  <body style="margin:0;padding:24px;background:#f9f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">
    <!-- Preheader: shown in the inbox preview, hidden in the body. -->
    <div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(t.preheader)}</div>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e6ea;border-radius:12px;overflow:hidden">
      <tr>
        <td style="padding:24px 28px;background:#08080a">
          <div style="color:#ffffff;font-size:17px;font-weight:600;letter-spacing:-0.3px">ForgeGTM</div>
        </td>
      </tr>
      <tr>
        <td style="padding:32px 28px">
          <div style="font-size:20px;font-weight:600;color:#0a0a0c;letter-spacing:-0.3px">
            ${escapeHtml(t.greeting(lead.name.split(" ")[0] || lead.name))}
          </div>

          <p style="margin:16px 0 0;font-size:15px;line-height:1.65;color:#1c1c20">
            ${escapeHtml(t.thanks)}
          </p>

          <div style="margin-top:28px;padding-top:24px;border-top:1px solid #e5e6ea">
            <div style="font-size:12px;text-transform:uppercase;letter-spacing:1.2px;color:#8d919a">${escapeHtml(t.next)}</div>
            <p style="margin:10px 0 0;font-size:15px;line-height:1.65;color:#1c1c20">
              ${escapeHtml(t.nextBody)}
            </p>
          </div>

          <div style="margin-top:28px;padding:18px 20px;background:#f9f9fa;border:1px solid #e5e6ea;border-radius:8px">
            <div style="font-size:12px;text-transform:uppercase;letter-spacing:1.2px;color:#8d919a">${escapeHtml(t.summaryTitle)}</div>
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:12px;border-collapse:collapse">
              ${row(L.company, lead.company)}
              ${row(L.website, lead.website)}
              ${row(L.jobTitle, lead.jobTitle)}
              ${row(L.budget, lead.budget)}
              ${row(L.goal, lead.goal)}
              ${row(L.message, lead.message)}
            </table>
          </div>

          <p style="margin:26px 0 0;font-size:14px;line-height:1.65;color:#62666e">
            ${escapeHtml(t.questions)}
          </p>

          <p style="margin:22px 0 0;font-size:15px;color:#0a0a0c">${escapeHtml(t.signoff)}</p>
        </td>
      </tr>
    </table>

    <div style="max-width:600px;margin:14px auto 0;color:#8d919a;font-size:12px;text-align:center;line-height:1.5">
      ${escapeHtml(t.footer)}
    </div>
  </body>
</html>`;
}

function buildConfirmationText(lead: LeadNotification) {
  const t = CONFIRMATION_COPY[lead.locale === "de" ? "de" : "en"];
  const L = t.labels;

  const lines = [
    t.greeting(lead.name.split(" ")[0] || lead.name),
    "",
    t.thanks,
    "",
    t.next.toUpperCase(),
    t.nextBody,
    "",
    t.summaryTitle.toUpperCase(),
    `${L.company}: ${lead.company}`,
  ];

  if (lead.website) lines.push(`${L.website}: ${lead.website}`);
  if (lead.jobTitle) lines.push(`${L.jobTitle}: ${lead.jobTitle}`);
  if (lead.budget) lines.push(`${L.budget}: ${lead.budget}`);
  lines.push(`${L.goal}: ${lead.goal}`);
  if (lead.message) lines.push("", `${L.message}:`, lead.message);

  lines.push("", t.questions, "", t.signoff, "", t.footer);
  return lines.join("\n");
}

/**
 * Confirmation to the prospect, in the language they submitted in.
 *
 * Returns whether the provider accepted it. Like the internal alert this never
 * throws — the lead is already stored by the time it runs, and a confirmation
 * that fails to send must not cost us the lead or show the visitor an error.
 * It does, however, have to be reported honestly rather than assumed: the
 * caller uses the result to decide what the success panel is allowed to claim.
 */
export async function sendProspectConfirmation(
  lead: LeadNotification
): Promise<boolean> {
  const t = CONFIRMATION_COPY[lead.locale === "de" ? "de" : "en"];

  const message = {
    to: lead.email,
    subject: t.subject,
    html: buildConfirmationHtml(lead),
    text: buildConfirmationText(lead),
    // Replies go to the shared contact inbox, not to the prospect themselves.
    replyTo: process.env.LEADS_EMAIL_TO || CONTACT_EMAIL,
  };

  if (process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
    return sendViaSmtp(message);
  }

  if (process.env.RESEND_API_KEY && process.env.LEADS_EMAIL_FROM) {
    return sendViaResend(message);
  }

  console.warn(
    "[confirmation-email] No email transport configured — prospect " +
      "confirmation NOT sent. See README.md."
  );
  return false;
}

/**
 * Sends the lead alert. Returns whether it was delivered; never throws, so a
 * provider outage cannot turn a stored lead into a failed submission.
 */
export async function sendLeadNotification(
  lead: LeadNotification
): Promise<boolean> {
  const to = process.env.LEADS_EMAIL_TO || CONTACT_EMAIL;
  const subject = `New Strategy Call Request — ${lead.name}`;

  const message = {
    to,
    subject,
    html: buildHtml(lead),
    text: buildText(lead),
    // So hitting reply in the alert writes to the prospect, not to us.
    replyTo: lead.email,
  };

  if (process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
    return sendViaSmtp(message);
  }

  if (process.env.RESEND_API_KEY && process.env.LEADS_EMAIL_FROM) {
    return sendViaResend(message);
  }

  console.warn(
    "[lead-email] No email transport configured — lead stored, but no " +
      "notification sent. Set SMTP_USER + SMTP_PASSWORD (Gmail App Password), " +
      "or RESEND_API_KEY + LEADS_EMAIL_FROM. See README.md."
  );
  return false;
}

type OutgoingMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo: string;
};

/**
 * Gmail (or any SMTP host) via an App Password.
 *
 * The envelope sender has to be the authenticated mailbox — Gmail rewrites a
 * mismatched `From` anyway, and forging one is what gets mail rejected. So the
 * display name is ours while the address stays the account's own.
 */
async function sendViaSmtp(message: OutgoingMessage): Promise<boolean> {
  const user = process.env.SMTP_USER!;
  const pass = process.env.SMTP_PASSWORD!;
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 465);

  try {
    // Imported lazily so the SMTP client is never pulled into a build that
    // does not use it.
    const nodemailer = (await import("nodemailer")).default;

    const transport = nodemailer.createTransport({
      host,
      port,
      // 465 is implicit TLS; 587 upgrades with STARTTLS.
      secure: port === 465,
      auth: { user, pass },
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 10000,
    });

    await transport.sendMail({
      from: `"ForgeGTM Website" <${user}>`,
      to: message.to,
      replyTo: message.replyTo,
      subject: message.subject,
      html: message.html,
      text: message.text,
    });

    return true;
  } catch (error) {
    const hint =
      error instanceof Error && /invalid login|username and password/i.test(error.message)
        ? " — check SMTP_PASSWORD is a 16-character Google App Password, not the account password"
        : "";
    console.error(`[lead-email] SMTP send failed${hint}:`, error);
    return false;
  }
}

/** Resend's HTTP API, via plain fetch rather than pulling in their SDK. */
async function sendViaResend(message: OutgoingMessage): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY!;
  const from = process.env.LEADS_EMAIL_FROM!;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [message.to],
        reply_to: message.replyTo,
        subject: message.subject,
        html: message.html,
        text: message.text,
      }),
      // Never let a hanging provider block the visitor's response.
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      console.error(
        `[lead-email] Resend rejected the message (${response.status}):`,
        await response.text().catch(() => "<no body>")
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("[lead-email] Resend send failed:", error);
    return false;
  }
}
