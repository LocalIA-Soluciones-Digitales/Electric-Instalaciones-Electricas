"use client";

import { business, telLink, waLink } from "@/lib/business";
import { trackCallClick, trackWhatsAppClick } from "@/lib/tracking";

export default function CTASection({
  title = "¿Necesitas un electricista ahora mismo?",
  subtitle = "Respuesta rápida en Barakaldo, Bilbao y toda Bizkaia. Servicio 24 horas.",
  source,
}: {
  title?: string;
  subtitle?: string;
  source: string;
}) {
  return (
    <section className="bg-slate-900 py-12 text-white">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center">
        <h2 className="text-2xl font-extrabold sm:text-3xl">{title}</h2>
        <p className="text-slate-300">{subtitle}</p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href={telLink()}
            onClick={() => trackCallClick(source)}
            className="rounded-md bg-yellow-400 px-8 py-4 text-lg font-bold text-slate-900 shadow-lg hover:bg-yellow-300"
          >
            Llamar ahora: {business.phoneDisplay}
          </a>
          <a
            href={waLink("Hola, necesito un electricista. ¿Podéis ayudarme?")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick(source)}
            className="rounded-md bg-[#25D366] px-8 py-4 text-lg font-bold text-white shadow-lg hover:brightness-110"
          >
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
