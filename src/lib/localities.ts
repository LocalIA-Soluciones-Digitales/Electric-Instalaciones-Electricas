export type Locality = {
  slug: string;
  name: string;
  province: "Bizkaia" | "Gipuzkoa" | "Araba";
  isHome: boolean;
  distanceNote: string;
  intro: string;
  landmarks: string[];
  /** Coordenadas del centro del municipio (WGS84), usadas por CoverageMap.tsx. */
  geo: { lat: number; lng: number };
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
    geo: { lat: 43.3025, lng: -2.9908 },
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
    geo: { lat: 43.297, lng: -2.9899 },
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
    geo: { lat: 43.263, lng: -2.935 },
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
    geo: { lat: 43.345, lng: -3.01 },
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
    geo: { lat: 43.32, lng: -3.02 },
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
    geo: { lat: 43.33, lng: -3.033 },
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
    geo: { lat: 43.237, lng: -2.885 },
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
    geo: { lat: 43.17, lng: -2.633 },
  },
  {
    slug: "sestao",
    name: "Sestao",
    province: "Bizkaia",
    isHome: false,
    distanceNote: "Municipio contiguo a Barakaldo, a pocos minutos de nuestro local",
    intro:
      "Sestao linda directamente con Barakaldo, así que llegamos en muy poco tiempo. Damos servicio de electricista en viviendas, comunidades y locales de todo el municipio, incluida la zona de los antiguos Altos Hornos y La Iberia.",
    landmarks: ["Astilleros de Sestao", "La Iberia"],
    geo: { lat: 43.302, lng: -3.0 },
  },
  {
    slug: "trapagaran",
    name: "Trapagaran",
    province: "Bizkaia",
    isHome: false,
    distanceNote: "A pocos minutos de Barakaldo, en el Valle de Trápaga",
    intro:
      "En Trapagaran (Valle de Trápaga) atendemos viviendas y locales tanto en la zona de La Reineta como en el resto del valle, con desplazamiento rápido desde nuestra base en Barakaldo.",
    landmarks: ["Valle de Trápaga", "La Reineta"],
    geo: { lat: 43.308, lng: -3.035 },
  },
  {
    slug: "ortuella",
    name: "Ortuella",
    province: "Bizkaia",
    isHome: false,
    distanceNote: "A unos 15 minutos desde Barakaldo",
    intro:
      "Damos servicio de electricista en Ortuella, incluido el barrio de Gallarta, para averías, instalaciones y reparaciones en viviendas y locales comerciales.",
    landmarks: ["Gallarta", "Parque de Peñas Negras"],
    geo: { lat: 43.316, lng: -3.043 },
  },
  {
    slug: "erandio",
    name: "Erandio",
    province: "Bizkaia",
    isHome: false,
    distanceNote: "A unos 15-20 minutos desde Barakaldo",
    intro:
      "En Erandio atendemos tanto la zona residencial como la industrial, incluida Astrabudua, con servicio de electricista para viviendas, comunidades y naves o locales comerciales.",
    landmarks: ["Puente de Rontegi", "Astrabudua"],
    geo: { lat: 43.296, lng: -2.96 },
  },
  {
    slug: "leioa",
    name: "Leioa",
    province: "Bizkaia",
    isHome: false,
    distanceNote: "A unos 20-25 minutos desde Barakaldo",
    intro:
      "Ofrecemos servicio de electricista en Leioa para viviendas, comunidades y locales, incluida la zona del campus universitario y el Parque Tecnológico de Bizkaia.",
    landmarks: ["Campus de la UPV/EHU", "Parque Tecnológico de Bizkaia"],
    geo: { lat: 43.323, lng: -2.978 },
  },
  {
    slug: "muskiz",
    name: "Muskiz",
    province: "Bizkaia",
    isHome: false,
    distanceNote: "A unos 25-30 minutos desde Barakaldo",
    intro:
      "Damos cobertura de electricista en Muskiz y su entorno, tanto para viviendas cercanas a la costa como para el resto del municipio, coordinando contigo el horario de la visita.",
    landmarks: ["Playa de La Arena"],
    geo: { lat: 43.34, lng: -3.115 },
  },
  {
    slug: "donostia",
    name: "Donostia - San Sebastián",
    province: "Gipuzkoa",
    isHome: false,
    distanceNote: "Servicio de electricista en toda Gipuzkoa",
    intro:
      "Damos servicio de electricista en Donostia - San Sebastián y alrededores, tanto para instalaciones y reformas planificadas como para averías, coordinando contigo el horario de la visita.",
    landmarks: ["Playa de la Concha"],
    geo: { lat: 43.3183, lng: -1.9812 },
  },
  {
    slug: "vitoria-gasteiz",
    name: "Vitoria-Gasteiz",
    province: "Araba",
    isHome: false,
    distanceNote: "Servicio de electricista en toda Araba",
    intro:
      "En Vitoria-Gasteiz y el resto de Araba ofrecemos servicio de electricista para instalaciones, reformas, reparaciones y averías, coordinando contigo el horario de la visita.",
    landmarks: ["Casco Medieval de Vitoria-Gasteiz"],
    geo: { lat: 42.8467, lng: -2.6716 },
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
