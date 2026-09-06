import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { localities, localityFromPrefixedSlug, LOCALITY_SLUG_PREFIX } from "@/lib/localities";
import { services } from "@/lib/services";
import { business, telLink, waLink } from "@/lib/business";
import CTASection from "@/components/CTASection";
import TrustBadges from "@/components/TrustBadges";
import Testimonials, { testimonials } from "@/components/Testimonials";
import Faq, { FaqJsonLd } from "@/components/Faq";
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
  const hasLocalTestimonial = testimonials.some((t) => t.location === locality.name);
  const otherLocalities = localities.filter((l) => l.slug !== locality.slug);

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", path: "/" },
          { name: `Electricista en ${locality.name}`, path: `/electricista-${locality.slug}` },
        ]}
      />

      <section className="bg-neutral-950 py-14 md:py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <nav className="mb-4 text-sm text-white/40">
            <Link href="/" className="hover:text-electric-400">
              Inicio
            </Link>{" "}
            / <span className="text-white/70">Electricista en {locality.name}</span>
          </nav>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-electric-400/10 px-4 py-1 text-sm font-semibold text-electric-400">
            {locality.province} · Servicio 24 horas
          </p>
          <h1 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            Electricista en {locality.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/60">{locality.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={telLink()}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-electric-400 px-6 py-4 text-center text-lg font-extrabold text-neutral-950 hover:bg-electric-300"
            >
              <i className="ri-phone-line text-xl" aria-hidden="true"></i>
              Llamar: {business.phoneDisplay}
            </a>
            <a
              href={waLink(`Hola, necesito un electricista en ${locality.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-[#25D366]/30 px-6 py-4 text-center text-lg font-bold text-[#25D366] hover:bg-[#25D366]/10"
            >
              <i className="ri-whatsapp-line text-xl" aria-hidden="true"></i>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <TrustBadges />
      </section>

      <section className="bg-neutral-900 py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-display text-center text-2xl md:text-3xl font-extrabold text-white">
            Servicios de electricista en {locality.name}
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/electricista-${locality.slug}/${s.slug}`}
                className="group rounded-lg border border-white/[0.08] bg-neutral-950/40 p-6 transition-colors duration-200 hover:border-electric-400/40"
              >
                <h3 className="font-display text-lg font-bold text-white group-hover:text-electric-400">
                  {s.name} en {locality.name}
                </h3>
                <p className="mt-2 text-sm text-white/50">{s.intro.slice(0, 100)}…</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {locality.landmarks.length > 0 && (
        <section className="mx-auto max-w-4xl px-4 py-14 text-center md:px-6">
          <h2 className="font-display text-2xl font-extrabold text-white">
            Conocemos {locality.name}: {locality.distanceNote}
          </h2>
          <p className="mt-4 text-white/50">
            Atendemos con rapidez zonas de referencia como {locality.landmarks.join(", ")}, y el resto
            del municipio.
          </p>
        </section>
      )}

      <PresupuestoForm />

      <CTASection source={`locality_${locality.slug}`} title={`Electricista urgente en ${locality.name}`} />

      <section className="bg-neutral-900 py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-display text-center text-2xl md:text-3xl font-extrabold text-white">
            {hasLocalTestimonial ? `Opiniones de clientes en ${locality.name}` : "Opiniones de nuestros clientes en Bizkaia"}
          </h2>
          <div className="mt-10">
            <Testimonials filterLocation={locality.name} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <h2 className="font-display text-center text-2xl md:text-3xl font-extrabold text-white">
          Preguntas frecuentes sobre nuestro servicio en {locality.name}
        </h2>
        <div className="mt-8">
          <Faq items={faqs} />
        </div>
        <FaqJsonLd items={faqs} />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
        <h2 className="font-display text-center text-xl font-extrabold text-white">
          Otras zonas donde trabajamos
        </h2>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {otherLocalities.map((l) => (
            <Link
              key={l.slug}
              href={`/electricista-${l.slug}`}
              className="rounded-full border border-white/[0.1] px-5 py-2 text-sm font-semibold text-white/70 hover:border-electric-400/50 hover:text-electric-400"
            >
              Electricista en {l.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
