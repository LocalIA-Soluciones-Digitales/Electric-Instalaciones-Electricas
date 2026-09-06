// Serialización segura de JSON-LD para inyectar en <script type="application/ld+json">.
// JSON.stringify no escapa "</script>", lo que permitiría cerrar la etiqueta e
// inyectar HTML si algún día el objeto incluye texto no controlado por nosotros
// (p. ej. reseñas de clientes). Hoy los datos son estáticos, pero este es el
// punto único por el que debe pasar cualquier JSON-LD del sitio.
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
