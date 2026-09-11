import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGuide, guides } from "@/lib/guides";
import { getService } from "@/lib/services";
import CTASection from "@/components/CTASection";
import Faq, { FaqJsonLd } from "@/components/Faq";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: { canonical: `/guias/${guide.slug}` },
    openGraph: { title: guide.metaTitle, description: guide.metaDescription },
  };
}

export default async function GuiaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const relatedService = getService(guide.relatedServiceSlug);
  const otherGuides = guides.filter((g) => g.slug !== guide.slug).slice(0, 3);

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", path: "/" },
          { name: "Guías", path: "/guias" },
          { name: guide.title, path: `/guias/${guide.slug}` },
        ]}
      />

      <section className="bg-neutral-950 py-14 text-white">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <nav className="mb-4 text-sm text-white/40">
            <Link href="/" className="hover:text-electric-400">
              Inicio
            </Link>{" "}
            /{" "}
            <Link href="/guias" className="hover:text-electric-400">
              Guías
            </Link>{" "}
            / <span className="text-white/70">{guide.title}</span>
          </nav>
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{guide.title}</h1>
          <p className="mt-4 text-lg text-white/60">{guide.excerpt}</p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <article className="space-y-10">
            {guide.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-display text-2xl font-extrabold text-neutral-900">{section.heading}</h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((p, i) => (
                    <p key={i} className="text-neutral-700 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </article>

          {guide.faqs && guide.faqs.length > 0 && (
            <div className="mt-14">
              <h2 className="font-display text-2xl font-extrabold text-neutral-900">Preguntas frecuentes</h2>
              <div className="mt-6">
                <Faq items={guide.faqs} light />
              </div>
              <FaqJsonLd items={guide.faqs} />
            </div>
          )}

          {relatedService && (
            <div className="mt-14 rounded-xl border border-neutral-200 bg-neutral-50 p-6">
              <h3 className="font-display text-lg font-bold text-neutral-900">
                ¿Necesitas {relatedService.shortName.toLowerCase()}?
              </h3>
              <p className="mt-2 text-sm text-neutral-600">{relatedService.intro}</p>
              <Link
                href={`/servicios/${relatedService.slug}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-electric-600 hover:text-electric-700"
              >
                Ver el servicio de {relatedService.name.toLowerCase()}{" "}
                <i className="ri-arrow-right-line" aria-hidden="true"></i>
              </Link>
            </div>
          )}
        </div>
      </section>

      <CTASection source={`guia_${guide.slug}`} />

      {otherGuides.length > 0 && (
        <section className="bg-neutral-50 py-16">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="font-display text-center text-xl font-extrabold text-neutral-900">Otras guías</h2>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {otherGuides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guias/${g.slug}`}
                  className="rounded-full border border-neutral-200 bg-white px-5 py-2 text-sm font-semibold text-neutral-600 hover:border-electric-500/50 hover:text-electric-600"
                >
                  {g.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
