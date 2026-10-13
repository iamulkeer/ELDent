import React, { useCallback, useEffect, useState } from "react";
import api from "../api";
import { Alert, Button, EmptyState, Input, Modal, errText } from "./ui";

/** Ümumi CRUD səhifəsi: cədvəl + əlavə/redaktə modalı + silmə. */
export default function Crud({ title, endpoint, columns, fields, empty, newItem, confirmText }) {
  const [items, setItems] = useState(null);
  const [editing, setEditing] = useState(null); // null | {} (yeni) | item
  const [form, setForm] = useState({});
  const [err, setErr] = useState("");
  const [pageErr, setPageErr] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => api.get(endpoint).then((r) => setItems(r.data)).catch((e) => setPageErr(errText(e))), [endpoint]);
  useEffect(() => { load(); }, [load]);

  const openNew = () => { setForm({ ...newItem }); setEditing({}); setErr(""); };
  const openEdit = (it) => { setForm({ ...it }); setEditing(it); setErr(""); };

  const save = async () => {
    setErr(""); setBusy(true);
    const payload = {};
    fields.forEach((f) => {
      const v = form[f.key];
      payload[f.key] = f.type === "number" ? Number(v) : v === "" ? null : v;
    });
    try {
      if (editing.id) await api.put(`${endpoint}/${editing.id}`, payload);
      else await api.post(endpoint, payload);
      setEditing(null); load();
    } catch (e) { setErr(errText(e)); } finally { setBusy(false); }
  };

  const remove = async (it) => {
    if (!window.confirm(confirmText(it))) return;
    setPageErr("");
    try { await api.delete(`${endpoint}/${it.id}`); load(); } catch (e) { setPageErr(errText(e)); }
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <Button onClick={openNew}>+ Əlavə et</Button>
      </div>
      <Alert>{pageErr}</Alert>
      {items === null ? <p className="text-muted">Yüklənir...</p> : items.length === 0 ? <EmptyState>{empty}</EmptyState> : (
        <div className="overflow-x-auto rounded-xl border border-line bg-white shadow-card">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-primary-50 text-xs uppercase text-muted">
              <tr>{[...columns.map((c) => c.label), "Əməliyyat"].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} className="border-t border-line hover:bg-bg">
                  {columns.map((c) => <td key={c.key} className="px-4 py-3">{c.render ? c.render(it) : it[c.key]}</td>)}
                  <td className="whitespace-nowrap px-4 py-3">
                    <Button size="sm" variant="secondary" onClick={() => openEdit(it)}>Redaktə</Button>{" "}
                    <Button size="sm" variant="danger" onClick={() => remove(it)}>Sil</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.id ? `${title}: redaktə` : `${title}: yeni`}
        footer={<><Button variant="secondary" onClick={() => setEditing(null)}>Ləğv et</Button><Button loading={busy} onClick={save}>Yadda saxla</Button></>}>
        <Alert>{err}</Alert>
        {fields.map((f) => (
          <Input key={f.key} label={f.label} type={f.type === "number" ? "number" : "text"} as={f.type === "textarea" ? "textarea" : "input"}
            rows={3} min={f.min} step={f.step} required={f.required}
            value={form[f.key] ?? ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
        ))}
      </Modal>
    </>
  );
}
