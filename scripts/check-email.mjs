/**
 * Verifies the Gmail App Password in .env.local by doing a real SMTP login
 * and sending one test message to LEADS_EMAIL_TO.
 *
 * Reads the password from the file and never prints it. Run with:
 *   node scripts/check-email.mjs
 */
import { readFileSync } from "node:fs";
import nodemailer from "nodemailer";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split("\n")
    .filter((l) => l.trim() && !l.trim().startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, "")];
    })
);

const user = env.SMTP_USER;
// Google displays App Passwords in groups of four; the spaces are cosmetic.
const pass = (env.SMTP_PASSWORD || "").replace(/\s+/g, "");
const to = env.LEADS_EMAIL_TO || user;

if (!pass) {
  console.error("✗ SMTP_PASSWORD is still empty in .env.local.");
  process.exit(1);
}
if (pass.length !== 16) {
  console.error(
    `✗ SMTP_PASSWORD is ${pass.length} characters. A Google App Password is 16.\n` +
      "  You may have pasted your normal account password — Google rejects that."
  );
  process.exit(1);
}

console.log(`Connecting to smtp.gmail.com as ${user} …`);

const transport = nodemailer.createTransport({
  host: env.SMTP_HOST || "smtp.gmail.com",
  port: Number(env.SMTP_PORT || 465),
  secure: Number(env.SMTP_PORT || 465) === 465,
  auth: { user, pass },
});

try {
  await transport.verify();
  console.log("✓ Login accepted by Gmail.");

  const info = await transport.sendMail({
    from: `"ForgeGTM Website" <${user}>`,
    to,
    subject: "ForgeGTM — SMTP test",
    text: "If you are reading this, lead alerts are working.",
  });

  console.log(`✓ Test email sent to ${to} (id: ${info.messageId})`);
  console.log("\nCheck that inbox. Lead alerts will work.");
} catch (error) {
  const m = error?.message || String(error);
  console.error("✗ Failed:", m);
  if (/invalid login|username and password|BadCredentials/i.test(m)) {
    console.error(
      "\n  Gmail rejected the credentials. Most likely one of:\n" +
        "   • the password is your normal account password, not an App Password\n" +
        "   • the App Password belongs to a different Google account than SMTP_USER\n" +
        "   • 2-Step Verification is not enabled on that account"
    );
  }
  process.exit(1);
}
