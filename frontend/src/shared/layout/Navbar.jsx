
import { Search, Plus, Menu } from "lucide-react";

export default function Navbar({ onMenuClick }) {
  return (
    <header className="navbar">
      <button
        className="menu-button"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      <a href="/" className="brand">
        <span className="brand-logo">r</span>
        <span className="brand-name">reddit</span>
      </a>

      <div className="search-box">
        <Search size={19} />
        <input
          type="search"
          placeholder="Search Reddit"
          aria-label="Search Reddit"
        />
      </div>

      <div className="navbar-actions">
        <a href="/posts/new" className="create-button">
          <Plus size={19} />
          <span>Create</span>
        </a>

        <a href="/login" className="login-button">
          Log In
        </a>
      </div>
    </header>
  );
}
