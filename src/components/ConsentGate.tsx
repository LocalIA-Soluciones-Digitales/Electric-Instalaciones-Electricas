"use client";

import type { ReactNode } from "react";
import { useConsentGranted } from "@/lib/cookieConsent";

// GTM y el píxel de Meta (dentro de <Analytics/>) no deben cargarse hasta que
// exista consentimiento explícito y vigente. Antes de esto, ambos se montaban
// siempre en el layout raíz, disparando tracking antes de que el usuario
// viera siquiera el banner de cookies.
export default function ConsentGate({ children }: { children: ReactNode }) {
  const granted = useConsentGranted();
  if (!granted) return null;
  return <>{children}</>;
}
