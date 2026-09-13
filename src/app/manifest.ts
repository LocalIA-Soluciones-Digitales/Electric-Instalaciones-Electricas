import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Electric Instalaciones Eléctricas",
    short_name: "Electric",
    description: "Electricista urgente 24 horas en Barakaldo, Bilbao y Euskadi.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
