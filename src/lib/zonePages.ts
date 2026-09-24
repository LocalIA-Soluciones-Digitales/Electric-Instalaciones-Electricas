/**
 * Municipios con página propia en /zonas-de-servicio/[slug]. Solo se crean para
 * los municipios cercanos con demanda real en Search Console, con contenido
 * específico de cada zona (barrios, accesos, dudas habituales), no una plantilla
 * con el nombre cambiado. Barakaldo tiene su propia página estática.
 */
export type ZonePage = {
  /** Debe coincidir con un slug de localities.ts. */
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  intro: string;
  bullets: string[];
  relatedServiceSlugs: string[];
  faqs: { q: string; a: string }[];
};

export const zonePages: ZonePage[] = [
  {
    slug: "bilbao",
    name: "Bilbao",
    metaTitle: "Electricista en Bilbao 24 Horas | Urgencias y Averías",
    metaDescription:
      "Electricista urgente en Bilbao 24 horas: cortes de luz, averías, cuadros eléctricos y boletines en Deusto, Indautxu, Abando, Rekalde, Basurto, Santutxu y Zorrotza. Llama al 677 24 63 74.",
    title: "Electricista en Bilbao 24 Horas",
    subtitle:
      "Salimos desde Barakaldo, a unos 10-15 minutos de Bilbao. Atendemos cortes de luz, averías y cuadros eléctricos en todos los distritos de la ciudad, también de noche y en festivos.",
    intro:
      "Damos servicio de electricista en todo Bilbao: Deusto, Indautxu, Abando, Rekalde, Basurto, San Ignacio, Santutxu, Txurdinaga, el Casco Viejo y Zorrotza, que linda con Barakaldo. En Bilbao hay muchos edificios antiguos, en el Ensanche, el Casco Viejo o Bilbao La Vieja, con instalaciones eléctricas que llevan décadas sin renovarse y que no aguantan el consumo actual de una vivienda. Es la causa de muchos de los diferenciales que saltan y de los cortes de luz repetidos que atendemos en la ciudad.",
    bullets: [
      "A unos 10-15 minutos desde nuestra base en Barakaldo",
      "Cobertura en todos los distritos de Bilbao",
      "Cortes de luz, apagones y diferenciales que saltan",
      "Actualización de instalaciones antiguas y boletín eléctrico",
      "Servicio urgente 24 horas, los 365 días del año",
    ],
    relatedServiceSlugs: ["electricista-urgente-24h", "averias-electricas", "boletin-electrico", "cuadros-electricos"],
    faqs: [
      {
        q: "¿Cuánto tardáis en llegar a Bilbao?",
        a: "Desde nuestra base en Barakaldo solemos llegar a Bilbao en unos 15-30 minutos, según el distrito y el tráfico. A Zorrotza, Basurto y Rekalde es a donde antes llegamos.",
      },
      {
        q: "Hay un corte de luz en Bilbao, ¿qué hago?",
        a: "Comprueba primero si tus vecinos y la calle tienen luz. Si el corte es general, es una incidencia de la red y hay que avisar a la distribuidora (en Bilbao es i-DE, de Iberdrola) en el teléfono de averías de tu factura. Si solo te falta la luz a ti, revisa el cuadro eléctrico, y si no se soluciona, llámanos y vamos de urgencia.",
      },
      {
        q: "Vivo en un edificio antiguo de Bilbao, ¿necesito renovar la instalación?",
        a: "Si tu instalación no tiene diferencial, el cableado es de tela o el cuadro se calienta, conviene revisarla. Te hacemos una revisión y un presupuesto cerrado para actualizarla por partes o completa.",
      },
      {
        q: "¿Tramitáis el boletín eléctrico en Bilbao?",
        a: "Sí. Revisamos la instalación y tramitamos el Certificado de Instalación Eléctrica para dar de alta la luz, subir la potencia o abrir un local en Bilbao.",
      },
    ],
  },
  {
    slug: "getxo",
    name: "Getxo",
    metaTitle: "Electricista en Getxo y Algorta 24 Horas",
    metaDescription:
      "Electricista en Getxo 24 horas: Algorta, Las Arenas (Areeta), Neguri, Romo y Andra Mari. Averías urgentes, chalets y locales. Llama al 677 24 63 74.",
    title: "Electricista en Getxo y Algorta",
    subtitle:
      "Cruzamos desde Barakaldo por el puente de Rontegi y llegamos a Getxo en unos 20 minutos. Trabajamos en pisos, chalets y locales de todos sus barrios.",
    intro:
      "Damos servicio de electricista en todo Getxo: Algorta, Las Arenas (Areeta), Neguri, Romo, Andra Mari y el Puerto Viejo de Algorta. En Getxo hay muchas viviendas unifamiliares y chalets, con instalaciones más grandes que las de un piso: varios cuadros, jardín, garaje, bombas o portones automáticos. Por eso hacemos muchas revisiones completas, ampliaciones de potencia y reparaciones de líneas exteriores que se deterioran con la humedad del litoral.",
    bullets: [
      "A unos 20 minutos desde Barakaldo por el puente de Rontegi",
      "Algorta, Las Arenas, Neguri, Romo y Andra Mari",
      "Chalets y unifamiliares: cuadros, líneas exteriores y garajes",
      "Averías urgentes 24 horas, también en fin de semana",
      "Presupuesto claro antes de intervenir",
    ],
    relatedServiceSlugs: ["electricista-urgente-24h", "averias-electricas", "instalaciones-electricas", "iluminacion-led"],
    faqs: [
      {
        q: "¿Dais servicio en Algorta?",
        a: "Sí. Algorta es la zona de Getxo desde la que más nos llaman. También vamos a Las Arenas, Neguri, Romo y Andra Mari.",
      },
      {
        q: "¿Cuánto tardáis en llegar a Getxo?",
        a: "Unos 20 minutos desde nuestra base en Barakaldo, cruzando la ría por el puente de Rontegi, según el tráfico y la zona de Getxo.",
      },
      {
        q: "Tengo un chalet y el diferencial salta cuando llueve, ¿qué puede ser?",
        a: "Suele ser humedad en una línea o un punto de luz exterior: focos de jardín, enchufes de terraza o la alimentación de un portón o bomba. Se localiza midiendo el aislamiento de cada circuito, y después se repara solo la parte afectada.",
      },
      {
        q: "¿Hacéis instalaciones eléctricas completas en Getxo?",
        a: "Sí, en pisos, chalets y locales: instalación nueva, reformas, cambio de cuadro y boletín eléctrico cuando hace falta.",
      },
    ],
  },
  {
    slug: "portugalete",
    name: "Portugalete",
    metaTitle: "Electricista en Portugalete 24 Horas | Urgencias",
    metaDescription:
      "Electricista urgente en Portugalete 24 horas, a unos 8 minutos de Barakaldo. Averías, cortes de luz y boletín eléctrico en el Casco Histórico, Repélega, Buenavista y Abatxolo. Llama al 677 24 63 74.",
    title: "Electricista en Portugalete 24 Horas",
    subtitle:
      "Portugalete está a unos 8 minutos de nuestra base en Barakaldo, así que es de los municipios donde antes llegamos ante una urgencia.",
    intro:
      "Somos electricistas de la margen izquierda y Portugalete es una de las zonas donde más trabajamos. Damos servicio en el Casco Histórico, junto al Puente Bizkaia y la basílica de Santa María, y en Repélega, Buenavista, Abatxolo y el resto de barrios. En el casco antiguo y en los bloques de viviendas de los años 60 y 70 es habitual encontrar cuadros sin actualizar y potencias que se quedan cortas, así que muchos avisos acaban en un cambio de cuadro o en un boletín para subir la potencia.",
    bullets: [
      "A unos 8 minutos desde Barakaldo",
      "Casco Histórico, Repélega, Buenavista y Abatxolo",
      "Averías urgentes y cortes de luz 24 horas",
      "Cambio de cuadro y boletín eléctrico para subir la potencia",
      "Comunidades de vecinos y locales comerciales",
    ],
    relatedServiceSlugs: ["electricista-urgente-24h", "averias-electricas", "boletin-electrico", "cuadros-electricos"],
    faqs: [
      {
        q: "¿Cuánto tardáis en llegar a Portugalete?",
        a: "Estamos a unos 8 minutos desde nuestra base en Barakaldo, así que en una urgencia solemos llegar en menos de 30 minutos a cualquier barrio de Portugalete.",
      },
      {
        q: "¿Tramitáis el boletín eléctrico en Portugalete?",
        a: "Sí. Revisamos la instalación, la adaptamos si hace falta y tramitamos el Certificado de Instalación Eléctrica para alta de luz, aumento de potencia o apertura de local.",
      },
      {
        q: "¿Trabajáis con comunidades de vecinos?",
        a: "Sí. Reparamos averías en zonas comunes (portal, escalera, garaje) y revisamos centralizaciones de contadores y líneas generales en edificios de Portugalete.",
      },
      {
        q: "¿Atendéis de noche y en festivos?",
        a: "Sí, el servicio de electricista urgente en Portugalete funciona las 24 horas, los 365 días del año.",
      },
    ],
  },
  {
    slug: "santurtzi",
    name: "Santurtzi",
    metaTitle: "Electricista en Santurtzi 24 Horas | Urgencias",
    metaDescription:
      "Electricista urgente en Santurtzi 24 horas, a unos 10 minutos de Barakaldo. Averías, cortes de luz y cuadros eléctricos en el centro, Mamariga, Kabiezes y la zona del puerto. Llama al 677 24 63 74.",
    title: "Electricista en Santurtzi 24 Horas",
    subtitle:
      "Salimos desde Barakaldo y llegamos a Santurtzi en unos 10 minutos. Atendemos viviendas, comunidades y locales de todo el municipio.",
    intro:
      "Damos servicio de electricista en todo Santurtzi: el centro, Mamariga, Kabiezes y la zona del puerto pesquero. Trabajamos en pisos, comunidades de vecinos y locales de hostelería y comercio. En los locales, sobre todo en los de hostelería, las averías suelen venir de cuadros al límite de potencia, cocinas y cámaras que hacen saltar las protecciones o líneas que se han quedado pequeñas.",
    bullets: [
      "A unos 10 minutos desde Barakaldo",
      "Centro, Mamariga, Kabiezes y zona del puerto",
      "Averías urgentes y cortes de luz 24 horas",
      "Locales de hostelería y comercio: cuadros y ampliaciones",
      "Presupuesto claro antes de intervenir",
    ],
    relatedServiceSlugs: ["electricista-urgente-24h", "averias-electricas", "cortocircuitos", "instalaciones-electricas"],
    faqs: [
      {
        q: "¿Cuánto tardáis en llegar a Santurtzi?",
        a: "Unos 10 minutos desde nuestra base en Barakaldo. En una urgencia solemos llegar en menos de 30 minutos a cualquier zona de Santurtzi.",
      },
      {
        q: "Tengo un bar en Santurtzi y salta el general en hora punta, ¿qué puede ser?",
        a: "Suele ser que el local tiene más consumo del que soportan la potencia contratada o las protecciones del cuadro, por ejemplo cuando coinciden la plancha, el horno y las cámaras. Lo revisamos, repartimos las cargas y, si hace falta, tramitamos el aumento de potencia con su boletín.",
      },
      {
        q: "¿Trabajáis también en Kabiezes y Mamariga?",
        a: "Sí, damos servicio en todos los barrios de Santurtzi, incluidos Kabiezes y Mamariga.",
      },
      {
        q: "¿Atendéis de noche y en festivos?",
        a: "Sí, el servicio de electricista urgente en Santurtzi funciona las 24 horas, los 365 días del año.",
      },
    ],
  },
];

export function getZonePage(slug: string) {
  return zonePages.find((z) => z.slug === slug);
}
