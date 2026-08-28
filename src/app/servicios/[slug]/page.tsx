import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services } from "@/lib/services";
import { localities } from "@/lib/localities";
import CTASection from "@/components/CTASection";
import Faq, { FaqJsonLd } from "@/components/Faq";
import { BudgetContactForm } from "@/components/ContactForms";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.h1,
    description: service.metaDescription,
    alternates: { canonical: `/servicios/${service.slug}` },
    openGraph: { title: service.metaTitle, description: service.metaDescription },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <div>
      <section className="bg-slate-900 py-14 text-white">
        <div className="mx-auto max-w-4xl px-4">
          <nav className="mb-4 text-sm text-slate-400">
            <Link href="/" className="hover:text-yellow-400">
              Inicio
            </Link>{" "}
            /{" "}
            <Link href="/servicios" className="hover:text-yellow-400">
              Servicios
            </Link>{" "}
            / <span className="text-slate-200">{service.name}</span>
          </nav>
          <h1 className="text-3xl font-extrabold sm:text-4xl">{service.h1}</h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-4xl gap-10 px-4 py-14 lg:max-w-6xl lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="text-lg text-slate-700">{service.intro}</p>
          <ul className="mt-8 space-y-3">
            {service.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-slate-700">
                <span className="mt-1 text-yellow-500">⚡</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-2xl font-extrabold text-slate-900">Preguntas frecuentes</h2>
          <div className="mt-6">
            <Faq items={service.faqs} />
          </div>
          <FaqJsonLd items={service.faqs} />

          <h2 className="mt-12 text-2xl font-extrabold text-slate-900">
            {service.name} en tu zona
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {localities.map((l) => (
              <Link
                key={l.slug}
                href={`/electricista-${l.slug}`}
                className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm text-slate-700 hover:border-yellow-400 hover:text-yellow-600"
              >
                {service.name} en {l.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <BudgetContactForm />
        </div>
      </section>

      <CTASection source={`service_${service.slug}`} title={`¿Necesitas ${service.name.toLowerCase()}?`} />
    </div>
  );
}
