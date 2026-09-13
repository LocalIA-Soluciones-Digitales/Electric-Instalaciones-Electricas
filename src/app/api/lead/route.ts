import { NextResponse } from "next/server";
import { business } from "@/lib/business";
import { buildInternalEmail, buildBudgetEmail, isValidEmail, isValidPhone } from "@/lib/leadConfig";
import { LeadRequestSchema } from "@/lib/leadSchema";
import { decodeImageOrNull } from "@/lib/imageValidation";
import { checkRateLimit, clientIpFrom } from "@/lib/rateLimit";
import { verifyTurnstile } from "@/lib/turnstile";
import { archiveLead } from "@/lib/leadStore";
import { notifyLeadFailure } from "@/lib/alerts";
import { insertLeadForDashboard } from "@/lib/supabaseLeads";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 4 * 1024 * 1024; // 4 MB (foto máx. 3 MB en base64 + margen)
const ID_RE = /^#[A-Z0-9]{1,20}-\d{4,8}-\d{1,6}$/;

function sanitizeAvisoId(raw: string, fallbackPrefix: string): string {
  const cleaned = raw.replace(/[^A-Za-z0-9#-]/g, "").slice(0, 40);
  if (ID_RE.test(cleaned)) return cleaned;
  return `#${fallbackPrefix}-${Date.now()}`;
}

function genericError(status: number, error: string, message?: string) {
  return NextResponse.json({ ok: false, error, message }, { status });
}

export async function POST(req: Request) {
  const ip = clientIpFrom(req);

  // 1. Origen: solo se acepta el propio dominio (o ausencia de Origin, p. ej. curl/Postman en pruebas manuales).
  const origin = req.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).hostname !== new URL(business.domain).hostname) {
        console.warn(`[api/lead] origen no permitido: ${origin} (ip=${ip})`);
        return genericError(403, "origen-no-permitido");
      }
    } catch {
      return genericError(403, "origen-no-permitido");
    }
  }

  // 2. Límite de tamaño del cuerpo, antes de parsear nada.
  const contentLength = Number(req.headers.get("content-length") || "0");
  if (contentLength > MAX_BODY_BYTES) {
    console.warn(`[api/lead] payload demasiado grande: ${contentLength} bytes (ip=${ip})`);
    return genericError(413, "payload-demasiado-grande");
  }

  // 3. Rate limiting por IP.
  if (!(await checkRateLimit(ip))) {
    console.warn(`[api/lead] rate limit excedido (ip=${ip})`);
    return genericError(429, "demasiadas-solicitudes", "Demasiadas solicitudes, inténtalo más tarde.");
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return genericError(400, "body-invalido");
  }

  const parsed = LeadRequestSchema.safeParse(json);
  if (!parsed.success) {
    console.warn(`[api/lead] payload no válido (ip=${ip})`, parsed.error.flatten());
    return genericError(400, "body-invalido");
  }
  const body = parsed.data;

  // 4. Honeypot: si el campo trampa viene relleno, es un bot. Se responde
  // como si hubiera ido bien para no revelar la detección, sin enviar nada.
  if (body.hp) {
    console.warn(`[api/lead] honeypot activado (ip=${ip})`);
    return NextResponse.json({ ok: true, emailId: null });
  }

  // 5. Verificación humana (no-op si no hay TURNSTILE_SECRET_KEY configurada).
  const humanOk = await verifyTurnstile(body.turnstileToken, ip);
  if (!humanOk) {
    console.warn(`[api/lead] verificación humana fallida (ip=${ip})`);
    return genericError(403, "verificacion-fallida", "No se ha podido verificar la solicitud.");
  }

  // 6. Validación de negocio adicional (formato real de teléfono/email).
  if (!isValidPhone(body.data.phone)) {
    return genericError(400, "telefono-invalido", "El teléfono no es válido.");
  }
  if (body.data.email && !isValidEmail(body.data.email)) {
    return genericError(400, "email-invalido", "El email no es válido.");
  }

  const avisoId = sanitizeAvisoId(body.avisoId, body.kind === "aviso" ? "ELEC" : "BUD");
  const timestamp = new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" });

  // 7. Foto: se valida la firma binaria real; si no es una imagen válida, se
  // descarta el adjunto pero el aviso se envía igualmente (nunca debe
  // perderse un aviso real por una foto corrupta o manipulada).
  let photoBuffer: Buffer | null = null;
  if (body.photo) {
    photoBuffer = decodeImageOrNull(body.photo);
    if (!photoBuffer) console.warn(`[api/lead] foto adjunta rechazada (ip=${ip})`);
  }

  // 7b. Archivo de respaldo (no-op si Upstash no está configurado): el aviso
  // queda registrado aquí independientemente de si el email interno llega a
  // enviarse o no, para que nunca se pierda solo por un fallo de Resend.
  const archive = (emailSent: boolean) => {
    void insertLeadForDashboard({
      nombre: body.data.name,
      telefono: body.data.phone,
      email: body.data.email,
      mensaje: body.data.description,
      origen: body.kind,
    });
    return archiveLead({
      avisoId,
      kind: body.kind,
      data: body.data,
      hasPhoto: !!photoBuffer,
      emailSent,
      createdAt: new Date().toISOString(),
    });
  };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    await archive(false);
    return genericError(503, "email-no-config", "El envío de email interno aún no está configurado.");
  }

  // 8. El asunto/HTML/texto del email se construyen siempre en el servidor a
  // partir de datos estructurados y ya validados: el cliente no puede
  // inyectar HTML ni cabeceras de email.
  const { subject, html, text } =
    body.kind === "aviso"
      ? buildInternalEmail(body.data, avisoId, timestamp, !!photoBuffer)
      : buildBudgetEmail(body.data, avisoId, timestamp);

  const from = process.env.RESEND_FROM_EMAIL || `avisos@${new URL(business.domain).hostname.replace(/^www\./, "")}`;

  const payload: Record<string, unknown> = { from, to: [business.email], subject, html, text };
  if (photoBuffer) {
    const fileBase = avisoId.replace(/[^A-Za-z0-9_-]/g, "").slice(0, 40) || `aviso_${Date.now()}`;
    payload.attachments = [{ filename: `foto_${fileBase}.jpg`, content: photoBuffer.toString("base64") }];
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const resJson = await res.json().catch(() => null);
    if (!res.ok) {
      console.error(`[api/lead] error de Resend (ip=${ip})`, res.status, resJson);
      await archive(false);
      await notifyLeadFailure("resend-error", { avisoId, status: res.status, ip });
      return genericError(502, "resend-error", "No se pudo enviar el email.");
    }
    await archive(true);
    return NextResponse.json({ ok: true, emailId: resJson?.id });
  } catch (err) {
    console.error(`[api/lead] fallo al llamar a Resend (ip=${ip})`, err);
    await archive(false);
    await notifyLeadFailure("resend-fetch-exception", { avisoId, ip });
    return genericError(502, "resend-error", "No se pudo enviar el email.");
  }
}
