import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services } from "@/lib/services";
import { localities } from "@/lib/localities";
import CTASection from "@/components/CTASection";
import Faq, { FaqJsonLd } from "@/components/Faq";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import ServiceJsonLd from "@/components/ServiceJsonLd";
import PresupuestoForm from "@/components/lead/PresupuestoForm";

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
    title: service.metaTitle,
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
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", path: "/" },
          { name: "Servicios", path: "/servicios" },
          { name: service.name, path: `/servicios/${service.slug}` },
        ]}
      />
      <ServiceJsonLd service={service} />

      <section className="bg-neutral-950 py-14 text-white">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <nav className="mb-4 text-sm text-white/40">
            <Link href="/" className="hover:text-electric-400">
              Inicio
            </Link>{" "}
            /{" "}
            <Link href="/servicios" className="hover:text-electric-400">
              Servicios
            </Link>{" "}
            / <span className="text-white/70">{service.name}</span>
          </nav>
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{service.h1}</h1>
        </div>
      </section>

      <section className="bg-neutral-50 py-14">
        <div className="mx-auto grid max-w-4xl gap-10 px-4 md:px-6 lg:max-w-6xl lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-electric-100 text-2xl text-electric-600">
              <i className={service.icon} aria-hidden="true"></i>
            </div>
            <p className="mt-5 text-lg text-neutral-700">{service.intro}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-neutral-700">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center text-electric-600">
                    <i className="ri-check-line" aria-hidden="true"></i>
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <h2 className="font-display mt-12 text-2xl font-extrabold text-neutral-900">Preguntas frecuentes</h2>
            <div className="mt-6">
              <Faq items={service.faqs} light />
            </div>
            <FaqJsonLd items={service.faqs} />

            <h2 className="font-display mt-12 text-2xl font-extrabold text-neutral-900">
              {service.name} en tu zona
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {localities.map((l) => (
                <Link
                  key={l.slug}
                  href={`/electricista-${l.slug}/${service.slug}`}
                  className="rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-sm text-neutral-600 hover:border-electric-500/50 hover:text-electric-600"
                >
                  {service.name} en {l.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
              <h3 className="font-display text-lg font-bold text-neutral-900">
                Pide presupuesto para {service.shortName.toLowerCase()}
              </h3>
              <p className="mt-1 text-sm text-neutral-500">Sin compromiso. Te respondemos por teléfono o WhatsApp.</p>
              <a
                href="#presupuesto"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-electric-400 px-5 py-2.5 text-sm font-extrabold text-neutral-950 transition-colors duration-200 hover:bg-electric-300"
              >
                Pedir presupuesto
                <i className="ri-arrow-right-line" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      <PresupuestoForm />

      <CTASection source={`service_${service.slug}`} title={`¿Necesitas ${service.name.toLowerCase()}?`} />
    </div>
  );
}
