import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth";
import { Alert, Button, Card, Input, errText } from "../components/ui";

export default function AuthPage({ initialMode = "login" }) {
  const { user, login, register } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const [mode, setMode] = useState(initialMode);
  const [f, setF] = useState({ full_name: "", email: "", phone: "", password: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const to = loc.state?.from || "/";

  if (user) return <Navigate to={to} replace />;

  const submit = async (e) => {
    e.preventDefault(); setErr(""); setBusy(true);
    try {
      if (mode === "login") await login(f.email, f.password);
      else await register(f);
      nav(to, { replace: true });
    } catch (ex) {
      setErr(errText(ex));
    } finally { setBusy(false); }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <Card>
        <div className="mb-6 grid grid-cols-2 rounded-md bg-primary-50 p-1 text-sm font-medium">
          {[["login", "Giriş"], ["register", "Qeydiyyat"]].map(([m, label]) => (
            <button key={m} type="button" onClick={() => { setMode(m); setErr(""); }}
              className={`h-9 rounded ${mode === m ? "bg-white text-primary-600 shadow-card" : "text-muted"}`}>{label}</button>
          ))}
        </div>
        <form onSubmit={submit}>
          {mode === "register" && <Input label="Ad və soyad" required value={f.full_name} onChange={set("full_name")} minLength={2} />}
          <Input label="E-poçt" type="email" required value={f.email} onChange={set("email")} />
          {mode === "register" && <Input label="Telefon" type="tel" placeholder="+994 50 000 00 00" value={f.phone} onChange={set("phone")} />}
          <Input label="Parol" type="password" required minLength={6} value={f.password} onChange={set("password")}
            hint={mode === "register" ? "Minimum 6 simvol" : undefined} />
          <Alert>{err}</Alert>
          <Button type="submit" fullWidth size="lg" loading={busy}>{mode === "login" ? "Daxil ol" : "Qeydiyyatdan keç"}</Button>
        </form>
      </Card>
    </div>
  );
}
