import type { StoredLead } from "@/lib/db";

/**
 * CSV generation for the lead export.
 *
 * Hand-rolled rather than pulled from a dependency, because the whole job is
 * one escaping rule (RFC 4180) and the interesting parts are the details a
 * library would not know about: Excel's BOM requirement, and the formula
 * injection guard below.
 */

/**
 * Quotes a field per RFC 4180.
 *
 * A field only *needs* quoting when it contains a comma, quote, or newline —
 * but quoting everything is simpler to reason about and equally valid, so the
 * rule here is: always quote, and double any embedded quote. That makes
 * multiline messages work without special handling, since a newline inside
 * quotes is data rather than a row break.
 */
function quote(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

/**
 * Neutralises spreadsheet formula injection.
 *
 * Excel, Sheets and LibreOffice execute a cell beginning with =, +, - or @.
 * A lead who submits `=HYPERLINK("evil.com","click")` as their company name
 * would otherwise get that executed in whoever opens the export — the CSV is
 * untrusted input, because anyone on the internet can fill in the form.
 *
 * Prefixing a tab makes the cell inert while keeping the text readable and
 * intact, which is why it is preferred over stripping the character.
 */
function neutralise(value: string) {
  return /^[=+\-@\t\r]/.test(value) ? `\t${value}` : value;
}

function cell(value: string | Date | null | undefined) {
  if (value === null || value === undefined) return quote("");
  if (value instanceof Date) return quote(value.toISOString());
  return quote(neutralise(String(value)));
}

/** Column order of the export. Header labels are what the user sees. */
const COLUMNS: { header: string; value: (lead: StoredLead) => string }[] = [
  { header: "Submitted (UTC)", value: (l) => cell(l.createdAt) },
  { header: "Name", value: (l) => cell(l.name) },
  { header: "Email", value: (l) => cell(l.email) },
  { header: "Company", value: (l) => cell(l.company) },
  { header: "Website", value: (l) => cell(l.website) },
  { header: "Job title", value: (l) => cell(l.jobTitle) },
  { header: "Monthly budget", value: (l) => cell(l.budget) },
  { header: "Looking to improve", value: (l) => cell(l.goal) },
  { header: "Message", value: (l) => cell(l.message) },
  { header: "Language", value: (l) => cell(l.locale.toUpperCase()) },
  { header: "Source page", value: (l) => cell(l.sourcePath) },
  { header: "Status", value: (l) => cell(l.status) },
  { header: "Alert sent", value: (l) => cell(l.notifiedAt) },
  { header: "Confirmation sent", value: (l) => cell(l.confirmationSentAt) },
  { header: "ID", value: (l) => cell(l.id) },
];

/**
 * Serialises leads to CSV text.
 *
 * CRLF line endings and a UTF-8 BOM are both for Excel: without the BOM it
 * reads the file as the local codepage and mangles every umlaut and € sign,
 * which matters when half the leads are German.
 */
export function leadsToCsv(leads: StoredLead[]) {
  const rows = [
    COLUMNS.map((c) => quote(c.header)).join(","),
    ...leads.map((lead) => COLUMNS.map((c) => c.value(lead)).join(",")),
  ];

  return `﻿${rows.join("\r\n")}\r\n`;
}

/** e.g. forgegtm-leads-2026-09-16.csv */
export function csvFilename(now = new Date()) {
  return `forgegtm-leads-${now.toISOString().slice(0, 10)}.csv`;
}
