import React, { useCallback, useEffect, useState } from "react";
import api from "../api";
import { useAuth } from "../auth";
import { Alert, Button, Card, EmptyState, Input, StatusBadge, errText, fmtDate } from "../components/ui";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({ full_name: user.full_name, phone: user.phone || "" });
  const [msg, setMsg] = useState({ ok: "", err: "" });
  const [appts, setAppts] = useState(null);

  const load = useCallback(() => api.get("/appointments").then((r) => setAppts(r.data)).catch(() => setAppts([])), []);
  useEffect(() => { load(); }, [load]);

  const save = async (e) => {
    e.preventDefault(); setMsg({ ok: "", err: "" });
    try {
      const { data } = await api.put("/auth/me", form);
      setUser(data); setMsg({ ok: "Profil yeniləndi", err: "" });
    } catch (ex) { setMsg({ ok: "", err: errText(ex) }); }
  };

  const cancel = async (id) => {
    if (!window.confirm("Randevunu ləğv etmək istəyirsiniz?")) return;
    try { await api.delete(`/appointments/${id}`); load(); } catch (ex) { setMsg({ ok: "", err: errText(ex) }); }
  };

  return (
    <div className="mx-auto grid max-w-[1120px] gap-8 px-4 py-10 md:px-6 lg:grid-cols-3">
      <Card className="h-fit">
        <h2 className="mb-4 text-lg font-semibold">Profil</h2>
        <form onSubmit={save}>
          <Input label="E-poçt" value={user.email} disabled readOnly />
          <Input label="Ad və soyad" required minLength={2} value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
          <Input label="Telefon" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <Alert>{msg.err}</Alert>
          <Alert type="success">{msg.ok}</Alert>
          <Button type="submit" fullWidth>Yadda saxla</Button>
        </form>
      </Card>

      <div className="lg:col-span-2">
        <h2 className="mb-4 text-lg font-semibold">Mənim randevularım</h2>
        {appts === null ? <p className="text-muted">Yüklənir...</p> : appts.length === 0 ? (
          <EmptyState>Hələ randevunuz yoxdur.</EmptyState>
        ) : (
          <div className="space-y-3">
            {appts.map((a) => (
              <Card key={a.id} className="flex flex-wrap items-center justify-between gap-3 !p-4">
                <div>
                  <p className="font-semibold">{a.service?.name} <StatusBadge status={a.status} /></p>
                  <p className="text-sm text-muted">{a.doctor?.full_name} · {fmtDate(a.start_time)}</p>
                </div>
                {(a.status === "pending" || a.status === "confirmed") && (
                  <Button variant="danger" size="sm" onClick={() => cancel(a.id)}>Ləğv et</Button>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
