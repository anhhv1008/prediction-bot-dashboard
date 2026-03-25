"use client";

import { useState } from "react";
import { saveSignal, deleteSignal } from "./actions";

export default function SignalsClient({ initialSignals }: { initialSignals: any[] }) {
  const [signals, setSignals] = useState(initialSignals);
  const [editing, setEditing] = useState<any>(null);

  const handleEdit = (signal: any) => {
    setEditing(signal);
  };

  const handleCreate = () => {
    setEditing({ name: "", indicator: "winning_side", indicatorConfig: {}, status: "active" });
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this signal?")) {
      await deleteSignal(id);
      setSignals((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Parse JSON
      const config = typeof editing.indicatorConfig === "string" 
          ? JSON.parse(editing.indicatorConfig) 
          : editing.indicatorConfig;
      
      await saveSignal({ ...editing, indicatorConfig: config });
      window.location.reload(); // Quick refresh to get updated server state
    } catch (err) {
      alert("Invalid JSON config");
    }
  };

  if (editing) {
    return (
      <div className="glass-panel">
        <h2>{editing.id ? "Edit Signal" : "New Signal"}</h2>
        <form onSubmit={handleSave} style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginTop: "20px", alignItems: "start" }}>
          <div>
            <label>Name</label><br />
            <input 
              value={editing.name} 
              onChange={(e) => setEditing({...editing, name: e.target.value})} 
              className="login-input" 
              required
            />
          </div>
          <div>
            <label>Indicator</label><br />
            <select 
              value={editing.indicator} 
              onChange={(e) => setEditing({...editing, indicator: e.target.value})}
              className="login-input"
            >
              <option value="dip_arbitrage">Dip Arbitrage</option>
              <option value="dip_arbitrage_vwap">Dip Arbitrage VWAP</option>
              <option value="winning_side">Winning Side</option>
              <option value="dip_reverse">Dip Reverse</option>
            </select>
          </div>
          <div>
            <label>Status</label><br />
            <select 
              value={editing.status} 
              onChange={(e) => setEditing({...editing, status: e.target.value})}
              className="login-input"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label>Indicator Config (JSON)</label><br />
            <textarea 
              value={typeof editing.indicatorConfig === "string" ? editing.indicatorConfig : JSON.stringify(editing.indicatorConfig, null, 2)}
              onChange={(e) => setEditing({...editing, indicatorConfig: e.target.value})}
              className="login-input"
              rows={8}
              required
            />
          </div>
          <div style={{ gridColumn: "1 / -1", display: "flex", gap: "12px", marginTop: "8px" }}>
            <button type="submit" className="std-button">Save Signal</button>
            <button type="button" onClick={() => setEditing(null)} className="std-button" style={{ background: "transparent", border: "1px solid var(--panel-border)" }}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="glass-panel">
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "flex-end" }}>
        <button onClick={handleCreate} className="std-button">+ New Signal</button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Indicator</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {signals.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.indicator}</td>
              <td>
                <span className={`status-badge status-${s.status}`}>{s.status}</span>
              </td>
              <td>
                <button onClick={() => handleEdit(s)} className="std-button" style={{ marginRight: "8px", padding: "4px 8px" }}>Edit</button>
                <button onClick={() => handleDelete(s.id)} className="std-button" style={{ background: "var(--danger)", padding: "4px 8px" }}>Delete</button>
              </td>
            </tr>
          ))}
          {signals.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: "24px" }}>No signals configured</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
