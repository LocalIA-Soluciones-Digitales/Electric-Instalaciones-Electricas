import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocality, localities } from "@/lib/localities";
import { services } from "@/lib/services";
import { business, telLink, waLink } from "@/lib/business";
import CTASection from "@/components/CTASection";
import TrustBadges from "@/components/TrustBadges";
import Testimonials from "@/components/Testimonials";
import Faq, { FaqJsonLd } from "@/components/Faq";
import { QuickContactForm } from "@/components/ContactForms";

const PREFIX = "electricista-";

function localityFromSlug(slug: string) {
  if (!slug.startsWith(PREFIX)) return undefined;
  return getLocality(slug.slice(PREFIX.length));
}

export function generateStaticParams() {
  return localities.map((l) => ({ slug: `${PREFIX}${l.slug}` }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locality = localityFromSlug(slug);
  if (!locality) return {};
  const title = `Electricista en ${locality.name} | Urgente 24h`;
  const description = `Electricista en ${locality.name}, ${locality.province}. Averías, instalaciones, cuadros eléctricos y reparaciones. Servicio 24h. Llama al ${business.phoneDisplay}.`;
  return {
    title,
    description,
    alternates: { canonical: `/electricista-${locality.slug}` },
    openGraph: { title, description },
  };
}

function localityFaqs(name: string) {
  return [
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
}

export default async function LocalityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locality = localityFromSlug(slug);
  if (!locality) notFound();

  const faqs = localityFaqs(locality.name);
  const otherLocalities = localities.filter((l) => l.slug !== locality.slug);

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 py-16 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
          <div>
            <p className="mb-3 inline-block rounded-full bg-yellow-400/10 px-4 py-1 text-sm font-semibold text-yellow-400">
              {locality.province} · Servicio 24 horas
            </p>
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">
              Electricista en {locality.name}
            </h1>
            <p className="mt-4 text-lg text-slate-300">{locality.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={telLink()}
                className="rounded-md bg-yellow-400 px-6 py-4 text-center text-lg font-bold text-slate-900 shadow-lg hover:bg-yellow-300"
              >
                Llamar: {business.phoneDisplay}
              </a>
              <a
                href={waLink(`Hola, necesito un electricista en ${locality.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-[#25D366] px-6 py-4 text-center text-lg font-bold text-white shadow-lg hover:brightness-110"
              >
                WhatsApp
              </a>
            </div>
          </div>
          <QuickContactForm />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <TrustBadges />
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Servicios de electricista en {locality.name}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/servicios/${s.slug}`}
                className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-yellow-600">
                  {s.name} en {locality.name}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{s.intro.slice(0, 100)}…</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {locality.landmarks.length > 0 && (
        <section className="mx-auto max-w-4xl px-4 py-14 text-center">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Conocemos {locality.name}: {locality.distanceNote}
          </h2>
          <p className="mt-4 text-slate-600">
            Atendemos con rapidez zonas de referencia como {locality.landmarks.join(", ")}, y el resto
            del municipio.
          </p>
        </section>
      )}

      <CTASection source={`locality_${locality.slug}`} title={`Electricista urgente en ${locality.name}`} />

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Opiniones de clientes
          </h2>
          <div className="mt-10">
            <Testimonials />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-center text-2xl font-extrabold text-slate-900 sm:text-3xl">
          Preguntas frecuentes sobre nuestro servicio en {locality.name}
        </h2>
        <div className="mt-8">
          <Faq items={faqs} />
        </div>
        <FaqJsonLd items={faqs} />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-center text-xl font-extrabold text-slate-900">Otras zonas donde trabajamos</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {otherLocalities.map((l) => (
            <Link
              key={l.slug}
              href={`/electricista-${l.slug}`}
              className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:border-yellow-400 hover:text-yellow-600"
            >
              Electricista en {l.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
