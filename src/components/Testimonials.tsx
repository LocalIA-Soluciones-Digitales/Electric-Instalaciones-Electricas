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

export default function Testimonials() {
  const { reviews } = business;

  if (reviews.googleUrl) {
    const stars = reviews.rating ? Math.round(Number(reviews.rating)) : 0;
    return (
      <div className="flex justify-center">
        <div className="flex w-full max-w-md flex-col items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm shadow-neutral-900/[0.04]">
          {stars > 0 && (
            <div className="flex items-center gap-1 text-electric-500" aria-label={`${reviews.rating} de 5 estrellas`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <i key={i} className={i < stars ? "ri-star-fill" : "ri-star-line"} aria-hidden="true"></i>
              ))}
            </div>
          )}
          <p className="text-lg font-bold text-neutral-900">
            {reviews.rating ? `${reviews.rating} de 5` : "Reseñas verificadas"}
            {reviews.count ? ` · ${reviews.count} reseñas en Google` : ""}
          </p>
          <a
            href={reviews.googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-electric-600 hover:text-electric-700"
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
          className="rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm shadow-neutral-900/[0.03]"
        >
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-electric-100 text-electric-600">
            <i className={`${p.icon} text-lg`} aria-hidden="true"></i>
          </span>
          <p className="mt-3 text-sm font-bold text-neutral-900">{p.title}</p>
          <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{p.text}</p>
        </div>
      ))}
    </div>
  );
}
