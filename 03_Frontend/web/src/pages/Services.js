import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import ServiceCard from "../components/ServiceCard";
import { EmptyState } from "../components/ui";

export default function Services() {
  const [services, setServices] = useState(null);
  const nav = useNavigate();
  useEffect(() => { api.get("/services").then((r) => setServices(r.data)).catch(() => setServices([])); }, []);

  return (
    <div className="mx-auto max-w-[1120px] px-4 py-10 md:px-6">
      <h1 className="mb-6 text-3xl font-semibold">Xidmətlər</h1>
      {services === null ? <p className="text-muted">Yüklənir...</p> : services.length === 0 ? (
        <EmptyState>Xidmət tapılmadı.</EmptyState>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => <ServiceCard key={s.id} service={s} onSelect={() => nav(`/book?service=${s.id}`)} />)}
        </div>
      )}
    </div>
  );
}
