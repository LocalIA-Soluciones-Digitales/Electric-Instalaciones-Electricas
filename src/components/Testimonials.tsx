const testimonials = [
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
    <div className="flex gap-0.5 text-yellow-400" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < rating ? "★" : "☆"}</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {testimonials.map((t) => (
        <figure key={t.name} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <Stars rating={t.rating} />
          <blockquote className="mt-3 text-sm text-slate-700">&ldquo;{t.text}&rdquo;</blockquote>
          <figcaption className="mt-4 text-sm font-semibold text-slate-900">
            {t.name} <span className="font-normal text-slate-500">— {t.location}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
