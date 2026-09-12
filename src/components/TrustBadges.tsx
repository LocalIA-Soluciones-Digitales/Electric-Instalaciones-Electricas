const badges = [
  { icon: "ri-shield-check-line", label: "Instalador autorizado" },
  { icon: "ri-timer-flash-line", label: "Respuesta en menos de 1 hora" },
  { icon: "ri-price-tag-3-line", label: "Presupuesto sin compromiso" },
  { icon: "ri-moon-clear-line", label: "Disponible 24h, 365 días" },
];

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {badges.map((b) => (
        <div
          key={b.label}
          className="flex flex-col items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-5 text-center shadow-sm shadow-neutral-900/[0.03] transition-shadow duration-200 hover:shadow-md"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-electric-100 text-electric-600">
            <i className={`${b.icon} text-xl`} aria-hidden="true"></i>
          </span>
          <span className="text-sm font-semibold text-neutral-700">{b.label}</span>
        </div>
      ))}
    </div>
  );
}
