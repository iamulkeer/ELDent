import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "../api";
import { useAuth } from "../auth";
import { Alert, Button, Card, Input, errText, fmtDate, money } from "../components/ui";
import DoctorCard from "../components/DoctorCard";
import ServiceCard from "../components/ServiceCard";
import DatePicker from "../components/DatePicker";

export default function Booking() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [params] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [doctorId, setDoctorId] = useState(Number(params.get("doctor")) || null);
  const [serviceId, setServiceId] = useState(Number(params.get("service")) || null);
  const [start, setStart] = useState("");
  const [notes, setNotes] = useState("");
  const [err, setErr] = useState("");
  const [done, setDone] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api.get("/doctors").then((r) => setDoctors(r.data)).catch(() => {});
    api.get("/services").then((r) => setServices(r.data)).catch(() => {});
  }, []);

  const service = services.find((s) => s.id === serviceId);
  const doctor = doctors.find((d) => d.id === doctorId);

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="mb-3 text-2xl font-semibold">Randevu götürmək üçün daxil olun</h1>
        <p className="mb-6 text-muted">Hesabınız yoxdursa, qeydiyyatdan keçin — bu, cəmi bir dəqiqə çəkir.</p>
        <Link to="/login" state={{ from: "/book" }}><Button size="lg">Giriş / Qeydiyyat</Button></Link>
      </div>
    );
  }

  const submit = async () => {
    setErr(""); setBusy(true);
    try {
      const { data } = await api.post("/appointments", { doctor_id: doctorId, service_id: serviceId, start_time: start, notes: notes || null });
      setDone(data);
    } catch (e) {
      const msg = errText(e);
      setErr(e.response?.status === 409 ? "Bu vaxt həkim üçün artıq tutulub. Başqa vaxt seçin." : msg);
    } finally { setBusy(false); }
  };

  if (done) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <Card className="text-center">
          <div className="mb-2 text-4xl">✅</div>
          <h1 className="mb-2 text-2xl font-semibold">Randevunuz uğurla yaradıldı</h1>
          <p className="text-muted">{done.doctor?.full_name} · {done.service?.name}</p>
          <p className="mb-6 font-semibold">{fmtDate(done.start_time)}</p>
          <div className="flex justify-center gap-3">
            <Button onClick={() => nav("/profile")}>Randevularım</Button>
            <Button variant="secondary" onClick={() => { setDone(null); setStart(""); }}>Yeni randevu</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1120px] px-4 py-10 md:px-6">
      <h1 className="mb-8 text-3xl font-semibold">Randevu götür</h1>

      <h2 className="mb-3 text-lg font-semibold">1. Həkim seçin</h2>
      {doctors.length === 0 ? <p className="mb-8 text-muted">Hələlik həkim yoxdur.</p> : (
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((d) => <DoctorCard key={d.id} doctor={d} selected={d.id === doctorId} actionLabel="Seç" onSelect={() => setDoctorId(d.id)} />)}
        </div>
      )}

      <h2 className="mb-3 text-lg font-semibold">2. Xidmət seçin</h2>
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => <ServiceCard key={s.id} service={s} selected={s.id === serviceId} onSelect={() => { setServiceId(s.id); setStart(""); }} />)}
      </div>

      <h2 className="mb-3 text-lg font-semibold">3. Tarix və vaxt</h2>
      <Card className="mb-6 max-w-xl">
        <DatePicker value={start} onChange={setStart} duration={service?.duration_minutes || 30} />
        <Input as="textarea" label="Qeyd (istəyə bağlı)" rows={2} maxLength={500} value={notes} onChange={(e) => setNotes(e.target.value)} />
        {doctor && service && start && (
          <p className="mb-4 rounded-md bg-primary-50 p-3 text-sm">
            <b>{doctor.full_name}</b> · {service.name} · {service.duration_minutes} dəq · {money(service.price)}<br />
            {fmtDate(start)}
          </p>
        )}
        <Alert>{err}</Alert>
        <Button size="lg" fullWidth loading={busy} disabled={!doctorId || !serviceId || !start} onClick={submit}>Randevunu təsdiqlə</Button>
      </Card>
    </div>
  );
}
