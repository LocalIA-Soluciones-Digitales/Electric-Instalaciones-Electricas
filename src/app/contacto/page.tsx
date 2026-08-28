import type { Metadata } from "next";
import { business, telLink, waLink } from "@/lib/business";
import { BudgetContactForm, QuickContactForm } from "@/components/ContactForms";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta con Electric Instalaciones Eléctricas en Barakaldo. Llamada, WhatsApp o formulario. Presupuesto sin compromiso, servicio 24 horas.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <div>
      <section className="bg-slate-900 py-14 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Contacto</h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Estamos disponibles 24 horas para urgencias eléctricas en Barakaldo y toda Bizkaia. Elige la
            forma de contacto que prefieras.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Datos de contacto</h2>
            <ul className="mt-4 space-y-3 text-slate-700">
              <li>
                📞{" "}
                <a href={telLink()} className="font-semibold text-yellow-600">
                  {business.phoneDisplay}
                </a>
              </li>
              <li>
                💬{" "}
                <a
                  href={waLink("Hola, quería consultar sobre un servicio eléctrico.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-yellow-600"
                >
                  Escribir por WhatsApp
                </a>
              </li>
              <li>
                ✉️{" "}
                <a href={`mailto:${business.email}`} className="font-semibold text-yellow-600">
                  {business.email}
                </a>
              </li>
              <li>
                📍 {business.address.street}, {business.address.postalCode} {business.address.city},{" "}
                {business.address.region}
              </li>
              <li>🕑 Servicio urgente disponible 24 horas, los 365 días del año</li>
            </ul>
          </div>
          <QuickContactForm />
        </div>
        <BudgetContactForm />
      </section>
    </div>
  );
}
