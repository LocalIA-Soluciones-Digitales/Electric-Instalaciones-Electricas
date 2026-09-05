"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { business, telLink, waLink } from "@/lib/business";
import { services } from "@/lib/services";
import { trackCallClick, trackWhatsAppClick } from "@/lib/tracking";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-neutral-950/90 border-b border-white/[0.06] backdrop-blur-md" : "bg-neutral-950"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 leading-none group" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-electric-400 text-neutral-950 group-hover:scale-105 transition-transform duration-200">
            <i className="ri-flashlight-fill text-base" aria-hidden="true"></i>
          </span>
          <div className="flex flex-col items-start">
            <span className="font-display text-lg md:text-xl font-extrabold tracking-tight text-white">
              {business.shortName.toUpperCase()}
            </span>
            <span className="text-[9px] uppercase tracking-[0.15em] text-white/40 leading-none mt-0.5 hidden sm:block">
              Instalaciones Eléctricas
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          <div className="group relative py-2">
            <span className="text-sm font-semibold text-white/60 hover:text-white transition-colors duration-200 cursor-default">
              Servicios
            </span>
            <div className="invisible absolute left-0 top-full z-10 w-64 rounded-md border border-white/[0.08] bg-neutral-900 p-2 opacity-0 shadow-xl transition duration-200 group-hover:visible group-hover:opacity-100">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/servicios/${s.slug}`}
                  className="block rounded px-3 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-electric-400"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/electricista-barakaldo" className="text-sm font-semibold text-white/60 hover:text-white transition-colors duration-200">
            Zonas
          </Link>
          <Link href="/contacto" className="text-sm font-semibold text-white/60 hover:text-white transition-colors duration-200">
            Contacto
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          <a
            href={waLink("Hola, necesito un electricista. ¿Podéis ayudarme?")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("header")}
            className="text-sm font-semibold text-[#25D366] hover:text-[#34e07a] transition-colors duration-200"
          >
            WhatsApp
          </a>
          <a
            href={telLink()}
            onClick={() => trackCallClick("header")}
            className="flex items-center gap-2 whitespace-nowrap rounded-md bg-electric-400 px-4 py-2 text-sm font-bold text-neutral-950 hover:bg-electric-300 transition-colors duration-200"
          >
            <i className="ri-phone-line text-base" aria-hidden="true"></i>
            {business.phoneDisplay}
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={telLink()}
            onClick={() => trackCallClick("header_mobile")}
            className="flex h-9 w-9 items-center justify-center rounded-sm bg-electric-400 text-neutral-950"
            aria-label="Llamar"
          >
            <i className="ri-phone-line text-base" aria-hidden="true"></i>
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-sm text-white"
            aria-label="Menú"
            aria-expanded={open}
          >
            <i className={`${open ? "ri-close-line" : "ri-menu-line"} text-xl`} aria-hidden="true"></i>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/[0.06] bg-neutral-950/95 backdrop-blur-md px-4 py-5">
          <nav className="flex flex-col gap-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/40">Servicios</span>
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/servicios/${s.slug}`}
                onClick={() => setOpen(false)}
                className="text-sm font-semibold text-white/70 hover:text-electric-400"
              >
                {s.name}
              </Link>
            ))}
            <div className="border-t border-white/[0.06] pt-4 flex flex-col gap-4">
              <Link href="/electricista-barakaldo" onClick={() => setOpen(false)} className="text-sm font-semibold text-white/80">
                Zonas donde trabajamos
              </Link>
              <Link href="/contacto" onClick={() => setOpen(false)} className="text-sm font-semibold text-white/80">
                Contacto
              </Link>
            </div>
            <div className="border-t border-white/[0.06] pt-4 flex flex-col gap-3">
              <a
                href={waLink("Hola, necesito un electricista. ¿Podéis ayudarme?")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("header_mobile_menu")}
                className="flex items-center gap-2 text-sm font-semibold text-[#25D366]"
              >
                <i className="ri-whatsapp-line" aria-hidden="true"></i>
                WhatsApp
              </a>
              <a
                href={telLink()}
                onClick={() => trackCallClick("header_mobile_menu")}
                className="flex items-center gap-2 text-sm font-bold text-white"
              >
                <i className="ri-phone-line" aria-hidden="true"></i>
                {business.phoneDisplay}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
