// Imágenes servidas localmente desde /public/images. Las fotos "lucid-origin_*" son
// imágenes generadas con IA (sin personas, solo cuadros eléctricos / iluminación /
// cableado) aportadas para el rediseño claro y premium de la web — sustituir por
// fotografías reales del negocio en cuanto estén disponibles.

/** Cuadro eléctrico premium (fondo oscuro, cableado naranja/amarillo organizado). */
export const HERO_IMAGE =
  "/images/lucid-origin_Luxury_electrical_distribution_board_with_perfectly_organized_wiring_modern_circ-0.jpg";

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

/**
 * Imagen destacada por servicio (tarjetas de la sección "Servicios"). `null` cuando no
 * existe una imagen real que represente el servicio con fidelidad (p. ej. puntos de
 * recarga de VE): la tarjeta se muestra entonces solo con icono, sin forzar una foto
 * que no corresponda.
 */
export const SERVICE_CARD_IMAGE: Record<string, string | null> = {
  "averias-electricas": SERVICES_IMAGE,
  "cuadros-electricos": PANEL_CLOSEUP_IMAGE,
  cortocircuitos: HERO_IMAGE,
  "iluminacion-led": LIGHTING_IMAGE,
  "instalaciones-electricas": HERO_IMAGE,
  "reparaciones-electricas": SERVICES_IMAGE,
  "puntos-recarga-vehiculo-electrico": null,
  "electricista-urgente-24h": PANEL_CLOSEUP_IMAGE,
};
