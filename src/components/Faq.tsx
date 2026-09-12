import { safeJsonLd } from "@/lib/jsonld";

export type FaqItem = { q: string; a: string };

export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.q}
          className="group rounded-xl border border-neutral-200 bg-white p-4 open:border-electric-500/50 open:shadow-sm"
        >
          <summary className="cursor-pointer list-none font-semibold text-neutral-900 marker:content-none">
            <span className="flex items-center justify-between gap-4">
              {item.q}
              <span className="shrink-0 text-electric-600 transition group-open:rotate-45">
                <i className="ri-add-line text-lg" aria-hidden="true"></i>
              </span>
            </span>
          </summary>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
    />
  );
}
