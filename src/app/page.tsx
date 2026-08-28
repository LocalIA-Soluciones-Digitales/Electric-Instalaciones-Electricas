import Link from "next/link";
import type { Metadata } from "next";
import { business, telLink, waLink } from "@/lib/business";
import { services } from "@/lib/services";
import { localities } from "@/lib/localities";
import CTASection from "@/components/CTASection";
import TrustBadges from "@/components/TrustBadges";
import Testimonials from "@/components/Testimonials";
import Faq, { FaqJsonLd } from "@/components/Faq";
import { QuickContactForm } from "@/components/ContactForms";

export const metadata: Metadata = {
  title: "Electricista en Barakaldo y Bizkaia 24 Horas",
  description:
    "Electricista urgente en Barakaldo, Bilbao, Cruces y toda Bizkaia. Averías, cuadros eléctricos, instalaciones y reparaciones. Servicio 24h. Llama al 624 64 51 09.",
  alternates: { canonical: "/" },
};

const homeFaqs = [
  {
    q: "¿En qué zonas de Bizkaia trabajáis?",
    a: "Damos servicio en Barakaldo, Cruces, Bilbao, Getxo, Portugalete, Santurtzi, Basauri, Durango y el resto de Bizkaia. También atendemos solicitudes en Gipuzkoa y Araba.",
  },
  {
    q: "¿Cuánto cuesta un electricista en Barakaldo?",
    a: "El precio depende del tipo de trabajo. Te damos un presupuesto claro por teléfono o WhatsApp antes de intervenir, sin sorpresas.",
  },
  {
    q: "¿Atendéis urgencias fuera de horario?",
    a: "Sí, ofrecemos servicio de electricista urgente 24 horas, todos los días del año, incluidas noches y festivos.",
  },
  {
    q: "¿Hacéis boletines eléctricos?",
    a: "Sí, tramitamos el boletín eléctrico para instalaciones nuevas, ampliaciones de cuadro y reformas que lo requieran.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 py-16 text-white sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
          <div>
            <p className="mb-3 inline-block rounded-full bg-yellow-400/10 px-4 py-1 text-sm font-semibold text-yellow-400">
              Servicio 24 horas · Barakaldo y Bizkaia
            </p>
            <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl">
              Electricista urgente en Barakaldo, Cruces y toda Bizkaia
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              Averías, cortocircuitos, cuadros eléctricos e instalaciones. Respuesta rápida, presupuesto
              claro y servicio disponible las 24 horas, los 365 días del año.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={telLink()}
                className="rounded-md bg-yellow-400 px-6 py-4 text-center text-lg font-bold text-slate-900 shadow-lg hover:bg-yellow-300"
              >
                Llamar ahora: {business.phoneDisplay}
              </a>
              <a
                href={waLink("Hola, necesito un electricista. ¿Podéis ayudarme?")}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-[#25D366] px-6 py-4 text-center text-lg font-bold text-white shadow-lg hover:brightness-110"
              >
                WhatsApp
              </a>
            </div>
            <p className="mt-4 text-sm text-slate-400">
              📍 {business.address.street}, {business.address.postalCode} {business.address.city} (Bizkaia)
            </p>
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
            Nuestros servicios eléctricos
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-slate-600">
            Electricistas cualificados para cualquier trabajo eléctrico en vivienda, comunidad o local
            comercial.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/servicios/${s.slug}`}
                className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-yellow-600">
                  {s.name}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{s.intro.slice(0, 110)}…</p>
                <span className="mt-4 inline-block text-sm font-semibold text-yellow-600">
                  Ver más →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-2xl font-extrabold text-slate-900 sm:text-3xl">
          Zonas donde damos servicio
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-slate-600">
          Electricista de confianza en Barakaldo y toda Bizkaia, con desplazamiento rápido a domicilio.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {localities.map((l) => (
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

      <CTASection source="home_mid" />

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Lo que dicen nuestros clientes
          </h2>
          <div className="mt-10">
            <Testimonials />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-center text-2xl font-extrabold text-slate-900 sm:text-3xl">
          Preguntas frecuentes
        </h2>
        <div className="mt-8">
          <Faq items={homeFaqs} />
        </div>
        <FaqJsonLd items={homeFaqs} />
      </section>

      <CTASection
        source="home_bottom"
        title="Presupuesto sin compromiso en menos de 1 hora"
        subtitle="Cuéntanos qué necesitas y te respondemos al momento por WhatsApp o llamada."
      />
    </div>
  );
}
