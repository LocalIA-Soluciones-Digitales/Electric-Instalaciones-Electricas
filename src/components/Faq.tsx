import { safeJsonLd } from "@/lib/jsonld";

export type FaqItem = { q: string; a: string };

export default function Faq({ items, light = false }: { items: FaqItem[]; light?: boolean }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.q}
          className={
            light
              ? "group rounded-lg border border-neutral-200 bg-white p-4 open:border-electric-500/50"
              : "group rounded-lg border border-white/[0.08] bg-neutral-900/60 p-4 open:border-electric-400/30"
          }
        >
          <summary
            className={
              light
                ? "cursor-pointer list-none font-semibold text-neutral-900 marker:content-none"
                : "cursor-pointer list-none font-semibold text-white marker:content-none"
            }
          >
            <span className="flex items-center justify-between gap-4">
              {item.q}
              <span
                className={
                  light
                    ? "shrink-0 text-electric-600 transition group-open:rotate-45"
                    : "shrink-0 text-electric-400 transition group-open:rotate-45"
                }
              >
                <i className="ri-add-line text-lg" aria-hidden="true"></i>
              </span>
            </span>
          </summary>
          <p className={light ? "mt-3 text-sm text-neutral-600 leading-relaxed" : "mt-3 text-sm text-white/55 leading-relaxed"}>
            {item.a}
          </p>
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
