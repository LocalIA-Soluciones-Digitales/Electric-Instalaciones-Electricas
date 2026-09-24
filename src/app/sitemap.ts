import type { MetadataRoute } from "next";
import { business } from "@/lib/business";
import { services } from "@/lib/services";
import { guides } from "@/lib/guides";
import { zonePages } from "@/lib/zonePages";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = [
    "",
    "/servicios",
    "/contacto",
    "/guias",
    "/zonas-de-servicio",
    "/zonas-de-servicio/barakaldo",
  ].map((path) => ({
    url: `${business.domain}${path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : path === "/zonas-de-servicio" || path === "/zonas-de-servicio/barakaldo" ? 0.9 : 0.8,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${business.domain}/servicios/${s.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const zoneRoutes = zonePages.map((z) => ({
    url: `${business.domain}/zonas-de-servicio/${z.slug}`,
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

  return [...staticRoutes, ...zoneRoutes, ...serviceRoutes, ...guideRoutes];
}
