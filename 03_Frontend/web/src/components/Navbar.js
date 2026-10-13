import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth";
import { Button } from "./ui";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const link = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium ${isActive ? "bg-primary-50 text-primary-600" : "text-ink hover:bg-primary-50"}`;
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="font-display text-xl font-bold text-primary-600" onClick={close}>🦷 ELDent</Link>
        <button className="h-10 w-10 rounded-md text-2xl md:hidden" aria-label="Menyu" onClick={() => setOpen(!open)}>☰</button>
        <nav className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-full flex-col gap-1 border-b border-line bg-white p-4 md:static md:flex md:flex-row md:items-center md:border-0 md:p-0`}>
          <NavLink to="/" end className={link} onClick={close}>Ana səhifə</NavLink>
          <NavLink to="/doctors" className={link} onClick={close}>Həkimlər</NavLink>
          <NavLink to="/services" className={link} onClick={close}>Xidmətlər</NavLink>
          <NavLink to="/book" className={link} onClick={close}>Randevu</NavLink>
          <div className="mt-2 flex gap-2 md:ml-4 md:mt-0">
            {user ? (
              <>
                <Button variant="secondary" size="sm" onClick={() => { close(); nav("/profile"); }}>{user.full_name.split(" ")[0]}</Button>
                <Button variant="ghost" size="sm" onClick={() => { logout(); close(); nav("/"); }}>Çıxış</Button>
              </>
            ) : (
              <Button size="sm" onClick={() => { close(); nav("/login"); }}>Giriş / Qeydiyyat</Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
