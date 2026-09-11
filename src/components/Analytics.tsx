"use client";

import Script from "next/script";
import { CONSENT_MODE_SCRIPT, gtmLoaderScript, metaPixelScript } from "@/lib/inlineScripts";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

// Los tres bloques inline de abajo se sirven sin 'unsafe-inline': su hash
// SHA-256 se calcula en next.config.ts a partir de src/lib/inlineScripts.ts,
// que es la misma fuente que se usa aquí. Si el texto no coincide byte a
// byte con el que calcula next.config.ts, el navegador bloquea el script.
export default function Analytics() {
  return (
    <>
      {/* Google Consent Mode v2 — denegado por defecto hasta consentimiento explícito */}
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document -- valid in App Router root layout */}
      <Script id="consent-mode-default" strategy="beforeInteractive">
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
