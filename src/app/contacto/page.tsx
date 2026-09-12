import type { Metadata } from "next";
import { business, telLink, waLink } from "@/lib/business";
import { PANEL_CLOSEUP_IMAGE } from "@/lib/stockImages";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import PageHero from "@/components/PageHero";
import PresupuestoForm from "@/components/lead/PresupuestoForm";

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

      <section className="bg-neutral-50 py-14">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
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
            <div className="relative hidden md:block">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element -- imagen de referencia externa, ver src/lib/stockImages.ts */}
                <img src={PANEL_CLOSEUP_IMAGE} alt="Cuadro eléctrico organizado" className="h-full w-full object-cover" />
              </div>
              <div className="absolute -bottom-3 -left-3 bg-electric-400 text-neutral-950 px-4 py-2 rounded-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em]">Atención 24h</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PresupuestoForm />
    </div>
  );
}
