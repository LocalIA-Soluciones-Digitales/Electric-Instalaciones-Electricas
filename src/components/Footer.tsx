import Link from "next/link";
import { business } from "@/lib/business";
import { services } from "@/lib/services";
import { localities } from "@/lib/localities";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <h3 className="mb-3 text-base font-bold text-white">{business.name}</h3>
          <p className="text-sm">
            {business.address.street}
            <br />
            {business.address.postalCode} {business.address.city}, {business.address.region}
          </p>
          <p className="mt-3 text-sm">
            Tel/WhatsApp:{" "}
            <a href={`tel:+${business.whatsapp}`} className="text-yellow-400">
              {business.phoneDisplay}
            </a>
          </p>
          <p className="text-sm">
            Email: <a href={`mailto:${business.email}`} className="text-yellow-400">{business.email}</a>
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-base font-bold text-white">Servicios</h3>
          <ul className="space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/servicios/${s.slug}`} className="hover:text-yellow-400">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-base font-bold text-white">Zonas de servicio</h3>
          <ul className="space-y-2 text-sm">
            {localities.map((l) => (
              <li key={l.slug}>
                <Link href={`/electricista-${l.slug}`} className="hover:text-yellow-400">
                  Electricista en {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-base font-bold text-white">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/aviso-legal" className="hover:text-yellow-400">
                Aviso legal
              </Link>
            </li>
            <li>
              <Link href="/politica-privacidad" className="hover:text-yellow-400">
                Política de privacidad
              </Link>
            </li>
            <li>
              <Link href="/politica-cookies" className="hover:text-yellow-400">
                Política de cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {business.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
