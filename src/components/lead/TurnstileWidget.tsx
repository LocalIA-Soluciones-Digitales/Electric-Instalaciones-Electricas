"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    onTurnstileToken?: (token: string) => void;
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

interface TurnstileWidgetProps {
  onToken: (token: string) => void;
}

// Widget de verificación humana (Cloudflare Turnstile). Si no se ha
// configurado NEXT_PUBLIC_TURNSTILE_SITE_KEY, no renderiza nada: el envío
// sigue funcionando (el servidor no exige el token mientras no tenga
// TURNSTILE_SECRET_KEY configurada — ver src/lib/turnstile.ts).
export default function TurnstileWidget({ onToken }: TurnstileWidgetProps) {
  useEffect(() => {
    if (!SITE_KEY) return;
    window.onTurnstileToken = onToken;
    return () => {
      delete window.onTurnstileToken;
    };
  }, [onToken]);

  if (!SITE_KEY) return null;

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" async defer />
      <div
        className="cf-turnstile"
        data-sitekey={SITE_KEY}
        data-callback="onTurnstileToken"
        data-theme="dark"
        data-appearance="interaction-only"
      />
    </>
  );
}
