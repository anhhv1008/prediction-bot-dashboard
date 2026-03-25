"use client";

import { useRouter } from "next/navigation";

export default function SidebarProfile({ username }: { username: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <div>
      <div style={{ color: "var(--text-muted)", fontSize: "12px", marginBottom: "12px" }}>
        Logged in as <b>{username}</b>
      </div>
      <button onClick={handleLogout} className="logout-btn">
        Sign Out
      </button>
    </div>
  );
}
