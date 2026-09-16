import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { business, telLink, waLink, WHATSAPP_GREETING_URGENT } from "@/lib/business";
import { COVERAGE_IMAGE } from "@/lib/stockImages";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import CTASection from "@/components/CTASection";
import Faq, { FaqJsonLd } from "@/components/Faq";
import Reveal from "@/components/Reveal";
import EuskadiCoverageMap from "@/components/coverage/EuskadiCoverageMap";

export const metadata: Metadata = {
  title: "Zonas de Servicio | Electricista 24h en Euskadi",
  description:
    "Electricista urgente 24 horas en toda Euskadi: Bizkaia, Gipuzkoa y Álava. Consulta el mapa de cobertura desde nuestra base en Barakaldo y llama al 677 24 63 74.",
  alternates: { canonical: "/zonas-de-servicio" },
  openGraph: {
    title: "Zonas de Servicio | Electricista 24h en Euskadi",
    description: "Mapa de cobertura eléctrica urgente en Bizkaia, Gipuzkoa y Álava, con base en Barakaldo.",
  },
};

const trustIndicators = [
  { icon: "ri-time-line", label: "Servicio 24 horas" },
  { icon: "ri-flashlight-line", label: "Atención urgente" },
  { icon: "ri-map-pin-2-line", label: "Cobertura en Euskadi" },
  { icon: "ri-price-tag-3-line", label: "Presupuesto sin compromiso" },
];

const faqs = [
  {
    q: "¿Cuánto tardáis en llegar?",
    a: "Depende de la zona: en Barakaldo y los municipios de alrededor solemos llegar en menos de 30 minutos. En el resto de Bizkaia, entre 30 y 60 minutos, y en Gipuzkoa o Álava coordinamos contigo la hora exacta de llegada. Puedes ver el tiempo estimado de tu municipio en el mapa de esta página.",
  },
  {
    q: "¿Trabajáis en toda Euskadi?",
    a: "Sí. Nuestra base está en Barakaldo, pero damos servicio de electricista en toda Bizkaia, Gipuzkoa y Álava, tanto para urgencias como para instalaciones y reformas planificadas.",
  },
  {
    q: "¿Disponéis de servicio 24 horas?",
    a: "Sí, atendemos avisos las 24 horas del día, los 365 días del año, incluidas noches, fines de semana y festivos.",
  },
  {
    q: "¿Atendéis averías urgentes?",
    a: "Sí, la avería eléctrica urgente es uno de nuestros servicios principales: cortes de luz, cortocircuitos, diferenciales que saltan o cuadros dañados, con desplazamiento prioritario.",
  },
  {
    q: "¿Puedo solicitar asistencia por WhatsApp?",
    a: "Sí, puedes escribirnos por WhatsApp contándonos qué ocurre y tu municipio, y te confirmamos tiempo de llegada y presupuesto antes de desplazarnos.",
  },
  {
    q: "¿Realizáis instalaciones eléctricas completas?",
    a: "Sí, además de averías urgentes hacemos instalaciones eléctricas completas para vivienda nueva, reformas y locales comerciales, con boletín y certificado incluidos cuando corresponde.",
  },
];

export default function ZonasDeServicioPage() {
  return (
    <div>
      <BreadcrumbJsonLd items={[{ name: "Inicio", path: "/" }, { name: "Zonas de Servicio", path: "/zonas-de-servicio" }]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-neutral-950 py-20 text-white md:py-28">
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={COVERAGE_IMAGE} alt="" fill sizes="100vw" className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/85 to-neutral-950/60"></div>
        </div>

        <div className="relative mx-auto max-w-4xl px-4 text-center md:px-6">
          <Reveal>
            <div className="mb-5 inline-flex items-center gap-2">
              <span className="h-px w-5 bg-electric-400"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-electric-400">
                Zonas de servicio
              </span>
              <span className="h-px w-5 bg-electric-400"></span>
            </div>
            <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Electricistas 24 Horas en Todo Euskadi
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              Desde nuestra base en Barakaldo ofrecemos asistencia eléctrica urgente en Bizkaia, Gipuzkoa y
              Álava con tiempos de respuesta optimizados.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={telLink()}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-electric-400 px-7 py-4 text-lg font-extrabold text-neutral-950 transition-colors duration-200 hover:bg-electric-300"
              >
                <i className="ri-phone-line text-xl" aria-hidden="true"></i>
                Llamar {business.phoneDisplay}
              </a>
              <a
                href={waLink(WHATSAPP_GREETING_URGENT)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-whatsapp/30 bg-whatsapp/10 px-7 py-4 text-lg font-bold text-whatsapp-300 backdrop-blur-sm transition-colors duration-200 hover:bg-whatsapp/15"
              >
                <i className="ri-whatsapp-line text-xl" aria-hidden="true"></i>
                WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap justify-center gap-x-7 gap-y-3 border-t border-white/15 pt-6">
              {trustIndicators.map((t) => (
                <span key={t.label} className="inline-flex items-center gap-2 text-sm font-semibold text-white/80">
                  <i className="ri-checkbox-circle-fill text-electric-400" aria-hidden="true"></i>
                  {t.label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mapa interactivo */}
      <section id="mapa-cobertura" className="relative overflow-hidden py-14 md:py-20">
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={COVERAGE_IMAGE} alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/80 to-cloud"></div>
        </div>
        <div className="relative mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <EuskadiCoverageMap />
          </Reveal>
        </div>
      </section>

      <CTASection
        source="zonas_mid"
        title="¿Tu municipio no aparece en el mapa?"
        subtitle="Escríbenos o llama igualmente: cubrimos también los pueblos y barrios cercanos a cada zona."
      />

      {/* Texto SEO */}
      <section className="bg-neutral-50 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <Reveal>
            <h2 className="font-display text-center text-2xl font-extrabold text-neutral-900 md:text-3xl">
              Cobertura eléctrica urgente en Euskadi
            </h2>
            <div className="mt-6 space-y-4 text-neutral-600 leading-relaxed">
              <p>
                Somos un electricista en Euskadi con base en Barakaldo, especializado en avisos urgentes y en
                instalaciones eléctricas completas para vivienda, comunidad y local comercial. Trabajamos como
                electricista urgente en Euskadi los 365 días del año, con un electricista 24 horas en Euskadi
                siempre disponible para averías, cortocircuitos y cortes de luz que no pueden esperar.
              </p>
              <p>
                Nuestra cobertura como electricista en Bizkaia incluye{" "}
                <Link href="/zonas-de-servicio/barakaldo" className="font-semibold text-electric-600 hover:underline">
                  Barakaldo
                </Link>
                , Bilbao, Getxo, Portugalete, Santurtzi, Sestao, Basauri, Durango y el resto de la provincia, con
                tiempos de respuesta muy ajustados por la cercanía a nuestra base. También damos servicio de electricista en Gipuzkoa
                (Donostia, Eibar, Irun y alrededores) y electricista en Álava (Vitoria-Gasteiz, Llodio, Amurrio),
                coordinando contigo el horario de la visita cuando la distancia lo requiere.
              </p>
              <p>
                Si tienes una avería eléctrica en Euskadi, no esperes a que empeore: cuadros que huelen a
                quemado, diferenciales que saltan sin motivo aparente o instalaciones antiguas sin
                mantenimiento son un riesgo real. Como electricista urgente en Barakaldo y en toda la comunidad,
                te damos siempre un presupuesto claro antes de intervenir, sin sorpresas en la factura.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <Reveal>
            <h2 className="font-display text-center text-2xl font-extrabold text-neutral-900 md:text-3xl">
              Preguntas frecuentes sobre nuestra cobertura
            </h2>
          </Reveal>
          <div className="mt-8">
            <Faq items={faqs} />
          </div>
          <FaqJsonLd items={faqs} />
        </div>
      </section>

      <CTASection
        source="zonas_bottom"
        title="Electricista urgente cerca de ti, en toda Euskadi"
        subtitle="Llama o escribe por WhatsApp y te confirmamos tiempo de llegada y presupuesto al momento."
      />
    </div>
  );
}
