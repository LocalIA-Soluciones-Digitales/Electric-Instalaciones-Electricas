import type { Metadata } from "next";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  robots: { index: false, follow: true },
  alternates: { canonical: "/politica-privacidad" },
};

export default function PrivacidadPage() {
  return (
    <div className="bg-neutral-50 py-16">
      <div className="mx-auto max-w-3xl rounded-xl border border-neutral-200 bg-white px-6 py-10 shadow-sm md:px-10">
        <h1 className="font-display text-3xl font-extrabold text-neutral-900">Política de Privacidad</h1>
        <p className="mt-5 text-neutral-700 leading-relaxed">
          En {business.name}, responsable del tratamiento {business.owner}, respetamos y protegemos la
          privacidad de los datos que nos facilitas a través de este sitio web, de acuerdo con el
          Reglamento General de Protección de Datos (RGPD) y la LOPDGDD.
        </p>
        <h2 className="font-display mt-8 text-xl font-bold text-neutral-900">Responsable del tratamiento</h2>
        <p className="mt-3 text-neutral-700 leading-relaxed">
          {business.owner} — {business.address.street}, {business.address.postalCode}{" "}
          {business.address.city}, {business.address.region}. Email: {business.email}.
        </p>
        <h2 className="font-display mt-8 text-xl font-bold text-neutral-900">Finalidad</h2>
        <p className="mt-3 text-neutral-700 leading-relaxed">
          Los datos facilitados a través de los formularios de contacto o WhatsApp se utilizan
          exclusivamente para responder a tu solicitud de información o presupuesto sobre nuestros
          servicios eléctricos.
        </p>
        <h2 className="font-display mt-8 text-xl font-bold text-neutral-900">Legitimación</h2>
        <p className="mt-3 text-neutral-700 leading-relaxed">
          Consentimiento del interesado al enviar sus datos a través de los formularios del sitio web.
        </p>
        <h2 className="font-display mt-8 text-xl font-bold text-neutral-900">
          Destinatarios y encargados del tratamiento
        </h2>
        <p className="mt-3 text-neutral-700 leading-relaxed">
          Para prestar el servicio y, en su caso, medir el uso del sitio web, tus datos pueden ser tratados
          por los siguientes encargados del tratamiento, cada uno bajo su propia política de privacidad:
        </p>
        <ul className="mt-4 list-disc space-y-1.5 pl-5 text-neutral-700">
          <li>
            <strong className="text-neutral-900">Vercel Inc.</strong> (EE. UU.): alojamiento del sitio web.
          </li>
          <li>
            <strong className="text-neutral-900">Resend</strong>: envío de la notificación interna por email de
            cada solicitud.
          </li>
          <li>
            <strong className="text-neutral-900">Google LLC</strong> (EE. UU.): Google Analytics y Google Tag
            Manager, si están activos, para medir el uso del sitio web.
          </li>
          <li>
            <strong className="text-neutral-900">Meta Platforms, Inc.</strong> (EE. UU.): Meta Pixel, si está
            activo, para medir el rendimiento de campañas publicitarias.
          </li>
          <li>
            <strong className="text-neutral-900">Cloudflare, Inc.</strong>: verificación anti-spam (Turnstile)
            en los formularios, si está activa.
          </li>
        </ul>
        <p className="mt-4 text-neutral-700 leading-relaxed">
          Cuando alguno de estos encargados trata datos fuera del Espacio Económico Europeo (en particular,
          Google y Meta en EE. UU.), la transferencia se ampara en las garantías previstas por el RGPD para
          transferencias internacionales (como las Cláusulas Contractuales Tipo de la Comisión Europea o el
          marco de adecuación vigente en cada momento). Estos servicios de medición y publicidad solo se
          activan si has dado tu consentimiento a través del panel de cookies.
        </p>
        <h2 className="font-display mt-8 text-xl font-bold text-neutral-900">Conservación</h2>
        <p className="mt-3 text-neutral-700 leading-relaxed">
          Los datos facilitados en los formularios de aviso o presupuesto se conservan durante el tiempo
          necesario para gestionar tu solicitud y, si de ella deriva una relación contractual, durante la
          duración de esa relación y el plazo adicional exigido por la normativa fiscal y mercantil
          aplicable (con carácter general, hasta 6 años desde la finalización del servicio). Transcurridos
          estos plazos, los datos se suprimen o anonimizan de forma segura.
        </p>
        <h2 className="font-display mt-8 text-xl font-bold text-neutral-900">Derechos</h2>
        <p className="mt-3 text-neutral-700 leading-relaxed">
          Puedes ejercer tus derechos de acceso, rectificación, supresión, portabilidad y limitación u
          oposición al tratamiento escribiendo a {business.email}.
        </p>
      </div>
    </div>
  );
}
