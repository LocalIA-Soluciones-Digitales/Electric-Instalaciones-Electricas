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
    <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-slate-700 bg-slate-900/98 p-4 text-sm text-slate-200 shadow-2xl backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-center sm:text-left">
          Usamos cookies propias y de terceros para analizar el uso de la web y mostrar publicidad
          relevante. Puedes aceptar, rechazar o leer más en nuestra{" "}
          <Link href="/politica-cookies" className="underline">
            política de cookies
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => updateConsent(false)}
            className="rounded-md border border-slate-500 px-4 py-2 text-slate-200 hover:bg-slate-800"
          >
            Rechazar
          </button>
          <button
            onClick={() => updateConsent(true)}
            className="rounded-md bg-yellow-400 px-4 py-2 font-semibold text-slate-900 hover:bg-yellow-300"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
