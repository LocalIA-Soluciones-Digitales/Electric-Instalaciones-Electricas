import { business } from "@/lib/business";
import { safeJsonLd } from "@/lib/jsonld";

export default function ArticleJsonLd({
  title,
  description,
  path,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${business.domain}${path}`,
    mainEntityOfPage: `${business.domain}${path}`,
    datePublished,
    dateModified,
    author: { "@type": "Person", name: business.owner },
    publisher: {
      "@type": "Organization",
      name: business.name,
      logo: { "@type": "ImageObject", url: `${business.domain}/images/logo-mark.png` },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
    />
  );
}
