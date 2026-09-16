"use client";

import { useEffect, useRef, useState } from "react";
import type L from "leaflet";
import "leaflet/dist/leaflet.css";
import { localities, type Locality } from "@/lib/localities";
import { business, telLink, waLink, WHATSAPP_GREETING_URGENT } from "@/lib/business";
import { getResponseTier, RESPONSE_TIER_META, tierCommercialCopy, type ResponseTier } from "@/lib/coverage";
import { EUSKADI_BOUNDARY } from "@/lib/euskadiBoundary";

// Anillo enorme (todo el mundo visible en proyección Mercator) usado como
// contorno exterior de la "máscara": junto con el contorno de Euskadi como
// agujero, atenúa todo lo que queda fuera de la comunidad autónoma.
const WORLD_RING: [number, number][] = [
  [85, -200],
  [85, 200],
  [-85, 200],
  [-85, -200],
];

const BASE_SLUG = "barakaldo";
// Cruces se omite como punto propio: es un barrio de Barakaldo con coordenadas
// casi idénticas a las del municipio (mismo criterio que CoverageMap.tsx).
const EXCLUDED_FROM_MAP = new Set(["cruces"]);

type Province = "Bizkaia" | "Gipuzkoa" | "Araba";
const PROVINCES: Province[] = ["Bizkaia", "Gipuzkoa", "Araba"];

// Mismos tonos que las clases de Tailwind usadas en la leyenda
// (RESPONSE_TIER_META), para que el color del marcador y el de su etiqueta
// coincidan exactamente.
const TIER_HEX: Record<ResponseTier, string> = {
  fast: "#10b981",
  medium: "#fbbf24",
  slow: "#f97316",
};

const TOTAL_MUNICIPIOS = localities.filter((l) => !EXCLUDED_FROM_MAP.has(l.slug)).length;
const NON_HOME_POINTS = localities.filter((l) => !EXCLUDED_FROM_MAP.has(l.slug) && l.slug !== BASE_SLUG);
const AVG_ETA_MINUTES = Math.round(
  NON_HOME_POINTS.reduce((sum, p) => sum + p.etaMinutes, 0) / NON_HOME_POINTS.length
);

const HUD_STATS = [
  { icon: "ri-map-pin-2-fill", value: `${TOTAL_MUNICIPIOS}`, label: "Municipios cubiertos" },
  { icon: "ri-flashlight-fill", value: `~${AVG_ETA_MINUTES} min`, label: "Respuesta media" },
  { icon: "ri-shield-check-fill", value: "100%", label: "Cobertura en Euskadi" },
  { icon: "ri-moon-clear-fill", value: "24/7", label: "Guardia activa" },
] as const;

function popupHtml(locality: Locality, isBase: boolean) {
  if (isBase) {
    return `
      <div class="w-56">
        <div class="border-b border-neutral-100 bg-neutral-50 px-4 py-3">
          <p class="text-[10px] font-bold uppercase tracking-wider text-electric-600">Nuestra base</p>
          <h3 class="font-display text-base font-extrabold text-neutral-900">${locality.name}</h3>
        </div>
        <div class="px-4 py-3.5 text-sm text-neutral-600">
          Aquí está nuestro local, en ${business.address.street}. Salimos desde aquí a todo Euskadi, 24 horas al día.
        </div>
        <div class="flex gap-2 border-t border-neutral-100 px-4 py-3.5">
          <a href="${telLink()}" class="flex-1 rounded-full bg-electric-400 px-3 py-2 text-center text-sm font-extrabold text-neutral-950 no-underline">Llamar</a>
        </div>
      </div>
    `;
  }

  const tier = getResponseTier(locality.etaMinutes);
  const color = TIER_HEX[tier];
  const waMsg = encodeURIComponent(`Hola, necesito un electricista en ${locality.name}. ¿Podéis ayudarme?`);

  // Contenido reducido a lo que cambia por municipio (frase de tiempo +
  // distancia); "24h" y "urgencias" se dicen una sola vez, no en dos líneas
  // repetidas en cada ficha.
  return `
    <div class="w-56">
      <div class="border-b border-neutral-100 bg-neutral-50 px-4 py-3">
        <p class="text-[10px] font-bold uppercase tracking-wider text-electric-600">${locality.province}</p>
        <h3 class="font-display text-base font-extrabold text-neutral-900">${locality.name}</h3>
      </div>
      <div class="space-y-1.5 px-4 py-3.5 text-sm">
        <p class="flex items-start gap-1.5 font-bold leading-snug" style="color:${color}">
          <i class="ri-flashlight-fill mt-0.5 flex-none" aria-hidden="true"></i> ${tierCommercialCopy(tier, locality.etaMinutes)}
        </p>
        <p class="pl-[22px] text-xs text-neutral-500">${locality.distanceKm} km desde Barakaldo · urgencias 24h</p>
      </div>
      <div class="flex gap-2 border-t border-neutral-100 px-4 py-3.5">
        <a href="${telLink()}" class="flex-1 rounded-full bg-electric-400 px-3 py-2 text-center text-sm font-extrabold text-neutral-950 no-underline">Llamar</a>
        <a href="https://wa.me/${business.whatsapp}?text=${waMsg}" target="_blank" rel="noopener noreferrer" class="flex-1 rounded-full border border-whatsapp/30 bg-whatsapp/10 px-3 py-2 text-center text-sm font-bold text-whatsapp-600 no-underline">WhatsApp</a>
      </div>
    </div>
  `;
}

// Tooltip de hover: deliberadamente mínimo (nombre + icono "más info"), sin
// autoPan ni frases largas — la ficha completa con Llamar/WhatsApp se
// reserva para el toque/clic explícito sobre el marcador.
function tooltipHtml(locality: Locality) {
  const tier = getResponseTier(locality.etaMinutes);
  const color = TIER_HEX[tier];
  return `
    <div class="flex items-center gap-1.5">
      <span class="h-1.5 w-1.5 flex-none rounded-full" style="background:${color}"></span>
      <span class="font-display text-[13px] font-bold text-neutral-900">${locality.name}</span>
      <i class="ri-information-fill text-[13px] text-neutral-300" aria-hidden="true"></i>
    </div>
  `;
}

function baseTooltipHtml() {
  return `
    <div class="flex items-center gap-1.5">
      <span class="font-display text-[13px] font-bold text-neutral-900">Barakaldo</span>
      <span class="text-[11px] font-semibold text-electric-600">· nuestra base</span>
    </div>
  `;
}

// Beacon del HQ: sin etiqueta de texto permanente (para no tapar los
// marcadores cercanos del área metropolitana); un icono de casa dentro de un
// círculo dorado con anillos de radar lo distingue del resto sin necesidad
// de texto siempre visible. El nombre aparece igual que en el resto, con el
// tooltip al pasar el cursor.
function baseMarkerHtml() {
  return `
    <span class="relative flex h-6 w-6 items-center justify-center">
      <span class="coverage-pulse absolute h-full w-full rounded-full bg-electric-400/60"></span>
      <span class="coverage-pulse coverage-pulse-delay-1 absolute h-full w-full rounded-full bg-electric-400/50"></span>
      <span class="coverage-pulse coverage-pulse-delay-2 absolute h-full w-full rounded-full bg-electric-400/40"></span>
      <span class="relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-electric-400 text-[11px] text-neutral-950 shadow">
        <i class="ri-home-4-fill" aria-hidden="true"></i>
      </span>
    </span>
  `;
}

function markerHtml(color: string) {
  return `<span class="coverage-dot block rounded-full border-2 border-white" style="width:16px;height:16px;background:${color};box-shadow:0 1px 4px rgba(0,0,0,0.35), 0 0 0 4px ${color}33;"></span>`;
}

export default function EuskadiCoverageMap() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const groupsRef = useRef<Partial<Record<Province, L.LayerGroup>>>({});
  const [filter, setFilter] = useState<Province | "Todas">("Todas");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const leaflet = (await import("leaflet")).default;
      if (cancelled || !mapContainerRef.current || mapRef.current) return;

      const base = localities.find((l) => l.slug === BASE_SLUG);
      if (!base) return;
      const points = localities.filter((l) => !EXCLUDED_FROM_MAP.has(l.slug) && l.slug !== BASE_SLUG);
      const euskadiLatLngs = EUSKADI_BOUNDARY.map(([lng, lat]) => [lat, lng] as [number, number]);

      const map = leaflet.map(mapContainerRef.current, {
        scrollWheelZoom: true,
        zoomControl: true,
        minZoom: 8,
        maxZoom: 16,
        maxBoundsViscosity: 0.8,
      });
      mapRef.current = map;

      // Se fija la vista con fitBounds antes de cargar teselas: si primero se
      // asignara un center/zoom fijo, el navegador pediría esas teselas y las
      // cancelaría un instante después al recalcular con fitBounds.
      const bounds = leaflet.latLngBounds([
        [base.geo.lat, base.geo.lng],
        ...points.map((p) => [p.geo.lat, p.geo.lng] as [number, number]),
        ...euskadiLatLngs,
      ]);
      map.fitBounds(bounds, { padding: [28, 28] });
      map.setMaxBounds(bounds.pad(0.6));

      // Mapa real (relieve, carreteras, núcleos de población, agua) en vez de
      // un fondo técnico plano: Esri World Topo Map, gratuito y sin necesidad
      // de token (mismo proveedor que ya se usaba para el gris claro).
      leaflet
        .tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
          attribution:
            'Tiles &copy; <a href="https://www.esri.com" target="_blank" rel="noopener noreferrer">Esri</a> — Esri, HERE, Garmin, FAO, NOAA, USGS, &copy; OpenStreetMap contributors',
          maxZoom: 18,
        })
        .addTo(map);

      // Contorno de Euskadi con trazo grueso y oscuro para que se lea con
      // claridad sobre un mapa real y con color; el anillo exterior gigante
      // atenúa todo lo que no sea la comunidad autónoma, a modo de "foco".
      leaflet
        .polygon([WORLD_RING, euskadiLatLngs], {
          color: "#111827",
          weight: 4,
          opacity: 1,
          fillColor: "#0b1220",
          fillOpacity: 0.4,
          interactive: false,
        })
        .addTo(map);

      leaflet
        .marker([base.geo.lat, base.geo.lng], {
          icon: leaflet.divIcon({ html: baseMarkerHtml(), className: "coverage-marker-base", iconSize: [24, 24] }),
          zIndexOffset: 1000,
        })
        .bindTooltip(baseTooltipHtml(), { direction: "top", offset: [0, -14], className: "coverage-tooltip" })
        .bindPopup(popupHtml(base, true), { className: "coverage-popup", minWidth: 220, autoPanPadding: [24, 24] })
        .addTo(map);

      const groups: Record<Province, L.LayerGroup> = {
        Bizkaia: leaflet.layerGroup(),
        Gipuzkoa: leaflet.layerGroup(),
        Araba: leaflet.layerGroup(),
      };

      points.forEach((p) => {
        const tier = getResponseTier(p.etaMinutes);
        const color = TIER_HEX[tier];

        // Línea de ruta HQ -> municipio: oculta por defecto (opacity 0), se
        // revela al pasar el ratón por el marcador para visualizar en el
        // propio mapa real el desplazamiento desde la base.
        const route = leaflet
          .polyline(
            [
              [base.geo.lat, base.geo.lng],
              [p.geo.lat, p.geo.lng],
            ],
            {
              color,
              weight: 3,
              dashArray: "8 8",
              opacity: 0,
              interactive: false,
              className: "coverage-route",
            }
          )
          .addTo(map);

        const showRoute = () => {
          route.setStyle({ opacity: 1 });
          route.bringToFront();
        };
        const hideRoute = () => route.setStyle({ opacity: 0 });

        const marker = leaflet
          .marker([p.geo.lat, p.geo.lng], {
            icon: leaflet.divIcon({ html: markerHtml(color), className: "coverage-marker", iconSize: [16, 16] }),
          })
          // Hover: solo un tooltip ligero, sin autoPan, para no mover el mapa
          // por cada municipio que se roza con el cursor. La ficha completa
          // (con Llamar / WhatsApp) se reserva para el toque/clic explícito.
          .bindTooltip(tooltipHtml(p), {
            direction: "top",
            offset: [0, -10],
            className: "coverage-tooltip",
          })
          .bindPopup(popupHtml(p, false), { className: "coverage-popup", minWidth: 220, autoPanPadding: [24, 24] });

        marker.on("mouseover", showRoute);
        marker.on("mouseout", hideRoute);
        marker.on("popupopen", showRoute);
        marker.on("popupclose", hideRoute);

        groups[p.province].addLayer(marker);
      });

      Object.values(groups).forEach((g) => g.addTo(map));
      groupsRef.current = groups;
      setReady(true);
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const groups = groupsRef.current;
    if (!map) return;
    PROVINCES.forEach((prov) => {
      const group = groups[prov];
      if (!group) return;
      const shouldShow = filter === "Todas" || filter === prov;
      const isShown = map.hasLayer(group);
      if (shouldShow && !isShown) group.addTo(map);
      if (!shouldShow && isShown) map.removeLayer(group);
    });
  }, [filter, ready]);

  useEffect(() => {
    const onResize = () => mapRef.current?.invalidateSize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {HUD_STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-3.5 py-3.5"
          >
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-electric-50 text-electric-600">
              <i className={`${stat.icon} text-base`} aria-hidden="true"></i>
            </span>
            <div className="min-w-0">
              <p className="font-display text-lg font-extrabold leading-tight text-neutral-900">{stat.value}</p>
              <p className="truncate text-[11px] text-neutral-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-5 mt-5 flex flex-wrap items-center justify-center gap-2">
        {(["Todas", ...PROVINCES] as const).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setFilter(p)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
              filter === p
                ? "bg-electric-400 text-neutral-950"
                : "border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
            }`}
          >
            {p === "Todas" ? "Toda Euskadi" : p}
          </button>
        ))}
      </div>

      {/* isolate: crea un nuevo contexto de apilamiento para que los z-index
          internos de Leaflet (hasta 700 en el popup) no compitan nunca con el
          header fijo (z-50) ni con los botones flotantes de la web. */}
      <div
        ref={mapContainerRef}
        className="relative isolate h-[420px] w-full overflow-hidden rounded-3xl border border-neutral-200 shadow-xl shadow-neutral-900/10 sm:h-[500px] lg:h-[600px]"
      />

      <div className="mt-4 flex gap-2 sm:hidden">
        <a
          href={telLink()}
          className="flex-1 rounded-full bg-electric-400 px-4 py-3 text-center text-sm font-extrabold text-neutral-950"
        >
          Llamar ahora
        </a>
        <a
          href={waLink(WHATSAPP_GREETING_URGENT)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-full border border-whatsapp/30 bg-whatsapp/10 px-4 py-3 text-center text-sm font-bold text-whatsapp-600"
        >
          WhatsApp
        </a>
      </div>

      <p className="mx-auto mt-4 max-w-md text-center text-xs text-neutral-500">
        Pasa el cursor o toca cada municipio para ver distancia, tiempo estimado y contacto directo.
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
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
