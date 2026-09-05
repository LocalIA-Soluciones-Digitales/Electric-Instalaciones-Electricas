export interface EnviarResult {
  ok: boolean;
  error?: string;
}

interface EmailPayload {
  avisoId: string;
  subject: string;
  html: string;
  text: string;
  photo?: string; // data URL opcional
}

// Llama al endpoint interno que envía la notificación por email (con foto si la hay).
export async function enviarAvisoEmail(payload: EmailPayload): Promise<EnviarResult> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => null);
    if (res.ok && data?.ok) return { ok: true };
    return { ok: false, error: data?.error || "error-servidor" };
  } catch {
    return { ok: false, error: "error-red" };
  }
}
