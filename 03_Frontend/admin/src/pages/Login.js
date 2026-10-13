import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth";
import { Alert, Button, Card, Input, errText } from "../components/ui";

export default function Login() {
  const { user, login } = useAuth();
  const [f, setF] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  if (user) return <Navigate to="/" replace />;

  const submit = async (e) => {
    e.preventDefault(); setErr(""); setBusy(true);
    try { await login(f.email, f.password); } catch (ex) { setErr(errText(ex)); } finally { setBusy(false); }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-600 to-primary-900 px-4">
      <Card className="w-full max-w-sm">
        <h1 className="mb-1 text-2xl font-semibold">🦷 ELDent Admin</h1>
        <p className="mb-6 text-sm text-muted">İdarəetmə panelinə giriş</p>
        <form onSubmit={submit}>
          <Input label="E-poçt" type="email" required value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
          <Input label="Parol" type="password" required value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
          <Alert>{err}</Alert>
          <Button type="submit" fullWidth size="lg" loading={busy}>Daxil ol</Button>
        </form>
      </Card>
    </div>
  );
}
