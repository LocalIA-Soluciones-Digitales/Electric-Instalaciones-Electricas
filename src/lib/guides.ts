export type GuideSection = { heading: string; paragraphs: string[] };

export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  relatedServiceSlug: string;
  sections: GuideSection[];
  faqs?: { q: string; a: string }[];
};

export const guides: Guide[] = [
  {
    slug: "por-que-salta-el-diferencial",
    title: "Por qué salta el diferencial y qué hacer",
    metaTitle: "Por Qué Salta el Diferencial: Causas y Soluciones",
    metaDescription:
      "¿El diferencial de tu cuadro eléctrico se dispara a menudo? Te explicamos las causas más habituales y cuándo conviene llamar a un electricista en Barakaldo y en toda Euskadi.",
    excerpt:
      "El diferencial que salta una y otra vez no es un capricho del cuadro eléctrico: casi siempre avisa de algo concreto. Repasamos las causas más frecuentes y cuándo hay que dejar de reintentarlo.",
    relatedServiceSlug: "cuadros-electricos",
    sections: [
      {
        heading: "Qué función cumple el diferencial",
        paragraphs: [
          "El interruptor diferencial es el elemento de tu cuadro eléctrico que corta la corriente cuando detecta una fuga hacia tierra, es decir, cuando parte de la electricidad no sigue el camino que debería. Es la protección más importante frente a electrocuciones, así que su función es precisamente saltar cuando algo no va bien.",
          "Que salte una vez, de forma puntual, no siempre es motivo de alarma. Que salte de forma repetida, sí lo es.",
        ],
      },
      {
        heading: "Las causas más habituales",
        paragraphs: [
          "Sobrecarga de circuito: demasiados aparatos conectados a la vez en el mismo circuito, sobre todo con equipos que generan calor (calefactores, secadores, hornos).",
          "Electrodoméstico defectuoso: un aparato con un fallo de aislamiento puede provocar fugas de corriente cada vez que se enchufa. Suele identificarse desconectando los aparatos uno a uno.",
          "Humedad o derivación en la instalación: cableado antiguo, mecanismos deteriorados o entrada de humedad en cajas de conexión son una causa muy común en viviendas con más de 20-25 años.",
          "Diferencial envejecido o de mala calidad: los diferenciales también se desgastan y pueden volverse más sensibles con el tiempo, disparándose sin una causa externa real.",
        ],
      },
      {
        heading: "Qué hacer mientras esperas al electricista",
        paragraphs: [
          "Desconecta los electrodomésticos que estuvieran en uso antes de que saltara, y evita subir el diferencial de forma repetida sin identificar la causa: cada disparo es una señal, no un fallo del propio diferencial.",
          "Si al subirlo vuelve a saltar de inmediato, sin conectar ningún aparato, es probable que la derivación esté en la propia instalación fija (cableado o cuadro) y no en un electrodoméstico. En ese caso, no insistas: contacta con un electricista.",
        ],
      },
      {
        heading: "Cuándo es urgente llamar a un profesional",
        paragraphs: [
          "Si notas olor a quemado, el diferencial se calienta al tacto, salta varias veces en poco tiempo o afecta a toda la vivienda de golpe, no se trata de un ajuste menor: es una avería que debe diagnosticarse con el cuadro abierto y herramienta de medición.",
          `En Electric diagnosticamos y reparamos diferenciales que saltan en Barakaldo y en toda Euskadi, con servicio de urgencia 24 horas.`,
        ],
      },
    ],
    faqs: [
      {
        q: "¿Es peligroso seguir subiendo el diferencial aunque vuelva a saltar?",
        a: "No es recomendable. Cada disparo indica una fuga de corriente real; forzarlo repetidamente sin diagnóstico puede dejar la vivienda sin protección efectiva o dañar el propio diferencial.",
      },
      {
        q: "¿Cuánto se tarda en diagnosticar la causa?",
        a: "En la mayoría de los casos, entre 30 y 60 minutos con el cuadro abierto y un comprobador de aislamiento, dependiendo de cuántos circuitos haya que revisar.",
      },
    ],
  },
  {
    slug: "cuanto-cuesta-un-boletin-electrico",
    title: "Cuánto cuesta un boletín eléctrico",
    metaTitle: "Cuánto Cuesta un Boletín Eléctrico en Euskadi",
    metaDescription:
      "Qué factores influyen en el precio de un boletín eléctrico (Certificado de Instalación Eléctrica) y cuándo es obligatorio tramitarlo. Electricista en Barakaldo y en toda Euskadi.",
    excerpt:
      "El precio de un boletín eléctrico varía según lo que haya que legalizar, no según una tarifa fija. Te contamos qué factores lo mueven y cuándo es obligatorio pedirlo.",
    relatedServiceSlug: "cuadros-electricos",
    sections: [
      {
        heading: "Qué es exactamente el boletín eléctrico",
        paragraphs: [
          "El boletín eléctrico, también llamado Certificado de Instalación Eléctrica (CIE), es el documento que certifica que una instalación cumple el Reglamento Electrotécnico de Baja Tensión (REBT). Lo emite un instalador autorizado y se registra ante el organismo competente de tu comunidad autónoma.",
        ],
      },
      {
        heading: "Qué factores influyen en el precio",
        paragraphs: [
          "El tipo de instalación: no cuesta lo mismo boletinar una vivienda completa nueva que ampliar la potencia de una ya existente.",
          "La potencia contratada y el número de circuitos: a más circuitos y mayor potencia, más tiempo de revisión y más elementos a certificar.",
          "El estado de partida: si el cuadro es antiguo y hay que adaptarlo a normativa antes de poder emitir el boletín, el trabajo (y el presupuesto) incluye esa adaptación previa.",
          "Las tasas del organismo oficial: además del trabajo del instalador, el registro del boletín lleva asociada una tasa administrativa independiente.",
        ],
      },
      {
        heading: "Cuándo es obligatorio pedirlo",
        paragraphs: [
          "Es obligatorio en instalaciones nuevas, en ampliaciones de potencia, y en reformas que afecten al cuadro eléctrico o a una parte relevante del cableado. También se suele exigir para dar de alta el suministro con la comercializadora tras una reforma importante.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo pedir presupuesto de boletín sin comprometerme?",
        a: "Sí. En Electric revisamos tu instalación y te damos un presupuesto cerrado antes de tramitar nada, sin sorpresas.",
      },
    ],
  },
  {
    slug: "diferencia-entre-averia-y-cortocircuito",
    title: "Diferencia entre avería eléctrica y cortocircuito",
    metaTitle: "Avería Eléctrica vs Cortocircuito: Diferencias",
    metaDescription:
      "¿Corte de luz o cortocircuito? Te explicamos en qué se diferencian y por qué identificarlo bien ayuda al electricista a solucionarlo más rápido.",
    excerpt:
      "No toda avería eléctrica es un cortocircuito, aunque lo parezca desde el sofá. Saber distinguirlos ayuda a explicar mejor el problema por teléfono y a que el electricista llegue con la reparación adecuada.",
    relatedServiceSlug: "cortocircuitos",
    sections: [
      {
        heading: "Qué es una avería eléctrica",
        paragraphs: [
          `"Avería eléctrica" es un término general: cualquier fallo que impide que la instalación funcione con normalidad. Puede ser un corte de luz en una zona de la casa, un enchufe que deja de dar corriente, un electrodoméstico que no arranca o un diferencial que salta de forma intermitente.`,
        ],
      },
      {
        heading: "Qué es específicamente un cortocircuito",
        paragraphs: [
          "El cortocircuito es un tipo concreto de avería: se produce cuando dos conductores con distinta polaridad entran en contacto directo, generando un pico de corriente muy alto en un instante. Suele venir acompañado de un chispazo, un ruido seco o, en los casos más claros, olor a quemado y el disparo inmediato del magnetotérmico (no solo del diferencial).",
        ],
      },
      {
        heading: "Por qué importa distinguirlos al llamar",
        paragraphs: [
          "Si el corte es progresivo o solo afecta a un punto de luz, probablemente sea una avería más localizada (mecanismo, punto de luz, derivación leve). Si ha sido un corte súbito con chispazo o ruido y ha saltado el magnetotérmico general, es más probable que sea un cortocircuito, que conviene tratar como urgencia por el riesgo de sobrecalentamiento del cableado.",
          "En cualquiera de los dos casos, cuéntanos por teléfono qué has notado (chispazo, olor, qué parte de la casa se ha quedado sin luz): nos ayuda a acudir con las herramientas adecuadas desde el primer momento.",
        ],
      },
    ],
  },
  {
    slug: "certificado-electrico-vs-boletin-electrico",
    title: "Certificado eléctrico y boletín eléctrico: ¿es lo mismo?",
    metaTitle: "Certificado Eléctrico vs Boletín Eléctrico",
    metaDescription:
      "Certificado eléctrico, boletín eléctrico y Certificado de Instalación Eléctrica (CIE): aclaramos si son el mismo documento y cuándo lo necesitas.",
    excerpt:
      "Certificado eléctrico, boletín eléctrico, CIE: tres nombres distintos para, en la mayoría de los casos, el mismo papel. Aclaramos la confusión.",
    relatedServiceSlug: "cuadros-electricos",
    sections: [
      {
        heading: "Un documento, varios nombres",
        paragraphs: [
          "En España, el documento oficial se llama Certificado de Instalación Eléctrica (CIE), regulado por el REBT. Coloquialmente, según la zona, se le conoce como boletín eléctrico o certificado eléctrico: son sinónimos del mismo trámite, no dos documentos diferentes.",
        ],
      },
      {
        heading: "Cuándo lo vas a necesitar",
        paragraphs: [
          "Al dar de alta la luz en una vivienda nueva, al ampliar la potencia contratada, tras una reforma que afecte al cuadro eléctrico o a una parte relevante de la instalación, y en locales comerciales al iniciar la actividad.",
        ],
      },
      {
        heading: "Quién puede emitirlo",
        paragraphs: [
          "Solo un instalador eléctrico autorizado puede firmar y tramitar el certificado. En Electric revisamos la instalación, hacemos las mediciones necesarias (aislamiento, continuidad de tierra) y registramos el boletín/certificado ante el organismo correspondiente.",
        ],
      },
    ],
  },
  {
    slug: "cada-cuanto-revisar-el-cuadro-electrico",
    title: "Cada cuánto revisar el cuadro eléctrico",
    metaTitle: "Cada Cuánto Revisar el Cuadro Eléctrico",
    metaDescription:
      "¿Cada cuánto tiempo conviene revisar el cuadro eléctrico de tu vivienda o local? Señales de alarma y recomendaciones de mantenimiento preventivo.",
    excerpt:
      "El cuadro eléctrico no avisa hasta que falla, pero sí deja señales antes de llegar a ese punto. Te contamos cada cuánto revisarlo y qué mirar entre revisión y revisión.",
    relatedServiceSlug: "cuadros-electricos",
    sections: [
      {
        heading: "Una referencia general",
        paragraphs: [
          "Como referencia, conviene hacer una revisión preventiva del cuadro eléctrico cada 5 años en viviendas, y con mayor frecuencia en locales comerciales o instalaciones con más uso. Si la vivienda tiene más de 25-30 años y no se ha reformado la instalación, la revisión conviene adelantarla.",
        ],
      },
      {
        heading: "Señales de que no puede esperar",
        paragraphs: [
          "El diferencial salta con frecuencia sin causa aparente, algún interruptor o el propio cuadro se calienta al tacto, hay parpadeos de luz sin motivo, o se percibe olor a quemado cerca del cuadro. Cualquiera de estas señales adelanta la necesidad de revisión, sin esperar al plazo habitual.",
        ],
      },
      {
        heading: "Qué incluye una revisión completa",
        paragraphs: [
          "Comprobación del estado físico de cableado y mecanismos, medición de aislamiento, verificación de que los diferenciales disparan dentro de los tiempos que exige la normativa, y comprobación de que la potencia contratada sigue siendo adecuada al consumo actual de la vivienda o local.",
        ],
      },
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}
