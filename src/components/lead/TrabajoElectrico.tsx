"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TRABAJO_AVAILABILITY, TRABAJO_CATEGORIES, type AvailabilityOption, type TrabajoCategory } from "@/lib/diagnostico";
import {
  buildBudgetWhatsAppMessage,
  formatFechaHora,
  generarIdAviso,
  isValidPhone,
  type BudgetData,
} from "@/lib/leadConfig";
import { enviarAvisoEmail } from "@/lib/sendLead";
import { business, telLink, waLink } from "@/lib/business";
import { trackFormSubmit, trackWhatsAppClick } from "@/lib/tracking";
import TurnstileWidget from "./TurnstileWidget";

type Stage = "categorias" | "formulario" | "detalles" | "enviado";

const stepVariants = {
  enter: { opacity: 0, x: 16 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -16 },
};

function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="mb-5 flex items-center gap-4">
      <div
        className="h-[3px] flex-1 overflow-hidden rounded-full bg-neutral-200"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-label="Progreso de la solicitud"
      >
        <motion.div
          className="h-full rounded-full bg-electric-400"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <span className="whitespace-nowrap text-xs font-bold uppercase tracking-wider text-neutral-400">
        Paso {step} de {total}
      </span>
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-neutral-300 bg-white px-4 py-3.5 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-electric-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-400 transition-colors duration-200";
const labelCls = "mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-neutral-500";

function BackLink({ onClick, label = "Atrás" }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-5 flex items-center gap-1.5 text-sm font-semibold text-neutral-500 transition-colors duration-200 hover:text-electric-600 cursor-pointer"
    >
      <i className="ri-arrow-left-line" aria-hidden="true"></i> {label}
    </button>
  );
}

export default function TrabajoElectrico({ onExit }: { onExit: () => void }) {
  const [stage, setStage] = useState<Stage>("categorias");
  const [category, setCategory] = useState<TrabajoCategory | null>(null);
  const [municipio, setMunicipio] = useState("");
  const [phone, setPhone] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [address, setAddress] = useState("");
  const [availability, setAvailability] = useState<AvailabilityOption | null>(null);
  const [detallesError, setDetallesError] = useState("");
  const [hp, setHp] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [refId, setRefId] = useState("");
  const [emailOk, setEmailOk] = useState(false);

  const chooseCategory = (c: TrabajoCategory) => {
    setCategory(c);
    setTimeout(() => setStage("formulario"), 150);
  };

  const continueToDetalles = () => {
    if (!municipio.trim()) return setError("Indica tu municipio.");
    if (!isValidPhone(phone)) return setError("Revisa el teléfono (9 dígitos, p. ej. 600 00 00 00).");
    setError("");
    setStage("detalles");
  };

  const submit = async () => {
    if (!address.trim()) return setDetallesError("Indica la dirección donde necesitas el servicio.");
    if (!availability) return setDetallesError("Indica cuándo te viene bien.");
    setDetallesError("");

    const data: BudgetData = {
      workType: category?.label ?? "Trabajo eléctrico",
      description: mensaje.trim(),
      propertyType: "",
      address: address.trim(),
      locality: municipio.trim(),
      postalCode: "",
      whenApprox: availability.label,
      name: "",
      phone: phone.trim(),
      email: "",
    };

    const id = generarIdAviso("BUD");
    const msg = buildBudgetWhatsAppMessage(data, id, formatFechaHora(), false);

    setSending(true);
    trackFormSubmit("diagnostico_trabajo");
    trackWhatsAppClick("diagnostico_trabajo");
    window.open(waLink(msg), "_blank", "noopener,noreferrer");

    const res = await enviarAvisoEmail({
      kind: "presupuesto",
      avisoId: id,
      data,
      hp,
      turnstileToken: turnstileToken || undefined,
    });
    setSending(false);
    setRefId(id);
    setEmailOk(res.ok);
    setStage("enviado");
  };

  const resetAll = () => {
    setStage("categorias");
    setCategory(null);
    setMunicipio("");
    setPhone("");
    setMensaje("");
    setAddress("");
    setAvailability(null);
    setDetallesError("");
    setError("");
    setRefId("");
  };

  const stepNumber = stage === "formulario" ? 1 : stage === "detalles" ? 2 : 1;

  return (
    <div>
      {(stage === "formulario" || stage === "detalles") && <ProgressBar step={stepNumber} total={2} />}
      <AnimatePresence mode="wait">
        {stage === "categorias" && (
          <motion.div
            key="categorias"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            <BackLink onClick={onExit} label="Volver" />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-electric-600">
              Trabajo eléctrico
            </span>
            <h3 className="font-display mt-2 text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-900">
              ¿Qué tipo de trabajo necesitas?
            </h3>
            <p className="mt-2 text-sm md:text-base text-neutral-600">Elige la categoría más parecida.</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {TRABAJO_CATEGORIES.map((c) => (
                <motion.button
                  key={c.id}
                  type="button"
                  onClick={() => chooseCategory(c)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-3 py-6 text-center shadow-sm transition-colors duration-200 hover:border-electric-400/60 hover:bg-electric-50/40 cursor-pointer"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-electric-100 text-2xl text-electric-600 transition-colors duration-200 group-hover:bg-electric-400 group-hover:text-neutral-950">
                    <i className={c.icon} aria-hidden="true"></i>
                  </span>
                  <span className="text-[13px] font-bold leading-snug text-neutral-800">{c.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {stage === "formulario" && category && (
          <motion.div
            key="formulario"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            <BackLink onClick={() => setStage("categorias")} />
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-electric-100 px-3 py-1.5 text-xs font-bold text-electric-700">
              <i className={category.icon} aria-hidden="true"></i> {category.label}
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-900">
              Solo 3 datos y listo
            </h3>
            <p className="mt-2 text-sm md:text-base text-neutral-600">
              Te contactamos con información y precio, sin compromiso.
            </p>

            <div className="mt-6 flex flex-col gap-5">
              <div>
                <label htmlFor="trabajo-municipio" className={labelCls}>
                  📍 Municipio *
                </label>
                <input
                  id="trabajo-municipio"
                  value={municipio}
                  onChange={(e) => setMunicipio(e.target.value)}
                  placeholder="Ej. Barakaldo"
                  autoComplete="address-level2"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="trabajo-telefono" className={labelCls}>
                  📞 Teléfono *
                </label>
                <input
                  id="trabajo-telefono"
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ej. 600 00 00 00"
                  autoComplete="tel"
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor="trabajo-mensaje" className={labelCls}>
                  📝 Cuéntanos brevemente qué necesitas{" "}
                  <span className="font-normal normal-case text-neutral-400">(opcional)</span>
                </label>
                <textarea
                  id="trabajo-mensaje"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value.slice(0, 500))}
                  rows={4}
                  maxLength={500}
                  placeholder="Ej. Quiero cambiar el cuadro eléctrico de una vivienda de 80 m²…"
                  className="w-full resize-none rounded-md border border-neutral-300 bg-white px-4 py-3.5 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-electric-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-400"
                ></textarea>
              </div>

              {error && (
                <p className="flex items-center gap-2 text-sm font-semibold text-red-600" role="alert">
                  <i className="ri-error-warning-line" aria-hidden="true"></i> {error}
                </p>
              )}

              <button
                type="button"
                onClick={continueToDetalles}
                className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-electric-400 px-7 py-4 text-base font-extrabold text-neutral-950 transition-all duration-200 hover:bg-electric-300 cursor-pointer"
              >
                Continuar <i className="ri-arrow-right-line text-lg" aria-hidden="true"></i>
              </button>
            </div>
          </motion.div>
        )}

        {stage === "detalles" && category && (
          <motion.div
            key="detalles"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            <BackLink onClick={() => setStage("formulario")} />
            <h3 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-900">
              ¿Dónde y cuándo?
            </h3>
            <p className="mt-2 text-sm md:text-base text-neutral-600">
              El último paso: la dirección exacta y cuándo te viene bien.
            </p>

            <div className="mt-6 flex flex-col gap-5">
              <div>
                <label htmlFor="trabajo-direccion" className={labelCls}>
                  📍 Dirección *
                </label>
                <input
                  id="trabajo-direccion"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Calle y número"
                  autoComplete="street-address"
                  className={inputCls}
                />
              </div>

              <div>
                <p className={labelCls}>🗓️ ¿Cuándo te viene bien? *</p>
                <div className="flex flex-wrap gap-2">
                  {TRABAJO_AVAILABILITY.map((opt) => {
                    const active = availability?.id === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setAvailability(opt)}
                        aria-pressed={active}
                        className={`whitespace-nowrap rounded-md border px-3 py-2.5 text-sm font-bold transition-all duration-200 cursor-pointer ${
                          active
                            ? "border-electric-500/60 bg-electric-400 text-neutral-950"
                            : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {detallesError && (
                <p className="flex items-center gap-2 text-sm font-semibold text-red-600" role="alert">
                  <i className="ri-error-warning-line" aria-hidden="true"></i> {detallesError}
                </p>
              )}

              <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="trabajo-website">No rellenar este campo</label>
                <input
                  id="trabajo-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                />
              </div>

              <TurnstileWidget onToken={setTurnstileToken} />

              <button
                type="button"
                onClick={submit}
                disabled={sending}
                className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-electric-400 px-7 py-4 text-base font-extrabold text-neutral-950 transition-all duration-200 hover:bg-electric-300 cursor-pointer disabled:opacity-60"
              >
                {sending ? (
                  <>
                    <i className="ri-loader-4-line animate-spin text-lg" aria-hidden="true"></i> Enviando…
                  </>
                ) : (
                  <>
                    <i className="ri-rocket-2-line text-lg" aria-hidden="true"></i> SOLICITAR INFORMACIÓN
                  </>
                )}
              </button>
              <p className="text-center text-xs text-neutral-400">
                Al enviar aceptas nuestra{" "}
                <Link href="/politica-privacidad" className="font-semibold text-electric-600 hover:underline">
                  Política de Privacidad
                </Link>
                . También puedes{" "}
                <a href={telLink()} className="font-semibold text-electric-600">
                  llamarnos al {business.phoneDisplay}
                </a>
                .
              </p>
            </div>
          </motion.div>
        )}

        {stage === "enviado" && (
          <motion.div
            key="enviado"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm md:p-12"
          >
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-electric-100">
              <i className="ri-check-line text-3xl text-electric-600" aria-hidden="true"></i>
            </span>
            <h3 className="font-display mt-5 text-2xl md:text-3xl font-extrabold text-neutral-900">
              Solicitud enviada
            </h3>
            <p className="mx-auto mt-3 max-w-md text-base text-neutral-600 leading-relaxed">
              Tu solicitud <span className="font-bold text-electric-600">{refId}</span> se ha enviado por WhatsApp.
              Te contactamos con información y precio, sin compromiso.
            </p>
            {!emailOk && (
              <p className="mx-auto mt-4 max-w-md rounded-md border border-neutral-200 bg-cloud px-4 py-3 text-sm text-neutral-500">
                <i className="ri-information-line" aria-hidden="true"></i> La notificación interna por email no ha
                llegado; tu solicitud ya nos ha llegado por WhatsApp igualmente.
              </p>
            )}
            <button
              type="button"
              onClick={resetAll}
              className="mt-7 inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-neutral-300 px-7 py-3.5 text-[15px] font-bold text-neutral-800 transition-all duration-200 hover:bg-neutral-100 cursor-pointer"
            >
              <i className="ri-add-line text-lg" aria-hidden="true"></i> Nueva solicitud
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
