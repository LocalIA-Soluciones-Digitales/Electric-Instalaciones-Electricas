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

  const hasReview = Boolean(reviews.googleUrl && reviews.rating);
  const hasSecondaryRow = pills.length > 0 || hasReview;

  return (
    <section aria-label="Sobre el profesional" className="border-y border-neutral-200 bg-white py-4 md:py-5">
      <div
        className={`mx-auto flex max-w-6xl flex-col items-center px-4 sm:flex-row md:px-6 ${
          hasSecondaryRow ? "gap-4 sm:justify-between sm:gap-6" : "sm:justify-center"
        }`}
      >
        <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-center sm:gap-4 sm:text-left">
          {/* Avatar de iniciales: sustituir por foto real del profesional en cuanto esté disponible */}
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-electric-100 text-lg font-extrabold text-electric-600">
            {initials}
          </span>
          <div>
            <p className="font-display text-base font-bold text-neutral-900">{business.owner}</p>
            <p className="text-sm text-neutral-500">
              Electricista profesional
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> · </span>
              {business.address.city}, {business.address.region}
            </p>
          </div>
        </div>

        {hasSecondaryRow && (
          <div className="flex flex-wrap items-center gap-3">
            {pills.map((p) => (
              <span
                key={p.label}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-cloud px-4 py-2 text-xs font-semibold text-neutral-600"
              >
                <i className={`${p.icon} text-electric-600`} aria-hidden="true"></i>
                {p.label}
              </span>
            ))}

            {hasReview && (
              <a
                href={reviews.googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-electric-500/25 bg-electric-400/10 px-4 py-2 text-xs font-bold text-electric-700 transition-colors duration-200 hover:bg-electric-400/20"
              >
                <i className="ri-google-fill" aria-hidden="true"></i>
                {reviews.rating} en Google{reviews.count ? ` · ${reviews.count} reseñas` : ""}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
