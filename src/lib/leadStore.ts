// Archivo de respaldo de leads, independiente del envío por WhatsApp/email.
//
// Hoy, si RESEND_API_KEY falla o no está configurada y el cliente cierra la
// pestaña antes de confirmar el envío de WhatsApp, el aviso no queda
// registrado en ningún sitio. Si UPSTASH_REDIS_REST_URL/TOKEN están
// configuradas (la misma Upstash Redis que usa rateLimit.ts), cada aviso o
// solicitud de presupuesto válido se guarda también aquí como red de
// seguridad mínima. No-op si Upstash no está configurado: nunca bloquea ni
// hace fallar la petición principal.
import { upstashConfigured, upstashPipeline } from "@/lib/upstash";

const ARCHIVE_KEY = "leads:archive";
const ARCHIVE_MAX = 999; // se conservan los últimos ~1000 avisos

export interface LeadRecord {
  avisoId: string;
  kind: "aviso" | "presupuesto";
  data: unknown;
  hasPhoto: boolean;
  emailSent: boolean;
  createdAt: string;
}

export async function archiveLead(record: LeadRecord): Promise<void> {
  if (!upstashConfigured()) return;
  try {
    await upstashPipeline([
      ["LPUSH", ARCHIVE_KEY, JSON.stringify(record)],
      ["LTRIM", ARCHIVE_KEY, "0", String(ARCHIVE_MAX)],
    ]);
  } catch (err) {
    console.error("[leadStore] no se pudo archivar el lead en Upstash", err);
  }
}
