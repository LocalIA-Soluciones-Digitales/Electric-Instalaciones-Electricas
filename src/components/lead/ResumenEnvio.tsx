"use client";

import { useState } from "react";
import {
  PROPERTY_TYPES,
  TIME_SLOTS,
  buildWhatsAppMessage,
  formatFechaHora,
  generarIdAviso,
  isValidEmail,
  isValidPhone,
  urgencyLabel,
  type AvisoData,
  type AvisoIncidence,
} from "@/lib/leadConfig";
import { enviarAvisoEmail } from "@/lib/sendLead";
import { business, telLink, waLink } from "@/lib/business";
import { trackFormSubmit, trackWhatsAppClick } from "@/lib/tracking";
import TurnstileWidget from "./TurnstileWidget";
import type { AvisoStep } from "./SolicitudWizard";

interface ResumenEnvioProps {
  data: AvisoData;
  incidence?: AvisoIncidence;
  showUrgent: boolean;
  photo: string;
  hp: string;
  onHpChange: (value: string) => void;
  onEdit: (step: AvisoStep) => void;
  onBack: () => void;
  onSent: (id: string, emailOk: boolean) => void;
}

function EditRow({
  label,
  value,
  onEdit,
  danger,
}: {
  label: string;
  value: string;
  onEdit: () => void;
  danger?: boolean;
}) {
  return value && value.trim() ? (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <div className="min-w-0">
        <dt className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/40">{label}</dt>
        <dd className={`mt-1 text-sm font-semibold ${danger ? "text-red-400" : "text-white/90"}`}>
          {value}
        </dd>
      </div>
      <button
        type="button"
        onClick={onEdit}
        aria-label={`Modificar ${label}`}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/15 text-white/50 hover:border-electric-400/50 hover:text-electric-400 transition-colors duration-200 cursor-pointer"
      >
        <i className="ri-edit-line text-sm" aria-hidden="true"></i>
      </button>
    </div>
  ) : null;
}

function Row({ label, value }: { label: string; value: string }) {
  return value && value.trim() ? (
    <div className="flex flex-col gap-1 py-3.5">
      <dt className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/40">{label}</dt>
      <dd className="text-sm font-semibold text-white/90">{value}</dd>
    </div>
  ) : null;
}

export default function ResumenEnvio({
  data,
  incidence,
  showUrgent,
  photo,
  hp,
  onHpChange,
  onEdit,
  onBack,
  onSent,
}: ResumenEnvioProps) {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  const urgencyLabelTxt = urgencyLabel(data.urgency);
  const slotLabel = TIME_SLOTS.find((s) => s.label === data.otherSlot)?.label ?? data.otherSlot;
  const propertyLabel =
    PROPERTY_TYPES.find((p) => p.id === data.propertyType)?.label ?? data.propertyType;

  const dispatch = async () => {
    if (!isValidPhone(data.phone)) {
      setError("Revisa el teléfono: debe tener 9 dígitos (p. ej. 600 00 00 00).");
      return;
    }
    if (!isValidEmail(data.email)) {
      setError("El email introducido no es válido. Revísalo o déjalo vacío.");
      return;
    }
    setError("");
    setSending(true);

    const avisoId = generarIdAviso(data.service.code);
    const timestamp = formatFechaHora();

    const msg = buildWhatsAppMessage(data, avisoId, timestamp);

    try {
      const log = JSON.parse(localStorage.getItem("electric_aviso_log") || "[]");
      log.push({ id: avisoId, timestamp, service: data.service.label });
      localStorage.setItem("electric_aviso_log", JSON.stringify(log.slice(-50)));
    } catch {
      /* no-op */
    }

    trackFormSubmit("solicitud_wizard");
    trackWhatsAppClick("solicitud_wizard");
    window.open(waLink(msg), "_blank", "noopener,noreferrer");

    const res = await enviarAvisoEmail({
      kind: "aviso",
      avisoId,
      data,
      photo: photo || undefined,
      hp,
      turnstileToken: turnstileToken || undefined,
    });
    setSending(false);
    onSent(avisoId, res.ok);
  };

  const availability =
    data.urgency === "otro"
      ? [data.otherDate, data.otherSlot].filter(Boolean).join(" · ")
      : `${urgencyLabelTxt}${slotLabel ? ` · ${slotLabel}` : ""}${data.otherDate ? ` · ${data.otherDate}` : ""}`;

  return (
    <div className="mt-6 md:mt-8 overflow-hidden rounded-xl border border-white/[0.08] bg-neutral-900/60 diag-enter">
      <div className="border-b border-white/[0.06] px-5 md:px-6 py-5 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-electric-400">
            Tu solicitud
          </span>
          <h3 className="font-display mt-1 text-xl md:text-2xl font-extrabold text-white">
            Perfecto. Revisa los datos
          </h3>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/45 hover:text-electric-400 transition-colors duration-200 cursor-pointer"
        >
          <i className="ri-arrow-left-line" aria-hidden="true"></i> Atrás
        </button>
      </div>

      <div className="px-5 md:px-6 py-2">
        <dl className="divide-y divide-white/[0.06]">
          <EditRow label="Servicio" value={data.service.label} onEdit={() => onEdit(1)} />
          {incidence && (
            <EditRow
              label="Qué te ocurre"
              value={incidence.label}
              onEdit={() => onEdit(1)}
              danger={incidence.danger}
            />
          )}
          {data.answers.map((a) => (
            <Row key={a.q} label={a.q} value={a.a} />
          ))}
          <div className="flex items-center justify-between gap-4 py-3.5">
            <div className="min-w-0">
              <dt className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/40">
                Descripción
              </dt>
              <dd className="mt-1 text-sm font-semibold text-white/90">{data.description || "—"}</dd>
            </div>
            <button
              type="button"
              onClick={() => onEdit(3)}
              aria-label="Modificar descripción"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/15 text-white/50 hover:border-electric-400/50 hover:text-electric-400 transition-colors duration-200 cursor-pointer"
            >
              <i className="ri-edit-line text-sm" aria-hidden="true"></i>
            </button>
          </div>
          <div className="flex items-center justify-between gap-4 py-3.5">
            <div className="min-w-0">
              <dt className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/40">
                Ubicación
              </dt>
              <dd className="mt-1 text-sm font-semibold text-white/90">
                {[data.address, data.locality, data.postalCode].filter(Boolean).join(", ") || "—"}
                {propertyLabel && ` · ${propertyLabel}`}
              </dd>
            </div>
            <button
              type="button"
              onClick={() => onEdit(4)}
              aria-label="Modificar ubicación"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/15 text-white/50 hover:border-electric-400/50 hover:text-electric-400 transition-colors duration-200 cursor-pointer"
            >
              <i className="ri-edit-line text-sm" aria-hidden="true"></i>
            </button>
          </div>
          <EditRow label="Cuándo lo necesitas" value={availability} onEdit={() => onEdit(5)} />
          <Row label="Nombre" value={data.name} />
          <Row label="Teléfono" value={data.phone} />
          <Row label="Email" value={data.email} />
        </dl>

        {photo && (
          <div className="mt-3">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-white/40">
              Fotografía adjunta
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element -- vista previa de una data URL local */}
            <img
              src={photo}
              alt="Fotografía de la avería adjunta al aviso"
              className="h-44 w-full rounded-lg border border-white/10 object-cover"
            />
          </div>
        )}

        {showUrgent && (
          <div className="mt-4 flex items-start gap-3 rounded-lg border border-red-900/40 bg-red-950/15 p-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-600/20 text-red-400">
              <i className="ri-alert-line" aria-hidden="true"></i>
            </span>
            <div className="text-sm leading-relaxed text-red-200">
              <p className="font-semibold text-red-300">
                Si existe riesgo eléctrico, no manipules la instalación.
              </p>
              <p className="mt-1 text-red-200/90">
                Aléjate de la zona y avísanos por teléfono para priorizarlo.
              </p>
            </div>
          </div>
        )}

        {error && (
          <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-red-400" role="alert">
            <i className="ri-error-warning-line" aria-hidden="true"></i> {error}
          </p>
        )}

        {/* Campo trampa anti-bot: invisible para personas, si llega relleno se descarta el envío. */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="aviso-website">No rellenar este campo</label>
          <input
            id="aviso-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={hp}
            onChange={(e) => onHpChange(e.target.value)}
          />
        </div>

        <TurnstileWidget onToken={setTurnstileToken} />

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={dispatch}
            disabled={sending}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#25D366] px-7 py-4 text-base md:text-[15px] font-extrabold text-neutral-950 transition-all duration-200 hover:bg-[#1fbd5a] cursor-pointer disabled:opacity-60"
          >
            {sending ? (
              <>
                <i className="ri-loader-4-line animate-spin text-lg" aria-hidden="true"></i>
                Preparando tu aviso…
              </>
            ) : (
              <>
                <i className="ri-whatsapp-line text-lg" aria-hidden="true"></i> ENVIAR POR WHATSAPP
              </>
            )}
          </button>
          <a
            href={telLink()}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-white/15 px-7 py-3.5 text-[15px] font-bold text-white transition-all duration-200 hover:bg-white/5 cursor-pointer"
          >
            <i className="ri-phone-line text-lg text-electric-400" aria-hidden="true"></i> LLAMAR AHORA:{" "}
            {business.phoneDisplay}
          </a>
          <p className="text-center text-xs text-white/35">
            Al pulsar “Enviar” se abre WhatsApp con tu aviso hacia nuestro número y enviamos una
            notificación interna por email (con la foto si la has añadido).
          </p>
        </div>
      </div>
    </div>
  );
}
