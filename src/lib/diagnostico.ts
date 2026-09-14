// Configuración del "Diagnóstico Eléctrico Inteligente" (home). Árbol de
// preguntas corto (1-2 preguntas) pensado para triaje rápido, no para
// sustituir los datos completos de un aviso: reutiliza el mismo formato de
// mensaje de WhatsApp y el mismo endpoint /api/lead que el resto del sitio
// (ver src/lib/leadConfig.ts), pero con muchos menos campos.

import { SERVICE_ELECTRIC, type AvisoData, type DiagnosisAnswer } from "@/lib/leadConfig";

// Sentinel usado también por leadConfig.ts (urgencyLabel/buildWhatsAppMessage):
// cuando urgency === OTHER_AVAILABILITY_ID, el mensaje de WhatsApp y el email
// interno muestran la fecha y franja elegidas en vez de una etiqueta fija.
export const OTHER_AVAILABILITY_ID = "otro";

/* ---------- PREGUNTA 1: ¿QUÉ TE OCURRE? ---------- */
export interface AveriaOption {
  id: string;
  label: string;
  hint: string;
  icon: string;
  danger?: boolean;
}

export const AVERIA_OPTIONS: AveriaOption[] = [
  {
    id: "sinluz",
    label: "Me he quedado sin luz",
    hint: "En toda la casa o en una zona",
    icon: "ri-flashlight-line",
  },
  {
    id: "riesgo",
    label: "Huele a quemado o veo chispas",
    hint: "Riesgo eléctrico inmediato",
    icon: "ri-fire-line",
    danger: true,
  },
  {
    id: "diferencial",
    label: "Salta el diferencial o automático",
    hint: "El interruptor del cuadro eléctrico",
    icon: "ri-swap-box-line",
  },
  {
    id: "nosabe",
    label: "No sé qué ocurre",
    hint: "Te ayudamos a identificarlo",
    icon: "ri-question-line",
  },
];

/* ---------- PREGUNTA 2 (según la opción elegida) ---------- */
export type Priority = "alta" | "media";

export interface FollowUpOption {
  id: string;
  label: string;
  icon: string;
  priority: Priority;
}
export interface FollowUpQuestion {
  question: string;
  options: FollowUpOption[];
}

export const FOLLOW_UP: Record<string, FollowUpQuestion> = {
  sinluz: {
    question: "¿Dónde no tienes suministro?",
    options: [
      { id: "vivienda", label: "En toda la vivienda", icon: "ri-home-4-line", priority: "alta" },
      { id: "zona", label: "En una zona concreta", icon: "ri-door-open-line", priority: "media" },
      { id: "enchufe", label: "En un enchufe concreto", icon: "ri-plug-line", priority: "media" },
    ],
  },
  diferencial: {
    question: "¿Ocurre continuamente?",
    options: [
      { id: "si", label: "Sí, salta una y otra vez", icon: "ri-check-double-line", priority: "alta" },
      { id: "no", label: "No, ha sido puntual", icon: "ri-close-line", priority: "media" },
      { id: "noseguro", label: "No estoy seguro", icon: "ri-question-line", priority: "media" },
    ],
  },
  nosabe: {
    question: "Selecciona lo que mejor describa la situación",
    options: [
      { id: "seva", label: "Se va la luz", icon: "ri-flashlight-line", priority: "media" },
      { id: "interruptor", label: "Salta algún interruptor", icon: "ri-toggle-line", priority: "alta" },
      { id: "fallan", label: "Las luces fallan", icon: "ri-lightbulb-flash-line", priority: "media" },
      { id: "enchufes", label: "Algunos enchufes no funcionan", icon: "ri-plug-2-line", priority: "media" },
      { id: "otro", label: "Otro problema", icon: "ri-chat-smile-3-line", priority: "media" },
    ],
  },
};

export function priorityMeta(priority: Priority) {
  return priority === "alta"
    ? { label: "Alta", time: "30-60 minutos", badge: "border-red-200 bg-red-50 text-red-700" }
    : { label: "Media", time: "1-3 horas", badge: "border-electric-500/25 bg-electric-400/10 text-electric-800" };
}

/* ---------- DATOS PARA EL AVISO (mismo formato que el resto del sitio) ---------- */
export function buildAveriaAvisoData(params: {
  incidenceLabel: string;
  danger?: boolean;
  question?: string;
  answer?: string;
  phone: string;
  address?: string;
  /** Id de AVERIA_AVAILABILITY ("ahora" | OTHER_AVAILABILITY_ID) */
  availabilityId?: string;
  availabilityLabel?: string;
  otherDate?: string;
  otherSlot?: string;
}): AvisoData {
  const answers: DiagnosisAnswer[] = [];
  if (params.question && params.answer) answers.push({ q: params.question, a: params.answer });
  const isOther = params.availabilityId === OTHER_AVAILABILITY_ID;
  return {
    service: SERVICE_ELECTRIC,
    incidence: {
      id: "diagnostico",
      label: params.incidenceLabel,
      icon: params.danger ? "ri-fire-line" : "ri-flashlight-line",
      danger: params.danger,
    },
    answers,
    description: "",
    propertyType: "",
    address: params.address?.trim() ?? "",
    locality: "",
    postalCode: "",
    urgency: isOther ? OTHER_AVAILABILITY_ID : params.availabilityLabel ?? "asap",
    otherDate: isOther ? params.otherDate ?? "" : "",
    otherSlot: isOther ? params.otherSlot ?? "" : "",
    name: "",
    phone: params.phone,
    email: "",
  };
}

/* ---------- DIRECCIÓN Y DISPONIBILIDAD ---------- */
export interface AvailabilityOption {
  id: string;
  label: string;
}

export const AVERIA_AVAILABILITY: AvailabilityOption[] = [
  { id: "ahora", label: "Ahora mismo" },
  { id: OTHER_AVAILABILITY_ID, label: "Elegir día y horario" },
];

export const TRABAJO_AVAILABILITY: AvailabilityOption[] = [
  { id: "dias", label: "En los próximos días" },
  { id: "semana", label: "Esta semana" },
  { id: "mes", label: "Este mes" },
  { id: "sinfecha", label: "Aún sin fecha (solo quiero información)" },
];

/* ---------- TRABAJO ELÉCTRICO (no urgente) ---------- */
export interface TrabajoCategory {
  id: string;
  label: string;
  icon: string;
}

export const TRABAJO_CATEGORIES: TrabajoCategory[] = [
  { id: "instalacion", label: "Instalación eléctrica", icon: "ri-plug-2-line" },
  { id: "reparacion", label: "Reparación eléctrica", icon: "ri-tools-line" },
  { id: "boletin", label: "Boletín eléctrico", icon: "ri-file-shield-2-line" },
  { id: "iluminacion", label: "Iluminación", icon: "ri-lightbulb-line" },
  { id: "cuadro", label: "Cuadro eléctrico", icon: "ri-archive-drawer-line" },
  { id: "reforma", label: "Reforma eléctrica", icon: "ri-hammer-line" },
  { id: "otro", label: "Otro trabajo", icon: "ri-more-line" },
];
