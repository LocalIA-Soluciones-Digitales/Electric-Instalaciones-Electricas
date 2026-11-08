"use client";

import { useEffect } from "react";

// Escucha cualquier clic en un enlace tel: o wa.me de toda la web (header,
// botones flotantes, páginas de zona, footer...) y avisa a /api/contact-click.
// Un único listener global en vez de tocar cada componente: así ningún botón
// nuevo se queda sin aviso.
export default function ContactClickNotifier() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      const kind = href.startsWith("tel:") ? "call" : /wa\.me|whatsapp\.com/.test(href) ? "whatsapp" : null;
      if (!kind) return;

      const payload = JSON.stringify({
        kind,
        page: window.location.pathname,
        label: (link.getAttribute("aria-label") || link.textContent || "").replace(/\s+/g, " ").trim(),
      });
      // sendBeacon sobrevive a que el navegador cambie a la app de teléfono/WhatsApp.
      const blob = new Blob([payload], { type: "text/plain" });
      if (!navigator.sendBeacon?.("/api/contact-click", blob)) {
        fetch("/api/contact-click", { method: "POST", body: payload, keepalive: true }).catch(() => {});
      }
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
