import type { Metadata } from "next";
import { business, telLink, waLink } from "@/lib/business";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
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

      <section className="bg-neutral-950 py-14 text-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Contacto</h1>
          <p className="mt-3 max-w-2xl text-white/50">
            Estamos disponibles 24 horas para urgencias eléctricas en Barakaldo y toda Bizkaia. Elige la
            forma de contacto que prefieras.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 md:px-6">
        <div className="rounded-xl border border-white/[0.08] bg-neutral-900/60 p-6">
          <h2 className="font-display text-lg font-bold text-white">Datos de contacto</h2>
          <ul className="mt-4 space-y-3 text-white/70">
            <li className="flex items-center gap-3">
              <i className="ri-phone-line text-electric-400" aria-hidden="true"></i>
              <a href={telLink()} className="font-semibold text-white hover:text-electric-400">
                {business.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <i className="ri-whatsapp-line text-electric-400" aria-hidden="true"></i>
              <a
                href={waLink("Hola, quería consultar sobre un servicio eléctrico.")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white hover:text-electric-400"
              >
                Escribir por WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-3">
              <i className="ri-mail-line text-electric-400" aria-hidden="true"></i>
              <a href={`mailto:${business.email}`} className="font-semibold text-white hover:text-electric-400">
                {business.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <i className="ri-map-pin-2-line text-electric-400" aria-hidden="true"></i>
              {business.address.street}, {business.address.postalCode} {business.address.city},{" "}
              {business.address.region}
            </li>
            <li className="flex items-center gap-3">
              <i className="ri-time-line text-electric-400" aria-hidden="true"></i>
              Servicio urgente disponible 24 horas, los 365 días del año
            </li>
          </ul>
        </div>
      </section>

      <PresupuestoForm />
    </div>
  );
}
