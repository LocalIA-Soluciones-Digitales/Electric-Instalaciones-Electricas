const badges = [
  { icon: "ri-shield-check-line", label: "Instalador autorizado" },
  { icon: "ri-timer-flash-line", label: "Respuesta en menos de 1 hora" },
  { icon: "ri-price-tag-3-line", label: "Presupuesto sin compromiso" },
  { icon: "ri-moon-clear-line", label: "Disponible 24h, 365 días" },
];

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-2 divide-x divide-y divide-white/10 border border-white/10 sm:grid-cols-4 sm:divide-y-0">
      {badges.map((b) => (
        <div key={b.label} className="flex flex-col gap-3 p-5 md:p-6">
          <span className="h-px w-6 bg-electric-400"></span>
          <div className="flex items-center gap-2.5">
            <i className={`${b.icon} text-base text-electric-400`} aria-hidden="true"></i>
            <span className="text-xs font-bold uppercase tracking-[0.06em] text-white/70 md:text-sm">
              {b.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
