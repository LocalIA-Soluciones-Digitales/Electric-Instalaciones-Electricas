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
    <div className="bg-neutral-50 py-16">
      <div className="mx-auto max-w-3xl rounded-xl border border-neutral-200 bg-white px-6 py-10 shadow-sm md:px-10">
        <h1 className="font-display text-3xl font-extrabold text-neutral-900">Política de Cookies</h1>
        <p className="mt-5 text-neutral-700 leading-relaxed">
          Este sitio web, propiedad de {business.name}, utiliza cookies propias y de terceros para mejorar
          la experiencia de navegación, analizar el tráfico y ofrecer publicidad relevante a través de
          Google Ads y Meta Ads.
        </p>
        <h2 className="font-display mt-8 text-xl font-bold text-neutral-900">Tipos de cookies utilizadas</h2>
        <ul className="mt-4 list-disc space-y-1.5 pl-5 text-neutral-700">
          <li>
            <strong className="text-neutral-900">Cookies técnicas:</strong> necesarias para el funcionamiento
            básico del sitio web.
          </li>
          <li>
            <strong className="text-neutral-900">Cookies analíticas (Google Analytics):</strong> nos permiten
            conocer cómo interactúan los usuarios con la web.
          </li>
          <li>
            <strong className="text-neutral-900">Cookies publicitarias (Google Ads, Meta Ads):</strong>{" "}
            utilizadas para mostrar anuncios relevantes y medir su rendimiento.
          </li>
        </ul>
        <p className="mt-6 text-neutral-700 leading-relaxed">
          Puedes aceptar o rechazar el uso de cookies no esenciales desde el banner de consentimiento que
          aparece al visitar el sitio, o modificar la configuración de tu navegador en cualquier momento.
        </p>
        <p className="mt-4 text-neutral-700 leading-relaxed">
          Para más información sobre el tratamiento de tus datos, consulta nuestra{" "}
          <Link href="/politica-privacidad" className="font-semibold text-electric-600 hover:text-electric-700">
            Política de Privacidad
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
