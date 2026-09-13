"use client";

import { WHATSAPP_GREETING_URGENT, business, telLink, waLink } from "@/lib/business";
import { trackCallClick, trackWhatsAppClick } from "@/lib/tracking";
import Reveal from "@/components/Reveal";

export default function UrgentBanner() {
  return (
    <section className="border-y border-white/10 bg-carbon py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <div className="inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric-400 opacity-60"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-electric-400"></span>
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-electric-400">
              Urgencias 24 h
            </span>
          </div>

          <h2 className="font-display mt-4 max-w-xl text-3xl font-extrabold tracking-tight text-offwhite sm:text-4xl">
            ¿Te has quedado sin luz?
          </h2>
          <p className="mt-3 max-w-md text-base text-white/60">
            Cuéntanos qué ocurre y te orientamos rápidamente.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#solicitud"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-electric-400 px-7 py-3.5 text-[15px] font-extrabold text-neutral-950 transition-colors duration-200 hover:bg-electric-300"
            >
              <i className="ri-customer-service-2-line text-lg" aria-hidden="true"></i>
              Solicitar asistencia
            </a>
            <a
              href={telLink()}
              onClick={() => trackCallClick("urgencias")}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/20 px-7 py-3.5 text-[15px] font-bold text-offwhite transition-colors duration-200 hover:bg-white/5"
            >
              <i className="ri-phone-line text-lg" aria-hidden="true"></i>
              Llamar ahora
            </a>
            <a
              href={waLink(WHATSAPP_GREETING_URGENT)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("urgencias")}
              className="inline-flex items-center gap-2 whitespace-nowrap text-[15px] font-bold text-whatsapp-300 transition-colors duration-200 hover:text-whatsapp-300/80"
            >
              <i className="ri-whatsapp-line text-lg" aria-hidden="true"></i>
              WhatsApp: {business.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
