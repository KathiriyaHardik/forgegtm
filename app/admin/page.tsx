import {
  DatabaseNotConfiguredError,
  listStrategyCalls,
  type StoredLead,
} from "@/lib/db";

/**
 * Lead dashboard.
 *
 * Access is gated by HTTP Basic auth in `proxy.ts` before this route is
 * reached, so there is no auth logic here.
 *
 * Rendered per request, never cached: a cached lead list is both stale and a
 * disclosure risk, since the response is tied to an authenticated session.
 */
export const dynamic = "force-dynamic";
export const revalidate = 0;

function formatDateTime(value: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Berlin",
  }).format(value);
}

/** Green when the email went out, amber when it did not — never silent. */
function EmailStatus({ sentAt, label }: { sentAt: Date | null; label: string }) {
  const ok = sentAt !== null;
  return (
    <span
      title={ok ? `${label} sent ${formatDateTime(sentAt)}` : `${label} not sent`}
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-medium ${
        ok
          ? "bg-emerald-50 text-emerald-700"
          : "bg-amber-50 text-amber-700"
      }`}
    >
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full ${ok ? "bg-emerald-500" : "bg-amber-500"}`}
      />
      {label}
    </span>
  );
}

function Field({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-[11px] tracking-[0.08em] text-muted-soft uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-[13.5px] break-words text-ink-soft">{value}</dd>
    </div>
  );
}

function LeadCard({ lead }: { lead: StoredLead }) {
  return (
    <article className="rounded-card border border-border bg-white p-6">
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div>
          <h2 className="text-[17px] font-semibold tracking-[-0.02em] text-ink">
            {lead.name}
            <span className="font-normal text-muted"> · {lead.company}</span>
          </h2>
          {/* Clickable so a reply is one action away. */}
          <a
            href={`mailto:${lead.email}?subject=${encodeURIComponent(
              `Your ForgeGTM strategy call request`
            )}`}
            className="mt-1.5 inline-block text-[14px] font-medium text-accent underline underline-offset-2"
          >
            {lead.email}
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <EmailStatus sentAt={lead.notifiedAt} label="Alert" />
          <EmailStatus sentAt={lead.confirmationSentAt} label="Confirmation" />
        </div>
      </div>

      <dl className="mt-6 grid gap-5 border-t border-border-soft pt-5 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Submitted" value={formatDateTime(lead.createdAt)} />
        <Field label="Job title" value={lead.jobTitle} />
        <Field label="Website" value={lead.website} />
        <Field label="Monthly budget" value={lead.budget} />
        <Field label="Looking to improve" value={lead.goal} />
        <Field label="Language" value={lead.locale.toUpperCase()} />
        <Field label="Source page" value={lead.sourcePath} />
        <Field label="Status" value={lead.status} />
      </dl>

      {lead.message && (
        <div className="rounded-inset mt-5 border border-border bg-surface-2 p-4">
          <div className="text-[11px] tracking-[0.08em] text-muted-soft uppercase">
            Message
          </div>
          <p className="mt-2 text-[13.5px] leading-relaxed whitespace-pre-wrap text-ink-soft">
            {lead.message}
          </p>
        </div>
      )}
    </article>
  );
}

export default async function AdminLeadsPage() {
  let leads: StoredLead[];

  try {
    leads = await listStrategyCalls();
  } catch (error) {
    // An unconfigured database must not render as "no leads yet" — that is
    // indistinguishable from the healthy empty state and hides a real fault.
    const notConfigured = error instanceof DatabaseNotConfiguredError;
    if (!notConfigured) console.error("[admin] could not read leads:", error);

    return (
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-[22px] font-semibold tracking-[-0.02em] text-ink">
          Leads unavailable
        </h1>
        <p className="mt-3 text-[14px] leading-relaxed text-muted">
          {notConfigured
            ? "DATABASE_URL is not set, so there is no lead store to read. See README.md."
            : "The database could not be reached. The error has been logged server-side."}
        </p>
      </main>
    );
  }

  const awaitingEmail = leads.filter(
    (l) => l.notifiedAt === null || l.confirmationSentAt === null
  ).length;

  return (
    <main className="mx-auto max-w-5xl px-6 py-12 md:py-16">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-[24px] font-semibold tracking-[-0.03em] text-ink">
            Strategy call requests
          </h1>
          <p className="mt-1.5 text-[13.5px] text-muted">
            {leads.length === 0
              ? "No requests yet."
              : `${leads.length} request${leads.length === 1 ? "" : "s"}, newest first.`}
          </p>
        </div>

        {awaitingEmail > 0 && (
          <p className="rounded-inset bg-amber-50 px-3.5 py-2 text-[12.5px] text-amber-800">
            {awaitingEmail} with an email that did not send — the lead is safe,
            follow up by hand.
          </p>
        )}
      </header>

      {leads.length === 0 ? (
        <p className="mt-10 text-[14px] text-muted">
          Requests submitted through the strategy-call form will appear here.
        </p>
      ) : (
        <div className="mt-8 flex flex-col gap-5">
          {leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      )}
    </main>
  );
}
