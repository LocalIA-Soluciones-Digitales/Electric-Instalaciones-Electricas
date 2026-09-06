import Link from "next/link";
import type { Metadata } from "next";
import { guides } from "@/lib/guides";
import CTASection from "@/components/CTASection";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Guías de Electricidad",
  description:
    "Respuestas claras a las dudas eléctricas más comunes: diferenciales, boletín eléctrico, cortocircuitos y mantenimiento del cuadro. Por Electric, electricistas en Bizkaia.",
  alternates: { canonical: "/guias" },
};

export default function GuiasPage() {
  return (
    <div>
      <BreadcrumbJsonLd items={[{ name: "Inicio", path: "/" }, { name: "Guías", path: "/guias" }]} />

      <section className="bg-neutral-950 py-14 text-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Guías de Electricidad</h1>
          <p className="mt-3 max-w-2xl text-white/50">
            Respuestas claras, sin tecnicismos, a las dudas que más nos preguntan por teléfono antes de
            pedir presupuesto.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/guias/${g.slug}`}
              className="group rounded-lg border border-white/[0.08] bg-neutral-900/60 p-6 transition-colors duration-200 hover:border-electric-400/40"
            >
              <h2 className="font-display text-lg font-bold text-white group-hover:text-electric-400">
                {g.title}
              </h2>
              <p className="mt-2 text-sm text-white/50">{g.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-electric-400">
                Leer guía <i className="ri-arrow-right-line" aria-hidden="true"></i>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CTASection source="guias_index" />
    </div>
  );
}
