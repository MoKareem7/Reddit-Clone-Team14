import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function MainLayout({
  children,
  rightSidebar,
  communities = []
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Navbar
        onMenuClick={() => setMenuOpen(!menuOpen)}
      />

      <div className="app-shell">
        <aside className={
          `left-sidebar ${menuOpen ? "open" : ""}`
        }>
          <Sidebar
            communities={communities}
            onNavigate={() => setMenuOpen(false)}
          />
        </aside>

        {menuOpen && (
          <button
            className="sidebar-overlay"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          />
        )}

        <div className={
          `content-layout ${rightSidebar ? "with-right" : ""}`
        }>
          <main className="main-content">
            {children}
          </main>

          {rightSidebar && (
            <aside className="right-sidebar">
              {rightSidebar}
            </aside>
          )}
        </div>
      </div>
    </>
  );
}
