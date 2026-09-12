import Image from "next/image";
import Link from "next/link";
import { WHATSAPP_GREETING_GENERAL, business, telLink, waLink } from "@/lib/business";
import { services } from "@/lib/services";
import { localities } from "@/lib/localities";
import { guides } from "@/lib/guides";

export default function Footer() {
  return (
    <footer className="bg-carbon text-white/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:px-6 md:py-16 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5">
            <Image
              src="/images/logo-mark.png"
              alt={`${business.name} - logo`}
              width={32}
              height={32}
              className="h-8 w-8 shrink-0"
            />
            <span className="font-display text-base font-extrabold tracking-tight text-white">
              {business.shortName.toUpperCase()}
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed">
            Electricista de confianza en Barakaldo y en toda Euskadi, disponible las 24 horas.
          </p>
          <p className="mt-4 text-sm">
            {business.address.street}
            <br />
            {business.address.postalCode} {business.address.city}, {business.address.region}
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={telLink()}
              aria-label="Llamar"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-electric-400 hover:text-electric-400"
            >
              <i className="ri-phone-line" aria-hidden="true"></i>
            </a>
            <a
              href={waLink(WHATSAPP_GREETING_GENERAL)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-whatsapp hover:text-whatsapp"
            >
              <i className="ri-whatsapp-line" aria-hidden="true"></i>
            </a>
            {business.socials.instagram && (
              <a
                href={business.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-electric-400 hover:text-electric-400"
              >
                <i className="ri-instagram-line" aria-hidden="true"></i>
              </a>
            )}
            {business.socials.facebook && (
              <a
                href={business.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-electric-400 hover:text-electric-400"
              >
                <i className="ri-facebook-fill" aria-hidden="true"></i>
              </a>
            )}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-white/35">Servicios</h3>
          <ul className="space-y-2.5 text-sm">
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
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-white/35">Zonas de servicio</h3>
          <ul className="space-y-2.5 text-sm">
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
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-white/35">Guías</h3>
          <ul className="space-y-2.5 text-sm">
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
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-white/35">Contacto y legal</h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href={telLink()} className="font-semibold text-white hover:text-electric-400">
                {business.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="hover:text-electric-400 transition-colors duration-200">
                {business.email}
              </a>
            </li>
            <li className="pt-2">
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
      <div className="border-t border-white/[0.08] py-5 text-center text-xs text-white/35">
        © {new Date().getFullYear()} {business.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
