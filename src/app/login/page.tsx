"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "@/app/globals.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok && data.success) {
      router.push("/signals");
      router.refresh(); // Ensure layout correctly re-evaluates cookie
    } else {
      setError(data.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-glass-card">
        <h1 className="login-title">Prediction Bot</h1>
        <p className="login-subtitle">Dashboard Access</p>
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="login-input"
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
