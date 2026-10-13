import React from "react";
import { Card, Button, initials } from "./ui";

export default function DoctorCard({ doctor, selected, onSelect, actionLabel = "Randevu götür" }) {
  return (
    <Card selected={selected} hoverable={!!onSelect} onClick={onSelect}>
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary-100 text-lg font-semibold text-primary-700">
          {initials(doctor.full_name)}
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold leading-tight">{doctor.full_name}</h3>
          <p className="text-sm font-medium text-primary-600">{doctor.specialty}</p>
          <p className="text-xs text-muted">{doctor.experience_years} il təcrübə</p>
        </div>
      </div>
      {doctor.bio && <p className="mt-3 line-clamp-2 text-sm text-muted">{doctor.bio}</p>}
      {onSelect && (
        <Button className="mt-4" variant={selected ? "success" : "primary"} fullWidth
          onClick={(e) => { e.stopPropagation(); onSelect(); }}>
          {selected ? "Seçildi ✓" : actionLabel}
        </Button>
      )}
    </Card>
  );
}
