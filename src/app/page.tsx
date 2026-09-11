import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { WHATSAPP_GREETING_URGENT, business, telLink, waLink } from "@/lib/business";
import { services } from "@/lib/services";
import { localities } from "@/lib/localities";
import { COVERAGE_IMAGE, HERO_DESKTOP_IMAGE, HERO_MOBILE_IMAGE, SERVICES_IMAGE } from "@/lib/stockImages";
import TrustBadges from "@/components/TrustBadges";
import AboutPro from "@/components/AboutPro";
import Testimonials from "@/components/Testimonials";
import Faq, { FaqJsonLd } from "@/components/Faq";
import CTASection from "@/components/CTASection";
import SolicitudWizard from "@/components/lead/SolicitudWizard";
import PresupuestoForm from "@/components/lead/PresupuestoForm";

export const metadata: Metadata = {
  title: "Electricista en Barakaldo y Euskadi 24 Horas",
  description:
    "Electricista urgente en Barakaldo, Bilbao, Cruces y toda Euskadi. Averías, cuadros eléctricos, instalaciones y reparaciones. Servicio 24h. Llama al 677 24 63 74.",
  alternates: { canonical: "/" },
};

const homeFaqs = [
  {
    q: "¿En qué zonas de Euskadi trabajáis?",
    a: "Nuestra base está en Barakaldo, pero damos servicio de electricista en toda Euskadi: Bizkaia al completo (Bilbao, Cruces, Getxo, Portugalete, Santurtzi, Basauri, Durango...), así como Gipuzkoa y Araba.",
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
      <section id="hero" className="relative overflow-hidden bg-neutral-950 text-white">
        {/* Fondo en móvil */}
        <div className="absolute inset-0 md:hidden" aria-hidden="true">
          <Image src={HERO_MOBILE_IMAGE} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-neutral-950/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-neutral-950/60"></div>
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col md:flex-row md:items-center gap-10 px-4 py-16 md:px-6 md:py-24">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="h-px w-5 bg-electric-400"></span>
              <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.18em] text-electric-400">
                Servicio 24 horas · Barakaldo y toda Euskadi
              </span>
            </div>

            <h1 className="text-shadow font-display max-w-2xl text-[2.4rem] leading-[1.15] sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              Electricista urgente en Barakaldo y toda Euskadi
            </h1>

            <p className="text-shadow-sm mt-5 max-w-xl text-base md:text-lg leading-relaxed text-white/60">
              Averías, cortocircuitos, cuadros eléctricos e instalaciones. Respuesta rápida, presupuesto
              claro y servicio disponible las 24 horas, los 365 días del año.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              <a
                href="#solicitud"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-electric-400 px-7 py-3.5 text-[15px] font-extrabold text-neutral-950 transition-colors duration-200 hover:bg-electric-300"
              >
                <i className="ri-customer-service-2-line text-lg" aria-hidden="true"></i>
                Solicitar asistencia
              </a>
              <a
                href="#presupuesto"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-white/20 px-7 py-3.5 text-[15px] font-bold text-white transition-colors duration-200 hover:bg-white/5"
              >
                <i className="ri-price-tag-3-line text-lg" aria-hidden="true"></i>
                Pedir presupuesto
              </a>
            </div>

            <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-3">
              <a
                href={telLink()}
                className="inline-flex items-center gap-2.5 text-sm font-bold text-white/70 hover:text-white transition-colors duration-200"
              >
                <i className="ri-phone-line text-lg text-electric-400" aria-hidden="true"></i>
                {business.phoneDisplay}
              </a>
              <a
                href={waLink(WHATSAPP_GREETING_URGENT)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sm font-bold text-whatsapp/90 hover:text-whatsapp transition-colors duration-200"
              >
                <i className="ri-whatsapp-line text-lg" aria-hidden="true"></i>
                WhatsApp
              </a>
              <span className="inline-flex items-center gap-2.5 text-sm text-white/40">
                <i className="ri-map-pin-2-line text-lg" aria-hidden="true"></i>
                {business.address.street}, {business.address.city}
              </span>
            </div>
          </div>

          {/* Imagen en escritorio */}
          <div className="hidden md:block md:flex-1 md:max-w-[42%]">
            <div className="relative aspect-[4/5] max-h-[520px] overflow-hidden rounded-lg">
              {/* Sin `priority`: solo la imagen móvil (visible en la mayoría de
                  visitas) se precarga. Con `priority` en ambas, el navegador
                  emitía dos <link rel="preload"> y en móvil el preload de esta
                  imagen (sizes 100vw al no cumplirse el min-width) competía por
                  ancho de banda con la que realmente se pinta. `loading="eager"`
                  evita el retraso de lazy-load en escritorio, donde sí es visible
                  desde el primer pintado, sin duplicar el preload. */}
              <Image
                src={HERO_DESKTOP_IMAGE}
                alt="Electricista trabajando en un cuadro eléctrico de una vivienda"
                fill
                loading="eager"
                sizes="(min-width: 768px) 42vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-l from-neutral-950/20 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <TrustBadges light />
        </div>
      </section>

      <AboutPro />

      <section className="bg-neutral-900 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-display text-center text-2xl md:text-3xl font-extrabold text-white">
            Por qué confiar en Electric
          </h2>
          <div className="mt-10">
            <Testimonials />
          </div>
        </div>
      </section>

      <SolicitudWizard />
      <PresupuestoForm />

      <section id="servicios" className="bg-neutral-50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2">
              <span className="h-px w-5 bg-electric-500"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-electric-600">
                Servicios
              </span>
              <span className="h-px w-5 bg-electric-500"></span>
            </div>
            <h2 className="font-display mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">
              Todo lo que necesita tu instalación, con un mismo electricista
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-neutral-600 leading-relaxed">
              Electricistas cualificados para cualquier trabajo eléctrico en vivienda, comunidad o local
              comercial, en Barakaldo y toda Euskadi.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/servicios/${s.slug}`}
                className="group rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-colors duration-200 hover:border-electric-400/60"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-electric-100 text-xl text-electric-600">
                  <i className={s.icon} aria-hidden="true"></i>
                </span>
                <h3 className="font-display mt-4 text-lg font-bold text-neutral-900 group-hover:text-electric-600">
                  {s.name}
                </h3>
                <p className="mt-2 text-sm text-neutral-600">{s.intro.slice(0, 110)}…</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-electric-600">
                  Ver más <i className="ri-arrow-right-line" aria-hidden="true"></i>
                </span>
              </Link>
            ))}
          </div>

          <div className="relative mt-14 overflow-hidden rounded-2xl">
            <div className="relative aspect-[16/7] w-full sm:aspect-[16/5]">
              <Image
                src={SERVICES_IMAGE}
                alt="Herramientas eléctricas profesionales"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-neutral-950/60"></div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-electric-400">
                Urgencias 24h
              </p>
              <p className="font-display max-w-lg text-xl font-extrabold text-white sm:text-2xl">
                ¿Necesitas un electricista ahora mismo?
              </p>
              <a
                href="#solicitud"
                className="mt-1 inline-flex items-center gap-2 rounded-full bg-electric-400 px-6 py-3 text-sm font-extrabold text-neutral-950 transition-colors duration-200 hover:bg-electric-300"
              >
                Solicitar asistencia
                <i className="ri-arrow-right-line" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={COVERAGE_IMAGE} alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-neutral-950/75"></div>
        </div>
        <div className="relative mx-auto max-w-6xl px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 justify-center">
            <span className="h-px w-5 bg-electric-400"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-electric-400">
              Cobertura
            </span>
            <span className="h-px w-5 bg-electric-400"></span>
          </div>
          <h2 className="font-display mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Zonas donde damos servicio
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/50">
            Electricista de confianza con base en Barakaldo y servicio en toda Euskadi, con desplazamiento rápido a domicilio.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {localities.map((l) => (
              <Link
                key={l.slug}
                href={`/electricista-${l.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] px-5 py-2.5 text-sm font-semibold text-white/70 transition-colors duration-200 hover:border-electric-400/50 hover:text-electric-400"
              >
                <i className="ri-map-pin-2-line" aria-hidden="true"></i>
                Electricista en {l.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection source="home_mid" />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <h2 className="font-display text-center text-2xl md:text-3xl font-extrabold text-neutral-900">
            Preguntas frecuentes
          </h2>
          <div className="mt-8">
            <Faq items={homeFaqs} light />
          </div>
          <FaqJsonLd items={homeFaqs} />
        </div>
      </section>

      <CTASection
        source="home_bottom"
        title="Presupuesto sin compromiso, sin sorpresas"
        subtitle="Cuéntanos qué necesitas y te respondemos en menos de 1 hora, por WhatsApp o llamada."
      />
    </div>
  );
}
