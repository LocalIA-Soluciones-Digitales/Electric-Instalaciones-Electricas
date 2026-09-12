"use client";

import Script from "next/script";
import { CONSENT_MODE_SCRIPT, gtmLoaderScript, metaPixelScript } from "@/lib/inlineScripts";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

// Este componente entero solo se monta *después* de que ConsentGate confirme
// consentimiento (nunca en el render inicial) — por eso los tres scripts usan
// `strategy="afterInteractive"`. `beforeInteractive` solo tiene efecto para
// scripts presentes en el layout raíz desde el primer render; usarlo aquí
// hacía que Next.js nunca llegara a insertar ni ejecutar el script de Consent
// Mode por defecto (bug real detectado en producción: `window.dataLayer`
// nunca se inicializaba y GTM/GA no recibían el estado de consentimiento).
export default function Analytics() {
  return (
    <>
      {/* Google Consent Mode v2 — denegado por defecto hasta consentimiento explícito */}
      <Script id="consent-mode-default" strategy="afterInteractive">
        {CONSENT_MODE_SCRIPT}
      </Script>

      {GTM_ID && (
        <Script id="gtm-loader" strategy="afterInteractive">
          {gtmLoaderScript(GTM_ID)}
        </Script>
      )}

      {META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {metaPixelScript(META_PIXEL_ID)}
        </Script>
      )}
    </>
  );
}
