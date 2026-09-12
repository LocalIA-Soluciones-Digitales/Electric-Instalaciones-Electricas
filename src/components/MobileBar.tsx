"use client";

import Link from "next/link";
import { WHATSAPP_GREETING_URGENT, business, telLink, waLink } from "@/lib/business";
import { trackCallClick, trackWhatsAppClick } from "@/lib/tracking";
import { useCookieBannerVisible } from "@/lib/cookieConsent";

export default function MobileBar() {
  const [cookieBannerVisible] = useCookieBannerVisible();

  return (
    <nav
      className={`fixed left-2 right-2 z-50 flex items-center gap-0.5 overflow-hidden rounded-2xl border border-neutral-200 bg-white/95 shadow-lg shadow-neutral-900/10 backdrop-blur-md md:hidden transition-[bottom] ${
        cookieBannerVisible ? "bottom-24" : "bottom-2"
      }`}
      aria-label="Contacto rápido"
    >
      <a
        href={telLink()}
        onClick={() => trackCallClick("mobile_bar")}
        className="flex flex-1 flex-col items-center justify-center gap-0.5 py-3 text-neutral-800 active:bg-neutral-100 transition-colors duration-150 cursor-pointer"
      >
        <i className="ri-phone-line text-[20px] text-electric-600" aria-hidden="true"></i>
        <span className="text-[10px] font-bold tracking-wide uppercase">Llamar</span>
      </a>
      <div className="w-px h-6 bg-neutral-200"></div>
      <a
        href={waLink(WHATSAPP_GREETING_URGENT)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick("mobile_bar")}
        className="flex flex-1 flex-col items-center justify-center gap-0.5 py-3 text-whatsapp-600 active:bg-neutral-100 transition-colors duration-150 cursor-pointer"
      >
        <i className="ri-whatsapp-line text-[20px]" aria-hidden="true"></i>
        <span className="text-[10px] font-bold tracking-wide uppercase">WhatsApp</span>
      </a>
      <div className="w-px h-6 bg-neutral-200"></div>
      <Link
        href="/#solicitud"
        className="flex flex-1 flex-col items-center justify-center gap-0.5 bg-electric-400 py-3 text-neutral-950 active:bg-electric-300 transition-colors duration-150 cursor-pointer"
      >
        <i className="ri-flashlight-line text-[20px]" aria-hidden="true"></i>
        <span className="text-[10px] font-extrabold tracking-wide uppercase">Avisar</span>
      </Link>
      <p className="sr-only">Teléfono: {business.phoneDisplay}</p>
    </nav>
  );
}
