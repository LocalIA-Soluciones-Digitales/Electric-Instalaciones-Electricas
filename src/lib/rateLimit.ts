// Limitador de peticiones en memoria para /api/lead.
// Nota: en un despliegue serverless con múltiples instancias esto protege por
// instancia, no de forma global. Para un límite estricto a escala, sustituir
// por Vercel KV / Upstash Redis manteniendo la misma firma `checkRateLimit`.

interface Bucket {
  count: number;
  resetAt: number;
}

const WINDOW_MS = 10 * 60 * 1000; // 10 minutos
const MAX_REQUESTS = 5;

const buckets = new Map<string, Bucket>();

// Evita que el Map crezca sin límite si el proceso vive mucho tiempo.
function sweep(now: number) {
  if (buckets.size < 5000) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export function checkRateLimit(key: string): boolean {
  const now = Date.now();
  sweep(now);
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (bucket.count >= MAX_REQUESTS) return false;
  bucket.count += 1;
  return true;
}

export function clientIpFrom(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}
