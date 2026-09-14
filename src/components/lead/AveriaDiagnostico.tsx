"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AVERIA_AVAILABILITY,
  AVERIA_OPTIONS,
  FOLLOW_UP,
  buildAveriaAvisoData,
  priorityMeta,
  type AvailabilityOption,
  type AveriaOption,
  type FollowUpOption,
  type Priority,
} from "@/lib/diagnostico";
import { formatFechaHora, generarIdAviso, isValidPhone, SERVICE_ELECTRIC, buildWhatsAppMessage } from "@/lib/leadConfig";
import { enviarAvisoEmail } from "@/lib/sendLead";
import { business, telLink, waLink } from "@/lib/business";
import { trackCallClick, trackFormSubmit, trackWhatsAppClick } from "@/lib/tracking";
import TurnstileWidget from "./TurnstileWidget";

type Stage = "q1" | "q2" | "danger" | "detalles" | "result";

const inputCls =
  "w-full rounded-md border border-neutral-300 bg-white px-4 py-3.5 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-electric-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-400 transition-colors duration-200";
const labelCls = "mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-neutral-500";

const stepVariants = {
  enter: { opacity: 0, x: 16 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -16 },
};

function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="flex items-center gap-4">
      <div
        className="h-[3px] flex-1 overflow-hidden rounded-full bg-neutral-200"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-label="Progreso del diagnóstico"
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

function OptionTile({
  icon,
  label,
  hint,
  danger,
  onClick,
}: {
  icon: string;
  label: string;
  hint?: string;
  danger?: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative flex flex-col items-start gap-3 rounded-2xl border p-5 text-left shadow-sm transition-colors duration-200 cursor-pointer md:p-6 ${
        danger
          ? "border-red-200 bg-red-50/60 hover:border-red-300 hover:bg-red-50"
          : "border-neutral-200 bg-white hover:border-electric-400/60 hover:bg-electric-50/40"
      }`}
    >
      {danger && (
        <span className="absolute right-3 top-3 rounded-full bg-red-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
          Urgente
        </span>
      )}
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl transition-colors duration-200 ${
          danger
            ? "bg-red-100 text-red-600"
            : "bg-electric-100 text-electric-600 group-hover:bg-electric-400 group-hover:text-neutral-950"
        }`}
      >
        <i className={icon} aria-hidden="true"></i>
      </span>
      <span>
        <span className="block text-[15px] font-bold leading-snug text-neutral-900">{label}</span>
        {hint && <span className="mt-0.5 block text-xs leading-snug text-neutral-500">{hint}</span>}
      </span>
    </motion.button>
  );
}

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

function ServiceBadge() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl border border-neutral-200 bg-cloud px-4 py-3 text-xs font-bold text-neutral-600">
      <span className="inline-flex items-center gap-1.5">
        <i className="ri-flashlight-fill text-electric-600" aria-hidden="true"></i> Servicio 24 horas
      </span>
      <span className="inline-flex items-center gap-1.5">
        <i className="ri-shield-check-line text-electric-600" aria-hidden="true"></i> Electricistas cualificados
      </span>
    </div>
  );
}

function PhoneCapture({
  phone,
  onPhone,
  hp,
  onHp,
  onToken,
}: {
  phone: string;
  onPhone: (v: string) => void;
  hp: string;
  onHp: (v: string) => void;
  onToken: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor="diag-telefono" className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-neutral-500">
        Tu teléfono <span className="font-normal normal-case text-neutral-400">(opcional, por si no ves el WhatsApp)</span>
      </label>
      <input
        id="diag-telefono"
        type="tel"
        inputMode="tel"
        value={phone}
        onChange={(e) => onPhone(e.target.value)}
        placeholder="Ej. 600 00 00 00"
        autoComplete="tel"
        className="w-full rounded-md border border-neutral-300 bg-white px-4 py-3.5 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-electric-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-400 transition-colors duration-200"
      />
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="diag-website">No rellenar este campo</label>
        <input
          id="diag-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={hp}
          onChange={(e) => onHp(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <TurnstileWidget onToken={onToken} />
      </div>
    </div>
  );
}

export default function AveriaDiagnostico({ onExit }: { onExit: () => void }) {
  const [stage, setStage] = useState<Stage>("q1");
  const [option, setOption] = useState<AveriaOption | null>(null);
  const [answer, setAnswer] = useState<FollowUpOption | null>(null);
  const [address, setAddress] = useState("");
  const [availability, setAvailability] = useState<AvailabilityOption | null>(null);
  const [detallesError, setDetallesError] = useState("");
  const [phone, setPhone] = useState("");
  const [hp, setHp] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [registered, setRegistered] = useState(false);

  const chooseOption = (opt: AveriaOption) => {
    setOption(opt);
    setAnswer(null);
    setTimeout(() => setStage(opt.danger ? "danger" : "q2"), 180);
  };

  const chooseAnswer = (opt: FollowUpOption) => {
    setAnswer(opt);
    setTimeout(() => setStage("detalles"), 180);
  };

  const confirmDetalles = () => {
    if (!address.trim()) return setDetallesError("Indica la dirección donde necesitas el servicio.");
    if (!availability) return setDetallesError("Indica cuándo te viene bien.");
    setDetallesError("");
    setStage("result");
  };

  const priority: Priority = answer?.priority ?? "media";
  const meta = priorityMeta(priority);
  const followUp = option ? FOLLOW_UP[option.id] : undefined;

  const source = stage === "danger" ? "diagnostico_riesgo" : "diagnostico_averia";

  const handleCall = () => {
    trackCallClick(source);
  };

  const handleWhatsApp = () => {
    trackWhatsAppClick(source);
    trackFormSubmit(source);

    const avisoId = generarIdAviso(SERVICE_ELECTRIC.code);
    const timestamp = formatFechaHora();
    const data = buildAveriaAvisoData({
      incidenceLabel:
        stage === "danger"
          ? "Riesgo eléctrico: huele a quemado o hay chispas"
          : option?.label ?? "Avería eléctrica",
      danger: stage === "danger",
      question: followUp?.question,
      answer: answer?.label,
      phone: phone.trim(),
      address,
      availability: availability?.label,
    });
    const msg = buildWhatsAppMessage(data, avisoId, timestamp, false);

    // Igual que en el resto del sitio: window.open debe llamarse de forma
    // síncrona dentro del gesto de clic, o el navegador bloquea el popup.
    window.open(waLink(msg), "_blank", "noopener,noreferrer");

    if (isValidPhone(phone)) {
      setRegistered(true);
      void enviarAvisoEmail({
        kind: "aviso",
        avisoId,
        data,
        hp,
        turnstileToken: turnstileToken || undefined,
      });
    }
  };

  const resetAll = () => {
    setStage("q1");
    setOption(null);
    setAnswer(null);
    setAddress("");
    setAvailability(null);
    setDetallesError("");
    setPhone("");
    setHp("");
    setRegistered(false);
  };

  const stepNumber = stage === "q1" ? 1 : stage === "q2" ? 2 : stage === "detalles" ? 3 : 4;

  return (
    <div>
      {stage !== "danger" && (
        <div className="mb-5">
          <ProgressBar step={stepNumber} total={4} />
        </div>
      )}

      <AnimatePresence mode="wait">
        {stage === "q1" && (
          <motion.div key="q1" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
            <BackLink onClick={onExit} label="Volver" />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-electric-600">Diagnóstico</span>
            <h3 className="font-display mt-2 text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-900">
              ¿Qué ocurre?
            </h3>
            <p className="mt-2 text-sm md:text-base text-neutral-600">
              Elige la opción que mejor lo describa. No hace falta que sepas el motivo.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {AVERIA_OPTIONS.map((opt) => (
                <OptionTile
                  key={opt.id}
                  icon={opt.icon}
                  label={opt.label}
                  hint={opt.hint}
                  danger={opt.danger}
                  onClick={() => chooseOption(opt)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {stage === "danger" && (
          <motion.div
            key="danger"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            <div className="overflow-hidden rounded-2xl border-2 border-red-200 bg-red-50 p-6 text-center md:p-9">
              <motion.span
                animate={{ boxShadow: ["0 0 0 0 rgba(220,38,38,0.35)", "0 0 0 14px rgba(220,38,38,0)"] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-3xl text-white"
              >
                <i className="ri-alarm-warning-fill" aria-hidden="true"></i>
              </motion.span>
              <h3 className="font-display mt-5 text-2xl md:text-3xl font-extrabold text-red-700">
                Posible riesgo eléctrico
              </h3>
              <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-red-800">
                Hemos detectado una incidencia que podría requerir atención inmediata.
              </p>
              <p className="mx-auto mt-1 max-w-md text-[15px] font-semibold leading-relaxed text-red-800">
                Recomendamos contactar directamente con un técnico y no manipular la instalación.
              </p>

              <div className="mx-auto mt-6 max-w-sm text-left">
                <PhoneCapture phone={phone} onPhone={setPhone} hp={hp} onHp={setHp} onToken={setTurnstileToken} />
              </div>

              <div className="mx-auto mt-6 flex max-w-sm flex-col gap-3">
                <a
                  href={telLink()}
                  onClick={handleCall}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-red-600 px-7 py-4 text-base font-extrabold text-white transition-colors duration-200 hover:bg-red-500 cursor-pointer"
                >
                  <i className="ri-phone-fill text-lg" aria-hidden="true"></i> LLAMAR AHORA: {business.phoneDisplay}
                </a>
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border-2 border-red-200 bg-white px-7 py-3.5 text-base font-bold text-red-700 transition-colors duration-200 hover:bg-red-100 cursor-pointer"
                >
                  <i className="ri-whatsapp-line text-lg" aria-hidden="true"></i> WHATSAPP
                </button>
              </div>
              {registered && (
                <p className="mx-auto mt-3 max-w-sm text-xs text-red-700/70">
                  <i className="ri-check-line" aria-hidden="true"></i> Hemos registrado tu aviso, aunque lo más rápido
                  ahora es llamar.
                </p>
              )}
              <p className="mx-auto mt-4 flex max-w-sm items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wide text-red-600">
                <i className="ri-time-line" aria-hidden="true"></i> Servicio 24 horas
              </p>
            </div>
          </motion.div>
        )}

        {stage === "q2" && option && followUp && (
          <motion.div key="q2" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
            <BackLink onClick={() => setStage("q1")} />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-electric-600">Paso 2</span>
            <h3 className="font-display mt-2 text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-900">
              {followUp.question}
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-3">
              {followUp.options.map((opt) => (
                <motion.button
                  key={opt.id}
                  type="button"
                  onClick={() => chooseAnswer(opt)}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.99 }}
                  className="group flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-5 py-4 text-left transition-colors duration-200 hover:border-electric-400/60 hover:bg-electric-50/40 cursor-pointer"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-electric-100 text-lg text-electric-600 transition-colors duration-200 group-hover:bg-electric-400 group-hover:text-neutral-950">
                    <i className={opt.icon} aria-hidden="true"></i>
                  </span>
                  <span className="flex-1 text-[15px] font-bold text-neutral-800">{opt.label}</span>
                  <i className="ri-arrow-right-s-line text-lg text-neutral-300 group-hover:text-electric-500" aria-hidden="true"></i>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {stage === "detalles" && option && (
          <motion.div key="detalles" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
            <BackLink onClick={() => setStage(followUp ? "q2" : "q1")} />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-electric-600">Paso 3</span>
            <h3 className="font-display mt-2 text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-900">
              ¿Dónde y cuándo?
            </h3>
            <p className="mt-2 text-sm md:text-base text-neutral-600">
              Para poder ayudarte, indícanos la dirección y cuándo te viene bien.
            </p>

            <div className="mt-6">
              <label htmlFor="diag-direccion" className={labelCls}>
                Dirección *
              </label>
              <input
                id="diag-direccion"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Calle, número y localidad"
                autoComplete="street-address"
                className={inputCls}
              />
            </div>

            <div className="mt-5">
              <p className={labelCls}>¿Cuándo te viene bien? *</p>
              <div className="grid grid-cols-1 gap-2.5">
                {AVERIA_AVAILABILITY.map((opt) => {
                  const active = availability?.id === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAvailability(opt)}
                      aria-pressed={active}
                      className={`flex items-center gap-3 rounded-lg border px-4 py-3.5 text-left transition-all duration-200 cursor-pointer ${
                        active
                          ? "border-electric-500/60 bg-electric-400/10"
                          : "border-neutral-200 bg-white hover:border-neutral-300"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                          active ? "border-electric-400 bg-electric-400" : "border-neutral-300"
                        }`}
                      >
                        {active && <i className="ri-check-line text-[11px] text-neutral-950" aria-hidden="true"></i>}
                      </span>
                      <span className="text-sm font-semibold text-neutral-900">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {detallesError && (
              <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-red-600" role="alert">
                <i className="ri-error-warning-line" aria-hidden="true"></i> {detallesError}
              </p>
            )}

            <button
              type="button"
              onClick={confirmDetalles}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-electric-400 px-7 py-4 text-base font-extrabold text-neutral-950 transition-all duration-200 hover:bg-electric-300 cursor-pointer"
            >
              Continuar <i className="ri-arrow-right-line text-lg" aria-hidden="true"></i>
            </button>
          </motion.div>
        )}

        {stage === "result" && option && (
          <motion.div key="result" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-md shadow-neutral-900/[0.04]">
              <div className="border-b border-neutral-100 bg-cloud px-6 py-5 md:px-8">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-electric-600">
                  Diagnóstico preliminar
                </span>
                <h3 className="font-display mt-1 text-xl md:text-2xl font-extrabold text-neutral-900">
                  Ya sabemos cómo ayudarte
                </h3>
              </div>

              <div className="grid grid-cols-1 divide-y divide-neutral-100 px-6 sm:grid-cols-2 sm:divide-x sm:divide-y-0 md:px-8">
                <div className="py-4 sm:pr-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-400">Tipo</p>
                  <p className="mt-1 text-sm font-bold text-neutral-900">Avería eléctrica</p>
                </div>
                <div className="py-4 sm:pl-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-400">Prioridad</p>
                  <span
                    className={`mt-1 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-extrabold ${meta.badge}`}
                  >
                    <i className="ri-flashlight-fill" aria-hidden="true"></i> {meta.label}
                  </span>
                </div>
                <div className="py-4 sm:pr-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-400">
                    Tiempo de atención
                  </p>
                  <p className="mt-1 text-sm font-bold text-neutral-900">{meta.time}</p>
                  <p className="text-[11px] text-neutral-400">Estimación orientativa</p>
                </div>
                <div className="py-4 sm:pl-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-400">Cobertura</p>
                  <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-electric-700">
                    <i className="ri-checkbox-circle-fill" aria-hidden="true"></i> Disponible en tu zona
                  </p>
                </div>
              </div>

              <div className="flex items-start justify-between gap-4 border-t border-neutral-100 px-6 py-4 md:px-8">
                <div className="min-w-0 text-sm text-neutral-600">
                  <p className="flex items-center gap-1.5 font-semibold text-neutral-900">
                    <i className="ri-map-pin-2-line text-electric-600" aria-hidden="true"></i> {address || "—"}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5">
                    <i className="ri-calendar-line text-electric-600" aria-hidden="true"></i>{" "}
                    {availability?.label || "—"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStage("detalles")}
                  aria-label="Modificar dirección y disponibilidad"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-neutral-200 text-neutral-500 transition-colors duration-200 hover:border-electric-400/60 hover:text-electric-600 cursor-pointer"
                >
                  <i className="ri-edit-line text-sm" aria-hidden="true"></i>
                </button>
              </div>

              <div className="border-t border-neutral-100 px-6 py-6 md:px-8">
                <PhoneCapture phone={phone} onPhone={setPhone} hp={hp} onHp={setHp} onToken={setTurnstileToken} />

                <div className="mt-5 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-whatsapp px-7 py-4 text-base font-extrabold text-neutral-950 transition-all duration-200 hover:bg-whatsapp-600 cursor-pointer"
                  >
                    <i className="ri-whatsapp-line text-lg" aria-hidden="true"></i> WHATSAPP
                  </button>
                  <a
                    href={telLink()}
                    onClick={handleCall}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-neutral-300 px-7 py-3.5 text-base font-bold text-neutral-800 transition-all duration-200 hover:bg-neutral-100 cursor-pointer"
                  >
                    <i className="ri-phone-line text-lg text-electric-600" aria-hidden="true"></i> LLAMAR AHORA:{" "}
                    {business.phoneDisplay}
                  </a>
                </div>
                {registered && (
                  <p className="mt-3 flex items-center gap-1.5 text-xs text-neutral-400">
                    <i className="ri-check-line text-electric-600" aria-hidden="true"></i> Hemos registrado tu
                    diagnóstico para atenderte mejor.
                  </p>
                )}

                <div className="mt-5">
                  <ServiceBadge />
                </div>

                <button
                  type="button"
                  onClick={resetAll}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-400 transition-colors duration-200 hover:text-electric-600 cursor-pointer"
                >
                  <i className="ri-restart-line" aria-hidden="true"></i> Empezar de nuevo
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
