"use client";

import Link from "next/link";
import { WHATSAPP_GREETING_URGENT, business, telLink, waLink } from "@/lib/business";
import { trackCallClick, trackWhatsAppClick } from "@/lib/tracking";

export default function ServiceQuoteCard({
  shortName,
  source,
}: {
  shortName: string;
  source: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <div className="h-1.5 bg-electric-400" aria-hidden="true"></div>
      <div className="p-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-electric-100 text-xl text-electric-600">
          <i className="ri-file-list-3-line" aria-hidden="true"></i>
        </div>
        <h3 className="font-display mt-4 text-lg font-bold text-neutral-900">
          Pide presupuesto para {shortName.toLowerCase()}
        </h3>
        <p className="mt-1.5 text-sm text-neutral-500">
          Sin compromiso. Respuesta rápida por teléfono o WhatsApp.
        </p>

        <div className="mt-5 flex flex-col gap-2.5">
          <a
            href={telLink()}
            onClick={() => trackCallClick(source)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-electric-400 px-5 py-3 text-sm font-extrabold text-neutral-950 transition-colors duration-200 hover:bg-electric-300"
          >
            <i className="ri-phone-line" aria-hidden="true"></i>
            Llamar: {business.phoneDisplay}
          </a>
          <a
            href={waLink(WHATSAPP_GREETING_URGENT)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick(source)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-whatsapp/25 bg-whatsapp/10 px-5 py-3 text-sm font-bold text-whatsapp-600 transition-colors duration-200 hover:bg-whatsapp/15"
          >
            <i className="ri-whatsapp-line" aria-hidden="true"></i>
            WhatsApp
          </a>
        </div>

        <Link
          href="/contacto#presupuesto"
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-neutral-500 hover:text-electric-600"
        >
          O rellena el formulario
          <i className="ri-arrow-right-line" aria-hidden="true"></i>
        </Link>
      </div>
    </div>
  );
}
