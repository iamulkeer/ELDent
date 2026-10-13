import React from "react";
import Crud from "../components/Crud";
import { money } from "../components/ui";

export default function Services() {
  return (
    <Crud
      title="Xidmətlər" endpoint="/services" empty="Hələ xidmət əlavə olunmayıb."
      newItem={{ name: "", description: "", price: 0, duration_minutes: 30 }}
      confirmText={(s) => `${s.name} xidməti silinsin?`}
      columns={[
        { key: "id", label: "#" }, { key: "name", label: "Ad" },
        { key: "duration_minutes", label: "Müddət", render: (s) => `${s.duration_minutes} dəq` },
        { key: "price", label: "Qiymət", render: (s) => money(s.price) },
      ]}
      fields={[
        { key: "name", label: "Ad", required: true },
        { key: "description", label: "Təsvir", type: "textarea" },
        { key: "price", label: "Qiymət (₼)", type: "number", min: 0, step: "1" },
        { key: "duration_minutes", label: "Müddət (dəq)", type: "number", min: 5, step: "5" },
      ]}
    />
  );
}
