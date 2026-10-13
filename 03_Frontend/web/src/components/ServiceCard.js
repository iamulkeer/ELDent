import React from "react";
import { Card, Button, money } from "./ui";

export default function ServiceCard({ service, selected, onSelect }) {
  return (
    <Card selected={selected} hoverable={!!onSelect} onClick={onSelect}>
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent-50 text-xl">🦷</div>
      <h3 className="text-lg font-semibold">{service.name}</h3>
      {service.description && <p className="mt-1 text-sm text-muted">{service.description}</p>}
      <div className="mt-3 flex gap-2">
        <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium">{service.duration_minutes} dəq</span>
        <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-900">{money(service.price)}</span>
      </div>
      {onSelect && (
        <Button className="mt-4" variant={selected ? "success" : "secondary"} fullWidth
          onClick={(e) => { e.stopPropagation(); onSelect(); }}>
          {selected ? "Seçildi ✓" : "Seç"}
        </Button>
      )}
    </Card>
  );
}
