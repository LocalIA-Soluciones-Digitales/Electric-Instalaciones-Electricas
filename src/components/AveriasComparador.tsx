import Link from "next/link";
import { telLink, business } from "@/lib/business";

// Mismas categorías e iconos que el asistente de diagnóstico guiado
// (src/lib/leadConfig.ts, INCIDENCES), para que la explicación que ve el
// usuario aquí coincida con la que luego usará al pedir el aviso.
const items = [
  {
    id: "sinluz",
    label: "Me he quedado sin luz",
    icon: "ri-flashlight-line",
    note: "Puede ser un corte general o solo de una zona de la vivienda; a menudo apunta a un diferencial o automático disparado.",
    urgent: false,
  },
  {
    id: "diferencial",
    label: "Salta el diferencial",
    icon: "ri-swap-box-line",
    note: "Indica una fuga de corriente real. Si vuelve a saltar nada más subirlo, no insistas: llama antes de seguir probando.",
    urgent: false,
  },
  {
    id: "automatico",
    label: "Salta el automático",
    icon: "ri-toggle-line",
    note: "Suele ser una sobrecarga de un circuito concreto, sobre todo al enchufar un aparato que consume mucho.",
    urgent: false,
  },
  {
    id: "chispas",
    label: "Hay chispas o cortocircuito",
    icon: "ri-alert-line",
    note: "Riesgo real de incendio: no manipules la instalación, aléjate de la zona y llama de inmediato.",
    urgent: true,
  },
  {
    id: "quemado",
    label: "Huele a quemado",
    icon: "ri-fire-line",
    note: "Señal de sobrecalentamiento en el cableado o el cuadro. Desconecta la zona si puedes hacerlo con seguridad y llama ya.",
    urgent: true,
  },
  {
    id: "iluminacion",
    label: "Parpadea o no enciende la luz",
    icon: "ri-lightbulb-line",
    note: "Normalmente un mecanismo, el propio punto de luz o la bombilla; rara vez afecta a toda la instalación.",
    urgent: false,
  },
  {
    id: "enchufes",
    label: "Enchufe o interruptor sin corriente",
    icon: "ri-plug-line",
    note: "Revísalo antes de seguir usándolo, sobre todo si está suelto o se nota caliente al tacto.",
    urgent: false,
  },
];

export default function AveriasComparador() {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      <div className="grid grid-cols-1 divide-y divide-neutral-100">
        {items.map((it) => (
          <div key={it.id} className="flex items-start gap-4 p-5">
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg ${
                it.urgent ? "bg-red-100 text-red-600" : "bg-electric-100 text-electric-600"
              }`}
            >
              <i className={it.icon} aria-hidden="true"></i>
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-display font-bold text-neutral-900">{it.label}</p>
                {it.urgent && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                    <i className="ri-flashlight-fill text-[10px]" aria-hidden="true"></i> Actúa ya
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-sm text-neutral-600 leading-relaxed">{it.note}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 border-t border-neutral-200 bg-neutral-50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-neutral-600">
          ¿No encuentras lo que te pasa? Nuestro asistente te guía con preguntas sencillas.
        </p>
        <div className="flex shrink-0 gap-2">
          <Link
            href="/#solicitud"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-electric-400 px-5 py-2.5 text-sm font-extrabold text-neutral-950 transition-colors duration-200 hover:bg-electric-300"
          >
            Usar el asistente
          </Link>
          <a
            href={telLink()}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-bold text-neutral-800 transition-colors duration-200 hover:bg-neutral-100"
          >
            {business.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}
