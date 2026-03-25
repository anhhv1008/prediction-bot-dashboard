import { getWorkerDetails } from "./actions";
import WorkerDetailClient from "./WorkerDetailClient";

export default async function WorkerDetailPage({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ page?: string }> }) {
  const p = await params;
  const sp = await searchParams;
  const workerId = Number(p.id);
  const page = sp.page ? Number(sp.page) : 1;
  const data = await getWorkerDetails(workerId, page, 10); // Get recent 10 phases

  return (
    <div>
      <div className="page-header" style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <a href="/workers" className="std-button" style={{ background: "transparent", border: "1px solid var(--panel-border)" }}>← Back</a>
        <h1 className="page-title">Worker #{workerId} Details</h1>
      </div>
      <WorkerDetailClient workerId={workerId} initialData={data} />
    </div>
  );
}
