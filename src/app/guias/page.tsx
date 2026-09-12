import Link from "next/link";
import type { Metadata } from "next";
import { guides } from "@/lib/guides";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Guías de Electricidad",
  description:
    "Respuestas claras a las dudas eléctricas más comunes: diferenciales, boletín eléctrico, cortocircuitos y mantenimiento del cuadro. Por Electric, electricistas en Euskadi.",
  alternates: { canonical: "/guias" },
};

export default function GuiasPage() {
  return (
    <div>
      <BreadcrumbJsonLd items={[{ name: "Inicio", path: "/" }, { name: "Guías", path: "/guias" }]} />

      <PageHero
        title="Guías de Electricidad"
        subtitle="Respuestas claras, sin tecnicismos, a las dudas que más nos preguntan por teléfono antes de pedir presupuesto."
        contentWidth="6xl"
      />

      <section className="bg-neutral-50 py-14">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((g) => (
              <Link
                key={g.slug}
                href={`/guias/${g.slug}`}
                className="group rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-colors duration-200 hover:border-electric-400/60"
              >
                <h2 className="font-display text-lg font-bold text-neutral-900 group-hover:text-electric-600">
                  {g.title}
                </h2>
                <p className="mt-2 text-sm text-neutral-600">{g.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-electric-600">
                  Leer guía <i className="ri-arrow-right-line" aria-hidden="true"></i>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection source="guias_index" />
    </div>
  );
}
