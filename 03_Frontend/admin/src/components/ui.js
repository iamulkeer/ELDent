import React, { useEffect } from "react";

const cx = (...a) => a.filter(Boolean).join(" ");

export function Button({ variant = "primary", size = "md", loading, fullWidth, className, children, ...rest }) {
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700",
    secondary: "bg-white text-primary-600 border border-primary-600 hover:bg-primary-50",
    success: "bg-accent-500 text-white hover:bg-accent-600",
    danger: "bg-danger text-white hover:opacity-90",
    ghost: "bg-transparent text-primary-600 hover:bg-primary-50",
  };
  const sizes = { sm: "h-8 px-3", md: "h-10 px-4", lg: "h-12 px-6" };
  return (
    <button
      {...rest}
      disabled={rest.disabled || loading}
      className={cx("inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition-colors",
        "disabled:opacity-50 disabled:cursor-not-allowed", variants[variant], sizes[size], fullWidth && "w-full", className)}
    >
      {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />}
      {children}
    </button>
  );
}

export function Input({ label, error, hint, required, as = "input", className, children, ...rest }) {
  const Tag = as;
  return (
    <label className={cx("block mb-4", className)}>
      {label && <span className="mb-1 block text-sm font-medium">{label}{required && <span className="text-danger"> *</span>}</span>}
      <Tag {...rest} required={required}
        className={cx("w-full rounded-md border bg-white px-3 text-sm focus:border-primary-500 focus:outline-none",
          as === "textarea" ? "py-2" : "h-10", error ? "border-danger" : "border-line")}>
        {children}
      </Tag>
      {hint && !error && <span className="mt-1 block text-xs text-muted">{hint}</span>}
      {error && <span className="mt-1 block text-xs text-danger" aria-live="polite">{error}</span>}
    </label>
  );
}

export function Card({ hoverable, selected, className, children, ...rest }) {
  return (
    <div {...rest} className={cx("rounded-xl border bg-white p-6 shadow-card",
      selected ? "border-primary-600 bg-primary-50" : "border-line",
      hoverable && "transition hover:-translate-y-0.5 hover:shadow-md cursor-pointer", className)}>
      {children}
    </div>
  );
}

export function Modal({ open, title, onClose, footer, size = "md", children }) {
  useEffect(() => {
    if (!open) return;
    const h = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, onClose]);
  if (!open) return null;
  const widths = { sm: "max-w-sm", md: "max-w-xl", lg: "max-w-3xl" };
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-primary-900/45 p-0 sm:items-center sm:p-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}
        className={cx("w-full rounded-t-2xl bg-white p-6 shadow-modal sm:rounded-2xl", widths[size])}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} aria-label="Bağla" className="h-8 w-8 rounded-md text-xl text-muted hover:bg-primary-50">×</button>
        </div>
        {children}
        {footer && <div className="mt-4 flex justify-end gap-2 border-t border-line pt-4">{footer}</div>}
      </div>
    </div>
  );
}

const STATUS = {
  pending: ["Gözləyir", "bg-yellow-100 text-yellow-800"],
  confirmed: ["Təsdiqlənib", "bg-primary-100 text-primary-700"],
  completed: ["Tamamlanıb", "bg-accent-50 text-accent-600"],
  cancelled: ["Ləğv edilib", "bg-red-100 text-danger"],
};
export const STATUS_LABELS = Object.fromEntries(Object.entries(STATUS).map(([k, v]) => [k, v[0]]));
export function StatusBadge({ status }) {
  const [label, cls] = STATUS[status] || [status, "bg-gray-100"];
  return <span className={cx("inline-block rounded-full px-2.5 py-0.5 text-xs font-medium", cls)}>{label}</span>;
}

export function Alert({ type = "error", children }) {
  if (!children) return null;
  const cls = type === "success" ? "border-accent-500 bg-accent-50" : "border-danger bg-red-50";
  return <div role="alert" className={cx("mb-4 rounded-md border-l-4 px-3 py-2 text-sm", cls)}>{children}</div>;
}

export function EmptyState({ children }) {
  return <div className="rounded-xl border border-dashed border-line bg-white p-8 text-center text-muted">{children}</div>;
}

export const money = (v) => `${Number(v).toFixed(0)} ₼`;
export const fmtDate = (iso) =>
  new Date(iso).toLocaleString("az-AZ", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
export const initials = (name = "") => name.split(" ").filter(Boolean).slice(0, 2).map((s) => s[0]).join("").toUpperCase();
export const errText = (e) => {
  const d = e?.response?.data?.detail;
  if (typeof d === "string") return d;
  if (Array.isArray(d)) return d.map((x) => x.msg).join("; ");
  return "Server ilə əlaqə qurulmadı";
};
