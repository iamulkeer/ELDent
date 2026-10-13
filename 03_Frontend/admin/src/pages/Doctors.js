import React from "react";
import Crud from "../components/Crud";

export default function Doctors() {
  return (
    <Crud
      title="Həkimlər" endpoint="/doctors" empty="Hələ həkim əlavə olunmayıb."
      newItem={{ full_name: "", specialty: "", experience_years: 0, bio: "" }}
      confirmText={(d) => `${d.full_name} adlı həkim silinsin?`}
      columns={[
        { key: "id", label: "#" }, { key: "full_name", label: "Ad və soyad" }, { key: "specialty", label: "İxtisas" },
        { key: "experience_years", label: "Təcrübə", render: (d) => `${d.experience_years} il` },
      ]}
      fields={[
        { key: "full_name", label: "Ad və soyad", required: true },
        { key: "specialty", label: "İxtisas", required: true },
        { key: "experience_years", label: "Təcrübə (il)", type: "number", min: 0 },
        { key: "bio", label: "Haqqında", type: "textarea" },
      ]}
    />
  );
}
