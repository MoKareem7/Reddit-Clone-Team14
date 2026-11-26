
import { useState } from "react";
import {
  Search,
  Plus,
  Menu,
  CircleUserRound
} from "lucide-react";

import ThemeToggle from "../ui/ThemeToggle";

export default function Navbar({ onMenuClick }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className={`navbar ${searchOpen ? "navbar--search-open" : ""}`}>

      {/* Left: menu and logo */}
      <div className="navbar__left">
        <button
          type="button"
          className="navbar__menu-btn"
          onClick={onMenuClick}
          aria-label="Open sidebar"
        >
          <Menu />
        </button>

        <a href="/" className="navbar__logo">
          <svg className="navbar__logo-icon" viewBox="0 0 32 32" aria-hidden="true">
            <circle cx="16" cy="16" r="16" fill="currentColor" />
            <text x="16" y="23" textAnchor="middle" fontSize="23" fontWeight="bold" fill="white">r</text>
          </svg>
          <span className="navbar__logo-text">reddit</span>
        </a>
      </div>

      {/* Center: search */}
      <form
        className="navbar__search"
        role="search"
        onSubmit={(e) => e.preventDefault()}
      >
        <Search className="navbar__search-icon" />

        <input
          className="navbar__search-input"
          type="search"
          placeholder="Search Reddit"
          aria-label="Search Reddit"
        />
      </form>

      {/* Right: buttons */}
      <div className="navbar__right">
        <button
          type="button"
          className="navbar__search-toggle"
          aria-label="Toggle search"
          onClick={() => setSearchOpen(!searchOpen)}
        >
          <Search />
        </button>

        <a href="/posts/new" className="navbar__icon-btn">
          <Plus />
          <span>Create</span>
        </a>

        <a
          href="/login"
          className="navbar__btn navbar__btn--primary"
        >
          Log In
        </a>

        <button
          type="button"
          className="navbar__user"
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          aria-label="User menu"
          aria-expanded={userMenuOpen}
        >
          <CircleUserRound className="navbar__avatar" />
        </button>

        {userMenuOpen && (
          <div className="navbar__dropdown">
            <ThemeToggle />
          </div>
        )}
      </div>
    </header>
  );
}
