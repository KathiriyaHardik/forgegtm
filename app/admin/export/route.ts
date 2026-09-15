import { DatabaseNotConfiguredError, listStrategyCalls } from "@/lib/db";
import { csvFilename, leadsToCsv } from "@/lib/csv";

/**
 * CSV export of the lead queue.
 *
 * Deliberately routed at `/admin/export` with no file extension. `proxy.ts`
 * skips any path ending in one (so static assets are not rewritten), which
 * means `/admin/export.csv` would bypass the auth guard entirely. The
 * downloaded file gets its name from Content-Disposition instead, which is
 * what the browser actually uses.
 *
 * Auth is enforced upstream in `proxy.ts` for everything under `/admin/`, so
 * there is no credential handling here — one guard, one place.
 */
export const dynamic = "force-dynamic";
export const revalidate = 0;

/** Well above any realistic lead volume: a truncated export is a silent lie. */
const EXPORT_LIMIT = 100_000;

export async function GET() {
  let csv: string;

  try {
    const leads = await listStrategyCalls(EXPORT_LIMIT);
    csv = leadsToCsv(leads);
  } catch (error) {
    if (error instanceof DatabaseNotConfiguredError) {
      return new Response("DATABASE_URL is not set, so there are no leads to export.", {
        status: 503,
        headers: { "Cache-Control": "no-store" },
      });
    }
    console.error("[admin] lead export failed:", error);
    return new Response("Could not read leads. The error has been logged.", {
      status: 500,
      headers: { "Cache-Control": "no-store" },
    });
  }

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${csvFilename()}"`,
      // Lead data tied to an authenticated request must never be cached.
      "Cache-Control": "no-store, must-revalidate",
    },
  });
}
