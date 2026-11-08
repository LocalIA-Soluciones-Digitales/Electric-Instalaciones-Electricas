import { NextResponse } from "next/server";
import { business } from "@/lib/business";
import { checkRateLimit, clientIpFrom } from "@/lib/rateLimit";

// Aviso inmediato cada vez que alguien pulsa "Llamar" o "WhatsApp" en la web.
//
// Un enlace tel:/wa.me solo abre la app del móvil: la web no puede saber si la
// llamada llegó a hacerse. Esto notifica el *clic* (intención de contactar),
// que sirve para contrastar con las llamadas que se reportan.
//
// Destinos (ambos opcionales e independientes):
// - Email vía Resend a CONTACT_CLICK_EMAIL (o, si no existe, a LEAD_CC_EMAIL).
// - Telegram si TELEGRAM_BOT_TOKEN y TELEGRAM_CHAT_ID están configurados.
//
// No usa cookies ni guarda la IP: solo el tipo de botón, la página y el tipo
// de dispositivo, así que no depende del consentimiento de cookies.

export const runtime = "nodejs";

const KINDS = { call: "📞 Llamada", whatsapp: "💬 WhatsApp" } as const;
type Kind = keyof typeof KINDS;

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.replace(/[\u0000-\u001f<>]/g, " ").trim().slice(0, max) : "";
}

function deviceFrom(ua: string): string {
  if (/iPhone|Android.+Mobile|Mobile Safari/i.test(ua)) return "móvil";
  if (/iPad|Tablet|Android/i.test(ua)) return "tablet";
  return "ordenador (no puede llamar directamente)";
}

async function sendEmail(subject: string, text: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = (process.env.CONTACT_CLICK_EMAIL || process.env.LEAD_CC_EMAIL || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (!apiKey || !to.length) return;

  const from =
    process.env.RESEND_FROM_EMAIL || `avisos@${new URL(business.domain).hostname.replace(/^www\./, "")}`;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, text }),
  });
  if (!res.ok) console.error(`[api/contact-click] Resend respondió ${res.status}`);
}

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
  });
  if (!res.ok) console.error(`[api/contact-click] Telegram respondió ${res.status}`);
}

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  if (origin && process.env.NODE_ENV === "production") {
    try {
      if (new URL(origin).hostname !== new URL(business.domain).hostname) {
        return new NextResponse(null, { status: 403 });
      }
    } catch {
      return new NextResponse(null, { status: 403 });
    }
  }

  // Evita que un bot que martillee el endpoint llene el buzón.
  if (!(await checkRateLimit(`click:${clientIpFrom(req)}`))) {
    return new NextResponse(null, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    // Se envía con sendBeacon como text/plain, así que se parsea a mano.
    body = JSON.parse((await req.text()).slice(0, 2000));
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  const kind = body.kind as Kind;
  if (!(kind in KINDS)) return new NextResponse(null, { status: 400 });

  const page = clean(body.page, 200) || "/";
  const label = clean(body.label, 80);
  const device = deviceFrom(req.headers.get("user-agent") || "");
  const when = new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" });

  const subject = `${KINDS[kind]} pulsado en la web (${when})`;
  const text = [
    `${KINDS[kind]} — alguien ha pulsado el botón en ${business.domain.replace(/^https?:\/\//, "")}`,
    `Hora (España): ${when}`,
    `Página: ${page}`,
    label ? `Botón: ${label}` : "",
    `Dispositivo: ${device}`,
  ]
    .filter(Boolean)
    .join("\n");

  await Promise.allSettled([sendEmail(subject, text), sendTelegram(text)]);
  return new NextResponse(null, { status: 204 });
}
