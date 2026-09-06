import { business } from "@/lib/business";

const initials = business.owner
  .split(" ")
  .map((w) => w[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();

type Pill = { icon: string; label: string };

export default function AboutPro() {
  const { credentials, reviews } = business;
  const pills: Pill[] = [
    credentials.license
      ? { icon: "ri-shield-check-line", label: `Instalador autorizado ${credentials.license}` }
      : null,
    credentials.insurance ? { icon: "ri-file-shield-2-line", label: credentials.insurance } : null,
    credentials.foundedYear
      ? { icon: "ri-calendar-check-line", label: `Desde ${credentials.foundedYear} en Barakaldo` }
      : null,
  ].filter((p): p is Pill => p !== null);

  return (
    <section aria-label="Sobre el profesional" className="border-y border-white/[0.06] bg-neutral-900/40 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between md:px-6">
        <div className="flex items-center gap-4">
          {/* Avatar de iniciales: sustituir por foto real del profesional en cuanto esté disponible */}
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-electric-400/15 text-lg font-extrabold text-electric-400">
            {initials}
          </span>
          <div>
            <p className="font-display text-base font-bold text-white">{business.owner}</p>
            <p className="text-sm text-white/50">Electricista responsable · {business.address.city}, {business.address.region}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {pills.map((p) => (
            <span
              key={p.label}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-neutral-950/40 px-4 py-2 text-xs font-semibold text-white/70"
            >
              <i className={`${p.icon} text-electric-400`} aria-hidden="true"></i>
              {p.label}
            </span>
          ))}

          {reviews.googleUrl && reviews.rating && (
            <a
              href={reviews.googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-electric-400/30 bg-electric-400/10 px-4 py-2 text-xs font-bold text-electric-400 transition-colors duration-200 hover:bg-electric-400/20"
            >
              <i className="ri-google-fill" aria-hidden="true"></i>
              {reviews.rating} en Google{reviews.count ? ` · ${reviews.count} reseñas` : ""}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
