import Link from "next/link";
import type { Metadata } from "next";
import { services } from "@/lib/services";
import CTASection from "@/components/CTASection";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Servicios de Electricista en Barakaldo y Bizkaia",
  description:
    "Averías eléctricas, cuadros eléctricos, cortocircuitos, iluminación LED, instalaciones y reparaciones. Electricista en Barakaldo, Bilbao y toda Bizkaia.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <div>
      <BreadcrumbJsonLd items={[{ name: "Inicio", path: "/" }, { name: "Servicios", path: "/servicios" }]} />

      <section className="bg-neutral-950 py-14 text-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Servicios de Electricista</h1>
          <p className="mt-3 max-w-2xl text-white/50">
            Trabajos eléctricos para viviendas, comunidades y locales comerciales en Barakaldo, Bilbao y
            toda Bizkaia.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/servicios/${s.slug}`}
              className="group rounded-lg border border-white/[0.08] bg-neutral-900/60 p-6 transition-colors duration-200 hover:border-electric-400/40"
            >
              <h2 className="font-display text-lg font-bold text-white group-hover:text-electric-400">
                {s.name}
              </h2>
              <p className="mt-2 text-sm text-white/50">{s.intro.slice(0, 120)}…</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-electric-400">
                Ver más <i className="ri-arrow-right-line" aria-hidden="true"></i>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CTASection source="servicios_index" />
    </div>
  );
}
