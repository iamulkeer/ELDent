import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { Button } from "../components/ui";
import DoctorCard from "../components/DoctorCard";
import ServiceCard from "../components/ServiceCard";

export default function Home() {
  const nav = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  useEffect(() => {
    api.get("/doctors").then((r) => setDoctors(r.data.slice(0, 3))).catch(() => {});
    api.get("/services").then((r) => setServices(r.data)).catch(() => {});
  }, []);

  return (
    <>
      <section className="bg-gradient-to-br from-primary-600 to-primary-900 text-white">
        <div className="mx-auto max-w-[1120px] px-4 py-16 md:px-6 md:py-24">
          <h1 className="max-w-2xl text-3xl font-bold leading-tight md:text-5xl">Gülüşünüz üçün etibarlı həkim — bir neçə kliklə</h1>
          <p className="mt-4 max-w-xl text-primary-100">Həkimi və xidməti seçin, sizə uyğun vaxtı rezerv edin. Növbə gözləmədən, 24/7 onlayn.</p>
          <Link to="/book"><Button size="lg" variant="success" className="mt-8">Randevu götür</Button></Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-4 py-12 md:px-6">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Xidmətlərimiz</h2>
          <Link to="/services" className="text-sm font-medium text-primary-600 hover:underline">Hamısına bax →</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => <ServiceCard key={s.id} service={s} />)}
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-4 pb-16 md:px-6">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Həkimlərimiz</h2>
          <Link to="/doctors" className="text-sm font-medium text-primary-600 hover:underline">Hamısına bax →</Link>
        </div>
        {doctors.length === 0 ? (
          <p className="text-muted">Həkim məlumatları tezliklə əlavə olunacaq.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((d) => <DoctorCard key={d.id} doctor={d} actionLabel="Randevu götür"
              onSelect={() => nav(`/book?doctor=${d.id}`)} />)}
          </div>
        )}
      </section>
    </>
  );
}
