import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { services } from "@/lib/services";
import { HERO_IMAGE, COVERAGE_IMAGE } from "@/lib/stockImages";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Servicios de Electricista en Euskadi",
  description:
    "Averías eléctricas, cuadros eléctricos, cortocircuitos, iluminación LED, instalaciones y reparaciones. Electricista en Barakaldo, Bilbao y toda Euskadi.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <div>
      <BreadcrumbJsonLd items={[{ name: "Inicio", path: "/" }, { name: "Servicios", path: "/servicios" }]} />

      <PageHero
        eyebrow="Nuestros servicios"
        title="Un electricista. Todos los trabajos. Una sola llamada."
        subtitle="Trabajos eléctricos para viviendas, comunidades y locales comerciales en Barakaldo, Bilbao y toda Euskadi, con presupuesto claro antes de intervenir."
        image={HERO_IMAGE}
        contentWidth="6xl"
        size="large"
      />

      <section className="bg-neutral-50">
        <div className="mx-auto max-w-6xl divide-y divide-neutral-200 px-4 md:px-6">
          {services.map((s, i) => (
            <div key={s.slug} className="grid gap-6 py-10 md:grid-cols-[auto_1fr] md:gap-10 md:py-12">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-electric-100 text-2xl text-electric-600">
                <i className={s.icon} aria-hidden="true"></i>
              </div>

              <div>
                <Link href={`/servicios/${s.slug}`} className="group inline-flex items-center gap-2">
                  <h2 className="font-display text-xl font-extrabold text-neutral-900 group-hover:text-electric-600 sm:text-2xl">
                    {s.name}
                  </h2>
                  <i
                    className="ri-arrow-right-line text-lg text-neutral-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-electric-600"
                    aria-hidden="true"
                  ></i>
                </Link>
                <p className="mt-2 max-w-2xl text-neutral-600">{s.intro}</p>

                <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                  {s.bullets.slice(0, 4).map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-neutral-600">
                      <i className="ri-check-line mt-0.5 shrink-0 text-electric-600" aria-hidden="true"></i>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/servicios/${s.slug}#presupuesto`}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-electric-400 px-5 py-2.5 text-sm font-extrabold text-neutral-950 transition-colors duration-200 hover:bg-electric-300"
                >
                  Pedir presupuesto para {s.shortName.toLowerCase()}
                  <i className="ri-arrow-right-line" aria-hidden="true"></i>
                </Link>
              </div>

              {i === 3 && (
                <div className="relative col-span-full my-4 overflow-hidden rounded-2xl">
                  <div className="relative aspect-[16/6] w-full">
                    <Image
                      src={COVERAGE_IMAGE}
                      alt="Vista de Euskadi, zona de cobertura del servicio"
                      fill
                      sizes="(min-width: 768px) 72vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-neutral-950/55"></div>
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-electric-400">
                      Cobertura
                    </p>
                    <p className="font-display text-xl font-extrabold text-white sm:text-2xl">
                      Trabajamos en toda Euskadi
                    </p>
                    <p className="max-w-md text-sm text-white/70">
                      Bizkaia, Gipuzkoa y Araba, con desplazamiento rápido a domicilio.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <CTASection source="servicios_index" />
    </div>
  );
}
