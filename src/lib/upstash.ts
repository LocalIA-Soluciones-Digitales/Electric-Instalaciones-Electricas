// Cliente mínimo para la REST API de Upstash Redis (https://upstash.com).
// Totalmente opcional: si UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
// no están configuradas, upstashConfigured() devuelve false y cada consumidor
// (rateLimit.ts, leadStore.ts) cae a su propio comportamiento por defecto.
// No añade ninguna dependencia nueva: la REST API de Upstash es HTTP plano.

export type UpstashCommand = (string | number)[];

export function upstashConfigured(): boolean {
  return !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

export async function upstashPipeline<T = unknown>(commands: UpstashCommand[]): Promise<T[]> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error("Upstash no configurado");

  const res = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
  });
  if (!res.ok) throw new Error(`Upstash respondió ${res.status}`);

  const json = (await res.json()) as Array<{ result: T; error?: string }>;
  const failed = json.find((r) => r.error);
  if (failed) throw new Error(`Upstash devolvió un error: ${failed.error}`);
  return json.map((r) => r.result);
}
