export type ResponseTier = "fast" | "medium" | "slow" | "verySlow";

/** Umbrales de tiempo de respuesta mostrados en la leyenda del mapa de cobertura. */
export function getResponseTier(etaMinutes: number): ResponseTier {
  if (etaMinutes < 15) return "fast";
  if (etaMinutes < 30) return "medium";
  if (etaMinutes < 60) return "slow";
  return "verySlow";
}

export const RESPONSE_TIER_META: Record<
  ResponseTier,
  { label: string; dot: string; ring: string; text: string }
> = {
  fast: {
    label: "Menos de 15 min",
    dot: "bg-emerald-500",
    ring: "ring-emerald-500/30",
    text: "text-emerald-600",
  },
  medium: {
    label: "15 - 30 min",
    dot: "bg-amber-400",
    ring: "ring-amber-400/30",
    text: "text-amber-600",
  },
  slow: {
    label: "30 - 60 min",
    dot: "bg-orange-500",
    ring: "ring-orange-500/30",
    text: "text-orange-600",
  },
  verySlow: {
    label: "Más de 60 min",
    dot: "bg-red-500",
    ring: "ring-red-500/30",
    text: "text-red-600",
  },
};
