import { getWorkerDetails } from "./actions";
import WorkerDetailClient from "./WorkerDetailClient";
import Link from "next/link";

export default async function WorkerDetailPage({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ page?: string, mode?: string }> }) {
  const p = await params;
  const sp = await searchParams;
  const workerId = Number(p.id);
  const page = sp.page ? Number(sp.page) : 1;
  const mode = sp.mode as "real" | "simulation" | undefined;
  const data = await getWorkerDetails(workerId, page, 10, mode); // Get recent 10 phases

  return (
    <div>
      <div className="page-header" style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <Link href="/workers" className="std-button" style={{ background: "transparent", border: "1px solid var(--panel-border)" }}>← Back</Link>
        <h1 className="page-title">Worker #{workerId} Details</h1>
      </div>
      <WorkerDetailClient workerId={workerId} initialData={data} />
    </div>
  );
}
