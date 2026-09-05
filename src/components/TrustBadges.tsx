const badges = [
  { icon: "ri-shield-check-line", label: "Instalador autorizado" },
  { icon: "ri-timer-flash-line", label: "Respuesta en menos de 1h" },
  { icon: "ri-price-tag-3-line", label: "Presupuesto sin compromiso" },
  { icon: "ri-moon-clear-line", label: "Disponible 24h, 365 días" },
];

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {badges.map((b) => (
        <div
          key={b.label}
          className="flex flex-col items-center gap-2 rounded-lg border border-white/[0.08] bg-neutral-900/60 p-4 text-center"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-electric-400/15 text-electric-400">
            <i className={`${b.icon} text-lg`} aria-hidden="true"></i>
          </span>
          <span className="text-sm font-semibold text-white/70">{b.label}</span>
        </div>
      ))}
    </div>
  );
}
