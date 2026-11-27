import { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "./authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);            // the logged-in user, or null
  const [loading, setLoading] = useState(true);      // true while checking on page load
  const [authModal, setAuthModal] = useState(null);  // null | "login" | "register"

  // When the app opens: is there already a valid login cookie?
  useEffect(() => {
    authApi
      .getMe()
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))        // 401 = not logged in, that's fine
      .finally(() => setLoading(false));
  }, []);

  async function login(credentials) {
    const data = await authApi.login(credentials); // wrong password → throws → the form shows it
    setUser(data.user);
    setAuthModal(null);                            // close the popup
  }

  async function register(details) {
    const data = await authApi.register(details);
    setUser(data.user);
    setAuthModal(null);
  }

  async function logout() {
    try {
      await authApi.logout();
    } finally {
      setUser(null); // logged out on screen even if the request failed
    }
  }

  const value = {
    user,
    loading,
    isLoggedIn: !!user,
    setUser,                                   // used after "Edit profile"
    login,
    register,
    logout,
    authModal,
    openLogin: () => setAuthModal("login"),
    openRegister: () => setAuthModal("register"),
    closeAuthModal: () => setAuthModal(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Use in any component:  const { user, isLoggedIn, openLogin, logout } = useAuth();
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}