// Imágenes servidas localmente desde /public/images. Las fotos "lucid-origin_*" son
// imágenes generadas con IA (sin personas, solo cuadros eléctricos / iluminación /
// cableado) aportadas para el rediseño claro y premium de la web — sustituir por
// fotografías reales del negocio en cuanto estén disponibles.

/** Cuadro eléctrico premium (fondo oscuro, cableado naranja/amarillo organizado), nítido para tarjetas y fondo del hero. */
export const PANEL_LUXURY_IMAGE =
  "/images/lucid-origin_Luxury_electrical_distribution_board_with_perfectly_organized_wiring_modern_circ-0.jpg";

/** Fondo del hero: el mismo cuadro premium, con leve desenfoque y oscurecido en el propio hero. */
export const HERO_IMAGE = PANEL_LUXURY_IMAGE;

// Se mantienen ambos nombres (mismo archivo) para no romper los sitios que ya
// importaban una imagen de escritorio y otra de móvil: el recorte se resuelve con
// `object-position` en cada uso, no con dos archivos distintos.
export const HERO_DESKTOP_IMAGE = HERO_IMAGE;
export const HERO_MOBILE_IMAGE = HERO_IMAGE;

/** Cuadro eléctrico abierto con herramientas sobre banco de trabajo. */
export const SERVICES_IMAGE = "/images/services-tools.jpg";

/** Vista aérea de la costa de Euskadi, para la sección de cobertura geográfica. */
export const COVERAGE_IMAGE = "/images/coverage-euskadi.jpg";

/** Instalación de iluminación arquitectónica LED, para separadores/parallax. */
export const LIGHTING_IMAGE =
  "/images/lucid-origin_Luxury_architectural_lighting_installation_modern_LED_lighting_system_inside_ele-0.jpg";

/** Primer plano de cuadro eléctrico organizado (cableado de colores, embarrado rojo). */
export const PANEL_CLOSEUP_IMAGE =
  "/images/lucid-origin_Close-up_of_a_perfectly_organized_electrical_distribution_board_professional_ele-0.jpg";

/** Fotografías reales del negocio para las tarjetas de la sección "Servicios". */
export const SERVICE_PHOTO_AVERIAS = "/images/servicio-averias-electricas.jpg";
export const SERVICE_PHOTO_CUADROS = "/images/servicio-cuadros-electricos.jpg";
export const SERVICE_PHOTO_CORTOCIRCUITOS = "/images/servicio-cortocircuitos.jpg";
export const SERVICE_PHOTO_ILUMINACION = "/images/servicio-iluminacion-led.jpg";
export const SERVICE_PHOTO_INSTALACIONES = "/images/servicio-instalaciones-electricas.jpg";
export const SERVICE_PHOTO_REPARACIONES = "/images/servicio-reparaciones-electricas.jpg";
export const SERVICE_PHOTO_URGENCIAS_24H = "/images/servicio-urgencias-24h.jpg";

/**
 * Imagen destacada por servicio (tarjetas de la sección "Servicios"). `null` cuando no
 * existe una imagen real que represente el servicio con fidelidad: la tarjeta se
 * muestra entonces solo con icono, sin forzar una foto que no corresponda.
 */
export const SERVICE_CARD_IMAGE: Record<string, string | null> = {
  "averias-electricas": SERVICE_PHOTO_AVERIAS,
  "cuadros-electricos": SERVICE_PHOTO_CUADROS,
  cortocircuitos: SERVICE_PHOTO_CORTOCIRCUITOS,
  "iluminacion-led": SERVICE_PHOTO_ILUMINACION,
  "instalaciones-electricas": SERVICE_PHOTO_INSTALACIONES,
  "reparaciones-electricas": SERVICE_PHOTO_REPARACIONES,
  "electricista-urgente-24h": SERVICE_PHOTO_URGENCIAS_24H,
};
