import { describe, expect, it } from "vitest";
import { LeadRequestSchema } from "@/lib/leadSchema";

function validAvisoPayload(overrides: Record<string, unknown> = {}) {
  return {
    kind: "aviso" as const,
    avisoId: "#ELEC-260101-001",
    data: {
      service: { id: "electricidad", code: "ELEC", label: "Electricidad" },
      answers: [],
      description: "Se ha ido la luz en toda la casa",
      propertyType: "vivienda",
      address: "Calle Falsa 123",
      locality: "Barakaldo",
      postalCode: "48903",
      urgency: "asap",
      name: "Jane Doe",
      phone: "600000000",
    },
    ...overrides,
  };
}

describe("LeadRequestSchema", () => {
  it("acepta un payload de aviso válido y completa los campos opcionales por defecto", () => {
    const parsed = LeadRequestSchema.safeParse(validAvisoPayload());
    expect(parsed.success).toBe(true);
    if (parsed.success && parsed.data.kind === "aviso") {
      expect(parsed.data.data.email).toBe("");
      expect(parsed.data.hp).toBe("");
    }
  });

  it("rechaza un payload sin los campos obligatorios", () => {
    const parsed = LeadRequestSchema.safeParse({ kind: "aviso", avisoId: "#ELEC-1-1" });
    expect(parsed.success).toBe(false);
  });

  it("rechaza un kind desconocido", () => {
    const parsed = LeadRequestSchema.safeParse(validAvisoPayload({ kind: "otro" }));
    expect(parsed.success).toBe(false);
  });

  it("elimina saltos de línea de los campos de texto (protección anti inyección de cabeceras)", () => {
    const payload = validAvisoPayload();
    (payload.data as { description: string }).description = "Línea 1\r\nLínea 2\ninyectada";
    const parsed = LeadRequestSchema.safeParse(payload);
    expect(parsed.success).toBe(true);
    if (parsed.success && parsed.data.kind === "aviso") {
      expect(parsed.data.data.description).not.toContain("\n");
      expect(parsed.data.data.description).not.toContain("\r");
      expect(parsed.data.data.description).toContain("Línea 1 Línea 2 inyectada");
    }
  });

  it("rechaza campos que superan la longitud máxima permitida", () => {
    const payload = validAvisoPayload();
    (payload.data as { description: string }).description = "a".repeat(600);
    const parsed = LeadRequestSchema.safeParse(payload);
    expect(parsed.success).toBe(false);
  });
});
