import Link from "next/link";
import type { Metadata } from "next";
import { business, telLink, waLink, WHATSAPP_GREETING_URGENT } from "@/lib/business";
import { getService } from "@/lib/services";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import Faq, { FaqJsonLd } from "@/components/Faq";

export const metadata: Metadata = {
  title: `Electricista Urgente en Barakaldo 24 Horas | ${business.name}`,
  description:
    "Electricista urgente en Barakaldo, con base en Calle Cruces 18. Averías, cortocircuitos y cuadros eléctricos, servicio 24 horas en Cruces, Retuerto, San Vicente, Rontegi, Lutxana y Gurutzeta. Llama al 677 24 63 74.",
  alternates: { canonical: "/zonas-de-servicio/barakaldo" },
  openGraph: {
    title: `Electricista Urgente en Barakaldo 24 Horas | ${business.name}`,
    description: "Electricista urgente 24 horas en Barakaldo, con local propio en Calle Cruces 18.",
  },
};

const bullets = [
  "Local propio en Calle Cruces, 18 (Barakaldo): llegamos en minutos",
  "Cobertura en todos los barrios: Cruces, Retuerto, San Vicente, Rontegi, Lutxana y Gurutzeta",
  "Servicio de electricista urgente 24 horas, los 365 días del año",
  "Presupuesto claro antes de intervenir, sin sorpresas",
];

const faqs = [
  {
    q: "¿Cuánto tardáis en llegar a Barakaldo ante una avería urgente?",
    a: "Al tener nuestro local en el propio Barakaldo (Calle Cruces, 18), solemos llegar en menos de 30 minutos a cualquier barrio: Cruces, Retuerto, San Vicente, Rontegi, Lutxana o Gurutzeta.",
  },
  {
    q: "¿Atendéis avisos urgentes de noche o en fin de semana en Barakaldo?",
    a: "Sí, el servicio de electricista urgente en Barakaldo está disponible 24 horas, los 365 días del año, incluidas noches y festivos.",
  },
  {
    q: "¿Qué tipo de averías atendéis en Barakaldo?",
    a: "Cortes de luz, cortocircuitos, diferenciales que saltan y cuadros eléctricos dañados. También hacemos instalaciones y reformas eléctricas planificadas.",
  },
  {
    q: "¿El presupuesto tiene algún coste?",
    a: "No. Te damos el presupuesto por teléfono o WhatsApp antes de desplazarnos, sin compromiso.",
  },
];

// Servicios con página propia que más se solicitan como urgencia en Barakaldo:
// enlazarlos aquí refuerza la relevancia temática de esta página con las de /servicios.
const relatedServiceSlugs = ["electricista-urgente-24h", "averias-electricas", "cortocircuitos", "cuadros-electricos"];

export default function BarakaldoPage() {
  const relatedServices = relatedServiceSlugs.map((slug) => getService(slug)!).filter(Boolean);

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", path: "/" },
          { name: "Zonas de Servicio", path: "/zonas-de-servicio" },
          { name: "Barakaldo", path: "/zonas-de-servicio/barakaldo" },
        ]}
      />

      <PageHero
        breadcrumb={[
          { name: "Inicio", href: "/" },
          { name: "Zonas de Servicio", href: "/zonas-de-servicio" },
          { name: "Barakaldo" },
        ]}
        eyebrow="Electricista en Barakaldo"
        title="Electricista Urgente en Barakaldo 24 Horas"
        subtitle="Barakaldo es nuestra ciudad base: local propio en Calle Cruces, 18. Damos servicio en todos sus barrios con tiempos de respuesta muy rápidos ante averías urgentes."
      >
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={telLink()}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-electric-400 px-6 py-3 text-sm font-extrabold text-neutral-950 transition-colors duration-200 hover:bg-electric-300"
          >
            <i className="ri-phone-line text-lg" aria-hidden="true"></i>
            Llamar {business.phoneDisplay}
          </a>
          <a
            href={waLink(WHATSAPP_GREETING_URGENT)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-whatsapp/30 bg-whatsapp/10 px-6 py-3 text-sm font-bold text-whatsapp-300 hover:bg-whatsapp/15"
          >
            <i className="ri-whatsapp-line text-lg" aria-hidden="true"></i>
            WhatsApp
          </a>
        </div>
      </PageHero>

      <section className="bg-neutral-50 py-14">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <p className="text-lg text-neutral-700">
            Conocemos bien Barakaldo, sus edificios y comunidades de vecinos: desde el Hospital Universitario
            Cruces hasta el casco urbano, el BEC (Bilbao Exhibition Centre) o el Parque Munoa. Esa cercanía nos
            permite llegar en minutos ante cualquier avería eléctrica, tanto en viviendas como en locales
            comerciales.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-neutral-700">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center text-electric-600">
                  <i className="ri-check-line" aria-hidden="true"></i>
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <h2 className="font-display mt-12 text-2xl font-extrabold text-neutral-900">
            Servicios más solicitados como urgencia en Barakaldo
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {relatedServices.map((s) => (
              <Link
                key={s.slug}
                href={`/servicios/${s.slug}`}
                className="rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-sm text-neutral-600 hover:border-electric-500/50 hover:text-electric-600"
              >
                {s.name}
              </Link>
            ))}
          </div>

          <h2 className="font-display mt-12 text-2xl font-extrabold text-neutral-900">Preguntas frecuentes</h2>
          <div className="mt-6">
            <Faq items={faqs} />
          </div>
          <FaqJsonLd items={faqs} />

          <p className="mt-12 text-neutral-600">
            ¿Necesitas un electricista fuera de Barakaldo?{" "}
            <Link href="/zonas-de-servicio" className="font-semibold text-electric-600 hover:underline">
              Consulta el resto de nuestra cobertura en Euskadi
            </Link>
            .
          </p>
        </div>
      </section>

      <CTASection source="zona_barakaldo" title="Electricista urgente en Barakaldo, listo para salir" />
    </div>
  );
}
