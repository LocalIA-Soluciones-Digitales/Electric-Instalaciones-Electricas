import { describe, expect, it } from "vitest";
import {
  buildInternalEmail,
  buildWhatsAppMessage,
  cleanPhone,
  isValidEmail,
  isValidPhone,
  SERVICE_ELECTRIC,
  urgencyLabel,
  type AvisoData,
} from "@/lib/leadConfig";

function baseAviso(overrides: Partial<AvisoData> = {}): AvisoData {
  return {
    service: SERVICE_ELECTRIC,
    answers: [],
    description: "",
    propertyType: "vivienda",
    address: "Calle Falsa 123",
    locality: "Barakaldo",
    postalCode: "48903",
    urgency: "asap",
    name: "Jane Doe",
    phone: "600000000",
    email: "",
    ...overrides,
  };
}

describe("isValidPhone", () => {
  it("acepta móviles y fijos españoles de 9 dígitos que empiezan por 6, 7 o 9", () => {
    expect(isValidPhone("600000000")).toBe(true);
    expect(isValidPhone("711111111")).toBe(true);
    expect(isValidPhone("911111111")).toBe(true);
  });

  it("acepta el prefijo +34 y separadores comunes", () => {
    expect(isValidPhone("+34 600 00 00 00")).toBe(true);
    expect(isValidPhone("34-600-00-00-00")).toBe(true);
  });

  it("rechaza números con menos o más de 9 dígitos, o que no empiezan por 6/7/9", () => {
    expect(isValidPhone("60000000")).toBe(false);
    expect(isValidPhone("6000000000")).toBe(false);
    expect(isValidPhone("500000000")).toBe(false);
    expect(isValidPhone("")).toBe(false);
  });
});

describe("isValidEmail", () => {
  it("trata el email vacío como válido (es opcional)", () => {
    expect(isValidEmail("")).toBe(true);
    expect(isValidEmail("   ")).toBe(true);
  });

  it("acepta un email con formato básico correcto", () => {
    expect(isValidEmail("cliente@example.com")).toBe(true);
  });

  it("rechaza un email sin arroba o sin dominio", () => {
    expect(isValidEmail("no-es-un-email")).toBe(false);
    expect(isValidEmail("cliente@")).toBe(false);
  });
});

describe("cleanPhone", () => {
  it("quita espacios, puntos y guiones", () => {
    expect(cleanPhone("600 00.00-00")).toBe("600000000");
  });
});

describe("urgencyLabel", () => {
  it("devuelve la etiqueta legible de una urgencia conocida", () => {
    expect(urgencyLabel("asap")).toBe("Lo necesito cuanto antes");
  });

  it("devuelve el propio id si no reconoce la urgencia", () => {
    expect(urgencyLabel("no-existe")).toBe("no-existe");
  });
});

describe("buildWhatsAppMessage", () => {
  it("incluye los datos clave del aviso en el mensaje de texto", () => {
    const msg = buildWhatsAppMessage(baseAviso(), "#ELEC-260101-001", "01/01/2026 10:00");
    expect(msg).toContain("Electricidad");
    expect(msg).toContain("Jane Doe");
    expect(msg).toContain("600000000");
    expect(msg).toContain("#ELEC-260101-001");
  });
});

describe("buildInternalEmail", () => {
  it("escapa HTML en los campos de usuario para evitar inyección en el email", () => {
    const data = baseAviso({ name: '<img src=x onerror=alert(1)>', description: "Ok & bien" });
    const { html } = buildInternalEmail(data, "#ELEC-260101-001", "01/01/2026 10:00");
    expect(html).not.toContain("<img src=x onerror=alert(1)>");
    expect(html).toContain("&lt;img src=x onerror=alert(1)&gt;");
    expect(html).toContain("Ok &amp; bien");
  });

  it("genera un asunto con el servicio, la localidad y el id del aviso", () => {
    const { subject } = buildInternalEmail(baseAviso(), "#ELEC-260101-001", "01/01/2026 10:00");
    expect(subject).toContain("ELECTRICIDAD");
    expect(subject).toContain("Barakaldo");
    expect(subject).toContain("#ELEC-260101-001");
  });
});
