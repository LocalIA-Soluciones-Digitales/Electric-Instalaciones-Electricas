export const business = {
  name: "Electric Instalaciones Eléctricas",
  shortName: "Electric",
  owner: "Eduardo Castellano",
  slogan: "Electricista de confianza en Barakaldo y toda Bizkaia, disponible 24 horas",
  phone: "624645109",
  phoneDisplay: "624 64 51 09",
  whatsapp: "34624645109",
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
} as const;

export function waLink(message: string) {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function telLink() {
  return `tel:+${business.whatsapp}`;
}
