import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import api, { TOKEN_KEY } from "./api";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!localStorage.getItem(TOKEN_KEY));

  const loadMe = useCallback(async () => {
    if (!localStorage.getItem(TOKEN_KEY)) { setUser(null); setLoading(false); return; }
    try {
      const { data } = await api.get("/auth/me");
      setUser(data);
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadMe(); }, [loadMe]);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem(TOKEN_KEY, data.access_token);
    await loadMe();
  };

  const register = async (form) => {
    await api.post("/auth/register", form);
    await login(form.email, form.password);
  };

  const logout = () => { localStorage.removeItem(TOKEN_KEY); setUser(null); };

  return <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>{children}</AuthContext.Provider>;
}
