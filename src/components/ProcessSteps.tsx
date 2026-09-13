import Reveal from "@/components/Reveal";

const STEPS = [
  { n: "01", title: "Cuéntanos qué ocurre" },
  { n: "02", title: "Valoramos la intervención" },
  { n: "03", title: "Te damos un presupuesto claro" },
  { n: "04", title: "Realizamos el trabajo" },
  { n: "05", title: "Dejamos la instalación lista" },
];

export default function ProcessSteps() {
  return (
    <section className="bg-ink py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <div className="inline-flex items-center gap-2">
            <span className="h-px w-5 bg-electric-400"></span>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-electric-400">
              Así trabajamos
            </span>
          </div>
        </Reveal>

        <div className="relative mt-12 grid grid-cols-1 gap-y-8 sm:grid-cols-5 sm:gap-x-4">
          <div className="absolute left-0 right-0 top-4 hidden h-px bg-white/10 sm:block" aria-hidden="true"></div>
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <span className="relative z-10 mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-electric-400/40 bg-ink text-xs font-bold text-electric-400">
                {s.n}
              </span>
              <p className="max-w-[10rem] text-sm font-semibold leading-snug text-offwhite">{s.title}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
