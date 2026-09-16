export type ResponseTier = "fast" | "medium" | "slow";

/** Umbrales de tiempo de respuesta mostrados en la leyenda del mapa de cobertura. */
export function getResponseTier(etaMinutes: number): ResponseTier {
  if (etaMinutes < 15) return "fast";
  if (etaMinutes < 35) return "medium";
  return "slow";
}

export const RESPONSE_TIER_META: Record<
  ResponseTier,
  { label: string; shortLabel: string; dot: string; ring: string; text: string }
> = {
  fast: {
    label: "Respuesta inmediata · menos de 15 min",
    shortLabel: "Inmediata",
    dot: "bg-emerald-500",
    ring: "ring-emerald-500/30",
    text: "text-emerald-600",
  },
  medium: {
    label: "Respuesta rápida · 15-35 min",
    shortLabel: "Rápida",
    dot: "bg-amber-400",
    ring: "ring-amber-400/30",
    text: "text-amber-600",
  },
  slow: {
    label: "Visita programada · 35 min o más",
    shortLabel: "Programada",
    dot: "bg-orange-500",
    ring: "ring-orange-500/30",
    text: "text-orange-600",
  },
};

/**
 * Frase de apoyo, corta a propósito, para la ficha de cada municipio: la
 * cifra exacta ya se ve en su propia tarjeta de datos (distancia/minutos), así
 * que aquí solo se añade el matiz de servicio, nunca repitiendo el número.
 */
export function tierCommercialCopy(tier: ResponseTier): string {
  if (tier === "fast") return "Salimos ya, sin esperas";
  if (tier === "medium") return "Técnico en camino en breve";
  return "Coordinamos contigo el horario de la visita";
}
