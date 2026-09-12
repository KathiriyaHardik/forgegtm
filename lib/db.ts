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
};

export async function insertStrategyCall(record: StrategyCallRecord) {
  const sql = getSql();

  const [row] = await sql<{ id: string }[]>`
    insert into strategy_call_requests
      (name, email, company, website, job_title, budget, goal, message, source_path)
    values
      (${record.name}, ${record.email}, ${record.company}, ${record.website},
       ${record.jobTitle}, ${record.budget}, ${record.goal}, ${record.message},
       ${record.sourcePath})
    returning id
  `;

  return row.id;
}
