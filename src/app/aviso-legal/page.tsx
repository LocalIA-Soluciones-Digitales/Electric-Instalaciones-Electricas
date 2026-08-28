import type { Metadata } from "next";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Aviso Legal",
  robots: { index: false, follow: true },
  alternates: { canonical: "/aviso-legal" },
};

export default function AvisoLegalPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 prose prose-slate">
      <h1>Aviso Legal</h1>
      <p>
        En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y Comercio
        Electrónico (LSSI-CE), se informa de los siguientes datos:
      </p>
      <ul>
        <li>Titular: {business.owner}</li>
        <li>Nombre comercial: {business.name}</li>
        <li>
          Domicilio: {business.address.street}, {business.address.postalCode} {business.address.city},{" "}
          {business.address.region}
        </li>
        <li>Email de contacto: {business.email}</li>
        <li>Teléfono: {business.phoneDisplay}</li>
      </ul>
      <p>
        El acceso y uso de este sitio web atribuye la condición de usuario e implica la aceptación de las
        condiciones aquí expuestas. El titular se reserva el derecho a modificar los contenidos del sitio
        web sin previo aviso.
      </p>
      <p>
        Los contenidos, textos, imágenes y demás elementos de este sitio web son propiedad de{" "}
        {business.name} o de terceros que han autorizado su uso, quedando prohibida su reproducción sin
        autorización expresa.
      </p>
    </div>
  );
}
