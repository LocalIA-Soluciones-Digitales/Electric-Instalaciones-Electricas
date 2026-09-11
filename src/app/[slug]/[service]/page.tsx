import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { localities, localityFromPrefixedSlug, LOCALITY_SLUG_PREFIX } from "@/lib/localities";
import { getService, services } from "@/lib/services";
import { business, telLink, waLink } from "@/lib/business";
import CTASection from "@/components/CTASection";
import TrustBadges from "@/components/TrustBadges";
import Faq, { FaqJsonLd } from "@/components/Faq";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import ServiceJsonLd from "@/components/ServiceJsonLd";
import PresupuestoForm from "@/components/lead/PresupuestoForm";

export function generateStaticParams() {
  return localities.flatMap((l) =>
    services.map((s) => ({ slug: `${LOCALITY_SLUG_PREFIX}${l.slug}`, service: s.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; service: string }>;
}): Promise<Metadata> {
  const { slug, service: serviceSlug } = await params;
  const locality = localityFromPrefixedSlug(slug);
  const service = locality ? getService(serviceSlug) : undefined;
  if (!locality || !service) return {};

  const title = `${service.shortName} en ${locality.name}`;
  const description = `${service.name} en ${locality.name}: ${service.bullets[0].toLowerCase()}. Servicio 24h en ${locality.province}. Llama al ${business.phoneDisplay}.`;

  return {
    title,
    description,
    alternates: { canonical: `/electricista-${locality.slug}/${service.slug}` },
    openGraph: { title: `${service.name} en ${locality.name}`, description },
  };
}

function comboFaqs(serviceName: string, localityName: string, faqs: { q: string; a: string }[]) {
  const localFaq = {
    q: `¿Atendéis ${serviceName.toLowerCase()} en ${localityName}?`,
    a: `Sí, es uno de los servicios que más solicitan en ${localityName}. Normalmente llegamos en menos de una hora desde la llamada.`,
  };
  return [localFaq, ...faqs.slice(0, 2)];
}

export default async function ServiceLocalityPage({
  params,
}: {
  params: Promise<{ slug: string; service: string }>;
}) {
  const { slug, service: serviceSlug } = await params;
  const locality = localityFromPrefixedSlug(slug);
  const service = locality ? getService(serviceSlug) : undefined;
  if (!locality || !service) notFound();

  const otherServices = services.filter((s) => s.slug !== service.slug);
  const otherLocalities = localities.filter((l) => l.slug !== locality.slug);
  const faqs = comboFaqs(service.name, locality.name, service.faqs);

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", path: "/" },
          { name: `Electricista en ${locality.name}`, path: `/electricista-${locality.slug}` },
          { name: service.name, path: `/electricista-${locality.slug}/${service.slug}` },
        ]}
      />
      <ServiceJsonLd service={service} locality={locality.name} />

      <section className="bg-neutral-950 py-14 md:py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <nav className="mb-4 text-sm text-white/40">
            <Link href="/" className="hover:text-electric-400">
              Inicio
            </Link>{" "}
            /{" "}
            <Link href={`/electricista-${locality.slug}`} className="hover:text-electric-400">
              Electricista en {locality.name}
            </Link>{" "}
            / <span className="text-white/70">{service.name}</span>
          </nav>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-electric-400/10 px-4 py-1 text-sm font-semibold text-electric-400">
            {locality.province} · Servicio 24 horas
          </p>
          <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            {service.name} en {locality.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/60">
            {service.intro} {locality.distanceNote}.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={telLink()}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-electric-400 px-6 py-4 text-center text-lg font-extrabold text-neutral-950 hover:bg-electric-300"
            >
              <i className="ri-phone-line text-xl" aria-hidden="true"></i>
              Llamar: {business.phoneDisplay}
            </a>
            <a
              href={waLink(`Hola, necesito ${service.shortName.toLowerCase()} en ${locality.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-whatsapp/30 px-6 py-4 text-center text-lg font-bold text-whatsapp hover:bg-whatsapp/10"
            >
              <i className="ri-whatsapp-line text-xl" aria-hidden="true"></i>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <TrustBadges light />
        </div>
      </section>

      <section className="bg-neutral-50 py-4">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:px-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-electric-100 text-2xl text-electric-600">
              <i className={service.icon} aria-hidden="true"></i>
            </div>
            <h2 className="font-display mt-5 text-2xl font-extrabold text-neutral-900">
              {service.h1} en {locality.name}
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-neutral-700">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center text-electric-600">
                    <i className="ri-check-line" aria-hidden="true"></i>
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {locality.landmarks.length > 0 && (
              <p className="mt-8 text-sm text-neutral-500">
                Cubrimos con rapidez zonas de referencia como {locality.landmarks.join(", ")}, y el resto de{" "}
                {locality.name}.
              </p>
            )}

            <h2 className="font-display mt-12 text-2xl font-extrabold text-neutral-900">Preguntas frecuentes</h2>
            <div className="mt-6">
              <Faq items={faqs} light />
            </div>
            <FaqJsonLd items={faqs} />
          </div>

          <div>
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
              <h3 className="font-display text-lg font-bold text-neutral-900">
                Presupuesto para {service.shortName.toLowerCase()} en {locality.name}
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

      <CTASection
        source={`combo_${locality.slug}_${service.slug}`}
        title={`${service.shortName} en ${locality.name}: te atendemos ahora`}
      />

      <section className="bg-neutral-900 py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-display text-center text-xl font-extrabold text-white">
            Otros servicios en {locality.name}
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/electricista-${locality.slug}/${s.slug}`}
                className="rounded-full border border-white/[0.1] px-5 py-2 text-sm font-semibold text-white/70 hover:border-electric-400/50 hover:text-electric-400"
              >
                {s.name} en {locality.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-display text-center text-xl font-extrabold text-neutral-900">
            {service.name} en otras zonas
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {otherLocalities.map((l) => (
              <Link
                key={l.slug}
                href={`/electricista-${l.slug}/${service.slug}`}
                className="rounded-full border border-neutral-200 bg-neutral-50 px-5 py-2 text-sm font-semibold text-neutral-600 hover:border-electric-500/50 hover:text-electric-600"
              >
                {service.shortName} en {l.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
