import Link from "next/link";
import { business, telLink, waLink } from "@/lib/business";
import { services } from "@/lib/services";
import { localities } from "@/lib/localities";
import { guides } from "@/lib/guides";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-neutral-950 text-white/60">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:px-6 sm:grid-cols-2 md:grid-cols-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-electric-400 text-neutral-950">
              <i className="ri-flashlight-fill text-xs" aria-hidden="true"></i>
            </span>
            <span className="font-display text-base font-extrabold tracking-tight text-white">
              {business.shortName.toUpperCase()}
            </span>
          </div>
          <p className="mt-4 text-sm">
            {business.address.street}
            <br />
            {business.address.postalCode} {business.address.city}, {business.address.region}
          </p>
          <p className="mt-3 text-sm">
            <a href={telLink()} className="font-semibold text-electric-400 hover:text-electric-300">
              {business.phoneDisplay}
            </a>
          </p>
          <p className="text-sm">
            <a
              href={waLink("Hola, quería consultar sobre un servicio eléctrico.")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-electric-400 hover:text-electric-300"
            >
              Escribir por WhatsApp
            </a>
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-white/40">Servicios</h3>
          <ul className="space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/servicios/${s.slug}`} className="hover:text-electric-400 transition-colors duration-200">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-white/40">Zonas de servicio</h3>
          <ul className="space-y-2 text-sm">
            {localities.map((l) => (
              <li key={l.slug}>
                <Link href={`/electricista-${l.slug}`} className="hover:text-electric-400 transition-colors duration-200">
                  Electricista en {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-white/40">Guías</h3>
          <ul className="space-y-2 text-sm">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link href={`/guias/${g.slug}`} className="hover:text-electric-400 transition-colors duration-200">
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-white/40">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/aviso-legal" className="hover:text-electric-400 transition-colors duration-200">
                Aviso legal
              </Link>
            </li>
            <li>
              <Link href="/politica-privacidad" className="hover:text-electric-400 transition-colors duration-200">
                Política de privacidad
              </Link>
            </li>
            <li>
              <Link href="/politica-cookies" className="hover:text-electric-400 transition-colors duration-200">
                Política de cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/[0.06] py-4 text-center text-xs text-white/30">
        © {new Date().getFullYear()} {business.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
