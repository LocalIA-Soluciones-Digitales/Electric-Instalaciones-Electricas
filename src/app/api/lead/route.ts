import { NextResponse } from "next/server";
import { business } from "@/lib/business";

export const runtime = "nodejs";

interface LeadPayload {
  avisoId?: string;
  subject?: string;
  html?: string;
  text?: string;
  photo?: string; // data URL opcional
}

function dataUrlToBase64(dataUrl: string): string | null {
  const idx = dataUrl.indexOf(",");
  if (idx === -1) return null;
  return dataUrl.slice(idx + 1);
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "email-no-config", message: "El envío de email interno aún no está configurado." },
      { status: 503 }
    );
  }

  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "body-invalido" }, { status: 400 });
  }

  const avisoId = body.avisoId || "AVISO";
  const subject = body.subject || "Nuevo aviso de servicio";
  const text = body.text || "";
  const html = body.html || text.replace(/\n/g, "<br/>");

  const from = process.env.RESEND_FROM_EMAIL || `avisos@${new URL(business.domain).hostname.replace(/^www\./, "")}`;

  const payload: Record<string, unknown> = {
    from,
    to: [business.email],
    subject,
    html,
    text,
  };

  if (body.photo) {
    const base64 = dataUrlToBase64(body.photo);
    if (base64) {
      const fileBase = avisoId.replace(/[^A-Za-z0-9_-]/g, "").slice(0, 40) || `aviso_${Date.now()}`;
      payload.attachments = [{ filename: `foto_${fileBase}.jpg`, content: base64 }];
    }
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const resJson = await res.json().catch(() => null);
    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: "resend-error", message: resJson?.message || "No se pudo enviar el email." },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true, emailId: resJson?.id });
  } catch {
    return NextResponse.json({ ok: false, error: "resend-error", message: "No se pudo enviar el email." }, { status: 502 });
  }
}
