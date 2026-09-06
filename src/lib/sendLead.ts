import type { AvisoData, BudgetData } from "@/lib/leadConfig";

export interface EnviarResult {
  ok: boolean;
  error?: string;
}

interface LeadRequest {
  kind: "aviso" | "presupuesto";
  avisoId: string;
  data: AvisoData | BudgetData;
  photo?: string; // data URL opcional
  hp?: string; // honeypot: debe llegar siempre vacío
  turnstileToken?: string;
}

// Llama al endpoint interno que envía la notificación por email (con foto si la hay).
// El servidor construye el asunto/HTML a partir de `data`; nunca se envían ya compuestos.
export async function enviarAvisoEmail(payload: LeadRequest): Promise<EnviarResult> {
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
