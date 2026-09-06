export type Locality = {
  slug: string;
  name: string;
  province: "Bizkaia" | "Gipuzkoa" | "Araba";
  isHome: boolean;
  distanceNote: string;
  intro: string;
  landmarks: string[];
};

export const localities: Locality[] = [
  {
    slug: "cruces",
    name: "Cruces",
    province: "Bizkaia",
    isHome: true,
    distanceNote: "Zona donde tenemos nuestro local, en Calle Cruces 18",
    intro:
      "Cruces es el barrio de Barakaldo donde tenemos nuestro local, en Calle Cruces 18. Conocemos bien la zona, sus edificios y comunidades, y podemos llegar en minutos ante cualquier avería eléctrica, tanto en viviendas cercanas al Hospital Universitario Cruces como en los barrios colindantes.",
    landmarks: ["Hospital Universitario Cruces", "Metro Bilbao línea 1 (Ansio / Cruces)"],
  },
  {
    slug: "barakaldo",
    name: "Barakaldo",
    province: "Bizkaia",
    isHome: true,
    distanceNote: "Municipio donde tenemos nuestra base de operaciones",
    intro:
      "Barakaldo es nuestra ciudad base. Damos servicio de electricista en todos sus barrios: Cruces, Retuerto, San Vicente, Rontegi, Lutxana, Gurutzeta y el casco urbano, con tiempos de respuesta muy rápidos ante averías urgentes.",
    landmarks: ["BEC (Bilbao Exhibition Centre)", "Parque Munoa", "Casco Viejo de Barakaldo"],
  },
  {
    slug: "bilbao",
    name: "Bilbao",
    province: "Bizkaia",
    isHome: false,
    distanceNote: "A 10-15 minutos desde nuestra base en Barakaldo",
    intro:
      "Damos servicio de electricista en Bilbao capital y sus distritos: Deusto, Indautxu, Abando, Rekalde, Basurto, San Ignacio y Zorrotza. Nuestra cercanía desde Barakaldo nos permite llegar rápido a cualquier zona de la ciudad.",
    landmarks: ["Casco Viejo", "Guggenheim", "Estación de Abando"],
  },
  {
    slug: "getxo",
    name: "Getxo",
    province: "Bizkaia",
    isHome: false,
    distanceNote: "A unos 20 minutos desde Barakaldo",
    intro:
      "En Getxo atendemos viviendas, chalets y locales comerciales en Algorta, Las Arenas y Neguri, con especial atención a instalaciones eléctricas en viviendas unifamiliares.",
    landmarks: ["Puente Bizkaia", "Playa de Ereaga"],
  },
  {
    slug: "portugalete",
    name: "Portugalete",
    province: "Bizkaia",
    isHome: false,
    distanceNote: "A pocos minutos de Barakaldo, cruzando la ría",
    intro:
      "Portugalete es uno de los municipios de la margen izquierda donde más solicitan nuestro servicio de electricista urgente, por su cercanía a nuestra base en Barakaldo.",
    landmarks: ["Puente Colgante", "Casco histórico de Portugalete"],
  },
  {
    slug: "santurtzi",
    name: "Santurtzi",
    province: "Bizkaia",
    isHome: false,
    distanceNote: "Margen izquierda, muy cerca de Barakaldo",
    intro:
      "Ofrecemos servicio de electricista en Santurtzi para viviendas, locales y comunidades de vecinos, con desplazamiento rápido desde Barakaldo.",
    landmarks: ["Puerto pesquero de Santurtzi"],
  },
  {
    slug: "basauri",
    name: "Basauri",
    province: "Bizkaia",
    isHome: false,
    distanceNote: "A unos 20 minutos desde Barakaldo",
    intro:
      "En Basauri realizamos instalaciones, reparaciones y atención de averías eléctricas urgentes en viviendas y locales comerciales.",
    landmarks: ["Kareaga Goikoa"],
  },
  {
    slug: "durango",
    name: "Durango",
    province: "Bizkaia",
    isHome: false,
    distanceNote: "Servicio en el Duranguesado",
    intro:
      "Damos cobertura de electricista en Durango y el Duranguesado, atendiendo tanto urgencias como instalaciones y reformas eléctricas programadas.",
    landmarks: ["Casco histórico de Durango"],
  },
  {
    slug: "donostia",
    name: "Donostia - San Sebastián",
    province: "Gipuzkoa",
    isHome: false,
    distanceNote: "Servicio en Gipuzkoa bajo disponibilidad",
    intro:
      "Atendemos también solicitudes de electricista en Donostia - San Sebastián y alrededores, especialmente para instalaciones y reformas planificadas.",
    landmarks: ["Playa de la Concha"],
  },
  {
    slug: "vitoria-gasteiz",
    name: "Vitoria-Gasteiz",
    province: "Araba",
    isHome: false,
    distanceNote: "Servicio en Araba bajo disponibilidad",
    intro:
      "En Vitoria-Gasteiz ofrecemos servicio de electricista para instalaciones, reformas y reparaciones, coordinando la visita con antelación.",
    landmarks: ["Casco Medieval de Vitoria-Gasteiz"],
  },
];

export function getLocality(slug: string) {
  return localities.find((l) => l.slug === slug);
}

export const LOCALITY_SLUG_PREFIX = "electricista-";

export function localityFromPrefixedSlug(slug: string) {
  if (!slug.startsWith(LOCALITY_SLUG_PREFIX)) return undefined;
  return getLocality(slug.slice(LOCALITY_SLUG_PREFIX.length));
}
