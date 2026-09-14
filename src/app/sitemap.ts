import type { MetadataRoute } from "next";
import { business } from "@/lib/business";
import { services } from "@/lib/services";
import { guides } from "@/lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = ["", "/servicios", "/contacto", "/guias", "/zonas-de-servicio"].map((path) => ({
    url: `${business.domain}${path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : path === "/zonas-de-servicio" ? 0.9 : 0.8,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${business.domain}/servicios/${s.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const guideRoutes = guides.map((g) => ({
    url: `${business.domain}/guias/${g.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...serviceRoutes, ...guideRoutes];
}
