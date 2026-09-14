export type Locality = {
  slug: string;
  name: string;
  province: "Bizkaia" | "Gipuzkoa" | "Araba";
  isHome: boolean;
  distanceNote: string;
  intro: string;
  landmarks: string[];
  /** Coordenadas del centro del municipio (WGS84), usadas por CoverageMap.tsx y EuskadiCoverageMap.tsx. */
  geo: { lat: number; lng: number };
  /** Distancia aproximada por carretera desde Barakaldo (km), para el mapa de cobertura. */
  distanceKm: number;
  /** Tiempo de desplazamiento estimado desde Barakaldo (minutos), para el mapa de cobertura. */
  etaMinutes: number;
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
    distanceKm: 1,
    etaMinutes: 5,
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
    distanceKm: 0,
    etaMinutes: 0,
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
    distanceKm: 9,
    etaMinutes: 12,
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
    distanceKm: 17,
    etaMinutes: 20,
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
    distanceKm: 4,
    etaMinutes: 8,
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
    distanceKm: 6,
    etaMinutes: 10,
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
    distanceKm: 14,
    etaMinutes: 20,
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
    distanceKm: 30,
    etaMinutes: 35,
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
    distanceKm: 3,
    etaMinutes: 7,
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
    distanceKm: 5,
    etaMinutes: 9,
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
    distanceKm: 9,
    etaMinutes: 15,
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
    distanceKm: 10,
    etaMinutes: 18,
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
    distanceKm: 16,
    etaMinutes: 23,
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
    distanceKm: 20,
    etaMinutes: 28,
  },
  {
    slug: "gernika-lumo",
    name: "Gernika-Lumo",
    province: "Bizkaia",
    isHome: false,
    distanceNote: "Servicio de electricista en la comarca de Busturialdea",
    intro:
      "En Gernika-Lumo y el resto de Busturialdea ofrecemos servicio de electricista para averías, instalaciones y reparaciones, coordinando contigo el horario de la visita.",
    landmarks: ["Casa de Juntas de Gernika"],
    geo: { lat: 43.3153, lng: -2.6772 },
    distanceKm: 34,
    etaMinutes: 40,
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
    distanceKm: 100,
    etaMinutes: 65,
  },
  {
    slug: "irun",
    name: "Irun",
    province: "Gipuzkoa",
    isHome: false,
    distanceNote: "Servicio de electricista en el Bidasoa, junto a la frontera",
    intro:
      "En Irun y el resto del Bidasoa ofrecemos servicio de electricista para instalaciones, reformas, reparaciones y averías, coordinando contigo el horario de la visita.",
    landmarks: ["Puente de Santiago"],
    geo: { lat: 43.3389, lng: -1.7906 },
    distanceKm: 118,
    etaMinutes: 78,
  },
  {
    slug: "eibar",
    name: "Eibar",
    province: "Gipuzkoa",
    isHome: false,
    distanceNote: "Servicio de electricista en el Debabarrena",
    intro:
      "Damos cobertura de electricista en Eibar y el Debabarrena, tanto para averías urgentes como para instalaciones y reformas eléctricas programadas.",
    landmarks: ["Casco urbano de Eibar"],
    geo: { lat: 43.1834, lng: -2.4738 },
    distanceKm: 54,
    etaMinutes: 50,
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
    distanceKm: 65,
    etaMinutes: 55,
  },
  {
    slug: "llodio",
    name: "Llodio",
    province: "Araba",
    isHome: false,
    distanceNote: "Servicio de electricista en el Valle de Ayala, junto al límite con Bizkaia",
    intro:
      "En Llodio (Laudio) y el Valle de Ayala ofrecemos servicio de electricista para averías, instalaciones y reparaciones, con buena comunicación desde nuestra base en Barakaldo.",
    landmarks: ["Casco urbano de Llodio"],
    geo: { lat: 43.1436, lng: -2.9614 },
    distanceKm: 26,
    etaMinutes: 30,
  },
  {
    slug: "amurrio",
    name: "Amurrio",
    province: "Araba",
    isHome: false,
    distanceNote: "Servicio de electricista en el Valle de Ayala",
    intro:
      "Damos servicio de electricista en Amurrio y el resto del Valle de Ayala, coordinando contigo el horario de la visita para averías, instalaciones y reparaciones.",
    landmarks: ["Casco urbano de Amurrio"],
    geo: { lat: 43.0539, lng: -3.0003 },
    distanceKm: 31,
    etaMinutes: 35,
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
