
import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function MainLayout({
  children,
  rightSidebar,
  communities = []
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="main-layout">
      <Navbar
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="main-layout__body">
        <Sidebar
          communities={communities}
          isOpen={sidebarOpen}
          onNavigate={() => setSidebarOpen(false)}
        />

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <button
            type="button"
            className="main-layout__overlay main-layout__overlay--visible"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          />
        )}

        <main className="main-layout__content">
          <div className="page-grid">
            <div className="page-grid__main">
              {children}
            </div>

            {rightSidebar && (
              <aside className="page-grid__aside">
                {rightSidebar}
              </aside>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
