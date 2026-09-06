// Verificación opcional de Cloudflare Turnstile.
// Si no se configura TURNSTILE_SECRET_KEY, la verificación se omite (no-op):
// el endpoint sigue protegido por el resto de controles (origen, rate limit,
// honeypot). En cuanto se añadan las claves al entorno, se activa sin más
// cambios de código. Ver NEXT_PUBLIC_TURNSTILE_SITE_KEY en .env.example.

export async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // no configurado todavía: no bloquear el envío

  if (!token) return false;

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const data = (await res.json()) as { success?: boolean };
    return !!data.success;
  } catch {
    return false;
  }
}
