import { business } from "@/lib/business";

export const testimonials = [
  {
    name: "Ainhoa R.",
    location: "Barakaldo",
    text: "Se nos disparó el diferencial un domingo por la noche y vinieron en menos de una hora. Muy profesionales y el precio justo el que nos dijeron por teléfono.",
    rating: 5,
  },
  {
    name: "Jon M.",
    location: "Bilbao",
    text: "Reformamos el cuadro eléctrico de un piso antiguo en Indautxu. Explicaron todo el proceso y dejaron el boletín en regla. Recomendables.",
    rating: 5,
  },
  {
    name: "Nerea S.",
    location: "Portugalete",
    text: "Instalación de iluminación LED en mi local. Rápidos, limpios y con muy buena relación calidad-precio.",
    rating: 5,
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-electric-400" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <i key={i} className={i < rating ? "ri-star-fill" : "ri-star-line"} aria-hidden="true"></i>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { reviews } = business;
  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.name} className="rounded-lg border border-white/[0.08] bg-neutral-900/60 p-6">
            <Stars rating={t.rating} />
            <blockquote className="mt-3 text-sm text-white/70 leading-relaxed">&ldquo;{t.text}&rdquo;</blockquote>
            <figcaption className="mt-4 text-sm font-semibold text-white">
              {t.name} <span className="font-normal text-white/40">— {t.location}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      {reviews.googleUrl && (
        <div className="mt-8 text-center">
          <a
            href={reviews.googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-electric-400 hover:text-electric-300"
          >
            <i className="ri-google-fill" aria-hidden="true"></i>
            Ver todas las opiniones en Google
            {reviews.rating ? ` (${reviews.rating}${reviews.count ? ` · ${reviews.count} reseñas` : ""})` : ""}
          </a>
        </div>
      )}
    </div>
  );
}
