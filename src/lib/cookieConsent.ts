"use client";

import { useEffect, useState } from "react";

export const COOKIE_CONSENT_STORAGE_KEY = "cookie_consent_v2";
export const CONSENT_CHANGED_EVENT = "electric-cookie-consent-changed";
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 180; // 180 días: el consentimiento caduca y debe repetirse

export type ConsentState = "granted" | "denied";

interface StoredConsent {
  state: ConsentState;
  ts: number;
}

// Lee el consentimiento vigente. Devuelve null si nunca se ha dado, si ha
// caducado, o si venía en el formato antiguo (sin fecha) — en cualquiera de
// esos casos se debe volver a preguntar.
export function readConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (!parsed || typeof parsed.ts !== "number") return null;
    if (Date.now() - parsed.ts > MAX_AGE_MS) return null;
    return parsed.state === "granted" ? "granted" : "denied";
  } catch {
    return null;
  }
}

export function writeConsent(state: ConsentState) {
  try {
    const payload: StoredConsent = { state, ts: Date.now() };
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* localStorage no disponible: se volverá a preguntar en la próxima visita */
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: state }));
  }
}

export function useCookieBannerVisible() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- leer localStorage requiere el montaje en cliente; evita desajuste de hidratación SSR
    if (readConsent() === null) setVisible(true);
  }, []);

  return [visible, setVisible] as const;
}

// Usado para montar scripts de terceros (analítica, píxeles) solo cuando hay
// consentimiento vigente de tipo "granted", y reaccionar en cuanto cambie sin
// necesitar recargar la página.
export function useConsentGranted() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- primer valor real solo se conoce tras montar en cliente
    setGranted(readConsent() === "granted");
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<ConsentState>).detail;
      setGranted(detail === "granted");
    };
    window.addEventListener(CONSENT_CHANGED_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onChange);
  }, []);

  return granted;
}
