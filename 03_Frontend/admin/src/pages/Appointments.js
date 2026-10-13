import React, { useCallback, useEffect, useState } from "react";
import api from "../api";
import { Alert, EmptyState, STATUS_LABELS, StatusBadge, errText, fmtDate } from "../components/ui";

export default function Appointments() {
  const [items, setItems] = useState(null);
  const [filter, setFilter] = useState("");
  const [err, setErr] = useState("");

  const load = useCallback(() => {
    api.get("/admin/appointments", { params: filter ? { status_filter: filter } : {} })
      .then((r) => setItems(r.data)).catch((e) => setErr(errText(e)));
  }, [filter]);
  useEffect(() => { load(); }, [load]);

  const setStatus = async (id, status) => {
    setErr("");
    try { await api.patch(`/admin/appointments/${id}/status`, { status }); load(); } catch (e) { setErr(errText(e)); }
  };

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Randevular</h1>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="h-10 rounded-md border border-line bg-white px-3 text-sm">
          <option value="">Bütün statuslar</option>
          {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>
      <Alert>{err}</Alert>
      {items === null ? <p className="text-muted">Yüklənir...</p> : items.length === 0 ? <EmptyState>Randevu tapılmadı.</EmptyState> : (
        <div className="overflow-x-auto rounded-xl border border-line bg-white shadow-card">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-primary-50 text-xs uppercase text-muted">
              <tr>{["#", "Xəstə", "Həkim", "Xidmət", "Vaxt", "Status", "Əməliyyat"].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr>
            </thead>
            <tbody>
              {items.map((a) => (
                <tr key={a.id} className="border-t border-line hover:bg-bg">
                  <td className="px-4 py-3">{a.id}</td>
                  <td className="px-4 py-3"><b>{a.user?.full_name}</b><br /><span className="text-xs text-muted">{a.user?.email}</span></td>
                  <td className="px-4 py-3">{a.doctor?.full_name}</td>
                  <td className="px-4 py-3">{a.service?.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{fmtDate(a.start_time)}</td>
                  <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                  <td className="px-4 py-3">
                    <select value={a.status} onChange={(e) => setStatus(a.id, e.target.value)} className="h-8 rounded-md border border-line bg-white px-2 text-xs">
                      {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
