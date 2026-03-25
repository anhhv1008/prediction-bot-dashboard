"use client";

import { useState, useEffect } from "react";
import { saveWalletExchangeApi, deleteWalletExchangeApi } from "./actions";
import { searchWallets } from "../wallets/actions";

function AsyncWalletSelect({ value, onChange }: { value: number; onChange: (val: number) => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  // Track selected name to prevent immediate refetch when setting input to picked value
  const [selectedWalletName, setSelectedWalletName] = useState("");

  useEffect(() => {
    // If we receive a valid ID but haven't searched yet, we might not have its name, but that's handled by just showing the ID in the UI if needed.
    if (!query || query === selectedWalletName) {
      setResults([]);
      return;
    }
    
    const delay = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await searchWallets(query);
        setResults(data);
        setIsOpen(true);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [query, selectedWalletName]);

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        className="login-input"
        placeholder="Type Wallet Name or ID to search..."
        value={query}
        onChange={(e) => {
           setQuery(e.target.value);
           if (e.target.value === "") {
             onChange(0);
           }
        }}
        onFocus={() => { if (results.length > 0) setIsOpen(true); }}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      />
      {value > 0 && <div style={{ fontSize: "12px", marginTop: "4px", color: "var(--text-accent, #9ca3af)" }}>Selected Wallet ID: {value}</div>}
      
      {isOpen && (
        <div style={{
          position: "absolute",
          top: "100%", left: 0, right: 0,
          background: "#161b22",
          border: "1px solid var(--panel-border, #333)",
          zIndex: 10,
          maxHeight: "200px",
          overflowY: "auto",
          marginTop: "4px",
          borderRadius: "4px",
        }}>
          {loading ? (
            <div style={{ padding: "8px" }}>Searching...</div>
          ) : results.length > 0 ? (
            results.map((w) => (
              <div 
                key={w.id} 
                style={{ padding: "8px", cursor: "pointer", borderBottom: "1px solid var(--panel-border, #333)" }}
                onClick={() => {
                  onChange(w.id);
                  setQuery(w.name);
                  setSelectedWalletName(w.name);
                  setIsOpen(false);
                }}
              >
                <strong>{w.name}</strong> (ID: {w.id})
              </div>
            ))
          ) : (
            <div style={{ padding: "8px" }}>No wallets found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default function WalletExchangeApisClient({ initialApis }: { initialApis: any[] }) {
  const [items, setItems] = useState(initialApis);
  const [editing, setEditing] = useState<any>(null);

  const handleEdit = (item: any) => {
    // Blank out plainSecret and plainPassphrase when editing so we don't leak anything
    setEditing({ ...item, plainSecret: "", plainPassphrase: "" });
  };

  const handleCreate = () => {
    setEditing({ walletId: 0, exchange: "polymarket", key: "", plainSecret: "", plainPassphrase: "" });
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this API configuration?")) {
      await deleteWalletExchangeApi(id);
      setItems((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing.walletId) {
       alert("Please select a valid Wallet from the search dropdown.");
       return;
    }
    
    try {
      await saveWalletExchangeApi(editing);
      window.location.reload();
    } catch (err: any) {
      alert(err.message || "Failed to save API connection");
    }
  };

  if (editing) {
    return (
      <div className="glass-panel">
        <h2>{editing.id ? "Edit API config" : "New API config"}</h2>
        <form onSubmit={handleSave} style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginTop: "20px", alignItems: "start" }}>
          <div>
            <label>Wallet Link</label><br />
            <AsyncWalletSelect
              value={editing.walletId}
              onChange={(val) => setEditing({ ...editing, walletId: val })}
            />
          </div>
          <div>
            <label>Exchange</label><br />
            <select 
              value={editing.exchange} 
              onChange={(e) => setEditing({...editing, exchange: e.target.value})}
              className="login-input"
            >
              <option value="polymarket">Polymarket</option>
            </select>
          </div>
          <div>
            <label>API Key</label><br />
            <input 
              type="text"
              value={editing.key} 
              onChange={(e) => setEditing({...editing, key: e.target.value})} 
              className="login-input" 
              required
            />
          </div>
          <div>
            <label>Secret {editing.id ? "(Leave blank to keep current)" : ""}</label><br />
            <input 
              type="text"
              value={editing.plainSecret || ""} 
              onChange={(e) => setEditing({...editing, plainSecret: e.target.value})} 
              className="login-input" 
              required={!editing.id}
              placeholder="API Secret"
            />
          </div>
          <div>
            <label>Passphrase {editing.id ? "(Leave blank to keep current)" : ""}</label><br />
            <input 
              type="text"
              value={editing.plainPassphrase || ""} 
              onChange={(e) => setEditing({...editing, plainPassphrase: e.target.value})} 
              className="login-input" 
              placeholder="API Passphrase (Optional)"
            />
          </div>
          <div style={{ gridColumn: "1 / -1", display: "flex", gap: "12px", marginTop: "8px" }}>
            <button type="submit" className="std-button">Save Configuration</button>
            <button type="button" onClick={() => setEditing(null)} className="std-button" style={{ background: "transparent", border: "1px solid var(--panel-border)" }}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="glass-panel">
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "flex-end" }}>
        <button onClick={handleCreate} className="std-button">+ New API Config</button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Wallet ID</th>
            <th>Exchange</th>
            <th>API Key</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.walletId}</td>
              <td>{a.exchange}</td>
              <td>{a.key}</td>
              <td>
                <button onClick={() => handleEdit(a)} className="std-button" style={{ marginRight: "8px", padding: "4px 8px" }}>Edit</button>
                <button onClick={() => handleDelete(a.id)} className="std-button" style={{ background: "var(--danger)", padding: "4px 8px" }}>Delete</button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: "24px" }}>No API configs found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
