// Limitador de peticiones para /api/lead.
//
// Si UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN están configuradas
// (Upstash Redis, capa gratuita suficiente para este volumen), el límite se
// aplica con un contador distribuido válido entre todas las instancias
// serverless. Si no, cae a un limitador en memoria por instancia: sigue
// protegiendo el caso de desarrollo/sin Upstash, con la limitación ya
// conocida de que no comparte estado entre instancias en producción.
import { upstashConfigured, upstashPipeline } from "@/lib/upstash";

const WINDOW_SECONDS = 10 * 60; // 10 minutos
const MAX_REQUESTS = 5;

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

// Evita que el Map crezca sin límite si el proceso vive mucho tiempo.
function sweep(now: number) {
  if (buckets.size < 5000) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

function checkRateLimitInMemory(key: string): boolean {
  const now = Date.now();
  sweep(now);
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_SECONDS * 1000 });
    return true;
  }

  if (bucket.count >= MAX_REQUESTS) return false;
  bucket.count += 1;
  return true;
}

async function checkRateLimitUpstash(key: string): Promise<boolean> {
  const redisKey = `leadrl:${key}`;
  // INCR crea la clave a 1 si no existía. EXPIRE ... NX solo fija el TTL la
  // primera vez (si ya tenía uno, no lo reinicia en cada petición), lo que da
  // una ventana fija de WINDOW_SECONDS desde la primera petición de esa IP.
  const [count] = await upstashPipeline<number>([
    ["INCR", redisKey],
    ["EXPIRE", redisKey, WINDOW_SECONDS, "NX"],
  ]);
  return count <= MAX_REQUESTS;
}

export async function checkRateLimit(key: string): Promise<boolean> {
  if (upstashConfigured()) {
    try {
      return await checkRateLimitUpstash(key);
    } catch (err) {
      console.error("[rateLimit] fallo al consultar Upstash, usando límite en memoria como respaldo", err);
      return checkRateLimitInMemory(key);
    }
  }
  return checkRateLimitInMemory(key);
}

export function clientIpFrom(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}
