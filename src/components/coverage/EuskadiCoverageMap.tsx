"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { localities, type Locality } from "@/lib/localities";
import { business, telLink, waLink } from "@/lib/business";
import { getResponseTier, RESPONSE_TIER_META, type ResponseTier } from "@/lib/coverage";
import { trackCallClick, trackWhatsAppClick } from "@/lib/tracking";

const BASE_SLUG = "barakaldo";
// Cruces se omite como punto propio: es un barrio de Barakaldo con coordenadas
// casi idénticas a las del municipio (mismo criterio que CoverageMap.tsx).
const EXCLUDED_FROM_MAP = new Set(["cruces"]);

type Province = "Bizkaia" | "Gipuzkoa" | "Araba";
const PROVINCES: Province[] = ["Bizkaia", "Gipuzkoa", "Araba"];

type Point = Locality & { x: number; y: number };

// Proyección equirectangular con corrección por coseno de la latitud media (igual
// criterio que CoverageMap.tsx), pero en porcentaje (0-100) para poder posicionar
// tanto los marcadores HTML como las líneas SVG con las mismas coordenadas.
function project(points: Locality[]): Point[] {
  const lats = points.map((p) => p.geo.lat);
  const lngs = points.map((p) => p.geo.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const latMidRad = ((minLat + maxLat) / 2) * (Math.PI / 180);
  const cos = Math.cos(latMidRad);
  const spanX = (maxLng - minLng) * cos || 1;
  const spanY = maxLat - minLat || 1;

  const PAD = 12;
  const inner = 100 - PAD * 2;
  const scale = Math.min(inner / spanX, inner / spanY);
  const offsetX = PAD + (inner - spanX * scale) / 2;
  const offsetY = PAD + (inner - spanY * scale) / 2;

  return points.map((p) => ({
    ...p,
    x: offsetX + (p.geo.lng - minLng) * cos * scale,
    y: offsetY + (maxLat - p.geo.lat) * scale,
  }));
}

function localityMessage(name: string) {
  return `Hola, necesito un electricista en ${name}. ¿Podéis ayudarme?`;
}

export default function EuskadiCoverageMap() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [filter, setFilter] = useState<Province | "Todas">("Todas");

  const points = useMemo(() => {
    const mapLocalities = localities.filter((l) => !EXCLUDED_FROM_MAP.has(l.slug));
    return project(mapLocalities);
  }, []);

  const base = points.find((p) => p.slug === BASE_SLUG);
  const others = points.filter((p) => p.slug !== BASE_SLUG);
  const active = points.find((p) => p.slug === activeSlug) ?? null;

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-center gap-2">
        {(["Todas", ...PROVINCES] as const).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setFilter(p)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
              filter === p
                ? "bg-electric-400 text-neutral-950"
                : "border border-white/15 bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            {p === "Todas" ? "Toda Euskadi" : p}
          </button>
        ))}
      </div>

      <div
        className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 shadow-2xl shadow-black/40 sm:aspect-[16/10] lg:aspect-[2/1]"
        onClick={(e) => {
          if (e.target === e.currentTarget) setActiveSlug(null);
        }}
      >
        {/* Fondo: rejilla técnica + resplandor desde Barakaldo */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        ></div>
        {base && (
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              background: `radial-gradient(circle at ${base.x}% ${base.y}%, rgba(255,203,0,0.16), transparent 55%)`,
            }}
          ></div>
        )}

        {/* Anillos de cobertura decorativos, centrados en Barakaldo */}
        {base &&
          [
            { size: 28, tier: "fast" as ResponseTier },
            { size: 52, tier: "medium" as ResponseTier },
            { size: 78, tier: "slow" as ResponseTier },
            { size: 105, tier: "verySlow" as ResponseTier },
          ].map((ring) => (
            <div
              key={ring.size}
              aria-hidden="true"
              className="pointer-events-none absolute rounded-full border"
              style={{
                left: `${base.x}%`,
                top: `${base.y}%`,
                width: `${ring.size}%`,
                height: `${ring.size}%`,
                transform: "translate(-50%, -50%)",
                borderColor:
                  ring.tier === "fast"
                    ? "rgba(16,185,129,0.35)"
                    : ring.tier === "medium"
                      ? "rgba(251,191,36,0.28)"
                      : ring.tier === "slow"
                        ? "rgba(249,115,22,0.22)"
                        : "rgba(239,68,68,0.16)",
              }}
            ></div>
          ))}

        {/* Líneas de conexión desde Barakaldo a cada municipio */}
        {base && (
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {others.map((p) => {
              const dimmed = filter !== "Todas" && p.province !== filter;
              return (
                <line
                  key={`line-${p.slug}`}
                  x1={base.x}
                  y1={base.y}
                  x2={p.x}
                  y2={p.y}
                  stroke="rgba(255,203,0,0.35)"
                  strokeWidth={0.3}
                  className="coverage-line"
                  style={{ opacity: dimmed ? 0.12 : 1 }}
                />
              );
            })}
          </svg>
        )}

        {/* Marcadores de municipios */}
        {others.map((p) => {
          const tier = getResponseTier(p.etaMinutes);
          const meta = RESPONSE_TIER_META[tier];
          const dimmed = filter !== "Todas" && p.province !== filter;
          const isActive = activeSlug === p.slug;
          return (
            <button
              key={p.slug}
              type="button"
              onMouseEnter={() => !dimmed && setActiveSlug(p.slug)}
              onFocus={() => !dimmed && setActiveSlug(p.slug)}
              onClick={(e) => {
                e.stopPropagation();
                setActiveSlug(p.slug);
              }}
              disabled={dimmed}
              aria-label={`Ver cobertura en ${p.name}: ${p.distanceKm} km, ${p.etaMinutes} minutos desde Barakaldo`}
              className="group absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-opacity duration-300"
              style={{ left: `${p.x}%`, top: `${p.y}%`, opacity: dimmed ? 0.15 : 1 }}
            >
              <span
                className={`block h-3 w-3 rounded-full ${meta.dot} ring-4 ${meta.ring} transition-transform duration-200 ${
                  isActive ? "scale-150" : "group-hover:scale-125"
                }`}
              ></span>
              <span className="sr-only">{p.name}</span>
            </button>
          );
        })}

        {/* Marcador de Barakaldo (base). El área interactiva se limita al punto:
            la etiqueta de texto es solo decorativa (pointer-events-none) para no
            "tapar" el hueco de clic de los municipios vecinos, muy cercanos en
            el mapa (Sestao, Santurtzi, Portugalete...). */}
        {base && (
          <div
            className="pointer-events-none absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
            style={{ left: `${base.x}%`, top: `${base.y}%` }}
          >
            <button
              type="button"
              onMouseEnter={() => setActiveSlug(base.slug)}
              onFocus={() => setActiveSlug(base.slug)}
              onClick={(e) => {
                e.stopPropagation();
                setActiveSlug(base.slug);
              }}
              aria-label="Barakaldo, nuestra base de operaciones"
              className="pointer-events-auto relative flex h-4 w-4 items-center justify-center"
            >
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full bg-electric-400/60"
                animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
              <span className="relative h-4 w-4 rounded-full border-2 border-neutral-950 bg-electric-400"></span>
            </button>
            <span className="whitespace-nowrap rounded-full bg-neutral-950/80 px-2.5 py-1 text-[11px] font-extrabold text-white ring-1 ring-white/15">
              Barakaldo · base
            </span>
          </div>
        )}

        {/* Tarjeta flotante — escritorio/tablet, anclada junto al marcador */}
        {active && (
          <div
            className="pointer-events-none absolute z-20 hidden w-72 sm:block"
            style={{
              left: `${active.x}%`,
              top: `${active.y}%`,
              transform: `translate(${active.x > 60 ? "calc(-100% - 18px)" : "18px"}, ${
                active.y > 60 ? "calc(-100% - 8px)" : "-8px"
              })`,
            }}
          >
            <div className="pointer-events-auto" onMouseLeave={() => setActiveSlug(null)}>
              <LocalityCard locality={active} onClose={() => setActiveSlug(null)} />
            </div>
          </div>
        )}
      </div>

      {/* Tarjeta flotante — móvil, anclada abajo */}
      {active && (
        <div className="mt-4 sm:hidden">
          <LocalityCard locality={active} onClose={() => setActiveSlug(null)} />
        </div>
      )}

      {/* Leyenda */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        {(Object.entries(RESPONSE_TIER_META) as [ResponseTier, (typeof RESPONSE_TIER_META)[ResponseTier]][]).map(
          ([tier, meta]) => (
            <span key={tier} className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600">
              <span className={`h-2.5 w-2.5 rounded-full ${meta.dot}`}></span>
              {meta.label}
            </span>
          )
        )}
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600">
          <span className="h-2.5 w-2.5 rounded-full bg-electric-400"></span>
          Barakaldo · nuestra base
        </span>
      </div>
    </div>
  );
}

function LocalityCard({ locality, onClose }: { locality: Point; onClose: () => void }) {
  const isBase = locality.slug === BASE_SLUG;
  const tier = getResponseTier(locality.etaMinutes);
  const meta = RESPONSE_TIER_META[tier];

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl shadow-black/20">
      <div className="flex items-start justify-between gap-3 border-b border-neutral-100 bg-neutral-50 px-4 py-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-electric-600">{locality.province}</p>
          <h3 className="font-display text-base font-extrabold text-neutral-900">{locality.name}</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-200 hover:text-neutral-700"
        >
          <i className="ri-close-line" aria-hidden="true"></i>
        </button>
      </div>

      <div className="space-y-2.5 px-4 py-3.5">
        {isBase ? (
          <p className="text-sm text-neutral-600">
            Aquí está nuestro local, en {business.address.street}. Salimos desde aquí a todo Euskadi.
          </p>
        ) : (
          <>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 text-neutral-500">
                <i className="ri-map-pin-2-line" aria-hidden="true"></i>
                Distancia desde Barakaldo
              </span>
              <span className="font-bold text-neutral-900">{locality.distanceKm} km</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 text-neutral-500">
                <i className="ri-car-line" aria-hidden="true"></i>
                Tiempo estimado
              </span>
              <span className={`font-bold ${meta.text}`}>~ {locality.etaMinutes} min</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 text-neutral-500">
                <i className="ri-flashlight-line" aria-hidden="true"></i>
                Disponibilidad
              </span>
              <span className="font-bold text-neutral-900">24 horas</span>
            </div>
            <p className="flex items-center gap-1.5 pt-1 text-xs font-semibold text-emerald-600">
              <i className="ri-checkbox-circle-fill" aria-hidden="true"></i>
              Atención urgente disponible
            </p>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2 border-t border-neutral-100 px-4 py-3.5">
        <div className="flex gap-2">
          <a
            href={telLink()}
            onClick={() => trackCallClick(`coverage_map_${locality.slug}`)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-electric-400 px-3 py-2.5 text-sm font-extrabold text-neutral-950 hover:bg-electric-300"
          >
            <i className="ri-phone-line" aria-hidden="true"></i>
            Llamar
          </a>
          <a
            href={waLink(localityMessage(locality.name))}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick(`coverage_map_${locality.slug}`)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-whatsapp/30 bg-whatsapp/10 px-3 py-2.5 text-sm font-bold text-whatsapp-600 hover:bg-whatsapp/15"
          >
            <i className="ri-whatsapp-line" aria-hidden="true"></i>
            WhatsApp
          </a>
        </div>
        <Link
          href={`/electricista-${locality.slug}`}
          className="flex items-center justify-center gap-1.5 rounded-full border border-neutral-200 px-3 py-2 text-sm font-semibold text-neutral-700 hover:border-electric-400/60 hover:text-electric-600"
        >
          Ver información de {locality.name}
          <i className="ri-arrow-right-line" aria-hidden="true"></i>
        </Link>
      </div>
    </div>
  );
}
