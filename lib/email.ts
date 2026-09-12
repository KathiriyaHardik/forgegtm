import "server-only";

/**
 * Lead notification email.
 *
 * Talks to the Resend HTTP API with plain fetch rather than pulling in an SDK.
 * Swapping provider means changing `sendEmail` only — Postmark, SendGrid and
 * Mailgun all expose an equivalent JSON endpoint.
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
  company: string;
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
            ${escapeHtml(lead.company)} &middot; ${escapeHtml(lead.name)}
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
    `Company:     ${lead.company}`,
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
 * Sends the lead alert. Returns whether it was delivered; never throws, so a
 * provider outage cannot turn a stored lead into a failed submission.
 */
export async function sendLeadNotification(
  lead: LeadNotification
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEADS_EMAIL_FROM;
  const to = process.env.LEADS_EMAIL_TO || "leads@forgegtm.com";

  if (!apiKey || !from) {
    console.warn(
      "[lead-email] RESEND_API_KEY or LEADS_EMAIL_FROM is not set — lead stored, " +
        "but no notification sent. See README.md."
    );
    return false;
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        // So hitting reply in the alert writes to the prospect, not to us.
        reply_to: lead.email,
        subject: `New ForgeGTM Strategy Call Lead — ${lead.company || lead.name}`,
        html: buildHtml(lead),
        text: buildText(lead),
      }),
      // Never let a hanging provider block the visitor's response.
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      console.error(
        `[lead-email] provider rejected the message (${response.status}):`,
        await response.text().catch(() => "<no body>")
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("[lead-email] failed to send notification:", error);
    return false;
  }
}
