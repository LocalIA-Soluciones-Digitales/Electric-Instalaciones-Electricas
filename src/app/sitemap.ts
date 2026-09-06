import type { MetadataRoute } from "next";
import { business } from "@/lib/business";
import { services } from "@/lib/services";
import { localities } from "@/lib/localities";
import { guides } from "@/lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = ["", "/servicios", "/contacto", "/guias"].map((path) => ({
    url: `${business.domain}${path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${business.domain}/servicios/${s.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const localityRoutes = localities.map((l) => ({
    url: `${business.domain}/electricista-${l.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const comboRoutes = localities.flatMap((l) =>
    services.map((s) => ({
      url: `${business.domain}/electricista-${l.slug}/${s.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  const guideRoutes = guides.map((g) => ({
    url: `${business.domain}/guias/${g.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...serviceRoutes, ...localityRoutes, ...comboRoutes, ...guideRoutes];
}
