import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { services } from "@/lib/services";
import { localities } from "@/lib/localities";
import { COVERAGE_IMAGE, HERO_IMAGE, LIGHTING_IMAGE, SERVICE_CARD_IMAGE } from "@/lib/stockImages";
import TrustBadges from "@/components/TrustBadges";
import AboutPro from "@/components/AboutPro";
import Testimonials from "@/components/Testimonials";
import Faq, { FaqJsonLd } from "@/components/Faq";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import ParallaxBanner from "@/components/ParallaxBanner";
import ContactHub from "@/components/lead/ContactHub";

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

// Cruces es un barrio dentro de la propia página de Barakaldo (que ya lo
// menciona junto a Retuerto, Lutxana, etc.): listarlo aparte en el resumen de
// portada sugería que otros barrios no listados no tenían servicio.
const HOME_ZONE_EXCLUDE = new Set(["cruces"]);
const HOME_ZONE_LIMIT = 4;

const localitiesByProvince = localities
  .filter((l) => !HOME_ZONE_EXCLUDE.has(l.slug))
  .reduce<Record<string, typeof localities>>((acc, l) => {
    (acc[l.province] ??= []).push(l);
    return acc;
  }, {});

const trustStrip = [
  { icon: "ri-time-line", label: "Servicio 24h · 365 días" },
  { icon: "ri-price-tag-3-line", label: "Presupuesto sin compromiso" },
  { icon: "ri-flashlight-line", label: "Respuesta rápida en Euskadi" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section id="hero" className="relative flex min-h-[92vh] items-end overflow-hidden bg-neutral-950 text-white">
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={HERO_IMAGE} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/45 to-neutral-950/20"></div>
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-4 pb-14 pt-32 text-center md:px-6 md:pb-20 md:pt-40">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2">
              <span className="h-px w-5 bg-electric-400"></span>
              <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.18em] text-electric-400">
                Servicio 24 horas · Barakaldo y toda Euskadi
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="font-display mx-auto max-w-2xl text-[2.4rem] leading-[1.12] sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              Electricista de confianza en Barakaldo y toda Euskadi
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-xl text-base md:text-lg leading-relaxed text-white/70">
              Averías, cortocircuitos, cuadros eléctricos e instalaciones. Respuesta rápida, presupuesto
              claro y servicio disponible las 24 horas, los 365 días del año.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3">
              <a
                href="#solicitud"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-electric-400 px-7 py-3.5 text-[15px] font-extrabold text-neutral-950 transition-colors duration-200 hover:bg-electric-300"
              >
                <i className="ri-customer-service-2-line text-lg" aria-hidden="true"></i>
                Solicitar asistencia
              </a>
              <a
                href="#presupuesto"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-[15px] font-bold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20"
              >
                <i className="ri-price-tag-3-line text-lg" aria-hidden="true"></i>
                Pedir presupuesto
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-3 border-t border-white/15 pt-6">
              {trustStrip.map((t) => (
                <span key={t.label} className="inline-flex items-center gap-2 text-sm font-semibold text-white/80">
                  <i className={`${t.icon} text-electric-400`} aria-hidden="true"></i>
                  {t.label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Confianza */}
      <section className="bg-cloud py-10 md:py-12">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <TrustBadges />
          </Reveal>
        </div>
      </section>

      <AboutPro />

      {/* Servicios */}
      <section id="servicios" className="bg-white py-10 md:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal className="text-center">
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
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const img = SERVICE_CARD_IMAGE[s.slug];
              return (
                <Reveal key={s.slug} delay={(i % 3) * 0.06}>
                  <Link
                    href={`/servicios/${s.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm shadow-neutral-900/[0.03] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-neutral-900/[0.08]"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-cloud">
                      {img ? (
                        <Image
                          src={img}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-electric-100 via-cloud to-electric-50"></div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 via-transparent to-transparent"></div>
                      <span className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-full bg-electric-400 text-xl text-neutral-950 shadow-sm">
                        <i className={s.icon} aria-hidden="true"></i>
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-display text-lg font-bold text-neutral-900 group-hover:text-electric-600">
                        {s.slug === "iluminacion-led" ? "Iluminación" : s.name}
                      </h3>
                      <p className="mt-2 text-sm text-neutral-600 flex-1">{s.intro.slice(0, 110)}…</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-electric-600">
                        Ver más <i className="ri-arrow-right-line" aria-hidden="true"></i>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Separador parallax: iluminación */}
      <ParallaxBanner
        image={LIGHTING_IMAGE}
        imageAlt="Instalación de iluminación arquitectónica LED"
        className="py-24 md:py-32"
      >
        <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
          <Reveal>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-electric-400">
              Iluminación e instalaciones premium
            </p>
            <p className="font-display mx-auto mt-3 max-w-xl text-2xl font-extrabold text-white sm:text-3xl">
              Cuidamos cada detalle, del cuadro eléctrico a la última bombilla
            </p>
          </Reveal>
        </div>
      </ParallaxBanner>

      {/* Cobertura */}
      <section className="relative overflow-hidden py-12 md:py-16">
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={COVERAGE_IMAGE} alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/70 to-white/95"></div>
        </div>
        <div className="relative mx-auto max-w-6xl px-4 md:px-6 text-center">
          <Reveal>
            <div className="mx-auto max-w-2xl rounded-3xl border border-neutral-200 bg-white/90 p-8 shadow-lg shadow-neutral-900/5 backdrop-blur-sm md:p-10">
              <div className="inline-flex items-center gap-2 justify-center">
                <span className="h-px w-5 bg-electric-500"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-electric-600">
                  Cobertura
                </span>
                <span className="h-px w-5 bg-electric-500"></span>
              </div>
              <h2 className="font-display mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">
                Zonas donde damos servicio
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-neutral-600">
                Con base en Barakaldo, trabajamos en <strong className="text-neutral-900">toda Euskadi</strong>:
                Bizkaia, Gipuzkoa y Araba al completo, también en los barrios y municipios que no
                aparecen en esta lista.
              </p>
              <div className="mt-8 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
                {Object.entries(localitiesByProvince).map(([province, items]) => {
                  const shown = items.slice(0, HOME_ZONE_LIMIT);
                  const rest = items.length - shown.length;
                  return (
                    <div key={province} className="rounded-2xl border border-neutral-200 bg-white/80 p-5">
                      <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-electric-600">
                        <i className="ri-map-pin-2-fill" aria-hidden="true"></i>
                        {province}
                      </p>
                      <ul className="mt-3 flex flex-col divide-y divide-neutral-100">
                        {shown.map((l) => (
                          <li key={l.slug}>
                            <Link
                              href={`/electricista-${l.slug}`}
                              className="group flex items-center justify-between gap-2 py-2 text-sm font-semibold text-neutral-700 transition-colors duration-200 hover:text-electric-600"
                            >
                              {l.name}
                              <i
                                className="ri-arrow-right-s-line text-neutral-300 transition-colors duration-200 group-hover:text-electric-500"
                                aria-hidden="true"
                              ></i>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      {rest > 0 && (
                        <p className="mt-2 pt-2 text-xs text-neutral-400">
                          Y {rest} localidad{rest === 1 ? "" : "es"} más en {province}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="mx-auto mt-6 max-w-xl text-sm text-neutral-500">
                ¿Tu localidad no aparece?{" "}
                <a href="#solicitud" className="font-semibold text-electric-600 hover:underline">
                  Escríbenos
                </a>{" "}
                y confirmamos cobertura en minutos.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection source="home_mid" />

      {/* Testimonios */}
      <section className="bg-cloud py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal className="text-center">
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-neutral-900">
              Por qué confiar en Electric
            </h2>
          </Reveal>
          <div className="mt-10">
            <Reveal delay={0.08}>
              <Testimonials />
            </Reveal>
          </div>
        </div>
      </section>

      <ContactHub />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <Reveal>
            <h2 className="font-display text-center text-2xl md:text-3xl font-extrabold text-neutral-900">
              Preguntas frecuentes
            </h2>
          </Reveal>
          <div className="mt-8">
            <Faq items={homeFaqs} />
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
