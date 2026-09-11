import { business } from "@/lib/business";

// No se muestran citas ni nombres de clientes inventados: solo compromisos
// verificables del servicio, o un enlace a reseñas reales de Google en cuanto
// existan (ver business.reviews en src/lib/business.ts).
const promises = [
  {
    icon: "ri-shield-check-line",
    title: "Presupuesto claro antes de intervenir",
    text: "Te decimos el precio por teléfono o WhatsApp antes de desplazarnos. Sin sorpresas en la factura.",
  },
  {
    icon: "ri-timer-flash-line",
    title: "Respuesta rápida",
    text: "Para urgencias, solemos llegar en menos de una hora desde la llamada en Barakaldo y alrededores.",
  },
  {
    icon: "ri-file-shield-2-line",
    title: "Boletines en regla",
    text: "Toda instalación o reforma que lo requiere se entrega con su boletín eléctrico tramitado.",
  },
];

export default function Testimonials({ light = false }: { light?: boolean }) {
  const { reviews } = business;

  if (reviews.googleUrl) {
    const stars = reviews.rating ? Math.round(Number(reviews.rating)) : 0;
    return (
      <div className="flex justify-center">
        <div
          className={
            light
              ? "flex w-full max-w-md flex-col items-center gap-3 rounded-xl border border-neutral-200 bg-white p-8 text-center shadow-sm"
              : "flex w-full max-w-md flex-col items-center gap-3 rounded-xl border border-white/[0.08] bg-neutral-900/60 p-8 text-center"
          }
        >
          {stars > 0 && (
            <div
              className={light ? "flex items-center gap-1 text-electric-600" : "flex items-center gap-1 text-electric-400"}
              aria-label={`${reviews.rating} de 5 estrellas`}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <i key={i} className={i < stars ? "ri-star-fill" : "ri-star-line"} aria-hidden="true"></i>
              ))}
            </div>
          )}
          <p className={light ? "text-lg font-bold text-neutral-900" : "text-lg font-bold text-white"}>
            {reviews.rating ? `${reviews.rating} de 5` : "Reseñas verificadas"}
            {reviews.count ? ` · ${reviews.count} reseñas en Google` : ""}
          </p>
          <a
            href={reviews.googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={
              light
                ? "inline-flex items-center gap-2 text-sm font-bold text-electric-600 hover:text-electric-700"
                : "inline-flex items-center gap-2 text-sm font-bold text-electric-400 hover:text-electric-300"
            }
          >
            <i className="ri-google-fill" aria-hidden="true"></i>
            Ver todas las opiniones en Google
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {promises.map((p) => (
        <div
          key={p.title}
          className={
            light
              ? "rounded-lg border border-neutral-200 bg-white p-6 text-center shadow-sm"
              : "rounded-lg border border-white/[0.08] bg-neutral-900/60 p-6 text-center"
          }
        >
          <span
            className={
              light
                ? "mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-electric-100 text-electric-600"
                : "mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-electric-400/15 text-electric-400"
            }
          >
            <i className={`${p.icon} text-lg`} aria-hidden="true"></i>
          </span>
          <p className={light ? "mt-3 text-sm font-bold text-neutral-900" : "mt-3 text-sm font-bold text-white"}>
            {p.title}
          </p>
          <p className={light ? "mt-2 text-sm text-neutral-600 leading-relaxed" : "mt-2 text-sm text-white/60 leading-relaxed"}>
            {p.text}
          </p>
        </div>
      ))}
    </div>
  );
}
