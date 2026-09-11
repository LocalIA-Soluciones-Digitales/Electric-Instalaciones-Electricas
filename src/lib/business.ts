export const business = {
  name: "Electric Instalaciones Eléctricas",
  shortName: "Electric",
  owner: "Eduardo Castellano",
  // NIF del titular (autónomo). Exigido por el art. 10 LSSI-CE entre los datos
  // identificativos obligatorios del Aviso Legal. Vacío a propósito: no se
  // muestra la línea en /aviso-legal hasta rellenarlo con el dato real.
  nif: "" as string, // p.ej. "12345678A"
  slogan: "Electricista de confianza en Barakaldo y en toda Euskadi, disponible 24 horas",
  phone: "677246374",
  phoneDisplay: "677 24 63 74",
  whatsapp: "34677246374",
  email: "eduardocastellano16049806@gmail.com",
  address: {
    street: "Calle Cruces, 18, Local 4",
    postalCode: "48903",
    city: "Barakaldo",
    region: "Bizkaia",
    country: "ES",
    countryName: "España",
  },
  geo: {
    lat: 43.2969,
    lng: -2.9836,
  },
  domain: "https://www.electric-euskadi.es",
  openingHours: "24/7",
  priceRange: "€€",
  foundingArea: "Barakaldo, Bizkaia",
  socials: {
    instagram: "",
    facebook: "",
  },
  // Credenciales verificables. Se dejan vacías a propósito: no se muestra nada
  // en la web hasta que sean datos reales. Rellena para activar su visualización.
  credentials: {
    license: "" as string, // Nº de instalador autorizado REBT, p.ej. "IBT-BI-XXXXX"
    insurance: "" as string, // p.ej. "Seguro de Responsabilidad Civil al día"
    foundedYear: "" as string, // p.ej. "2016"
  },
  // Reseñas verificables (perfil de Google Business). Vacío = no se muestra
  // ningún enlace ni valoración hasta que se indiquen datos reales.
  reviews: {
    googleUrl: "" as string,
    rating: "" as string, // p.ej. "4.9"
    count: "" as string, // p.ej. "120"
  },
} as const;

export function waLink(message: string) {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function telLink() {
  return `tel:+${business.whatsapp}`;
}

// Saludos de WhatsApp centralizados: evita tener el mismo texto (o variantes
// ligeramente distintas por descuido) repetido en cada componente que abre un
// enlace de WhatsApp. "Urgent" se usa en los puntos de contacto orientados a
// avería/urgencia (hero, CTA, header, barra móvil, botón flotante); "General"
// en contextos de consulta no urgente (footer, página de contacto).
export const WHATSAPP_GREETING_URGENT = "Hola, necesito un electricista. ¿Podéis ayudarme?";
export const WHATSAPP_GREETING_GENERAL = "Hola, quería consultar sobre un servicio eléctrico.";
