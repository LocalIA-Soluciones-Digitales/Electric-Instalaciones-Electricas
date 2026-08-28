import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: "Política de Cookies",
  robots: { index: false, follow: true },
  alternates: { canonical: "/politica-cookies" },
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 prose prose-slate">
      <h1>Política de Cookies</h1>
      <p>
        Este sitio web, propiedad de {business.name}, utiliza cookies propias y de terceros para mejorar
        la experiencia de navegación, analizar el tráfico y ofrecer publicidad relevante a través de
        Google Ads y Meta Ads.
      </p>
      <h2>Tipos de cookies utilizadas</h2>
      <ul>
        <li>
          <strong>Cookies técnicas:</strong> necesarias para el funcionamiento básico del sitio web.
        </li>
        <li>
          <strong>Cookies analíticas (Google Analytics):</strong> nos permiten conocer cómo interactúan
          los usuarios con la web.
        </li>
        <li>
          <strong>Cookies publicitarias (Google Ads, Meta Ads):</strong> utilizadas para mostrar anuncios
          relevantes y medir su rendimiento.
        </li>
      </ul>
      <p>
        Puedes aceptar o rechazar el uso de cookies no esenciales desde el banner de consentimiento que
        aparece al visitar el sitio, o modificar la configuración de tu navegador en cualquier momento.
      </p>
      <p>
        Para más información sobre el tratamiento de tus datos, consulta nuestra{" "}
        <Link href="/politica-privacidad">Política de Privacidad</Link>.
      </p>
    </div>
  );
}
