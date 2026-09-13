import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { services } from "@/lib/services";
import { localities } from "@/lib/localities";
import { HERO_IMAGE, HERO_VIDEO, PANEL_CLOSEUP_IMAGE, SERVICE_CARD_IMAGE } from "@/lib/stockImages";
import TrustBadges from "@/components/TrustBadges";
import AboutPro from "@/components/AboutPro";
import Testimonials from "@/components/Testimonials";
import Faq, { FaqJsonLd } from "@/components/Faq";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import ParallaxBanner from "@/components/ParallaxBanner";
import ContactHub from "@/components/lead/ContactHub";
import UrgentBanner from "@/components/UrgentBanner";
import ProcessSteps from "@/components/ProcessSteps";
import CoverageMap from "@/components/CoverageMap";
import HeroVideo from "@/components/HeroVideo";

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

// Spans asimétricos para las 7 tarjetas de servicio (grid de 6 columnas en desktop).
const SERVICE_SPANS = [
  "md:col-span-3",
  "md:col-span-3",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-4",
  "md:col-span-2",
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section
        id="hero"
        className="relative -mt-16 flex min-h-[92vh] items-center overflow-hidden bg-ink text-offwhite"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <HeroVideo
            src={HERO_VIDEO}
            poster={HERO_IMAGE}
            className="absolute inset-0 h-full w-full scale-105 object-cover object-center brightness-[0.75] saturate-[1.05] motion-reduce:hidden"
          />
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            sizes="100vw"
            className="hidden scale-105 object-cover object-center brightness-[0.75] saturate-[1.05] motion-reduce:block"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/65 to-ink/15"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/25"></div>
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-28 md:px-6 md:pb-24 md:pt-32">
          <div className="max-w-xl">
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-2">
                <span className="h-px w-8 bg-electric-400"></span>
                <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.22em] text-electric-400">
                  Instalaciones eléctricas · Barakaldo · Euskadi
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="font-display text-[2.6rem] leading-[1.08] tracking-tight sm:text-5xl md:text-6xl font-extrabold">
                Electricidad bien hecha.
                <br />
                Sin complicaciones.
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-5 max-w-md text-base md:text-lg leading-relaxed text-white/70">
                Averías, instalaciones y soluciones eléctricas profesionales para viviendas, comunidades y
                negocios.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#solicitud"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-electric-400 px-7 py-3.5 text-[15px] font-extrabold text-neutral-950 transition-colors duration-200 hover:bg-electric-300"
                >
                  <i className="ri-customer-service-2-line text-lg" aria-hidden="true"></i>
                  Solicitar asistencia
                </a>
                <a
                  href="#servicios"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-[15px] font-bold text-offwhite backdrop-blur-sm transition-colors duration-200 hover:bg-white/10"
                >
                  Ver servicios
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <p className="mt-9 border-t border-white/15 pt-5 text-xs md:text-sm font-semibold uppercase tracking-[0.1em] text-white/50">
                24 h · 365 días · Respuesta rápida · Presupuesto claro
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Confianza */}
      <section className="bg-ink py-10 md:py-12">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <TrustBadges />
          </Reveal>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="bg-ink py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <div className="inline-flex items-center gap-2">
              <span className="h-px w-5 bg-electric-400"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-electric-400">
                Servicios
              </span>
            </div>
            <h2 className="font-display mt-4 max-w-xl text-3xl md:text-4xl font-extrabold tracking-tight text-offwhite">
              Soluciones eléctricas, de principio a fin.
            </h2>
            <p className="mt-4 max-w-xl text-base md:text-lg text-white/55 leading-relaxed">
              Electricistas cualificados para cualquier trabajo eléctrico en vivienda, comunidad o local
              comercial, en Barakaldo y toda Euskadi.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-6">
            {services.map((s, i) => {
              const img = SERVICE_CARD_IMAGE[s.slug];
              return (
                <Reveal key={s.slug} delay={(i % 4) * 0.06} className={SERVICE_SPANS[i]}>
                  <Link
                    href={`/servicios/${s.slug}`}
                    className="group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-lg border border-white/10 bg-carbon p-6 transition-all duration-300 hover:-translate-y-1 hover:border-electric-400/40"
                  >
                    {img && (
                      <Image
                        src={img}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="absolute inset-0 object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-[0.15]"
                      />
                    )}
                    <div className="relative flex items-start justify-between">
                      <span className="font-display text-sm font-bold text-white/25">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <i className={`${s.icon} text-xl text-electric-400`} aria-hidden="true"></i>
                    </div>
                    <div className="relative mt-10">
                      <h3 className="font-display text-lg font-bold text-offwhite transition-colors duration-200 group-hover:text-electric-400">
                        {s.slug === "iluminacion-led" ? "Iluminación" : s.name}
                      </h3>
                      <p className="mt-2 text-sm text-white/50">{s.intro.slice(0, 100)}…</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-electric-400">
                        Ver más
                        <i
                          className="ri-arrow-right-line transition-transform duration-200 group-hover:translate-x-1"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Precisión */}
      <ParallaxBanner
        image={PANEL_CLOSEUP_IMAGE}
        imageAlt="Primer plano de un cuadro eléctrico organizado, cableado y conexiones"
        className="py-24 md:py-32"
      >
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-electric-400">Precisión</p>
            <p className="font-display mt-3 max-w-lg text-3xl font-extrabold text-offwhite sm:text-4xl">
              Cada conexión importa.
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/65">
              Cuidamos tanto la seguridad como el acabado de cada instalación: cableado ordenado,
              conexiones bien hechas y un cuadro que se entiende de un vistazo.
            </p>
          </Reveal>
        </div>
      </ParallaxBanner>

      <UrgentBanner />

      <ProcessSteps />

      {/* Cobertura */}
      <section id="cobertura" className="bg-carbon py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <Reveal>
              <div className="inline-flex items-center gap-2">
                <span className="h-px w-5 bg-electric-400"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-electric-400">
                  Cobertura
                </span>
              </div>
              <h2 className="font-display mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-offwhite">
                Zonas donde damos servicio
              </h2>
              <p className="mt-3 max-w-md text-white/60">
                Con base en Barakaldo, trabajamos en <strong className="text-offwhite">toda Euskadi</strong>:
                Bizkaia, Gipuzkoa y Araba al completo, también en los barrios y municipios que no aparecen
                en esta lista.
              </p>
              <div className="mt-8 text-electric-400/70">
                <CoverageMap />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {Object.entries(localitiesByProvince).map(([province, items]) => {
                  const shown = items.slice(0, HOME_ZONE_LIMIT);
                  const rest = items.length - shown.length;
                  return (
                    <div key={province} className="rounded-lg border border-white/10 bg-ink/60 p-5">
                      <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-electric-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-electric-400"></span>
                        {province}
                      </p>
                      <ul className="mt-3 flex flex-col divide-y divide-white/5">
                        {shown.map((l) => (
                          <li key={l.slug}>
                            <Link
                              href={`/electricista-${l.slug}`}
                              className="group flex items-center justify-between gap-2 py-2 text-sm font-semibold text-white/70 transition-colors duration-200 hover:text-electric-400"
                            >
                              {l.name}
                              <i
                                className="ri-arrow-right-s-line text-white/25 transition-colors duration-200 group-hover:text-electric-400"
                                aria-hidden="true"
                              ></i>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-2 pt-2 text-xs text-white/35">
                        {rest > 0
                          ? `Y ${rest} localidad${rest === 1 ? "" : "es"} más en ${province}`
                          : `Y el resto de municipios de ${province}`}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
          <p className="mt-8 max-w-xl text-sm text-white/45">
            ¿Tu localidad no aparece?{" "}
            <a href="#solicitud" className="font-semibold text-electric-400 hover:underline">
              Escríbenos
            </a>{" "}
            y confirmamos cobertura en minutos.
          </p>
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

      <AboutPro />

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
