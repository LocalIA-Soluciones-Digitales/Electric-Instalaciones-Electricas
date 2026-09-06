import { z } from "zod";

// Esquemas de validación server-side para /api/lead. El servidor nunca acepta
// asunto/HTML ya compuestos por el cliente: solo campos estructurados y
// acotados, a partir de los cuales el propio servidor construye el email
// (ver src/lib/leadConfig.ts). Todas las cadenas recortan saltos de línea
// para evitar inyección de cabeceras (CRLF) en el asunto del email.
function safeStr(max: number) {
  return z
    .string()
    .max(max)
    .transform((s) => s.replace(/[\r\n]+/g, " ").trim());
}

const AvisoServiceSchema = z.object({
  id: safeStr(40),
  code: safeStr(20),
  label: safeStr(60),
});

const AvisoIncidenceSchema = z.object({
  id: safeStr(40),
  label: safeStr(80),
  icon: safeStr(60),
  danger: z.boolean().optional(),
  unsure: z.boolean().optional(),
});

const DiagnosisAnswerSchema = z.object({
  q: safeStr(200),
  a: safeStr(200),
});

export const AvisoDataSchema = z.object({
  service: AvisoServiceSchema,
  incidence: AvisoIncidenceSchema.optional(),
  answers: z.array(DiagnosisAnswerSchema).max(5).default([]),
  description: safeStr(500),
  propertyType: safeStr(50),
  address: safeStr(200),
  locality: safeStr(100),
  postalCode: safeStr(12),
  urgency: safeStr(50),
  otherDate: safeStr(20).optional().default(""),
  otherSlot: safeStr(50).optional().default(""),
  name: safeStr(100),
  phone: safeStr(20),
  email: safeStr(200).optional().default(""),
});

export const BudgetDataSchema = z.object({
  workType: safeStr(100),
  description: safeStr(500),
  propertyType: safeStr(50),
  address: safeStr(200),
  locality: safeStr(100),
  postalCode: safeStr(12),
  whenApprox: safeStr(100),
  name: safeStr(100),
  phone: safeStr(20),
  email: safeStr(200).optional().default(""),
});

export const LeadRequestSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("aviso"),
    avisoId: safeStr(40),
    data: AvisoDataSchema,
    photo: z.string().max(6_000_000).optional(),
    hp: z.string().max(200).optional().default(""),
    turnstileToken: z.string().max(4000).optional(),
  }),
  z.object({
    kind: z.literal("presupuesto"),
    avisoId: safeStr(40),
    data: BudgetDataSchema,
    photo: z.string().max(6_000_000).optional(),
    hp: z.string().max(200).optional().default(""),
    turnstileToken: z.string().max(4000).optional(),
  }),
]);

export type LeadRequest = z.infer<typeof LeadRequestSchema>;
