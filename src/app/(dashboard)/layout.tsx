import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import SidebarProfile from "@/components/SidebarProfile";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="dashboard-layout">
      <nav className="sidebar">
        <div className="sidebar-brand">
          Titan<span>Bot</span>
        </div>
        <div className="sidebar-nav">
          <a href="/signals" className="nav-item">
            Signals Config
          </a>
          <a href="/workers" className="nav-item">
            Workers
          </a>
          <a href="/users" className="nav-item">
            Users
          </a>
          <a href="/wallets" className="nav-item">
            Wallets
          </a>
          <a href="/wallet-exchange-apis" className="nav-item">
            Exchange APIs
          </a>
        </div>
        <div className="sidebar-footer">
          <SidebarProfile username={user.username} />
        </div>
      </nav>
      <main className="main-content">{children}</main>
    </div>
  );
}
