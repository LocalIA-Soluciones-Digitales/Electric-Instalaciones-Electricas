// Imágenes servidas localmente desde /public/images. Las fotos "lucid-origin_*" son
// imágenes generadas con IA (sin personas, solo cuadros eléctricos / iluminación /
// cableado) aportadas para el rediseño claro y premium de la web — sustituir por
// fotografías reales del negocio en cuanto estén disponibles.

/** Cuadro eléctrico premium (fondo oscuro, cableado naranja/amarillo organizado), nítido para tarjetas y fondo del hero. */
export const PANEL_LUXURY_IMAGE =
  "/images/lucid-origin_Luxury_electrical_distribution_board_with_perfectly_organized_wiring_modern_circ-0.jpg";

/** Fondo del hero: el mismo cuadro premium, con leve desenfoque y oscurecido en el propio hero. */
export const HERO_IMAGE = PANEL_LUXURY_IMAGE;

/** Cuadro eléctrico abierto con herramientas sobre banco de trabajo. */
export const SERVICES_IMAGE = "/images/services-tools.jpg";

/** Vista aérea de la costa de Euskadi, para la sección de cobertura geográfica. */
export const COVERAGE_IMAGE = "/images/coverage-euskadi.jpg";

/** Instalación de iluminación arquitectónica LED, para separadores/parallax. */
export const LIGHTING_IMAGE =
  "/images/lucid-origin_Luxury_architectural_lighting_installation_modern_LED_lighting_system_inside_ele-0.jpg";

/** Primer plano de cuadro eléctrico organizado (cableado de colores, embarrado rojo): el "cuadro eléctrico" en sí. */
export const PANEL_CLOSEUP_IMAGE =
  "/images/lucid-origin_Close-up_of_a_perfectly_organized_electrical_distribution_board_professional_ele-0.jpg";

/** Cuadro eléctrico con cableado de colores, desenfocado y oscurecido: para transmitir avería/riesgo. */
export const PANEL_MOODY_IMAGE = "/images/hero-panel-nublado.jpg";

/** Electricista instalando un cuadro nuevo en una vivienda con luz natural. */
export const ELECTRICIAN_INSTALLING_IMAGE = "/images/hero-desktop.jpg";

/** Electricista con casco de seguridad interviniendo en un cuadro abierto: urgencia/aviso in situ. */
export const ELECTRICIAN_URGENT_IMAGE = "/images/hero-mobile.jpg";

/**
 * Imagen destacada por servicio (tarjetas de la sección "Servicios"), una distinta por
 * servicio para que cada tarjeta se identifique de un vistazo. `null` cuando no exista
 * una imagen real que represente el servicio con fidelidad: la tarjeta se muestra
 * entonces solo con icono, sin forzar una foto que no corresponda.
 */
export const SERVICE_CARD_IMAGE: Record<string, string | null> = {
  "averias-electricas": SERVICES_IMAGE,
  "cuadros-electricos": PANEL_CLOSEUP_IMAGE,
  cortocircuitos: PANEL_MOODY_IMAGE,
  "iluminacion-led": LIGHTING_IMAGE,
  "instalaciones-electricas": ELECTRICIAN_INSTALLING_IMAGE,
  "reparaciones-electricas": PANEL_LUXURY_IMAGE,
  "electricista-urgente-24h": ELECTRICIAN_URGENT_IMAGE,
};

/**
 * Recorte (`object-position`) por servicio para las tarjetas: por defecto centrado,
 * salvo cuando hay que evitar una zona concreta de la foto al encajarla en 16:10.
 */
export const SERVICE_CARD_IMAGE_POSITION: Record<string, string> = {
  // La foto es de retrato: con el recorte por defecto (centrado) se cuela el rótulo
  // del uniforme, ilegible/generado por IA. Se sube el encuadre para dejarlo fuera.
  "electricista-urgente-24h": "object-top",
};
