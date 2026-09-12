import { afterEach, describe, expect, it, vi } from "vitest";
import { notifyLeadFailure } from "@/lib/alerts";

describe("notifyLeadFailure", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("no hace ninguna petición si LEAD_ALERT_WEBHOOK_URL no está configurada", async () => {
    vi.stubEnv("LEAD_ALERT_WEBHOOK_URL", "");
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    await notifyLeadFailure("resend-error", { avisoId: "#ELEC-1-1" });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("hace POST al webhook con el motivo y el contexto cuando está configurada", async () => {
    vi.stubEnv("LEAD_ALERT_WEBHOOK_URL", "https://hooks.example.com/incoming");
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("ok"));

    await notifyLeadFailure("resend-error", { avisoId: "#ELEC-1-1", status: 500 });

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe("https://hooks.example.com/incoming");
    const body = JSON.parse(String(init?.body));
    expect(body.text).toContain("resend-error");
    expect(body.text).toContain("#ELEC-1-1");
  });

  it("no lanza si el webhook falla, solo lo registra", async () => {
    vi.stubEnv("LEAD_ALERT_WEBHOOK_URL", "https://hooks.example.com/incoming");
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network down"));
    vi.spyOn(console, "error").mockImplementation(() => {});

    await expect(notifyLeadFailure("resend-error", {})).resolves.toBeUndefined();
  });
});
