import type { Metadata } from "next";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  robots: { index: false, follow: true },
  alternates: { canonical: "/politica-privacidad" },
};

export default function PrivacidadPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 prose prose-slate">
      <h1>Política de Privacidad</h1>
      <p>
        En {business.name}, responsable del tratamiento {business.owner}, respetamos y protegemos la
        privacidad de los datos que nos facilitas a través de este sitio web, de acuerdo con el
        Reglamento General de Protección de Datos (RGPD) y la LOPDGDD.
      </p>
      <h2>Responsable del tratamiento</h2>
      <p>
        {business.owner} — {business.address.street}, {business.address.postalCode}{" "}
        {business.address.city}, {business.address.region}. Email: {business.email}.
      </p>
      <h2>Finalidad</h2>
      <p>
        Los datos facilitados a través de los formularios de contacto o WhatsApp se utilizan
        exclusivamente para responder a tu solicitud de información o presupuesto sobre nuestros
        servicios eléctricos.
      </p>
      <h2>Legitimación</h2>
      <p>Consentimiento del interesado al enviar sus datos a través de los formularios del sitio web.</p>
      <h2>Conservación</h2>
      <p>
        Los datos se conservarán mientras exista un interés mutuo para mantener la finalidad del
        tratamiento y, cuando ya no sea necesario, se suprimirán con medidas de seguridad adecuadas.
      </p>
      <h2>Derechos</h2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, supresión, portabilidad y limitación u
        oposición al tratamiento escribiendo a {business.email}.
      </p>
    </div>
  );
}
