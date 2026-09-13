import Image from "next/image";
import { business } from "@/lib/business";
import { SERVICE_PHOTO_INSTALACIONES } from "@/lib/stockImages";

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
    <section aria-label="Sobre el profesional" className="bg-ink py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:items-center md:px-6">
        <div className="order-2 md:order-1">
          <div className="inline-flex items-center gap-2">
            <span className="h-px w-5 bg-electric-400"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-electric-400">
              Sobre la empresa
            </span>
          </div>
          <p className="font-display mt-4 text-2xl font-extrabold tracking-tight text-offwhite sm:text-3xl">
            Hay una persona detrás de cada aviso.
          </p>

          <div className="mt-6 flex items-center gap-4">
            {/* Avatar de iniciales: sustituir por foto real del profesional en cuanto esté disponible */}
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-electric-400/30 bg-carbon text-lg font-extrabold text-electric-400">
              {initials}
            </span>
            <div>
              <p className="font-display text-base font-bold text-offwhite">{business.owner}</p>
              <p className="text-sm text-white/50">
                Electricista profesional · {business.address.city}, {business.address.region}
              </p>
            </div>
          </div>

          {hasSecondaryRow && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {pills.map((p) => (
                <span
                  key={p.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-carbon px-4 py-2 text-xs font-semibold text-white/70"
                >
                  <i className={`${p.icon} text-electric-400`} aria-hidden="true"></i>
                  {p.label}
                </span>
              ))}

              {hasReview && (
                <a
                  href={reviews.googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-electric-400/25 bg-electric-400/10 px-4 py-2 text-xs font-bold text-electric-400 transition-colors duration-200 hover:bg-electric-400/20"
                >
                  <i className="ri-google-fill" aria-hidden="true"></i>
                  {reviews.rating} en Google{reviews.count ? ` · ${reviews.count} reseñas` : ""}
                </a>
              )}
            </div>
          )}
        </div>

        <div className="order-1 overflow-hidden rounded-lg border border-white/10 md:order-2">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={SERVICE_PHOTO_INSTALACIONES}
              alt="Trabajo de instalación eléctrica realizado por Electric"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
