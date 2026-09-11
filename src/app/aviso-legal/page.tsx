import type { Metadata } from "next";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Aviso Legal",
  robots: { index: false, follow: true },
  alternates: { canonical: "/aviso-legal" },
};

export default function AvisoLegalPage() {
  return (
    <div className="bg-neutral-50 py-16">
      <div className="mx-auto max-w-3xl rounded-xl border border-neutral-200 bg-white px-6 py-10 shadow-sm md:px-10">
        <h1 className="font-display text-3xl font-extrabold text-neutral-900">Aviso Legal</h1>
        <p className="mt-5 text-neutral-700 leading-relaxed">
          En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y Comercio
          Electrónico (LSSI-CE), se informa de los siguientes datos:
        </p>
        <ul className="mt-4 list-disc space-y-1.5 pl-5 text-neutral-700">
          <li>Titular: {business.owner}</li>
          {business.nif && <li>NIF: {business.nif}</li>}
          <li>Nombre comercial: {business.name}</li>
          <li>
            Domicilio: {business.address.street}, {business.address.postalCode} {business.address.city},{" "}
            {business.address.region}
          </li>
          <li>Email de contacto: {business.email}</li>
          <li>Teléfono: {business.phoneDisplay}</li>
        </ul>
        <p className="mt-6 text-neutral-700 leading-relaxed">
          El acceso y uso de este sitio web atribuye la condición de usuario e implica la aceptación de las
          condiciones aquí expuestas. El titular se reserva el derecho a modificar los contenidos del sitio
          web sin previo aviso.
        </p>
        <p className="mt-4 text-neutral-700 leading-relaxed">
          Los contenidos, textos, imágenes y demás elementos de este sitio web son propiedad de{" "}
          {business.name} o de terceros que han autorizado su uso, quedando prohibida su reproducción sin
          autorización expresa.
        </p>
      </div>
    </div>
  );
}
