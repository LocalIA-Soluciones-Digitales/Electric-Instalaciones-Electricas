"use client";

import Link from "next/link";
import { COOKIE_CONSENT_STORAGE_KEY, useCookieBannerVisible } from "@/lib/cookieConsent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useCookieBannerVisible();

  function updateConsent(granted: boolean) {
    const state = granted ? "granted" : "denied";
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        ad_storage: state,
        ad_user_data: state,
        ad_personalization: state,
        analytics_storage: state,
      });
    }
    try {
      localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, state);
    } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-white/10 bg-neutral-950/98 p-4 text-sm text-white/70 shadow-2xl backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-center sm:text-left">
          Usamos cookies propias y de terceros para analizar el uso de la web y mostrar publicidad
          relevante. Puedes aceptar, rechazar o leer más en nuestra{" "}
          <Link href="/politica-cookies" className="text-electric-400 underline">
            política de cookies
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => updateConsent(false)}
            className="rounded-md border border-white/20 px-4 py-2 text-white/70 hover:bg-white/5"
          >
            Rechazar
          </button>
          <button
            onClick={() => updateConsent(true)}
            className="rounded-md bg-electric-400 px-4 py-2 font-semibold text-neutral-950 hover:bg-electric-300"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
