import { ImageResponse } from "next/og";
import { business } from "@/lib/business";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#050505",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              background: "#ffcb00",
              color: "#050505",
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            ⚡
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase" }}>
            {business.shortName}
          </div>
        </div>
        <div style={{ display: "flex", marginTop: 48, fontSize: 58, fontWeight: 800, lineHeight: 1.1, maxWidth: 920 }}>
          Electricista urgente 24h en Barakaldo y Euskadi
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#ffcb00", fontWeight: 700 }}>
          {business.phoneDisplay} · Presupuesto sin compromiso
        </div>
      </div>
    ),
    { ...size }
  );
}
