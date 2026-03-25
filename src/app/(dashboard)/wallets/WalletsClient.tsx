"use client";

import { useState } from "react";
import { saveWallet, deleteWallet } from "./actions";

export default function WalletsClient({ initialWallets }: { initialWallets: any[] }) {
  const [items, setItems] = useState(initialWallets);
  const [editing, setEditing] = useState<any>(null);

  const handleEdit = (item: any) => {
    setEditing({ ...item, privateKey: "" });
  };

  const handleCreate = () => {
    setEditing({ telegramUserId: 0, name: "", privateKey: "" });
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this wallet?")) {
      await deleteWallet(id);
      setItems((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveWallet(editing);
      window.location.reload();
    } catch (err: any) {
      alert(err.message || "Failed to save wallet");
    }
  };

  if (editing) {
    return (
      <div className="glass-panel">
        <h2>{editing.id ? "Edit Wallet" : "New Wallet"}</h2>
        <form onSubmit={handleSave} style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginTop: "20px", alignItems: "start" }}>
          <div>
            <label>Telegram User ID</label><br />
            <input 
              type="number"
              value={editing.telegramUserId} 
              onChange={(e) => setEditing({...editing, telegramUserId: Number(e.target.value)})} 
              className="login-input" 
              required
            />
          </div>
          <div>
            <label>Wallet Name</label><br />
            <input 
              type="text"
              value={editing.name} 
              onChange={(e) => setEditing({...editing, name: e.target.value})} 
              className="login-input" 
              required
            />
          </div>
          <div>
            <label>Private Key {editing.id ? "(Leave blank to keep current)" : ""}</label><br />
            <input 
              type="text"
              value={editing.privateKey || ""} 
              onChange={(e) => setEditing({...editing, privateKey: e.target.value})} 
              className="login-input" 
              required={!editing.id}
              placeholder="0x..."
            />
          </div>
          <div style={{ gridColumn: "1 / -1", display: "flex", gap: "12px", marginTop: "8px" }}>
            <button type="submit" className="std-button">Save Wallet</button>
            <button type="button" onClick={() => setEditing(null)} className="std-button" style={{ background: "transparent", border: "1px solid var(--panel-border)" }}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="glass-panel">
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "flex-end" }}>
        <button onClick={handleCreate} className="std-button">+ New Wallet</button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Telegram User ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((w) => (
            <tr key={w.id}>
              <td>{w.id}</td>
              <td>{w.telegramUserId}</td>
              <td>{w.name}</td>
              <td>
                <button onClick={() => handleEdit(w)} className="std-button" style={{ marginRight: "8px", padding: "4px 8px" }}>Edit</button>
                <button onClick={() => handleDelete(w.id)} className="std-button" style={{ background: "var(--danger)", padding: "4px 8px" }}>Delete</button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: "24px" }}>No wallets found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
