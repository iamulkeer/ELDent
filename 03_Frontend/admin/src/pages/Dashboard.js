import React, { useEffect, useState } from "react";
import api from "../api";
import { Alert, Card, STATUS_LABELS, StatusBadge, errText, fmtDate } from "../components/ui";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    api.get("/admin/stats").then((r) => setStats(r.data)).catch((e) => setErr(errText(e)));
    api.get("/admin/appointments").then((r) => setRecent(r.data.slice(0, 5))).catch(() => {});
  }, []);

  if (err) return <Alert>{err}</Alert>;
  if (!stats) return <p className="text-muted">Yüklənir...</p>;

  const cards = [
    ["Xəstələr", stats.users, "🧑"], ["Həkimlər", stats.doctors, "👨‍⚕️"], ["Xidmətlər", stats.services, "🦷"],
    ["Randevular", stats.appointments, "📅"], ["Gələcək randevular", stats.upcoming, "⏰"],
  ];
  const total = Math.max(stats.appointments, 1);
  const colors = { pending: "bg-warning", confirmed: "bg-primary-600", completed: "bg-accent-500", cancelled: "bg-danger" };

  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold">Dashboard</h1>
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map(([label, value, icon]) => (
          <Card key={label} className="!p-4">
            <div className="text-2xl">{icon}</div>
            <div className="mt-2 font-display text-3xl font-bold text-primary-900">{value}</div>
            <div className="text-sm text-muted">{label}</div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-lg font-semibold">Statuslar üzrə bölgü</h2>
          {Object.entries(stats.by_status).map(([st, n]) => (
            <div key={st} className="mb-3">
              <div className="mb-1 flex justify-between text-sm"><span>{STATUS_LABELS[st]}</span><b>{n}</b></div>
              <div className="h-2 rounded-full bg-primary-50">
                <div className={`h-2 rounded-full ${colors[st]}`} style={{ width: `${(n / total) * 100}%` }} />
              </div>
            </div>
          ))}
        </Card>
        <Card>
          <h2 className="mb-4 text-lg font-semibold">Son randevular</h2>
          {recent.length === 0 ? <p className="text-sm text-muted">Randevu yoxdur.</p> : recent.map((a) => (
            <div key={a.id} className="flex items-center justify-between border-b border-line py-2 text-sm last:border-0">
              <div><b>{a.user?.full_name}</b><br /><span className="text-muted">{a.doctor?.full_name} · {fmtDate(a.start_time)}</span></div>
              <StatusBadge status={a.status} />
            </div>
          ))}
        </Card>
      </div>
    </>
  );
}
