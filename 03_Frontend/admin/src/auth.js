import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import api, { TOKEN_KEY } from "./api";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!localStorage.getItem(TOKEN_KEY));

  const loadMe = useCallback(async () => {
    if (!localStorage.getItem(TOKEN_KEY)) { setUser(null); setLoading(false); return null; }
    try {
      const { data } = await api.get("/auth/me");
      if (data.role !== "admin") throw new Error("not admin");
      setUser(data);
      return data;
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
      return null;
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { loadMe(); }, [loadMe]);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem(TOKEN_KEY, data.access_token);
    const me = await loadMe();
    if (!me) throw { response: { data: { detail: "Bu hesab administrator deyil" } } };
  };

  const logout = () => { localStorage.removeItem(TOKEN_KEY); setUser(null); };

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
}
