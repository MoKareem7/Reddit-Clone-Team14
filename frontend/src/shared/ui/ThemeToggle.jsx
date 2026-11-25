import { useTheme } from "../hooks/useTheme";

// "Dark Mode" row for the user dropdown in Navbar.jsx (Reddit puts it there).
export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="dropdown__item"
      role="switch"
      aria-checked={isDark}
      onClick={toggleTheme}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M10.5 2a7.5 7.5 0 1 0 7.47 8.2.75.75 0 0 0-1.17-.68A5 5 0 0 1 9.98 3.2a.75.75 0 0 0-.68-1.17c.4-.02.8-.03 1.2-.03Z" />
      </svg>
      <span>Dark Mode</span>
      <span className={`toggle ${isDark ? "toggle--on" : ""}`} aria-hidden="true" />
    </button>
  );
}
