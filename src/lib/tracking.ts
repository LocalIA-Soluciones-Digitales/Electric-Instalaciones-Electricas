"use client";

type DataLayerEvent = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer: DataLayerEvent[];
    fbq?: (...args: unknown[]) => void;
  }
}

function pushEvent(event: DataLayerEvent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

export function trackCallClick(source: string) {
  pushEvent({ event: "call_click", source });
}

export function trackWhatsAppClick(source: string) {
  pushEvent({ event: "whatsapp_click", source });
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Lead", { content_name: "whatsapp_click", source });
  }
}

export function trackFormSubmit(formName: string) {
  pushEvent({ event: "form_submit", form_name: formName });
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Lead", { content_name: formName });
  }
}
