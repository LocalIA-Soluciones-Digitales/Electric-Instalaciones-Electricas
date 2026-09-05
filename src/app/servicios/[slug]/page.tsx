import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services } from "@/lib/services";
import { localities } from "@/lib/localities";
import CTASection from "@/components/CTASection";
import Faq, { FaqJsonLd } from "@/components/Faq";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
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
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", path: "/" },
          { name: "Servicios", path: "/servicios" },
          { name: service.name, path: `/servicios/${service.slug}` },
        ]}
      />

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

      <section className="mx-auto grid max-w-4xl gap-10 px-4 py-14 md:px-6 lg:max-w-6xl lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="text-lg text-white/60">{service.intro}</p>
          <ul className="mt-8 space-y-3">
            {service.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-white/70">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center text-electric-400">
                  <i className="ri-flashlight-line" aria-hidden="true"></i>
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <h2 className="font-display mt-12 text-2xl font-extrabold text-white">Preguntas frecuentes</h2>
          <div className="mt-6">
            <Faq items={service.faqs} />
          </div>
          <FaqJsonLd items={service.faqs} />

          <h2 className="font-display mt-12 text-2xl font-extrabold text-white">
            {service.name} en tu zona
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {localities.map((l) => (
              <Link
                key={l.slug}
                href={`/electricista-${l.slug}`}
                className="rounded-full border border-white/[0.1] px-4 py-1.5 text-sm text-white/60 hover:border-electric-400/50 hover:text-electric-400"
              >
                {service.name} en {l.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="rounded-xl border border-white/[0.08] bg-neutral-900/60 p-5">
            <h3 className="font-display text-lg font-bold text-white">Pide presupuesto para {service.shortName.toLowerCase()}</h3>
            <p className="mt-1 text-sm text-white/45">Sin compromiso. Te respondemos por teléfono o WhatsApp.</p>
          </div>
        </div>
      </section>

      <PresupuestoForm />

      <CTASection source={`service_${service.slug}`} title={`¿Necesitas ${service.name.toLowerCase()}?`} />
    </div>
  );
}
