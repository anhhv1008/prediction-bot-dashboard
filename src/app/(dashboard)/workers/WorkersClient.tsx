"use client";
import { WorkerConfigStatus, type BotWorkerConfig, type BotWorkerState } from "@Types/Business";

import { useState } from "react";
import { saveWorker, deleteWorker } from "./actions";
import Link from "next/link";

interface WorkerData {
  id?: number;
  walletExchangeApiId: number;
  userId: number;
  signalIds: number[] | string;
  workerConfig: BotWorkerConfig | string;
  workerState: BotWorkerState | string;
  status: WorkerConfigStatus;
  createdAt?: number;
  updatedAt?: number;
}

export default function WorkersClient({ initialWorkers }: { initialWorkers: WorkerData[] }) {
  const [workers, setWorkers] = useState(initialWorkers);
  const [editing, setEditing] = useState<WorkerData | null>(null);

  const handleEdit = (worker: WorkerData) => {
    setEditing(worker);
  };

  const handleCreate = () => {
    setEditing({ walletExchangeApiId: 0, userId: 0, signalIds: [], workerConfig: {}, workerState: {}, status: WorkerConfigStatus.Active });
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this worker?")) {
      await deleteWorker(id);
      setWorkers((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    try {
      const config = typeof editing.workerConfig === "string" 
          ? JSON.parse(editing.workerConfig) 
          : editing.workerConfig;
      const signals = typeof editing.signalIds === "string"
          ? editing.signalIds.split(",").map((s: string) => Number(s.trim()))
          : editing.signalIds;
      
      const state = typeof editing.workerState === "string"
          ? JSON.parse(editing.workerState)
          : editing.workerState;
      
      await saveWorker({ ...editing, workerConfig: config, workerState: state, signalIds: signals } as any);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Invalid JSON config or Signal IDs format.");
    }
  };

  if (editing) {
    return (
      <div className="glass-panel">
        <h2>{editing.id ? "Edit Worker" : "New Worker"}</h2>
        <form onSubmit={handleSave} style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginTop: "20px", alignItems: "start" }}>
          <div>
            <label>API Wallet ID</label><br />
            <input 
              type="number"
              value={editing.walletExchangeApiId} 
              onChange={(e) => setEditing({...editing, walletExchangeApiId: Number(e.target.value)})} 
              className="login-input" 
              required
            />
          </div>
          <div>
            <label>User ID</label><br />
            <input 
              type="number"
              value={editing.userId} 
              onChange={(e) => setEditing({...editing, userId: Number(e.target.value)})} 
              className="login-input" 
              required
            />
          </div>
          <div>
            <label>Signal IDs (comma separated)</label><br />
            <input 
              type="text"
              value={Array.isArray(editing.signalIds) ? editing.signalIds.join(",") : editing.signalIds} 
              onChange={(e) => setEditing({...editing, signalIds: e.target.value})} 
              className="login-input" 
              required
            />
          </div>
          <div>
            <label>Status</label><br />
            <select 
              value={editing.status} 
              onChange={(e) => setEditing({...editing, status: e.target.value as WorkerConfigStatus})}
              className="login-input"
            >
              <option value={WorkerConfigStatus.Active}>Active</option>
              <option value={WorkerConfigStatus.Inactive}>Inactive</option>
            </select>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label>Worker Config (JSON)</label><br />
            <textarea 
              value={typeof editing.workerConfig === "string" ? editing.workerConfig : JSON.stringify(editing.workerConfig, null, 2)}
              onChange={(e) => setEditing({...editing, workerConfig: e.target.value})}
              className="login-input"
              rows={8}
            />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label>Worker State (JSON)</label><br />
            <textarea 
              value={typeof editing.workerState === "string" ? editing.workerState : JSON.stringify(editing.workerState, null, 2)}
              onChange={(e) => setEditing({...editing, workerState: e.target.value})}
              className="login-input"
              rows={8}
            />
          </div>
          <div style={{ gridColumn: "1 / -1", display: "flex", gap: "12px", marginTop: "8px" }}>
            <button type="submit" className="std-button">Save Worker</button>
            <button type="button" onClick={() => setEditing(null)} className="std-button" style={{ background: "transparent", border: "1px solid var(--panel-border)" }}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="glass-panel">
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "flex-end" }}>
        <button onClick={handleCreate} className="std-button">+ New Worker</button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>API Wallet ID</th>
            <th>User ID</th>
            <th>Signals</th>
            <th>State</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((w) => (
            <tr key={w.id}>
              <td>{w.id}</td>
              <td>{w.walletExchangeApiId}</td>
              <td>{w.userId}</td>
              <td>{Array.isArray(w.signalIds) ? w.signalIds.join(", ") : (typeof w.signalIds === 'string' ? w.signalIds : "-")}</td>
              <td>
                <div style={{ fontSize: "12px", opacity: 0.8 }}>
                  Real Trading: {(w.workerState as BotWorkerState)?.enableRealTrading ? "✅" : "❌"}<br />
                  Phases: {(w.workerState as BotWorkerState)?.countingDynamicPhases || 0}
                </div>
              </td>
              <td>
                <span className={`status-badge status-${w.status}`}>{w.status}</span>
              </td>
              <td>
                <Link href={`/workers/${w.id}`}>
                  <button className="std-button" style={{ marginRight: "8px", padding: "4px 8px", background: "var(--success)" }}>View Details & PNL</button>
                </Link>
                <button onClick={() => handleEdit(w)} className="std-button" style={{ marginRight: "8px", padding: "4px 8px" }}>Edit</button>
                <button onClick={() => handleDelete(w.id!)} className="std-button" style={{ background: "var(--danger)", padding: "4px 8px" }}>Delete</button>
              </td>
            </tr>
          ))}
          {workers.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: "24px" }}>No workers configured</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
