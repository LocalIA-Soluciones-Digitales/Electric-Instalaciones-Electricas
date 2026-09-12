import type { NextConfig } from "next";

// 'unsafe-inline' en script-src (no hashes): el App Router de Next.js emite
// sus propios <script> inline sin `src` en cada respuesta para hidratar los
// Server Components en streaming (los payloads de RSC vía self.__next_f.push),
// con contenido distinto en cada página e incluso en cada build. Un
// allowlist de hashes fijos (como el que había aquí antes, calculado solo
// para los scripts de Analytics.tsx) no puede cubrirlos: el navegador bloquea
// esos scripts de Next y la hidratación de React no llega a completarse en
// ninguna página, dejando inertes todos los componentes interactivos del
// sitio (el asistente de solicitud, el desplegable de servicios del header,
// el formulario de presupuesto...). Cubrir esto correctamente requeriría un
// nonce por petición vía middleware, lo que a su vez obliga a renderizado
// dinámico en todas las páginas (hoy estáticas). Se prioriza que el sitio
// funcione.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self'",
  "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com",
  "frame-src https://challenges.cloudflare.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Content-Security-Policy", value: csp },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
