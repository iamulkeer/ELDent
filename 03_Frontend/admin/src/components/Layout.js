import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth";
import { Button } from "./ui";

const items = [
  ["/", "📊", "Dashboard", true],
  ["/appointments", "📅", "Randevular"],
  ["/doctors", "👨‍⚕️", "Həkimlər"],
  ["/services", "🦷", "Xidmətlər"],
];

export default function Layout() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const link = ({ isActive }) =>
    `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${isActive ? "bg-white/15 text-white" : "text-primary-100 hover:bg-white/10"}`;

  return (
    <div className="min-h-screen md:flex">
      <aside className={`${open ? "block" : "hidden"} bg-primary-900 p-4 md:block md:w-60 md:shrink-0`}>
        <div className="mb-6 px-3 font-display text-xl font-bold text-white">🦷 ELDent <span className="text-xs font-normal text-primary-100">Admin</span></div>
        <nav className="space-y-1">
          {items.map(([to, icon, label, end]) => (
            <NavLink key={to} to={to} end={end} className={link} onClick={() => setOpen(false)}><span>{icon}</span>{label}</NavLink>
          ))}
        </nav>
      </aside>
      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-line bg-white px-4 py-3 md:px-8">
          <button className="h-10 w-10 rounded-md text-2xl md:hidden" aria-label="Menyu" onClick={() => setOpen(!open)}>☰</button>
          <span className="hidden text-sm text-muted md:block">Klinika idarəetmə paneli</span>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">{user.full_name}</span>
            <Button variant="secondary" size="sm" onClick={() => { logout(); nav("/login"); }}>Çıxış</Button>
          </div>
        </header>
        <main className="p-4 md:p-8"><Outlet /></main>
      </div>
    </div>
  );
}
