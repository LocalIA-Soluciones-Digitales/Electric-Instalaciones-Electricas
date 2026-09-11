export type Service = {
  slug: string;
  name: string;
  shortName: string;
  /** Etiqueta alternativa para menús de navegación (si no se define, se usa `name`). */
  navLabel?: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  bullets: string[];
  keywords: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "averias-electricas",
    name: "Averías Eléctricas",
    shortName: "Averías",
    metaTitle: "Avería Eléctrica Urgente en Barakaldo y Euskadi",
    metaDescription:
      "Electricista especializado en averías eléctricas a domicilio. Diagnóstico rápido, servicio 24 horas en Barakaldo, Bilbao y toda Euskadi. Llama al 624 64 51 09.",
    h1: "Reparación de Averías Eléctricas 24 Horas",
    intro:
      "¿Se ha quedado sin luz o nota olor a quemado en el cuadro eléctrico? Una avería eléctrica no espera y puede ser peligrosa. En Electric acudimos de urgencia a domicilios y locales de Barakaldo, Bilbao y toda Euskadi para localizar y reparar la avería con garantía de seguridad.",
    bullets: [
      "Diagnóstico de averías eléctricas en vivienda y local comercial",
      "Reparación de cortes de luz repetidos",
      "Localización de derivaciones y fugas de corriente",
      "Servicio de urgencia disponible 24 horas, los 365 días del año",
      "Presupuesto claro antes de intervenir",
    ],
    keywords: ["avería eléctrica", "reparación eléctrica urgente", "corte de luz", "diagnóstico eléctrico"],
    faqs: [
      {
        q: "¿Cuánto tarda un electricista en llegar en caso de avería urgente?",
        a: "En Barakaldo y los municipios cercanos de Bizkaia solemos llegar en menos de 60 minutos desde la llamada, dependiendo de la hora y el tráfico. En el resto de Euskadi (Gipuzkoa y Araba) coordinamos el tiempo de llegada según la zona.",
      },
      {
        q: "¿Trabajáis fuera de horario laboral?",
        a: "Sí, ofrecemos servicio de electricista 24 horas, incluyendo noches, fines de semana y festivos.",
      },
    ],
  },
  {
    slug: "cuadros-electricos",
    name: "Cuadros Eléctricos",
    shortName: "Cuadros eléctricos",
    metaTitle: "Reparación de Cuadros Eléctricos en Euskadi",
    metaDescription:
      "Instalación, ampliación y boletinado de cuadros eléctricos en Barakaldo y en toda Euskadi. Adaptamos tu cuadro a la normativa vigente. Presupuesto sin compromiso.",
    h1: "Instalación y Reparación de Cuadros Eléctricos",
    intro:
      "El cuadro eléctrico es el corazón de la instalación de tu vivienda o local. En Electric instalamos, reparamos y modernizamos cuadros eléctricos en Barakaldo y en toda Euskadi, adaptándolos a la normativa de baja tensión vigente (REBT).",
    bullets: [
      "Instalación de cuadros eléctricos nuevos",
      "Reparación de diferenciales que saltan constantemente",
      "Ampliación de circuitos y diferenciales",
      "Sustitución de cuadros antiguos o inseguros",
      "Boletín y certificado eléctrico (legalización)",
      "Adaptación a normativa REBT",
    ],
    keywords: [
      "cuadro eléctrico",
      "reparación de cuadro eléctrico",
      "diferencial salta",
      "boletín eléctrico",
      "certificado eléctrico",
    ],
    faqs: [
      {
        q: "¿Por qué salta el diferencial constantemente?",
        a: "Puede deberse a una sobrecarga, un electrodoméstico defectuoso o una derivación en la instalación. Hacemos un diagnóstico completo del cuadro para encontrar la causa exacta y reparar el diferencial o sustituirlo si es necesario.",
      },
      {
        q: "¿Necesito boletín eléctrico para reformar mi cuadro?",
        a: "Sí, cualquier modificación relevante del cuadro eléctrico requiere boletín. Nos encargamos de toda la tramitación.",
      },
      {
        q: "¿Es lo mismo el boletín eléctrico que el certificado eléctrico?",
        a: "Sí, boletín eléctrico y certificado eléctrico son dos nombres para el mismo documento (el Certificado de Instalación Eléctrica exigido por el REBT). En Electric lo tramitamos lo llames como lo llames.",
      },
    ],
  },
  {
    slug: "cortocircuitos",
    name: "Cortocircuitos",
    shortName: "Cortocircuitos",
    metaTitle: "Reparación de Cortocircuitos en Barakaldo",
    metaDescription:
      "¿Cortocircuito en casa? Electricista urgente en Barakaldo y toda Euskadi para localizar y reparar cortocircuitos con seguridad. Servicio 24h.",
    h1: "Reparación Urgente de Cortocircuitos",
    intro:
      "Un cortocircuito en casa puede provocar desde un simple corte de luz hasta un riesgo real de incendio. En Electric localizamos el origen del cortocircuito y lo reparamos con seguridad, en Barakaldo, Bilbao y toda Euskadi.",
    bullets: [
      "Localización precisa del cortocircuito",
      "Reparación de cableado dañado",
      "Revisión de enchufes, mecanismos y luminarias",
      "Servicio de urgencia 24 horas",
      "Informe de la incidencia y recomendaciones",
    ],
    keywords: ["cortocircuito casa", "reparación cortocircuito", "diferencial salta"],
    faqs: [
      {
        q: "¿Es peligroso un cortocircuito?",
        a: "Sí, puede generar calentamiento del cableado y riesgo de incendio. Recomendamos desconectar el circuito afectado y llamar a un electricista de inmediato.",
      },
    ],
  },
  {
    slug: "iluminacion-led",
    name: "Iluminación LED",
    shortName: "Iluminación LED",
    navLabel: "Iluminación",
    metaTitle: "Instalación de Iluminación LED en Euskadi",
    metaDescription:
      "Diseño e instalación de iluminación LED eficiente para viviendas, locales y comercios en Barakaldo y en toda Euskadi. Ahorra en tu factura de luz.",
    h1: "Instalación de Iluminación LED",
    intro:
      "Renovamos la iluminación de tu vivienda, local o comercio con soluciones LED eficientes que reducen el consumo eléctrico sin perder calidad de luz.",
    bullets: [
      "Sustitución de fluorescentes por paneles LED",
      "Iluminación decorativa y funcional",
      "Instalación de focos empotrables y tiras LED",
      "Estudio de eficiencia energética",
      "Iluminación para escaparates y comercios",
    ],
    keywords: ["iluminación led", "instalación eléctrica vivienda"],
    faqs: [
      {
        q: "¿Cuánto se ahorra al pasar a iluminación LED?",
        a: "El ahorro habitual está entre un 60% y un 80% de consumo respecto a iluminación convencional, dependiendo del punto de partida.",
      },
    ],
  },
  {
    slug: "instalaciones-electricas",
    name: "Instalaciones Eléctricas",
    shortName: "Instalaciones",
    metaTitle: "Instalaciones Eléctricas en Barakaldo y Euskadi",
    metaDescription:
      "Instalaciones eléctricas completas para vivienda nueva, reforma o local comercial en Barakaldo y en toda Euskadi. Presupuesto sin compromiso.",
    h1: "Instalaciones Eléctricas en Viviendas y Locales",
    intro:
      "Realizamos instalaciones eléctricas completas para obra nueva, reformas integrales y locales comerciales en Barakaldo y en toda Euskadi, cumpliendo con el Reglamento Electrotécnico de Baja Tensión.",
    bullets: [
      "Instalación eléctrica de vivienda nueva",
      "Instalación eléctrica en reformas integrales",
      "Instalaciones para locales y comercios",
      "Certificado de instalación eléctrica (boletín)",
      "Adaptación a normativa vigente",
    ],
    keywords: ["instalación eléctrica vivienda", "electricista bizkaia", "certificado eléctrico"],
    faqs: [
      {
        q: "¿Cuánto tarda una instalación eléctrica completa de una vivienda?",
        a: "Depende de los metros cuadrados y el estado de partida, pero una vivienda estándar suele completarse entre 3 y 7 días laborables.",
      },
    ],
  },
  {
    slug: "reparaciones-electricas",
    name: "Reparaciones Eléctricas",
    shortName: "Reparaciones",
    metaTitle: "Reparaciones Eléctricas a Domicilio en Euskadi",
    metaDescription:
      "Reparación eléctrica a domicilio: enchufes, interruptores, cuadros, averías. Electricista de confianza en Barakaldo, Bilbao y toda Euskadi.",
    h1: "Reparaciones Eléctricas a Domicilio",
    intro:
      "Desde un enchufe que no funciona hasta una reforma parcial de la instalación: reparamos cualquier incidencia eléctrica en tu vivienda o local, en Barakaldo y toda Euskadi.",
    bullets: [
      "Reparación de enchufes e interruptores",
      "Sustitución de mecanismos y puntos de luz",
      "Revisión y reparación de instalaciones antiguas",
      "Mantenimiento eléctrico preventivo",
      "Atención rápida y económica",
    ],
    keywords: ["reparación eléctrica domicilio", "electricista económico"],
    faqs: [
      {
        q: "¿Hacéis reparaciones pequeñas o solo trabajos grandes?",
        a: "Atendemos cualquier tipo de reparación, por pequeña que sea: un enchufe, un interruptor o un punto de luz.",
      },
    ],
  },
  {
    slug: "electricista-urgente-24h",
    name: "Electricista Urgente 24 Horas",
    shortName: "Urgencias 24h",
    metaTitle: "Electricista Urgente 24 Horas en Euskadi",
    metaDescription:
      "Electricista urgente disponible 24 horas, los 365 días del año, en Barakaldo, Bilbao y toda Euskadi. Llama ahora al 624 64 51 09.",
    h1: "Electricista Urgente 24 Horas en Euskadi",
    intro:
      "Cortes de luz, cortocircuitos, olor a quemado o un diferencial que no deja de saltar: en Electric ofrecemos servicio de electricista urgente 24 horas en Barakaldo y toda Euskadi, también noches, fines de semana y festivos.",
    bullets: [
      "Atención inmediata las 24 horas del día",
      "Cobertura en Barakaldo, Bilbao y toda Euskadi",
      "Desplazamiento rápido a domicilio",
      "Presupuesto antes de intervenir, sin sorpresas",
      "Contacto directo por WhatsApp o llamada",
    ],
    keywords: ["electricista urgente", "electricista 24 horas", "electricista cerca de mí"],
    faqs: [
      {
        q: "¿El servicio urgente tiene recargo nocturno?",
        a: "Te informamos siempre del precio antes de intervenir, sin sorpresas en la factura, también en horario nocturno o festivo.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
