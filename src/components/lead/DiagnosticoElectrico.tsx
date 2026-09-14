"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AveriaDiagnostico from "./AveriaDiagnostico";
import TrabajoElectrico from "./TrabajoElectrico";

type View = "inicio" | "averia" | "trabajo";

const TRUST_ITEMS = [
  { icon: "ri-time-line", label: "Servicio 24 horas" },
  { icon: "ri-map-pin-2-line", label: "Atención en Euskadi" },
  { icon: "ri-shield-check-line", label: "Electricistas cualificados" },
  { icon: "ri-price-tag-3-line", label: "Presupuesto sin compromiso" },
  { icon: "ri-flashlight-line", label: "Respuesta rápida" },
];

function TrustStrip() {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-neutral-200 pt-6">
      {TRUST_ITEMS.map((t) => (
        <span key={t.label} className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500">
          <i className={`${t.icon} text-electric-500`} aria-hidden="true"></i> {t.label}
        </span>
      ))}
    </div>
  );
}

function IntroCard({
  tone,
  badge,
  icon,
  title,
  desc,
  cta,
  ctaIcon,
  onClick,
}: {
  tone: "danger" | "brand";
  badge: string;
  icon: string;
  title: string;
  desc: string;
  cta: string;
  ctaIcon: string;
  onClick: () => void;
}) {
  const danger = tone === "danger";
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      className={`group relative flex h-full flex-col items-start overflow-hidden rounded-3xl border p-7 text-left shadow-sm transition-all duration-300 cursor-pointer md:p-9 ${
        danger
          ? "border-neutral-900 bg-neutral-950 hover:shadow-xl hover:shadow-neutral-900/20"
          : "border-electric-400/40 bg-white hover:border-electric-400 hover:shadow-xl hover:shadow-electric-400/15"
      }`}
    >
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] ${
          danger ? "bg-red-600 text-white" : "bg-electric-400 text-neutral-950"
        }`}
      >
        {badge}
      </span>

      <span
        className={`mt-6 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl transition-transform duration-300 group-hover:scale-105 ${
          danger ? "bg-white/10 text-red-400" : "bg-electric-100 text-electric-600"
        }`}
      >
        <i className={icon} aria-hidden="true"></i>
      </span>

      <h3
        className={`font-display mt-6 text-2xl font-extrabold tracking-tight md:text-[28px] ${
          danger ? "text-white" : "text-neutral-900"
        }`}
      >
        {title}
      </h3>
      <p className={`mt-3 text-[15px] leading-relaxed ${danger ? "text-white/60" : "text-neutral-500"}`}>{desc}</p>

      <span
        className={`mt-7 inline-flex items-center gap-2 whitespace-nowrap rounded-full px-6 py-3.5 text-sm font-extrabold transition-colors duration-200 ${
          danger
            ? "bg-electric-400 text-neutral-950 group-hover:bg-electric-300"
            : "bg-neutral-950 text-electric-400 group-hover:bg-neutral-800"
        }`}
      >
        {cta} <i className={ctaIcon} aria-hidden="true"></i>
      </span>

      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-100 ${
          danger ? "bg-red-600/20 opacity-60" : "bg-electric-400/25 opacity-0"
        }`}
      ></span>
    </motion.button>
  );
}

export default function DiagnosticoElectrico() {
  const [view, setView] = useState<View>("inicio");

  useEffect(() => {
    const syncWithHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "solicitud") setView("averia");
      else if (hash === "presupuesto") setView("trabajo");
      if (hash === "solicitud" || hash === "presupuesto" || hash === "diagnostico") {
        requestAnimationFrame(() => {
          document.getElementById("diagnostico")?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    };
    syncWithHash();
    window.addEventListener("hashchange", syncWithHash);
    return () => window.removeEventListener("hashchange", syncWithHash);
  }, []);

  return (
    <section id="solicitud" aria-label="Diagnóstico eléctrico inteligente" className="relative bg-cloud py-14 md:py-20">
      <div id="diagnostico" className="absolute -top-20" aria-hidden="true"></div>
      <div id="presupuesto" className="absolute -top-20" aria-hidden="true"></div>

      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-electric-400/40 bg-electric-400/10 px-4 py-1.5">
            <i className="ri-flashlight-fill text-electric-600" aria-hidden="true"></i>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-electric-700">
              Diagnóstico Eléctrico Inteligente
            </span>
          </div>
          <h2 className="font-display mx-auto mt-5 max-w-2xl text-3xl font-extrabold tracking-tight text-neutral-900 md:text-4xl">
            Identifica tu situación en menos de 30 segundos
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-neutral-600 md:text-lg">
            Te indicaremos la forma más rápida de ayudarte. Ya sea una avería urgente o un trabajo eléctrico
            planificado, te guiamos paso a paso.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-[28px] border border-neutral-200 bg-white/60 p-5 shadow-sm backdrop-blur-sm md:p-8">
          <AnimatePresence mode="wait">
            {view === "inicio" && (
              <motion.div
                key="inicio"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-center text-[11px] font-extrabold uppercase tracking-[0.2em] text-neutral-400">
                  ¿Qué necesitas?
                </p>
                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                  <IntroCard
                    tone="danger"
                    badge="Urgente"
                    icon="ri-alarm-warning-fill"
                    title="Tengo una avería"
                    desc="Sin luz, diferencial disparado, cortocircuitos o problemas eléctricos urgentes."
                    cta="Iniciar diagnóstico"
                    ctaIcon="ri-arrow-right-line"
                    onClick={() => setView("averia")}
                  />
                  <IntroCard
                    tone="brand"
                    badge="Sin urgencia"
                    icon="ri-file-list-3-fill"
                    title="Necesito un trabajo eléctrico"
                    desc="Instalaciones, reformas, cuadros eléctricos, iluminación o reparaciones."
                    cta="Solicitar información"
                    ctaIcon="ri-arrow-right-line"
                    onClick={() => setView("trabajo")}
                  />
                </div>
                <TrustStrip />
              </motion.div>
            )}

            {view === "averia" && (
              <motion.div
                key="averia"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <AveriaDiagnostico onExit={() => setView("inicio")} />
              </motion.div>
            )}

            {view === "trabajo" && (
              <motion.div
                key="trabajo"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <TrabajoElectrico onExit={() => setView("inicio")} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
