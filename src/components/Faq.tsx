export type FaqItem = { q: string; a: string };

export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <details
          key={item.q}
          className="group rounded-lg border border-slate-200 bg-white p-4 open:shadow-sm"
        >
          <summary className="cursor-pointer list-none font-semibold text-slate-900 marker:content-none">
            <span className="flex items-center justify-between gap-4">
              {item.q}
              <span className="text-yellow-500 transition group-open:rotate-45">+</span>
            </span>
          </summary>
          <p className="mt-3 text-sm text-slate-600">{item.a}</p>
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
