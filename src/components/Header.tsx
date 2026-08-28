import Link from "next/link";
import { business, telLink } from "@/lib/business";
import { services } from "@/lib/services";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-yellow-400 text-slate-900">
            ⚡
          </span>
          <span>
            {business.shortName}
            <span className="hidden font-normal text-slate-300 sm:inline"> Instalaciones Eléctricas</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-200 md:flex">
          <div className="group relative">
            <span className="cursor-default">Servicios</span>
            <div className="invisible absolute left-0 top-full z-10 w-64 rounded-md border border-slate-700 bg-slate-900 p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/servicios/${s.slug}`}
                  className="block rounded px-3 py-2 hover:bg-slate-800"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/electricista-barakaldo" className="hover:text-yellow-400">
            Zonas
          </Link>
          <Link href="/contacto" className="hover:text-yellow-400">
            Contacto
          </Link>
        </nav>

        <a
          href={telLink()}
          className="hidden rounded-md bg-yellow-400 px-4 py-2 text-sm font-bold text-slate-900 hover:bg-yellow-300 sm:block"
        >
          Llamar ahora: {business.phoneDisplay}
        </a>
      </div>
    </header>
  );
}
