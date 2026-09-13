// Diagrama abstracto de cobertura (no es un mapa geográfico literal, tal
// como pide el brief): una "constelación" de puntos reales conectados a
// Barakaldo como base, puramente decorativa. Los enlaces reales a cada
// localidad viven en la lista de texto que acompaña a este SVG, no aquí.
const POINTS = [
  { x: 55, y: 150, r: 5, label: "Barakaldo" },
  { x: 92, y: 118, r: 3, label: "Bilbao" },
  { x: 22, y: 168, r: 3, label: "Getxo" },
  { x: 38, y: 205, r: 3, label: "Portugalete" },
  { x: 58, y: 218, r: 3, label: "Santurtzi" },
  { x: 108, y: 88, r: 3, label: "Basauri" },
  { x: 145, y: 55, r: 3, label: "Durango" },
  { x: 258, y: 92, r: 4, label: "Donostia" },
  { x: 195, y: 222, r: 4, label: "Vitoria-Gasteiz" },
];

export default function CoverageMap() {
  const hub = POINTS[0];
  return (
    <svg viewBox="0 0 300 260" className="h-auto w-full max-w-sm" aria-hidden="true">
      {POINTS.slice(1).map((p) => (
        <line
          key={p.label}
          x1={hub.x}
          y1={hub.y}
          x2={p.x}
          y2={p.y}
          stroke="currentColor"
          strokeOpacity="0.18"
          strokeWidth="1"
        />
      ))}
      {POINTS.map((p) => (
        <circle key={p.label} cx={p.x} cy={p.y} r={p.r} fill="currentColor" />
      ))}
    </svg>
  );
}
