import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { localities, localityFromPrefixedSlug, LOCALITY_SLUG_PREFIX } from "@/lib/localities";
import { services } from "@/lib/services";
import { business, telLink, waLink } from "@/lib/business";
import CTASection from "@/components/CTASection";
import TrustBadges from "@/components/TrustBadges";
import Testimonials from "@/components/Testimonials";
import Faq, { FaqJsonLd } from "@/components/Faq";
import PageHero from "@/components/PageHero";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import PresupuestoForm from "@/components/lead/PresupuestoForm";
import type { Locality } from "@/lib/localities";

function localityFromSlug(slug: string) {
  return localityFromPrefixedSlug(slug);
}

export function generateStaticParams() {
  return localities.map((l) => ({ slug: `${LOCALITY_SLUG_PREFIX}${l.slug}` }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locality = localityFromSlug(slug);
  if (!locality) return {};
  const title = `Electricista en ${locality.name} 24h`;
  const description = `Electricista en ${locality.name}, ${locality.province}. Averías, instalaciones, cuadros eléctricos y reparaciones. Servicio 24h. Llama al ${business.phoneDisplay}.`;
  return {
    title,
    description,
    alternates: { canonical: `/electricista-${locality.slug}` },
    openGraph: { title, description },
  };
}

function localityFaqs(locality: Locality) {
  const { name } = locality;
  const faqs = [
    {
      q: `¿Cuánto tarda un electricista en llegar a ${name}?`,
      a: `Normalmente llegamos a ${name} en menos de una hora desde la llamada, dependiendo del tráfico y la hora del día.`,
    },
    {
      q: `¿Trabajáis los fines de semana en ${name}?`,
      a: `Sí, damos servicio de electricista urgente en ${name} las 24 horas, incluidos fines de semana y festivos.`,
    },
    {
      q: `¿Hacéis presupuesto antes de intervenir en ${name}?`,
      a: `Sí, siempre te damos un presupuesto claro por teléfono o WhatsApp antes de desplazarnos, sin sorpresas en la factura.`,
    },
  ];
  if (locality.landmarks.length > 0) {
    faqs.push({
      q: `¿Cubrís la zona de ${locality.landmarks[0]} en ${name}?`,
      a: `Sí, es una de las zonas de ${name} donde más solicitudes atendemos. ${locality.distanceNote}.`,
    });
  }
  return faqs;
}

export default async function LocalityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locality = localityFromSlug(slug);
  if (!locality) notFound();

  const faqs = localityFaqs(locality);
  const otherLocalities = localities.filter((l) => l.slug !== locality.slug);

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", path: "/" },
          { name: `Electricista en ${locality.name}`, path: `/electricista-${locality.slug}` },
        ]}
      />

      <PageHero
        breadcrumb={[{ name: "Inicio", href: "/" }, { name: `Electricista en ${locality.name}` }]}
        eyebrow={`${locality.province} · Servicio 24 horas`}
        title={`Electricista en ${locality.name}`}
        subtitle={locality.intro}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={telLink()}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-electric-400 px-6 py-4 text-center text-lg font-extrabold text-neutral-950 hover:bg-electric-300"
          >
            <i className="ri-phone-line text-xl" aria-hidden="true"></i>
            Llamar: {business.phoneDisplay}
          </a>
          <a
            href={waLink(`Hola, necesito un electricista en ${locality.name}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-whatsapp/30 bg-whatsapp/10 px-6 py-4 text-center text-lg font-bold text-whatsapp-600 hover:bg-whatsapp/15"
          >
            <i className="ri-whatsapp-line text-xl" aria-hidden="true"></i>
            WhatsApp
          </a>
        </div>
      </PageHero>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <TrustBadges />
        </div>
      </section>

      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-display text-center text-2xl md:text-3xl font-extrabold text-neutral-900">
            Servicios de electricista en {locality.name}
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/electricista-${locality.slug}/${s.slug}`}
                className="group rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-colors duration-200 hover:border-electric-400/60"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-electric-100 text-lg text-electric-600">
                  <i className={s.icon} aria-hidden="true"></i>
                </span>
                <h3 className="font-display mt-3 text-lg font-bold text-neutral-900 group-hover:text-electric-600">
                  {s.name} en {locality.name}
                </h3>
                <p className="mt-2 text-sm text-neutral-600">{s.intro.slice(0, 100)}…</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {locality.landmarks.length > 0 && (
        <section className="bg-white py-14">
          <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
            <h2 className="font-display text-2xl font-extrabold text-neutral-900">
              Conocemos {locality.name}: {locality.distanceNote}
            </h2>
            <p className="mt-4 text-neutral-600">
              Atendemos con rapidez zonas de referencia como {locality.landmarks.join(", ")}, y el resto
              del municipio.
            </p>
          </div>
        </section>
      )}

      <PresupuestoForm />

      <CTASection source={`locality_${locality.slug}`} title={`Electricista urgente en ${locality.name}`} />

      <section className="bg-cloud py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-display text-center text-2xl md:text-3xl font-extrabold text-neutral-900">
            Por qué confiar en Electric en {locality.name}
          </h2>
          <div className="mt-10">
            <Testimonials />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <h2 className="font-display text-center text-2xl md:text-3xl font-extrabold text-neutral-900">
            Preguntas frecuentes sobre nuestro servicio en {locality.name}
          </h2>
          <div className="mt-8">
            <Faq items={faqs} />
          </div>
          <FaqJsonLd items={faqs} />
        </div>
      </section>

      <section className="bg-neutral-50 px-4 pb-16 pt-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-center text-xl font-extrabold text-neutral-900">
            Otras zonas donde trabajamos
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {otherLocalities.map((l) => (
              <Link
                key={l.slug}
                href={`/electricista-${l.slug}`}
                className="rounded-full border border-neutral-200 bg-white px-5 py-2 text-sm font-semibold text-neutral-600 hover:border-electric-500/50 hover:text-electric-600"
              >
                Electricista en {l.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
