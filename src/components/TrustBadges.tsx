const badges = [
  { icon: "🛡️", label: "Instalador autorizado" },
  { icon: "⏱️", label: "Respuesta en menos de 1h" },
  { icon: "💬", label: "Presupuesto sin compromiso" },
  { icon: "🌙", label: "Disponible 24h, 365 días" },
];

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {badges.map((b) => (
        <div
          key={b.label}
          className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 bg-white p-4 text-center shadow-sm"
        >
          <span className="text-2xl">{b.icon}</span>
          <span className="text-sm font-semibold text-slate-700">{b.label}</span>
        </div>
      ))}
    </div>
  );
}
