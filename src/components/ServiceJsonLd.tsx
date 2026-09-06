import { business } from "@/lib/business";
import { localities } from "@/lib/localities";
import { safeJsonLd } from "@/lib/jsonld";
import type { Service } from "@/lib/services";

export default function ServiceJsonLd({ service, locality }: { service: Service; locality?: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: locality ? `${service.name} en ${locality}` : service.name,
    description: service.metaDescription,
    provider: {
      "@type": "Electrician",
      name: business.name,
      telephone: `+${business.whatsapp}`,
      "@id": business.domain,
    },
    areaServed: locality
      ? [{ "@type": "City", name: locality }]
      : localities.map((l) => ({ "@type": "City", name: l.name })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
    />
  );
}
