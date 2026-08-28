"use client";

import { business, telLink, waLink } from "@/lib/business";
import { trackCallClick, trackWhatsAppClick } from "@/lib/tracking";
import { useCookieBannerVisible } from "@/lib/cookieConsent";

export default function FloatingButtons() {
  const [cookieBannerVisible] = useCookieBannerVisible();

  return (
    <div
      className={`fixed right-4 z-50 flex flex-col gap-3 transition-[bottom] sm:right-6 ${
        cookieBannerVisible ? "bottom-28 sm:bottom-24" : "bottom-4 sm:bottom-6"
      }`}
    >
      <a
        href={waLink("Hola, necesito un electricista. ¿Podéis ayudarme?")}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick("floating_button")}
        aria-label="Contactar por WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition hover:scale-105"
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7 fill-white">
          <path d="M16.004 3C9.373 3 4 8.373 4 15.004c0 2.386.63 4.62 1.734 6.553L4 29l7.62-1.7A11.94 11.94 0 0 0 16.004 27C22.635 27 28 21.635 28 15.004 28 8.373 22.635 3 16.004 3Zm6.83 17.06c-.29.816-1.44 1.5-2.36 1.7-.63.13-1.45.24-4.2-.9-3.52-1.46-5.79-5.02-5.97-5.25-.17-.24-1.43-1.9-1.43-3.63 0-1.73.9-2.58 1.22-2.94.29-.32.63-.4.85-.4h.6c.2 0 .46-.08.72.55.29.7.98 2.42 1.06 2.6.08.17.13.38.03.6-.1.24-.16.38-.32.58-.16.2-.34.44-.48.6-.16.17-.33.36-.14.7.19.35.85 1.4 1.83 2.27 1.26 1.12 2.32 1.47 2.66 1.63.29.14.46.12.63-.07.2-.24.86-1 1.1-1.35.23-.34.46-.28.77-.17.32.12 2.02.95 2.37 1.13.35.17.58.26.66.4.09.15.09.86-.2 1.68Z" />
        </svg>
      </a>
      <a
        href={telLink()}
        onClick={() => trackCallClick("floating_button")}
        aria-label={`Llamar al ${business.phoneDisplay}`}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 text-slate-900 shadow-lg shadow-black/30 transition hover:scale-105"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-slate-900">
          <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.57 1 1 0 0 1-.25 1.01l-2.2 2.21Z" />
        </svg>
      </a>
    </div>
  );
}
