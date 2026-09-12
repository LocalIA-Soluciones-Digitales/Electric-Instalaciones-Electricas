// Alertas de errores para /api/lead, opcionales y sin dependencias nuevas.
//
// Hoy los fallos (Resend caído, email no configurado, verificación humana
// fallida...) solo quedan en los logs de runtime de Vercel: nadie se entera
// hasta que el cliente dice que no le hemos contactado. Si se configura
// LEAD_ALERT_WEBHOOK_URL, cada fallo relevante se notifica también ahí — una
// URL de webhook entrante de Slack o Discord funciona tal cual (ambas
// aceptan un POST con { text: "..." }); para otro destino, basta con un
// endpoint propio que acepte el mismo formato. Sin esa variable, no-op: el
// comportamiento es idéntico al actual.
export async function notifyLeadFailure(reason: string, context: Record<string, unknown> = {}): Promise<void> {
  const webhookUrl = process.env.LEAD_ALERT_WEBHOOK_URL;
  if (!webhookUrl) return;

  const lines = [
    `⚠️ Fallo en /api/lead: *${reason}*`,
    ...Object.entries(context).map(([key, value]) => `• ${key}: ${JSON.stringify(value)}`),
  ];

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: lines.join("\n") }),
    });
  } catch (err) {
    console.error("[alerts] no se pudo notificar el fallo al webhook", err);
  }
}
