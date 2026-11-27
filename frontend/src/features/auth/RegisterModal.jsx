import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import "./auth.css";

// Same rules as the backend, checked early so the user gets instant feedback.
// The backend still checks everything — the frontend is never trusted alone.
function validate({ email, username, password }) {
  const errors = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = "Please enter a valid email";
  }
  if (!/^[A-Za-z0-9_-]{3,20}$/.test(username.trim())) {
    errors.username = "3-20 characters: letters, numbers, - and _";
  }
  if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }
  return errors;
}

export default function RegisterModal() {
  const { register, closeAuthModal, openLogin } = useAuth();

  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [errors, setErrors] = useState({});       // errors shown under each box
  const [formError, setFormError] = useState(""); // errors not tied to one box
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeAuthModal();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeAuthModal]);

  // One change handler for all three inputs: update("email"), update("username")...
  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((errs) => ({ ...errs, [field]: undefined }));
    setFormError("");
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // 1. Check on the frontend first
    const found = validate(form);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    // 2. Send to the backend
    setSubmitting(true);
    try {
      await register({
        email: form.email.trim(),
        username: form.username.trim(),
        password: form.password,
      }); // closes the popup on success
    } catch (err) {
      // The backend tells us which box is wrong, e.g. { field: "username" } for "already taken"
      if (err.details?.field) setErrors({ [err.details.field]: err.message });
      else setFormError(err.message);
      setSubmitting(false);
    }
  }

  const fields = [
    { name: "email", label: "Email", type: "email", autoComplete: "email" },
    { name: "username", label: "Username", type: "text", autoComplete: "username", maxLength: 20 },
    { name: "password", label: "Password", type: "password", autoComplete: "new-password" },
  ];

  return (
    <div className="auth-backdrop" onMouseDown={(e) => e.target === e.currentTarget && closeAuthModal()}>
      <div className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="register-title">
        <button type="button" className="auth-close" onClick={closeAuthModal} aria-label="Close">
          ✕
        </button>

        <h2 id="register-title" className="auth-title">Sign Up</h2>
        <p className="auth-legal">
          By continuing, you agree to our User Agreement and acknowledge that you understand the Privacy Policy.
        </p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {fields.map((f, i) => (
            <label key={f.name} className="auth-field">
              <span className="auth-label">{f.label} <span className="auth-required">*</span></span>
              <input
                className={`auth-input ${errors[f.name] ? "auth-input--error" : ""}`}
                type={f.type}
                autoComplete={f.autoComplete}
                maxLength={f.maxLength}
                autoFocus={i === 0}
                value={form[f.name]}
                onChange={update(f.name)}
              />
              {errors[f.name] && <span className="auth-error">{errors[f.name]}</span>}
            </label>
          ))}

          {formError && <p className="auth-error" role="alert">{formError}</p>}

          <p className="auth-switch">
            Already a redditor?{" "}
            <button type="button" className="auth-link" onClick={openLogin}>
              Log In
            </button>
          </p>

          <button type="submit" className="auth-submit" disabled={submitting}>
            {submitting ? "Signing up…" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}