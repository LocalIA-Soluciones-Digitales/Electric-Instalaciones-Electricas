import Link from "next/link";
import type { Metadata } from "next";
import { services } from "@/lib/services";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Servicios de Electricista en Barakaldo y Bizkaia",
  description:
    "Averías eléctricas, cuadros eléctricos, cortocircuitos, iluminación LED, instalaciones y reparaciones. Electricista en Barakaldo, Bilbao y toda Bizkaia.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <div>
      <section className="bg-slate-900 py-14 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Servicios de Electricista</h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Trabajos eléctricos para viviendas, comunidades y locales comerciales en Barakaldo, Bilbao y
            toda Bizkaia.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/servicios/${s.slug}`}
              className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-yellow-600">{s.name}</h2>
              <p className="mt-2 text-sm text-slate-600">{s.intro.slice(0, 120)}…</p>
              <span className="mt-4 inline-block text-sm font-semibold text-yellow-600">Ver más →</span>
            </Link>
          ))}
        </div>
      </section>

      <CTASection source="servicios_index" />
    </div>
  );
}
