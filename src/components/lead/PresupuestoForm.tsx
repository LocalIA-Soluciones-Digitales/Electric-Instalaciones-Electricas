"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  PROPERTY_TYPES,
  buildBudgetEmail,
  formatFechaHora,
  generarIdAviso,
  isValidEmail,
  isValidPhone,
  type BudgetData,
} from "@/lib/leadConfig";
import { enviarAvisoEmail } from "@/lib/sendLead";
import { business, telLink, waLink } from "@/lib/business";
import { trackFormSubmit, trackWhatsAppClick } from "@/lib/tracking";
import PhotoPicker from "@/components/PhotoPicker";
import TurnstileWidget from "@/components/lead/TurnstileWidget";

const inputCls =
  "w-full rounded-md border border-neutral-300 bg-white px-4 py-3 md:py-3.5 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-electric-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-400 transition-colors duration-200";
const labelCls = "mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-neutral-500";

const WORK_OPTIONS = [
  "Instalación eléctrica nueva",
  "Reforma eléctrica",
  "Nuevos puntos de luz o enchufes",
  "Cambio de cuadro eléctrico",
  "Iluminación",
  "Boletín / legalización",
  "Mejora de la instalación",
  "Otro trabajo",
];

const WHEN_OPTIONS = [
  { id: "dias", label: "En los próximos días" },
  { id: "semana", label: "Esta semana" },
  { id: "mes", label: "Este mes" },
  { id: "sinfecha", label: "Aún sin fecha (solo quiero precio)" },
];

function Field({
  id,
  label,
  required,
  hint,
  children,
  className = "",
}: {
  id?: string;
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelCls}>
        {label} {required && <span className="text-electric-600">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-neutral-400">{hint}</p>}
    </div>
  );
}

export default function PresupuestoForm() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  const [workType, setWorkType] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [address, setAddress] = useState("");
  const [locality, setLocality] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [whenApprox, setWhenApprox] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<{ refId: string; ok: boolean } | null>(null);
  const [hp, setHp] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  const reset = () => {
    setWorkType("");
    setDescription("");
    setPhoto("");
    setPropertyType("");
    setAddress("");
    setLocality("");
    setPostalCode("");
    setWhenApprox("");
    setName("");
    setPhone("");
    setEmail("");
    setError("");
    setDone(null);
    setHp("");
  };

  const submit = async () => {
    if (!workType.trim()) return setError("Indica qué trabajo necesitas realizar.");
    if (!name.trim()) return setError("Indica tu nombre.");
    if (!isValidPhone(phone)) return setError("Revisa el teléfono (9 dígitos, p. ej. 600 00 00 00).");
    if (!isValidEmail(email)) return setError("El email no es válido o déjalo vacío.");
    setError("");

    const data: BudgetData = {
      workType: workType.trim(),
      description: description.trim(),
      propertyType,
      address: address.trim(),
      locality: locality.trim(),
      postalCode: postalCode.trim(),
      whenApprox: WHEN_OPTIONS.find((w) => w.id === whenApprox)?.label ?? whenApprox,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
    };

    const refId = generarIdAviso("BUD");
    const { text } = buildBudgetEmail(data, refId, formatFechaHora(), Boolean(photo));

    setSending(true);
    trackFormSubmit("presupuesto_form");
    trackWhatsAppClick("presupuesto_form");
    // El lead siempre llega por WhatsApp, igual que en el asistente guiado
    // (ver ResumenEnvio.tsx): el email interno es una notificación secundaria,
    // nunca la única vía por la que puede llegar la solicitud.
    window.open(waLink(text), "_blank", "noopener,noreferrer");

    const res = await enviarAvisoEmail({
      kind: "presupuesto",
      avisoId: refId,
      data,
      photo: photo || undefined,
      hp,
      turnstileToken: turnstileToken || undefined,
    });
    setSending(false);
    setDone({ refId, ok: res.ok });
  };

  return (
    <section
      id="presupuesto"
      ref={ref}
      aria-label="Pedir presupuesto sin compromiso"
      className="bg-cloud py-12 md:py-16"
    >
      <div className="mx-auto max-w-2xl px-4 md:px-6">
        <div className={`reveal ${visible ? "visible" : ""} text-center`}>
          <div className="inline-flex items-center gap-2">
            <span className="h-px w-5 bg-electric-500"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-electric-600">
              Presupuesto sin compromiso
            </span>
            <span className="h-px w-5 bg-electric-500"></span>
          </div>
          <h2 className="font-display mt-4 text-2xl md:text-4xl font-extrabold tracking-tight text-neutral-900">
            ¿Tienes un trabajo eléctrico en mente?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm md:text-lg text-neutral-600 leading-relaxed">
            Cuéntanos qué necesitas y te preparamos un presupuesto a medida, sin compromiso.
          </p>
        </div>

        <div className={`reveal reveal-delay-1 ${visible ? "visible" : ""} mt-8 md:mt-12`}>
          {done ? (
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white p-5 md:p-12 text-center shadow-sm diag-enter">
              <span className="mx-auto flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-electric-100">
                <i className="text-2xl md:text-3xl ri-check-line text-electric-600" aria-hidden="true"></i>
              </span>
              <h3 className="font-display mt-5 text-xl md:text-3xl font-extrabold text-neutral-900">
                Solicitud de presupuesto enviada
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm md:text-base text-neutral-600 leading-relaxed">
                Tu solicitud con la referencia{" "}
                <span className="font-bold text-electric-600">{done.refId}</span> se ha enviado por
                WhatsApp. Te contactaremos con un presupuesto a medida, sin compromiso.
              </p>
              {!done.ok && (
                <p className="mx-auto mt-4 flex max-w-md items-start gap-2 rounded-md border border-neutral-200 bg-cloud px-4 py-3 text-sm text-neutral-500 leading-relaxed">
                  <i className="ri-information-line mt-0.5" aria-hidden="true"></i>
                  La notificación interna por email no ha llegado; tu solicitud ya nos ha llegado por
                  WhatsApp igualmente.
                </p>
              )}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-neutral-300 px-6 md:px-7 py-3 md:py-3.5 text-[14px] md:text-[15px] font-bold text-neutral-800 transition-all duration-200 hover:bg-neutral-100 cursor-pointer"
                >
                  <i className="ri-add-line text-lg" aria-hidden="true"></i> Nueva solicitud
                </button>
                <a
                  href={waLink(`Hola, quería pedir un presupuesto. Trabajo: ${workType || "sin especificar"}`)}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-whatsapp/25 px-6 md:px-7 py-3 md:py-3.5 text-[14px] md:text-[15px] font-bold text-whatsapp-600 hover:bg-whatsapp/10 transition-all duration-200 cursor-pointer"
                >
                  <i className="ri-whatsapp-line text-lg" aria-hidden="true"></i> WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-neutral-200 bg-white p-4 md:p-6 shadow-sm">
              <Field
                id="bud-trabajo"
                label="¿Qué trabajo necesitas?"
                required
                hint="Elige la opción más parecida y, si quieres, lo detallas después."
              >
                <div className="relative">
                  <select
                    id="bud-trabajo"
                    value={workType}
                    onChange={(e) => setWorkType(e.target.value)}
                    className={`${inputCls} appearance-none pr-10`}
                  >
                    <option value="">Selecciona un tipo de trabajo…</option>
                    {WORK_OPTIONS.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                  <i
                    className="ri-arrow-down-s-line pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-lg text-neutral-400"
                    aria-hidden="true"
                  ></i>
                </div>
              </Field>

              <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-5">
                <div className="flex flex-col gap-5 md:gap-6">
                  <Field id="bud-desc" label="Cuéntanos qué necesitas">
                    <textarea
                      id="bud-desc"
                      value={description}
                      onChange={(e) => setDescription(e.target.value.slice(0, 500))}
                      rows={4}
                      maxLength={500}
                      placeholder="Describe el trabajo, la zona aproximada o cualquier detalle…"
                      aria-label="Descripción del trabajo"
                      className="w-full resize-none rounded-md border border-neutral-300 bg-white px-4 py-3 md:py-3.5 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-electric-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-400"
                    ></textarea>
                    <p className="mt-1 text-right text-xs text-neutral-400">{description.length}/500</p>
                  </Field>

                  <Field label="Foto o plano (opcional)">
                    <PhotoPicker
                      id="bud-foto"
                      value={photo}
                      onChange={setPhoto}
                      label="Añadir foto o plano"
                      hint="Se adjunta a la solicitud que recibimos."
                    />
                  </Field>
                </div>

                <div className="flex flex-col gap-5 md:gap-6">
                  <Field id="bud-cuando" label="¿Cuándo te gustaría hacerlo?">
                    <div className="flex flex-wrap gap-2">
                      {WHEN_OPTIONS.map((w) => {
                        const active = whenApprox === w.id;
                        return (
                          <button
                            key={w.id}
                            type="button"
                            onClick={() => setWhenApprox(w.id)}
                            aria-pressed={active}
                            className={`whitespace-nowrap rounded-md border px-3 py-2.5 text-sm font-bold transition-all duration-200 cursor-pointer ${
                              active
                                ? "border-electric-500/60 bg-electric-400 text-neutral-950"
                                : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300"
                            }`}
                          >
                            {w.label}
                          </button>
                        );
                      })}
                    </div>
                  </Field>

                  <div className="grid grid-cols-1 gap-4 md:gap-5">
                    <Field id="bud-tipo" label="Tipo de inmueble">
                      <select
                        id="bud-tipo"
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className={inputCls}
                      >
                        <option value="">Selecciona…</option>
                        {PROPERTY_TYPES.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field id="bud-direccion" label="Dirección aproximada">
                      <input
                        id="bud-direccion"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Calle y número (si lo sabes)"
                        autoComplete="street-address"
                        className={inputCls}
                      />
                    </Field>
                    <div className="grid grid-cols-1 gap-4 md:gap-5">
                      <Field id="bud-localidad" label="Localidad">
                        <input
                          id="bud-localidad"
                          value={locality}
                          onChange={(e) => setLocality(e.target.value)}
                          placeholder="Ej. Barakaldo"
                          autoComplete="address-level2"
                          className={inputCls}
                        />
                      </Field>
                      <Field id="bud-cp" label="Código postal">
                        <input
                          id="bud-cp"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          placeholder="48903"
                          inputMode="numeric"
                          autoComplete="postal-code"
                          className={inputCls}
                        />
                      </Field>
                    </div>
                    <Field id="bud-nombre" label="Nombre" required>
                      <input
                        id="bud-nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tu nombre"
                        autoComplete="name"
                        className={inputCls}
                      />
                    </Field>
                    <div className="grid grid-cols-1 gap-4 md:gap-5">
                      <Field id="bud-telefono" label="Teléfono" required>
                        <input
                          id="bud-telefono"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="600 00 00 00"
                          inputMode="tel"
                          autoComplete="tel"
                          className={inputCls}
                        />
                      </Field>
                      <Field id="bud-email" label="Email">
                        <input
                          id="bud-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="tu@email.com"
                          autoComplete="email"
                          className={inputCls}
                        />
                      </Field>
                    </div>
                  </div>

                  {error && (
                    <p className="flex items-center gap-2 text-sm font-semibold text-red-600" role="alert">
                      <i className="ri-error-warning-line" aria-hidden="true"></i> {error}
                    </p>
                  )}

                  {/* Campo trampa anti-bot: invisible para personas, si llega relleno se descarta el envío. */}
                  <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="bud-website">No rellenar este campo</label>
                    <input
                      id="bud-website"
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
                    className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-electric-400 px-6 md:px-7 py-3.5 md:py-4 text-[15px] md:text-base font-extrabold text-neutral-950 transition-all duration-200 hover:bg-electric-300 cursor-pointer disabled:opacity-60"
                  >
                    {sending ? (
                      <>
                        <i className="ri-loader-4-line animate-spin text-lg" aria-hidden="true"></i>
                        Enviando solicitud…
                      </>
                    ) : (
                      <>
                        <i className="ri-price-tag-3-line text-lg" aria-hidden="true"></i> SOLICITAR
                        PRESUPUESTO
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-neutral-400">
                    Al enviar aceptas nuestra{" "}
                    <Link href="/politica-privacidad" className="font-semibold text-electric-600 hover:underline">
                      Política de Privacidad
                    </Link>
                    . Usaremos tus datos solo para contactarte con este presupuesto. También puedes{" "}
                    <a href={telLink()} className="font-semibold text-electric-600">
                      llamarnos al {business.phoneDisplay}
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
