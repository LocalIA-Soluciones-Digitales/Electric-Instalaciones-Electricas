"use client";

import { useState, type ReactNode } from "react";
import {
  INCIDENCE_GUIDE,
  INCIDENCES,
  PROPERTY_TYPES,
  SERVICE_ELECTRIC,
  SOFT_DIAGNOSIS_NOTE,
  URGENCY_OPTIONS,
  UNSURE_COMFORT,
  UNSURE_GUIDE,
  TIME_SLOTS,
  type AvisoData,
  type AvisoIncidence,
  type DiagnosisAnswer,
  type GuideQuestion,
} from "@/lib/leadConfig";
import ResumenEnvio from "./ResumenEnvio";
import GuidedQuestions from "./GuidedQuestions";
import PhotoPicker from "@/components/PhotoPicker";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { business, telLink } from "@/lib/business";
import { trackCallClick } from "@/lib/tracking";

export type AvisoStep = 1 | 2 | 3 | 4 | 5 | 6;
const TOTAL_STEPS = 6;

const inputCls =
  "w-full rounded-md border border-white/[0.1] bg-neutral-900/70 px-4 py-3.5 text-base md:text-[15px] text-white placeholder:text-white/30 focus:outline-none focus:border-electric-400/50 transition-colors duration-200";
const labelCls = "mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-white/50";

function guideFor(inc?: AvisoIncidence): GuideQuestion[] {
  if (!inc) return [];
  if (inc.unsure) return UNSURE_GUIDE;
  const one = INCIDENCE_GUIDE[inc.id];
  return one ? [one] : [];
}

const DANGER_INCIDENCES = INCIDENCES.filter((i) => i.danger);
const COMMON_INCIDENCES = INCIDENCES.filter((i) => !i.danger && !i.unsure && i.id !== "otro");
const FALLBACK_INCIDENCES = INCIDENCES.filter((i) => i.unsure || i.id === "otro");

function IncidenceTile({
  inc,
  active,
  onClick,
}: {
  inc: AvisoIncidence;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group relative flex flex-col items-center gap-2.5 rounded-xl border px-3 py-4 text-center transition-all duration-200 cursor-pointer ${
        active
          ? "border-electric-400/60 bg-electric-400/10"
          : inc.danger
          ? "border-red-900/30 bg-red-950/10 hover:border-red-600/50 hover:bg-red-950/20"
          : inc.unsure
          ? "border-dashed border-electric-400/40 hover:border-electric-400 hover:bg-electric-400/5"
          : "border-white/10 bg-white/[0.02] hover:border-electric-400/50 hover:bg-white/[0.04]"
      }`}
    >
      {inc.danger && (
        <span className="absolute right-2 top-2 rounded-full bg-red-600 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
          Urgente
        </span>
      )}
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-lg transition-colors duration-200 ${
          active
            ? "bg-electric-400 text-neutral-950"
            : inc.danger
            ? "bg-red-950/40 text-red-400"
            : "bg-electric-400/15 text-electric-400 group-hover:bg-electric-400 group-hover:text-neutral-950"
        }`}
      >
        <i className={inc.icon} aria-hidden="true"></i>
      </span>
      <span className="text-[13px] md:text-sm font-semibold leading-snug text-white/85 group-hover:text-white">
        {inc.label}
      </span>
    </button>
  );
}

function IncidenceSection({
  label,
  icon,
  labelClassName,
  items,
  columns,
  activeId,
  onChoose,
}: {
  label: string;
  icon?: string;
  labelClassName?: string;
  items: AvisoIncidence[];
  columns: string;
  activeId?: string;
  onChoose: (inc: AvisoIncidence) => void;
}) {
  return (
    <div>
      <p
        className={`mb-2.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] ${
          labelClassName ?? "text-white/40"
        }`}
      >
        {icon && <i className={icon} aria-hidden="true"></i>} {label}
      </p>
      <div className={`grid gap-2.5 ${columns}`}>
        {items.map((inc) => (
          <IncidenceTile key={inc.id} inc={inc} active={activeId === inc.id} onClick={() => onChoose(inc)} />
        ))}
      </div>
    </div>
  );
}

function StepLayout({
  eyebrow,
  title,
  subtitle,
  back,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  back?: () => void;
  children: ReactNode;
}) {
  return (
    <div>
      {back && (
        <button
          type="button"
          onClick={back}
          aria-label="Volver al paso anterior"
          className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white/45 transition-colors duration-200 hover:text-electric-400 cursor-pointer"
        >
          <i className="ri-arrow-left-line" aria-hidden="true"></i> Atrás
        </button>
      )}
      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-electric-400">{eyebrow}</span>
      <h3 className="font-display mt-2 text-xl md:text-2xl font-extrabold tracking-tight text-white">{title}</h3>
      <p className="mt-2 text-sm text-white/50">{subtitle}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function ContinueBar({
  onContinue,
  label = "Continuar",
  icon = "ri-arrow-right-line",
}: {
  onContinue: () => void;
  label?: string;
  icon?: string;
}) {
  return (
    <button
      type="button"
      onClick={onContinue}
      className="mt-7 inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-electric-400 px-7 py-4 text-base md:text-[15px] font-extrabold text-neutral-950 transition-all duration-200 hover:bg-electric-300 cursor-pointer"
    >
      {label} <i className={icon} aria-hidden="true"></i>
    </button>
  );
}

function DangerBanner() {
  return (
    <div className="rounded-lg border border-red-900/40 bg-red-950/20 p-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-600/20 text-red-400">
          <i className="ri-alert-line text-lg" aria-hidden="true"></i>
        </span>
        <p className="text-sm font-semibold leading-relaxed text-red-200">
          Si hay chispas, humo o riesgo eléctrico, no manipules la instalación y evita tocar elementos
          eléctricos. Aléjate de la zona y avísanos cuanto antes.
        </p>
      </div>
      <a
        href={telLink()}
        onClick={() => trackCallClick("wizard_danger_banner")}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-red-600 px-6 py-3.5 text-[15px] font-extrabold text-white transition-colors duration-200 hover:bg-red-500 cursor-pointer"
      >
        <i className="ri-phone-line text-lg" aria-hidden="true"></i>
        LLAMAR AHORA: {business.phoneDisplay}
      </a>
      <p className="mt-2 text-center text-xs text-red-200/60">
        En caso de riesgo, es más rápido llamar directamente que seguir con el formulario.
      </p>
    </div>
  );
}

function ComfortBox() {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-electric-400/15 bg-electric-400/[0.05] p-4">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-electric-400/15 text-electric-400">
        <i className="ri-question-line text-lg" aria-hidden="true"></i>
      </span>
      <div className="text-sm leading-relaxed text-white/80">
        {UNSURE_COMFORT.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}

function Confirmation({
  avisoId,
  emailOk,
  onReset,
}: {
  avisoId: string;
  emailOk: boolean;
  onReset: () => void;
}) {
  return (
    <div className="mt-6 md:mt-8 overflow-hidden rounded-xl border border-white/[0.08] bg-neutral-900/60 p-6 md:p-12 text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-electric-400/15">
        <i className="ri-check-line text-3xl text-electric-400" aria-hidden="true"></i>
      </span>
      <h3 className="font-display mt-5 text-2xl md:text-3xl font-extrabold text-white">
        Aviso preparado correctamente
      </h3>
      <p className="mx-auto mt-3 max-w-md text-base text-white/60 leading-relaxed">
        Hemos generado tu aviso con el código{" "}
        <span className="font-bold text-electric-400">{avisoId}</span>.
      </p>
      <div className="mx-auto mt-5 max-w-sm rounded-lg border border-electric-400/25 bg-electric-400/[0.06] p-4 text-left">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-electric-400">
          Un último paso importante
        </p>
        <ol className="mt-2 space-y-1.5 text-sm text-white/75 leading-relaxed list-decimal list-inside">
          <li>Se ha abierto WhatsApp con tu aviso ya redactado.</li>
          <li>
            <span className="font-bold text-white">Pulsa &ldquo;Enviar&rdquo;</span> dentro de WhatsApp: sin ese
            paso, el aviso no nos llega.
          </li>
          <li>En cuanto lo recibamos, nos pondremos en contacto contigo.</li>
        </ol>
      </div>
      {emailOk ? (
        <p className="mx-auto mt-4 flex max-w-md items-center justify-center gap-2 rounded-md border border-electric-400/20 bg-electric-400/[0.06] px-4 py-3 text-sm text-electric-300 leading-relaxed">
          <i className="ri-mail-check-line" aria-hidden="true"></i>
          También hemos enviado una notificación interna por email del aviso.
        </p>
      ) : (
        <p className="mx-auto mt-4 flex max-w-md items-start gap-2 rounded-md border border-white/[0.06] bg-neutral-950/40 px-4 py-3 text-sm text-white/45 leading-relaxed">
          <i className="ri-information-line mt-0.5" aria-hidden="true"></i>
          La notificación por email interno no ha llegado; el aviso ya te ha llegado por WhatsApp igualmente.
        </p>
      )}
      <button
        type="button"
        onClick={onReset}
        className="mt-7 inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-white/20 px-7 py-3.5 text-[15px] font-bold text-white transition-all duration-200 hover:bg-white/5 cursor-pointer"
      >
        <i className="ri-add-line text-lg" aria-hidden="true"></i> Enviar otro aviso
      </button>
    </div>
  );
}

function initialData(): AvisoData {
  return {
    service: SERVICE_ELECTRIC,
    answers: [],
    description: "",
    propertyType: "",
    address: "",
    locality: "",
    postalCode: "",
    urgency: "",
    otherDate: "",
    otherSlot: "",
    name: "",
    phone: "",
    email: "",
  };
}

export default function SolicitudWizard() {
  const { ref, visible } = useScrollReveal<HTMLElement>();
  const [step, setStep] = useState<AvisoStep>(1);
  const [data, setData] = useState<AvisoData>(initialData());
  const [guideValues, setGuideValues] = useState<Record<string, string>>({});

  const [touchError, setTouchError] = useState("");
  const [atSummary, setAtSummary] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastId, setLastId] = useState("");
  const [lastEmailOk, setLastEmailOk] = useState(false);
  const [photo, setPhoto] = useState("");
  const [hp, setHp] = useState("");

  const incidence = INCIDENCES.find((i) => i.id === data.incidence?.id) ?? data.incidence;
  const questions = guideFor(incidence);
  const hasGuide = questions.length > 0 || !!incidence?.unsure;
  const danger = !!incidence?.danger;
  const progress = submitted ? 100 : atSummary ? 92 : Math.round((step / TOTAL_STEPS) * 100);

  const update = <K extends keyof AvisoData>(key: K, value: AvisoData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setTouchError("");
  };

  const go = (next: AvisoStep) => {
    setStep(next);
    setAtSummary(false);
    setTouchError("");
  };

  const chooseIncidence = (inc: AvisoIncidence) => {
    setData((d) => ({ ...d, incidence: inc, answers: [] }));
    setGuideValues({});
    setTouchError("");
    const qs = guideFor(inc);
    setTimeout(() => {
      if (inc.id === "otro") go(3);
      else if (qs.length || inc.unsure) go(2);
      else go(3);
    }, 220);
  };

  const flushAnswers = () => {
    const answers: DiagnosisAnswer[] = [];
    questions.forEach((q) => {
      const optId = guideValues[q.id];
      const opt = q.options.find((o) => o.id === optId);
      if (opt) answers.push({ q: q.question, a: opt.label });
    });
    setData((d) => ({ ...d, answers }));
  };

  const validateStep = (): string => {
    if (step === 1 && !incidence) return "Selecciona qué te ocurre para continuar.";
    if (step === 4) {
      if (!data.address.trim()) return "Indica la dirección.";
      if (!data.locality.trim()) return "Indica la localidad.";
    }
    if (step === 5 && !data.urgency) return "Elige cuándo lo necesitas.";
    if (step === 6) {
      if (!data.name.trim()) return "Indica tu nombre.";
      if (!data.phone.trim()) return "Indica tu teléfono.";
    }
    return "";
  };

  const nextStep = () => {
    const err = validateStep();
    if (err) {
      setTouchError(err);
      return;
    }
    if (step === 2) flushAnswers();
    if (step === TOTAL_STEPS) {
      setAtSummary(true);
      return;
    }
    go((step + 1) as AvisoStep);
  };

  const resetAll = () => {
    setStep(1);
    setAtSummary(false);
    setSubmitted(false);
    setLastId("");
    setLastEmailOk(false);
    setPhoto("");
    setHp("");
    setGuideValues({});
    setTouchError("");
    setData(initialData());
  };

  return (
    <section
      id="solicitud"
      ref={ref}
      aria-label="Solicitar asistencia eléctrica"
      className="bg-neutral-950 py-14 md:py-16"
    >
      <div className="mx-auto max-w-2xl px-4 md:px-6">
        <div className={`reveal ${visible ? "visible" : ""}`}>
          <div className="inline-flex items-center gap-2">
            <span className="h-px w-5 bg-electric-400"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-electric-400">
              Solicitar asistencia
            </span>
          </div>
          <h2 className="font-display mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Cuéntanos qué ocurre en pocos pasos
          </h2>
          <p className="mt-3 max-w-xl text-base md:text-lg text-white/50 leading-relaxed">
            No hace falta que sepas qué le pasa a la instalación: te hacemos unas preguntas muy
            sencillas y recibimos tu aviso para atenderte cuanto antes.
          </p>
        </div>

        {!submitted && (
          <div className={`reveal reveal-delay-1 ${visible ? "visible" : ""} mt-8 md:mt-10`}>
            <div className="flex items-center gap-4">
              <div
                className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/10"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
                aria-label="Progreso de la solicitud"
              >
                <div
                  className="h-full rounded-full bg-electric-400 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="whitespace-nowrap text-xs font-bold uppercase tracking-wider text-white/40">
                {atSummary ? "Revisión" : `Paso ${step} de ${TOTAL_STEPS}`}
              </span>
            </div>
          </div>
        )}

        {submitted ? (
          <div className={`reveal reveal-delay-1 ${visible ? "visible" : ""}`}>
            <Confirmation avisoId={lastId} emailOk={lastEmailOk} onReset={resetAll} />
          </div>
        ) : atSummary ? (
          <ResumenEnvio
            data={data}
            incidence={incidence}
            showUrgent={danger}
            photo={photo}
            hp={hp}
            onHpChange={setHp}
            onEdit={(s) => go(s)}
            onBack={() => go(TOTAL_STEPS as AvisoStep)}
            onSent={(id, ok) => {
              setLastId(id);
              setLastEmailOk(ok);
              setSubmitted(true);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        ) : (
          <div
            key={step}
            className={`reveal reveal-delay-1 ${visible ? "visible" : ""} mt-6 md:mt-8 overflow-hidden rounded-xl border border-white/[0.08] bg-neutral-900/60 p-5 md:p-6 diag-enter`}
          >
            {step === 1 && (
              <StepLayout
                eyebrow={`Paso ${step}`}
                title="¿Qué te ocurre?"
                subtitle="Elige la opción que mejor lo describa. Si no estás seguro, no pasa nada: marca “No sé qué le pasa” y te guiamos."
              >
                <div className="space-y-6">
                  <IncidenceSection
                    label="Riesgo eléctrico: actúa ya"
                    icon="ri-alarm-warning-line"
                    labelClassName="text-red-400"
                    items={DANGER_INCIDENCES}
                    columns="grid-cols-2"
                    activeId={data.incidence?.id}
                    onChoose={chooseIncidence}
                  />
                  <IncidenceSection
                    label="Problemas más comunes"
                    items={COMMON_INCIDENCES}
                    columns="grid-cols-2 sm:grid-cols-3"
                    activeId={data.incidence?.id}
                    onChoose={chooseIncidence}
                  />
                  <IncidenceSection
                    label="¿No lo tienes claro?"
                    items={FALLBACK_INCIDENCES}
                    columns="grid-cols-2"
                    activeId={data.incidence?.id}
                    onChoose={chooseIncidence}
                  />
                </div>
              </StepLayout>
            )}

            {step === 2 && (
              <StepLayout
                eyebrow={`Paso ${step}`}
                title="Un par de preguntas para ayudarte"
                subtitle={
                  incidence?.unsure
                    ? "Respóndelas como puedas. Nos ayudan a entender qué ocurre; no necesitas saber el nombre técnico."
                    : "Estas respuestas nos ayudan a entender mejor el problema antes de la visita."
                }
                back={() => go(1)}
              >
                {incidence?.unsure && (
                  <div className="mb-6">
                    <ComfortBox />
                  </div>
                )}
                {danger && (
                  <div className="mb-6">
                    <DangerBanner />
                  </div>
                )}
                <GuidedQuestions
                  questions={questions}
                  values={guideValues}
                  onChange={(qid, optId) => setGuideValues((v) => ({ ...v, [qid]: optId }))}
                />
                {incidence?.unsure && (
                  <div className="mt-6 flex items-start gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-electric-400/15 text-electric-400">
                      <i className="ri-user-heart-line text-lg" aria-hidden="true"></i>
                    </span>
                    <p className="text-sm leading-relaxed text-white/70">{SOFT_DIAGNOSIS_NOTE}</p>
                  </div>
                )}
                <ContinueBar onContinue={nextStep} label="Continuar" icon="ri-arrow-right-line" />
              </StepLayout>
            )}

            {step === 3 && (
              <StepLayout
                eyebrow={`Paso ${step}`}
                title="Cuéntanos algo más"
                subtitle="Describe lo que ocurre con tus propias palabras y, si puedes, añade una foto. Todo es opcional."
                back={() => go(hasGuide ? 2 : 1)}
              >
                {danger && (
                  <div className="mb-5">
                    <DangerBanner />
                  </div>
                )}
                <textarea
                  value={data.description}
                  onChange={(e) => update("description", e.target.value.slice(0, 500))}
                  rows={5}
                  maxLength={500}
                  placeholder="Ej. Al enchufar la lavadora se va la luz en toda la casa…"
                  aria-label="Descripción del problema"
                  className="w-full resize-none rounded-md border border-white/[0.1] bg-neutral-900/70 px-4 py-4 text-base text-white placeholder-white/30 outline-none transition-colors focus:border-electric-400/50"
                ></textarea>
                <p className="mt-2 text-right text-xs text-white/35">{data.description.length}/500</p>
                <div className="mt-5">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-white/50">
                    Foto de la avería <span className="font-normal normal-case text-white/30">(opcional)</span>
                  </span>
                  <PhotoPicker
                    id="wiz-foto"
                    value={photo}
                    onChange={setPhoto}
                    label="Añadir foto"
                    hint="Se adjunta a la notificación que recibimos."
                  />
                </div>
                <ContinueBar onContinue={nextStep} />
              </StepLayout>
            )}

            {step === 4 && (
              <StepLayout
                eyebrow={`Paso ${step}`}
                title="¿Dónde lo necesitas?"
                subtitle="Indícanos la dirección del servicio. Trabajamos en toda Euskadi."
                back={() => go(3)}
              >
                <div className="grid grid-cols-1 gap-x-5 gap-y-5">
                  <div>
                    <label htmlFor="aviso-tipo" className={labelCls}>
                      Tipo de inmueble
                    </label>
                    <select
                      id="aviso-tipo"
                      value={data.propertyType}
                      onChange={(e) => update("propertyType", e.target.value)}
                      className={inputCls}
                    >
                      <option value="">Selecciona…</option>
                      {PROPERTY_TYPES.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="aviso-direccion" className={labelCls}>
                      Dirección *
                    </label>
                    <input
                      id="aviso-direccion"
                      value={data.address}
                      onChange={(e) => update("address", e.target.value)}
                      placeholder="Calle y número"
                      autoComplete="street-address"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label htmlFor="aviso-localidad" className={labelCls}>
                      Localidad *
                    </label>
                    <input
                      id="aviso-localidad"
                      value={data.locality}
                      onChange={(e) => update("locality", e.target.value)}
                      placeholder="Ej. Barakaldo"
                      autoComplete="address-level2"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label htmlFor="aviso-cp" className={labelCls}>
                      Código postal
                    </label>
                    <input
                      id="aviso-cp"
                      value={data.postalCode}
                      onChange={(e) => update("postalCode", e.target.value)}
                      placeholder="48903"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      className={inputCls}
                    />
                  </div>
                </div>
                <ContinueBar onContinue={nextStep} />
              </StepLayout>
            )}

            {step === 5 && (
              <StepLayout
                eyebrow={`Paso ${step}`}
                title="¿Cuándo lo necesitas?"
                subtitle="Elige la urgencia. Si hay riesgo, lo priorizamos."
                back={() => go(4)}
              >
                <div className="grid grid-cols-1 gap-2.5">
                  {URGENCY_OPTIONS.map((u) => {
                    const active = data.urgency === u.id;
                    return (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => update("urgency", u.id)}
                        aria-pressed={active}
                        className={`flex items-center gap-3 rounded-lg border px-4 py-3.5 text-left transition-all duration-200 cursor-pointer ${
                          active
                            ? "border-electric-400/60 bg-electric-400/10"
                            : "border-white/10 bg-white/[0.02] hover:border-white/25"
                        }`}
                      >
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                            active ? "border-electric-400 bg-electric-400" : "border-white/30"
                          }`}
                        >
                          {active && (
                            <i className="ri-check-line text-[11px] text-neutral-950" aria-hidden="true"></i>
                          )}
                        </span>
                        <span className="flex-1">
                          <span className="block text-sm font-semibold text-white">{u.label}</span>
                          {u.hint && <span className="block text-xs text-white/40">{u.hint}</span>}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {data.urgency === "otro" && (
                  <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-5 rounded-lg border border-white/10 bg-neutral-950/40 p-5 diag-enter">
                    <div>
                      <label htmlFor="aviso-fecha" className={labelCls}>
                        Día (opcional)
                      </label>
                      <input
                        id="aviso-fecha"
                        type="date"
                        value={data.otherDate}
                        onChange={(e) => update("otherDate", e.target.value)}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label htmlFor="aviso-franja" className={labelCls}>
                        Franja horaria
                      </label>
                      <select
                        id="aviso-franja"
                        value={data.otherSlot}
                        onChange={(e) => update("otherSlot", e.target.value)}
                        className={inputCls}
                      >
                        <option value="">Indiferente</option>
                        {TIME_SLOTS.map((s) => (
                          <option key={s.id} value={s.label}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
                <ContinueBar onContinue={nextStep} />
              </StepLayout>
            )}

            {step === 6 && (
              <StepLayout
                eyebrow={`Paso ${step}`}
                title="Tus datos"
                subtitle="Para que podamos contactar contigo."
                back={() => go(5)}
              >
                <div className="grid grid-cols-1 gap-x-5 gap-y-5">
                  <div>
                    <label htmlFor="aviso-nombre" className={labelCls}>
                      Nombre *
                    </label>
                    <input
                      id="aviso-nombre"
                      value={data.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Tu nombre"
                      autoComplete="name"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label htmlFor="aviso-telefono" className={labelCls}>
                      Teléfono *
                    </label>
                    <input
                      id="aviso-telefono"
                      type="tel"
                      value={data.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="Ej. 600 00 00 00"
                      autoComplete="tel"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label htmlFor="aviso-email" className={labelCls}>
                      Email <span className="font-normal text-white/30">(opcional)</span>
                    </label>
                    <input
                      id="aviso-email"
                      type="email"
                      value={data.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="Ej. tu@email.com"
                      autoComplete="email"
                      className={inputCls}
                    />
                  </div>
                </div>
                <p className="mt-4 text-xs text-white/35">
                  Usaremos estos datos para contactar contigo sobre tu solicitud.
                </p>
                <ContinueBar onContinue={nextStep} label="Ver resumen" icon="ri-file-list-3-line" />
              </StepLayout>
            )}

            {touchError && (
              <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-red-400" role="alert">
                <i className="ri-error-warning-line" aria-hidden="true"></i> {touchError}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
