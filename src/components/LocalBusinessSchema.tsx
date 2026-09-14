import { business } from "@/lib/business";
import { services } from "@/lib/services";
import { safeJsonLd } from "@/lib/jsonld";

export default function LocalBusinessSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: business.name,
    alternateName: [business.shortName, `${business.shortName} Barakaldo`],
    image: `${business.domain}/opengraph-image`,
    logo: `${business.domain}/images/logo-mark.png`,
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
    // Enlaza la entidad con perfil de Google Business y redes sociales en cuanto
    // se rellenen en business.ts: sin este puente, Google no tiene forma
    // estructurada de asociar este dominio con el perfil de empresa.
    sameAs: [business.reviews.googleUrl, business.socials.instagram, business.socials.facebook].filter(
      (url): url is string => Boolean(url)
    ),
    ...(business.reviews.rating && business.reviews.count
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: business.reviews.rating,
            reviewCount: business.reviews.count,
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
    />
  );
}
