"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function WorkerDetailClient({ workerId, initialData }: { workerId: number, initialData: any }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const { phases, dailyPnL, total } = initialData;
  const limit = 10;
  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(total / limit);

  const [activeTab, setActiveTab] = useState<"pnl" | "phases">("pnl");
  const [expandedPhaseId, setExpandedPhaseId] = useState<number | null>(null);

  useEffect(() => {
    const sse = new EventSource("/api/events");
    sse.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data && data.workerId === workerId) {
          router.refresh();
        }
      } catch (err) {}
    };
    return () => sse.close();
  }, [workerId, router]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Tabs */}
      <div style={{ display: "flex", gap: "16px", borderBottom: "1px solid var(--panel-border)", paddingBottom: "12px" }}>
        <button 
           className="std-button"
           style={{ background: activeTab === "pnl" ? "var(--brand-primary)" : "transparent", color: activeTab === "pnl" ? "#fff" : "var(--text-muted)", border: "1px solid var(--panel-border)" }}
           onClick={() => setActiveTab("pnl")}
        >
          Daily PNL
        </button>
        <button 
           className="std-button"
           style={{ background: activeTab === "phases" ? "var(--brand-primary)" : "transparent", color: activeTab === "phases" ? "#fff" : "var(--text-muted)", border: "1px solid var(--panel-border)" }}
           onClick={() => setActiveTab("phases")}
        >
          Order Phases
        </button>
      </div>

      {activeTab === "pnl" && (
        <div className="glass-panel">
          <h2>7-Day PNL Statistics</h2>
          <div style={{ display: "flex", gap: "16px", marginTop: "16px", flexWrap: "wrap", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
            {Object.entries(dailyPnL).map(([date, pnl]: any) => (
               <div key={date} style={{ padding: "16px", background: "var(--panel-bg)", borderRadius: "8px", border: "1px solid var(--panel-border)", minWidth: "150px", textAlign: "center" }}>
                 <div style={{ fontSize: "14px", color: "var(--text-muted)", marginBottom: "8px" }}>{date}</div>
                 <div style={{ fontSize: "20px", fontWeight: "bold", color: Number(pnl) >= 0 ? "var(--success)" : "var(--danger)" }}>
                   {Number(pnl) >= 0 ? "+" : ""}{Number(pnl).toFixed(4)} USDC
                 </div>
               </div>
            ))}
            {Object.keys(dailyPnL).length === 0 && (
               <p style={{ color: "var(--text-muted)" }}>No PNL data in the last 7 days.</p>
            )}
          </div>
        </div>
      )}

      {activeTab === "phases" && (
        <div className="glass-panel">
          <h2>Phases & Orders</h2>
          <table className="data-table" style={{ marginTop: "16px" }}>
            <thead>
              <tr>
                <th>Phase ID</th>
                <th>Signal ID</th>
                <th>Created / Updated</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {phases.map((phase: any) => (
                <React.Fragment key={phase.id}>
                  <tr style={{ cursor: "pointer", background: expandedPhaseId === phase.id ? "rgba(255,255,255,0.05)" : "transparent" }} onClick={() => setExpandedPhaseId(expandedPhaseId === phase.id ? null : phase.id)}>
                    <td><strong>{phase.id}</strong></td>
                    <td>{phase.signalId}</td>
                    <td style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                      <div>{new Date(Number(phase.createdAt)).toLocaleString()}</div>
                      {phase.updatedAt ? <div>{new Date(Number(phase.updatedAt)).toLocaleString()}</div> : null}
                    </td>
                    <td><span className={`status-badge status-${phase.status.toLowerCase()}`}>{phase.status}</span></td>
                  </tr>
                  {expandedPhaseId === phase.id && (
                    <tr>
                      <td colSpan={4} style={{ padding: 0, borderBottom: "1px solid var(--panel-border)", background: "rgba(0,0,0,0.2)" }}>
                        <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: "24px" }}>
                          
                          <div>
                            <h4 style={{ marginBottom: "12px", color: "var(--text-muted)" }}>Signal Detail</h4>
                            <pre style={{ margin: 0, padding: "12px", background: "rgba(0,0,0,0.3)", borderRadius: "8px", overflowX: "auto", fontSize: "12px", color: "var(--text-primary)", border: "1px solid rgba(255,255,255,0.05)" }}>
                              {JSON.stringify(phase.signalConfig, null, 2)}
                            </pre>
                          </div>

                          <div>
                            <h4 style={{ marginBottom: "12px", color: "var(--text-muted)" }}>Orders for Phase {phase.id}</h4>
                            <table className="data-table" style={{ background: "transparent" }}>
                            <thead>
                              <tr>
                                <th>Order ID</th>
                                <th>Side</th>
                                <th>Executed Price</th>
                                <th>Quantity / Exec / Recv</th>
                                <th>Created / Executed</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {phase.orders?.map((order: any) => (
                                <tr key={order.id}>
                                  <td>{order.exchangeOrderId || order.id}</td>
                                  <td style={{ textTransform: "uppercase", color: order.side === "buy" ? "var(--success)" : "var(--danger)" }}>{order.side}</td>
                                  <td>${order.executedPrice || "-"}</td>
                                  <td>{order.quantity} / {order.executedQuantity || 0} / {order.receivedQuantity || 0}</td>
                                  <td style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                                    <div>{new Date(Number(order.createdAt)).toLocaleString()}</div>
                                    {order.executedAt ? <div>{new Date(Number(order.executedAt)).toLocaleString()}</div> : null}
                                  </td>
                                  <td><span className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</span></td>
                                </tr>
                              ))}
                              {(!phase.orders || phase.orders.length === 0) && (
                                <tr><td colSpan={6} style={{ textAlign: "center" }}>No orders placed</td></tr>
                              )}
                            </tbody>
                          </table>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {phases.length === 0 && (
                <tr><td colSpan={4} style={{ textAlign: "center" }}>No phases found.</td></tr>
              )}
            </tbody>
          </table>

          {totalPages > 1 && (
             <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", marginTop: "24px" }}>
                <button disabled={currentPage <= 1} onClick={() => handlePageChange(currentPage - 1)} className="std-button" style={{ background: "transparent", border: "1px solid var(--panel-border)", opacity: currentPage <= 1 ? 0.5 : 1 }}>Prev</button>
                <div style={{ fontSize: "14px" }}>Page {currentPage} of {totalPages}</div>
                <button disabled={currentPage >= totalPages} onClick={() => handlePageChange(currentPage + 1)} className="std-button" style={{ background: "transparent", border: "1px solid var(--panel-border)", opacity: currentPage >= totalPages ? 0.5 : 1 }}>Next</button>
             </div>
          )}
        </div>
      )}
    </div>
  );
}
