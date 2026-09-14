import Link from "next/link";
import { localities, type Locality } from "@/lib/localities";

// Cruces se omite del mapa: es un barrio de Barakaldo con coordenadas casi
// idénticas a las del propio municipio (ver el mismo criterio en la sección
// de cobertura de la home, HOME_ZONE_EXCLUDE en src/app/page.tsx).
const EXCLUDED_FROM_MAP = new Set(["cruces"]);

const mapLocalities = localities.filter((l) => l.province === "Bizkaia" && !EXCLUDED_FROM_MAP.has(l.slug));

const W = 420;
const H = 320;
const PAD = 40;

function project(points: Locality[]) {
  const lats = points.map((p) => p.geo.lat);
  const lngs = points.map((p) => p.geo.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  // Proyección equirectangular con corrección por coseno de la latitud media:
  // a esta latitud, un grado de longitud equivale a menos distancia real que
  // un grado de latitud, así que sin corregir el mapa saldría "ensanchado".
  const latMidRad = ((minLat + maxLat) / 2) * (Math.PI / 180);
  const cos = Math.cos(latMidRad);
  const spanX = (maxLng - minLng) * cos || 1;
  const spanY = maxLat - minLat || 1;

  const innerW = W - PAD * 2;
  const innerH = H - PAD * 2;
  const scale = Math.min(innerW / spanX, innerH / spanY);
  const offsetX = PAD + (innerW - spanX * scale) / 2;
  const offsetY = PAD + (innerH - spanY * scale) / 2;

  return points.map((p) => ({
    ...p,
    x: offsetX + (p.geo.lng - minLng) * cos * scale,
    y: offsetY + (maxLat - p.geo.lat) * scale,
  }));
}

export default function CoverageMap() {
  const points = project(mapLocalities);
  const base = points.find((p) => p.slug === "barakaldo");
  const others = points.filter((p) => p.slug !== "barakaldo");
  const otherProvinces = localities.filter((l) => l.province !== "Bizkaia");

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full max-w-xl mx-auto text-neutral-200">
        <title>Mapa de municipios de Bizkaia donde trabajamos, con base en Barakaldo</title>

        {base &&
          others.map((p) => (
            <line key={`l-${p.slug}`} x1={base.x} y1={base.y} x2={p.x} y2={p.y} stroke="currentColor" strokeWidth={1} />
          ))}

        {others.map((p) => (
          <a key={p.slug} href={`/electricista-${p.slug}`} className="group cursor-pointer">
            <title>{`Electricista en ${p.name}`}</title>
            <circle
              cx={p.x}
              cy={p.y}
              r={6}
              strokeWidth={2}
              className="fill-white stroke-electric-500 transition-colors duration-200 group-hover:fill-electric-400"
            />
          </a>
        ))}

        {base && (
          <a href={`/electricista-${base.slug}`} className="group cursor-pointer">
            <title>Electricista en Barakaldo (nuestra base)</title>
            <circle cx={base.x} cy={base.y} r={12} className="fill-none stroke-electric-400/40" strokeWidth={1.5} />
            <circle
              cx={base.x}
              cy={base.y}
              r={6.5}
              strokeWidth={2}
              className="fill-electric-400 stroke-neutral-900 transition-colors duration-200 group-hover:fill-electric-300"
            />
            <text x={base.x} y={base.y + 27} textAnchor="middle" className="fill-neutral-900 text-[11px] font-extrabold">
              Barakaldo · base
            </text>
          </a>
        )}
      </svg>

      <p className="mx-auto -mt-1 max-w-md text-center text-[11px] text-neutral-400">
        Pasa el cursor o toca cada punto para ver el municipio; toda la lista está debajo.
      </p>

      <p className="mx-auto mt-4 max-w-md text-center text-xs text-neutral-500">
        Y también en el resto de {otherProvinces[0]?.province} y {otherProvinces[1]?.province}:{" "}
        {otherProvinces.map((l, i) => (
          <span key={l.slug}>
            <Link href={`/electricista-${l.slug}`} className="font-semibold text-electric-600 hover:underline">
              {l.name}
            </Link>
            {i < otherProvinces.length - 1 ? " · " : ""}
          </span>
        ))}
      </p>
    </div>
  );
}
