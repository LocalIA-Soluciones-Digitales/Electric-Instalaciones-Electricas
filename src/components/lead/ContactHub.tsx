"use client";

import { useEffect, useState } from "react";
import SolicitudWizard from "./SolicitudWizard";
import PresupuestoForm from "./PresupuestoForm";

type Tab = "urgente" | "presupuesto";

const OPTIONS: { id: Tab; hash: string; icon: string; title: string; desc: string }[] = [
  {
    id: "urgente",
    hash: "solicitud",
    icon: "ri-flashlight-line",
    title: "Estoy teniendo una avería",
    desc: "Cuéntanos qué ocurre en pocos pasos y te atendemos cuanto antes.",
  },
  {
    id: "presupuesto",
    hash: "presupuesto",
    icon: "ri-price-tag-3-line",
    title: "Quiero un presupuesto",
    desc: "Tienes un trabajo eléctrico en mente y quieres saber el precio.",
  },
];

// Ambas rutas (SolicitudWizard y PresupuestoForm) viven en la misma página y
// solían mostrarse una debajo de otra: dos formularios largos y muy parecidos
// resultaban confusos. Aquí se elige uno u otro, manteniendo los mismos
// anclajes #solicitud / #presupuesto que ya usan otros enlaces del sitio.
export default function ContactHub() {
  const [tab, setTab] = useState<Tab>("urgente");

  useEffect(() => {
    const syncWithHash = () => {
      const hash = window.location.hash.replace("#", "");
      const match = OPTIONS.find((o) => o.hash === hash);
      if (!match) return;
      setTab(match.id);
      requestAnimationFrame(() => {
        document.getElementById(match.hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };
    syncWithHash();
    window.addEventListener("hashchange", syncWithHash);
    return () => window.removeEventListener("hashchange", syncWithHash);
  }, []);

  return (
    <>
      <section id="contacto-hub" className="border-t border-white/10 bg-ink py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-4 text-center md:px-6">
          <div className="inline-flex items-center gap-2">
            <span className="h-px w-5 bg-electric-400"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-electric-400">
              Contacto
            </span>
            <span className="h-px w-5 bg-electric-400"></span>
          </div>
          <h2 className="font-display mt-4 text-2xl md:text-4xl font-extrabold tracking-tight text-offwhite">
            Cuéntanos qué necesitas.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm md:text-lg text-white/55 leading-relaxed">
            Elige la opción que mejor se ajuste y te guiamos en unos pocos pasos.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
            {OPTIONS.map((o) => {
              const active = tab === o.id;
              return (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setTab(o.id)}
                  aria-pressed={active}
                  className={`flex flex-col gap-3 rounded-lg border p-5 text-left transition-all duration-200 cursor-pointer ${
                    active
                      ? "border-electric-400/50 bg-electric-400/10 ring-1 ring-electric-400/30"
                      : "border-white/10 bg-carbon hover:border-electric-400/30 hover:bg-white/5"
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-lg text-xl transition-colors duration-200 ${
                      active ? "bg-electric-400 text-neutral-950" : "bg-white/5 text-electric-400"
                    }`}
                  >
                    <i className={o.icon} aria-hidden="true"></i>
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-offwhite">{o.title}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-white/50">{o.desc}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {tab === "urgente" ? <SolicitudWizard /> : <PresupuestoForm />}
    </>
  );
}
