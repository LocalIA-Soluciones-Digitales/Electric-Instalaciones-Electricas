"use client";

import { WHATSAPP_GREETING_URGENT, business, telLink, waLink } from "@/lib/business";
import { trackCallClick, trackWhatsAppClick } from "@/lib/tracking";

export default function CTASection({
  title = "¿Necesitas un electricista ahora mismo?",
  subtitle = "Respuesta rápida en Barakaldo, Bilbao y toda Euskadi. Servicio 24 horas.",
  source,
}: {
  title?: string;
  subtitle?: string;
  source: string;
}) {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-ink py-14 md:py-16">
      <div
        className="absolute inset-0 opacity-[0.05]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      ></div>
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center">
        <h2 className="font-display text-2xl font-extrabold text-offwhite sm:text-3xl">{title}</h2>
        <p className="text-white/60">{subtitle}</p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href={telLink()}
            onClick={() => trackCallClick(source)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-electric-400 px-8 py-4 text-lg font-extrabold text-neutral-950 transition-colors duration-200 hover:bg-electric-300"
          >
            <i className="ri-phone-line text-xl" aria-hidden="true"></i>
            Llamar: {business.phoneDisplay}
          </a>
          <a
            href={waLink(WHATSAPP_GREETING_URGENT)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick(source)}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-lg font-bold text-offwhite backdrop-blur-sm transition-colors duration-200 hover:bg-white/10"
          >
            <i className="ri-whatsapp-line text-xl" aria-hidden="true"></i>
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
