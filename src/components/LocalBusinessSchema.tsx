import { business } from "@/lib/business";
import { services } from "@/lib/services";

export default function LocalBusinessSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: business.name,
    image: `${business.domain}/opengraph-image`,
    "@id": business.domain,
    url: business.domain,
    telephone: `+${business.whatsapp}`,
    email: business.email,
    priceRange: business.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    areaServed: [
      "Barakaldo",
      "Bilbao",
      "Getxo",
      "Portugalete",
      "Santurtzi",
      "Basauri",
      "Durango",
      "Bizkaia",
      "Euskadi",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios eléctricos",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name },
      })),
    },
    sameAs: [] as string[],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
