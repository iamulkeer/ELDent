import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import DoctorCard from "../components/DoctorCard";
import { EmptyState } from "../components/ui";

export default function Doctors() {
  const [doctors, setDoctors] = useState(null);
  const nav = useNavigate();
  useEffect(() => { api.get("/doctors").then((r) => setDoctors(r.data)).catch(() => setDoctors([])); }, []);

  return (
    <div className="mx-auto max-w-[1120px] px-4 py-10 md:px-6">
      <h1 className="mb-6 text-3xl font-semibold">Həkimlər</h1>
      {doctors === null ? <p className="text-muted">Yüklənir...</p> : doctors.length === 0 ? (
        <EmptyState>Hələlik həkim əlavə olunmayıb.</EmptyState>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((d) => <DoctorCard key={d.id} doctor={d} onSelect={() => nav(`/book?doctor=${d.id}`)} />)}
        </div>
      )}
    </div>
  );
}
