"use client";

import { useEffect } from "react";
import { CONSENT_MODE_SCRIPT, gtmLoaderScript, metaPixelScript } from "@/lib/inlineScripts";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

// Este componente solo se monta *después* del render inicial (cuando
// ConsentGate confirma consentimiento), nunca durante la carga/hidratación
// de la página. `next/script` (con cualquier `strategy`) da por hecho que
// sus <Script> forman parte del árbol desde el principio; usado en un
// componente que aparece mucho más tarde, el <script> podía llegar a
// insertarse en el DOM sin que su contenido se ejecutara nunca — bug real
// confirmado en producción (window.dataLayer no se inicializaba pese a que
// el elemento existía). Se inyectan los tres scripts a mano con
// document.createElement + appendChild, la misma técnica que usan
// internamente los propios snippets de Google/Meta, que sí garantiza
// ejecución sea cual sea el momento del ciclo de vida en que se inserten.
function injectInlineScript(id: string, code: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.text = code;
  document.head.appendChild(script);
}

export default function Analytics() {
  useEffect(() => {
    // Orden importa: el consentimiento por defecto debe declararse antes de
    // que se carguen los tags de GTM/Meta que lo consultan.
    injectInlineScript("consent-mode-default", CONSENT_MODE_SCRIPT);
    if (GTM_ID) injectInlineScript("gtm-loader", gtmLoaderScript(GTM_ID));
    if (META_PIXEL_ID) injectInlineScript("meta-pixel", metaPixelScript(META_PIXEL_ID));
  }, []);

  return null;
}
