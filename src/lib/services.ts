export type Service = {
  slug: string;
  name: string;
  shortName: string;
  /** Etiqueta alternativa para menús de navegación (si no se define, se usa `name`). */
  navLabel?: string;
  /** Icono remixicon representativo del servicio, usado en listados y tarjetas. */
  icon: string;
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
    icon: "ri-alarm-warning-line",
    // "apagon barakaldo" llega a esta página (top 10 en móvil) sin ningún clic:
    // el título no decía ni "apagón" ni "sin luz".
    metaTitle: "Apagón o Avería Eléctrica en Casa: Urgente 24h en Barakaldo",
    metaDescription:
      "¿Te has quedado sin luz o salta el diferencial? Electricista urgente 24 h en Barakaldo, Bilbao y toda Euskadi. Llegamos rápido y te damos el precio antes. Llama al 624 64 51 09.",
    h1: "Reparación de Averías Eléctricas 24 Horas",
    intro:
      "¿Se ha quedado sin luz por un apagón o nota olor a quemado en el cuadro eléctrico? Una avería eléctrica no espera y puede ser peligrosa. En Electric acudimos de urgencia a domicilios y locales de Barakaldo, Bilbao y toda Euskadi para localizar y reparar la avería con garantía de seguridad.",
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
      {
        q: "¿Qué hago si hay un apagón en mi vivienda?",
        a: "Si el apagón afecta solo a tu vivienda o local (no a todo el edificio o la calle), suele ser una avería en tu instalación: revisa primero el cuadro eléctrico por si ha saltado el interruptor general o el diferencial. Si no consigues restablecer la luz o el apagón se repite, llámanos y acudimos de urgencia a Barakaldo, Bilbao y toda Euskadi.",
      },
    ],
  },
  {
    slug: "cuadros-electricos",
    name: "Cuadros Eléctricos",
    shortName: "Cuadros eléctricos",
    icon: "ri-server-line",
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
    icon: "ri-fire-line",
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
    icon: "ri-lightbulb-flash-line",
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
    icon: "ri-plug-line",
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
    icon: "ri-tools-line",
    // Enfocada en trabajos pequeños y planificados (no urgencias) para que no
    // compita con /servicios/averias-electricas: Google la rastreó y no la
    // indexó por parecerse demasiado a esa.
    metaTitle: "Pequeñas Reparaciones Eléctricas en Casa | Barakaldo y Bizkaia",
    metaDescription:
      "Enchufes que no funcionan, interruptores rotos, lámparas por colgar o un punto de luz nuevo: hacemos esas pequeñas reparaciones eléctricas en Barakaldo, Bilbao y Bizkaia. Precio antes de ir.",
    h1: "Pequeñas Reparaciones Eléctricas en Casa",
    intro:
      "Ese enchufe que dejó de funcionar, el interruptor que hace falso contacto, la lámpara que lleva meses en la caja o el enchufe que te falta junto a la cama. Son trabajos pequeños que muchos electricistas no quieren coger, y nosotros sí. Juntamos varios arreglos en una misma visita para que te salga a cuenta, en Barakaldo, Bilbao y toda Bizkaia.",
    bullets: [
      "Enchufes que no funcionan, flojos o quemados",
      "Interruptores y conmutadores que fallan o hacen falso contacto",
      "Colgar lámparas y plafones, y cambiar puntos de luz",
      "Añadir enchufes nuevos o tomas para horno, vitro o lavadora",
      "Cambio de mecanismos antiguos por modernos",
      "Timbres que no suenan",
    ],
    keywords: ["pequeñas reparaciones eléctricas", "reparación eléctrica domicilio", "cambiar enchufe", "instalar lámpara", "electricista para trabajos pequeños"],
    faqs: [
      {
        q: "¿Venís por un trabajo pequeño, como cambiar un enchufe?",
        a: "Sí. Atendemos cualquier reparación por pequeña que sea. Si tienes varias cosas pendientes (un enchufe, una lámpara, un interruptor), dínoslo y lo hacemos todo en la misma visita para que te salga más a cuenta.",
      },
      {
        q: "¿Cuánto cuesta cambiar un enchufe o colgar una lámpara?",
        a: "Depende de cuántos trabajos sean y de si hay que pasar cable nuevo. Mándanos una foto por WhatsApp y te damos el precio cerrado antes de ir.",
      },
      {
        q: "Un enchufe se ha quemado o huele a quemado, ¿es urgente?",
        a: "Sí. Deja de usarlo, baja el magnetotérmico de ese circuito en el cuadro y llámanos. Un enchufe quemado suele ser una conexión floja que se calienta, y puede volver a pasar en otros puntos de la misma línea.",
      },
      {
        q: "¿Puedo añadir un enchufe donde no lo hay?",
        a: "Sí. Normalmente se saca de una línea cercana. Si es para un aparato potente (horno, vitrocerámica, aire acondicionado), lo hacemos con una línea propia desde el cuadro para que no salten las protecciones.",
      },
    ],
  },
  {
    slug: "boletin-electrico",
    name: "Boletín Eléctrico",
    shortName: "Boletín eléctrico",
    icon: "ri-file-list-3-line",
    metaTitle: "Boletín Eléctrico en Barakaldo, Bilbao y Bizkaia",
    metaDescription:
      "Tramitamos el boletín eléctrico (Certificado de Instalación Eléctrica) para alta de luz, aumento de potencia, reformas y locales en Barakaldo, Bilbao y toda Euskadi. Presupuesto cerrado.",
    h1: "Boletín Eléctrico y Certificado de Instalación",
    intro:
      "¿Necesitas el boletín eléctrico para dar de alta la luz, subir la potencia o abrir un local? En Electric revisamos tu instalación, la adaptamos a normativa si hace falta y tramitamos el Certificado de Instalación Eléctrica (CIE) como instaladores autorizados en Barakaldo, Bilbao, Portugalete, Getxo y toda Euskadi.",
    bullets: [
      "Boletín para alta de suministro en vivienda nueva o sin luz",
      "Boletín para aumento de potencia contratada",
      "Certificado tras reforma eléctrica o cambio de cuadro",
      "Boletín para locales comerciales y apertura de actividad",
      "Revisión previa y presupuesto cerrado antes de tramitar",
    ],
    keywords: ["boletín eléctrico", "certificado de instalación eléctrica", "CIE", "boletín de luz", "aumento de potencia"],
    faqs: [
      {
        q: "¿Qué es el boletín eléctrico?",
        a: "Es el nombre que se usa normalmente para el Certificado de Instalación Eléctrica (CIE): el documento que firma un instalador autorizado para certificar que la instalación cumple el Reglamento Electrotécnico de Baja Tensión. La distribuidora lo pide para dar de alta la luz o subir la potencia.",
      },
      {
        q: "¿Cuándo necesito un boletín eléctrico?",
        a: "Para dar de alta la luz en una vivienda o local, para aumentar la potencia contratada cuando la instalación no la tiene certificada, tras una reforma eléctrica importante y para abrir un local comercial.",
      },
      {
        q: "¿Cuánto tarda en tramitarse?",
        a: "Si la instalación ya cumple la normativa, la revisión y la emisión del certificado se hacen en pocos días. Si hay que adaptar antes el cuadro o parte del cableado, te lo indicamos en el presupuesto junto con el plazo.",
      },
      {
        q: "¿Tramitáis el boletín en toda Euskadi?",
        a: "Sí. Tenemos la base en Barakaldo y lo tramitamos en Bilbao, Portugalete, Getxo, Santurtzi y el resto de Bizkaia, y también en Gipuzkoa y Álava.",
      },
    ],
  },
  {
    slug: "electricista-urgente-24h",
    name: "Electricista Urgente 24 Horas",
    shortName: "Urgencias 24h",
    icon: "ri-24-hours-line",
    // "electricista urgente" es la consulta con más impresiones en móvil
    // (pos ~18) y esta página estaba en ~33 con muy poco contenido propio.
    metaTitle: "Electricista Urgente 24h en Bizkaia: Barakaldo, Bilbao y alrededores",
    metaDescription:
      "¿Sin luz, olor a quemado o salta el diferencial? Electricista urgente 24 h, también de noche y en festivos. A Barakaldo llegamos en menos de 30 min. Precio antes de ir. Llama al 624 64 51 09.",
    h1: "Electricista Urgente 24 Horas en Bizkaia",
    intro:
      "Cortes de luz, cortocircuitos, olor a quemado o un diferencial que no deja de saltar. Salimos desde nuestro local de Cruces (Barakaldo) las 24 horas, también de noche, en fin de semana y en festivos. Por teléfono o WhatsApp te decimos qué hacer mientras llegamos, cuánto vamos a tardar y el precio antes de salir.",
    bullets: [
      "Barakaldo: menos de 30 minutos",
      "Portugalete, Sestao y Santurtzi: unos 10 minutos",
      "Bilbao: 15-30 minutos según el distrito",
      "Getxo y Basauri: unos 20 minutos",
      "Gipuzkoa y Álava: te confirmamos la hora de llegada al llamar",
      "Precio antes de salir, también de noche y en festivos",
    ],
    keywords: ["electricista urgente", "electricista 24 horas", "electricista de urgencia", "electricista cerca de mí", "electricista urgente barakaldo", "electricista urgente bilbao"],
    faqs: [
      {
        q: "¿Cuánto tardáis en llegar en una urgencia?",
        a: "Depende de la zona y la hora. A Barakaldo solemos llegar en menos de 30 minutos y a Portugalete, Sestao o Santurtzi en unos 10 minutos de trayecto. A Bilbao, Getxo o Basauri, entre 15 y 30. Al llamar te damos una hora aproximada.",
      },
      {
        q: "¿Qué cuenta como una urgencia eléctrica?",
        a: "Olor a quemado, chispas o humo en el cuadro o en un enchufe; un diferencial que salta nada más subirlo; quedarte sin luz en casa cuando los vecinos sí tienen, o agua cerca de la instalación eléctrica. En esos casos no conviene esperar al día siguiente.",
      },
      {
        q: "¿Qué hago mientras llegáis?",
        a: "Si hay olor a quemado, humo o agua, baja el interruptor general del cuadro y no toques los enchufes ni los aparatos afectados. Si solo ha saltado el diferencial, desenchufa lo que estaba funcionando y no lo subas una y otra vez. Y si falta la luz en toda la calle, es un corte de la distribuidora, no de tu instalación.",
      },
      {
        q: "¿El servicio urgente tiene recargo nocturno?",
        a: "Te decimos siempre el precio antes de salir, también de noche, en fin de semana o en festivo, para que no haya sorpresas en la factura.",
      },
      {
        q: "¿Atendéis urgencias fuera de Bizkaia?",
        a: "Sí, también en Gipuzkoa y Álava. Por la distancia, al llamar te confirmamos a qué hora podemos estar.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
