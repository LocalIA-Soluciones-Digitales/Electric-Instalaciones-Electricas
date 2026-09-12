"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { WHATSAPP_GREETING_URGENT, business, telLink, waLink } from "@/lib/business";
import { services } from "@/lib/services";
import { trackCallClick, trackWhatsAppClick } from "@/lib/tracking";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      const original = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = original;
      };
    } else {
      setMobileServicesOpen(false);
    }
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-neutral-200 bg-white/85 shadow-[0_1px_0_0_rgba(0,0,0,0.04)] backdrop-blur-md"
          : "bg-white/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 leading-none group"
          onClick={() => {
            setOpen(false);
            if (pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Image
            src="/images/logo-mark.png"
            alt={`${business.name} - logo`}
            width={40}
            height={40}
            priority
            className="h-9 w-9 md:h-10 md:w-10 shrink-0 group-hover:scale-105 transition-transform duration-200"
          />
          <div className="flex flex-col items-start">
            <span className="font-display text-lg md:text-xl font-extrabold tracking-tight text-neutral-900">
              {business.shortName.toUpperCase()}
            </span>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.1em] sm:tracking-[0.15em] text-neutral-400 leading-none mt-0.5 whitespace-nowrap">
              Instalaciones Eléctricas
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          <div
            className="relative py-2"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
            onFocus={() => setServicesOpen(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setServicesOpen(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") setServicesOpen(false);
            }}
          >
            <button
              type="button"
              onClick={() => setServicesOpen((v) => !v)}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              className="text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors duration-200 cursor-pointer"
            >
              Servicios
            </button>
            <div
              className={`absolute left-0 top-full z-10 w-72 rounded-xl border border-neutral-200 bg-white p-2 shadow-xl shadow-neutral-900/[0.06] transition duration-200 ${
                servicesOpen ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-1"
              }`}
            >
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/servicios/${s.slug}`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-neutral-700 hover:bg-electric-50 hover:text-electric-700"
                >
                  <i className={`${s.icon} text-electric-500`} aria-hidden="true"></i>
                  {s.navLabel ?? s.name}
                </Link>
              ))}
            </div>
          </div>
          <Link
            href="/electricista-barakaldo"
            className="text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
          >
            Zonas
          </Link>
          <Link href="/guias" className="text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors duration-200">
            Guías
          </Link>
          <Link
            href="/contacto"
            className="text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
          >
            Contacto
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={waLink(WHATSAPP_GREETING_URGENT)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("header")}
            className="flex items-center gap-2 whitespace-nowrap rounded-full border border-whatsapp/25 bg-whatsapp/10 px-4 py-2 text-sm font-bold text-whatsapp-600 transition-colors duration-200 hover:bg-whatsapp/15"
          >
            <i className="ri-whatsapp-line text-base" aria-hidden="true"></i>
            WhatsApp
          </a>
          <a
            href={telLink()}
            onClick={() => trackCallClick("header")}
            className="flex items-center gap-2 whitespace-nowrap rounded-full bg-electric-400 px-4 py-2 text-sm font-bold text-neutral-950 shadow-sm shadow-electric-400/30 hover:bg-electric-300 transition-colors duration-200"
          >
            <i className="ri-phone-line text-base" aria-hidden="true"></i>
            {business.phoneDisplay}
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={telLink()}
            onClick={() => trackCallClick("header_mobile")}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-electric-400 text-neutral-950"
            aria-label="Llamar"
          >
            <i className="ri-phone-line text-base" aria-hidden="true"></i>
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100"
            aria-label="Menú"
            aria-expanded={open}
          >
            <i className={`${open ? "ri-close-line" : "ri-menu-line"} text-xl`} aria-hidden="true"></i>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden border-t border-neutral-200 bg-white/95 backdrop-blur-md"
          >
            <div className="px-4 py-5">
              <nav className="flex flex-col gap-4">
                <div>
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    aria-expanded={mobileServicesOpen}
                    className="flex w-full items-center justify-between text-sm font-semibold text-neutral-800"
                  >
                    Servicios
                    <i
                      className={`ri-arrow-down-s-line text-lg text-neutral-400 transition-transform duration-200 ${
                        mobileServicesOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    ></i>
                  </button>
                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-3 pt-3 pl-1">
                          {services.map((s) => (
                            <Link
                              key={s.slug}
                              href={`/servicios/${s.slug}`}
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-2.5 text-sm font-semibold text-neutral-700 hover:text-electric-600"
                            >
                              <i className={`${s.icon} text-electric-500`} aria-hidden="true"></i>
                              {s.navLabel ?? s.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="border-t border-neutral-200 pt-4 flex flex-col gap-4">
                  <Link href="/electricista-barakaldo" onClick={() => setOpen(false)} className="text-sm font-semibold text-neutral-800">
                    Zonas donde trabajamos
                  </Link>
                  <Link href="/guias" onClick={() => setOpen(false)} className="text-sm font-semibold text-neutral-800">
                    Guías
                  </Link>
                  <Link href="/contacto" onClick={() => setOpen(false)} className="text-sm font-semibold text-neutral-800">
                    Contacto
                  </Link>
                </div>
                <div className="border-t border-neutral-200 pt-4 flex flex-col gap-3">
                  <a
                    href={waLink(WHATSAPP_GREETING_URGENT)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick("header_mobile_menu")}
                    className="flex items-center gap-2 text-sm font-semibold text-whatsapp-600"
                  >
                    <i className="ri-whatsapp-line" aria-hidden="true"></i>
                    WhatsApp
                  </a>
                  <a
                    href={telLink()}
                    onClick={() => trackCallClick("header_mobile_menu")}
                    className="flex items-center gap-2 text-sm font-bold text-neutral-900"
                  >
                    <i className="ri-phone-line" aria-hidden="true"></i>
                    {business.phoneDisplay}
                  </a>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
