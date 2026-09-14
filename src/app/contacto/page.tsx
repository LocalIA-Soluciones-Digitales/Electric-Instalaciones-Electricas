import type { Metadata } from "next";
import Image from "next/image";
import { business, telLink, waLink } from "@/lib/business";
import { PANEL_LUXURY_IMAGE } from "@/lib/stockImages";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import PageHero from "@/components/PageHero";
import DiagnosticoElectrico from "@/components/lead/DiagnosticoElectrico";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta con Electric Instalaciones Eléctricas en Barakaldo. Llamada, WhatsApp o formulario. Presupuesto sin compromiso, servicio 24 horas.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <div>
      <BreadcrumbJsonLd items={[{ name: "Inicio", path: "/" }, { name: "Contacto", path: "/contacto" }]} />

      <PageHero
        title="Contacto"
        subtitle="Estamos disponibles 24 horas para urgencias eléctricas en Barakaldo y en toda Euskadi. Elige la forma de contacto que prefieras."
        contentWidth="6xl"
      />

      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={PANEL_LUXURY_IMAGE}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/70 to-white/95"></div>
        </div>

        <div className="relative mx-auto max-w-2xl px-4 md:px-6">
          <div className="rounded-2xl border border-neutral-200 bg-white/90 p-6 shadow-lg shadow-neutral-900/5 backdrop-blur-sm md:p-8">
            <h2 className="font-display text-lg font-bold text-neutral-900">Datos de contacto</h2>
            <ul className="mt-4 space-y-3 text-neutral-700">
              <li className="flex items-center gap-3">
                <i className="ri-phone-line text-electric-600" aria-hidden="true"></i>
                <a href={telLink()} className="font-semibold text-neutral-900 hover:text-electric-600">
                  {business.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <i className="ri-whatsapp-line text-electric-600" aria-hidden="true"></i>
                <a
                  href={waLink("Hola, quería consultar sobre un servicio eléctrico.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-neutral-900 hover:text-electric-600"
                >
                  Escribir por WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-3">
                <i className="ri-mail-line text-electric-600" aria-hidden="true"></i>
                <a href={`mailto:${business.email}`} className="font-semibold text-neutral-900 hover:text-electric-600">
                  {business.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <i className="ri-map-pin-2-line text-electric-600" aria-hidden="true"></i>
                {business.address.street}, {business.address.postalCode} {business.address.city},{" "}
                {business.address.region}
              </li>
              <li className="flex items-center gap-3">
                <i className="ri-time-line text-electric-600" aria-hidden="true"></i>
                Servicio urgente disponible 24 horas, los 365 días del año
              </li>
            </ul>
          </div>
        </div>
      </section>

      <DiagnosticoElectrico />
    </div>
  );
}
