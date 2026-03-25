"use client";

import { useState } from "react";
import { saveUser, deleteUser } from "./actions";

export default function UsersClient({ initialUsers }: { initialUsers: any[] }) {
  const [items, setItems] = useState(initialUsers);
  const [editing, setEditing] = useState<any>(null);

  const handleEdit = (item: any) => {
    setEditing(item);
  };

  const handleCreate = () => {
    setEditing({ telegramId: 0, username: "", fullName: "", socketAuthenticationCode: "" });
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      setItems((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveUser(editing);
    window.location.reload();
  };

  if (editing) {
    return (
      <div className="glass-panel">
        <h2>{editing.id ? "Edit User" : "New User"}</h2>
        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "20px" }}>
          <div>
            <label>Telegram ID</label><br />
            <input 
              type="number"
              value={editing.telegramId} 
              onChange={(e) => setEditing({...editing, telegramId: Number(e.target.value)})} 
              className="login-input" 
              required
            />
          </div>
          <div>
            <label>Username</label><br />
            <input 
              type="text"
              value={editing.username} 
              onChange={(e) => setEditing({...editing, username: e.target.value})} 
              className="login-input" 
            />
          </div>
          <div>
            <label>Full Name</label><br />
            <input 
              type="text"
              value={editing.fullName} 
              onChange={(e) => setEditing({...editing, fullName: e.target.value})} 
              className="login-input" 
            />
          </div>
          <div>
            <label>Socket Auth Code</label><br />
            <input 
              type="text"
              value={editing.socketAuthenticationCode || ""} 
              onChange={(e) => setEditing({...editing, socketAuthenticationCode: e.target.value})} 
              className="login-input" 
            />
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button type="submit" className="std-button">Save User</button>
            <button type="button" onClick={() => setEditing(null)} className="std-button" style={{ background: "transparent", border: "1px solid var(--panel-border)" }}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="glass-panel">
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "flex-end" }}>
        <button onClick={handleCreate} className="std-button">+ New User</button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Telegram ID</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((w) => (
            <tr key={w.id}>
              <td>{w.id}</td>
              <td>{w.telegramId}</td>
              <td>{w.username}</td>
              <td>{w.fullName}</td>
              <td>
                <button onClick={() => handleEdit(w)} className="std-button" style={{ marginRight: "8px", padding: "4px 8px" }}>Edit</button>
                <button onClick={() => handleDelete(w.id)} className="std-button" style={{ background: "var(--danger)", padding: "4px 8px" }}>Delete</button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: "24px" }}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
