export type ResponseTier = "fast" | "medium" | "slow";

/** Umbrales de tiempo de respuesta mostrados en la leyenda del mapa de cobertura. */
export function getResponseTier(etaMinutes: number): ResponseTier {
  if (etaMinutes < 15) return "fast";
  if (etaMinutes < 35) return "medium";
  return "slow";
}

export const RESPONSE_TIER_META: Record<
  ResponseTier,
  { label: string; dot: string; ring: string; text: string }
> = {
  fast: {
    label: "Respuesta inmediata · menos de 15 min",
    dot: "bg-emerald-500",
    ring: "ring-emerald-500/30",
    text: "text-emerald-600",
  },
  medium: {
    label: "Respuesta rápida · 15-35 min",
    dot: "bg-amber-400",
    ring: "ring-amber-400/30",
    text: "text-amber-600",
  },
  slow: {
    label: "Visita programada · 35 min o más",
    dot: "bg-orange-500",
    ring: "ring-orange-500/30",
    text: "text-orange-600",
  },
};

/**
 * Frase comercial para la ficha de cada municipio: en vez de un dato en frío
 * ("Tiempo estimado: 55 min"), se enuncia como una promesa de servicio. Nunca
 * se usa un tono de alarma, ni siquiera en los municipios más alejados.
 */
export function tierCommercialCopy(tier: ResponseTier, etaMinutes: number): string {
  if (tier === "fast") return "Cobertura inmediata: llegamos en minutos";
  if (tier === "medium") return `Técnico en camino en ~${etaMinutes} min`;
  return `Técnico disponible en ~${etaMinutes} min · coordinamos el horario contigo`;
}
