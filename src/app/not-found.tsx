import Link from "next/link";
import { business, telLink, waLink } from "@/lib/business";
import { services } from "@/lib/services";
import { localities } from "@/lib/localities";

export default function NotFound() {
  const topServices = services.slice(0, 4);
  const topLocalities = localities.filter((l) => l.isHome || l.slug === "bilbao" || l.slug === "getxo");

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center text-white md:px-6">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-electric-400">Error 404</p>
      <h1 className="font-display mt-3 text-3xl font-extrabold sm:text-4xl">
        Esta página no existe, pero seguimos aquí las 24 horas
      </h1>
      <p className="mt-4 text-white/60">
        El enlace que has seguido puede estar mal escrito o haber cambiado. Si necesitas un electricista
        ahora mismo, llámanos directamente.
      </p>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <a
          href={telLink()}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-electric-400 px-6 py-4 text-center text-lg font-extrabold text-neutral-950 hover:bg-electric-300"
        >
          <i className="ri-phone-line text-xl" aria-hidden="true"></i>
          Llamar: {business.phoneDisplay}
        </a>
        <a
          href={waLink("Hola, buscaba una página de vuestra web y no la he encontrado.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-[#25D366]/30 px-6 py-4 text-center text-lg font-bold text-[#25D366] hover:bg-[#25D366]/10"
        >
          <i className="ri-whatsapp-line text-xl" aria-hidden="true"></i>
          WhatsApp
        </a>
      </div>

      <div className="mt-14 text-left">
        <h2 className="font-display text-center text-lg font-bold text-white">Servicios más solicitados</h2>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {topServices.map((s) => (
            <Link
              key={s.slug}
              href={`/servicios/${s.slug}`}
              className="rounded-full border border-white/[0.1] px-5 py-2 text-sm font-semibold text-white/70 hover:border-electric-400/50 hover:text-electric-400"
            >
              {s.name}
            </Link>
          ))}
        </div>

        <h2 className="font-display mt-10 text-center text-lg font-bold text-white">Zonas donde trabajamos</h2>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {topLocalities.map((l) => (
            <Link
              key={l.slug}
              href={`/electricista-${l.slug}`}
              className="rounded-full border border-white/[0.1] px-5 py-2 text-sm font-semibold text-white/70 hover:border-electric-400/50 hover:text-electric-400"
            >
              Electricista en {l.name}
            </Link>
          ))}
          <Link
            href="/"
            className="rounded-full border border-electric-400/40 px-5 py-2 text-sm font-semibold text-electric-400 hover:bg-electric-400/10"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
