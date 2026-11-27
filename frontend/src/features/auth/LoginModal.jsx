import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import "./auth.css";

export default function LoginModal() {
  const { login, closeAuthModal, openRegister } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Close with the Esc key
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeAuthModal();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeAuthModal]);

  async function handleSubmit(e) {
    e.preventDefault(); // stop the browser from reloading the page
    setError("");
    setSubmitting(true);
    try {
      await login({ identifier: identifier.trim(), password }); // closes the popup on success
    } catch (err) {
      setError(err.message); // e.g. "Invalid username or password"
      setSubmitting(false);
    }
  }

  const canSubmit = identifier.trim() !== "" && password !== "" && !submitting;

  return (
    // Clicking the dark background (but not the box) closes the popup
    <div className="auth-backdrop" onMouseDown={(e) => e.target === e.currentTarget && closeAuthModal()}>
      <div className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="login-title">
        <button type="button" className="auth-close" onClick={closeAuthModal} aria-label="Close">
          ✕
        </button>

        <h2 id="login-title" className="auth-title">Log In</h2>
        <p className="auth-legal">
          By continuing, you agree to our User Agreement and acknowledge that you understand the Privacy Policy.
        </p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label className="auth-field">
            <span className="auth-label">Email or username <span className="auth-required">*</span></span>
            <input
              className="auth-input"
              type="text"
              autoComplete="username"
              autoFocus
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                setError("");
              }}
            />
          </label>

          <label className="auth-field">
            <span className="auth-label">Password <span className="auth-required">*</span></span>
            <input
              className={`auth-input ${error ? "auth-input--error" : ""}`}
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
          </label>

          {error && <p className="auth-error" role="alert">{error}</p>}

          <p className="auth-switch">
            New to Reddit?{" "}
            <button type="button" className="auth-link" onClick={openRegister}>
              Sign Up
            </button>
          </p>

          <button type="submit" className="auth-submit" disabled={!canSubmit}>
            {submitting ? "Logging in…" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}