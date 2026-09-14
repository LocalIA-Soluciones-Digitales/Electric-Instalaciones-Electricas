import { business } from "@/lib/business";

// "Instalador autorizado" sin el nº de licencia detrás era una afirmación no
// verificable en la página; solo se muestra en cuanto business.credentials.license
// tenga el dato real (mismo criterio que los pills de AboutPro.tsx).
const badges = [
  business.credentials.license
    ? { icon: "ri-shield-check-line", label: `Instalador autorizado ${business.credentials.license}` }
    : null,
  { icon: "ri-timer-flash-line", label: "Respuesta en menos de 1 hora" },
  { icon: "ri-price-tag-3-line", label: "Presupuesto sin compromiso" },
  { icon: "ri-moon-clear-line", label: "Disponible 24h, 365 días" },
].filter((b): b is { icon: string; label: string } => b !== null);

export default function TrustBadges() {
  const isOdd = badges.length % 2 !== 0;

  return (
    <div
      className={`grid grid-cols-2 gap-4 ${badges.length >= 4 ? "sm:grid-cols-4" : "sm:grid-cols-3"}`}
    >
      {badges.map((b, i) => (
        <div
          key={b.label}
          className={`flex flex-col items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-5 text-center shadow-sm shadow-neutral-900/[0.03] transition-shadow duration-200 hover:shadow-md ${
            isOdd && i === badges.length - 1 ? "col-span-2 sm:col-span-1" : ""
          }`}
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
