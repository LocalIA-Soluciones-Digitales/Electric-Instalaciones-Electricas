// Configuración centralizada del asistente de avisos y presupuestos.
// Cambia aquí oficios, categorías, preguntas o urgencias sin tocar los componentes.

const ID_KEY_PREFIX = "electric_lead_seq_";

function pad(n: number, len = 2) {
  return String(n).padStart(len, "0");
}
function yyMMdd(date: Date) {
  return `${String(date.getFullYear()).slice(-2)}${pad(date.getMonth() + 1, 2)}${pad(
    date.getDate(),
    2
  )}`;
}
function nextSequence(len = 3) {
  try {
    const key = `${ID_KEY_PREFIX}${yyMMdd(new Date())}`;
    const current = Number(localStorage.getItem(key) || "0");
    const next = current + 1;
    localStorage.setItem(key, String(next));
    return pad(next, len);
  } catch {
    return pad(Math.floor(Math.random() * 900) + 100, len);
  }
}

/* ---------- OFICIO ---------- */
export interface AvisoService {
  id: string;
  code: string;
  label: string;
}
export const SERVICE_ELECTRIC: AvisoService = {
  id: "electricidad",
  code: "ELEC",
  label: "Electricidad",
};

/* ---------- CATEGORÍAS (lenguaje cotidiano, no técnico) ---------- */
export interface AvisoIncidence {
  id: string;
  label: string;
  icon: string;
  danger?: boolean;
  unsure?: boolean;
}

export const INCIDENCES: AvisoIncidence[] = [
  { id: "sinluz", label: "Me he quedado sin luz", icon: "ri-flashlight-line" },
  { id: "diferencial", label: "Salta el diferencial", icon: "ri-swap-box-line" },
  { id: "automatico", label: "Salta el automático", icon: "ri-toggle-line" },
  { id: "chispas", label: "Hay chispas o cortocircuito", icon: "ri-alert-line", danger: true },
  { id: "quemado", label: "Huele a quemado", icon: "ri-fire-line", danger: true },
  { id: "iluminacion", label: "Problema de iluminación", icon: "ri-lightbulb-line" },
  { id: "enchufes", label: "Enchufes o interruptores", icon: "ri-plug-line" },
  { id: "reparacion", label: "Necesito una reparación", icon: "ri-tools-line" },
  { id: "no-sabe", label: "No sé qué le pasa", icon: "ri-question-line", unsure: true },
  { id: "otro", label: "Otro problema", icon: "ri-chat-smile-3-line" },
];

/* ---------- PREGUNTAS GUIADAS ----------
   El objetivo es ayudar a describir, no diagnosticar. */
export interface GuideOption {
  id: string;
  label: string;
}
export interface GuideQuestion {
  id: string;
  question: string;
  options: GuideOption[];
}

export const UNSURE_GUIDE: GuideQuestion[] = [
  {
    id: "zona",
    question: "¿Tienes luz en alguna parte de la vivienda?",
    options: [
      { id: "zonas", label: "Sí, en algunas zonas" },
      { id: "ninguna", label: "No, en ninguna" },
      { id: "puntos", label: "Solo algunas luces o enchufes" },
      { id: "noestoyseguro", label: "No estoy seguro" },
    ],
  },
  {
    id: "cuadro",
    question: "¿Has visto saltar algún interruptor del cuadro eléctrico?",
    options: [
      { id: "si", label: "Sí" },
      { id: "no", label: "No" },
      { id: "noestoyseguro", label: "No estoy seguro" },
    ],
  },
  {
    id: "extranio",
    question: "¿Has notado algo extraño antes de que ocurriera?",
    options: [
      { id: "chispas", label: "Chispas" },
      { id: "ruido", label: "Ruido" },
      { id: "quemado", label: "Olor a quemado" },
      { id: "nada", label: "Nada de lo anterior" },
      { id: "noestoyseguro", label: "No estoy seguro" },
    ],
  },
];

export const INCIDENCE_GUIDE: Record<string, GuideQuestion | undefined> = {
  sinluz: {
    id: "sinluz-ext",
    question: "¿Te has quedado sin luz en toda la vivienda?",
    options: [
      { id: "toda", label: "Sí, en toda la vivienda" },
      { id: "habitaciones", label: "No, solo en algunas habitaciones" },
      { id: "puntos", label: "Solo algunos enchufes o luces" },
      { id: "noestoyseguro", label: "No estoy seguro" },
    ],
  },
  diferencial: {
    id: "diferencial-ext",
    question: "¿El diferencial vuelve a saltar cuando intentas subirlo?",
    options: [
      { id: "si", label: "Sí" },
      { id: "no", label: "No" },
      { id: "nosube", label: "No consigo subirlo" },
      { id: "noestoyseguro", label: "No estoy seguro" },
    ],
  },
  automatico: {
    id: "automatico-ext",
    question: "¿Cuándo salta el automático?",
    options: [
      { id: "enchufar", label: "Al enchufar un aparato" },
      { id: "solo", label: "Solo, sin motivo aparente" },
      { id: "continuo", label: "No para de saltar" },
      { id: "noestoyseguro", label: "No estoy seguro" },
    ],
  },
  iluminacion: {
    id: "iluminacion-ext",
    question: "¿Qué ocurre con las luces?",
    options: [
      { id: "parpadean", label: "Parpadean o titilan" },
      { id: "noencienden", label: "No encienden" },
      { id: "fuerte", label: "Cambian de intensidad" },
      { id: "otro", label: "Otra cosa" },
    ],
  },
  enchufes: {
    id: "enchufes-ext",
    question: "¿Qué ocurre con el enchufe o interruptor?",
    options: [
      { id: "noenciende", label: "No da corriente" },
      { id: "suelto", label: "Está suelto o caliente" },
      { id: "chispa", label: "Hace chispa al conectar" },
      { id: "otro", label: "Otra cosa" },
    ],
  },
  reparacion: {
    id: "reparacion-ext",
    question: "¿Dónde está el problema?",
    options: [
      { id: "punto", label: "En un punto concreto (luz/enchufe)" },
      { id: "zona", label: "En una habitación o zona" },
      { id: "cuadro", label: "En el cuadro eléctrico" },
      { id: "otro", label: "En otra parte" },
    ],
  },
};

export const UNSURE_COMFORT = [
  "No te preocupes.",
  "Te haremos unas preguntas muy sencillas para entender mejor qué está ocurriendo.",
  "Si no sabes exactamente qué problema tienes, no pasa nada.",
];

export const SOFT_DIAGNOSIS_NOTE =
  "Parece que puede existir una incidencia eléctrica. No es un diagnóstico profesional: nuestro electricista lo revisará para confirmarlo.";

/* ---------- TIPO DE INMUEBLE ---------- */
export const PROPERTY_TYPES = [
  { id: "vivienda", label: "Vivienda" },
  { id: "local", label: "Local" },
  { id: "oficina", label: "Oficina" },
  { id: "comunidad", label: "Comunidad" },
  { id: "garaje", label: "Garaje" },
  { id: "otro", label: "Otro" },
];

/* ---------- URGENCIA ---------- */
export interface UrgencyOption {
  id: string;
  label: string;
  hint?: string;
}
export const URGENCY_OPTIONS: UrgencyOption[] = [
  { id: "asap", label: "Lo necesito cuanto antes", hint: "Atención prioritaria" },
  { id: "hoy", label: "Hoy", hint: "En lo que queda de día" },
  { id: "otro", label: "Otro momento", hint: "Elige día y franja" },
];
export function urgencyLabel(id: string) {
  return URGENCY_OPTIONS.find((u) => u.id === id)?.label ?? id;
}
export const TIME_SLOTS = [
  { id: "manana", label: "Mañana" },
  { id: "tarde", label: "Tarde" },
  { id: "noche", label: "Noche" },
];

/* ---------- DATOS RECOGIDOS ---------- */
export interface DiagnosisAnswer {
  q: string;
  a: string;
}

export interface AvisoData {
  service: AvisoService;
  incidence?: AvisoIncidence;
  answers: DiagnosisAnswer[];
  description: string;
  propertyType: string;
  address: string;
  locality: string;
  postalCode: string;
  urgency: string;
  otherDate?: string;
  otherSlot?: string;
  name: string;
  phone: string;
  email: string;
}

export function cleanPhone(raw: string) {
  return raw.replace(/[\s.-]/g, "");
}
export function isValidPhone(raw: string) {
  const digits = cleanPhone(raw).replace(/^\+?34/, "");
  return /^[679]\d{8}$/.test(digits);
}
export function isValidEmail(raw: string) {
  if (!raw || !raw.trim()) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw.trim());
}

export function generarIdAviso(serviceCode: string) {
  const today = yyMMdd(new Date());
  return `#${serviceCode}-${today}-${nextSequence()}`;
}

export function formatFechaHora(d = new Date()) {
  const dd = pad(d.getDate(), 2);
  const mm = pad(d.getMonth() + 1, 2);
  const yyyy = d.getFullYear();
  const hh = pad(d.getHours(), 2);
  const mi = pad(d.getMinutes(), 2);
  return `${dd}/${mm}/${yyyy} ${hh}:${mi}`;
}

function propertyLabel(id: string) {
  return PROPERTY_TYPES.find((p) => p.id === id)?.label ?? id;
}

function answersBlock(data: AvisoData) {
  if (!data.answers || data.answers.length === 0) return [];
  const L = ["", "❓ CÓMO LO DESCRIBE EL CLIENTE", ""];
  data.answers.forEach((a) => {
    L.push(`• ${a.q}`);
    L.push(`   → ${a.a}`);
  });
  return L;
}

/* ---------- MENSAJE DE WHATSAPP ---------- */
export function buildWhatsAppMessage(data: AvisoData, avisoId: string, timestamp: string) {
  const L: string[] = [];
  L.push("🚨 NUEVO AVISO DE SERVICIO");
  L.push("");
  L.push("━━━━━━━━━━━━━━━━━━━━");
  L.push("");
  L.push("📌 DATOS DEL AVISO");
  L.push(`Servicio: ${data.service.label}`);
  if (data.incidence) L.push(`Tipo de incidencia: ${data.incidence.label}`);
  L.push(`Urgencia: ${urgencyLabel(data.urgency)}${data.otherSlot ? ` (${data.otherSlot})` : ""}`);
  L.push(...answersBlock(data));
  L.push("");
  L.push("🏠 UBICACIÓN");
  if (data.propertyType) L.push(`Tipo de inmueble: ${propertyLabel(data.propertyType)}`);
  if (data.address.trim()) L.push(`Dirección: ${data.address.trim()}`);
  if (data.locality.trim()) L.push(`Localidad: ${data.locality.trim()}`);
  if (data.postalCode.trim()) L.push(`Código postal: ${data.postalCode.trim()}`);
  L.push("");
  L.push("👤 DATOS DEL CLIENTE");
  if (data.name.trim()) L.push(`Nombre: ${data.name.trim()}`);
  if (data.phone.trim()) L.push(`Teléfono: ${data.phone.trim()}`);
  if (data.email.trim()) L.push(`Email: ${data.email.trim()}`);
  L.push("");
  if (data.description.trim()) {
    L.push("📝 DESCRIPCIÓN DEL PROBLEMA");
    L.push(`"${data.description.trim()}"`);
    L.push("");
  }
  L.push("🕐 DISPONIBILIDAD");
  const disp =
    data.urgency === "otro"
      ? [data.otherDate, data.otherSlot].filter(Boolean).join(" · ")
      : urgencyLabel(data.urgency);
  L.push(`Preferencia: ${disp || "Sin especificar"}`);
  L.push("");
  L.push("━━━━━━━━━━━━━━━━━━━━");
  L.push("");
  L.push(`Aviso recibido: ${timestamp}`);
  L.push(`ID del aviso: ${avisoId}`);
  return L.join("\n");
}

/* ---------- EMAIL INTERNO (aviso urgente) ---------- */
function esc(v: string) {
  return (v || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function emailRow(label: string, value?: string) {
  return `<tr><td style="padding:6px 0;color:#94a3b8;width:200px;vertical-align:top;font-size:14px">${label}</td><td style="padding:6px 0;color:#0f172a;font-weight:600;font-size:14px">${
    value && value.trim() ? esc(value.trim()) : "—"
  }</td></tr>`;
}
function emailSection(title: string) {
  return `<tr><td colspan="2" style="padding:14px 0 6px;border-bottom:1px solid #e2e8f0"><strong style="font-size:12px;letter-spacing:1px;color:#64748b;text-transform:uppercase">${title}</strong></td></tr>`;
}
function emailShell(headerLabel: string, bodyRows: string, actionLabel: string) {
  return `<!doctype html>
<html lang="es">
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
  <body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:24px 16px">
      <tr><td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0">
          <tr><td style="background:#0f1720;padding:20px 24px;color:#ffcb00;font-size:18px;font-weight:bold">${headerLabel}</td></tr>
          <tr><td style="padding:6px 24px 24px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
              ${bodyRows}
            </table>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;background:#ffcb00;border-radius:8px">
              <tr><td style="padding:14px 20px;color:#0f1720;font-weight:bold;font-size:14px">${actionLabel}</td></tr>
            </table>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

export function buildInternalEmail(
  data: AvisoData,
  avisoId: string,
  timestamp: string,
  hasPhoto = false
): { subject: string; html: string; text: string } {
  const subject = `NUEVO AVISO — ${data.service.label.toUpperCase()} — ${
    data.locality.trim() || "BIZKAIA"
  } — ${avisoId}`;

  const answersRows = (data.answers || [])
    .map(
      (a) =>
        `<tr><td style="padding:6px 0;color:#0f172a;font-weight:600;font-size:14px;vertical-align:top">${esc(
          a.q
        )}</td><td style="padding:6px 0;color:#475569;font-size:14px">${esc(a.a)}</td></tr>`
    )
    .join("");

  const bodyRows = `
    ${emailSection("📌 Datos del aviso")}
    ${emailRow("Servicio", data.service.label)}
    ${emailRow("Tipo de incidencia", data.incidence?.label)}
    ${emailRow("Urgencia", `${urgencyLabel(data.urgency)}${data.otherSlot ? ` (${data.otherSlot})` : ""}`)}
    ${
      data.answers && data.answers.length
        ? `${emailSection("❓ Cómo lo describe el cliente")}
          <tr><td colspan="2"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">${answersRows}</table></td></tr>`
        : ""
    }
    ${emailSection("🏠 Ubicación")}
    ${emailRow("Tipo de inmueble", data.propertyType ? propertyLabel(data.propertyType) : "")}
    ${emailRow("Dirección", data.address)}
    ${emailRow("Localidad", data.locality)}
    ${emailRow("Código postal", data.postalCode)}
    ${emailSection("👤 Datos del cliente")}
    ${emailRow("Nombre", data.name)}
    ${emailRow("Teléfono", data.phone)}
    ${emailRow("Email", data.email)}
    ${emailSection("📝 Descripción del problema")}
    ${emailRow("", data.description || "Sin descripción")}
    ${emailSection("🕐 Disponibilidad")}
    ${emailRow(
      "Preferencia",
      data.urgency === "otro"
        ? [data.otherDate, data.otherSlot].filter(Boolean).join(" · ")
        : urgencyLabel(data.urgency)
    )}
    ${emailSection("📎 Información del aviso")}
    ${emailRow("Fecha y hora", timestamp)}
    ${emailRow("ID", avisoId)}
  `;

  const html = emailShell(
    "🚨 NUEVO AVISO DE SERVICIO",
    bodyRows,
    "Acción: contactar con el cliente cuanto antes."
  );

  const text =
    buildWhatsAppMessage(data, avisoId, timestamp).replace(/━━+/g, "-----") +
    (hasPhoto ? "\n\n📷 Fotografía de la avería adjunta a este email." : "");

  return { subject, html, text };
}

/* ---------- PRESUPUESTO SIN COMPROMISO ---------- */
export interface BudgetData {
  workType: string;
  description: string;
  propertyType: string;
  address: string;
  locality: string;
  postalCode: string;
  whenApprox: string;
  name: string;
  phone: string;
  email: string;
}

export function buildBudgetEmail(
  data: BudgetData,
  refId: string,
  timestamp: string
): { subject: string; html: string; text: string } {
  const subject = `SOLICITUD DE PRESUPUESTO — ${data.locality.trim() || "BIZKAIA"} — ${refId}`;

  const bodyRows = `
    ${emailSection("🔨 Trabajo solicitado")}
    ${emailRow("Tipo de trabajo", data.workType)}
    ${emailRow("", data.description || "Sin descripción")}
    ${emailSection("🏠 Ubicación")}
    ${emailRow("Tipo de inmueble", data.propertyType ? propertyLabel(data.propertyType) : "")}
    ${emailRow("Dirección", data.address)}
    ${emailRow("Localidad", data.locality)}
    ${emailRow("Código postal", data.postalCode)}
    ${emailSection("📅 Preferencia")}
    ${emailRow("Cuándo", data.whenApprox)}
    ${emailSection("👤 Datos del cliente")}
    ${emailRow("Nombre", data.name)}
    ${emailRow("Teléfono", data.phone)}
    ${emailRow("Email", data.email)}
    ${emailSection("📎 Información")}
    ${emailRow("Fecha y hora", timestamp)}
    ${emailRow("Referencia", refId)}
  `;

  const html = emailShell(
    "📋 SOLICITUD DE PRESUPUESTO SIN COMPROMISO",
    bodyRows,
    "Acción: preparar presupuesto sin compromiso y contactar con el cliente."
  );

  const text = `📋 SOLICITUD DE PRESUPUESTO SIN COMPROMISO
Ref: ${refId}
Tipo de trabajo: ${data.workType || "—"}
Descripción: ${data.description || "—"}
Ubicación: ${[data.address, data.locality, data.postalCode].filter(Boolean).join(", ") || "—"}
Tipo de inmueble: ${data.propertyType ? propertyLabel(data.propertyType) : "—"}
Cuándo: ${data.whenApprox || "—"}
Nombre: ${data.name || "—"}
Teléfono: ${data.phone || "—"}
Email: ${data.email || "—"}
Recibido: ${timestamp}`;

  return { subject, html, text };
}
