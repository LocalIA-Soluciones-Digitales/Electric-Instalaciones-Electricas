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
    <section className="bg-neutral-900 py-14 md:py-16 text-white">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center">
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">{title}</h2>
        <p className="text-white/50">{subtitle}</p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href={telLink()}
            onClick={() => trackCallClick(source)}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-electric-400 px-8 py-4 text-lg font-extrabold text-neutral-950 transition-colors duration-200 hover:bg-electric-300"
          >
            <i className="ri-phone-line text-xl" aria-hidden="true"></i>
            Llamar: {business.phoneDisplay}
          </a>
          <a
            href={waLink("Hola, necesito un electricista. ¿Podéis ayudarme?")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick(source)}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-[#25D366]/30 px-8 py-4 text-lg font-bold text-[#25D366] transition-colors duration-200 hover:bg-[#25D366]/10"
          >
            <i className="ri-whatsapp-line text-xl" aria-hidden="true"></i>
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
