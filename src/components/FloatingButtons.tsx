"use client";

import { WHATSAPP_GREETING_URGENT, business, telLink, waLink } from "@/lib/business";
import { trackCallClick, trackWhatsAppClick } from "@/lib/tracking";
import { useCookieBannerVisible } from "@/lib/cookieConsent";

export default function FloatingButtons() {
  const [cookieBannerVisible] = useCookieBannerVisible();

  return (
    <div
      className={`fixed right-6 z-50 hidden flex-col gap-3 transition-[bottom] md:flex ${
        cookieBannerVisible ? "bottom-24" : "bottom-6"
      }`}
    >
      <a
        href={waLink(WHATSAPP_GREETING_URGENT)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick("floating_button")}
        aria-label="Contactar por WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-black/30 transition hover:scale-105"
      >
        <i className="ri-whatsapp-line text-2xl" aria-hidden="true"></i>
      </a>
      <a
        href={telLink()}
        onClick={() => trackCallClick("floating_button")}
        aria-label={`Llamar al ${business.phoneDisplay}`}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-electric-400 text-neutral-950 shadow-lg shadow-black/30 transition hover:scale-105"
      >
        <i className="ri-phone-line text-2xl" aria-hidden="true"></i>
      </a>
    </div>
  );
}
