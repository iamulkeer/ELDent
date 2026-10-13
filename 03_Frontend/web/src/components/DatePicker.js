import React from "react";
import { Input } from "./ui";

const pad = (n) => String(n).padStart(2, "0");
export const todayStr = () => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };

// Tarix + vaxt seçimi (30 dəqiqəlik addım, iş saatları daxilində)
export default function DatePicker({ value, onChange, min = todayStr(), workHours = { from: 9, to: 18 }, duration = 30, error }) {
  const [date, time] = value ? value.split("T") : ["", ""];
  const slots = [];
  for (let m = workHours.from * 60; m + duration <= workHours.to * 60; m += 30) slots.push(`${pad(Math.floor(m / 60))}:${pad(m % 60)}`);

  const isPast = (t) => date && new Date(`${date}T${t}`) <= new Date();
  const setDate = (d) => onChange(d ? `${d}T${time || ""}`.replace(/T$/, "") : "");
  const setTime = (t) => onChange(date && t ? `${date}T${t}` : "");

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Input label="Tarix" type="date" min={min} value={date} onChange={(e) => setDate(e.target.value)} required />
      <Input as="select" label="Vaxt" value={time || ""} onChange={(e) => setTime(e.target.value)} required error={error}
        hint={`İş saatları: ${pad(workHours.from)}:00–${pad(workHours.to)}:00`} disabled={!date}>
        <option value="">Vaxt seçin</option>
        {slots.map((t) => <option key={t} value={t} disabled={isPast(t)}>{t}</option>)}
      </Input>
    </div>
  );
}
