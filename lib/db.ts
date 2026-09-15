import "server-only";
import postgres from "postgres";

/**
 * Lazily-created Postgres client.
 *
 * The connection is created on first use rather than at module load, so a
 * missing DATABASE_URL surfaces as a handled error inside the Server Action
 * instead of crashing the whole route at import time. The instance is cached
 * on globalThis so dev hot-reloads don't leak connections.
 */

const globalForDb = globalThis as unknown as {
  forgegtmSql?: postgres.Sql;
};

export class DatabaseNotConfiguredError extends Error {
  constructor() {
    super("DATABASE_URL is not set");
    this.name = "DatabaseNotConfiguredError";
  }
}

function getSql(): postgres.Sql {
  const url = process.env.DATABASE_URL;
  if (!url) throw new DatabaseNotConfiguredError();

  if (!globalForDb.forgegtmSql) {
    globalForDb.forgegtmSql = postgres(url, {
      // Serverless platforms recycle instances aggressively; a small pool with
      // a short idle timeout avoids holding connections the platform will kill.
      max: 3,
      idle_timeout: 20,
      connect_timeout: 10,
      onnotice: () => {},
    });
  }

  return globalForDb.forgegtmSql;
}

export type StrategyCallRecord = {
  name: string;
  email: string;
  company: string;
  website: string | null;
  jobTitle: string | null;
  budget: string | null;
  goal: string;
  message: string | null;
  sourcePath: string | null;
  locale: string;
};

export async function insertStrategyCall(record: StrategyCallRecord) {
  const sql = getSql();

  const [row] = await sql<{ id: string }[]>`
    insert into strategy_call_requests
      (name, email, company, website, job_title, budget, goal, message,
       source_path, locale)
    values
      (${record.name}, ${record.email}, ${record.company}, ${record.website},
       ${record.jobTitle}, ${record.budget}, ${record.goal}, ${record.message},
       ${record.sourcePath}, ${record.locale})
    returning id
  `;

  return row.id;
}

/**
 * Stamps which of the two emails actually went out.
 *
 * Never throws: this is bookkeeping that runs after the lead is already safely
 * stored, so a failure here must not surface to the visitor. A lead left with
 * a null timestamp is one to chase manually — which is the whole point of
 * recording it rather than only logging.
 */
export async function markLeadEmailsSent(
  id: string,
  sent: { notified: boolean; confirmed: boolean }
) {
  if (!sent.notified && !sent.confirmed) return;

  try {
    const sql = getSql();
    // Each column is only set when that specific email succeeded, so a partial
    // success records exactly which half worked.
    await sql`
      update strategy_call_requests
      set notified_at = case when ${sent.notified} then now() else notified_at end,
          confirmation_sent_at = case when ${sent.confirmed} then now() else confirmation_sent_at end
      where id = ${id}
    `;
  } catch (error) {
    console.error("[strategy-call] could not record email status:", error);
  }
}

export type StoredLead = {
  id: string;
  createdAt: Date;
  name: string;
  email: string;
  company: string;
  website: string | null;
  jobTitle: string | null;
  budget: string | null;
  goal: string;
  message: string | null;
  sourcePath: string | null;
  locale: string;
  status: string;
  notifiedAt: Date | null;
  confirmationSentAt: Date | null;
};

/** Total rows, so the dashboard can say when it is showing only a page. */
export async function countStrategyCalls(): Promise<number> {
  const sql = getSql();
  const [row] = await sql<{ count: string }[]>`
    select count(*)::text as count from strategy_call_requests
  `;
  return Number(row.count);
}

/**
 * Reads the lead queue, newest first.
 *
 * `limit` is capped rather than unbounded so the dashboard cannot be made to
 * render tens of thousands of rows, but the caller can raise it — the CSV
 * export passes a much larger value, since a truncated export is worse than a
 * slow one. Pair it with `countStrategyCalls()` to tell the difference between
 * "that is everything" and "that is the first page".
 *
 * Throws `DatabaseNotConfiguredError` when DATABASE_URL is unset so the page
 * can say so plainly instead of rendering an empty table that looks like
 * "no leads yet" — a far worse failure, because it is indistinguishable from
 * the healthy empty state.
 */
export async function listStrategyCalls(limit = 200): Promise<StoredLead[]> {
  const sql = getSql();

  const rows = await sql<
    {
      id: string;
      created_at: Date;
      name: string;
      email: string;
      company: string;
      website: string | null;
      job_title: string | null;
      budget: string | null;
      goal: string;
      message: string | null;
      source_path: string | null;
      locale: string;
      status: string;
      notified_at: Date | null;
      confirmation_sent_at: Date | null;
    }[]
  >`
    select id, created_at, name, email, company, website, job_title, budget,
           goal, message, source_path, locale, status, notified_at,
           confirmation_sent_at
    from strategy_call_requests
    order by created_at desc
    limit ${limit}
  `;

  return rows.map((r) => ({
    id: r.id,
    createdAt: r.created_at,
    name: r.name,
    email: r.email,
    company: r.company,
    website: r.website,
    jobTitle: r.job_title,
    budget: r.budget,
    goal: r.goal,
    message: r.message,
    sourcePath: r.source_path,
    locale: r.locale,
    status: r.status,
    notifiedAt: r.notified_at,
    confirmationSentAt: r.confirmation_sent_at,
  }));
}
