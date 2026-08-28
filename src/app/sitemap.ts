import type { MetadataRoute } from "next";
import { business } from "@/lib/business";
import { services } from "@/lib/services";
import { localities } from "@/lib/localities";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/servicios", "/contacto"].map((path) => ({
    url: `${business.domain}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${business.domain}/servicios/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const localityRoutes = localities.map((l) => ({
    url: `${business.domain}/electricista-${l.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...serviceRoutes, ...localityRoutes];
}
